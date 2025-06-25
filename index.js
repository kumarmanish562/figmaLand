const nav = document.querySelector(".header");
const btnSub = document.querySelector(".header__icon-bar");
const navLinks = document.querySelector(".nav__list");

btnSub.addEventListener("click", () => {
  nav.classList.toggle("responsive");
})

navLinks.addEventListener("click", () => {
  nav.classList.toggle("responsive");
})

// 1. Video Play/Pause with Play Icon
const videoSection = document.querySelector('.feature__video');
const videoImg = document.querySelector('.feature__video-img');
let video;
let playIcon;

function createVideoElement() {
  video = document.createElement('video');
  video.src = "assets/video/video.mp4"; // Use any short video
  video.poster = videoImg ? videoImg.src : '';
  video.className = 'feature__video-actual';
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.display = 'block';
  video.controls = false;
  videoSection.replaceChild(video, videoImg);
}

function createPlayPauseIcons() {
  // Remove any existing icons
  const oldPlay = videoSection.querySelector('.custom-play-icon');
  if (oldPlay) oldPlay.remove();

  // Play icon
  playIcon = document.createElement('div');
  playIcon.className = 'custom-play-icon';
  playIcon.style.position = 'absolute';
  playIcon.style.top = '50%';
  playIcon.style.left = '50%';
  playIcon.style.transform = 'translate(-50%, -50%)';
  playIcon.style.width = '80px';
  playIcon.style.height = '80px';
  playIcon.style.background = 'url("assets/icons/play-button.svg") center/contain no-repeat';
  playIcon.style.pointerEvents = 'none';
  playIcon.style.zIndex = '2';
  playIcon.style.display = '';

  videoSection.appendChild(playIcon);
}

if (videoSection && videoImg) {
  createVideoElement();
  createPlayPauseIcons();

  videoSection.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playIcon.style.display = 'none';
    } else {
      video.pause();
      playIcon.style.display = '';
    }
  });

  video.addEventListener('pause', () => {
    playIcon.style.display = '';
  });
  video.addEventListener('play', () => {
    playIcon.style.display = 'none';
  });
}

// 2. Testimonial Carousel
const testimonials = [
  {
    img: 'assets/images/ibm.png',
    text: 'Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their schedule.',
    userPhoto: 'assets/images/user.png',
    userName: 'Jane Smith',
    userPosition: 'UI Designer'
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

const testimonialSection = document.querySelector('.testimonials');
const testimonialDiv = document.querySelector('.testimonial');

function renderTestimonial(idx) {
  const t = testimonials[idx];
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
  renderDots(idx);
}

function renderDots(activeIdx) {
  const dotsDiv = testimonialDiv.querySelector('.testimonial__dots');
  dotsDiv.innerHTML = '';
  testimonials.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testimonial-dot';
    dot.style.display = 'inline-block';
    dot.style.width = '14px';
    dot.style.height = '14px';
    dot.style.margin = '0 6px';
    dot.style.borderRadius = '50%';
    dot.style.background = i === activeIdx ? '#fff' : '#2091f9';
    dot.style.border = '2px solid #2091f9';
    dot.style.cursor = 'pointer';
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      renderTestimonial(currentTestimonial);
      resetTestimonialInterval();
    });
    dotsDiv.appendChild(dot);
  });
}

let currentTestimonial = 0;
let testimonialInterval;

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  renderTestimonial(currentTestimonial);
}

function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

if (testimonialDiv) {
  renderTestimonial(currentTestimonial);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

// 3. Contact Form Modal
function createModal(message) {
  const modalBg = document.createElement('div');
  modalBg.style.position = 'fixed';
  modalBg.style.top = '0';
  modalBg.style.left = '0';
  modalBg.style.width = '100vw';
  modalBg.style.height = '100vh';
  modalBg.style.background = 'rgba(0,0,0,0.4)';
  modalBg.style.display = 'flex';
  modalBg.style.alignItems = 'center';
  modalBg.style.justifyContent = 'center';
  modalBg.style.zIndex = '9999';

  const modal = document.createElement('div');
  modal.style.background = '#fff';
  modal.style.padding = '32px 40px';
  modal.style.borderRadius = '16px';
  modal.style.boxShadow = '0 4px 32px rgba(0,0,0,0.2)';
  modal.style.textAlign = 'center';
  modal.innerHTML = `
    <div style="font-size:22px;font-weight:600;margin-bottom:18px;">${message}</div>
    <button class="modal-close-btn" style="margin-top:10px;padding:8px 24px;border:none;background:#2091f9;color:#fff;border-radius:6px;font-size:16px;cursor:pointer;">Close</button>
  `;
  modalBg.appendChild(modal);

  modalBg.querySelector('.modal-close-btn').onclick = () => {
    document.body.removeChild(modalBg);
  };

  document.body.appendChild(modalBg);
}

const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Basic validation
    const name = contactForm.querySelector('input[name="name"]');
    const email = contactForm.querySelector('input[name="email"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    let valid = true;
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      valid = false;
    } else {
      name.style.borderColor = '';
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = 'red';
      valid = false;
    } else {
      email.style.borderColor = '';
    }
    if (!message.value.trim()) {
      message.style.borderColor = 'red';
      valid = false;
    } else {
      message.style.borderColor = '';
    }
    if (!valid) return;
    createModal('Your query sent successfully');
    contactForm.reset();
  });
}