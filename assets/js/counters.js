/* === ANIMATED COUNTERS (Fixed) === */
(function() {
  'use strict';

  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function formatCounterValue(value, prefix, suffix) {
    const formatted = new Intl.NumberFormat('en-US').format(value);
    return `${prefix}${formatted}${suffix}`;
  }

  function startCounter(element) {
    const target = Number.parseInt(element.getAttribute('data-target') || '0', 10);
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '+';

    if (!Number.isFinite(target) || target <= 0) {
      element.textContent = formatCounterValue(0, prefix, suffix);
      return;
    }

    if (prefersReducedMotion) {
      element.textContent = formatCounterValue(target, prefix, suffix);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    function tick(currentTime) {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      // Cubic ease out
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = Math.round(target * eased);
      element.textContent = formatCounterValue(current, prefix, suffix);

      if (elapsed < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      if (element instanceof HTMLElement && !element.dataset.counted) {
        element.dataset.counted = 'true';
        startCounter(element);
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  counterElements.forEach(element => counterObserver.observe(element));
})();