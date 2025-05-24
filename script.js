// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.style.display = 'none');
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            formGroups.forEach(group => group.style.display = 'flex');
            submitBtn.style.display = 'inline-block';
            successMessage.remove();
        }, 5000);
    });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .cert-card, .about-text p, .skills');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add CSS for the animation
const style = document.createElement('style');
style.textContent = `
    .project-card, .cert-card, .about-text p, .skills {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .project-card.animate, .cert-card.animate, .about-text p.animate, .skills.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .success-message {
        text-align: center;
        padding: 20px;
        animation: fadeIn 0.5s ease;
    }
    
    .success-message i {
        font-size: 3rem;
        color: #28a745;
        margin-bottom: 15px;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

document.head.appendChild(style);

// Typing animation for the hero section
const typingAnimation = () => {
    const text = "Developer | Creator | Problem Solver";
    const tagline = document.querySelector('.tagline');
    
    if (tagline) {
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(() => {
            typeWriter();
        }, 1000);
    }
};

// Uncomment the line below if you want to enable the typing animation
// window.addEventListener('load', typingAnimation);
// Certificate preview functionality
document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // We'll keep the default behavior to open PDFs in a new tab
        console.log('Certificate clicked:', this.getAttribute('href'));
    });
});
// Project hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('h3').style.transform = 'translateY(-5px)';
        this.querySelector('h3').style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('h3').style.transform = 'translateY(0)';
    });
});
// Theme toggle functionality
const toggleSwitch = document.querySelector('#checkbox');
const themeIcon = document.querySelector('.theme-icon i');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Set initial theme
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Function to switch theme
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Event listener for theme switch
toggleSwitch.addEventListener('change', switchTheme);

// Update theme icon on page load
window.addEventListener('DOMContentLoaded', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});
