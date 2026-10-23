export function renderExperience(data) {
  const el = document.getElementById('experience');
  if (!el) return;

  const { experience } = data;
  const labels = data.ui.labels;
  const title = labels.sectionTitles.experience;
  const trackLabels = labels.trackLabels;
  const contribs = labels.contributionLabels;
  const expLabels = labels.experience;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="exp-list">
        ${experience.filter((item) => !item.hidden).map((item) => renderCard(item, trackLabels, contribs, expLabels)).join('')}
      </div>
    </div>
  `;
}

function renderCard(item, trackLabels, contribs, expLabels) {
  const trackLabel = trackLabels[item.track] ?? item.track;
  const contribText = contribs[item.contribution] ?? '';

  const periodHtml = item.period
    ? `<span class="exp-card__period">${escText(item.period)}</span>`
    : '';

  const orgHtml = item.organization
    ? `<span class="exp-card__org">${escText(item.organization)}</span>`
    : '';

  const techHtml = item.technologies && item.technologies.length > 0
    ? `<div class="exp-card__tech">
         <span class="exp-card__label">${escText(expLabels.technologies)}:</span>
         <ul class="exp-card__tags" role="list">
           ${item.technologies.map((t) => `<li class="tag tag--tech">${escText(t)}</li>`).join('')}
         </ul>
       </div>`
    : '';

  const competHtml = item.competencies && item.competencies.length > 0
    ? `<div class="exp-card__tech">
         <span class="exp-card__label">${escText(expLabels.competencies)}:</span>
         <ul class="exp-card__tags" role="list">
           ${item.competencies.map((c) => `<li class="tag tag--ops">${escText(c)}</li>`).join('')}
         </ul>
       </div>`
    : '';

  return `
    <article class="exp-card" data-track="${escAttr(item.track)}">
      <header class="exp-card__header">
        <div class="exp-card__meta">
          <span class="exp-card__track-badge track-badge track-badge--${escAttr(item.track)}">${escText(trackLabel)}</span>
          <span class="exp-card__contrib contrib-badge">${escText(contribText)}</span>
        </div>
        <h3 class="exp-card__role">${escText(item.role)}</h3>
        <div class="exp-card__sub">
          ${orgHtml}
          ${periodHtml}
        </div>
      </header>
      <ul class="exp-card__resp" role="list">
        ${item.responsibilities.map((r) => `<li>${escText(r)}</li>`).join('')}
      </ul>
      ${techHtml}
      ${competHtml}
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

function escAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
