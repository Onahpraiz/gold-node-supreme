// Smooth scroll with header offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const hdr = document.querySelector('header');
    const headerHeight = hdr ? hdr.offsetHeight : 0;
    const gapValue = getComputedStyle(document.documentElement).getPropertyValue('--header-gap');
    const headerGap = gapValue ? parseInt(gapValue, 10) : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - headerGap;

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });

    // Close mobile nav if it's open
    const mobileNav = document.querySelector('nav ul.show');
    if (mobileNav) mobileNav.classList.remove('show');
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');

function getHeaderHeight() {
  const hdr = document.querySelector('header');
  return hdr ? hdr.offsetHeight : 80;
}

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  const headerHeight = getHeaderHeight();
  const gapValue = getComputedStyle(document.documentElement).getPropertyValue('--header-gap');
  const headerGap = gapValue ? parseInt(gapValue, 10) : 0;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerHeight - headerGap;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector('nav a[href="#' + sectionId + '"]');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) navLink.classList.add('active');
    } else {
      if (navLink) navLink.classList.remove('active');
    }
  });
});

// Keep CSS var in sync with current header height
function updateHeaderCSSVar() {
  const hdr = document.querySelector('header');
  if (!hdr) return;
  document.documentElement.style.setProperty('--header-height', hdr.offsetHeight + 'px');
}

updateHeaderCSSVar();
window.addEventListener('resize', updateHeaderCSSVar);



// Mobile menu toggle
const header = document.querySelector("header");

header.addEventListener("click", () => {
  if (window.innerWidth <= 850) {
    header.classList.toggle("clicked");
    document.querySelector("nav ul").classList.toggle("show");
  }
});
