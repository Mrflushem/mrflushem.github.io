/* ===========================================================
   Portfolio interactions
   - Mobile nav toggle
   - Reveal sections on scroll
   - Hide nav on scroll-down, show on scroll-up
   - Add shadow to nav after scrolling
   =========================================================== */

(function () {
    'use strict';

    /* ---------- Mobile nav toggle ---------- */
    const toggleBtn = document.querySelector('.nav__toggle');
    const menu      = document.querySelector('.nav__menu');

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            toggleBtn.setAttribute('aria-expanded', String(open));
            document.body.style.overflow = open ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        reveals.forEach((el) => io.observe(el));
    } else {
        // Fallback: just show everything
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------- Nav hide/show on scroll ---------- */
    const nav = document.querySelector('.nav');
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;

        // Shadow when not at top
        nav.classList.toggle('is-scrolled', y > 50);

        // Hide on scroll down (past 100px), show on scroll up
        if (y > 100 && y > lastY) {
            nav.classList.add('is-hidden');
        } else {
            nav.classList.remove('is-hidden');
        }
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

})();
