/* === ACCESSIBLE CAROUSEL === */
(function() {
  'use strict';

  const carousel = document.getElementById('testimonial-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const carouselLive = carousel.querySelector('[aria-live="polite"]');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayInterval = null;
  let isPaused = false;

  // Create dots
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.style.animation = i === index ? 'carouselSlide 0.5s var(--ease-out-expo)' : '';
    });

    // Update dots
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Update live region
    if (carouselLive) {
      const activeSlide = slides[index];
      const quote = activeSlide?.querySelector('blockquote')?.textContent || '';
      carouselLive.textContent = `Showing testimonial ${index + 1}: ${quote}`;
    }

    currentIndex = index;
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  function startAutoplay() {
    stopAutoplay();
    if (!isPaused && slides.length > 1) {
      autoplayInterval = setInterval(nextSlide, 6000);
    }
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); isPaused = true; nextSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); isPaused = true; prevSlide(); });

  // Pause on hover/focus
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusout', () => { if (!isPaused) startAutoplay(); });

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { stopAutoplay(); prevSlide(); }
    if (e.key === 'ArrowRight') { stopAutoplay(); nextSlide(); }
  });

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    if (!isPaused) startAutoplay();
  }, { passive: true });

  // Initialize
  createDots();
  goToSlide(0);
  if (slides.length > 1) startAutoplay();
})();