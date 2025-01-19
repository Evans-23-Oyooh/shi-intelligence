<?php
require_once 'database.php';

// Fetch all blog posts
$sql = "SELECT * FROM blog_posts ORDER BY created_date DESC";
$result = $conn->query($sql);

// Store all posts in an array for both carousel and blog section
$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}
?>


</head>
<body>
    <!-- Header with navigation -->
    <nav class="navbar navbar-expand-lg navbar-blue" style="position: sticky; top: 0; z-index: 1000; background-image: url('bg_bot.jpg'); background-size: cover; background-position: center;">
        <div class="container">
            <a class="navbar-brand" href="#"><img src="shi-logo.png">SHI-INTELLIGENCE PUBLIC BLOG</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Slideshow using blog post images -->
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <?php for($i = 0; $i < min(count($posts), 5); $i++): ?>
                <li data-target="#carouselExampleIndicators" data-slide-to="<?php echo $i; ?>" 
                    <?php echo $i === 0 ? 'class="active"' : ''; ?>></li>
            <?php endfor; ?>
        </ol>
        <div class="carousel-inner">
            <?php 
            $count = 0;
            foreach($posts as $post): 
                if($count >= 5) break; // Show only first 5 posts in carousel
            ?>
                <div class="carousel-item <?php echo $count === 0 ? 'active' : ''; ?>">
                    <img src="<?php echo htmlspecialchars($post['image']); ?>" class="d-block w-100" alt="<?php echo htmlspecialchars($post['title']); ?>">
                    <div class="carousel-caption d-none d-md-block">
                        <h5><?php echo htmlspecialchars($post['title']); ?></h5>
                        <p><?php echo htmlspecialchars(substr($post['description'], 0, 100)) . '...'; ?></p>
                        <button class="btn btn-primary" onclick='openBlogPost(<?php echo json_encode($post); ?>)'>Read More</button>
                    </div>
                </div>
            <?php 
                $count++;
            endforeach; 
            ?>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
    </div>

    <!-- Blog Section -->
    <div id="blog-section" class="container mt-5">
        <h2 class="mb-4">Blog Posts</h2>
        <div class="row">
            <?php foreach($posts as $post): ?>
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="<?php echo htmlspecialchars($post['image']); ?>" class="card-img-top" alt="Blog Image">
                        <div class="card-body">
                            <h5 class="card-title"><?php echo htmlspecialchars($post['title']); ?></h5>
                            <p class="card-text"><?php echo htmlspecialchars(substr($post['description'], 0, 150)) . '...'; ?></p>
                            <p class="card-text"><small class="text-muted">Target Audience: <?php echo htmlspecialchars($post['target_audience']); ?></small></p>
                            <p class="card-text"><small class="text-muted">Posted on: <?php echo date('F j, Y', strtotime($post['created_date'])); ?></small></p>
                            <button class="btn btn-primary" onclick='openBlogPost(<?php echo json_encode($post); ?>)'>Read More</button>
                            <div class="social-icons mt-2">
                                <?php if ($post['social_facebook']): ?>
                                    <a href="<?php echo htmlspecialchars($post['social_facebook']); ?>" target="_blank"><i class="fab fa-facebook"></i></a>
                                <?php endif; ?>
                                <?php if ($post['social_twitter']): ?>
                                    <a href="<?php echo htmlspecialchars($post['social_twitter']); ?>" target="_blank"><i class="fab fa-twitter"></i></a>
                                <?php endif; ?>
                                <?php if ($post['social_instagram']): ?>
                                    <a href="<?php echo htmlspecialchars($post['social_instagram']); ?>" target="_blank"><i class="fab fa-instagram"></i></a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Blog Post Modal -->
    <div class="modal fade" id="blogPostModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img id="modalImage" class="mb-3 w-100" alt="Blog Image">
                    <p id="modalDescription"></p>
                    <p class="text-muted" id="modalTargetAudience"></p>
                    <p class="text-muted" id="modalDate"></p>
                    <div id="modalSocialIcons" class="social-icons"></div>
                </div>
            </div>
        </div>
    </div>
    <!DOCTYPE html>
<html>
<head>
<?php
// At the beginning of the file after database connection
if(isset($_GET['id'])) {
    $post_id = (int)$_GET['id'];
    
    // Update views count
    $update_views = "UPDATE blog_posts SET views = views + 1 WHERE id = ?";
    $stmt = $conn->prepare($update_views);
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    
    // Get the post details
    $sql = "SELECT * FROM blog_posts WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $post = $result->fetch_assoc();
}
?>
<?php
// Query to get all posts with their view counts
$sql = "SELECT *, COALESCE(views, 0) as view_count FROM blog_posts ORDER BY created_at DESC";
$result = $conn->query($sql);

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
?>
    <div class="post-card">
        <h2><?php echo htmlspecialchars($row['title']); ?></h2>
        <p><?php echo htmlspecialchars(substr($row['description'], 0, 200)) . '...'; ?></p>
        <div class="post-meta">
            <span class="views">👁 <?php echo number_format($row['view_count']); ?> views</span>
            <a href="post.php?id=<?php echo $row['id']; ?>" class="read-more">Read More</a>
        </div>
    </div>
<?php
    }
} else {
    echo "<p>No posts found.</p>";
}
?>

<style>
.post-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    width:80%;
    margin-left:10%;
    margin-right: 10%;
}

.post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

.views {
    color: #666;
    font-size: 0.9em;
}

.read-more {
    background: #007bff;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    text-decoration: none;
}

.read-more:hover {
    background: #0056b3;
    text-decoration: none;
    color: white;
}
</style>


    <title>Blog</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .navbar-brand img {
            height: 50px;
        }
        .carousel-inner img {
            height: 500px; /* Increased height for better visibility */
            width: 100%;
            object-fit: cover;
        }
        .carousel-caption {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 5px;
        }
        footer {
            background-color: #f8f9fa;
            padding: 20px 0;
            text-align: center;
        }
        .card-img-top {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .card {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .card-body {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .card-text {
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .modal-body img {
            max-width: 100%;
            height: auto;
        }
        .social-icons {
            margin-top: auto;
        }
        .social-icons a {
            margin-right: 10px;
            color: #666;
        }
        .social-icons a:hover {
            color: #333;
        }
    </style>
    <!-- Footer -->
<footer class="footer mt-5">
    <div class="container">
        <div class="row">
            <!-- About Section -->
            <div class="col-md-4 mb-4">
                <h5 class="text-dark mb-3">About Us</h5>
                <p class="text-muted">SHI’s role in these cases often involves confidential operations and strategic partnerships with leading global agencies. While specific details of our methodologies remain undisclosed, SHI’s contributions have consistently demonstrated our ability to navigate complex financial landscapes, recover stolen assets, and ensure justice for affected parties.
                .</p>
            </div>

            <!-- Quick Links -->
            <div class="col-md-4 mb-4">
                <h5 class="text-dark mb-3">Quick Links</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="#" class="text-muted text-decoration-none">Home</a></li>
                    <li class="mb-2"><a href="#blog-section" class="text-muted text-decoration-none">Blog</a></li>
                    <li class="mb-2"><a href="#about-section" class="text-muted text-decoration-none">About</a></li>
                    <li class="mb-2"><a href="#contact-section" class="text-muted text-decoration-none">Contact</a></li>
                </ul>
            </div>

            <!-- Contact Info -->
            <div class="col-md-4 mb-4">
                <h5 class="text-dark mb-3">Contact Us</h5>
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
    
</body>
</html>
