// Mutt Mama Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initNavbar();
    initFloatingNotifications();
    initStatsCounters();
    initFormValidation();
    initQuiz();
    initBeforeAfterSlider();
    initTestimonialSlider();
    initBookingUrgency();
    initSmoothScrolling();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Animate hamburger icon
            const icon = mobileMenuButton.querySelector('svg');
            icon.classList.toggle('rotate-45');
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
            navbar.classList.add('bg-white/90');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation delay for child elements
                const children = entry.target.querySelectorAll('.stagger-animation');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Floating social proof notifications
function initFloatingNotifications() {
    const notifications = [
        { name: "Sarah from Irvine", action: "just booked a consultation" },
        { name: "Mike from Newport Beach", action: "completed the 21-day program" },
        { name: "Jennifer from Laguna Hills", action: "left a 5-star review" },
        { name: "David from Mission Viejo", action: "referred a friend" },
        { name: "Lisa from Costa Mesa", action: "just enrolled their second dog" }
    ];

    let notificationIndex = 0;

    function showNotification() {
        const notification = notifications[notificationIndex];

        const popup = document.createElement('div');
        popup.className = 'social-proof-popup';
        popup.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-sage rounded-full animate-pulse"></div>
                <div>
                    <p class="font-semibold text-sm text-navy">${notification.name}</p>
                    <p class="text-xs text-charcoal/70">${notification.action}</p>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        // Remove notification after 4 seconds
        setTimeout(() => {
            popup.style.animation = 'slideOutLeft 0.5s ease-in forwards';
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 500);
        }, 4000);

        notificationIndex = (notificationIndex + 1) % notifications.length;
    }

    // Show first notification after 3 seconds, then every 8 seconds
    setTimeout(showNotification, 3000);
    setInterval(showNotification, 8000);
}

// Animated stats counters
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    if (counter.textContent.includes('%')) {
                        counter.textContent = Math.floor(current) + '%';
                    } else if (counter.textContent.includes('+')) {
                        counter.textContent = Math.floor(current) + '+';
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);

                countObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => countObserver.observe(counter));
}

// Form validation and submission
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    });
}

function validateForm(data) {
    const required = ['name', 'email', 'phone'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');

    if (missing.length > 0) {
        showNotification(`Please fill in: ${missing.join(', ')}`, 'error');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    return true;
}

function submitForm(data) {
    // Show loading state
    showNotification('Submitting your request...', 'info');

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');

        // Redirect to thank you page or show success modal
        showSuccessModal();
    }, 1500);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg`;

    const colors = {
        success: 'bg-sage text-white',
        error: 'bg-coral text-white',
        info: 'bg-navy text-white'
    };

    notification.className += ` ${colors[type]}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Interactive quiz functionality
function initQuiz() {
    const quizContainer = document.getElementById('dog-quiz');
    if (!quizContainer) return;

    const questions = [
        {
            question: "What's your dog's #1 behavioral issue?",
            options: [
                "Aggressive toward people/dogs",
                "Excessive barking",
                "Leash pulling",
                "Separation anxiety",
                "Not listening to commands"
            ]
        },
        {
            question: "How long have you been dealing with this issue?",
            options: [
                "Less than 3 months",
                "3-6 months",
                "6-12 months",
                "1-2 years",
                "More than 2 years"
            ]
        },
        {
            question: "Have you tried professional training before?",
            options: [
                "No, this is my first time",
                "Yes, but it didn't work",
                "Yes, some improvement but not enough",
                "Yes, but my dog regressed"
            ]
        }
    ];

    let currentQuestion = 0;
    let answers = [];

    function renderQuestion() {
        const question = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="text-center mb-8">
                <h3 class="font-playfair text-2xl font-bold text-navy mb-4">${question.question}</h3>
                <div class="bg-sage/20 rounded-full h-2 mb-4">
                    <div class="bg-sage h-2 rounded-full transition-all duration-300" style="width: ${((currentQuestion + 1) / questions.length) * 100}%"></div>
                </div>
            </div>
            <div class="space-y-3">
                ${question.options.map((option, index) => `
                    <button class="quiz-option w-full p-4 text-left bg-white border border-sage/20 rounded-xl hover:border-sage" data-answer="${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;

        // Add event listeners to options
        const options = quizContainer.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                answers[currentQuestion] = this.dataset.answer;
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                setTimeout(() => {
                    nextQuestion();
                }, 500);
            });
        });
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            renderQuestion();
        } else {
            showQuizResults();
        }
    }

    function showQuizResults() {
        quizContainer.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="font-playfair text-2xl font-bold text-navy mb-4">Perfect! You're an ideal candidate for our 21-Day Transformation Program</h3>
                <p class="text-charcoal/80 mb-6">Based on your answers, we can definitely help transform your dog's behavior. Let's schedule your free consultation!</p>
                <a href="#contact" class="inline-block bg-coral text-white px-8 py-4 rounded-full font-montserrat font-bold hover:bg-coral/90 transition-all duration-200">
                    Book My Free Consultation
                </a>
            </div>
        `;
    }

    renderQuestion();
}

// Before/After slider
function initBeforeAfterSlider() {
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const handle = slider.querySelector('.before-after-handle');
        const beforeImage = slider.querySelector('.before-image');
        let isDragging = false;

        if (handle && beforeImage) {
            handle.addEventListener('mousedown', startDrag);
            handle.addEventListener('touchstart', startDrag);

            function startDrag(e) {
                isDragging = true;
                e.preventDefault();
            }

            document.addEventListener('mousemove', onDrag);
            document.addEventListener('touchmove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);

            function onDrag(e) {
                if (!isDragging) return;

                const rect = slider.getBoundingClientRect();
                const x = (e.clientX || e.touches[0].clientX) - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

                handle.style.left = percentage + '%';
                beforeImage.style.width = percentage + '%';
            }

            function stopDrag() {
                isDragging = false;
            }
        }
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    let currentSlide = 0;
    const slides = slider.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-play
    setInterval(nextSlide, 5000);

    // Add navigation buttons
    const nextBtn = slider.querySelector('.next-btn');
    const prevBtn = slider.querySelector('.prev-btn');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Initialize
    showSlide(0);
}

// Booking urgency counter
function initBookingUrgency() {
    const counter = document.querySelector('.spots-counter');
    if (!counter) return;

    // Simulate dynamic spots remaining (could be connected to real booking system)
    const spots = Math.floor(Math.random() * 5) + 1; // 1-5 spots
    counter.textContent = `Only ${spots} spots left this month`;

    // Add pulsing effect when spots are low
    if (spots <= 2) {
        counter.classList.add('animate-pulse', 'text-coral');
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Success modal
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-2xl max-w-md mx-4 text-center">
            <div class="text-6xl mb-4">✅</div>
            <h3 class="font-playfair text-2xl font-bold text-navy mb-4">Thank You!</h3>
            <p class="text-charcoal/80 mb-6">Your consultation request has been submitted. We'll contact you within 24 hours to schedule your free assessment.</p>
            <button class="bg-sage text-white px-6 py-3 rounded-full font-montserrat font-semibold" onclick="this.closest('.fixed').remove()">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }

    .notification {
        animation: slideInRight 0.5s ease-out;
    }
`;
document.head.appendChild(style);