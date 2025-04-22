const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link"); // Get all nav links
const footerYear = document.getElementById("year");

// --- Toggle Mobile Navigation ---
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// --- Close Mobile Menu When a Link is Clicked ---
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
});

// --- Smooth Scrolling (Optional - already handled by CSS `scroll-behavior: smooth;`) ---
// You could add more complex JS smooth scrolling if needed, but CSS is often sufficient.

// --- Set Current Year in Footer ---
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// --- Carousel Functionality ---
const carousel = document.querySelector('.carousel');
if (carousel) {
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    let interval;

    // Initialize the carousel
    function initCarousel() {
        // Set the first image and dot as active
        images[0].classList.add('active');
        dots[0].classList.add('active');

        // Start the automatic slideshow
        startAutoSlide();
    }

    // Show a specific slide
    function showSlide(index) {
        // Remove active class from all images and dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current image and dot
        images[index].classList.add('active');
        dots[index].classList.add('active');

        // Update current index
        currentIndex = index;
    }

    // Go to the next slide
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }

    // Go to the previous slide
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        showSlide(newIndex);
    }

    // Start automatic slideshow
    function startAutoSlide() {
        // Clear any existing interval
        clearInterval(interval);
        // Set new interval
        interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            // Restart the automatic slideshow
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            // Restart the automatic slideshow
            startAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Restart the automatic slideshow
            startAutoSlide();
        });
    });

    // Pause slideshow when hovering over the carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    // Resume slideshow when mouse leaves the carousel
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Initialize the carousel
    initCarousel();
}

// --- Load Images from data-img attributes ---
function loadImagesFromDataAttribute(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        const imgPath = element.getAttribute('data-img');
        if (imgPath) {
            // Create a temporary image to check if it loads
            const tempImg = new Image();

            // Set up load and error handlers
            tempImg.onload = function() {
                // Set the background image when loaded successfully
                element.style.backgroundImage = `url(${imgPath})`;
                // Clear the text content when image is set
                element.textContent = '';
            };

            tempImg.onerror = function() {
                // Keep the placeholder text if image fails to load
                console.log(`Failed to load image: ${imgPath}`);
                // Add a class to indicate failed loading (for potential styling)
                element.classList.add('image-load-failed');
            };

            // Start loading the image
            tempImg.src = imgPath;
        }
    });
}

// Load profile images
loadImagesFromDataAttribute('.profile-placeholder[data-img]');

// Load icon images
loadImagesFromDataAttribute('.icon-placeholder[data-img]');

// Load case study images
loadImagesFromDataAttribute('.landscape-placeholder[data-img]');

// Load client logo images
loadImagesFromDataAttribute('.logo-slide[data-img]');

// --- Services Carousel ---
function initServicesCarousel() {
    const carousels = document.querySelectorAll('.services-carousel');
    if (carousels.length === 0) return;

    // Initialize each carousel
    carousels.forEach(carousel => {
        initSingleCarousel(carousel);
    });
}

function initSingleCarousel(carousel) {

    const slides = carousel.querySelectorAll('.services-slide');
    const dots = carousel.querySelectorAll('.services-dot');
    let currentIndex = 0;
    let interval;

    // Load images for slides
    slides.forEach(slide => {
        const imgPath = slide.getAttribute('data-img');
        if (imgPath) {
            // Create a temporary image to check if it loads
            const tempImg = new Image();

            tempImg.onload = function() {
                // Set the background image when loaded successfully
                slide.style.backgroundImage = `url(${imgPath})`;
            };

            tempImg.onerror = function() {
                console.log(`Failed to load service image: ${imgPath}`);
                slide.classList.add('image-load-failed');
            };

            tempImg.src = imgPath;
        }
    });

    // Initialize the carousel
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update current index
        currentIndex = index;
    }

    // Start automatic slideshow
    function startAutoSlide() {
        // Clear any existing interval
        clearInterval(interval);
        // Set new interval - 3 seconds as requested
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }, 3000); // Change slide every 3 seconds
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Restart the automatic slideshow
            startAutoSlide();
        });
    });

    // Initialize first slide
    showSlide(0);
    // Start the slideshow
    startAutoSlide();
}

// Initialize services carousel
initServicesCarousel();

// --- Contact Form Handling ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // We don't prevent default because we want the mailto: action to work

        // Format the subject line to include the form subject
        const subjectField = document.getElementById('subject');
        const nameField = document.getElementById('name');

        if (subjectField && subjectField.value && nameField) {
            // Update the mailto action with the subject from the form
            const formattedSubject = encodeURIComponent(`Website Inquiry: ${subjectField.value} from ${nameField.value}`);
            contactForm.action = `mailto:info@amawardmarketing.com?cc=ambroseadeya7@gmail.com&subject=${formattedSubject}`;
        }

        // Show a confirmation message (this will appear briefly before the email client opens)
        alert('Thank you for your message! Your email client will open to send this message.');
    });
}

// --- Active Navigation Link Highlighting on Scroll (More Advanced) ---
const sections = document.querySelectorAll("section[id]"); // Get all sections with an ID

function highlightNavLink() {
    let scrollY = window.pageYOffset;
    let currentSectionId = "";

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        // Adjust offsetTop to account for fixed header height + some buffer
        const sectionTop = current.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 50);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
             currentSectionId = current.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        // Check if the link's href matches the current section ID
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });

     // Special case for home link when at the very top
     if (scrollY < sections[0].offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 50)) {
         navLinks.forEach(link => link.classList.remove("active"));
         const homeLink = document.querySelector('.nav-link[href="#home"]');
         if (homeLink) {
             homeLink.classList.add('active');
         }
     }
}

window.addEventListener("scroll", highlightNavLink);
// Initial call to highlight link on page load
highlightNavLink();


// Note: Contact form handling is already implemented above with mailto functionality