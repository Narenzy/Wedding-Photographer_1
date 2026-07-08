const scrollButtons = document.querySelectorAll('[data-scroll-to]');
const mobileMenu = document.querySelector('.mobile-menu');

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

scrollButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSelector = button.dataset.scrollTo;
    const targetSection = document.querySelector(targetSelector);

    if (!targetSection) return;

    closeMobileMenu();

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
