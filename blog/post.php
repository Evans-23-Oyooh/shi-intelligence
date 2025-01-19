<?php
session_start();
require_once 'database.php'; // Add this line to include database connection

// Function to check if view should be counted
function shouldCountView($post_id) {
    if(!isset($_SESSION['viewed_posts'])) {
        $_SESSION['viewed_posts'] = array();
    }
    
    if(!in_array($post_id, $_SESSION['viewed_posts'])) {
        $_SESSION['viewed_posts'][] = $post_id;
        return true;
    }
    
    return false;
}

if(isset($_GET['id'])) {
    $post_id = (int)$_GET['id'];
    
    // Update views count if this is a new view
    if(shouldCountView($post_id)) {
        $update_views = "UPDATE blog_posts SET views = views + 1 WHERE id = ?";
        $stmt = $conn->prepare($update_views);
        $stmt->bind_param("i", $post_id);
        $stmt->execute();
    }
    
    // Get post details with updated view count
    $sql = "SELECT *, COALESCE(views, 0) as view_count FROM blog_posts WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($post = $result->fetch_assoc()) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($post['title']); ?></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .post-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .post-meta {
            color: #666;
            margin: 10px 0 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
        }

        .post-image img {
            max-width: 100%;
            height: auto;
            margin: 20px 0;
            border-radius: 8px;
        }

        .back-button {
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="back-button">
            <a href="index.php" class="btn btn-secondary">&larr; Back to Blog</a>
        </div>
        
        <div class="post-container">
            <h1><?php echo htmlspecialchars($post['title']); ?></h1>
            <div class="post-meta">
                <span class="views">👁 <?php echo number_format($post['view_count']); ?> views</span>
                <span class="date"><?php echo date('M d, Y', strtotime($post['created_at'])); ?></span>
            </div>
            
            <?php if(!empty($post['image']) && file_exists($post['image'])): ?>
                <div class="post-image">
                    <img src="<?php echo htmlspecialchars($post['image']); ?>" alt="Post image" class="img-fluid">
                </div>
            <?php endif; ?>
            
            <div class="post-content">
                <?php echo nl2br(htmlspecialchars($post['description'])); ?>
            </div>

            <?php if(!empty($post['target_audience'])): ?>
                <div class="target-audience mt-4">
                    <strong>Target Audience:</strong> <?php echo htmlspecialchars($post['target_audience']); ?>
                </div>
            <?php endif; ?>

            <?php if(!empty($post['social_facebook']) || !empty($post['social_twitter']) || !empty($post['social_instagram'])): ?>
                <div class="social-links mt-4">
                    <h5>Follow us on:</h5>
                    <?php if(!empty($post['social_facebook'])): ?>
                        <a href="<?php echo htmlspecialchars($post['social_facebook']); ?>" target="_blank" class="btn btn-primary mr-2">Facebook</a>
                    <?php endif; ?>
                    <?php if(!empty($post['social_twitter'])): ?>
                        <a href="<?php echo htmlspecialchars($post['social_twitter']); ?>" target="_blank" class="btn btn-info mr-2">Twitter</a>
                    <?php endif; ?>
                    <?php if(!empty($post['social_instagram'])): ?>
                        <a href="<?php echo htmlspecialchars($post['social_instagram']); ?>" target="_blank" class="btn btn-danger">Instagram</a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <!-- Comments Section -->
<div class="comments-section mt-5">
    <h3>Comments</h3>
    
    <!-- Comment Form -->
    <div class="comment-form mb-4">
        <form method="POST" action="add_comment.php">
            <input type="hidden" name="post_id" value="<?php echo $post_id; ?>">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="comment">Comment</label>
                <textarea class="form-control" id="comment" name="comment" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Comment</button>
        </form>
    </div>

    <!-- Display Comments -->
    <?php
    // Fetch comments for this post
    $comments_sql = "SELECT * FROM blog_comments WHERE post_id = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($comments_sql);
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    $comments_result = $stmt->get_result();
    ?>

    <div class="comments-list">
        <?php if($comments_result->num_rows > 0): ?>
            <?php while($comment = $comments_result->fetch_assoc()): ?>
                <div class="comment-card mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo htmlspecialchars($comment['name']); ?></h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                <?php echo date('M d, Y H:i', strtotime($comment['created_at'])); ?>
                            </h6>
                            <p class="card-text"><?php echo nl2br(htmlspecialchars($comment['comment'])); ?></p>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p class="text-muted">No comments yet. Be the first to comment!</p>
        <?php endif; ?>
    </div>
</div>

<!-- Add these styles to your existing style section -->
<style>
.comments-section {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid #eee;
}

.comment-card .card {
    border-left: 4px solid #007bff;
}

.comment-form {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
}
</style>

        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
<?php
    } else {
        echo "<p>Post not found.</p>";
    }
}
?>
