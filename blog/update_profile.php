<?php
session_start();
require_once 'database.php';

// Ensure output buffering to prevent header errors
ob_start();

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || !isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $new_password = trim($_POST['new_password']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email format!";
        header("Location: update_profile.php");
        exit();
    }

    // Check if username already exists
    $check_stmt = $conn->prepare("SELECT id FROM admin WHERE username = ? AND id != ?");
    $check_stmt->bind_param("si", $username, $_SESSION['admin_id']);
    if (!$check_stmt->execute()) {
        error_log("Error in username check query: " . $check_stmt->error);
        $_SESSION['error'] = "An error occurred while checking the username.";
        header("Location: update_profile.php");
        exit();
    }

    $result = $check_stmt->get_result();
    if ($result->num_rows > 0) {
        $_SESSION['error'] = "Username already exists!";
        header("Location: update_profile.php");
        exit();
    }

    // Handle profile image upload
    $image_path = null;
    if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] == 0) {
        $target_dir = "uploads/admin/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $imageFileType = strtolower(pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION));
        $allowed_formats = ["jpg", "jpeg", "png", "gif"];
        
        if (in_array($imageFileType, $allowed_formats)) {
            $unique_name = "admin_" . $_SESSION['admin_id'] . "_" . uniqid() . "." . $imageFileType;
            $target_file = $target_dir . $unique_name;

            if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $target_file)) {
                $image_path = $target_file;

                // Delete old profile image if exists
                $old_image_sql = "SELECT profile_image FROM admin WHERE id = ?";
                $old_image_stmt = $conn->prepare($old_image_sql);
                $old_image_stmt->bind_param("i", $_SESSION['admin_id']);
                $old_image_stmt->execute();
                $old_image_result = $old_image_stmt->get_result();
                if ($old_image_row = $old_image_result->fetch_assoc()) {
                    if (!empty($old_image_row['profile_image']) && file_exists($old_image_row['profile_image'])) {
                        unlink($old_image_row['profile_image']);
                    }
                }
            }
        }
    }

    // Prepare update query based on whether password and image are being updated
    if (!empty($new_password)) {
        if ($image_path) {
            $update_stmt = $conn->prepare("UPDATE admin SET username = ?, email = ?, password = ?, profile_image = ? WHERE id = ?");
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $update_stmt->bind_param("ssssi", $username, $email, $hashed_password, $image_path, $_SESSION['admin_id']);
        } else {
            $update_stmt = $conn->prepare("UPDATE admin SET username = ?, email = ?, password = ? WHERE id = ?");
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $update_stmt->bind_param("sssi", $username, $email, $hashed_password, $_SESSION['admin_id']);
        }
    } else {
        if ($image_path) {
            $update_stmt = $conn->prepare("UPDATE admin SET username = ?, email = ?, profile_image = ? WHERE id = ?");
            $update_stmt->bind_param("sssi", $username, $email, $image_path, $_SESSION['admin_id']);
        } else {
            $update_stmt = $conn->prepare("UPDATE admin SET username = ?, email = ? WHERE id = ?");
            $update_stmt->bind_param("ssi", $username, $email, $_SESSION['admin_id']);
        }
    }

    if ($update_stmt->execute()) {
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        $_SESSION['message'] = "Profile updated successfully!";
    } else {
        error_log("Error in update query: " . $update_stmt->error);
        $_SESSION['error'] = "Error updating profile!";
    }

    header("Location: update_profile.php");
    exit();
}

// Fetch current user data
$fetch_stmt = $conn->prepare("SELECT username, email, profile_image FROM admin WHERE id = ?");
$fetch_stmt->bind_param("i", $_SESSION['admin_id']);
if (!$fetch_stmt->execute()) {
    error_log("Error in fetch query: " . $fetch_stmt->error);
    $_SESSION['error'] = "Error fetching user data!";
    header("Location: dashboard.php");
    exit();
}

$result = $fetch_stmt->get_result();
$user = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Update Profile</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<style>
        .card {
            border: none;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        .card-header {
            background-color: #f8f9fa;
            border-bottom: none;
            padding: 20px;
        }
        .form-control {
            border-radius: 20px;
            padding: 12px 20px;
        }
        .btn {
            border-radius: 20px;
            padding: 10px 30px;
        }
        .forgot-password {
            color: #6c757d;
            text-decoration: none;
        }
        .forgot-password:hover {
            color: #007bff;
            text-decoration: none;
        }
    </style>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                    <div class="card-header text-center">
                        <img src="shi-logo.png" style="height:80px;" class="mb-3">
                        <h4>Admin Update Profile</h4>
                    </div>
                
                    </div>
                    <div class="card-body">
                        <?php if (isset($_SESSION['error'])): ?>
                            <div class="alert alert-danger">
                                <?= htmlspecialchars($_SESSION['error']); unset($_SESSION['error']); ?>
                            </div>
                        <?php endif; ?>

                        <?php if (isset($_SESSION['message'])): ?>
                            <div class="alert alert-success">
                                <?= htmlspecialchars($_SESSION['message']); unset($_SESSION['message']); ?>
                            </div>
                        <?php endif; ?>

                        <form method="POST" enctype="multipart/form-data">
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" 
                                       name="username" 
                                       class="form-control" 
                                       value="<?= htmlspecialchars($user['username'] ?? ''); ?>" 
                                       required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" 
                                       name="email" 
                                       class="form-control" 
                                       value="<?= htmlspecialchars($user['email'] ?? ''); ?>" 
                                       required>
                            </div>
                            <div class="form-group">
                                <label>New Password (leave blank to keep current)</label>
                                <input type="password" 
                                       name="new_password" 
                                       class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Profile Image</label>
                                <input type="file" 
                                       name="profile_image" 
                                       class="form-control">
                                <?php if(!empty($user['profile_image']) && file_exists($user['profile_image'])): ?>
                                    <div class="mt-2">
                                        <img src="<?= htmlspecialchars($user['profile_image']); ?>" 
                                             alt="Current Profile Image" 
                                             class="img-thumbnail"
                                             style="max-width: 100px;">
                                    </div>
                                <?php endif; ?>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Update Profile
                                </button>
                                <a href="dashboard.php" class="btn btn-secondary">
                                    <i class="fas fa-arrow-left"></i> Back to Dashboard
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
