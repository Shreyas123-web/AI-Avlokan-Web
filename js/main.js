/**
 * ==========================================
 *  MAIN INTERACTION & UI LOGIC
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy(); // UPGRADE: Added automatic active link tracking
  initFAQ();
  initContactForm();
  
  // Conditionally init stuff if elements exist
  if (document.getElementById('countdown-grid')) initCountdown();
  if (document.getElementById('stats-section')) initStatsCounter();
  
  // Render content if containers exist
  if (typeof renderEvents === 'function') {
    renderEvents('featured-event-container', true); 
    renderEvents('all-events-container', false); 
  }
  
  if (typeof renderTeam === 'function') {
    renderTeam('team-preview-container', null, true); 
    renderTeam('faculty-team-container', 'faculty'); 
    renderTeam('student-team-container', 'student'); 
  }

  // Initialize scroll reveal AFTER dynamic elements are inserted
  initScrollReveal();
  
  // Initialize Back to Top button
  initBackToTop();
  
  // UPGRADE: Premium Loading Screen Reveal
  const loader = document.getElementById('loader');
  if (loader) {
    if (!sessionStorage.getItem('siteLoaded')) {
      // Apply initial blur to body for a smooth boot-up effect
      document.body.style.filter = 'blur(10px)';
      document.body.style.transition = 'filter 0.8s ease, transform 0.8s ease';
      document.body.style.transform = 'scale(1.02)';

      setTimeout(() => {
        loader.style.opacity = '0';
        document.body.style.filter = 'blur(0px)';
        document.body.style.transform = 'scale(1)';
        
        setTimeout(() => {
          loader.remove();
          // Cleanup inline styles
          document.body.style.filter = '';
          document.body.style.transform = '';
          document.body.style.transition = '';
        }, 800);
        
        sessionStorage.setItem('siteLoaded', 'true');
      }, 800);
    } else {
      loader.remove();
    }
  }
});

/* --- Navbar Logic --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const scrollProgress = document.getElementById('scroll-progress');

  if (!navbar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Sticky nav style
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        
        // Scroll progress bar
        if (scrollProgress) {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          scrollProgress.style.width = scrolled + "%";
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  if (menuToggle && navLinks) {
    const burgerWrap = document.querySelector('.burger-wrap');
    
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      if (burgerWrap) burgerWrap.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        if (burgerWrap) burgerWrap.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --- UPGRADE: ScrollSpy Logic --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { 
    rootMargin: '-40% 0px -60% 0px' // Triggers when section is roughly in the middle of screen
  });
  
  sections.forEach(sec => observer.observe(sec));
}

/* --- Scroll Reveal Logic --- */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Only trigger once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --- Countdown Logic --- */
function initCountdown() {
  const eventDate = new Date('2026-09-29T08:00:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  
  const gridContainer = document.getElementById('countdown-grid');
  const messageContainer = document.getElementById('countdown-message');

  function update() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      // Event has passed or is happening
      const endOfDay = new Date('2026-09-30T00:00:00').getTime();
      gridContainer.style.display = 'none';
      messageContainer.style.display = 'block';
      
      if (now <= endOfDay) {
        // UPGRADE: Fixed date mismatch
        messageContainer.innerHTML = `
          <div class="status-card live">
            <div class="status-indicator">
              <span class="pulse-dot"></span>
              <span class="status-text">HAPPENING NOW</span>
            </div>
            <h2 class="status-title">AI Avlokan is Live!</h2>
            <p class="status-date">Join the action today, 29 September 2026</p>
          </div>
        `;
      } else {
        // UPGRADE: Fixed date mismatch
        messageContainer.innerHTML = `
          <div class="status-card concluded">
            <div class="status-indicator">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span class="status-text">EVENT CONCLUDED</span>
            </div>
            <h2 class="status-title">Thank You For Joining!</h2>
            <p class="status-date">29 September 2026 &bull; JNNCE Shivamogga</p>
            <p class="status-subtitle mt-2">See you next year for an even bigger adventure.</p>
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    function updateFlip(el, valStr) {
      if (!el) return;
      if (el.textContent !== valStr) {
        el.textContent = valStr;
        el.classList.remove('flip-anim');
        void el.offsetWidth; // trigger reflow to restart animation
        el.classList.add('flip-anim');
      }
    }

    updateFlip(daysEl, days.toString().padStart(2, '0'));
    updateFlip(hoursEl, hours.toString().padStart(2, '0'));
    updateFlip(minsEl, minutes.toString().padStart(2, '0'));
