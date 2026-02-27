document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('.work-grid');
  if (!grid) return;

  try {
    const res = await fetch('data/works.json');
    const { works } = await res.json();

    grid.innerHTML = works.map(work => `
      <a href="work-detail.html?id=${encodeURIComponent(work.id)}" class="work-card work-card-link">
        <div class="work-card-header">
          <span class="work-category">${escapeHtml(work.category)}</span>
          <h3>${escapeHtml(work.title)}</h3>
        </div>
        <p>${escapeHtml(work.summary)}</p>
      </a>
    `).join('');
  } catch (err) {
    console.error('Failed to load works:', err);
    grid.innerHTML = '<p class="work-error">Unable to load work items. Please try again later.</p>';
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
