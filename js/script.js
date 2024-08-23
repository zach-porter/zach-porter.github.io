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