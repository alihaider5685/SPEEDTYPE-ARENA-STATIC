/* ============================================================
   SpeedType Arena — common.js
   Shared theme toggle + mobile nav for all pages
   ============================================================ */
(function () {
  'use strict';

  // ---- Theme -------------------------------------------------------
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = theme === 'dark' ? '\u2600' : '\u263D';
    localStorage.setItem('sta_theme', theme);
  }

  function loadTheme() {
    const saved = localStorage.getItem('sta_theme') || 'dark';
    applyTheme(saved);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadTheme();

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // ---- Mobile nav hamburger ----------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function () {
        const open = navMenu.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', open);
        hamburger.textContent = open ? '\u2715' : '\u2630';
      });
      // Close on nav link click
      navMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navMenu.classList.remove('nav-open');
          hamburger.textContent = '\u2630';
        });
      });
    }

    // ---- Set active nav link based on current page -------------------
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  });
})();
