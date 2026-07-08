document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');
  const body = document.body;

  if (!hamburger || !mobileMenu || !closeBtn) {
    console.warn('Burger menu elements not found!');
    return;
  }

  function openMenu() { 
    mobileMenu.classList.add('is-open');
    body.classList.add('no-scroll');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);


  closeBtn.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
 
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
});
