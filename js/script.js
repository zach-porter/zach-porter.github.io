document.addEventListener('DOMContentLoaded', function() {
    // Greeting based on time of day
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    const heroContent = document.querySelector('.hero-content h1');
    if (heroContent) {
        heroContent.textContent = `${greeting}, Welcome to My Portfolio`;
    }

    // Combined Intersection Observer for fade-in, slide-in, and fade-in-out effects
    const elementsToObserve = document.querySelectorAll('.fade-in, .slide-in, .fade-in-out');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('fade-out');
                if (!entry.target.classList.contains('fade-in-out')) {
                    observer.unobserve(entry.target); // Unobserve non-fade-in-out elements
                }
            } else if (entry.target.classList.contains('fade-in-out')) {
                entry.target.classList.add('fade-out');
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for internal links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Collapsible sections functionality
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    document.getElementById('success-message').style.display = 'block';
                    this.reset(); // Clear the form
                } else {
                    alert('Oops! There was a problem submitting your form');
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form');
            });
        });
    }

    fetch('https://zach-porter.github.io/assets/blog-post.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            console.log(posts); // Log the fetched posts to the console for debugging
            const mainBlogPostContainer = document.getElementById('main-blog-post');

            if (posts.length > 0) {
                const mainPost = posts[0];

                // Create the HTML content for the full blog post
                let fullContent = `<h1>${mainPost.title}</h1><p>${mainPost.intro}</p>`;
                mainPost.sections.forEach(section => {
                    fullContent += `<h2>${section.heading}</h2><p>${section.content}</p>`;
                });

                // Display the full content in the main blog post area
                mainBlogPostContainer.innerHTML = fullContent;
            } else {
                mainBlogPostContainer.innerHTML = '<p>No posts available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the blog post data:', error);
            const mainBlogPostContainer = document.getElementById('main-blog-post');
            mainBlogPostContainer.innerHTML = '<p>Failed to load the blog post. Please try again later.</p>';
        });
});
