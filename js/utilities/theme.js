export class Theme {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.updateIcon();
    }

    getSavedTheme() {
        return localStorage.getItem('theme');
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.updateIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: light');
        mediaQuery.addEventListener('change', (e) => {
            if (!this.getSavedTheme()) {
                this.applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    updateIcon() {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.applyTheme(theme);
        }
    }
}
