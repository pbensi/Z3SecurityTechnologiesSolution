export class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.scrollThreshold = 40;
        this.isScrolled = false;
        this.init();
    }

    init() {
        if (!this.header) return;
        
        this.checkScroll();
        this.setupScrollListener();
    }

    setupScrollListener() {
        let ticking = false;
        
        const update = () => {
            this.checkScroll();
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('load', () => this.checkScroll());
    }

    checkScroll() {
        const shouldBeScrolled = window.scrollY > this.scrollThreshold;
        
        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            this.header.classList.toggle('scrolled', shouldBeScrolled);
        }
    }
}