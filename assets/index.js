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


/* =============== Why Choose carousel dots (mobile only) =============== */

const featuresCarousel = document.getElementById('featuresCarousel');
const featureCards = document.querySelectorAll('.feature');
const featureDots = document.querySelectorAll('.features-dot');

function setFeatureDot(index) {
    featureDots.forEach(dot => {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
    });
    featureDots[index].classList.add('active');
    featureDots[index].setAttribute('aria-selected', 'true');
}

// update dot on scroll
featuresCarousel.addEventListener('scroll', () => {
    const index = Math.round(featuresCarousel.scrollLeft / featuresCarousel.offsetWidth);
    setFeatureDot(index);
});

// dot click scrolls to that feature
featureDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        featuresCarousel.scrollTo({ left: index * featuresCarousel.offsetWidth, behavior: 'smooth' });
    });
});


/* =============== TESTIMONIALS + ACADEMY YOUTUBE MODAL =============== */
const modal = document.getElementById('videoModal');
const player = document.getElementById('youtubePlayer');
const closeBtn = document.querySelector('.close-modal');

function openModal(rawUrl) {
    if (rawUrl.includes('watch?v=')) {
        const videoId = rawUrl.split('v=')[1].split('&')[0];
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else {
        // handles short URLs like youtu.be/XYZ
        const videoId = rawUrl.split('/').pop().split('?')[0];
        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    player.src = '';
}

// Testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('click', () => {
        const rawUrl = card.querySelector('.testimonial-play').getAttribute('data-yt');
        openModal(rawUrl);
    });
});

// Academy cards
document.querySelectorAll('.academy-card-play').forEach(btn => {
    btn.addEventListener('click', () => {
        const rawUrl = btn.getAttribute('data-yt');
        openModal(rawUrl);
    });
});

// Close modal
closeBtn.onclick = closeModal;
window.onclick = (event) => {
    if (event.target == modal) closeModal();
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

/* =============== ACCOUNT SELECTION =============== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Master Account Selection Logic ---
    const tabs = Array.from(document.querySelectorAll('.account-btn'));
    const tabPanels = document.querySelectorAll('.comparison-table');
    const btnPrev = document.querySelector('.slider-arrow.backward');
    const btnNext = document.querySelector('.slider-arrow.forward');

    function updateArrowStates(index) {
        // Disable Left Arrow if at the start (index 0)
        if (index === 0) {
            btnPrev.classList.add('disabled');
        } else {
            btnPrev.classList.remove('disabled');
        }

        // Disable Right Arrow if at the end (last index)
        if (index === tabs.length - 1) {
            btnNext.classList.add('disabled');
        } else {
            btnNext.classList.remove('disabled');
        }
    }

    function activateAccountTab(index) {
        // Reset all buttons & panels
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('hidden', 'true');
        });

        // Activate selected
        tabs[index].classList.add('active');
        tabs[index].setAttribute('aria-selected', 'true');
        
        const panelId = tabs[index].getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
        }

        // Update Arrow Visuals
        updateArrowStates(index);
    }

    // Attach click events to desktop buttons
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateAccountTab(index));
    });

    // --- 2. Mobile Arrow Carousel Logic (NO LOOPING) ---
    btnPrev.addEventListener('click', () => {
        let activeIndex = tabs.findIndex(t => t.classList.contains('active'));
        // Only move backward if we are NOT at the beginning
        if (activeIndex > 0) {
            activateAccountTab(activeIndex - 1);
        }
    });

    btnNext.addEventListener('click', () => {
        let activeIndex = tabs.findIndex(t => t.classList.contains('active'));
        // Only move forward if we are NOT at the end
        if (activeIndex < tabs.length - 1) {
            activateAccountTab(activeIndex + 1);
        }
    });

    // Run once on load to set the initial arrow disabled states properly
    let initialIndex = tabs.findIndex(t => t.classList.contains('active'));
    updateArrowStates(initialIndex >= 0 ? initialIndex : 0);

    // --- 3. Mobile Table Tabs (Phase 1, Phase 2, Funded) ---
    const tables = document.querySelectorAll('.comparison-table table');
    
    tables.forEach(table => {
        // AUTO-FIX: Force every table to show column 1 (Phase 1) on load
        // This solves the "missing content" issue automatically!
        table.setAttribute('data-active-col', '1');
        const firstTab = table.querySelector('thead th:nth-child(2)');
        if (firstTab) firstTab.classList.add('active-tab');

        // Grab all headers EXCEPT the first one (which contains the FEE badge)
        const headers = table.querySelectorAll('thead th:not(:first-child)');

        headers.forEach((th, index) => {
            th.addEventListener('click', () => {
                // Remove active class from all headers in this table
                headers.forEach(h => h.classList.remove('active-tab'));
                // Add active class to the clicked header
                th.classList.add('active-tab');
                
                // Update the table's data attribute (1-based index)
                // This triggers the CSS rules to show the matching column!
                table.setAttribute('data-active-col', index + 1);
            });
        });
    });
});


/* =============== PAYOUT CERTIFICATES =============== */
const certCarousel = document.querySelector('.certificate-container');
const certCards = document.querySelectorAll('.certificate');
const certDots = document.querySelectorAll('.payout-certificates .dot');

function setCertDot(index) {
    certDots.forEach(dot => dot.classList.remove('active'));
    if (certDots[index]) certDots[index].classList.add('active');
}

certCarousel.addEventListener('scroll', () => {
    const cardWidth = certCards[0].offsetWidth + 16;
    const index = Math.round(certCarousel.scrollLeft / cardWidth);
    setCertDot(index);
});

certDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const cardWidth = certCards[0].offsetWidth + 16;
        certCarousel.scrollTo({ 
            left: index * cardWidth, 
            behavior: 'smooth' 
        });
    });
});


/* =============== ACADEMY CAROUSEL =============== */
const academyCarousel = document.querySelector('.academy-cards');
const academyCards = document.querySelectorAll('.academy-card');
const academyDots = document.querySelectorAll('.academy-top3 .dot');

function setAcademyDot(index) {
    academyDots.forEach(dot => {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
    });
    if (academyDots[index]) {
        academyDots[index].classList.add('active');
        academyDots[index].setAttribute('aria-selected', 'true');
    }
}

academyCarousel.addEventListener('scroll', () => {
    const cardWidth = academyCards[0].offsetWidth + 12;
    const index = Math.round(academyCarousel.scrollLeft / cardWidth);
    setAcademyDot(index);
});

academyDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const cardWidth = academyCards[0].offsetWidth + 12;
        academyCarousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    });
});


/* =============== FAQ =============== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // close all items first
        faqItems.forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-answer').setAttribute('hidden', '');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // if it wasn't open, open it
        if (!isOpen) {
            item.classList.add('open');
            answer.removeAttribute('hidden');
            question.setAttribute('aria-expanded', 'true');
        }
    })

})


/* ================= NEWSLETTER FORM FULL SCRIPT ================= */

// (function() {
//     emailjs.init("WbgluvkOwLwWUVfx8"); 
// })();

// document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const emailInput = document.getElementById('newsletter-email');
//     const emailValue = emailInput.value.trim();
//     const status = document.getElementById('newsletter-status');
//     const btn = document.querySelector('.newsletter-btn');

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(emailValue)) {
//         status.textContent = 'Please enter a valid email address.';
//         status.style.color = '#ff4444';
//         emailInput.focus();
//         return;
//     }

//     btn.disabled = true;
//     const originalBtnText = btn.textContent;
//     btn.textContent = 'Subscribing...';
//     status.textContent = '';

//     try {
//         await emailjs.send('service_1jjcazf', 'template_29ufjip', {
//             email: emailValue,
//             signup_date: new Date().toLocaleString()
//         });

//         status.textContent = '✓ Successfully subscribed!';
//         status.style.color = '#D9FF00';
//         emailInput.value = '';

//     } catch (error) {
//         console.error('EmailJS Error:', error);
//         status.textContent = 'Something went wrong. Please try again.';
//         status.style.color = '#ff4444';

//     } finally {
//         btn.disabled = false;
//         btn.textContent = originalBtnText;
//     }
// });

/* =============== NEWSLETTER FORM =============== */
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    const status = document.getElementById('newsletter-status');
    const btn = document.querySelector('.newsletter-btn');

    // Basic validation
    if (!email || !email.includes('@')) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = '#ff4444';
        return;
    }

    // Disable button while submitting
    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    status.textContent = '';

    try {
        // Option 1 - EmailJS (no backend needed)
        await emailjs.send('service_1jjcazf', 'template_29ufjip', {
            email: email
        }, 'WbgluvkOwLwWUVfx8');

        status.textContent = '✓ Successfully subscribed!';
        status.style.color = '#D9FF00';
        document.getElementById('newsletter-email').value = '';

    } catch (error) {
        status.textContent = 'Something went wrong. Please try again.';
        status.style.color = '#ff4444';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Subscribe';
    }
});