<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");
    exit();
}

require_once 'database.php';

// Initialize message variable
$message = '';

// Fetch all blog posts - removed the ORDER BY created_at
$sql = "SELECT * FROM blog_posts";  // Simplified query
$stmt = $conn->prepare($sql);
if ($stmt->execute()) {
    $result = $stmt->get_result();
} else {
    $message = "Error fetching blog posts: " . $conn->error;
}

// Rest of your existing code remains the same...

// Initialize message variable
$message = '';

// Handle form submission for creating a new blog post
if (isset($_POST['submit'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $target_audience = $_POST['target_audience'];
    $facebook = $_POST['facebook'];
    $twitter = $_POST['twitter'];
    $instagram = $_POST['instagram'];

    if(isset($_FILES["image"]) && $_FILES["image"]["error"] == 0) {
        $target_dir = "uploads/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Check if image file is actual image
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {
            if ($_FILES["image"]["size"] <= 50000000) { // 50MB max
                $allowed_formats = ["jpg", "jpeg", "png", "gif"];
                if (in_array($imageFileType, $allowed_formats)) {
                    $unique_name = uniqid() . "." . $imageFileType;
                    $target_file = $target_dir . $unique_name;

                    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                        $sql = "INSERT INTO blog_posts (title, description, image, target_audience, social_facebook, social_twitter, social_instagram) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("sssssss", $title, $description, $target_file, $target_audience, $facebook, $twitter, $instagram);
                        
                        if($stmt->execute()) {
                            $message = "Blog post created successfully!";
                            header("Location: " . $_SERVER['PHP_SELF']);
                            exit();
                        } else {
                            $message = "Error creating blog post.";
                        }
                    }
                } else {
                    $message = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                }
            } else {
                $message = "Sorry, your file is too large.";
            }
        } else {
            $message = "File is not an image.";
        }
    }
}

// Handle delete action
// Handle update action
// Handle update action
if (isset($_POST['update'])) {
    $id = (int)$_POST['id'];
    $title = htmlspecialchars(trim($_POST['title']));
    $description = htmlspecialchars(trim($_POST['description']));
    $target_audience = htmlspecialchars(trim($_POST['target_audience']));
    $facebook = htmlspecialchars(trim($_POST['facebook']));
    $twitter = htmlspecialchars(trim($_POST['twitter']));
    $instagram = htmlspecialchars(trim($_POST['instagram']));

    // First update the text fields
    $sql = "UPDATE blog_posts SET 
            title = ?, 
            description = ?, 
            target_audience = ?, 
            social_facebook = ?, 
            social_twitter = ?, 
            social_instagram = ? 
            WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        $message = "Error preparing statement: " . $conn->error;
    } else {
        $stmt->bind_param("ssssssi", $title, $description, $target_audience, $facebook, $twitter, $instagram, $id);
        
        if (!$stmt->execute()) {
            $message = "Error updating post: " . $stmt->error;
        } else {
            // Handle image update if a new image is uploaded
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $target_dir = "uploads/";
                if (!file_exists($target_dir)) {
                    mkdir($target_dir, 0777, true);
                }

                $imageFileType = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
                
                // Validate image
                $check = getimagesize($_FILES['image']['tmp_name']);
                if ($check !== false) {
                    if ($_FILES['image']['size'] <= 5000000) { // 5MB max
                        $allowed_formats = ["jpg", "jpeg", "png", "gif"];
                        if (in_array($imageFileType, $allowed_formats)) {
                            // Get and delete old image
                            $stmt = $conn->prepare("SELECT image FROM blog_posts WHERE id = ?");
                            $stmt->bind_param("i", $id);
                            $stmt->execute();
                            $result = $stmt->get_result();
                            if ($row = $result->fetch_assoc()) {
                                if (!empty($row['image']) && file_exists($row['image'])) {
                                    unlink($row['image']);
                                }
                            }

                            // Upload new image
                            $unique_name = uniqid() . "." . $imageFileType;
                            $target_file = $target_dir . $unique_name;
                            
                            if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
                                // Update image path in database
                                $sql = "UPDATE blog_posts SET image = ? WHERE id = ?";
                                $stmt = $conn->prepare($sql);
                                if ($stmt) {
                                    $stmt->bind_param("si", $target_file, $id);
                                    if (!$stmt->execute()) {
                                        $message = "Error updating image: " . $stmt->error;
                                    }
                                    
                                } else {
                                    $message = "Error preparing image update statement: " . $conn->error;
                                }
                            } else {
                                $message = "Error moving uploaded file.";
                            }
                        } else {
                            $message = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                        }
                    } else {
                        $message = "Sorry, your file is too large.";
                    }
                } else {
                    $message = "File is not an image.";
                }
            }
            
            if (empty($message)) {
                $message = "Post updated successfully!";
                header("Location: " . $_SERVER['PHP_SELF']);
                exit();
            }
        }
    }
}
// Add this after your update handler

// Handle delete action
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    
    // First get the image path
    $sql = "SELECT image FROM blog_posts WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($row = $result->fetch_assoc()) {
        // Delete the image file if it exists
        if(!empty($row['image']) && file_exists($row['image'])) {
            unlink($row['image']);
        }
    }

    // Delete the database record
    $sql = "DELETE FROM blog_posts WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if($stmt->execute()) {
        $message = "Post deleted successfully!";
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    } else {
        $message = "Error deleting post: " . $stmt->error;
    }
}


?>
<!DOCTYPE html>
<html>
<head>
    <title>SHI-Admin</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .post-form {
            display: none;
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .modal-dialog {
            max-width: 700px;
        }
        .table img {
            max-width: 100px;
            height: auto;
        }
        .btn {
            margin: 2px;
        }
        .description-cell {
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .form-group {
            margin-bottom: 10px;
        }
        textarea {
            height: 100px !important;
        }
        .profile-dropdown .btn-secondary {
    transition: all 0.3s ease;
}

.profile-dropdown .dropdown-menu {
    animation: fadeIn 0.2s ease;
}

.profile-dropdown .dropdown-item {
    transition: all 0.2s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Optional: Add a subtle background blur effect */
.profile-dropdown .dropdown-menu {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.95);
}
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-blue" style="background-color: orange; position: sticky; top: 0; z-index: 1000; background-image: url('bg_bot.jpg'); background-size: cover; background-position: center;">

        <div class="container">
            <a class="navbar-brand" href="#"><img src="shi-logo.png" style="height:80px; color:orange;text-align:center">Admin Use Only</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="index.php">Blog</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about-section">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact-section">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact-section"><span></span></a></li>
                    <li><div class="d-flex justify-content-between align-items-center mb-4">

                    <div class="dropdown">

<!-- Add this to your navbar -->
 
<?php
// Fetch admin data


// Fetch admin data
$admin_id = $_SESSION['admin_id'];
$admin_query = "SELECT id, username, email, profile_image FROM admin WHERE id = ?";
$admin_stmt = $conn->prepare($admin_query);
$admin_stmt->bind_param("i", $admin_id);
$admin_stmt->execute();
$admin_result = $admin_stmt->get_result();
$admin_data = $admin_result->fetch_assoc();

?>

<!-- Admin Profile Dropdown -->
<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <?php if (!empty($admin_data['profile_image']) && file_exists($admin_data['profile_image'])): ?>
            <img src="<?php echo htmlspecialchars($admin_data['profile_image']); ?>" 
                 alt="Profile" 
                 class="rounded-circle profile-image"
                 style="width: 30px; height: 30px; object-fit: cover;">
        <?php else: ?>
            <i class="fas fa-user"></i>
        <?php endif; ?>
        <?php echo htmlspecialchars($admin_data['username'] ?? 'Admin'); ?>
    </a>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
        <div class="dropdown-item-text">
            <small class="text-muted">Signed in as</small><br>
            <strong><?php echo htmlspecialchars($admin_data['email'] ?? ''); ?></strong>
        </div>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="update_profile.php">
            <i class="fas fa-user-edit"></i> Edit Profile
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="logout.php" 
           onclick="return confirm('Are you sure you want to logout?');">
            <i class="fas fa-sign-out-alt"></i> Logout
        </a>
    </div>
</li>


<!-- Add these styles to your CSS -->
<style>
.profile-image {
    border: 2px solid #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
}

.profile-image:hover {
    transform: scale(1.1);
}

.dropdown-item {
    padding: .5rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.3s ease;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}

.dropdown-item i {
    width: 20px;
    text-align: center;
}

.dropdown-item-text {
    padding: .5rem 1.5rem;
}

.dropdown-divider {
    margin: 0.5rem 0;
}

.text-danger:hover {
    background-color: #dc3545 !important;
    color: white !important;
}

.nav-item.dropdown {
    display: flex;
    align-items: center;
}

.nav-link.dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>

<!-- Make sure you have the following in your header -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<!-- Add this JavaScript for smooth dropdown behavior -->
<script>
$(document).ready(function() {
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Add hover class to dropdown parent
    $('.dropdown').hover(
        function() { $(this).addClass('show').find('.dropdown-menu').addClass('show'); },
        function() { $(this).removeClass('show').find('.dropdown-menu').removeClass('show'); }
    );

    // Confirm logout
    $('.logout-link').click(function(e) {
        if(!confirm('Are you sure you want to logout?')) {
            e.preventDefault();
        }
    });
});
</script>

    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</div></li>

                </ul>
            </div>
        </div>
    </nav>
    
    <div class="container mt-5">
        <?php if(!empty($message)): ?>
            <div class="alert alert-info">
                <?php echo htmlspecialchars($message); ?>
            </div>
        <?php endif; ?>
        <?php
// Add these queries at the top of your PHP section after database connection

// Get total number of posts
$posts_query = "SELECT COUNT(*) as total_posts FROM blog_posts";
$posts_result = $conn->query($posts_query);
$total_posts = $posts_result->fetch_assoc()['total_posts'];

// Get total number of views (assuming you have a views column in your table)
// If you don't have a views column, you'll need to add it first:
// ALTER TABLE blog_posts ADD COLUMN views INT DEFAULT 0;
$views_query = "SELECT SUM(views) as total_views FROM blog_posts";
$views_result = $conn->query($views_query);
$total_views = $views_result->fetch_assoc()['total_views'] ?? 0;

// Get latest post date
$latest_post_query = "SELECT created_at FROM blog_posts ORDER BY created_at DESC LIMIT 1";
$latest_post_result = $conn->query($latest_post_query);
$latest_post_date = $latest_post_result->fetch_assoc()['created_at'] ?? 'No posts yet';

?>

        <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="container-fluid mt-4">
    <div class="row">
        <div class="col-12">
            <h4 class="text-primary mb-4">SHI-Intelligence Blog Admin Dashboard</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <div class="card bg-primary text-white mb-4">
                <div class="card-body">
                    <h5 class="card-title">Total Posts</h5>
                    <h2 class="card-text"><?php echo $total_posts; ?></h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-success text-white mb-4">
                <div class="card-body">
                    <h5 class="card-title">Total Views</h5>
                    <h2 class="card-text"><?php echo number_format($total_views); ?></h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-info text-white mb-4">
                <div class="card-body">
                    <h5 class="card-title">Latest Post</h5>
                    <p class="card-text">
                        <?php 
                        if($latest_post_date != 'No posts yet') {
                            echo date('M d, Y H:i', strtotime($latest_post_date));
                        } else {
                            echo $latest_post_date;
                        }
                        ?>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-warning text-dark mb-4">
                <div class="card-body">
                    <h5 class="card-title">Current Time</h5>
                    <p class="card-text" id="currentTime"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Add this JavaScript before closing body tag -->
<script>
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('currentTime').textContent = now.toLocaleDateString('en-US', options);
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);
</script>

<!-- Add this CSS in your head section -->
<style>
.card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 1.5rem;
}

.card-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.card-text {
    margin-bottom: 0;
}
</style>
           
        </div>
        <button type="button" class="btn btn-primary" onclick="toggleForm()">Add New Post</button>
        <!-- Add this in the header/navigation area of your dashboard -->
        <div class="container mt-5">
    
</div>


<!-- Profile Edit Modal -->
<style>
    /* Profile Dropdown Styles */
    .profile-dropdown {
        position: relative;
        margin-left: auto;
    }

    .profile-button {
        background-color: #f8f9fa;
        border: 1px solid #ddd;
        padding: 8px 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 25px;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .profile-button:hover {
        background-color: #e9ecef;
        border-color: #c8c9ca;
    }

    .profile-button i {
        color:orange;
        font-size: 16px;
    }

    .dropdown-menu {
        margin-top: 8px;
        border: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 8px;
        min-width: 200px;
    }

    .dropdown-item {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .dropdown-item i {
        width: 20px;
        color:white;
    }

    .dropdown-item:hover {
        background-color: #f8f9fa;
        color: #007bff;
    }

    /* Modal Styles */
    .modal-content {
        border-radius: 12px;
        border: none;
        box-shadow: white;
    }

    .modal-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #eee;
        padding: 15px 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-control {
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #ddd;
    }
</style>


<!-- Edit Post Modal -->
 <!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Post</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="POST" enctype="multipart/form-data">
                <div class="modal-body">
                    <input type="hidden" name="id" id="edit_id">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" name="title" id="edit_title" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" name="description" id="edit_description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Target Audience</label>
                        <input type="text" class="form-control" name="target_audience" id="edit_target_audience">
                    </div>
                    <div class="form-group">
                        <label>Facebook</label>
                        <input type="text" class="form-control" name="facebook" id="edit_facebook">
                    </div>
                    <div class="form-group">
                        <label>Twitter</label>
                        <input type="text" class="form-control" name="twitter" id="edit_twitter">
                    </div>
                    <div class="form-group">
                        <label>Instagram</label>
                        <input type="text" class="form-control" name="instagram" id="edit_instagram">
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="file" class="form-control" name="image" accept="image/*">
                        <small class="form-text text-muted">Leave empty to keep current image</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" name="update" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
function editPost(id) {
    // Fetch post data using AJAX
    $.ajax({
        url: 'get_post.php',
        type: 'GET',
        data: {id: id},
        success: function(response) {
            const post = JSON.parse(response);
            $('#edit_id').val(post.id);
            $('#edit_title').val(post.title);
            $('#edit_description').val(post.description);
            $('#edit_target_audience').val(post.target_audience);
            $('#edit_facebook').val(post.social_facebook);
            $('#edit_twitter').val(post.social_twitter);
            $('#edit_instagram').val(post.social_instagram);
            $('#editModal').modal('show');
        }
    });
}
</script>

<!-- Make sure you have these required external resources -->



        <!-- Add New Post Form -->
        <div class="post-form" id="addPostForm">
            <div class="row">
                <div class="col-md-12">
                    <h3>Create New Blog Post</h3>
                    <form method="POST" enctype="multipart/form-data" class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" name="title" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea name="description" class="form-control" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file" name="image" class="form-control" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Target Audience</label>
                                <input type="text" name="target_audience" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Facebook Link</label>
                                <input type="url" name="facebook" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Twitter Link</label>
                                <input type="url" name="twitter" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Instagram Link</label>
                                <input type="url" name="instagram" class="form-control">
                            </div>
                        </div>
                        <div class="col-12 mt-3">
                            <button type="submit" name="submit" class="btn btn-success">Create Post</button>
                            <button type="button" class="btn btn-secondary" onclick="toggleForm()">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Posts Table -->
        <div class="mt-12">
    <h3>Existing Posts</h3>
    <div class="container mt-4">
    <?php if (!empty($message)): ?>
        <div class="alert alert-info"><?php echo $message; ?></div>
    <?php endif; ?>

    <table class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Target Audience</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php if ($result && $result->num_rows > 0): ?>
                <?php while($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['title']); ?></td>
                        <td class="description-cell"><?php echo htmlspecialchars($row['description']); ?></td>
                        <td>
                            <?php if (!empty($row['image']) && file_exists($row['image'])): ?>
                                <img src="<?php echo htmlspecialchars($row['image']); ?>" alt="Blog post image">
                            <?php endif; ?>
                        </td>
                        <td><?php echo htmlspecialchars($row['target_audience']); ?></td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editPost(<?php echo $row['id']; ?>)">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deletePost(<?php echo $row['id']; ?>)">Delete</button>
                        </td>
                    </tr>
                <?php endwhile; ?>
            <?php else: ?>
                <tr>
                    <td colspan="5" class="text-center">No blog posts found</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>
</div>

<!-- Update Modal -->


    </div>
    <footer class="footer mt-5" style="background-color: orange; top: 0; z-index: 1000; background-image: url('bg_bot.jpg'); background-size: cover; background-position: center;">
    <div class="container">
        <div class="row">
            <!-- About Section -->
            <div class="col-md-4 mb-4">
                <h5 class="text-white mb-3">About Us</h5>
                <p class="text-muted">SHI’s role in these cases often involves confidential operations and strategic partnerships with leading global agencies. While specific details of our methodologies remain undisclosed, SHI’s contributions have consistently demonstrated our ability to navigate complex financial landscapes, recover stolen assets, and ensure justice for affected parties.
                .</p>
            </div>

            <!-- Quick Links -->
            <div class="col-md-4 mb-4">
                <h5 class="text-white mb-3">Quick Links</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Home</a></li>
                    <li class="mb-2"><a href="#blog-section" class="text-muted text-decoration-none">Blog</a></li>
                    <li class="mb-2"><a href="#about-section" class="text-muted text-decoration-none">About</a></li>
                    <li class="mb-2"><a href="#contact-section" class="text-muted text-decoration-none">Contact</a></li>
                </ul>
            </div>

            <!-- Contact Info -->
            <div class="col-md-4 mb-4">
                <h5 class="text-white mb-3">Contact Us</h5>
                <ul class="list-unstyled text-muted">
                    <li class="mb-2"><i class="fas fa-map-marker-alt mr-2"></i> 123 Blog Street, City, Country</li>
                    <li class="mb-2"><i class="fas fa-phone mr-2"></i> +1 234 567 890</li>
                    <li class="mb-2"><i class="fas fa-envelope mr-2"></i> casefiles@shi-intel.com</li>
                </ul>
                <!-- Social Media Icons -->
                <div class="mt-3">
                    <a href="#" class="text-muted mr-3"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-muted mr-3"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-muted mr-3"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-muted"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="row mt-3">
            <div class="col-12">
                <hr>
                <p class="text-center text-muted mb-0">
                <a class="navbar-brand" href="#"><img src="shi-logo.png" style="height:80px;"></a>
                    © <?php echo date('Y'); ?> shi-intelligence Team. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</footer>

<!-- Add this CSS to your existing style section -->
<style>
.footer {
    background-color: #f8f9fa;
    padding: 50px 0 20px;
    margin-top: 50px;
    border-top: 1px solid #dee2e6;
}

.footer h5 {
    font-weight: 600;
    font-size: 1.1rem;
}

.footer .text-muted {
    color: #6c757d !important;
}

.footer a {
    transition: color 0.3s ease;
}

.footer a:hover {
    color: #343a40 !important;
    text-decoration: none;
}

.footer .social-icons a {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
    display: inline-block;
}

.footer .social-icons a:hover {
    transform: translateY(-3px);
}

.footer hr {
    margin: 20px 0;
    border-color: #dee2e6;
}

.footer .list-unstyled li {
    margin-bottom: 10px;
}

.footer i {
    width: 20px;
    text-align: center;
}

@media (max-width: 768px) {
    .footer {
        text-align: center;
    }
    
    .footer .social-icons {
        margin-top: 20px;
    }
}
.modal-body {
    max-height: 400px;
    overflow-y: auto;
}

</style>

    <!-- Rest of your sections remain the same -->

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    <script>
    function openBlogPost(data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalDescription').textContent = data.description;
        document.getElementById('modalTargetAudience').textContent = 'Target Audience: ' + data.target_audience;
        document.getElementById('modalDate').textContent = 'Posted on: ' + new Date(data.created_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let socialIcons = '';
        if (data.social_facebook) {
            socialIcons += `<a href="${data.social_facebook}" target="_blank"><i class="fab fa-facebook"></i></a> `;
        }
        if (data.social_twitter) {
            socialIcons += `<a href="${data.social_twitter}" target="_blank"><i class="fab fa-twitter"></i></a> `;
        }
        if (data.social_instagram) {
            socialIcons += `<a href="${data.social_instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
        }
        document.getElementById('modalSocialIcons').innerHTML = socialIcons;

        $('#blogPostModal').modal('show');
    }

    // Auto-play carousel
    $('.carousel').carousel({
        interval: 3000 // Change slide every 3 seconds
    });
    </script>
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    <script>
    function toggleForm() {
        const form = document.getElementById('addPostForm');
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'block';
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            form.style.display = 'none';
        }
    }

    function openUpdateModal(data) {
    try {
        // If data is a string, parse it
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        // Assuming data is now an object, populate the modal fields
        document.getElementById('update_id').value = data.id;
        document.getElementById('update_title').value = data.title;
        document.getElementById('update_description').value = data.description;  // Ensure description is intact
        document.getElementById('update_target_audience').value = data.target_audience;
        document.getElementById('update_facebook').value = data.social_facebook;
        document.getElementById('update_twitter').value = data.social_twitter;
        document.getElementById('update_instagram').value = data.social_instagram;

        // Open the modal
        $('#updateModal').modal('show');
    } catch (e) {
        console.error('Error parsing or opening the modal:', e);
        alert('An error occurred while opening the update modal. Please try again.');
    }
}

    </script>
    <!-- Delete Confirmation Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this post? This action cannot be undone.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <a href="#" id="confirmDelete" class="btn btn-danger">Delete</a>
            </div>
        </div>
    </div>
</div>
<script>
function deletePost(id) {
    // Set the delete link
    document.getElementById('confirmDelete').href = '?delete=' + id;
    // Show the modal
    $('#deleteModal').modal('show');
}
</script>

</body>
</html>

