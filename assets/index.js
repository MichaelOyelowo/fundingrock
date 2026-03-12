/* =============== MOBILE & TABLET MENU BAR =============== */

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileLinks = document.querySelectorAll('.mobile-nav-menu a');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('is-open');
        mobileMenuContainer.classList.toggle('is-active');

        if (mobileMenuContainer.classList.contains('is-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('is-open');
            mobileMenuContainer.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });
})