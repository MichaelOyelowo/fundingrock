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

/* =============== TESTIMONIALS =============== */

const modal = document.getElementById('videoModal');
const player = document.getElementById('youtubePlayer');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', () => {
        const playBtn = card.querySelector('.testimonial-play');
        let rawUrl = playBtn.getAttribute('data-yt');

        // Convert standard YouTube URL to Embed format
        // Example: watch?v=XYZ becomes /embed/XYZ
        if (rawUrl.includes('watch?v=')) {
            const videoId = rawUrl.split('v=')[1].split('&')[0];
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            
            player.src = embedUrl;
            modal.style.display = 'block';
        }
    });
});

// Close modal when clicking 'X' or outside the video
closeBtn.onclick = () => {
    modal.style.display = 'none';
    player.src = ""; // Stops the video
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        player.src = "";
    }
};

// Carousel logic
const carousel = document.querySelector('.testimonials-carousel');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.carousel-dots .dot');

function setActiveDot(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Update on scroll using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = [...cards].indexOf(entry.target);
            setActiveDot(index);
        }
    });
}, {
    root: carousel,
    threshold: 0.6
});

cards.forEach(card => observer.observe(card));

// Click a card → active dot updates
cards.forEach((card, index) => {
    card.addEventListener('click', () => setActiveDot(index));
});

// Click a dot → scroll to card + active dot updates
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        setActiveDot(index);
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
});