// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 8px 30px rgba(46, 125, 50, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(46, 125, 50, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        workItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease';
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstname = this.querySelector('#firstname').value;
        const lastname = this.querySelector('#lastname').value;
        const email = this.querySelector('#email').value;
        const phone = this.querySelector('#phone').value;
        const message = this.querySelector('#message').value;
        
        // Get selected services (checkboxes)
        const selectedServices = Array.from(this.querySelectorAll('input[name="service"]:checked'))
            .map(checkbox => checkbox.parentElement.querySelector('span').textContent)
            .join(', ');
        
        const formData = {
            name: firstname + " " + lastname,
            email: email,
            phone: phone,
            services: selectedServices || 'Not specified',
            message: message
        };
        
        // Create professional email template
        const emailSubject = `Project Inquiry from ${formData.name}`;
        
        const emailBody = `
Hi Noamaan,

I'm reaching out regarding a potential project opportunity.

Contact details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Services interested in:

${formData.services}

Project details:

${formData.message}

Looking forward to hearing from you.

Best regards,
${formData.name}
        `.trim();
        
        // Open default email client
        const mailtoLink = `mailto:noamaan.mulla03@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('Opening your email client...', 'success');
    });
}

// Show message function
function showMessage(text, type) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        padding: 1.2rem 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #81C784)' : '#ff4444'};
        color: white;
        border-radius: 50px;
        font-weight: 700;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
    `;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateElements = document.querySelectorAll('.service-item, .work-item, .tech-cat, .contact-method');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add dynamic plant/leaf decorations
function createLeafDecoration() {
    const decorativeElements = ['🌿', '��', '🌱', '☘️'];
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            const leaf = document.createElement('div');
            leaf.textContent = decorativeElements[Math.floor(Math.random() * decorativeElements.length)];
            leaf.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 3 + 2}rem;
                opacity: 0.1;
                ${Math.random() > 0.5 ? 'right' : 'left'}: ${Math.random() * 10}%;
                top: ${Math.random() * 80 + 10}%;
                pointer-events: none;
                animation: float ${Math.random() * 3 + 3}s ease-in-out infinite;
            `;
            section.style.position = 'relative';
            section.appendChild(leaf);
        }
    });
}

// Floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(5deg);
        }
    }
`;
document.head.appendChild(floatStyle);

// Initialize decorations
createLeafDecoration();

// Console greeting with solarpunk theme
console.log('%c🌱 Solarpunk Portfolio Loaded', 'background: linear-gradient(135deg, #4CAF50, #FFB300); color: white; font-size: 18px; padding: 12px; border-radius: 8px; font-weight: bold;');
console.log('%c🌍 Building a sustainable digital future', 'color: #4CAF50; font-size: 14px; font-weight: bold;');
console.log('%c☀️ Powered by renewable energy mindset', 'color: #FFB300; font-size: 12px;');

// Add a subtle hover effect to stats
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#4CAF50';
        }
    });
});
