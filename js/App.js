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
import { initLocationTabs } from './components/locationTabs.js';

class App {
    static instance = null;

    constructor() {
        if (App.instance) return App.instance;
        App.instance = this;

        this.initialized = false;
        this.init();
    }

    async init() {
        if (this.initialized) return;
        this.initialized = true;

        try {
            initLogoLoading();
            await this.delay(120);

            await this.initializeComponents();
            this.setCurrentYear();
            this.revealContent();

            console.log("App initialized");
        } catch (err) {
            this.showErrorOverlay(err, "App");
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
                    endpoint: "https://script.google.com/macros/s/AKfycbxyzmYTsBoR0-RaO5nKARU_4KXJcKn4nNjpZwvRWwdK090YNWTu95OXzWGgBiZqQXGp5w/exec"
                })
            }
        ];

        for (const c of components) {
            try {
                c.init();
                await this._yield();
                console.groupEnd();
            } catch (e) {
                this.showErrorOverlay(e, c.name);
            }
        }
    }

    lazyLoad(selector, fn) {
        const el = document.querySelector(selector);
        if (!el) return;

        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fn();
                obs.disconnect();
            }
        });

        obs.observe(el);
    }

    revealContent() {
        document.body.classList.add("content-loaded");

        setTimeout(() => {
            const loading = document.querySelector(".logo-loading");
            if (loading) loading.classList.add("hidden");
        }, 500);
    }

    setCurrentYear() {
        const el = document.getElementById("year");
        if (el) el.textContent = new Date().getFullYear();
    }

    showErrorOverlay(err, compName) {
        const overlay = document.createElement("div");
        overlay.style = `
            position: fixed; inset: 0;
            background: rgba(0,0,0,.85);
            color: #ffcccc;
            font-family: monospace;
            padding: 20px;
            z-index: 999999;
            overflow:auto;
        `;
        overlay.innerHTML = `
            <h2>Error in ${compName}</h2>
            <pre>${err.stack || err}</pre>
        `;
        document.body.appendChild(overlay);
    }

    delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    _yield() {
        return new Promise(r => setTimeout(r, 0));
    }
}

document.addEventListener("DOMContentLoaded", () => new App());

export default App;