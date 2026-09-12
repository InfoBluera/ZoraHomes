/**
 * ZORA HOMES — INTERACTIVE EXPERIENCES
 * Project Scope Estimator, Architectural Style Quiz & Material Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectEstimator();
  initArchitecturalQuiz();
  initFaqAccordion();
});

/* --------------------------------------------------------------------------
   1. BESPOKE PROJECT SCOPE & INVESTMENT ESTIMATOR
   -------------------------------------------------------------------------- */
function initProjectEstimator() {
  const sqftSlider = document.getElementById('sqftRange');
  const sqftDisplay = document.getElementById('sqftValueDisplay');
  const tierButtons = document.querySelectorAll('.tier-btn');
  const scopeCheckboxes = document.querySelectorAll('.scope-addon-check');
  const totalPriceEl = document.getElementById('estimatedTotalPrice');
  const timelineEl = document.getElementById('estimatedTimeline');
  const designFeeEl = document.getElementById('breakdownDesignFee');
  const executionFeeEl = document.getElementById('breakdownExecutionFee');
  const materialsFeeEl = document.getElementById('breakdownMaterialsFee');

  if (!sqftSlider || !totalPriceEl) return;

  let currentTier = 'luxury'; // 'signature', 'luxury', 'ultra'
  const tierRates = {
    signature: { basePerSqFt: 180, timeWeeksPer1000: 3.5, name: 'Signature Executive' },
    luxury: { basePerSqFt: 290, timeWeeksPer1000: 4.5, name: 'Haute Luxury' },
    ultra: { basePerSqFt: 460, timeWeeksPer1000: 6.0, name: 'Bespoke Architectural Masterpiece' }
  };

  function calculateEstimate() {
    const sqft = parseInt(sqftSlider.value, 10);
    sqftDisplay.textContent = `${sqft.toLocaleString()} sq ft`;

    const config = tierRates[currentTier];
    let baseCost = sqft * config.basePerSqFt;

    // Addon multipliers
    let addonSum = 0;
    scopeCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonSum += parseFloat(cb.getAttribute('data-addon-value') || 0);
      }
    });

    const totalEstimate = Math.round(baseCost * (1 + addonSum));
    const designFee = Math.round(totalEstimate * 0.18);
    const materialsFee = Math.round(totalEstimate * 0.48);
    const executionFee = totalEstimate - designFee - materialsFee;

    // Timeline in weeks
    const calculatedWeeks = Math.max(8, Math.round((sqft / 1000) * config.timeWeeksPer1000 + 4));

    // Update UI with currency formatting
    totalPriceEl.textContent = `$${totalEstimate.toLocaleString()}`;
    if (timelineEl) timelineEl.textContent = `Estimated Execution: ${calculatedWeeks} — ${calculatedWeeks + 4} Weeks`;
    if (designFeeEl) designFeeEl.textContent = `$${designFee.toLocaleString()}`;
    if (executionFeeEl) executionFeeEl.textContent = `$${executionFee.toLocaleString()}`;
    if (materialsFeeEl) materialsFeeEl.textContent = `$${materialsFee.toLocaleString()}`;
  }

  // Event Listeners
  sqftSlider.addEventListener('input', calculateEstimate);

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tierButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTier = btn.getAttribute('data-tier') || 'luxury';
      calculateEstimate();
    });
  });

  scopeCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateEstimate);
  });

  // Initial calculation
  calculateEstimate();
}

/* --------------------------------------------------------------------------
   2. ARCHITECTURAL STYLE IDENTITY QUIZ
   -------------------------------------------------------------------------- */
function initArchitecturalQuiz() {
  const quizWrapper = document.getElementById('styleQuizContainer');
  if (!quizWrapper) return;

  const quizSteps = quizWrapper.querySelectorAll('.quiz-step');
  const progressBar = quizWrapper.querySelector('.quiz-progress-fill');
  const resultBox = document.getElementById('quizResultBox');
  const restartBtn = document.getElementById('quizRestartBtn');

  const quizState = {
    step: 1,
    scores: {
      minimalist: 0,
      neoclassical: 0,
      biophilic: 0,
      modernist: 0
    }
  };

  const resultsData = {
    minimalist: {
      title: 'Haute Architectural Minimalism',
      subtitle: 'Pure Form, Monolithic Symmetry & Tactile Restraint',
      desc: 'Your sensibility gravitates toward pure geometric purity, seamless Italian millwork, concealed circadian illumination, and a zero-clutter architectural ethos that celebrates expansive negative space.',
      recommendedLead: 'Sachin (Founder) & Devika (Lead Architect)'
    },
    neoclassical: {
      title: 'Neoclassical Contemporary Grandeur',
      subtitle: 'Sculpted Mouldings, Calacatta Gold & European Heritage',
      desc: 'You appreciate high-ceiling proportions, hand-carved boiserie paneling, brushed brass metallurgy, and custom crystal lighting installations balanced with ultra-modern smart comforts.',
      recommendedLead: 'Abijith (Head of Bespoke Interiors)'
    },
    biophilic: {
      title: 'Organic Biophilic Sanctuary',
      subtitle: 'Raw Roman Travertine, Aged Walnut & Fluid Light Choreography',
      desc: 'You desire spaces that breathe: climate-controlled internal courtyards, tactile fluted woods, acoustic linen drapery, and harmonic integration between exterior landscape and interior shelter.',
      recommendedLead: 'Devika (Lead Architect & Spatial Strategist)'
    },
    modernist: {
      title: 'Urban Penthouse Brutalism',
      subtitle: 'Smoked Obsidian Glass, Fluted Bronze & Precision Engineering',
      desc: 'Your aesthetic is bold, dramatic, and unapologetically visionary. Dark stone slabs, statement art walls, cantilevered bespoke cabinetry, and tailored acoustic zones define your signature sanctuary.',
      recommendedLead: 'Sachin (Founder) & Abijith (Interior Designer)'
    }
  };

  function renderStep(stepIndex) {
    quizSteps.forEach(step => {
      const sNum = parseInt(step.getAttribute('data-quiz-step'), 10);
      step.style.display = sNum === stepIndex ? 'block' : 'none';
    });

    if (progressBar) {
      progressBar.style.width = `${(stepIndex / 3) * 100}%`;
    }
  }

  // Handle option click
  quizWrapper.querySelectorAll('.quiz-option-card').forEach(option => {
    option.addEventListener('click', () => {
      const styleType = option.getAttribute('data-style');
      if (styleType && quizState.scores[styleType] !== undefined) {
        quizState.scores[styleType] += 1;
      }

      if (quizState.step < 3) {
        quizState.step += 1;
        renderStep(quizState.step);
      } else {
        showResults();
      }
    });
  });

  function showResults() {
    quizSteps.forEach(s => s.style.display = 'none');
    if (progressBar) progressBar.style.width = '100%';

    // Find highest score
    let bestStyle = 'minimalist';
    let highest = -1;
    for (const [key, val] of Object.entries(quizState.scores)) {
      if (val > highest) {
        highest = val;
        bestStyle = key;
      }
    }

    const res = resultsData[bestStyle];
    const resTitle = document.getElementById('quizResTitle');
    const resSubtitle = document.getElementById('quizResSubtitle');
    const resDesc = document.getElementById('quizResDesc');
    const resLead = document.getElementById('quizResLead');

    if (resTitle) resTitle.textContent = res.title;
    if (resSubtitle) resSubtitle.textContent = res.subtitle;
    if (resDesc) resDesc.textContent = res.desc;
    if (resLead) resLead.textContent = `Recommended Lead Partner: ${res.recommendedLead}`;

    if (resultBox) {
      resultBox.style.display = 'block';
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      quizState.step = 1;
      quizState.scores = { minimalist: 0, neoclassical: 0, biophilic: 0, modernist: 0 };
      if (resultBox) resultBox.style.display = 'none';
      renderStep(1);
    });
  }

  // Init step 1
  renderStep(1);
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}
