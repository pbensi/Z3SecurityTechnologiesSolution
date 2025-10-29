
export class AboutSection {
    constructor() {
        this.aboutSection = document.getElementById('about');
        this.navLinks = document.querySelectorAll('[data-target="about"]');
        this.isVisible = false;
        this.overlay = null;
        
        this.init();
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

        this.addCloseButton();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'about-overlay';
        this.overlay.addEventListener('click', () => this.hide());
        document.body.appendChild(this.overlay);
    }

    addCloseButton() {
        if (!this.aboutSection) return;
        
        const closeButton = document.createElement('button');
        closeButton.className = 'about-close';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', () => this.hide());
        
        this.aboutSection.appendChild(closeButton);
    }

    show() {
        if (!this.aboutSection) return;
        
        this.overlay.classList.add('active');
        
        this.aboutSection.classList.remove('hidden');
        this.aboutSection.classList.add('active');
        
        document.body.classList.add('about-open');
        
        this.isVisible = true;
    }

    hide() {
        if (!this.aboutSection) return;
        
        this.overlay.classList.remove('active');
        
        this.aboutSection.classList.remove('active');
        this.aboutSection.classList.add('hidden');
        
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

    destroy() {
        document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
        if (this.overlay) {
            this.overlay.remove();
        }
    }
}

export function initAbout() {
    const aboutSection = new AboutSection();
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            aboutSection.hide();
        }
    });
    
    return aboutSection;
}