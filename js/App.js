import { initServices } from './components/services.js';
import { initCertifications } from './components/certifications.js';
import { initContact, initLocationTabs } from './components/contact.js';
import { initPartners } from './components/partner.js';
import { Theme } from './utilities/theme.js';
import { Menu } from './components/menu.js';
import { initClients } from './components/clients.js';
import { initAbout } from './components/about.js';
import { initHero } from './components/hero.js';
import { HeaderScroll } from './components/header.js';

class App {
    constructor() {
        this.init();
        this.addGlobalEventListeners();
    }

    init() {
        new Theme();
        new Menu();
        new HeaderScroll();
        initHero();
        initAbout();
        initServices();
        initCertifications();
        initClients();
        initPartners();
        initLocationTabs();
        initContact({
            clientId: "1010543233965-80cp9ko0qt4vtolkeabmmf483vsgs4ll.apps.googleusercontent.com",
            endpoint: "https://script.google.com/macros/s/AKfycbymCpg0NATb0ymqmPMb0Xh_UfdL5Bc1O3ABUIrZYxpUm1s91mJSbo-GRFdjBRth6F3f/exec"
        });
    }

    addGlobalEventListeners() {
        this.handleImageLoading();

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
                img.addEventListener('load', function () {
                    this.classList.add('loaded');
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("year").textContent = new Date().getFullYear();

    new App();
});

export default App;