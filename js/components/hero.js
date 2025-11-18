const SLIDESHOW_CONFIG = {
    slides: [
        {
            image: './assets/img/hero-section.jpg',
            alt: 'hero'
        },
        {
            image: './assets/img/hero-section-1.jpg',
            alt: 'hero-1'
        },
        {
            image: './assets/img/hero-section-2.jpg',
            alt: 'hero-2'
        },
        {
            image: './assets/img/hero-section-3.jpg',
            alt: 'hero-3'
        },
        {
            image: './assets/img/hero-section-4.jpg',
            alt: 'hero-4'
        },
        {
            image: './assets/img/hero-section-5.jpg',
            alt: 'hero-5'
        },
        {
            image: './assets/img/hero-section-6.jpg',
            alt: 'hero-6'
        },
    ],
    settings: {
        autoPlay: true,
        slideDuration: 5000,
        transitionDuration: 1500,
        pauseOnHover: true
    }
};

export function initHero() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    setupSlideshow();
}

function setupSlideshow() {
    const slideshow = document.querySelector('[data-slideshow]');
    const dotsContainer = document.querySelector('[data-dots]');

    if (!slideshow || !dotsContainer) return;

    generateSlides(slideshow);
    generateDots(dotsContainer);

    const slides = document.querySelectorAll('.background-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('[data-prev]');
    const nextBtn = document.querySelector('[data-next]');
    const navContainer = document.querySelector('[data-slideshow-nav]');

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active', 'paused');
            dot.style.setProperty('--slide-duration', `${SLIDESHOW_CONFIG.settings.slideDuration}ms`);
        });

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        const activeDot = dots[currentSlide];
        activeDot.style.animation = 'none';
        activeDot.offsetHeight;
        activeDot.style.animation = null;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        if (!SLIDESHOW_CONFIG.settings.autoPlay || isPaused) return;

        stopSlideShow();
        slideInterval = setInterval(nextSlide, SLIDESHOW_CONFIG.settings.slideDuration);

        dots.forEach(dot => dot.classList.remove('paused'));
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }

        dots.forEach(dot => dot.classList.add('paused'));
    }

    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            stopSlideShow();
        } else {
            startSlideShow();
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));

            if (slideIndex === currentSlide) {
                return;
            }

            stopSlideShow();
            showSlide(slideIndex);
            startSlideShow();
        });
    });

    if (SLIDESHOW_CONFIG.settings.pauseOnHover && navContainer) {
        navContainer.addEventListener('mouseenter', () => {
            if (SLIDESHOW_CONFIG.settings.autoPlay) {
                stopSlideShow();
            }
        });

        navContainer.addEventListener('mouseleave', () => {
            if (SLIDESHOW_CONFIG.settings.autoPlay && !isPaused) {
                startSlideShow();
            }
        });
    }

    showSlide(0);
    startSlideShow();
}

function generateSlides(slideshow) {
    slideshow.innerHTML = '';

    SLIDESHOW_CONFIG.slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `background-slide ${index === 0 ? 'active' : ''}`;
        slideElement.setAttribute('data-slide', index);
        slideElement.style.backgroundImage = `url('${slide.image}')`;
        slideElement.setAttribute('aria-label', slide.alt);

        slideElement.setAttribute('loading', 'lazy');

        slideshow.appendChild(slideElement);
    });
}

function generateDots(dotsContainer) {
    dotsContainer.innerHTML = '';

    SLIDESHOW_CONFIG.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('title', `Slide ${index + 1}`);

        dot.style.setProperty('--slide-duration', `${SLIDESHOW_CONFIG.settings.slideDuration}ms`);

        dotsContainer.appendChild(dot);
    });
}