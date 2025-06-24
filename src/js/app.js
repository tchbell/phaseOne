import '../scss/styles.scss';

function navToggle() {
  const nav = document.getElementById('main-menu');
  const navToggleElements = document.getElementsByClassName('nav-toggle');
  const openButton = document.querySelector('.header__hamburger');

  Array.from(navToggleElements).forEach(element => {
    element.addEventListener('click', () => {
      const isActive = nav.classList.toggle('nav--active');

      // ARIA toggle
      openButton.setAttribute('aria-expanded', isActive ? 'true' : 'false');

      // Show/hide nav with hidden attribute
      if (isActive) {
        nav.removeAttribute('hidden');
        nav.querySelector('a, button').focus(); // move focus to first focusable item
      } else {
        nav.setAttribute('hidden', '');
        openButton.focus(); // return focus to hamburger
      }
    });
  });

  // ESC key support
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('nav--active')) {
      nav.classList.remove('nav--active');
      nav.setAttribute('hidden', '');
      openButton.setAttribute('aria-expanded', 'false');
      openButton.focus();
    }
  });
}

navToggle();
