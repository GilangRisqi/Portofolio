export function renderSkills(data) {
  const el = document.getElementById('skills');
  if (!el) return;

  const { skills } = data;
  const labels = data.ui.labels;
  const title = labels.sectionTitles.skills;
  const groups = labels.skillsGroups;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="skills__grid">
        ${renderGroup(groups.technical, skills.technical)}
        ${renderGroup(groups.operational, skills.operational)}
      </div>
    </div>
  `;
}

function renderGroup(groupTitle, items) {
  if (!items || items.length === 0) return '';
  return `
    <div class="skills__group">
      <h3 class="skills__group-title">${escText(groupTitle)}</h3>
      <ul class="skills__list" role="list">
        ${items.map((skill) => `<li class="skills__tag">${escText(skill)}</li>`).join('')}
      </ul>
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
