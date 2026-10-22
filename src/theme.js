const THEME_KEY = 'portfolio-theme';

export function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // localStorage might be unavailable in private browsing
  }
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function initTheme(onThemeChange) {
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = (e) => {
    const saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
      if (typeof onThemeChange === 'function') onThemeChange(newTheme);
    }
  };

  mediaQuery.addEventListener('change', handleSystemChange);
  return initialTheme;
}
