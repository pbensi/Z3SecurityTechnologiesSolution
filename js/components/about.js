class About {
    constructor() {
        if (About.instance) {
            return About.instance;
        }
        About.instance = this;

        this.about = document.getElementById('about');
        this.navLinks = document.querySelectorAll('[data-target="about"]');
        this.closeButton = this.about ? this.about.querySelector('.about-close') : null;
        this.isVisible = false;
        this.overlay = null;

        this.init();
        return this;
    }

    init() {
        this.createOverlay();
        this.hide();

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.show();
            });
        });

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.hide());
        }

        document.addEventListener('keydown', (e) => this.handleEscapeKey(e));
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'about-overlay';
        this.overlay.addEventListener('click', () => this.hide());
        document.body.appendChild(this.overlay);
    }

    show() {
        if (!this.about) return;

        this.overlay.classList.add('active');
        this.about.classList.remove('hidden');
        this.about.classList.add('active');
        document.body.classList.add('about-open');
        this.isVisible = true;
    }

    hide() {
        if (!this.about) return;

        this.overlay.classList.remove('active');
        this.about.classList.remove('active');
        this.about.classList.add('hidden');
        document.body.classList.remove('about-open');
        this.isVisible = false;
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    handleEscapeKey(e) {
        if (e.key === 'Escape' && this.isVisible) {
            this.hide();
        }
    }
}

let aboutInstance = null;

function initAbout() {
    if (!aboutInstance) {
        aboutInstance = new About();
    }
    return aboutInstance;
}

export { initAbout };