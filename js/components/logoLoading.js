class LogoLoading {
    constructor() {
        if (LogoLoading.instance) {
            return LogoLoading.instance;
        }
        LogoLoading.instance = this;
        
        this.loadingEl = null;
        this.minDisplayTime = 1000;
        this.startTime = Date.now();
        
        this.init();
        return this;
    }

    init() {
        this.loadingEl = document.querySelector('.logo-loading');
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('load', () => {
            this.handlePageLoaded();
        });

        setTimeout(() => {
            if (this.loadingEl && this.loadingEl.parentNode) {
                this.hide();
            }
        }, 3000);
    }

    handlePageLoaded() {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);
        
        setTimeout(() => {
            this.hide();
        }, remainingTime);
    }

    hide() {
        if (this.loadingEl) {
            this.loadingEl.classList.add('hidden');
        }
    }

    show() {
        if (this.loadingEl) {
            this.loadingEl.classList.remove('hidden');
            this.startTime = Date.now();
        }
    }
}

let logoLoadingInstance = null;

function initLogoLoading() {
    if (!logoLoadingInstance) {
        logoLoadingInstance = new LogoLoading();
    }
    return logoLoadingInstance;
}

export { initLogoLoading };