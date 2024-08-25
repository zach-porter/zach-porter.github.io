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

    document.querySelector('.hero-content h1').textContent = `${greeting}, Welcome to My Portfolio`;

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
                    observer.unobserve(entry.target); // Optional: Unobserve non-fade-in-out elements
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

    // Smooth scroll
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

    // Collapsible sections
    var collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Collapsible sections
    var collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            var content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
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
});
// JavaScript for showing the success message after form submission
        document.getElementById('contact-form').addEventListener('submit', function(event) {
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

fetch('blog-posts.json')
    .then(response => response.json())
    .then(posts => {
        const snippetsContainer = document.querySelector('.blog-snippets');
        
        // Iterate over each post to create snippets
        posts.forEach(post => {
            const snippetElement = document.createElement('article');
            snippetElement.classList.add('blog-snippet', 'fade-in-out');
            
            // Create the snippet with the title, image, and a short description
            snippetElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog-image">
                <h2><a href="#" class="blog-link" data-title="${post.title}" data-intro="${post.intro}" data-sections='${JSON.stringify(post.sections)}'>${post.title}</a></h2>
                <p>${post.intro}</p>
                <a href="#" class="btn" data-title="${post.title}" data-intro="${post.intro}" data-sections='${JSON.stringify(post.sections)}'>Read More</a>
            `;
            snippetsContainer.appendChild(snippetElement);
        });

        // Event listener to handle full post content display
        document.querySelectorAll('.btn, .blog-link').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                
                // Get the title, intro, and sections data
                const title = event.target.dataset.title;
                const intro = event.target.dataset.intro;
                const sections = JSON.parse(event.target.dataset.sections);

                // Create the HTML content for the full blog post
                let fullContent = `<h1>${title}</h1><p>${intro}</p>`;
                sections.forEach(section => {
                    fullContent += `<h2>${section.heading}</h2><p>${section.content}</p>`;
                });

                // Display the full content in the main blog post area
                const mainBlogPost = document.querySelector('.blog-post');
                mainBlogPost.innerHTML = fullContent;
            });
        });
    });
