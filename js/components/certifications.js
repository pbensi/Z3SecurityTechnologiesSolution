class Certifications {
    constructor() {
        if (Certifications.instance) {
            return Certifications.instance;
        }
        Certifications.instance = this;

        this.seeMoreBtn = null;
        this.seeLessBtn = null;
        this.certGrid = null;
        this.hiddenCerts = [];
        this.certObserver = null;
        this.themeObserver = null;

        return this;
    }

    init() {
        this.seeMoreBtn = document.getElementById('seeMoreBtn');
        this.seeLessBtn = document.getElementById('seeLessBtn');
        this.certGrid = document.querySelector('.cert-grid');

        if (!this.seeMoreBtn || !this.seeLessBtn || !this.certGrid) return;

        this.updateCertImages();

        this.hiddenCerts = Array.from(this.certGrid.querySelectorAll('.cert-item.hidden'));

        this.seeMoreBtn.addEventListener('click', () => this.handleSeeMore());
        this.seeLessBtn.addEventListener('click', () => this.handleSeeLess());

        this.initCertObserver(this.certGrid.querySelectorAll('.cert-item:not(.hidden)'));
        this.initThemeObserver();
    }

    handleSeeMore() {
        this.hiddenCerts.forEach((cert, i) => {
            cert.classList.remove('hidden');
            cert.classList.add('show-animation');
            setTimeout(() => cert.classList.add('visible'), i * 50);
        });

        this.seeMoreBtn.style.display = 'none';
        this.seeLessBtn.style.display = 'inline-flex';
    }

    handleSeeLess() {
        this.hiddenCerts.forEach((cert, i) => {
            cert.classList.remove('visible');
            setTimeout(() => {
                cert.classList.add('hidden');
                cert.classList.remove('show-animation');
            }, 300 + i * 30);
        });

        this.seeLessBtn.style.display = 'none';
        this.seeMoreBtn.style.display = 'inline-flex';
    }

    updateCertImages() {
        const certImages = document.querySelectorAll('.cert-item img');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

        certImages.forEach(img => {
            const lightSrc = img.getAttribute('data-light');
            const darkSrc = img.getAttribute('data-dark');

            if (currentTheme === 'dark' && darkSrc) {
                img.src = darkSrc;
            } else if (lightSrc) {
                img.src = lightSrc;
            }

            if (!img.alt) {
                const fileName = lightSrc?.split('/').pop() || 'certificate';
                img.alt = `Certificate ${fileName}`;
            }
        });
    }

    initThemeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.updateCertImages();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    initCertObserver(certItems) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    if (!item.classList.contains('show-animation')) {
                        item.classList.add('show-animation', 'visible');
                    }
                    obs.unobserve(item);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        certItems.forEach(item => observer.observe(item));
    }
}

let certificationsInstance = null;

function initCertifications() {
    if (!certificationsInstance) {
        certificationsInstance = new Certifications();
        certificationsInstance.init();
    }
    return certificationsInstance;
}

export { initCertifications };