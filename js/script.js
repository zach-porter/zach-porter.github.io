'use strict'; // Enforce stricter parsing and error handling

// --- Tableau Visualization Initialization Functions ---

// Function to initialize the first Tableau Viz (IBM HR)
function initViz1() {
    const containerDiv = document.getElementById('viz1733172334723');
    if (!containerDiv) {
        // console.warn("Tableau container 'viz1733172334723' not found.");
        return; // Exit if container not found on this page
    }

    // Construct URL from the 'name' param in the original embed code:
    // name='IBMHRDataset_17325882094180/IBMHRDataset'
    const vizPath = 'IBMHRDataset_17325882094180/IBMHRDataset';
    const url = `https://public.tableau.com/views/${vizPath}`;

    const options = {
        hideTabs: true,     // Based on original 'tabs=no'
        hideToolbar: false,   // Based on original 'toolbar=yes'
        width: '100%',      // Fill the container
        height: '100%',     // Fill the container
        onFirstInteractive: function () {
            console.log("Tableau Viz 1 (IBM HR) Loaded successfully.");
        }
    };

    try {
        // Dispose of existing viz object if present (e.g., on hot reload)
        if (containerDiv.viz) {
            console.log("Disposing existing Viz 1 object.");
            containerDiv.viz.dispose();
        }
        console.log("Initializing Viz 1 (IBM HR) with URL:", url);
        // Ensure the 'tableau' object is available (loaded from the script tag)
        if (typeof tableau !== 'undefined') {
             containerDiv.viz = new tableau.Viz(containerDiv, url, options);
        } else {
             throw new Error("Tableau API object not found.");
        }
    } catch (error) {
        console.error("Error initializing Tableau Viz 1:", error);
        containerDiv.innerHTML = `<p style="color: red; padding: 10px; background-color: #fff; border-radius: 5px;">Error loading IBM HR visualization. Please check the console or try refreshing.</p><p style="font-size: 0.8em; color: #ccc; margin-top: 5px;">Attempted URL: ${url}</p>`;
    }
}

// Function to initialize the second Tableau Viz (World Happiness)
function initViz2() {
    const containerDiv = document.getElementById('viz1733356206468');
     if (!containerDiv) {
        // console.warn("Tableau container 'viz1733356206468' not found.");
        return; // Exit if container not found on this page
    }

    // Construct URL from the 'name' param in the original embed code:
    // name='World-Happiness-Report_17333561577740/Story1'
    const vizPath = 'World-Happiness-Report_17333561577740/Story1';
    const url = 'https://public.tableau.com/shared/YQY24FFGD'

    const options = {
        hideTabs: true,     // Based on original 'tabs=no'
        hideToolbar: false,   // Based on original 'toolbar=yes'
        width: '100%',
        height: '100%',
        device: (window.innerWidth < 768) ? 'phone' : 'desktop', // Optional hint
        onFirstInteractive: function () {
            console.log("Tableau Viz 2 (World Happiness) Loaded successfully.");
        }
    };

     try {
         if (containerDiv.viz) {
             console.log("Disposing existing Viz 2 object.");
             containerDiv.viz.dispose();
         }
         console.log("Initializing Viz 2 (WHR) with URL:", url);
         // Ensure the 'tableau' object is available
         if (typeof tableau !== 'undefined') {
              containerDiv.viz = new tableau.Viz(containerDiv, url, options);
         } else {
              throw new Error("Tableau API object not found.");
         }
     } catch (error) {
         console.error("Error initializing Tableau Viz 2:", error);
         containerDiv.innerHTML = `<p style="color: red; padding: 10px; background-color: #fff; border-radius: 5px;">Error loading World Happiness visualization. Please check the console or try refreshing.</p><p style="font-size: 0.8em; color: #ccc; margin-top: 5px;">Attempted URL: ${url}</p>`;
     }
}

// --- Function to Load Blog Snippets ---
async function loadBlogSnippets() {
    const container = document.getElementById('blog-snippets-container');
    if (!container) return; // Exit if container not found

    const snippetsJsonPath = 'assets/blog-snippets.json'; // Path relative to blog.html

    try {
        const response = await fetch(snippetsJsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();

        if (!Array.isArray(posts) || posts.length === 0) {
             container.innerHTML = '<p>No posts found.</p>';
             console.warn('Blog snippets data is empty or not an array.');
             return;
        }

        let snippetsHTML = ''; // Build HTML string
        posts.forEach((post, index) => {
            // Basic validation of post object
            if (!post.title || !post.url || !post.description || !post.imageUrl || !post.altText) {
                 console.warn(`Skipping post at index ${index} due to missing data.`, post);
                 return; // Skip this post if data is missing
            }

            const headingId = `snippet-${index}-heading`; // Generate unique ID

            snippetsHTML += `
                <article class="blog-snippet fade-in-out" aria-labelledby="${headingId}">
                    <img src="${post.imageUrl}" alt="${post.altText}" class="blog-image">
                    <h2 id="${headingId}">
                        <a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a>
                    </h2>
                    <p>${post.description}</p>
                    <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="btn">Read More on Substack</a>
                </article>
            `;
        });

        container.innerHTML = snippetsHTML; // Replace loading message with generated HTML

        // Optional: Re-trigger Intersection Observer for newly added fade-in-out elements
        // This requires the observer setup code to be accessible or refactored
        // If animations aren't working on snippets, this is likely needed.
        // Example (requires observer instance to be available globally or passed):
         initializeSnippetObserver(); // You'd need to define this function

    } catch (error) {
        console.error('Error loading blog snippets:', error);
        container.innerHTML = `<p class="error-message">Could not load blog posts. Please try again later or visit <a href="https://substack.com/@zachjporter" target="_blank" rel="noopener noreferrer">Substack</a>.</p>`;
    }
}

// Function to specifically observe the dynamically loaded snippets
function initializeSnippetObserver() {
    try {
        const snippetsToObserve = document.querySelectorAll('#blog-snippets-container .fade-in-out');
        if (snippetsToObserve.length > 0) {
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            };
             // Assuming 'observer' logic is similar to the main observer
            const snippetObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        // Snippets likely don't need fade-out, so unobserve once shown
                        observer.unobserve(entry.target);
                    }
                    // No 'else' needed if we don't fade-out snippets
                });
            }, observerOptions);

            snippetsToObserve.forEach((element) => {
                snippetObserver.observe(element);
            });
        }
    } catch (error) {
        console.error("Error initializing Snippet Intersection Observer:", error);
    }
}


// --- Main DOMContentLoaded Listener ---
document.addEventListener('DOMContentLoaded', function () {

    // --- Dynamic Greeting ---
    try {
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
        // Target h1 only within .hero-content on the index page potentially
        const heroHeading = document.querySelector('body:not(.portfolio-page) .hero-section .hero-content h1'); // Example: Add class to body or use URL check
        // Or check the page path
         if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
              const indexHeroHeading = document.querySelector('.hero-section .hero-content h1');
              if (indexHeroHeading && indexHeroHeading.textContent.includes(', Welcome to My Portfolio')) {
                   indexHeroHeading.textContent = `${greeting}, Welcome to My Portfolio`;
              }
         }
    } catch (error) {
        console.error("Error setting dynamic greeting:", error);
    }

    // --- Intersection Observer for Animations ---
    try {
        const elementsToObserve = document.querySelectorAll('.fade-in, .slide-in, .fade-in-out');
        if (elementsToObserve.length > 0) {
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            };
            const observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        entry.target.classList.remove('fade-out');
                        if (!entry.target.classList.contains('fade-in-out')) {
                            observer.unobserve(entry.target);
                        }
                    } else if (entry.target.classList.contains('fade-in-out')) {
                        // Add fade-out class only when element top edge goes above viewport top
                        if (entry.boundingClientRect.top < 0) {
                           entry.target.classList.add('fade-out');
                           entry.target.classList.remove('show');
                        }
                    }
                });
            }, observerOptions);
            elementsToObserve.forEach((element) => {
                observer.observe(element);
            });
        }
    } catch (error) {
        console.error("Error initializing Intersection Observer:", error);
    }


    // --- Hamburger Menu Functionality ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links'); // The UL element

    function toggleHamburgerMenu(show) {
         if (hamburgerMenu && navLinks) {
            const isExpanded = typeof show === 'boolean' ? show : navLinks.classList.contains('show');
             navLinks.classList.toggle('show', !isExpanded);
             hamburgerMenu.setAttribute('aria-expanded', String(!isExpanded));
         }
    }
    function closeHamburgerMenu() {
         toggleHamburgerMenu(false); // Explicitly hide
    }

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent click from bubbling up to document
            toggleHamburgerMenu(); // Toggle based on current state
        });
         // Close menu if clicking outside of it
         document.addEventListener('click', function(event) {
             if (navLinks.classList.contains('show') && !navLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                 closeHamburgerMenu();
             }
         });
    }
     // Hide .show class on desktop resize (if menu was left open)
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            if (navLinks && navLinks.classList.contains('show')) {
                closeHamburgerMenu(); // Use the function to also update ARIA
            }
        }
    });

    // --- Smooth Scroll ---
    try {
        // More specific selector to avoid potential conflicts
        document.querySelectorAll('header nav ul a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                        });
                         // Close hamburger menu if open after clicking a link
                         closeHamburgerMenu(); // Use the function defined above
                    }
                }
            });
        });
    } catch (error) {
        console.error("Error setting up smooth scroll:", error);
    }

    // --- Collapsible Sections ---
    try {
        const collapsibles = document.querySelectorAll('.collapsible');
        collapsibles.forEach(function (collapsible) {
            const contentId = collapsible.getAttribute('aria-controls');
             if (!contentId) {
                 console.warn('Collapsible button missing aria-controls:', collapsible);
                 return; // Skip if no aria-controls
             }
            const content = document.getElementById(contentId);
            if (content) {
                // Set initial state based on aria-expanded (ensure CSS matches)
                 const initiallyExpanded = collapsible.getAttribute('aria-expanded') === 'true';
                 if (!initiallyExpanded) {
                      content.style.maxHeight = '0';
                      content.style.paddingTop = '0';
                      content.style.paddingBottom = '0';
                      content.style.borderTopWidth = '0'; // Hide top border when collapsed if needed
                 } else {
                      // Calculate scrollHeight after ensuring display is block (might need brief delay)
                      content.style.display = 'block'; // Ensure it's block before measuring
                      content.style.maxHeight = content.scrollHeight + "px";
                      content.style.paddingTop = '20px'; // Match CSS padding
                      content.style.paddingBottom = '20px';
                       content.style.borderTopWidth = '1px'; // Show top border
                 }

                collapsible.addEventListener('click', function () {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !isExpanded);
                    this.classList.toggle('active', !isExpanded);

                    if (!isExpanded) { // Expanding
                         content.style.display = 'block'; // Ensure display is block before animation
                         content.style.borderTopWidth = '1px';
                         // Use requestAnimationFrame for smoother transition start
                         requestAnimationFrame(() => {
                             content.style.maxHeight = content.scrollHeight + "px";
                             content.style.paddingTop = '20px';
                             content.style.paddingBottom = '20px';
                         });
                     } else { // Collapsing
                         content.style.maxHeight = '0';
                         content.style.paddingTop = '0';
                         content.style.paddingBottom = '0';
                          content.style.borderTopWidth = '0';
                         // Optional: set display to none after transition ends for accessibility
                         // setTimeout(() => { content.style.display = 'none'; }, 400); // Match transition duration
                     }
                });
            } else {
                console.warn(`Collapsible content #${contentId} not found for button:`, collapsible);
            }
        });
    } catch (error) {
        console.error("Error setting up collapsible sections:", error);
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message'); // Get error message div

    if (contactForm && successMessage && errorMessage) { // Check all elements exist
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            // Hide messages initially
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';


            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    Accept: 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    successMessage.style.display = 'block';
                    this.reset(); // Clear the form
                } else {
                    // Try to get error details from Formspree response if possible
                    response.json().then(data => {
                         if (data && data.errors) {
                             errorMessage.innerHTML = `<p>Error: ${data.errors.map(err => err.message).join(', ')}</p>`;
                         } else {
                             errorMessage.innerHTML = `<p>Sorry, there was a problem sending your message. Status: ${response.status}</p>`;
                         }
                        errorMessage.style.display = 'block';
                    }).catch(() => {
                         // Fallback error message if response parsing fails
                         errorMessage.innerHTML = `<p>Sorry, there was a problem sending your message. Please try again later or use the email address provided.</p>`;
                         errorMessage.style.display = 'block';
                    });
                }
            })
            .catch(error => {
                console.error('Contact form submission error:', error);
                errorMessage.innerHTML = `<p>Network error: Could not send message. Please check your connection or use the email address provided.</p>`;
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                // Re-enable button and restore text regardless of success/failure
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }

    // --- Fetching Main Blog Content ---
    const mainBlogPostContainer = document.getElementById('main-blog-post');
    // --- Load Blog Snippets ---
    // Check if we are on the blog page and call the function to load snippets
        // --- Load Blog Snippets (New Logic) ---
    if (window.location.pathname.includes('blog.html')) {
        loadBlogSnippets(); // Call the function to load snippets
    }
    


    // --- Initialize Tableau Vizzes ---
    // Check if we are on the portfolio page before trying to initialize
    if (window.location.pathname.includes('portfolio.html')) {
        if (typeof tableau !== 'undefined') {
            console.log("Tableau API script loaded. Initializing visualizations.");
            initViz1(); // Initialize the first viz
            initViz2(); // Initialize the second viz
        } else {
            console.error("Tableau object not found. API script might not have loaded correctly.");
            // Display error message in the placeholder divs if they exist
             const viz1Container = document.getElementById('viz1733172334723');
             const viz2Container = document.getElementById('viz1733356206468');
             const errorMsg = `<p style="color: red; padding: 10px; background-color: #fff; border-radius: 5px;">Could not load Tableau API. Visualizations unavailable.</p>`;
             if(viz1Container) viz1Container.innerHTML = errorMsg;
             if(viz2Container) viz2Container.innerHTML = errorMsg;
        }
    }

}); // End DOMContentLoaded