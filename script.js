const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const header = document.querySelector('.top-nav');
const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.top-links');
const navLinks = document.querySelectorAll('.top-links a[href^="#"]');
const sections = [...document.querySelectorAll('section[id]')];

function closeMobileMenu() {
  if (!menu || !toggle) return;
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '×' : '☰';
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    }
  });
});

function updateNavbarState() {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  let currentId = 'hero';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 130 && rect.bottom >= 130) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', updateNavbarState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 1050) closeMobileMenu();
});
updateNavbarState();
