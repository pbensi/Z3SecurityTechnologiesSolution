class Services {
    constructor() {
        if (Services.instance) {
            return Services.instance;
        }
        Services.instance = this;

        this.categoryBtns = null;
        this.categoryPanels = null;

        this.boundHandleCategoryClick = this.handleCategoryClick.bind(this);

        this.init();
        return this;
    }

    init() {
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.categoryPanels = document.querySelectorAll('.category-panel');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', this.boundHandleCategoryClick);
        });
    }

    handleCategoryClick(e) {
        const btn = e.currentTarget;
        const category = btn.getAttribute('data-category');
        const targetPanel = document.getElementById(`${category}-panel`);

        if (btn.classList.contains('active')) return;

        this.categoryBtns.forEach(b => b.classList.remove('active'));
        this.categoryPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        targetPanel.classList.add('active');

        document.querySelector('.services')
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

let servicesInstance = null;

function initServices() {
    if (!servicesInstance) {
        servicesInstance = new Services();
    }
    return servicesInstance;
}

export { initServices };