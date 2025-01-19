<?php
require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $post_id = (int)$_POST['post_id'];
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $comment = trim($_POST['comment']);
    
    // Basic validation
    if (empty($name) || empty($email) || empty($comment)) {
        die("Please fill in all fields");
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }
    
    // Insert comment
    $sql = "INSERT INTO blog_comments (post_id, name, email, comment) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isss", $post_id, $name, $email, $comment);
    
    if ($stmt->execute()) {
        // Redirect back to the post
        header("Location: post.php?id=" . $post_id . "#comments");
        exit();
    } else {
        echo "Error posting comment: " . $conn->error;
    }
} else {
    header("Location: index.php");
    exit();
}
?>
