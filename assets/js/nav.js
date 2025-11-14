document.addEventListener('DOMContentLoaded', async () => {
  const mount = document.getElementById('site-nav');
  if (!mount) return;
  try {
    const resp = await fetch('partials/nav.html', { cache: 'no-store' });
    if (!resp.ok) throw new Error('Failed to load nav');
    mount.innerHTML = await resp.text();

    // Mark active link
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const links = mount.querySelectorAll('a.nav-link');
    links.forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      // Consider index and index# anchors equivalent on the home page
      const hrefPath = href.split('#')[0] || 'index.html';
      if (hrefPath === path || (path === 'index.html' && hrefPath === 'index.html')) {
        a.classList.add('active');
      }
    });
  } catch (e) {
    // Fail silently to avoid breaking the page
    // console.error(e);
  }
});

