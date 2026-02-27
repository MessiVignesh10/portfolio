// Carousel & data loading
document.addEventListener('DOMContentLoaded', async () => {
  const carousel = document.querySelector('.carousel');
  const track = carousel?.querySelector('.carousel-track');

  // Load carousel from carousel.json
  if (carousel && track) {
    try {
      const res = await fetch('data/carousel.json');
      const { items } = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        track.innerHTML = items.map(item => {
          const content = `
            <span class="slide-category">${escapeHtml(item.category)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
          `;
          const slideContent = item.link
            ? `<a href="${escapeHtml(item.link)}" class="slide-content slide-content--link">${content}</a>`
            : `<div class="slide-content">${content}</div>`;
          return `<article class="carousel-slide">${slideContent}</article>`;
        }).join('');
      }
    } catch (err) {
      console.error('Failed to load carousel:', err);
    }
  }

  // Load brand logos
  const brandsContainer = document.getElementById('brands-logos');
  if (brandsContainer) {
    try {
      const res = await fetch('data/brands.json');
      const { brands } = await res.json();
      if (Array.isArray(brands) && brands.length > 0) {
        brandsContainer.innerHTML = brands.map(brand => `
          <div class="brand-logo" title="${escapeHtml(brand.name)}">
            <img src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)}" loading="lazy" onerror="this.style.display='none'">
          </div>
        `).join('');
      }
    } catch (err) {
      console.error('Failed to load brands:', err);
    }
  }

  // Mobile nav toggle (runs on all pages)
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle?.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
  });

  // Contact form (runs on contact page)
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for your message! I\'ll get back to you soon.');
    contactForm.reset();
  });

  if (!carousel) return;

  const wrapper = document.querySelector('.carousel-wrapper');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = wrapper?.querySelector('.carousel-btn--prev');
  const nextBtn = wrapper?.querySelector('.carousel-btn--next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  let currentIndex = 0;
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    updateCarousel();
  }

  function next() {
    goToSlide(currentIndex + 1);
  }

  function prev() {
    goToSlide(currentIndex - 1);
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Auto-advance (optional)
  let autoplay = setInterval(next, 5000);
  wrapper?.addEventListener('mouseenter', () => clearInterval(autoplay));
  wrapper?.addEventListener('mouseleave', () => {
    autoplay = setInterval(next, 5000);
  });
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
