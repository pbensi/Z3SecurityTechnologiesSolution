import { initServices } from './components/services.js';
import { initCertifications } from './components/certifications.js';
import { initContact } from './components/contact.js';
import { initOrganizations } from './components/oganization.js';
import { initModal } from './utilities/modal.js';
import { initPartner } from './components/partner.js';
import { Theme } from './utilities/theme.js';
import { Menu } from './components/menu.js';

class App {
    constructor() {
        this.init();
        this.addGlobalEventListeners();
    }

    init() {
        initServices();
        initCertifications();
        initOrganizations();
        initPartner();
        initContact({
            clientId: "1010543233965-80cp9ko0qt4vtolkeabmmf483vsgs4ll.apps.googleusercontent.com",
            endpoint: "https://script.google.com/macros/s/AKfycbymCpg0NATb0ymqmPMb0Xh_UfdL5Bc1O3ABUIrZYxpUm1s91mJSbo-GRFdjBRth6F3f/exec"
        });
        initModal();
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
    new Theme();
    new Menu();
});

export default App;