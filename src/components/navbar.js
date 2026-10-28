const NAV_SECTIONS = [
  'skills',
  'experience',
  'projects',
  'achievements',
  'training',
  'education',
  'certifications',
  'contact',
];

let scrollAbortController = null;

function getThemeIcon(theme) {
  if (theme === 'dark') {
    return `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    `;
  }
  return `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  `;
}

function getThemeAriaLabel(theme, lang) {
  if (lang === 'en') {
    return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
  return theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap';
}

export function renderNavbar(labels, currentLang, onLangToggle, onThemeToggle, currentTheme = 'dark') {
  const root = document.getElementById('navbar-root');
  if (!root) return;

  const nextLang = currentLang === 'id' ? 'EN' : 'ID';

  root.innerHTML = `
    <nav class="navbar" id="main-navbar" role="navigation" aria-label="${labels.navLabel ?? 'Navigasi utama'}">
      <div class="navbar__inner">
        <a href="#hero" class="navbar__brand" data-section="hero" aria-label="Kembali ke atas">Gilang Risqi</a>

        <ul class="navbar__links" role="list">
          ${NAV_SECTIONS.map((section) => `
            <li>
              <a
                href="#${section}"
                class="navbar__link"
                data-section="${section}"
                aria-current="false"
              >${labels[section] ?? section}</a>
            </li>
          `).join('')}
        </ul>

        <div class="navbar__controls">
          <button
            class="theme-toggle"
            id="theme-toggle-btn"
            aria-label="${getThemeAriaLabel(currentTheme, currentLang)}"
            type="button"
          >${getThemeIcon(currentTheme)}</button>

          <button
            class="lang-toggle"
            id="lang-toggle-btn"
            aria-label="Ganti bahasa ke ${nextLang}"
            type="button"
          >${nextLang}</button>

          <button
            class="navbar__menu-btn"
            id="mobile-menu-btn"
            aria-expanded="false"
            aria-controls="mobile-drawer"
            aria-label="Buka menu navigasi"
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <rect x="2" y="5" width="18" height="2" rx="1" fill="currentColor"/>
              <rect x="2" y="10" width="18" height="2" rx="1" fill="currentColor"/>
              <rect x="2" y="15" width="18" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        class="navbar__drawer"
        id="mobile-drawer"
        role="dialog"
        aria-label="${labels.navLabel ?? 'Menu navigasi'}"
        aria-modal="false"
      >
        <ul role="list">
          ${NAV_SECTIONS.map((section) => `
            <li>
              <a
                href="#${section}"
                class="navbar__link"
                data-section="${section}"
                aria-current="false"
              >${labels[section] ?? section}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `;

  wireNavbar(onLangToggle, onThemeToggle);
}

export function updateNavbarLabels(labels, currentLang, currentTheme = 'dark') {
  const nextLang = currentLang === 'id' ? 'EN' : 'ID';

  document.querySelectorAll('.navbar__link[data-section]').forEach((link) => {
    const section = link.dataset.section;
    if (labels[section]) link.textContent = labels[section];
  });

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.textContent = nextLang;
    langBtn.setAttribute('aria-label', `Ganti bahasa ke ${nextLang}`);
  }

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.setAttribute('aria-label', getThemeAriaLabel(currentTheme, currentLang));
  }

  const drawer = document.getElementById('mobile-drawer');
  if (drawer && labels.navLabel) {
    drawer.setAttribute('aria-label', labels.navLabel);
  }
}

export function updateNavbarTheme(theme, lang) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  themeBtn.innerHTML = getThemeIcon(theme);
  themeBtn.setAttribute('aria-label', getThemeAriaLabel(theme, lang));
}

function wireNavbar(onLangToggle, onThemeToggle) {
  const navbar = document.getElementById('main-navbar');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const langBtn = document.getElementById('lang-toggle-btn');
  const themeBtn = document.getElementById('theme-toggle-btn');

  if (scrollAbortController) scrollAbortController.abort();
  scrollAbortController = new AbortController();

  const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true, signal: scrollAbortController.signal });
  onScroll();

  let drawerOpen = false;

  function openDrawer() {
    drawerOpen = true;
    drawer.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Tutup menu navigasi');
    menuBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  function closeDrawer() {
    drawerOpen = false;
    drawer.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Buka menu navigasi');
    menuBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="18" height="2" rx="1" fill="currentColor"/>
        <rect x="2" y="10" width="18" height="2" rx="1" fill="currentColor"/>
        <rect x="2" y="15" width="18" height="2" rx="1" fill="currentColor"/>
      </svg>
    `;
  }

  menuBtn.addEventListener('click', () => {
    if (drawerOpen) closeDrawer(); else openDrawer();
  });

  drawer.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerOpen) closeDrawer();
  });

  langBtn.addEventListener('click', () => {
    if (typeof onLangToggle === 'function') onLangToggle();
  });

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (typeof onThemeToggle === 'function') onThemeToggle();
    });
  }
}
