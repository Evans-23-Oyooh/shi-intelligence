<?php
session_start();
require_once 'database.php';

$message = '';
$messageType = '';
$valid_token = false;
$token = '';

if(isset($_GET['token'])) {
    $token = $_GET['token'];
    
    // Check if token exists and is valid
    $sql = "SELECT pr.*, a.email 
            FROM password_resets pr 
            JOIN admin a ON pr.admin_id = a.id 
            WHERE pr.token = ? AND pr.expires_at > NOW()";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($reset = $result->fetch_assoc()) {
        $valid_token = true;
    } else {
        $message = "Invalid or expired reset link";
        $messageType = "danger";
    }
}

if(isset($_POST['reset_password'])) {
    $token = $_POST['token'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    if($password !== $confirm_password) {
        $message = "Passwords do not match";
        $messageType = "danger";
    } else {
        // Get admin_id from token
        $sql = "SELECT admin_id FROM password_resets WHERE token = ? AND expires_at > NOW()";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if($reset = $result->fetch_assoc()) {
            // Update password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $update_sql = "UPDATE admin SET password = ? WHERE id = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("si", $hashed_password, $reset['admin_id']);
            
            if($update_stmt->execute()) {
                // Delete used token
                $delete_sql = "DELETE FROM password_resets WHERE admin_id = ?";
                $delete_stmt = $conn->prepare($delete_sql);
                $delete_stmt->bind_param("i", $reset['admin_id']);
                $delete_stmt->execute();
                
                $message = "Password has been reset successfully";
                $messageType = "success";
                header("Refresh: 3; url=login.php");
            } else {
                $message = "Error resetting password";
                $messageType = "danger";
            }
        } else {
            $message = "Invalid or expired reset link";
            $messageType = "danger";
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .card {
            border: none;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        .form-control {
            border-radius: 20px;
            padding: 12px 20px;
        }
        .btn {
            border-radius: 20px;
            padding: 10px 30px;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <?php if($message): ?>
                    <div class="alert alert-<?php echo $messageType; ?> alert-dismissible fade show">
                        <?php echo $message; ?>
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                    </div>
                <?php endif; ?>

                <?php if($valid_token): ?>
                    <div class="card">
                        <div class="card-header text-center">
                            <img src="shi-logo.png" style="height:80px;" class="mb-3">
                            <h4>Reset Password</h4>
                        </div>
                        <div class="card-body">
                            <form method="POST">
                                <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
                                <div class="form-group">
                                    <label><i class="fas fa-lock"></i> New Password</label>
                                    <input type="password" name="password" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label><i class="fas fa-lock"></i> Confirm Password</label>
                                    <input type="password" name="confirm_password" class="form-control" required>
                                </div>
                                <button type="submit" name="reset_password" class="btn btn-primary btn-block">
                                    <i class="fas fa-save"></i> Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
