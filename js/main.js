import { initServices } from './components/services.js';
import { initCertifications } from './components/certifications.js';
import { initContact } from './components/contact.js';
import { initAnimations } from './components/animations.js';
import { initOrganizations } from './components/oganization.js';

class App {
    constructor() {
        this.init();
        this.addGlobalEventListeners();
    }

    init() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
        }

        initServices();
        initCertifications();
        initOrganizations();
        initContact();
        initAnimations();
    }

    addGlobalEventListeners() {
        this.handleImageLoading();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
            });
        }
    }

    handleImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    }

    handleResize() {
        if (window.innerWidth > 768) {
            const navbarMenu = document.querySelector('.navbar-menu');
            if (navbarMenu) {
                navbarMenu.classList.remove('active');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

export default App;