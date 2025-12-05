import { CircularDots } from '../utilities/circular-dots.js?v=1.0.6';

class Hero {
    constructor() {
        if (Hero.instance) {
            return Hero.instance;
        }
        Hero.instance = this;

        this.config = {
            slides: [
                {
                    image: './assets/img/hero-section.jpg',
                    title: 'Design & Plan',
                    subtitle: 'Strategic solutions for your security and auxiliary needs'
                },
                {
                    image: './assets/img/hero-section-1.jpg',
                    title: 'Reliable Supply',
                    subtitle: 'High-quality products from trusted sources'
                },
                {
                    image: './assets/img/hero-section-2.jpg',
                    title: 'Install & Integrate',
                    subtitle: 'Professional implementation with seamless integration'
                },
                {
                    image: './assets/img/hero-section-3.jpg',
                    title: 'Maintain & Support',
                    subtitle: 'Proactive care and dedicated technical assistance'
                }
            ],
            settings: { autoPlay: true, slideDuration: 5000, transitionDuration: 800 }
        };

        this.state = { currentSlide: 0, isInViewport: true, observer: null, autoPlaying: false };
        this.slideshow = document.querySelector('.slides-track');
        this.heroTitle = document.getElementById('heroTitle');
        this.heroSubtitle = document.getElementById('heroSubtitle');
        this.heroDots = null;

        this.init();
    }

    init() {
        this.generateSlides();
        this.initDots();
        this.updateText(0);
        this.observeViewport();
        this.startAutoPlay();
    }

    generateSlides() {
        this.slideshow.innerHTML = '';
        this.slides = [];
        this.config.slides.forEach(slide => {
            const img = document.createElement('img');
            img.src = slide.image;
            img.alt = slide.title;
            img.className = 'background-slide';
            this.slideshow.appendChild(img);
            this.slides.push(slide);
        });
    }

    initDots() {
        const container = document.getElementById('heroDots');
        this.heroDots = new CircularDots(container, {
            count: this.slides.length,
            duration: this.config.settings.slideDuration,
            activeIndex: 0,
            onDotClick: index => this.showSlide(index),
            onProgressComplete: () => this.nextSlide()
        });
    }

    showSlide(index) {
        this.state.currentSlide = index;
        const offset = -100 * index;
        this.slideshow.style.transform = `translateX(${offset}%)`;
        this.slideshow.setAttribute('aria-live', 'polite');
        this.slideshow.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}: ${this.slides[index].title}`);
        this.heroDots.setActiveDot(index);
        this.updateText(index);
    }

    updateText(index) {
        const slide = this.slides[index];
        if (!slide) return;

        this.heroTitle.classList.remove('animate-title');
        this.heroSubtitle.classList.remove('animate-subtitle');

        void this.heroTitle.offsetWidth;
        void this.heroSubtitle.offsetWidth;

        this.heroTitle.textContent = slide.title;
        this.heroSubtitle.textContent = slide.subtitle;

        this.heroTitle.classList.add('animate-title');
        this.heroSubtitle.classList.add('animate-subtitle');
    }

    nextSlide() {
        const nextIndex = (this.state.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    startAutoPlay() {
        if (!this.config.settings.autoPlay || this.state.autoPlaying) return;
        this.state.autoPlaying = true;
        this.heroDots.restartAnimation();
    }

    stopAutoPlay() {
        this.state.autoPlaying = false;
        if (this.heroDots) this.heroDots.stopAnimation();
    }

    observeViewport() {
        if (!('IntersectionObserver' in window)) return;
        this.state.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                this.state.isInViewport = entry.isIntersecting;
                if (entry.isIntersecting) this.startAutoPlay();
                else this.stopAutoPlay();
            });
        }, { threshold: 0.3 });
        this.state.observer.observe(document.querySelector('.hero'));
    }
}

let heroInstance = null;

function initHero() {
    if (!heroInstance) {
        heroInstance = new Hero();
    }
    return heroInstance;
}

export { initHero };