class HeroSlideshow {
    constructor() {
        this.config = {
            slides: [
                { image: './assets/img/hero-section.jpg', alt: 'hero' },
                { image: './assets/img/hero-section-1.jpg', alt: 'hero-1' },
                { image: './assets/img/hero-section-2.jpg', alt: 'hero-2' },
                { image: './assets/img/hero-section-3.jpg', alt: 'hero-3' },
                { image: './assets/img/hero-section-4.jpg', alt: 'hero-4' },
                { image: './assets/img/hero-section-5.jpg', alt: 'hero-5' },
                { image: './assets/img/hero-section-6.jpg', alt: 'hero-6' },
            ],
            settings: {
                autoPlay: true,
                slideDuration: 5000,
                transitionDuration: 800,
                pauseWhenNotVisible: true
            }
        };

        this.state = {
            currentSlide: 0,
            slideInterval: null,
            isAnimating: false,
            isHeroVisible: false
        };
    }

    init() {
        if (!this.shouldInitialize()) return;

        if (document.readyState === 'complete') {
            setTimeout(() => this.initializeSlideshow(), 1500);
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => this.initializeSlideshow(), 1500);
            });
        }
    }

    shouldInitialize() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return false;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return false;
        }

        return true;
    }

    initializeSlideshow() {
        const slideshow = document.querySelector('[data-slideshow]');
        const dotsContainer = document.querySelector('[data-dots]');

        if (!slideshow || !dotsContainer) return;

        this.generateSlides(slideshow);
        this.generateDots(dotsContainer);
        this.setupEventListeners();
        this.setupViewportObserver();
    }

    generateSlides(container) {
        const fragment = document.createDocumentFragment();
        
        for (let i = 1; i < this.config.slides.length; i++) {
            const slide = this.config.slides[i];
            const imgElement = document.createElement('img');
            imgElement.src = slide.image;
            imgElement.alt = slide.alt;
            imgElement.className = 'background-slide';
            imgElement.loading = 'lazy';
            imgElement.setAttribute('data-slide', i);
            fragment.appendChild(imgElement);
        }

        container.appendChild(fragment);
    }

    generateDots(container) {
        const fragment = document.createDocumentFragment();
        
        this.config.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-slide', index);
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            fragment.appendChild(dot);
        });

        container.appendChild(fragment);
    }

    showSlide(index) {
        if (this.state.isAnimating || index === this.state.currentSlide) return;
        
        this.state.isAnimating = true;
        const newIndex = (index + this.config.slides.length) % this.config.slides.length;
        
        if (this.state.isHeroVisible) {
            this.preloadNextImages(newIndex);
        }

        const slides = document.querySelectorAll('.background-slide');
        const dots = document.querySelectorAll('.dot');

        slides[this.state.currentSlide]?.classList.remove('active');
        dots[this.state.currentSlide]?.classList.remove('active');

        setTimeout(() => {
            slides[newIndex]?.classList.add('active');
            dots[newIndex]?.classList.add('active');
            
            this.state.currentSlide = newIndex;
            this.state.isAnimating = false;
        }, 50);
    }

    nextSlide() {
        if (this.state.isHeroVisible) {
            this.showSlide(this.state.currentSlide + 1);
        }
    }

    prevSlide() {
        if (this.state.isHeroVisible) {
            this.showSlide(this.state.currentSlide - 1);
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        
        if (this.config.settings.autoPlay && this.state.isHeroVisible) {
            this.state.slideInterval = setInterval(
                () => this.nextSlide(), 
                this.config.settings.slideDuration
            );
        }
    }

    stopAutoPlay() {
        if (this.state.slideInterval) {
            clearInterval(this.state.slideInterval);
            this.state.slideInterval = null;
        }
    }

    setupEventListeners() {
        const dotsContainer = document.querySelector('[data-dots]');
        const nextBtn = document.querySelector('[data-next]');
        const prevBtn = document.querySelector('[data-prev]');

        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                if (slideIndex !== this.state.currentSlide) {
                    this.stopAutoPlay();
                    this.showSlide(slideIndex);
                    this.startAutoPlay();
                }
            }
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else if (this.config.settings.autoPlay && this.state.isHeroVisible) {
                this.startAutoPlay();
            }
        });
    }

    setupViewportObserver() {
        const heroSection = document.getElementById('home');
        if (!heroSection || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const wasVisible = this.state.isHeroVisible;
                this.state.isHeroVisible = entry.isIntersecting;
                
                if (this.state.isHeroVisible && !wasVisible) {

                    this.startAutoPlay();
                    this.preloadNextImages(this.state.currentSlide);
                } else if (!this.state.isHeroVisible && wasVisible) {

                    this.stopAutoPlay();
                }
            });
        }, {
            threshold: 0.4
        });

        observer.observe(heroSection);
    }

    preloadNextImages(currentIndex) {
        if (!this.state.isHeroVisible) return;
        
        const nextIndices = [
            (currentIndex + 1) % this.config.slides.length,
            (currentIndex + 2) % this.config.slides.length
        ];
        
        nextIndices.forEach(index => {
            const img = new Image();
            img.src = this.config.slides[index].image;
        });
    }

    destroy() {
        this.stopAutoPlay();
    }
}

let heroInstance = null;

export function initHero() {
    if (!heroInstance) {
        heroInstance = new HeroSlideshow();
        heroInstance.init(); 
    }
}

export function destroyHero() {
    if (heroInstance) {
        heroInstance.destroy();
        heroInstance = null;
    }
}