document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.sidebar nav a'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const map = new Map();
  sections.forEach(sec => {
    const id = '#' + sec.id;
    const link = navLinks.find(a => a.getAttribute('href') === id);
    if (link) map.set(sec, link);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = map.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  map.forEach((_, sec) => observer.observe(sec));
});

