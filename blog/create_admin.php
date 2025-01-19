<?php
require_once 'database.php';

// First, create the admin table if it doesn't exist with all necessary fields
$sql = "CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === FALSE) {
    die("Error creating table: " . $conn->error);
}

// Create admin user with default values
$admin_username = "admin";
$admin_email = "admin@example.com"; // Change this to your desired email
$admin_password = "admin123"; // Change this to your desired password
$hashed_password = password_hash($admin_password, PASSWORD_DEFAULT);

// Check if admin already exists
$check_sql = "SELECT id FROM admin WHERE username = ? OR email = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("ss", $admin_username, $admin_email);
$check_stmt->execute();
$result = $check_stmt->get_result();

if ($result->num_rows == 0) {
    // Insert new admin
    $insert_sql = "INSERT INTO admin (username, email, password) VALUES (?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_sql);
    $insert_stmt->bind_param("sss", $admin_username, $admin_email, $hashed_password);
    
    if ($insert_stmt->execute()) {
        echo "<div style='margin: 20px; padding: 20px; border: 1px solid #28a745; border-radius: 5px; background-color: #d4edda; color: #155724;'>";
        echo "<h3>Admin user created successfully!</h3>";
        echo "<p><strong>Username:</strong> " . htmlspecialchars($admin_username) . "</p>";
        echo "<p><strong>Email:</strong> " . htmlspecialchars($admin_email) . "</p>";
        echo "<p><strong>Password:</strong> " . htmlspecialchars($admin_password) . "</p>";
        echo "<p style='color: #721c24;'><strong>Important:</strong> Please save these credentials and change the password after first login.</p>";
        echo "</div>";
    } else {
        echo "<div style='margin: 20px; padding: 20px; border: 1px solid #dc3545; border-radius: 5px; background-color: #f8d7da; color: #721c24;'>";
        echo "Error creating admin user: " . htmlspecialchars($conn->error);
        echo "</div>";
    }
} else {
    echo "<div style='margin: 20px; padding: 20px; border: 1px solid #ffc107; border-radius: 5px; background-color: #fff3cd; color: #856404;'>";
    echo "Admin user already exists!";
    echo "</div>";
}

// Close statements
if(isset($check_stmt)) $check_stmt->close();
if(isset($insert_stmt)) $insert_stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Create Admin User</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
        }
        .alert {
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3 class="text-center">Admin User Setup</h3>
            </div>
            <div class="card-body">
                <div class="alert alert-info">
                    <strong>Note:</strong> This script creates the admin table and a default admin user if they don't exist.
                </div>
                <div class="footer">
                    <a href="login.php" class="btn btn-primary">Go to Login Page</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
