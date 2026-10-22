export function renderContact(data) {
  const el = document.getElementById('contact');
  if (!el) return;

  const { contact } = data;
  const labels = data.ui.labels;
  const title = labels.sectionTitles.contact;
  const contactLabels = labels.contact;

  const cvBtnHtml = contact.cv
    ? `<a
         href="${escAttr(contact.cv)}"
         class="btn btn--primary"
         target="_blank"
         rel="noopener noreferrer"
         download
       >
         ${escText(contactLabels.downloadCV)}
       </a>`
    : '';

  const emailBtnHtml = contact.email
    ? `<a
         href="mailto:${escAttr(contact.email)}"
         class="btn btn--outline"
       >
         ${escText(contactLabels.email)}
       </a>`
    : '';

  const linkedinBtnHtml = contact.linkedin
    ? `<a
         href="${escAttr(contact.linkedin)}"
         class="btn btn--outline"
         target="_blank"
         rel="noopener noreferrer"
       >
         ${escText(contactLabels.linkedin)}
       </a>`
    : '';

  const githubBtnHtml = contact.github
    ? `<a
         href="${escAttr(contact.github)}"
         class="btn btn--outline"
         target="_blank"
         rel="noopener noreferrer"
       >
         ${escText(contactLabels.github)}
       </a>`
    : '';

  const actionsHtml = [cvBtnHtml, emailBtnHtml, linkedinBtnHtml, githubBtnHtml]
    .filter(Boolean)
    .join('');

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="contact__card">
        <p class="contact__intro">${escText(contactLabels.intro)}</p>
        <div class="contact__actions">
          ${actionsHtml}
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

function escAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
