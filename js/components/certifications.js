class Certifications {
  constructor() {
    if (Certifications.instance) return Certifications.instance;
    Certifications.instance = this;

    this.track = null;
    this.slides = [];
    this.prevBtn = null;
    this.nextBtn = null;
    this.index = 0;
    this.slideWidth = 0;
    this.maxIndex = 0;

    this.init();
    return this;
  }

  init() {
    this.track = document.getElementById("certTrack");
    this.slides = Array.from(this.track.children);
    this.prevBtn = document.querySelector(".slider-prev");
    this.nextBtn = document.querySelector(".slider-next");

    this.updateSizes();
    this.updateMaxIndex();
    this.updateImages();
    this.updateButtons();

    this.prevBtn.addEventListener("click", () => this.goTo(this.index - 1));
    this.nextBtn.addEventListener("click", () => this.goTo(this.index + 1));

    window.addEventListener("resize", () => {
      this.updateSizes();
      this.updateMaxIndex();
      this.goTo(this.index, false);
    });

    new MutationObserver(() => this.updateImages())
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let startX = 0;
    let endX = 0;
    this.track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    this.track.addEventListener("touchmove", e => endX = e.touches[0].clientX);
    this.track.addEventListener("touchend", () => {
      const diff = startX - endX;
      if (diff > 50) this.goTo(this.index + 1);
      if (diff < -50) this.goTo(this.index - 1);
    });
  }

  updateSizes() {
    const viewportWidth = this.track.parentElement.offsetWidth;
    const gap = parseFloat(getComputedStyle(this.track).gap) || 16;

    let visibleCount = Math.floor((viewportWidth + gap) / 220);
    visibleCount = Math.max(1, visibleCount);

    this.slideWidth = (viewportWidth - gap * (visibleCount - 1)) / visibleCount;

    this.slides.forEach(slide => slide.style.width = `${this.slideWidth}px`);
  }

  updateMaxIndex() {
    const viewportWidth = this.track.parentElement.offsetWidth;
    const visibleCount = Math.floor(viewportWidth / this.slideWidth);
    this.maxIndex = Math.max(0, this.slides.length - visibleCount);
    if (this.index > this.maxIndex) this.index = this.maxIndex;
  }

  updateImages() {
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    this.slides.forEach(slide => {
      const img = slide.querySelector("img");
      img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
    });
  }

  goTo(index, animate = true) {
    index = Math.max(0, Math.min(index, this.maxIndex));
    this.index = index;

    this.track.style.transition = animate ? "transform 0.35s ease" : "none";
    const x = this.index * this.slideWidth + (parseFloat(getComputedStyle(this.track).gap) || 16) * this.index;
    this.track.style.transform = `translateX(${-x}px)`;

    this.updateButtons();

    if (!animate) setTimeout(() => this.track.style.transition = "", 50);
  }

  updateButtons() {
    this.prevBtn.classList.toggle("hidden", this.index <= 0);
    this.nextBtn.classList.toggle("hidden", this.index >= this.maxIndex);
  }
}

let certificationsInstance = null;
function initCertifications() {
  if (!certificationsInstance) {
    certificationsInstance = new Certifications();
  }

  return certificationsInstance;
}

export { initCertifications };
