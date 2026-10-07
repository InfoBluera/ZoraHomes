/**
 * ZORA HOMES — INTERACTIVE EXPERIENCES
 * Architectural Style Quiz & Material Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  initArchitecturalQuiz();
  initFaqAccordion();
});

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
      recommendedLead: 'Architect Devika (Lead Architect)'
    },
    neoclassical: {
      title: 'Neoclassical Contemporary Grandeur',
      subtitle: 'Sculpted Mouldings, Calacatta Gold & European Heritage',
      desc: 'You appreciate high-ceiling proportions, hand-carved boiserie paneling, brushed brass metallurgy, and custom crystal lighting installations balanced with ultra-modern smart comforts.',
      recommendedLead: 'Architect Devika (Lead Architect)'
    },
    biophilic: {
      title: 'Organic Biophilic Sanctuary',
      subtitle: 'Raw Roman Travertine, Aged Walnut & Fluid Light Choreography',
      desc: 'You desire spaces that breathe: climate-controlled internal courtyards, tactile fluted woods, acoustic linen drapery, and harmonic integration between exterior landscape and interior shelter.',
      recommendedLead: 'Architect Devika (Lead Architect & Spatial Strategist)'
    },
    modernist: {
      title: 'Urban Penthouse Brutalism',
      subtitle: 'Smoked Obsidian Glass, Fluted Bronze & Precision Engineering',
      desc: 'Your aesthetic is bold, dramatic, and unapologetically visionary. Dark stone slabs, statement art walls, cantilevered bespoke cabinetry, and tailored acoustic zones define your signature sanctuary.',
      recommendedLead: 'Architect Devika (Lead Architect)'
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
