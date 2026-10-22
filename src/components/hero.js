export function renderHero(data) {
  const el = document.getElementById('hero');
  if (!el) return;

  const { profile } = data;
  const { hero: heroLabels } = data.ui.labels;

  const avatarMarkup = profile.avatar
    ? `<img src="${escText(profile.avatar)}" alt="${escText(profile.name)}" class="hero__avatar-img" width="120" height="120" loading="eager" />`
    : `<span class="hero__avatar-initials">${escText(getInitials(profile.name))}</span>`;

  el.innerHTML = `
    <div class="container hero__container">
      <div class="hero__avatar"${profile.avatar ? '' : ' aria-hidden="true"'}>
        ${avatarMarkup}
      </div>
      <div class="hero__body">
        <h1 class="hero__name">${escText(profile.name)}</h1>
        <p class="hero__headline">${escText(profile.headline)}</p>
        <p class="hero__summary">${escText(profile.summary)}</p>
        <div class="hero__cta-group">
          <a href="#experience" class="btn btn--primary">${escText(heroLabels.ctaExperience)}</a>
          <a href="#contact" class="btn btn--outline">${escText(heroLabels.ctaContact)}</a>
        </div>
      </div>
    </div>
  `;
}

function escText(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getInitials(name) {
  if (!name) return 'GR';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
