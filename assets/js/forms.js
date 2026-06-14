/* === FORM HANDLING === */
(function() {
  'use strict';

  const forms = document.querySelectorAll('form[data-form]');
  if (forms.length === 0) return;

  function showInlineMessage(form, message, type = 'success') {
    const oldMessage = form.querySelector('.form-inline-message');
    if (oldMessage) oldMessage.remove();

    const messageEl = document.createElement('div');
    messageEl.className = `form-inline-message form-${type} fade-up`;
    messageEl.setAttribute('role', type === 'success' ? 'status' : 'alert');
    messageEl.textContent = message;
    form.appendChild(messageEl);
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  forms.forEach(form => {
    if (form.hasAttribute('data-local-handler')) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn?.textContent || 'Submit';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

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
