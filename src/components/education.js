export function renderEducation(data) {
  const el = document.getElementById('education');
  if (!el) return;

  const { education } = data;
  const title = data.ui.labels.sectionTitles.education;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="edu-grid">
        ${education.map((item) => renderCard(item)).join('')}
      </div>
    </div>
  `;
}

function renderCard(item) {
  const periodHtml = item.period
    ? `<span class="edu-card__period">${escText(item.period)}</span>`
    : '';

  const gpaHtml = item.gpa
    ? `<span class="edu-card__gpa"><span class="edu-card__gpa-label">IPK:</span> ${escText(item.gpa)}</span>`
    : '';

  const notesHtml = item.notes
    ? `<p class="edu-card__notes">${escText(item.notes)}</p>`
    : '';

  return `
    <article class="edu-card">
      <header class="edu-card__header">
        <h3 class="edu-card__degree">${escText(item.program)}</h3>
        <div class="edu-card__sub">
          <span class="edu-card__institution">${escText(item.institution)}</span>
          ${periodHtml}
        </div>
      </header>
      ${gpaHtml}
      ${notesHtml}
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
