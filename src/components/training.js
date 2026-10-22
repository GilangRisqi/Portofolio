export function renderTraining(data) {
  const el = document.getElementById('training');
  if (!el) return;

  const { training } = data;
  const title = data.ui.labels.sectionTitles.training;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="train-list">
        ${training.map((item) => renderCard(item)).join('')}
      </div>
    </div>
  `;
}

function renderCard(item) {
  const periodHtml = item.period
    ? `<span class="train-card__period">${escText(item.period)}</span>`
    : '';

  const detailsHtml = item.details && item.details.length > 0
    ? `<ul class="train-card__details" role="list">
         ${item.details.map((d) => `<li>${escText(d)}</li>`).join('')}
       </ul>`
    : '';

  return `
    <article class="train-card">
      <header class="train-card__header">
        <h3 class="train-card__title">${escText(item.name)}</h3>
        <div class="train-card__sub">
          <span class="train-card__program">${escText(item.program)}</span>
          ${periodHtml}
        </div>
      </header>
      ${detailsHtml}
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
