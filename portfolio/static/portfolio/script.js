// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call
    
    // Tech icon animations
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.zIndex = '10';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '1';
        });
    });
    
    // Animate skill progress bars on scroll
    const skillProgresses = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    
    function animateSkills() {
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > sectionTop && window.scrollY < sectionTop + sectionHeight) {
            skillProgresses.forEach(progress => {
                progress.style.transition = 'width 1.5s ease';
            });
        }
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial call
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Dark/light mode
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        //check saved theme
        const currentTheme = localStorage.getItem('theme') || 
            (prefersDarkScheme.matches ? 'dark' : 'light');
        //check if toggle exist
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        themeToggle.addEventListener('click', function() {
            let theme = 'light';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                theme = 'light';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
            
            // Animate toggle
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
            }
        });
    }
});

// Project Modals
const projectData = {
    'apartment-management': {
        title: 'Apartment Management System',
        subtitle: 'Thesis Project • Full-stack Web Application',
        description: 'Personally developed a Property mapping functionality with filters, admin dashboard, and the maintenance request tracking system using Laravel and JavaScript',
        features: [
            'Interactive property mapping with search filters',
            'Role-based access control (Admin, Owner, Tenant)',
            'Automated rent payment processing and notifications',
            'Maintenance request tracking system',
            'Document management for leases and agreements',
            'Real-time chat between tenants and management'
        ],
        techStack: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML/CSS', 'Google Maps API', 'Bootstrap'],
        challenges: 'The main challenge was implementing the real-time mapping functionality with property filtering. I solved this by integrating Google Maps API with custom overlay markers and implementing efficient database queries for location-based searches.',
        images: [
            { url: '/static/portfolio/img/thesis%20Image%5B22%5D.jpg', alt: 'Main Dashboard', caption: 'Admin Dashboard Interface' },
            { url: '/static/portfolio/img/thesis%20Image%5B27%5D.jpg', alt: 'Property Map', caption: 'Interactive Property Mapping' },
            { url: '/static/portfolio/img/thesis%20Image%5B26%5D.jpg', alt: 'Tenant Portal', caption: 'Tenant Management Portal' },
            { url: '/static/portfolio/img/thesis%20Image%5B25%5D.jpg', alt: 'Landowner Portal', caption: 'Landowner Listing' }
        ]
    },
    'attendance-system': {
        title: 'Employee Attendance System',
        subtitle: ' Windows Desktop Application • C# .NET • WinForms • PHPMyAdmin',
        description: 'Solely responsible for: C# backend logic, WinForms UI design, and SQL Server database implementation for the attendance system.',
        features: [
            'Employee management with role-based access',
            'Time tracking with manual clock-in/out',
            'Automated payroll calculation based on attendance',
            'Multi-branch support with centralized database',
            'Customizable report generation (PDF/Excel)',
            'Shift scheduling and overtime management'
        ],
        techStack: ['C#', '.NET Framework', 'MySQL', 'Windows Forms', 'Biometric SDK', 'Crystal Reports'],
        challenges: 'Designed the system with extensibility in mind, creating a modular architecture that could potentially integrate with biometric devices in the future. Implemented clean separation between the user interface, business logic, and data access layers.',
        images: [            
            { url: '/static/portfolio/img/eas.png', alt: 'Login Window', caption: 'Login Window' },
            { url: '/static/portfolio/img/eassystem.png', alt: 'System', caption: 'System' },
            { url: '/static/portfolio/img/easreport.jpg', alt: 'Report', caption: 'Report' },
            { url: '/static/portfolio/img/easregistration.png', alt: 'Registration', caption: 'Registration' }
        ]
    },
    'racing-game': {
        title: 'Smart Wheels Racing Game',
        subtitle: 'Mobile Game • Unity Engine',
        description: 'A 2D physics-based racing game with adaptive AI opponents and progressive difficulty system. Features multiple tracks, vehicle upgrades, and engaging gameplay mechanics.',
        features: [
            'Physics-based vehicle movement and collisions',
            'Adaptive AI opponents with learning behavior',
            'Multiple game modes (Career, Time Trial, Multiplayer)',
            'Vehicle upgrade and customization system',
            'Progressive difficulty curve',
            'Mobile-optimized touch controls'
        ],
        techStack: ['Unity Engine', 'C#', 'Physics 2D', 'Unity UI', 'Mobile Optimization', 'Game AI'],
        challenges: 'Creating realistic vehicle physics while maintaining smooth performance on mobile devices required careful optimization. I implemented a simplified physics model that feels realistic while running at 60 FPS on mid-range devices.',
        images: [
            { url: '/static/portfolio/img/homegame.png', alt: 'homegame', caption: 'Home' },
            { url: '/static/portfolio/img/goalgame.png', alt: 'goalgame', caption: 'Goal' },
            { url: '/static/portfolio/img/subpage.png', alt: 'subjectgame', caption: 'Subject' },
            { url: '/static/portfolio/img/question.png', alt: 'homegame', caption: 'Question' },
            { url: '/static/portfolio/img/gameover.png', alt: 'homegame', caption: 'GameOver' },
            { url: '/static/portfolio/img/ingame.png', alt: 'homegame', caption: 'InGame' }
        ],
    }
};

function openModal(projectId) {
    const project = projectData[projectId];
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
 
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        imagesHTML = `
            <div class="modal-images">
                <h3>Project Screenshots</h3>
                <div class="images-gallery">
                    ${project.images.map(img => `
                        <div class="image-item">
                            <img src="${img.url}" alt="${img.alt}" loading="lazy">
                            ${img.caption ? `<p class="image-caption">${img.caption}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeModal()">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
            <div class="modal-tags">
                ${project.techStack.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
        </div>
        
        <div class="modal-grid">
            <div class="modal-features">
                <h3>Project Overview</h3>
                <p class="modal-description">${project.description}</p>
                
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-tech">
                <h3>Technology Stack</h3>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
        
        ${imagesHTML}
        
        <div class="modal-challenges">
            <h3>Development Challenges</h3>
            <p>${project.challenges}</p>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Contact Modal Functions
function openContactModal() {
    const modalOverlay = document.getElementById('contact-modal-overlay');
    const modalContent = document.getElementById('contact-modal-content');
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    resetContactForm();

    if (modalContainer) {
        // Wait a tiny bit for the modal to render, then scroll to top
        setTimeout(() => {
            modalContainer.scrollTop = 0;
            // Also try smooth scroll
            modalContainer.scrollTo({ top: 0, behavior: 'instant' });
        }, 50);
    }
}

function closeContactModal() {
    const modalOverlay = document.getElementById('contact-modal-overlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetContactForm();
}

function resetContactForm() {
    const modalContainer = document.querySelector('.project-modal.contact-modal');
    if (modalContainer) {
        modalContainer.scrollTop = 0;
    }

    document.getElementById('contactForm').reset();
    document.getElementById('form-response').innerHTML = '';
    document.getElementById('form-response').className = 'form-response';
    
    // Clear error messages
    ['name', 'email', 'subject', 'message'].forEach(field => {
        document.getElementById(`${field}-error`).textContent = '';
    });
    
    // Enable submit button
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Common fake email patterns
    const fakePatterns = [
        /test@/i,
        /example@/i,
        /fake@/i,
        /demo@/i,
        /@example\.com$/i,
        /@test\.com$/i,
        /@localhost$/i,
        /@domain\.com$/i,
    ];
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Check for fake emails
    for (const pattern of fakePatterns) {
        if (pattern.test(email)) {
            return false;
        }
    }
    
    return true;
}

// Form validation
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
        errors.name = 'Name can only contain letters and spaces';
    }
    
    // Email validation
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
        errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters';
    }
    
    // Message validation
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Client-side validation
            const errors = validateForm(formData);
            
            // Clear previous errors
            ['name', 'email', 'subject', 'message'].forEach(field => {
                document.getElementById(`${field}-error`).textContent = '';
            });
            
            // Show errors if any
            if (Object.keys(errors).length > 0) {
                for (const [field, message] of Object.entries(errors)) {
                    document.getElementById(`${field}-error`).textContent = message;
                }
                return;
            }
            
            // Disable submit button and show loading
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Clear response message
            const responseDiv = document.getElementById('form-response');
            responseDiv.innerHTML = '';
            responseDiv.className = 'form-response';
            
            try {
                // Send to Django backend
                const response = await fetch('/contact/send/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken') // Get CSRF token
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Success
                    responseDiv.className = 'form-response success';
                    responseDiv.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>${result.message}</p>
                            <p>You should receive a confirmation email shortly.</p>
                        </div>
                    `;
                    
                    // Reset form after successful submission
                    contactForm.reset();
                    
                    // Auto-close modal after 3 seconds
                    setTimeout(() => {
                        closeContactModal();
                    }, 3000);
                    
                } else {
                    // Server-side validation errors
                    responseDiv.className = 'form-response error';
                    responseDiv.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            <h3>Please fix the errors below:</h3>
                            <p>${result.message}</p>
                        </div>
                    `;
                    
                    // Show field errors
                    if (result.errors) {
                        for (const [field, message] of Object.entries(result.errors)) {
                            const errorElement = document.getElementById(`${field}-error`);
                            if (errorElement) {
                                errorElement.textContent = message;
                            }
                        }
                    }
                    
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
                
            } catch (error) {
                // Network or server error
                responseDiv.className = 'form-response error';
                responseDiv.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Connection Error</h3>
                        <p>Unable to send message. Please try again later.</p>
                    </div>
                `;
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }
    
    // Helper function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

// Close contact modal when clicking outside
document.getElementById('contact-modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeContactModal();
    }
});

// Close contact modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});