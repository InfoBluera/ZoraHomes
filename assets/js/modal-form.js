/**
 * ZORA HOMES — MODAL CONTROLLER & FORM VALIDATION
 * Consultation booking modal, validation engine & toast notification system
 */

document.addEventListener('DOMContentLoaded', () => {
  initConsultationModal();
  initFormSubmission();
});

/* --------------------------------------------------------------------------
   1. CONSULTATION MODAL CONTROLLER
   -------------------------------------------------------------------------- */
function initConsultationModal() {
  const modalOverlay = document.getElementById('consultationModal');
  const openButtons = document.querySelectorAll('[data-open-modal="consultation"]');
  const closeBtn = document.getElementById('closeModalBtn');

  if (!modalOverlay) return;

  const openModal = (prefillData = {}) => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Prefill if provided
    if (prefillData.tier && document.getElementById('consultationTier')) {
      document.getElementById('consultationTier').value = prefillData.tier;
    }
    if (prefillData.sqft && document.getElementById('consultationSqft')) {
      document.getElementById('consultationSqft').value = prefillData.sqft;
    }
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.getAttribute('data-prefill-tier') || '';
      const sqft = btn.getAttribute('data-prefill-sqft') || '';
      openModal({ tier, sqft });
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on outside click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   2. FORM SUBMISSION & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initFormSubmission() {
  const consultationForm = document.getElementById('consultationForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const phoneInput = document.getElementById('clientPhone');
      const typeInput = document.getElementById('projectType');

      if (!nameInput.value.trim()) {
        showToast('Please provide your full name.', 'warning');
        nameInput.focus();
        return;
      }

      if (!validateEmail(emailInput.value.trim())) {
        showToast('Please enter a valid email address.', 'warning');
        emailInput.focus();
        return;
      }

      if (!phoneInput.value.trim()) {
        showToast('Please enter a valid telephone contact.', 'warning');
        phoneInput.focus();
        return;
      }

      // Simulate luxury submission
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Securing Executive Slot...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        consultationForm.reset();

        const modal = document.getElementById('consultationModal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        showToast('Private Consultation Reserved. Sachin & Devika will connect within 24 hours.', 'success');
      }, 1200);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (email && validateEmail(email.value)) {
        email.value = '';
        showToast('Subscribed to Zora Homes Architectural Monograph.', 'success');
      } else {
        showToast('Please enter a valid email address.', 'warning');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  
  const icon = type === 'success' ? 
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>` :
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E5C396" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    ${icon}
    <span style="font-size: 0.88rem; font-weight: 500;">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
