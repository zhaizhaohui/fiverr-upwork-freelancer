(function() {
    // ----- Mobile menu drawer -----
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = menuToggle.querySelector('i');

    // 记录打开菜单前的滚动位置
    let scrollPosition = 0;

    function disableBodyScroll() {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }

    function enableBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        // 恢复到原来的滚动位置
        window.scrollTo(0, scrollPosition);
    }

    function toggleMenu(show) {
        if (show) {
            mobileMenu.classList.remove('hidden');
            menuOverlay.classList.remove('hidden');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
            disableBodyScroll(); // 禁止背景滚动，并保留位置
        } else {
            mobileMenu.classList.add('hidden');
            menuOverlay.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
            enableBodyScroll();  // 恢复背景滚动，并回到原位
        }
    }

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isExpanded);
    });

    menuOverlay.addEventListener('click', function() {
        toggleMenu(false);
    });

    // Close drawer when a link is clicked (optional)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu(false);
        });
    });

    // Auto-close on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md breakpoint
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu(false);
            }
        }
    });

    // ----- Dark mode toggle (desktop + mobile) -----
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    function getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // Initialize theme on load
    setTheme(getPreferredTheme());

    // Toggle handler
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    }

    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes (only if no manual preference stored)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
})();