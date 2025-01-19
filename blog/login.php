<?php
session_start();
require_once 'database.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';



$message = '';
$messageType = 'html';

// Handle Login
if(isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $sql = "SELECT * FROM admin WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($row = $result->fetch_assoc()) {
        if(password_verify($password, $row['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            header("Location: dashboard.php");
            exit();
        } else {
            $message = "Invalid username or password";
            $messageType = "danger";
        }
    } else {
        $message = "Invalid username or password";
        $messageType = "danger";
    }
}

// Handle Forgot Password
if(isset($_POST['forgot_password'])) {
    $email = trim($_POST['email']);
    
    $sql = "SELECT * FROM admin WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($admin = $result->fetch_assoc()) {
        // Generate token
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        // Delete any existing tokens for this admin
        $delete_sql = "DELETE FROM password_resets WHERE admin_id = ?";
        $delete_stmt = $conn->prepare($delete_sql);
        $delete_stmt->bind_param("i", $admin['id']);
        $delete_stmt->execute();
        
        // Insert new token
        $insert_sql = "INSERT INTO password_resets (admin_id, token, expires_at) VALUES (?, ?, ?)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("iss", $admin['id'], $token, $expires);
        
        if($insert_stmt->execute()) {
            // Send email
            $mail = new PHPMailer(true);

            try {
                // Server settings
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP host
                $mail->SMTPAuth = true;
                $mail->Username = 'evans.oyoo@stkizito.ac.ke'; // Replace with your email
                $mail->Password = '1.1Million'; // Replace with your email password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Recipients
                $mail->setFrom('evans.oyoo@stkizito.ac.ke', 'SHI Admin');
                $mail->addAddress($email);

                // Content
                $reset_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/reset_password.php?token=" . $token;
                
                $mail->isHTML(true);
                $mail->Subject = 'Password Reset Request';
                $mail->Body = "
                    <h2>Password Reset Request</h2>
                    <p>You have requested to reset your password. Click the link below to proceed:</p>
                    <p><a href='{$reset_link}'>{$reset_link}</a></p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                ";

                $mail->send();
                $message = "Password reset instructions have been sent to your email";
                $messageType = "success";
            } catch (Exception $e) {
                $message = "Error sending email. Please try again later.";
                $messageType = "danger";
            }
        }
    } else {
        $message = "If the email exists in our system, you will receive reset instructions";
        $messageType = "info";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
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
</head>
<body>
    <!-- Your existing navbar code -->

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <?php if($message): ?>
                    <div class="alert alert-<?php echo $messageType; ?> alert-dismissible fade show">
                        <?php echo $message; ?>
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                    </div>
                <?php endif; ?>

                <div class="card">
                    <div class="card-header text-center">
                        <img src="shi-logo.png" style="height:80px;" class="mb-3">
                        <h4>SHI-ADMIN LOGIN</h4>
                    </div>
                    <div class="card-body">
                        <!-- Login Form -->
                        <form method="POST" id="loginForm">
                            <div class="form-group">
                                <label><i class="fas fa-user"></i> Username</label>
                                <input type="text" name="username" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-lock"></i> Password</label>
                                <input type="password" name="password" class="form-control" required>
                            </div>
                            <div class="form-group text-right">
                                <a href="#" class="forgot-password" onclick="showForgotPassword()">
                                    Forgot Password?
                                </a>
                            </div>
                            <button type="submit" name="login" class="btn btn-primary btn-block">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>

                        <!-- Forgot Password Form -->
                        <form method="POST" id="forgotPasswordForm" style="display: none;">
                            <div class="form-group">
                                <label><i class="fas fa-envelope"></i> Email Address</label>
                                <input type="email" name="email" class="form-control" required>
                            </div>
                            <button type="submit" name="forgot_password" class="btn btn-primary btn-block">
                                <i class="fas fa-paper-plane"></i> Send Reset Link
                            </button>
                            <button type="button" class="btn btn-secondary btn-block" onclick="showLogin()">
                                <i class="fas fa-arrow-left"></i> Back to Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Your existing footer code -->

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    <script>
    function showForgotPassword() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('forgotPasswordForm').style.display = 'block';
    }

    function showLogin() {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('forgotPasswordForm').style.display = 'none';
    }
    </script>
</body>
</html>
