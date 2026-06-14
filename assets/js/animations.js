/* === SCROLL-TRIGGERED ANIMATIONS === */
(function() {
  'use strict';

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.fade-up, .fade-in, .scale-in, .slide-left, .slide-right, .zoom-in, .stagger-children, .hero-line, .image-reveal'
  );

  if (animatedElements.length === 0) return;

  // Immediately mark elements already in the viewport
  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 40 && rect.bottom > 0;
  };

  animatedElements.forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('visible');
    }
  });

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  // Only observe elements that were NOT already visible
  animatedElements.forEach(el => {
    if (!el.classList.contains('visible')) {
      animationObserver.observe(el);
    }
  });

  // Parallax effect on scroll
  const parallaxElements = document.querySelectorAll('.parallax-scale');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (rect.top - window.innerHeight / 2) * speed;
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    }, { passive: true });
  }

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();