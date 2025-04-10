/**
 * SuperBlackScreen UI Effects
 * Handles UI animations, scroll effects, and other visual enhancements
 */

// Global variables
let isScrolling = false;

// DOM Elements
const sections = document.querySelectorAll('.section');
const animatedElements = document.querySelectorAll('.hidden');

// Initialize UI effects
function initUIEffects() {
    // Set up scroll effects
    setupScrollEffects();
    
    // Set up animations
    setupAnimations();
    
    // Set up modal functionality
    setupModals();
    
    console.log('UI effects initialized');
}

// Set up scroll effects
function setupScrollEffects() {
    // Reveal elements on scroll
    window.addEventListener('scroll', debounce(revealElements, 50));
    
    // Initial check for elements in view
    revealElements();
    
    // Smooth scroll for navigation links
    setupSmoothScroll();
}

// Set up animations
function setupAnimations() {
    // Add fade-in animation to hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.add('fade-in');
    }
    
    // Add hidden class to elements that should animate in
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .case-card').forEach(element => {
        if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
    });
}

// Set up modal functionality
function setupModals() {
    // Implementation for any modal dialogs
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
}

// Reveal elements when they enter the viewport
function revealElements() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // How many pixels from the bottom of the viewport to start revealing
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal');
        }
    });
}

// Set up smooth scroll for navigation links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only if the href is an internal link
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    scrollToElement(targetElement);
                }
            }
        });
    });
}

// Scroll to element with smooth animation
function scrollToElement(element) {
    if (isScrolling) return;
    
    isScrolling = true;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // ms
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false;
        }
    }
    
    requestAnimationFrame(animation);
}

// Easing function for smooth scroll
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Open modal
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Close button functionality
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
}

// Close modal
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initUIEffects);
