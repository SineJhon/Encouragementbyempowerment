/* === FORM HANDLING === */
(function() {
  'use strict';

  const forms = document.querySelectorAll('form[data-form]');
  if (forms.length === 0) return;

  const successIconSVG = '<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  const errorIconSVG = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

  function showInlineMessage(form, message, type = 'success') {
    const oldMessage = form.querySelector('.form-inline-message');
    if (oldMessage) oldMessage.remove();

    const messageEl = document.createElement('div');
    messageEl.className = `form-inline-message form-${type}`;
    messageEl.setAttribute('role', type === 'success' ? 'status' : 'alert');

    const icon = type === 'success' ? successIconSVG : errorIconSVG;
    const heading = type === 'success' ? 'Application Received!' : 'Something went wrong';
    const body = type === 'success'
      ? message || 'Thank you. Your message has been received and our team will follow up soon.'
      : message || 'Please try again later.';

    messageEl.innerHTML = `
      <div class="form-inline-msg-icon">${icon}</div>
      <div class="form-inline-msg-body">
        <h4>${heading}</h4>
        <p>${body}</p>
      </div>
    `;

    form.appendChild(messageEl);
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  forms.forEach(form => {
    if (form.hasAttribute('data-local-handler')) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn?.textContent || 'Submit';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate phone inputs using the component's .isValid() method
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

      if (!form.reportValidity()) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Sending...
        `;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 900));
        form.reset();
        showInlineMessage(
          form,
          form.dataset.successMessage || 'Thank you. Your message has been received and our team will follow up soon.',
          'success'
        );
      } catch (err) {
        showInlineMessage(form, 'Something went wrong. Please try again later.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });

    const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement?.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        if (!input.value) input.parentElement?.classList.remove('focused');
      });
      if (input.value) input.parentElement?.classList.add('focused');
    });
  });
})();
