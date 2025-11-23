class Header {
    constructor() {
        if (Header.instance) {
            return Header.instance;
        }
        Header.instance = this;

        this.header = document.querySelector('.header');
        this.scrollThreshold = 40;
        this.isScrolled = false;
        this.ticking = false;

        this.boundCheckScroll = this.checkScroll.bind(this);

        this.init();
        return this;
    }

    init() {
        if (!this.header) return;

        this.checkScroll();
        this.setupScrollListener();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(this.boundCheckScroll);
                this.ticking = true;
            }
        }, { passive: true });

        window.addEventListener('load', () => this.checkScroll());
    }

    checkScroll() {
        const shouldBeScrolled = window.scrollY > this.scrollThreshold;

        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            this.header.classList.toggle('scrolled', shouldBeScrolled);
        }

        this.ticking = false;
    }
}

let headerInstance = null;

function initHeader() {
    if (!headerInstance) {
        headerInstance = new Header();
    }
    return headerInstance;
}

export { initHeader };