/**
 * SuperBlackScreen Main JavaScript
 * Main entry point that coordinates all functionality
 */

// Global variables
let demoMode = true; // Set to true for demo purposes

// Initialize the application
function initApp() {
    console.log('Initializing SuperBlackScreen application');
    
    // Set up demo data if in demo mode
    if (demoMode) {
        setupDemoData();
    }
    
    // Set up event listeners
    setupGlobalEventListeners();
    
    // Initialize components that aren't automatically initialized
    initializeComponents();
    
    // Check for URL parameters
    handleURLParameters();
    
    console.log('Application initialized successfully');
}

// Set up demo data for demonstration purposes
function setupDemoData() {
    console.log('Setting up demo data');
    
    // Demo user data
    const demoUserData = {
        todayFocusTime: '2小时35分钟',
        weekFocusTime: '12小时45分钟',
        focusScore: '8.5/10'
    };
    
    // Update the UI with demo data
    updateDemoUI(demoUserData);
}

// Update UI with demo data
function updateDemoUI(data) {
    // Update focus results
    const todayTimeElement = document.querySelector('.data-item:nth-child(1) strong');
    const weekTimeElement = document.querySelector('.data-item:nth-child(2) strong');
    const scoreElement = document.querySelector('.data-item:nth-child(3) strong');
    
    if (todayTimeElement) todayTimeElement.textContent = data.todayFocusTime;
    if (weekTimeElement) weekTimeElement.textContent = data.weekFocusTime;
    if (scoreElement) scoreElement.textContent = data.focusScore;
    
    // Ensure images are loaded with placeholders if needed
    setupImagePlaceholders();
}

// Set up global event listeners
function setupGlobalEventListeners() {
    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(handleWindowResize, 200));
    
    // Handle scroll for sticky header
    window.addEventListener('scroll', handleScroll);
}

// Initialize components that aren't automatically initialized
function initializeComponents() {
    // Initialize any third-party components or custom components
    initializeTooltips();
    initializeAccordions();
}

// Handle URL parameters
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for mode parameter
    if (urlParams.has('mode')) {
        const mode = urlParams.get('mode');
        if (['black', 'white', 'color', 'gradient'].includes(mode)) {
            // Set the screen mode
            setScreenMode(mode);
            
            // Activate the corresponding button
            document.querySelector(`.mode-button[data-mode="${mode}"]`).classList.add('active');
        }
    }
    
    // Check for opacity parameter
    if (urlParams.has('opacity')) {
        const opacity = parseInt(urlParams.get('opacity'));
        if (!isNaN(opacity) && opacity >= 0 && opacity <= 100) {
            // Set the opacity
            document.getElementById('opacity-slider').value = opacity;
            document.getElementById('opacity-value').textContent = opacity;
        }
    }
    
    // Check for time parameter
    if (urlParams.has('time')) {
        const time = parseInt(urlParams.get('time'));
        if (!isNaN(time) && time > 0 && time <= 60) {
            // Set the timer
            setTimer(time);
        }
    }
    
    // Check for autostart parameter
    if (urlParams.has('autostart') && urlParams.get('autostart') === 'true') {
        // Auto start the focus mode after a short delay
        setTimeout(() => {
            startFocusMode();
        }, 1000);
    }
}

// Handle form submissions
function handleFormSubmit(event) {
    // Prevent actual form submission for demo
    event.preventDefault();
    
    const form = event.target;
    
    // Check which form was submitted
    if (form.id === 'signup-form') {
        handleSignupForm(form);
    } else if (form.id === 'contact-form') {
        handleContactForm(form);
    } else {
        // Generic form handling
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData.entries()));
        
        // Show success message
        showMessage('表单提交成功！', 'success');
    }
}

// Handle signup form
function handleSignupForm(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    if (email) {
        console.log('Signup submitted with email:', email);
        
        // Show success message
        showMessage('感谢您的注册！我们已向您的邮箱发送了确认邮件。', 'success');
        
        // Clear the form
        form.reset();
    } else {
        showMessage('请输入有效的电子邮件地址。', 'error');
    }
}

// Handle contact form
function handleContactForm(form) {
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;
    
    if (name && email && message) {
        console.log('Contact form submitted:', { name, email, message });
        
        // Show success message
        showMessage('感谢您的留言！我们会尽快回复您。', 'success');
        
        // Clear the form
        form.reset();
    } else {
        showMessage('请填写所有必填字段。', 'error');
    }
}

// Handle window resize
function handleWindowResize() {
    // Adjust UI elements based on window size
    adjustResponsiveElements();
}

// Handle scroll for sticky header
function handleScroll() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // Position the tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - 10}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            
            // Add to document
            document.body.appendChild(tooltip);
            
            // Animate in
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.top = `${rect.top - 5}px`;
            }, 10);
            
            // Store reference to tooltip
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                // Animate out
                element._tooltip.style.opacity = '0';
                
                // Remove after animation
                setTimeout(() => {
                    if (element._tooltip.parentNode) {
                        element._tooltip.parentNode.removeChild(element._tooltip);
                    }
                    element._tooltip = null;
                }, 300);
            }
        });
    });
}

// Initialize accordions
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;
            
            // Toggle active class
            accordionItem.classList.toggle('active');
            
            // Toggle content visibility
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
            } else {
                accordionContent.style.maxHeight = '0';
            }
        });
    });
}

// Adjust responsive elements
function adjustResponsiveElements() {
    // Adjust any elements that need special handling on resize
    const windowWidth = window.innerWidth;
    
    // Example: Adjust number of visible testimonials based on screen width
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 0) {
        if (windowWidth < 768) {
            // Show only 3 testimonials on mobile
            testimonialCards.forEach((card, index) => {
                if (index < 3) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            // Show all testimonials on larger screens
            testimonialCards.forEach(card => {
                card.style.display = '';
            });
        }
    }
}

// Set up image placeholders
function setupImagePlaceholders() {
    // For demo purposes, use placeholder images for missing images
    document.querySelectorAll('img').forEach(img => {
        // Skip images that are already loaded
        if (img.complete && img.naturalHeight !== 0) return;
        
        // Add error handler to replace with placeholder
        img.addEventListener('error', function() {
            // Get image dimensions
            const width = this.getAttribute('width') || this.width || 300;
            const height = this.getAttribute('height') || this.height || 200;
            
            // Replace with placeholder
            this.src = `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(this.alt || 'Image')}`;
        });
    });
}

// Show message to user
function showMessage(message, type = 'info') {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Add to document
    document.body.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-20px)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 300);
    }, 5000);
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
document.addEventListener('DOMContentLoaded', initApp);
