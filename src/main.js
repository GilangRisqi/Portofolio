import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';

import { initI18n, toggleLang, onLangChange } from './i18n.js';
import { initRouter, setRouterLang } from './router.js';
import { initTheme, toggleTheme, getPreferredTheme } from './theme.js';
import { renderNavbar, updateNavbarLabels, updateNavbarTheme } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderSkills } from './components/skills.js';
import { renderExperience } from './components/experience.js';
import { renderProjects } from './components/projects.js';
import { renderAchievements } from './components/achievements.js';
import { renderTraining } from './components/training.js';
import { renderEducation } from './components/education.js';
import { renderContact } from './components/contact.js';
import {
  animateHero,
  initScrollReveal,
  crossfadeLanguage
} from './animations.js';

let currentTheme = getPreferredTheme();
let currentLangState = 'id';

function renderAllSections(data) {
  renderHero(data);
  renderSkills(data);
  renderExperience(data);
  renderProjects(data);
  renderAchievements(data);
  renderTraining(data);
  renderEducation(data);
  renderContact(data);
}

function handleLangToggle() {
  crossfadeLanguage(() => {
    toggleLang();
  });
}

function handleThemeToggle() {
  currentTheme = toggleTheme();
  updateNavbarTheme(currentTheme, currentLangState);
}

function onDataChanged(data, lang) {
  currentLangState = lang;
  updateNavbarLabels(data.ui.nav, lang, currentTheme);
  renderAllSections(data);
  setRouterLang(lang);
}

function init() {
  const { data, lang } = initI18n();
  currentLangState = lang;

  currentTheme = initTheme((newTheme) => {
    currentTheme = newTheme;
    updateNavbarTheme(currentTheme, currentLangState);
  });

  renderNavbar(data.ui.nav, lang, handleLangToggle, handleThemeToggle, currentTheme);
  renderAllSections(data);

  onLangChange(onDataChanged);

  setRouterLang(lang);
  initRouter();

  animateHero();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
