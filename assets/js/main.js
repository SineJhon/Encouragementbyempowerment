/* === MAIN ENTRY POINT === */
(function() {
  'use strict';

  // Custom cursor (desktop only)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .card, .glass-card, input, textarea, select');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
      });
    });
  }

  // Loading bar simulation
  const loadingBar = document.getElementById('loading-bar');
  if (loadingBar) {
    // Remove loading bar after page load
    window.addEventListener('load', () => {
      loadingBar.style.opacity = '0';
      setTimeout(() => loadingBar.remove(), 500);
    });
  }

  // Page enter animation
  document.body.classList.add('page-enter');

  // ===== SCROLL PROGRESS BAR =====
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.prepend(scrollProgress);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
  };

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const updateBackToTop = () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  const siteHeader = document.querySelector('.site-header');
  const updateHeaderScroll = () => {
    if (window.scrollY > 50) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };

  // ===== PARALLAX ON HERO BLOBS =====
  const heroBlobs = document.querySelectorAll('.hero-blob');
  const updateParallax = () => {
    const scrollY = window.scrollY;
    heroBlobs.forEach((blob, i) => {
      const speed = 0.1 + i * 0.05;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
  };

  // ===== UNIFIED SCROLL HANDLER (throttled) =====
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateBackToTop?.();
        updateHeaderScroll();
        updateParallax();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Trigger on load
  updateScrollProgress();
  updateHeaderScroll?.();

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== RIPPLE EFFECT ON BUTTONS =====
  document.querySelectorAll('.btn, .carousel-btn, .tab-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--ripple-x', x + '%');
      btn.style.setProperty('--ripple-y', y + '%');
    });
  });

  console.log('🏆 Encouragement by Empowerment — Premium Redesign v2.0');
  console.log('📐 Built with care, powered by purpose.');
})();
