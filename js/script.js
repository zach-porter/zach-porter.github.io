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
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                entry.target.classList.remove('fade-out');
                observer.unobserve(entry.target); // Optional: Unobserve after it has appeared
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
