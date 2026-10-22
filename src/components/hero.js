export function renderHero(data) {
  const el = document.getElementById('hero');
  if (!el) return;

  const { profile } = data;
  const { hero: heroLabels } = data.ui.labels;

  el.innerHTML = `
    <div class="container hero__container">
      <div class="hero__avatar" aria-hidden="true">
        <span class="hero__avatar-initials">GR</span>
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
