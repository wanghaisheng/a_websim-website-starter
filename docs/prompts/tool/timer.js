/**
 * SuperBlackScreen Timer Functionality
 * Handles the timer functionality for the focus tool including
 * Pomodoro technique implementation.
 */

// Global variables
let timerInterval;
let remainingSeconds = 25 * 60; // Default 25 minutes
let isPaused = false;
let isBreakTime = false;

// DOM Elements
const timerButtons = document.querySelectorAll('.mode-button[data-time]');
const fullscreenTimer = document.getElementById('fullscreen-timer');

// Initialize the timer
function initTimer() {
    // Set up event listeners
    setupTimerEventListeners();
    
    // Set default timer display
    updateTimerDisplay();
    
    console.log('Timer initialized');
}

// Set up event listeners for the timer
function setupTimerEventListeners() {
    // Timer buttons
    timerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const minutes = parseInt(button.getAttribute('data-time'));
            setTimer(minutes);
            
            // Remove active class from all timer buttons
            timerButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to selected timer button
            button.classList.add('active');
        });
    });
}

// Set the timer duration
function setTimer(minutes) {
    remainingSeconds = minutes * 60;
    updateTimerDisplay();
    
    // If this is a break timer, mark it
    isBreakTime = minutes < 10; // Assuming breaks are shorter than 10 minutes
    
    console.log(`Timer set to ${minutes} minutes`);
}

// Start the timer
function startTimer() {
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Set the start time
    const startTime = Date.now();
    const initialSeconds = remainingSeconds;
    
    // Start the interval
    timerInterval = setInterval(() => {
        if (!isPaused) {
            // Calculate remaining time
            const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            remainingSeconds = initialSeconds - elapsedSeconds;
            
            // Update the display
            updateTimerDisplay();
            
            // Check if timer is complete
            if (remainingSeconds <= 0) {
                timerComplete();
            }
        }
    }, 1000);
    
    isPaused = false;
    console.log('Timer started');
}

// Pause the timer
function pauseTimer() {
    isPaused = true;
    console.log('Timer paused');
}

// Resume the timer
function resumeTimer() {
    // Restart the timer with the current remaining time
    startTimer();
    console.log('Timer resumed');
}

// Stop the timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    console.log('Timer stopped');
}

// Timer complete
function timerComplete() {
    // Stop the timer
    stopTimer();
    
    // Play notification sound
    playNotificationSound();
    
    // Show notification
    showNotification();
    
    // If using Pomodoro technique, switch between work and break
    if (isBreakTime) {
        // After break, set work timer (25 minutes)
        setTimer(25);
        isBreakTime = false;
    } else {
        // After work, set break timer (5 minutes)
        setTimer(5);
        isBreakTime = true;
    }
    
    console.log('Timer complete');
}

// Update the timer display
function updateTimerDisplay() {
    // Calculate minutes and seconds
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    // Format the time as MM:SS
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display
    if (fullscreenTimer) {
        fullscreenTimer.textContent = formattedTime;
    }
}

// Play notification sound
function playNotificationSound() {
    // Create an audio element
    const audio = new Audio();
    
    // Set the source to a bell sound
    audio.src = isBreakTime ? 'sounds/work-bell.mp3' : 'sounds/break-bell.mp3';
    
    // Play the sound
    audio.play().catch(error => {
        console.warn('Could not play notification sound:', error);
    });
}

// Show notification
function showNotification() {
    // Check if the browser supports notifications
    if ('Notification' in window) {
        // Request permission if needed
        if (Notification.permission === 'granted') {
            createNotification();
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    createNotification();
                }
            });
        }
    }
}

// Create notification
function createNotification() {
    const title = isBreakTime ? '工作时间到！' : '休息时间到！';
    const options = {
        body: isBreakTime ? '是时候开始工作了。' : '是时候休息一下了。',
        icon: 'images/icons/notification-icon.png'
    };
    
    const notification = new Notification(title, options);
    
    // Close the notification after 5 seconds
    setTimeout(() => {
        notification.close();
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTimer);
