import { initLogoLoading } from './components/logoLoading.js';
import { initServices } from './components/services.js';
import { initCertifications } from './components/certifications.js';
import { initContact } from './components/contact.js';
import { initPartners } from './components/partner.js';
import { initTheme } from './utilities/theme.js';
import { initMenu } from './components/menu.js';
import { initClients } from './components/clients.js';
import { initAbout } from './components/about.js';
import { initHero } from './components/hero.js';
import { initHeader } from './components/header.js';
import { initLocationTabs } from './components/LocationTabs.js';

class App {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        try {
            initLogoLoading();
            await this.delay(100);
            await this.initializeComponents();
            this.setCurrentYear();
            this.initialized = true;
            this.revealContent();

            console.log('App initialized successfully');

        } catch (error) {
            console.error('App initialization failed:', error);
            this.revealContent();
        }
    }

    async initializeComponents() {
        const components = [
            { name: 'Theme', init: initTheme },
            { name: 'Header', init: initHeader },
            { name: 'Menu', init: initMenu },
            { name: 'Hero', init: initHero },
            { name: 'About', init: initAbout },
            { name: 'Services', init: initServices },
            { name: 'Certifications', init: initCertifications },
            { name: 'Clients', init: initClients },
            { name: 'Partners', init: initPartners },
            { name: 'LocationTabs', init: initLocationTabs },
            {
                name: 'Contact',
                init: () => initContact({
                    clientId: "1010543233965-80cp9ko0qt4vtolkeabmmf483vsgs4ll.apps.googleusercontent.com",
                    endpoint: "https://script.google.com/macros/s/AKfycbymCpg0NATb0ymqmPMb0Xh_UfdL5Bc1O3ABUIrZYxpUm1s91mJSbo-GRFdjBRth6F3f/exec"
                })
            }
        ];

        for (const component of components) {
            try {
                console.log(`Initializing ${component.name}...`);
                component.init();
                await this.delay(10);
            } catch (error) {
                console.warn(`Failed to initialize ${component.name}:`, error);
            }
        }
    }

    revealContent() {
        document.body.classList.add('content-loaded');

        setTimeout(() => {
            const loading = document.querySelector('.logo-loading');
            if (loading) {
                loading.classList.add('hidden');
            }
        }, 500);

        console.log('🎉 Content revealed to user');
    }

    setCurrentYear() {
        const yearElement = document.getElementById("year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    new App();
}

export default App;