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
});

/* =============== BRAND STRIP =============== */
const groupA = [
    './assets/images/brands/bloomberg.png',
    './assets/images/brands/fm.png',
    './assets/images/brands/investment.png',
    './assets/images/brands/forbes.png',
    './assets/images/brands/fxempire.png',
    './assets/images/brands/yahoo.png'
];

const groupB = [
    './assets/images/brands/marketsinsiders.png',
    './assets/images/brands/benzinga.png',
    './assets/images/brands/fintechreview.png',
    './assets/images/brands/adven.png',
    './assets/images/brands/financialtechtime.png',
    './assets/images/brands/financewire.png'
];

function flipBrands() {
    const boxes = document.querySelectorAll('.brand-box');

    boxes.forEach((box, index) => {
        setTimeout(() => {
            const inner = box.querySelector('.flip-inner');
            const isFlipped = inner.classList.contains('flipped');
            
            // If we are about to flip to the BACK, load Group B
            // If we are about to flip to the FRONT, load Group A
            const nextImgSrc = isFlipped ? groupA[index] : groupB[index];

            if (isFlipped) {
                box.querySelector('.flip-front img').src = nextImgSrc;
            } else {
                box.querySelector('.flip-back img').src = nextImgSrc;
            }

            inner.classList.toggle('flipped');
        }, index * 150); // Snappy wave effect
    });
}

setInterval(flipBrands, 5000);
