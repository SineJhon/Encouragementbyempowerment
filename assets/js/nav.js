/* === NAVIGATION (Sidebar) === */
(function() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navClose = document.getElementById('nav-sidebar-close');
  let navBackdrop = document.getElementById('nav-backdrop');
  let lastFocusedElement = null;

  if (navToggle && navLinks && !navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.id = 'nav-backdrop';
    navBackdrop.className = 'nav-backdrop';
    document.body.insertBefore(navBackdrop, document.querySelector('main'));
  }

  if (navToggle && navLinks) {
    navToggle.setAttribute('aria-controls', navLinks.id || 'nav-links');
  }

  function syncMobileCta() {
    if (!navLinks || navLinks.querySelector('.mobile-nav-cta')) return;

    const donateLink = document.querySelector('.nav-actions .btn-donate-glow');
    if (!donateLink) return;

    const ctaItem = document.createElement('li');
    ctaItem.className = 'mobile-nav-cta';

    const cta = document.createElement('a');
    cta.href = donateLink.getAttribute('href') || 'donate.html';
    cta.textContent = 'Donate';
    cta.setAttribute('aria-label', 'Donate to Encouragement by Empowerment');

    ctaItem.appendChild(cta);
    navLinks.appendChild(ctaItem);
  }

  function openNav() {
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : navToggle;
    navLinks.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('visible');
    document.body.classList.add('nav-open');
    if (navClose) navClose.focus();
  }

  function closeNav(restoreFocus = true) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('visible');
    document.body.classList.remove('nav-open');

    if (restoreFocus) {
      const focusTarget = lastFocusedElement || navToggle;
      focusTarget.focus();
    }
  }

  if (navToggle && navLinks) {
    syncMobileCta();

    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close sidebar button
    if (navClose) {
      navClose.addEventListener('click', closeNav);
    }

    // Backdrop click closes sidebar
    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    // Close nav on link click, including the mobile CTA added above.
    navLinks.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) closeNav(false);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
      }
    });

    document.addEventListener('focusin', (e) => {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
      navClose?.focus();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && navLinks.classList.contains('open')) {
        closeNav(false);
      }
    }, { passive: true });
  }

  // Highlight active page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // Header scrolled class
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
})();
