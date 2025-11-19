class PartnersMarquee {
    constructor() {
        this.marqueeElements = null;
        this.observer = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupObserver());
        } else {
            this.setupObserver();
        }
    }

    setupObserver() {
        const partnersSection = document.querySelector('.partners');
        if (!partnersSection) return;

        this.marqueeElements = document.querySelectorAll('.marquee-content');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startMarquee();
                } else {
                    this.pauseMarquee();
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '50px'
        });

        this.observer.observe(partnersSection);
    }

    startMarquee() {
        if (this.isInitialized) return;
        
        this.marqueeElements.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
        });
        
        this.isInitialized = true;
    }

    pauseMarquee() {
        this.marqueeElements.forEach(marquee => {
            marquee.style.animationPlayState = 'paused';
        });
        
        this.isInitialized = false;
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.pauseMarquee();
    }
}

let partnersInstance = null;

export function initPartners() {
    if (!partnersInstance) {
        partnersInstance = new PartnersMarquee();
    }
}

export function destroyPartners() {
    if (partnersInstance) {
        partnersInstance.destroy();
        partnersInstance = null;
    }
}