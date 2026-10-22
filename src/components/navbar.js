const NAV_SECTIONS = [
  'about',
  'skills',
  'experience',
  'projects',
  'achievements',
  'training',
  'education',
  'contact',
];

let scrollAbortController = null;

export function renderNavbar(labels, currentLang, onLangToggle) {
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

  wireNavbar(onLangToggle);
}

export function updateNavbarLabels(labels, currentLang) {
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

  const drawer = document.getElementById('mobile-drawer');
  if (drawer && labels.navLabel) {
    drawer.setAttribute('aria-label', labels.navLabel);
  }
}

function wireNavbar(onLangToggle) {
  const navbar = document.getElementById('main-navbar');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const langBtn = document.getElementById('lang-toggle-btn');

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
}
