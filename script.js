const navToggle = document.querySelector('.nav-toggle');
const navWrap = document.querySelector('.nav-wrap');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = document.querySelectorAll('.primary-nav a');
const navListItems = document.querySelectorAll('.primary-nav li');

if (navWrap) {
  navListItems.forEach((item, index) => {
    item.style.setProperty('--nav-item-index', String(index));
  });

  requestAnimationFrame(() => {
    navWrap.classList.add('nav-animated');
  });

  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      navWrap.classList.toggle('is-stuck', !entry.isIntersecting);
    },
    {
      threshold: 1,
    }
  );

  const navSentinel = document.createElement('div');
  navSentinel.setAttribute('aria-hidden', 'true');
  navSentinel.style.position = 'absolute';
  navSentinel.style.top = '0';
  navSentinel.style.width = '1px';
  navSentinel.style.height = '1px';
  document.body.prepend(navSentinel);
  stickyObserver.observe(navSentinel);
}

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navWrap?.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navWrap?.classList.remove('menu-open');
    });
  });
}

const revealElements = document.querySelectorAll('.reveal');

// Mark elements already in the viewport on page load
const isRevealInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - 20 && rect.bottom > 0;
};

revealElements.forEach((el) => {
  if (isRevealInViewport(el)) {
    el.classList.add('visible');
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px',
  }
);

revealElements.forEach((element) => {
  if (!element.classList.contains('visible')) {
    revealObserver.observe(element);
  }
});

const counterElements = document.querySelectorAll('[data-counter]');

if (counterElements.length > 0) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatCounterValue = (value, prefix, suffix) => {
    const formatted = new Intl.NumberFormat('en-US').format(value);
    return `${prefix}${formatted}${suffix}`;
  };

  const startCounter = (element) => {
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

    const duration = 1700;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = Math.round(target * eased);

      element.textContent = formatCounterValue(current, prefix, suffix);

      if (elapsed < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        if (element instanceof HTMLElement && !element.dataset.counted) {
          element.dataset.counted = 'true';
          startCounter(element);
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
    }
  );

  counterElements.forEach((element) => counterObserver.observe(element));
}

const storyCards = document.querySelectorAll('.story-card');
const prevBtn = document.getElementById('prev-story');
const nextBtn = document.getElementById('next-story');
let activeStory = 0;

function showStory(index) {
  storyCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

function nextStory() {
  activeStory = (activeStory + 1) % storyCards.length;
  showStory(activeStory);
}

function prevStory() {
  activeStory = (activeStory - 1 + storyCards.length) % storyCards.length;
  showStory(activeStory);
}

if (storyCards.length > 0) {
  showStory(activeStory);

  if (nextBtn) {
    nextBtn.addEventListener('click', nextStory);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevStory);
  }

  setInterval(nextStory, 7000);
}

const demoForms = document.querySelectorAll('form[action="#"]');

demoForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Validate phone inputs using component .isValid()
    // Phone is optional — only validate if the user entered digits
    var phoneGroups = form.querySelectorAll('[data-phone-input]');
    for (var i = 0; i < phoneGroups.length; i++) {
      var pi = phoneGroups[i];
      if (pi._pi) {
        var phoneInput = pi.querySelector('.pi-phone-input');
        var digits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
        if (digits.length > 0 && !pi._pi.isValid()) {
          if (phoneInput) {
            phoneInput.setCustomValidity('Please enter a valid phone number for the selected country.');
            phoneInput.reportValidity();
            phoneInput.focus();
          }
          return;
        } else {
          if (phoneInput) phoneInput.setCustomValidity('');
        }
      }
    }

    if (!form.reportValidity()) {
      return;
    }

    if (typeof window.showUnsetPopup === 'function') {
      window.showUnsetPopup(
        'Notification',
        'Form Can Not Be Sent Right Now, Cause This Is Demo Project.',
        'Okay'
      );
    } else {
      alert('Form Can Not Be Sent Right Now, Cause This Is Demo Project.');
    }

    form.reset();
  });
});

const donationToggles = document.querySelectorAll('.toggle-btn');
const donationNote = document.getElementById('donation-note');
const donationAmountInput = document.getElementById('donation-amount');
const donationAmountButtons = document.querySelectorAll('[data-amount-choice]');
const cardNumberInput = document.getElementById('card-number');
const cardExpiryInput = document.getElementById('card-expiry');
const cardCvcInput = document.getElementById('card-cvc');
const cardBrandHint = document.getElementById('card-brand-hint');
const cardBrandLogos = document.querySelectorAll('[data-card-logo]');

if (donationToggles.length > 0 && donationNote) {
  donationToggles.forEach((button) => {
    button.addEventListener('click', () => {
      donationToggles.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const frequency = button.dataset.frequency;
      donationNote.textContent =
        frequency === 'recurring'
          ? 'You are making a recurring monthly gift.'
          : 'You are making a one-time gift.';
    });
  });
}

if (donationAmountButtons.length > 0 && donationAmountInput) {
  const syncAmountSelection = (value) => {
    donationAmountButtons.forEach((button) => {
      const amount = button.getAttribute('data-amount-choice');
      const matchesPreset = amount !== 'custom' && value === amount;
      const matchesCustom = amount === 'custom' && value !== '' && !['25', '50', '100', '250', '500'].includes(value);
      button.classList.toggle('active', matchesPreset || matchesCustom);
    });
  };

  donationAmountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const amount = button.getAttribute('data-amount-choice');

      if (amount === 'custom') {
        donationAmountInput.value = '';
        donationAmountInput.focus();
      } else {
        donationAmountInput.value = amount || '';
      }

      syncAmountSelection(donationAmountInput.value.trim());
    });
  });

  donationAmountInput.addEventListener('input', () => {
    syncAmountSelection(donationAmountInput.value.trim());
  });

  syncAmountSelection(donationAmountInput.value.trim());
}

if (cardNumberInput) {
  const setCardBrand = (brand) => {
    cardBrandLogos.forEach((logo) => {
      logo.classList.toggle('active', logo.getAttribute('data-card-logo') === brand);
    });

    if (!cardBrandHint) return;

    if (brand === 'mastercard') {
      cardBrandHint.textContent = 'Detected card type: Mastercard';
    } else if (brand === 'visa') {
      cardBrandHint.textContent = 'Detected card type: Visa';
    } else if (brand === 'other') {
      cardBrandHint.textContent = 'Detected card type: Other card';
    } else {
      cardBrandHint.textContent = 'Card type will appear as you type.';
    }
  };

  cardNumberInput.addEventListener('input', () => {
    const digits = cardNumberInput.value.replace(/\D/g, '').slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    cardNumberInput.value = groups ? groups.join(' ') : '';

    if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]|7[01]|720)/.test(digits)) {
      setCardBrand('mastercard');
    } else if (/^4/.test(digits)) {
      setCardBrand('visa');
    } else if (digits.length === 0) {
      setCardBrand('none');
    } else {
      setCardBrand('other');
    }
  });

  cardNumberInput.addEventListener('blur', () => {
    const raw = cardNumberInput.value.replace(/\D/g, '');
    cardNumberInput.setCustomValidity(raw.length >= 13 ? '' : 'Please enter a valid card number.');
  });
}

if (cardExpiryInput) {
  cardExpiryInput.addEventListener('input', () => {
    const digits = cardExpiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) {
      cardExpiryInput.value = digits;
      return;
    }

    cardExpiryInput.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  });

  cardExpiryInput.addEventListener('blur', () => {
    const value = cardExpiryInput.value;
    const isValid = /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value);
    cardExpiryInput.setCustomValidity(isValid ? '' : 'Enter expiry in MM/YY format.');
  });
}

if (cardCvcInput) {
  cardCvcInput.addEventListener('input', () => {
    cardCvcInput.value = cardCvcInput.value.replace(/\D/g, '').slice(0, 4);
  });

  cardCvcInput.addEventListener('blur', () => {
    const isValid = /^\d{3,4}$/.test(cardCvcInput.value);
    cardCvcInput.setCustomValidity(isValid ? '' : 'Enter a valid 3 or 4 digit security code.');
  });
}

const demoLinkTargets = document.querySelectorAll('[data-demo-link]');

if (demoLinkTargets.length > 0) {
  demoLinkTargets.forEach((target) => {
    target.addEventListener('click', (event) => {
      event.preventDefault();

      const customMessage =
        target.getAttribute('data-demo-message') ||
        'This page is not available yet because this is a demo project.';

      if (typeof window.showUnsetPopup === 'function') {
        window.showUnsetPopup('Notification', customMessage, 'Okay');
      } else {
        alert(customMessage);
      }
    });
  });
}

const unsetAlertTargets = document.querySelectorAll('[data-unset-alert]');

if (unsetAlertTargets.length > 0 || demoForms.length > 0 || demoLinkTargets.length > 0) {
  const alertOverlay = document.createElement('div');
  alertOverlay.className = 'unset-popup-overlay';
  alertOverlay.setAttribute('hidden', '');
  alertOverlay.innerHTML = `
    <div class="unset-popup" role="dialog" aria-modal="true" aria-labelledby="unset-popup-title" aria-describedby="unset-popup-message">
      <div class="unset-popup-head">
        <h3 id="unset-popup-title" class="unset-popup-title">Notification</h3>
      </div>
      <p id="unset-popup-message" class="unset-popup-message"></p>
      <button type="button" class="unset-popup-btn">Okay</button>
    </div>
  `;

  document.body.appendChild(alertOverlay);

  const popupCard = alertOverlay.querySelector('.unset-popup');
  const popupTitle = alertOverlay.querySelector('.unset-popup-title');
  const popupMessage = alertOverlay.querySelector('.unset-popup-message');
  const popupButton = alertOverlay.querySelector('.unset-popup-btn');

  let lastActiveElement = null;

  const closePopup = () => {
    alertOverlay.classList.remove('open');
    setTimeout(() => {
      alertOverlay.setAttribute('hidden', '');
    }, 220);

    if (lastActiveElement instanceof HTMLElement) {
      lastActiveElement.focus();
    }
  };

  const openPopup = (titleText, messageText, actionText) => {
    popupTitle.textContent = titleText;
    popupMessage.textContent = messageText;
    popupButton.textContent = actionText;
    alertOverlay.removeAttribute('hidden');

    requestAnimationFrame(() => {
      alertOverlay.classList.add('open');
    });

    popupButton.focus();
  };

  window.showUnsetPopup = (titleText, messageText, actionText = 'Okay') => {
    lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openPopup(titleText, messageText, actionText);
  };

  unsetAlertTargets.forEach((target) => {
    target.addEventListener('click', (event) => {
      event.preventDefault();
      lastActiveElement = target;

      const customTitle = target.getAttribute('data-alert-title') || 'Notification';
      const customMessage =
        target.getAttribute('data-alert-message') ||
        'This item is not connected yet.';
      const customAction = target.getAttribute('data-alert-action') || 'Okay';

      window.showUnsetPopup(customTitle, customMessage, customAction);
    });
  });

  popupButton?.addEventListener('click', closePopup);

  alertOverlay.addEventListener('click', (event) => {
    if (event.target === alertOverlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && alertOverlay.classList.contains('open')) {
      closePopup();
    }
  });

  popupCard?.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}
