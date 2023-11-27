document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-nav]');

  navLinks.forEach(link => {
      link.addEventListener('click', event => {
          event.preventDefault();
          showView(event.target.dataset.nav);
      });
  });

  function showView(view) {
      const views = document.querySelectorAll('[data-view]');
      views.forEach(view => {
          view.style.display = 'none';
      });

      const activeView = document.querySelector(`[data-view="${view}"]`);
      if (activeView) {
          activeView.style.display = 'block';
      }
  }

  showView('home');
});
window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }