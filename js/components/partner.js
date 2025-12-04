class Partners {
    constructor() {
        if (Partners.instance) {
            return Partners.instance;
        }
        Partners.instance = this;

        this.marqueeElements = null;
        this.observer = null;

        this.init();
    }

    init() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        const section = document.querySelector(".partners");
        if (!section) return;

        this.marqueeElements = document.querySelectorAll(".marquee-content");

        this.marqueeElements.forEach(el => {
            el.innerHTML += el.innerHTML;
        });

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) this.start();
                else this.pause();
            });
        }, { threshold: 0.3 });

        this.observer.observe(section);
    }

    start() {
        this.marqueeElements.forEach(el => {
            el.style.animationPlayState = "running";
        });
    }

    pause() {
        this.marqueeElements.forEach(el => {
            el.style.animationPlayState = "paused";
        });
    }
}

let partnersInstance = null;

function initPartners() {
    if (!partnersInstance) {
        partnersInstance = new Partners();
    }
    return partnersInstance;
}

export { initPartners };