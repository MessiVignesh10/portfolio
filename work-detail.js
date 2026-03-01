document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const workId = urlParams.get('id');

    fetch('data/works.json')
        .then(response => response.json())
        .then(data => {
            const work = data.works.find(w => w.id === workId);
            if (work) {
                renderWorkDetail(work);
            }
        });
});

function renderWorkDetail(work) {
    const container = document.getElementById('work-detail-content');
    
    // Check if project uses the new Grid System or the old Result List
    const resultsHtml = work.grid_modules 
        ? `<div class="strategy-grid">
            ${work.grid_modules.map(item => `
                <div class="grid-card" onclick="this.classList.toggle('expanded')">
                    <img src="${item.image}" alt="${item.title}" class="grid-img">
                    <div class="grid-card-content">
                        <h3>${item.title}</h3>
                        <p class="grid-summary">${item.summary}</p>
                        <p class="grid-details">${item.details}</p>
                        <span class="click-more">Click to see details</span>
                    </div>
                </div>
            `).join('')}
          </div>`
        : `<ul class="results-list">${work.results.map(r => `<li>${r}</li>`).join('')}</ul>`;

    container.innerHTML = `
        <header class="work-header">
            <p class="category">${work.category}</p>
            <h1>${work.title}</h1>
            <p class="summary-text">${work.summary}</p>
        </header>
        
        <img src="${work.image}" alt="${work.title}" class="main-featured-image">

        <section class="details-section">
            <div class="description">
                <h2>Overview</h2>
                <p>${work.description}</p>
            </div>
            
            <div class="results-container">
                <h2>Growth Strategy & Execution</h2>
                ${resultsHtml}
            </div>
        </section>

        <section class="tools-section">
            <h3>Tools & Platforms</h3>
            <div class="tools-tags">
                ${work.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
            </div>
        </section>
    `;
}
