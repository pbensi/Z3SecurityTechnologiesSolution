import { CircularDots } from "../utilities/circular-dots.js";

class Hero {
    constructor() {
        if (Hero.instance) {
            return Hero.instance;
        }
        Hero.instance = this;

        this.config = {
            slides: [
                { image: './assets/img/hero-section.jpg', alt: 'Security Systems' },
                { image: './assets/img/hero-section-1.jpg', alt: 'Security Installation' },
                { image: './assets/img/hero-section-2.jpg', alt: 'Security Solutions' },
            ],
            settings: {
                autoPlay: true,
                slideDuration: 5000,
                transitionDuration: 500
            }
        };

        this.state = {
            currentSlide: 0,
            isTransitioning: false,
            isInViewport: true,
            observer: null
        };

        this.heroDots = null;
        this.heroSection = null;

        this.init();
        return this;
    }

    init() {
        this.initializeSlideshow();
        this.setupIntersectionObserver();
    }

    initializeSlideshow() {
        const slideshow = document.querySelector('[data-slideshow]');
        const dotsContainer = document.getElementById('heroDots');
        this.heroSection = document.querySelector('.hero-section');

        if (!slideshow || !dotsContainer) {
            console.error('Hero: Slideshow or dots container not found');
            return;
        }

        this.generateSlides(slideshow);
        this.initializeDots(dotsContainer);
        this.startAutoPlay();
    }

    setupIntersectionObserver() {
        if (!this.heroSection) {
            this.heroSection = document.querySelector('.hero-section') || document.querySelector('[data-slideshow]').closest('section');
        }

        if (!this.heroSection || !('IntersectionObserver' in window)) return;

        this.state.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    this.state.isInViewport = entry.isIntersecting;
                    
                    if (entry.isIntersecting) {
                        if (this.config.settings.autoPlay) {
                            this.startAutoPlay();
                        }
                    } else {
                        this.stopAutoPlay();
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            }
        );

        this.state.observer.observe(this.heroSection);
    }

    generateSlides(container) {
        container.innerHTML = '';

        this.config.slides.forEach((slide, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = slide.image;
            imgElement.alt = slide.alt;
            imgElement.className = 'background-slide';
            imgElement.loading = 'lazy';
            if (index === 0) {
                imgElement.classList.add('active');
            }
            container.appendChild(imgElement);
        });
    }

    initializeDots(container) {
        this.heroDots = new CircularDots(container, {
            count: this.config.slides.length,
            duration: this.config.settings.slideDuration,
            activeIndex: 0,
            onDotClick: (index) => {
                if (!this.state.isTransitioning && this.state.isInViewport) {
                    this.showSlide(index);
                }
            },
            onProgressComplete: (index) => {
                if (this.config.settings.autoPlay && this.state.isInViewport) {
                    this.nextSlide();
                }
            }
        });
    }

    showSlide(index) {
        if (index === this.state.currentSlide || this.state.isTransitioning || !this.state.isInViewport) return;

        this.state.isTransitioning = true;
        const slides = document.querySelectorAll('.background-slide');

        this.heroDots.stopAnimation();

        slides[this.state.currentSlide].classList.remove('active');

        this.heroDots.setActiveDot(index);
        setTimeout(() => {
            slides[index].classList.add('active');
            this.state.currentSlide = index;
            this.state.isTransitioning = false;
        }, this.config.settings.transitionDuration);
    }

    nextSlide() {
        if (!this.state.isInViewport) return;
        
        const nextIndex = (this.state.currentSlide + 1) % this.config.slides.length;
        this.showSlide(nextIndex);
    }

    startAutoPlay() {
        if (this.config.settings.autoPlay && this.state.isInViewport && this.heroDots) {
            this.heroDots.restartAnimation();
        }
    }

    stopAutoPlay() {
        if (this.heroDots) {
            this.heroDots.stopAnimation();
        }
    }

    getViewportStatus() {
        return {
            isInViewport: this.state.isInViewport,
            currentSlide: this.state.currentSlide,
            isPlaying: this.state.isInViewport && this.config.settings.autoPlay
        };
    }

    pause() {
        this.stopAutoPlay();
    }

    resume() {
        if (this.state.isInViewport) {
            this.startAutoPlay();
        }
    }

    destroy() {
        this.stopAutoPlay();
        
        if (this.state.observer) {
            this.state.observer.disconnect();
            this.state.observer = null;
        }
        
        if (this.heroDots) {
            this.heroDots.destroy();
        }
        
        Hero.instance = null;
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