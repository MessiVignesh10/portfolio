document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const workId = params.get('id');

  if (!workId) {
    window.location.href = 'work.html';
    return;
  }

  try {
    const res = await fetch('data/works.json');
    const { works } = await res.json();
    const work = works.find(w => w.id === workId);

    if (!work) {
      window.location.href = 'work.html';
      return;
    }

    document.title = `${work.title} | Vicky - Ecommerce Specialist`;

    const content = document.getElementById('work-detail-content');
    const heroStyle = work.image
      ? `style="background-image: url('${escapeHtml(work.image)}')"`
      : '';
    content.innerHTML = `
      <div class="work-detail-hero" ${heroStyle}>
        <div class="work-detail-hero-overlay"></div>
        <div class="work-detail-hero-content">
          <span class="work-category">${escapeHtml(work.category)}</span>
          <h1>${escapeHtml(work.title)}</h1>
          <div class="work-detail-meta">
            <span>${escapeHtml(work.duration)}</span>
            <span class="meta-sep">•</span>
            <span>${escapeHtml(work.platform)}</span>
          </div>
        </div>
      </div>
      <div class="work-detail-body-wrapper">
      <div class="work-detail-body">
        <p class="work-detail-summary">${escapeHtml(work.summary)}</p>
        <p class="work-detail-description">${escapeHtml(work.description)}</p>
        <h3>Key Results</h3>
        <ul class="work-detail-results">
          ${work.results.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
        </ul>
        ${work.tools && work.tools.length > 0 ? `
        <h3>Tools Used</h3>
        <ul class="work-detail-tools">
          ${work.tools.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
        ` : ''}
      </div>
      <div class="work-detail-cta">
        <a href="contact.html" class="btn btn-primary">Get in touch</a>
      </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    window.location.href = 'work.html';
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle?.addEventListener('click', () => nav.classList.toggle('nav-open'));
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
