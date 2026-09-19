/**
 * ZORA HOMES — MAIN CONTROLLER
 * Navigation, Scroll Observer, Counter Engine & Theme Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileDrawer();
  initScrollReveals();
  initMetricCounters();
  initThemeToggle();
  initSmoothAnchorScrolling();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL EFFECT & SPY
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  const hero = document.getElementById('hero');
  if (!header) return;

  const handleScroll = () => {
    const heroBottom = hero ? (hero.offsetTop + hero.offsetHeight - header.offsetHeight) : window.innerHeight;
    if (window.scrollY >= heroBottom) {
      header.classList.add('scrolled-past-hero');
    } else {
      header.classList.remove('scrolled-past-hero');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer || !overlay) return;

  const toggleDrawer = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
    toggleBtn.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleDrawer());
  overlay.addEventListener('click', () => toggleDrawer(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEALS VIA INTERSECTION OBSERVER
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. METRIC COUNTERS ENGINE
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counterElements = document.querySelectorAll('[data-target-count]');
  if (!counterElements.length) return;

  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target-count'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = isDecimal ? (easeOut * target).toFixed(1) : Math.floor(easeOut * target);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counterElements.forEach(el => countObserver.observe(el));
}

/* --------------------------------------------------------------------------
   5. PERMANENT LUXURY DARK THEME ENFORCEMENT
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  document.documentElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('zora_theme', 'dark');
}


/* --------------------------------------------------------------------------
   7. SMOOTH ANCHOR SCROLLING
   -------------------------------------------------------------------------- */
function initSmoothAnchorScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
