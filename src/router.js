import { animateContentTransition } from './animations.js';

const SECTION_TITLES = {
  hero:         { id: 'Gilang Risqi Pratama',     en: 'Gilang Risqi Pratama' },
  about:        { id: 'Tentang · Gilang Risqi Pratama',   en: 'About · Gilang Risqi Pratama' },
  skills:       { id: 'Keahlian · Gilang Risqi Pratama',  en: 'Skills · Gilang Risqi Pratama' },
  experience:   { id: 'Pengalaman · Gilang Risqi Pratama', en: 'Experience · Gilang Risqi Pratama' },
  projects:     { id: 'Proyek · Gilang Risqi Pratama',    en: 'Projects · Gilang Risqi Pratama' },
  achievements: { id: 'Pencapaian · Gilang Risqi Pratama', en: 'Achievements · Gilang Risqi Pratama' },
  training:     { id: 'Pelatihan · Gilang Risqi Pratama', en: 'Training · Gilang Risqi Pratama' },
  education:    { id: 'Pendidikan · Gilang Risqi Pratama', en: 'Education · Gilang Risqi Pratama' },
  contact:      { id: 'Kontak · Gilang Risqi Pratama',    en: 'Contact · Gilang Risqi Pratama' },
};

const DEFAULT_SECTION = 'hero';
let currentLang = 'id';

export function setRouterLang(lang) {
  currentLang = lang;
  syncTitle(getActiveSection());
}

function getActiveSection() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return hash && SECTION_TITLES[hash] ? hash : DEFAULT_SECTION;
}

function syncTitle(sectionId) {
  const titles = SECTION_TITLES[sectionId] ?? SECTION_TITLES[DEFAULT_SECTION];
  document.title = titles[currentLang] ?? titles.id;
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    animateContentTransition(el);
  }
}

function updateActiveLink(sectionId) {
  document.querySelectorAll('.navbar__link[data-section]').forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    link.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function handleHashChange() {
  const sectionId = getActiveSection();
  syncTitle(sectionId);
  updateActiveLink(sectionId);
  scrollToSection(sectionId);
}

function initScrollSpy() {
  const sections = Object.keys(SECTION_TITLES)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          updateActiveLink(id);
          syncTitle(id);
          history.replaceState(null, '', `#${id}`);
        }
      });
    },
    {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((el) => observer.observe(el));
}

export function initRouter() {
  window.addEventListener('hashchange', handleHashChange);

  if (window.location.hash) {
    const sectionId = getActiveSection();
    syncTitle(sectionId);
    updateActiveLink(sectionId);
    requestAnimationFrame(() => scrollToSection(sectionId));
  } else {
    syncTitle(DEFAULT_SECTION);
    updateActiveLink(DEFAULT_SECTION);
  }

  initScrollSpy();
}
