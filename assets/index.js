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
    './assets/images/brands/financewire.png' // Add a 6th one here!
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

setInterval(flipBrands, 5000); // Flip every 5 seconds


    // let waitingLogos = [
    //     './assets/images/brands/fm.png',
    //     './assets/images/brands/forbes.png',
    //     './assets/images/brands/fxempire.png',
    //     './assets/images/brands/forbes.png',
    //     './assets/images/brands/marketsinsiders.png',
    //     './assets/images/brands/yahoo.png'
    // ];

    // const boxes = document.querySelectorAll('.brand-box');

    // function flipRandomLogo() {
    //     if (waitingLogos.length === 0 || boxes.length === 0) return;

    //     // 2. Pick a random box on the screen
    //     const randomBoxIndex = Math.floor(Math.random() * boxes.length);
    //     const box = boxes[randomBoxIndex];
    //     const inner = box.querySelector('.flip-inner');

    //     // Find which side is currently facing the user
    //     const isFlipped = inner.classList.contains('flipped');
    //     const visibleImg = isFlipped ? box.querySelector('.flip-back img') : box.querySelector('.flip-front img');
    //     const hiddenImg = isFlipped ? box.querySelector('.flip-front img') : box.querySelector('.flip-back img');

    //     const readyLogoSrc = hiddenImg.getAttribute('data-src');
    //     hiddenImg.setAttribute('src', readyLogoSrc);
    //     const currentVisibleSrc = visibleImg.getAttribute('src');
    //     const randomBenchIndex = Math.floor(Math.random() * waitingLogos.length);
    //     const nextLogoForLater = waitingLogos[randomBenchIndex];

    //     waitingLogos[randomBenchIndex] = currentVisibleSrc;
    //     visibleImg.setAttribute('data-src', nextLogoForLater);

    //     inner.classList.toggle('flipped');
    // }
    // setInterval(flipRandomLogo, 3000);