export function renderAchievements(data) {
  const el = document.getElementById('achievements');
  if (!el) return;

  const { achievements } = data;
  const title = data.ui.labels.sectionTitles.achievements;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="achieve-grid">
        ${achievements.map((item) => renderCard(item)).join('')}
      </div>
    </div>
  `;
}

function renderCard(item) {
  const sourceHtml = item.source
    ? `<div class="achieve-card__source">${escText(item.source)}</div>`
    : '';

  return `
    <article class="achieve-card">
      <h3 class="achieve-card__title">${escText(item.title)}</h3>
      <p class="achieve-card__evidence">${escText(item.evidence)}</p>
      ${sourceHtml}
    </article>
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
