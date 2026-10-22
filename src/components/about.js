export function renderAbout(data) {
  const el = document.getElementById('about');
  if (!el) return;

  const { profile } = data;
  const title = data.ui.labels.sectionTitles.about;

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="about__body">
        <p class="about__text">${escText(profile.summary)}</p>
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
