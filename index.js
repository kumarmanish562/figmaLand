/*
 * ========================================================================
 * FIGMALAND INTERACTIVE FEATURES
 * ========================================================================
 * Main JavaScript file for interactive website functionality including:
 * - Mobile navigation menu toggle
 * - Video play/pause controls
 * - Testimonial carousel with auto-rotation
 * - Contact form validation and modal feedback
 * ========================================================================
 */

/*
 * ========================================================================
 * MOBILE NAVIGATION MENU
 * ========================================================================
 * Handles responsive navigation menu toggle for mobile devices
 */

// DOM Elements for navigation functionality
const nav = document.querySelector(".header");           // Main header element
const btnSub = document.querySelector(".header__icon-bar"); // Mobile menu toggle button
const navLinks = document.querySelector(".nav__list");   // Navigation links container

// Mobile menu toggle button event listener
// Toggles 'responsive' class to show/hide mobile navigation
btnSub.addEventListener("click", () => {
  nav.classList.toggle("responsive");
})

// Navigation links event listener
// Closes mobile menu when a navigation link is clicked
navLinks.addEventListener("click", () => {
  nav.classList.toggle("responsive");
})

/*
 * ========================================================================
 * VIDEO PLAYER FUNCTIONALITY
 * ========================================================================
 * Custom video player with play/pause controls and overlay icons
 * Replaces static image with interactive video element
 */

// DOM Elements for video functionality
const videoSection = document.querySelector('.feature__video'); // Video container section
const videoImg = document.querySelector('.feature__video-img');  // Static video thumbnail image
let video;    // Will hold the dynamically created video element
let playIcon; // Will hold the play/pause icon overlay

/**
 * Creates and configures the video element
 * Replaces the static image with an actual HTML5 video element
 */
function createVideoElement() {
  // Create new video element
  video = document.createElement('video');
  video.src = "assets/video/video.mp4"; // Video source file
  video.poster = videoImg ? videoImg.src : ''; // Use original image as poster
  video.className = 'feature__video-actual';
  
  // Style the video element to fill container
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.display = 'block';
  video.controls = false; // Hide default browser controls
  
  // Replace the static image with the video element
  videoSection.replaceChild(video, videoImg);
}

/**
 * Creates custom play/pause icon overlay
 * Dynamically generates a clickable play button positioned over the video
 */
function createPlayPauseIcons() {
  // Remove any existing play icons to avoid duplicates
  const oldPlay = videoSection.querySelector('.custom-play-icon');
  if (oldPlay) oldPlay.remove();

  // Create play icon element
  playIcon = document.createElement('div');
  playIcon.className = 'custom-play-icon';
  
  // Position the play icon in the center of the video
  playIcon.style.position = 'absolute';
  playIcon.style.top = '50%';
  playIcon.style.left = '50%';
  playIcon.style.transform = 'translate(-50%, -50%)';
  playIcon.style.width = '80px';
  playIcon.style.height = '80px';
  playIcon.style.background = 'url("assets/icons/play-button.svg") center/contain no-repeat';
  playIcon.style.pointerEvents = 'none'; // Icon doesn't interfere with click events
  playIcon.style.zIndex = '2';
  playIcon.style.display = ''; // Initially visible

  // Add the play icon to the video section
  videoSection.appendChild(playIcon);
}

// Initialize video functionality if required elements exist
if (videoSection && videoImg) {
  // Set up video element and controls
  createVideoElement();
  createPlayPauseIcons();

  // Video section click handler - toggles play/pause
  videoSection.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playIcon.style.display = 'none'; // Hide play icon when playing
    } else {
      video.pause();
      playIcon.style.display = '';     // Show play icon when paused
    }
  });

  // Show play icon when video is paused
  video.addEventListener('pause', () => {
    playIcon.style.display = '';
  });
  
  // Hide play icon when video is playing
  video.addEventListener('play', () => {
    playIcon.style.display = 'none';
  });
}

/*
 * ========================================================================
 * TESTIMONIALS CAROUSEL
 * ========================================================================
 * Interactive testimonial slider with:
 * - Auto-rotation every 5 seconds
 * - Manual navigation via clickable dots
 * - Responsive design with user information display
 */

// Testimonials data array - contains all testimonial information
const testimonials = [
  {
    img: 'assets/images/ibm.png',        // Company/client logo
    text: 'Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their schedule.',
    userPhoto: 'assets/images/user.png', // User profile photo
    userName: 'Jane Smith',              // User's name
    userPosition: 'UI Designer'          // User's job title
  },
  {
    img: 'assets/images/amazon.png',
    text: 'Slate helps you organize your schedule easily and efficiently.',
    userPhoto: 'assets/images/user.png',
    userName: 'Jane Doe',
    userPosition: 'Product Manager'
  },
  {
    img: 'assets/images/google.png',
    text: 'A great tool for freelancers and small teams.',
    userPhoto: 'assets/images/user.png',
    userName: 'John Smith',
    userPosition: 'Developer'
  }
];

// DOM Elements for testimonial functionality
const testimonialSection = document.querySelector('.testimonials'); // Main testimonials section
const testimonialDiv = document.querySelector('.testimonial');      // Individual testimonial container

/**
 * Renders a specific testimonial by index
 * Updates the DOM with testimonial content and navigation dots
 * @param {number} idx - Index of testimonial to display
 */
function renderTestimonial(idx) {
  const t = testimonials[idx]; // Get testimonial data
  
  // Update testimonial content with dynamic HTML
  testimonialDiv.innerHTML = `
    <img class="testimonial__img" src="${t.img}" alt="testimonial">
    <p class="testimonial__text">${t.text}</p>
    <div class="testimonial__user">
      <img class="testimonial__user-photo" src="${t.userPhoto}" alt="Photo user">
      <div class="testimonial__user-info">
        <p class="testimonial__user-name">${t.userName}</p>
        <p class="testimonial__user-position">${t.userPosition}</p>
      </div>
    </div>
    <div class="testimonial__dots"></div>
  `;
  
  // Render navigation dots with current active state
  renderDots(idx);
}

/**
 * Creates and renders navigation dots for testimonial carousel
 * Each dot represents one testimonial and is clickable for manual navigation
 * @param {number} activeIdx - Index of currently active testimonial
 */
function renderDots(activeIdx) {
  const dotsDiv = testimonialDiv.querySelector('.testimonial__dots');
  dotsDiv.innerHTML = ''; // Clear existing dots
  
  // Create a dot for each testimonial
  testimonials.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testimonial-dot';
    
    // Style each dot
    dot.style.display = 'inline-block';
    dot.style.width = '14px';
    dot.style.height = '14px';
    dot.style.margin = '0 6px';
    dot.style.borderRadius = '50%';
    dot.style.background = i === activeIdx ? '#fff' : '#2091f9'; // Active dot is white
    dot.style.border = '2px solid #2091f9';
    dot.style.cursor = 'pointer';
    
    // Add click event to each dot for manual navigation
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      renderTestimonial(currentTestimonial);
      resetTestimonialInterval(); // Reset auto-rotation timer
    });
    
    dotsDiv.appendChild(dot);
  });
}

// Testimonial carousel state variables
let currentTestimonial = 0;    // Currently displayed testimonial index
let testimonialInterval;       // Interval ID for auto-rotation

/**
 * Advances to the next testimonial in the carousel
 * Loops back to first testimonial after reaching the end
 */
function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  renderTestimonial(currentTestimonial);
}

/**
 * Resets the auto-rotation interval
 * Used when user manually navigates to restart the timer
 */
function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 5000); // Auto-advance every 5 seconds
}

// Initialize testimonial carousel if testimonial element exists
if (testimonialDiv) {
  renderTestimonial(currentTestimonial);                    // Show first testimonial
  testimonialInterval = setInterval(nextTestimonial, 5000); // Start auto-rotation
}

/*
 * ========================================================================
 * CONTACT FORM & MODAL SYSTEM
 * ========================================================================
 * Handles contact form validation and user feedback through modal dialogs
 * Includes client-side validation for name, email, and message fields
 */

/**
 * Creates and displays a modal dialog with a custom message
 * Used for user feedback after form submission or other actions
 * @param {string} message - Message to display in the modal
 */
function createModal(message) {
  // Create modal background overlay
  const modalBg = document.createElement('div');
  modalBg.style.position = 'fixed';
  modalBg.style.top = '0';
  modalBg.style.left = '0';
  modalBg.style.width = '100vw';
  modalBg.style.height = '100vh';
  modalBg.style.background = 'rgba(0,0,0,0.4)';  // Semi-transparent dark overlay
  modalBg.style.display = 'flex';
  modalBg.style.alignItems = 'center';
  modalBg.style.justifyContent = 'center';
  modalBg.style.zIndex = '9999';                 // Ensure modal appears above all content

  // Create modal content container
  const modal = document.createElement('div');
  modal.style.background = '#fff';
  modal.style.padding = '32px 40px';
  modal.style.borderRadius = '16px';
  modal.style.boxShadow = '0 4px 32px rgba(0,0,0,0.2)';
  modal.style.textAlign = 'center';
  
  // Set modal content with message and close button
  modal.innerHTML = `
    <div style="font-size:22px;font-weight:600;margin-bottom:18px;">${message}</div>
    <button class="modal-close-btn" style="margin-top:10px;padding:8px 24px;border:none;background:#2091f9;color:#fff;border-radius:6px;font-size:16px;cursor:pointer;">Close</button>
  `;
  
  // Add modal to background overlay
  modalBg.appendChild(modal);

  // Add close button functionality
  modalBg.querySelector('.modal-close-btn').onclick = () => {
    document.body.removeChild(modalBg); // Remove modal from DOM
  };

  // Add modal to page
  document.body.appendChild(modalBg);
}

// Get contact form element
const contactForm = document.querySelector('.contact__form');

// Initialize contact form functionality if form exists
if (contactForm) {
  /**
   * Contact form submission handler
   * Validates all form fields and shows success/error feedback
   */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form field elements
    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="email"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    
    let valid = true; // Track overall form validity
    
    // Validate name field
    if (!name.value.trim()) {
      name.style.borderColor = 'red';   // Highlight invalid field
      valid = false;
    } else {
      name.style.borderColor = '';      // Reset border color if valid
    }
    
    // Validate email field with regex pattern
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = 'red';  // Highlight invalid field
      valid = false;
    } else {
      email.style.borderColor = '';     // Reset border color if valid
    }
    
    // Validate message field
    if (!message.value.trim()) {
      message.style.borderColor = 'red'; // Highlight invalid field
      valid = false;
    } else {
      message.style.borderColor = '';    // Reset border color if valid
    }
    
    // If validation fails, stop processing
    if (!valid) return;
    
    // Show success modal and reset form
    createModal('Your query sent successfully');
    contactForm.reset(); // Clear all form fields
  });
}