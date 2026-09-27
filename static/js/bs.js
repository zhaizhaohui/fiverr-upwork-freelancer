(function () {
    'use strict';

    const headerEl = document.querySelector('header');
    const rootEl = document.documentElement;

    function syncHeaderHeight() {
    if (!headerEl) return;
    const h = headerEl.offsetHeight;
    rootEl.style.setProperty('--sh-header-height', h + 'px');
    }
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
    window.addEventListener('orientationchange', syncHeaderHeight);

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = menuToggle.querySelector('i');

    function lockScroll() {
    rootEl.classList.add('sh-menu-open');
    document.body.classList.add('sh-menu-open');
    }

    function unlockScroll() {
    rootEl.classList.remove('sh-menu-open');
    document.body.classList.remove('sh-menu-open');
    }

    function openMenu() {
    syncHeaderHeight(); // ensure correct top offset
    mobileMenu.classList.remove('d-none');
    menuOverlay.classList.remove('d-none');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
    lockScroll();
    }

    function closeMenu() {
    mobileMenu.classList.add('d-none');
    menuOverlay.classList.add('d-none');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    unlockScroll();
    }

    function toggleMenu() {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
    }

    menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
    });

    menuOverlay.addEventListener('click', function () {
    closeMenu();
    });

    // Close drawer when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        closeMenu();
    });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
    }
    });

    // Auto-close drawer when resizing to desktop
    window.addEventListener('resize', function () {
    if (window.innerWidth >= 992 && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
    }
    });

    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;

    function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
    htmlElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    }

    // Initialize theme on load
    setTheme(getPreferredTheme());

    function toggleTheme() {
    const current = htmlElement.getAttribute('data-bs-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
    }

    if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes (only if no manual preference stored)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
    });

})();