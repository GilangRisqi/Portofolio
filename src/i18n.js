import idData from './data/id.json';
import enData from './data/en.json';

const STORAGE_KEY = 'lang';
const SUPPORTED = ['id', 'en'];

const DATA_MAP = { id: idData, en: enData };

let currentLang = 'id';
const changeListeners = [];

function resolveDefaultLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;

  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(browser)) return browser;

  return 'id';
}

function updateSeoMeta(data, lang) {
  const isId = lang === 'id';
  const roleTitle = isId
    ? 'Web Developer & Operasional'
    : 'Web Developer & Operations';
  const fullTitle = `${data.profile.name} · ${roleTitle}`;
  const description = data.profile.summary;

  document.title = fullTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', fullTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute('content', isId ? 'id_ID' : 'en_US');
}

export function onLangChange(callback) {
  changeListeners.push(callback);
}

export function getCurrentLang() {
  return currentLang;
}

export function getCurrentData() {
  return DATA_MAP[currentLang];
}

export function setLang(lang) {
  if (!SUPPORTED.includes(lang) || lang === currentLang) return;

  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.setAttribute('lang', lang);

  const data = DATA_MAP[lang];
  updateSeoMeta(data, lang);
  changeListeners.forEach((cb) => cb(data, lang));
}

export function toggleLang() {
  setLang(currentLang === 'id' ? 'en' : 'id');
}

export function initI18n() {
  currentLang = resolveDefaultLang();
  localStorage.setItem(STORAGE_KEY, currentLang);
  document.documentElement.setAttribute('lang', currentLang);

  const data = DATA_MAP[currentLang];
  updateSeoMeta(data, currentLang);
  return { data, lang: currentLang };
}
