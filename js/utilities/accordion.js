class Accordion {
    constructor(containerSelector, config = {}) {
        this.container = document.querySelector(containerSelector);
        this.config = {
            singleOpen: true,
            animationDuration: 150,
            ...config
        };

        this.container.style.setProperty('--accordion-duration', `${this.config.animationDuration}ms`);

        this.accordionBtns = this.container.querySelectorAll('.accordion-btn');
        this.init();
    }

    init() {
        this.accordionEventListener();
    }

    accordionEventListener() {
        this.accordionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleAccordion(e.currentTarget);
            });
        });
    }

    toggleAccordion(button) {
        const isActive = button.classList.contains('accordion-active');

        if (this.config.singleOpen && !isActive) {
            this.closeAll();
        }

        button.classList.toggle('accordion-active');

        const panel = button.nextElementSibling;
        if (isActive) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    closeAll() {
        this.accordionBtns.forEach(btn => {
            btn.classList.remove('accordion-active');
            const panel = btn.nextElementSibling;
            panel.style.maxHeight = null;
        });
    }

    open(index) {
        if (this.accordionBtns[index]) {
            this.toggleAccordion(this.accordionBtns[index]);
        }
    }
}

export function initAccordion() {
    const accordion = new Accordion('#accordion', {
        singleOpen: true,
        animationDuration: 150
    });
}