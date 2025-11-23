class Partners {
    constructor() {
        if (Partners.instance) {
            return Partners.instance;
        }
        Partners.instance = this;

        this.marqueeElements = null;
        this.observer = null;

        this.boundSetupObserver = this.setupObserver.bind(this);
        this.boundHandleIntersection = this.handleIntersection.bind(this);

        this.init();
        return this;
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.boundSetupObserver);
        } else {
            this.boundSetupObserver();
        }
    }

    setupObserver() {
        const partnersSection = document.querySelector('.partners');
        if (!partnersSection) return;

        this.marqueeElements = document.querySelectorAll('.marquee-content');

        this.observer = new IntersectionObserver(this.boundHandleIntersection, {
            threshold: 0.3,
            rootMargin: '50px'
        });

        this.observer.observe(partnersSection);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.startMarquee();
            } else {
                this.pauseMarquee();
            }
        });
    }

    startMarquee() {
        if (!this.marqueeElements) return;

        this.marqueeElements.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
        });
    }

    pauseMarquee() {
        if (!this.marqueeElements) return;

        this.marqueeElements.forEach(marquee => {
            marquee.style.animationPlayState = 'paused';
        });
    }
}

let partnersInstance = null;

function initPartners() {
    if (!partnersInstance) {
        partnersInstance = new Partners();
    }
    return partnersInstance;
}

export { initPartners };