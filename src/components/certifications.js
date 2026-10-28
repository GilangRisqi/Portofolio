import { getCurrentLang } from '../i18n.js';

let activeLightbox = null;
let lastFocusedElement = null;
let keydownListener = null;

function escText(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMonthYear(dateStr, lang) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 2) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (isNaN(year) || isNaN(month)) return dateStr;

  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
    month: 'long',
    year: 'numeric'
  });
}

export function renderCertifications(data) {
  const el = document.getElementById('certifications');
  if (!el) return;

  const certs = data.certifications || [];
  const labels = data.ui.labels;
  const title = labels.sectionTitles.certifications || 'Sertifikasi';
  const certLabels = labels.certifications || {};
  const currentLang = getCurrentLang() || 'id';

  // Filter: sertifikat harus memiliki setidaknya thumbnail atau pdf
  const validCerts = certs.filter((item) => {
    const hasThumb = Boolean(item.image);
    const hasPdf = Boolean(item.pdf);
    if (!hasThumb && !hasPdf) {
      console.warn(`[Certifications] Item "${item.name}" diabaikan karena tidak memiliki thumbnail maupun PDF.`);
      return false;
    }
    return true;
  });

  const cardsHtml = validCerts
    .map((item) => renderCertCard(item, certLabels, currentLang))
    .join('');

  el.innerHTML = `
    <div class="container">
      <h2 class="section-title">${escText(title)}</h2>
      <div class="cert-grid">
        ${cardsHtml}
      </div>
    </div>
  `;

  attachLightboxEvents(certLabels);
}

function renderCertCard(item, labels, lang) {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const issueDateFormatted = formatMonthYear(item.issueDate, lang);
  const expiryDateFormatted = item.expiryDate ? formatMonthYear(item.expiryDate, lang) : '';

  // Thumbnail (jika ada)
  let thumbHtml = '';
  if (item.image) {
    const thumbUrl = `${baseUrl}certificates/thumbs/${item.image}`;
    const altText = item.imageAlt || item.name;
    const previewLabel = labels.preview || 'Perbesar sertifikat';

    thumbHtml = `
      <div class="cert-card__media">
        <button
          type="button"
          class="cert-card__thumb-btn"
          data-lightbox-src="${escAttr(thumbUrl)}"
          data-lightbox-alt="${escAttr(altText)}"
          data-lightbox-title="${escAttr(item.name)}"
          aria-label="${escAttr(previewLabel)}: ${escAttr(item.name)}"
        >
          <img
            src="${escAttr(thumbUrl)}"
            alt="${escAttr(altText)}"
            class="cert-card__img"
            loading="lazy"
            decoding="async"
            width="1120"
            height="790"
          />
          <span class="cert-card__thumb-overlay" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </span>
        </button>
      </div>
    `;
  }

  // Tanggal terbit & masa berlaku
  const dateMetaHtml = issueDateFormatted
    ? `<div class="cert-card__date">
        <span class="cert-card__date-label">${escText(labels.issued || 'Diterbitkan')}:</span>
        <time datetime="${escAttr(item.issueDate)}">${escText(issueDateFormatted)}</time>
        ${expiryDateFormatted
      ? `<span class="cert-card__date-sep">·</span>
               <span class="cert-card__date-label">${escText(labels.validUntil || 'Berlaku sampai')}:</span>
               <time datetime="${escAttr(item.expiryDate)}">${escText(expiryDateFormatted)}</time>`
      : ''
    }
      </div>`
    : '';

  // Credential ID (jika ada)
  const credentialHtml = item.credentialId
    ? `<div class="cert-card__credential">
        <span class="cert-card__meta-label">${escText(labels.credentialId || 'ID Kredensial')}:</span>
        <code class="cert-card__credential-code">${escText(item.credentialId)}</code>
      </div>`
    : '';

  // Tombol aksi: Verifikasi & Buka PDF
  const verifyLink = item.verifyUrl
    ? `<a
        href="${escAttr(item.verifyUrl)}"
        class="btn btn--outline cert-card__btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        ${escText(labels.verify || 'Verifikasi')}
      </a>`
    : '';

  const pdfLink = item.pdf
    ? `<a
        href="${escAttr(`${baseUrl}certificates/pdf/${item.pdf}`)}"
        class="btn btn--ghost cert-card__btn"
        target="_blank"
        rel="noopener"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        ${escText(labels.openPdf || 'Buka PDF')}
      </a>`
    : '';

  const actionsHtml = (verifyLink || pdfLink)
    ? `<div class="cert-card__actions">${verifyLink}${pdfLink}</div>`
    : '';

  return `
    <article class="cert-card" id="${escAttr(item.id)}">
      ${thumbHtml}
      <div class="cert-card__content">
        <header class="cert-card__header">
          <span class="cert-card__issuer">${escText(item.issuer)}</span>
          <h3 class="cert-card__title">${escText(item.name)}</h3>
        </header>
        ${dateMetaHtml}
        ${credentialHtml}
        ${actionsHtml}
      </div>
    </article>
  `;
}

function attachLightboxEvents(labels) {
  let modal = document.getElementById('cert-lightbox');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cert-lightbox';
    modal.className = 'cert-lightbox';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.hidden = true;

    modal.innerHTML = `
      <div class="cert-lightbox__backdrop" data-lightbox-close></div>
      <div class="cert-lightbox__dialog">
        <figure class="cert-lightbox__figure">
          <img src="" alt="" class="cert-lightbox__img" />
          <figcaption class="cert-lightbox__caption"></figcaption>
        </figure>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-lightbox-close')) {
        closeLightbox();
      }
    });
  }

  // Update close button aria-label in case language changed
  const closeBtn = modal.querySelector('.cert-lightbox__close');
  if (closeBtn) {
    closeBtn.setAttribute('aria-label', labels.close || 'Tutup');
  }

  // Event listener untuk tombol thumbnail
  const thumbBtns = document.querySelectorAll('.cert-card__thumb-btn');
  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-lightbox-src');
      const alt = btn.getAttribute('data-lightbox-alt');
      const title = btn.getAttribute('data-lightbox-title');
      openLightbox(src, alt, title, btn);
    });
  });
}

function openLightbox(src, alt, title, triggerBtn) {
  const modal = document.getElementById('cert-lightbox');
  if (!modal) return;

  lastFocusedElement = triggerBtn;
  activeLightbox = modal;

  const img = modal.querySelector('.cert-lightbox__img');
  const caption = modal.querySelector('.cert-lightbox__caption');
  const closeBtn = modal.querySelector('.cert-lightbox__close');

  if (img) {
    img.src = src;
    img.alt = alt;
  }
  if (caption) {
    caption.textContent = title;
  }

  modal.setAttribute('aria-label', title || 'Pratinjau Sertifikat');
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');

  // Focus trap
  if (keydownListener) {
    document.removeEventListener('keydown', keydownListener);
  }

  keydownListener = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener('keydown', keydownListener);

  // Set initial focus to close button
  requestAnimationFrame(() => {
    if (closeBtn) closeBtn.focus();
  });
}

function closeLightbox() {
  const modal = activeLightbox || document.getElementById('cert-lightbox');
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  if (keydownListener) {
    document.removeEventListener('keydown', keydownListener);
    keydownListener = null;
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }

  activeLightbox = null;
  lastFocusedElement = null;
}
