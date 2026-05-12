document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ── Color palette ──────────────────────────────────────────────
  const colorBtns = document.querySelectorAll('.color-btn');
  const primaryColorInput = document.getElementById('primary-color');

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => {
        b.classList.remove('color-btn--selected');
        b.removeAttribute('aria-pressed');
      });
      btn.classList.add('color-btn--selected');
      btn.setAttribute('aria-pressed', 'true');
      primaryColorInput.value = btn.dataset.color;
      document.documentElement.style.setProperty('--primary', btn.dataset.color);
    });
  });

  // ── Theme selection ─────────────────────────────────────────────
  const themeBtns = document.querySelectorAll('.theme-btn');
  const themeInput = document.getElementById('theme-input');

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => {
        b.classList.remove('theme-btn--selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('theme-btn--selected');
      btn.setAttribute('aria-pressed', 'true');
      themeInput.value = btn.dataset.theme;
    });
  });

  // ── Segmented control (event type) ─────────────────────────────
  const segBtns = document.querySelectorAll('.seg-btn');
  const eventTypeInput = document.getElementById('event-type');
  const locationInput = document.getElementById('location');

  segBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segBtns.forEach(b => b.classList.remove('seg-btn--active'));
      btn.classList.add('seg-btn--active');
      eventTypeInput.value = btn.dataset.value;
      locationInput.placeholder = btn.dataset.value === 'online'
        ? 'Link da reunião'
        : 'Link ou endereço';
    });
  });

  // ── Style toggle (dark/light label) ────────────────────────────
  const styleToggle = document.getElementById('style-toggle');
  const styleLabel = document.getElementById('style-label');

  styleToggle.addEventListener('change', () => {
    styleLabel.textContent = styleToggle.checked ? 'Claro' : 'Escuro';
  });

  // ── File input display ──────────────────────────────────────────
  const coverPhoto = document.getElementById('cover-photo');
  const fileNameDisplay = document.getElementById('file-name');

  coverPhoto.addEventListener('change', () => {
    const file = coverPhoto.files[0];
    fileNameDisplay.textContent = file ? file.name : 'Nenhum arquivo selecionado';
  });

  // ── Phone mask ──────────────────────────────────────────────────
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    let formatted = '';
    if (digits.length > 0) formatted = '(' + digits.slice(0, 2);
    if (digits.length >= 2) formatted += ') ' + digits.slice(2, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 11);
    phoneInput.value = formatted;
  });

  // ── Validation helpers ──────────────────────────────────────────
  function setError(input, errorEl) {
    input.classList.add('input--error');
    errorEl.classList.add('visible');
  }

  function clearError(input, errorEl) {
    input.classList.remove('input--error');
    errorEl.classList.remove('visible');
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Live validation on blur
  const titleInput = document.getElementById('title');
  const titleError = document.getElementById('title-error');

  titleInput.addEventListener('blur', () => {
    titleInput.value.trim()
      ? clearError(titleInput, titleError)
      : setError(titleInput, titleError);
  });

  titleInput.addEventListener('input', () => {
    if (titleInput.value.trim()) clearError(titleInput, titleError);
  });

  const nameInput = document.getElementById('contact-name');
  const nameError = document.getElementById('name-error');

  nameInput.addEventListener('blur', () => {
    nameInput.value.trim()
      ? clearError(nameInput, nameError)
      : setError(nameInput, nameError);
  });

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) clearError(nameInput, nameError);
  });

  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');

  emailInput.addEventListener('blur', () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      setError(emailInput, emailError);
    } else {
      clearError(emailInput, emailError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (!emailInput.value || isValidEmail(emailInput.value)) {
      clearError(emailInput, emailError);
    }
  });

  // ── Toast ────────────────────────────────────────────────────────
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, duration = 3500) {
    toastMessage.textContent = message;
    toast.classList.add('toast--visible');
    lucide.createIcons();
    setTimeout(() => {
      toast.classList.remove('toast--visible');
    }, duration);
  }

  // ── Form submit ──────────────────────────────────────────────────
  const form = document.getElementById('invite-form');
  const termsCheck = document.getElementById('terms');
  const termsError = document.getElementById('terms-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Title required
    if (!titleInput.value.trim()) {
      setError(titleInput, titleError);
      valid = false;
    } else {
      clearError(titleInput, titleError);
    }

    // Name required
    if (!nameInput.value.trim()) {
      setError(nameInput, nameError);
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Email format
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      setError(emailInput, emailError);
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Terms required
    if (!termsCheck.checked) {
      termsError.classList.add('visible');
      valid = false;
    } else {
      termsError.classList.remove('visible');
    }

    if (!valid) {
      const firstError = form.querySelector('.input--error, .error-msg.visible');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    showToast('🎉 Convite gerado com sucesso!');
  });

  // Uncheck terms error when user checks it
  termsCheck.addEventListener('change', () => {
    if (termsCheck.checked) termsError.classList.remove('visible');
  });
});
