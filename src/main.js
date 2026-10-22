import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';

import { initI18n, toggleLang, onLangChange } from './i18n.js';
import { initRouter, setRouterLang } from './router.js';
import { renderNavbar, updateNavbarLabels } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';
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

function renderAllSections(data) {
  renderHero(data);
  renderAbout(data);
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

function onDataChanged(data, lang) {
  updateNavbarLabels(data.ui.nav, lang);
  renderAllSections(data);
  setRouterLang(lang);
}

function init() {
  const { data, lang } = initI18n();

  renderNavbar(data.ui.nav, lang, handleLangToggle);
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
