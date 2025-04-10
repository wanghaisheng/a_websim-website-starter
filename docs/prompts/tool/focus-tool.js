/**
 * SuperBlackScreen Focus Tool Functionality
 * Handles the core functionality of the focus tool including screen modes,
 * opacity control, and fullscreen mode.
 */

// Global variables
let currentMode = 'black';
let currentOpacity = 50;
let isFullscreen = false;

// DOM Elements
const modeButtons = document.querySelectorAll('.mode-button[data-mode]');
const opacitySlider = document.getElementById('opacity-slider');
const opacityValue = document.getElementById('opacity-value');
const startButton = document.getElementById('start-focus');
const fullscreenMode = document.getElementById('fullscreen-mode');
const exitButton = document.getElementById('exit-button');
const pauseButton = document.getElementById('pause-button');

// Initialize the focus tool
function initFocusTool() {
    // Set default mode
    setScreenMode('black');
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Focus tool initialized');
}

// Set up event listeners for the focus tool
function setupEventListeners() {
    // Mode buttons
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.getAttribute('data-mode');
            setScreenMode(mode);
        });
    });
    
    // Opacity slider
    opacitySlider.addEventListener('input', () => {
        currentOpacity = opacitySlider.value;
        updateOpacityDisplay();
        if (isFullscreen) {
            updateFullscreenBackground();
        }
    });
    
    // Start button
    startButton.addEventListener('click', startFocusMode);
    
    // Exit button
    exitButton.addEventListener('click', exitFocusMode);
    
    // Pause button
    pauseButton.addEventListener('click', togglePause);
    
    // Escape key to exit fullscreen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isFullscreen) {
            exitFocusMode();
        }
    });
}

// Set the screen mode (black, white, color, gradient)
function setScreenMode(mode) {
    // Remove active class from all mode buttons
    modeButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to selected mode button
    document.querySelector(`.mode-button[data-mode="${mode}"]`).classList.add('active');
    
    // Update current mode
    currentMode = mode;
    
    // If in fullscreen mode, update the background
    if (isFullscreen) {
        updateFullscreenBackground();
    }
    
    console.log(`Screen mode set to: ${mode}`);
}

// Update the opacity display
function updateOpacityDisplay() {
    opacityValue.textContent = currentOpacity;
    
    // If in fullscreen mode, update the background
    if (isFullscreen) {
        updateFullscreenBackground();
    }
}

// Start focus mode (fullscreen)
function startFocusMode() {
    isFullscreen = true;
    
    // Update fullscreen background based on current settings
    updateFullscreenBackground();
    
    // Show fullscreen mode
    fullscreenMode.style.display = 'flex';
    
    // Start timer
    startTimer();
    
    // Request actual fullscreen if supported
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn('Error attempting to enable fullscreen:', err);
        });
    }
    
    console.log('Focus mode started');
}

// Exit focus mode
function exitFocusMode() {
    isFullscreen = false;
    
    // Hide fullscreen mode
    fullscreenMode.style.display = 'none';
    
    // Stop timer
    stopTimer();
    
    // Exit actual fullscreen if active
    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
            console.warn('Error attempting to exit fullscreen:', err);
        });
    }
    
    console.log('Focus mode exited');
}

// Toggle pause state
function togglePause() {
    if (isPaused) {
        resumeTimer();
        pauseButton.textContent = '暂停';
    } else {
        pauseTimer();
        pauseButton.textContent = '继续';
    }
}

// Update the fullscreen background based on current mode and opacity
function updateFullscreenBackground() {
    const opacity = currentOpacity / 100;
    
    switch (currentMode) {
        case 'black':
            fullscreenMode.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
            fullscreenMode.style.background = `rgba(0, 0, 0, ${opacity})`;
            break;
        case 'white':
            fullscreenMode.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            fullscreenMode.style.background = `rgba(255, 255, 255, ${opacity})`;
            break;
        case 'color':
            // Use primary color with opacity
            fullscreenMode.style.backgroundColor = `rgba(108, 99, 255, ${opacity})`;
            fullscreenMode.style.background = `rgba(108, 99, 255, ${opacity})`;
            break;
        case 'gradient':
            // Create gradient with opacity
            fullscreenMode.style.background = `linear-gradient(135deg, 
                rgba(108, 99, 255, ${opacity}) 0%, 
                rgba(138, 127, 255, ${opacity}) 50%, 
                rgba(80, 70, 229, ${opacity}) 100%)`;
            break;
    }
    
    // Adjust text color based on background for better visibility
    if (currentMode === 'white' || (currentMode === 'gradient' && currentOpacity < 50)) {
        document.getElementById('fullscreen-timer').style.color = '#333333';
        document.querySelectorAll('.exit-button').forEach(btn => {
            btn.style.color = '#333333';
            btn.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
    } else {
        document.getElementById('fullscreen-timer').style.color = '#ffffff';
        document.querySelectorAll('.exit-button').forEach(btn => {
            btn.style.color = '#ffffff';
            btn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFocusTool);
