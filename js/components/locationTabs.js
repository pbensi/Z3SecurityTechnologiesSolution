class LocationTabs {
    constructor() {
        if (LocationTabs.instance) {
            return LocationTabs.instance;
        }
        LocationTabs.instance = this;

        this.tabs = null;
        this.handleTabClick = this.handleTabClick.bind(this);

        this.init();
        return this;
    }

    init() {
        this.tabs = document.querySelectorAll('.location-tab');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', this.handleTabClick);
        });
    }

    handleTabClick(e) {
        const clickedTab = e.currentTarget;

        document.querySelectorAll('.location-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content-location-panel').forEach(c => c.classList.remove('active'));

        clickedTab.classList.add('active');

        const tabId = clickedTab.getAttribute('data-tab');
        const contentPanel = document.getElementById(tabId);
        if (contentPanel) {
            contentPanel.classList.add('active');
        }
    }
}
let locationTabsInstance = null;

function initLocationTabs() {
    if (!locationTabsInstance) {
        locationTabsInstance = new LocationTabs();
    }
    return locationTabsInstance;
}

export { initLocationTabs };