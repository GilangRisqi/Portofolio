export function renderProjects(data) {
  const el = document.getElementById('projects');
  if (!el) return;

  const { projects } = data;
  const labels = data.ui.labels;
  const title = labels.sectionTitles.projects;
  const contribs = labels.contributionLabels;
  const projLabels = labels.projects;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="proj-grid">
        ${projects.map((p) => renderCard(p, contribs, projLabels)).join('')}
      </div>
    </div>
  `;
}

function renderCard(item, contribs, projLabels) {
  const contribText = contribs[item.contribution] ?? '';

  const techHtml = item.technologies && item.technologies.length > 0
    ? `<ul class="proj-card__tags" role="list">
         ${item.technologies.map((t) => `<li class="tag tag--tech">${escText(t)}</li>`).join('')}
       </ul>`
    : '';

  const repoLink = item.links?.repo
    ? `<a
         href="${escAttr(item.links.repo)}"
         class="btn btn--ghost"
         target="_blank"
         rel="noopener noreferrer"
       >${escText(projLabels.viewRepo)}</a>`
    : '';

  const demoLink = item.links?.demo
    ? `<a
         href="${escAttr(item.links.demo)}"
         class="btn btn--ghost"
         target="_blank"
         rel="noopener noreferrer"
       >${escText(projLabels.viewDemo)}</a>`
    : '';

  const linksHtml = (repoLink || demoLink)
    ? `<div class="proj-card__links">${repoLink}${demoLink}</div>`
    : '';

  const teamNoteHtml = item.teamNote
    ? `<p class="proj-card__team-note">${escText(item.teamNote)}</p>`
    : '';

  return `
    <article class="proj-card">
      <header class="proj-card__header">
        <div class="proj-card__meta">
          <span class="contrib-badge">${escText(contribText)}</span>
        </div>
        <h3 class="proj-card__title">${escText(item.title)}</h3>
      </header>
      <p class="proj-card__desc">${escText(item.description)}</p>
      ${teamNoteHtml}
      ${techHtml}
      ${linksHtml}
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
