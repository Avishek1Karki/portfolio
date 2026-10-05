/**
 * Avishek Karki - Personal Portfolio Script
 * Vanilla JavaScript - Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Light / Dark Mode) ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const moonIconSvg = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  const sunIconSvg = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('avishek-portfolio-theme', theme);
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? sunIconSvg : moonIconSvg;
    }
  }

  // Determine initial theme: saved preference -> system preference -> light default
  const savedTheme = localStorage.getItem('avishek-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('avishek-portfolio-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --- 2. Mobile Menu Drawer Navigation ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileMenu() {
    if (hamburgerBtn && mobileDrawer) {
      hamburgerBtn.classList.remove('open');
      mobileDrawer.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside of header
    document.addEventListener('click', (e) => {
      const header = document.getElementById('siteHeader');
      if (header && !header.contains(e.target) && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // --- 3. ScrollSpy Active Section Detection ---
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');

  function handleScrollSpy() {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        desktopLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy(); // Initial call

  // --- 4. Profile Image Fallback Handler ---
  const avatarImg = document.getElementById('avatarImg');
  const avatarFallback = document.getElementById('avatarFallback');

  if (avatarImg && avatarFallback) {
    avatarImg.addEventListener('error', () => {
      avatarImg.style.display = 'none';
      avatarFallback.style.display = 'block';
    });
  }
});
