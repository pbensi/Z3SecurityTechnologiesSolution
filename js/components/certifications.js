class Certifications {
  constructor() {
    if (Certifications.instance) return Certifications.instance;
    Certifications.instance = this;

    this.track = null;
    this.slides = [];
    this.prevBtn = null;
    this.nextBtn = null;
    
    this.currentIndex = 0;
    this.slideWidth = 0;
    this.gap = 0;
    this.isTransitioning = false;
    this.totalRealSlides = 0;

    this.init();
    return this;
  }

  init() {
    this.track = document.getElementById("certTrack");
    this.prevBtn = document.querySelector(".slider-prev");
    this.nextBtn = document.querySelector(".slider-next");

    const originalSlides = Array.from(this.track.children);
    this.totalRealSlides = originalSlides.length;

    for (let i = 0; i < 3; i++) {
      originalSlides.forEach((slide, idx) => {
        const clone = slide.cloneNode(true);
        clone.classList.add('slide-clone');
        this.track.appendChild(clone);
      });
    }

    this.slides = Array.from(this.track.children);
    
    this.currentIndex = this.totalRealSlides;

    this.updateSizes();
    this.updateImages();
    this.updateTrackPosition(false);

    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    window.addEventListener("resize", () => {
      this.updateSizes();
      this.updateTrackPosition(false);
    });

    new MutationObserver(() => this.updateImages())
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      touchStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const diff = touchStartX - currentX;
      
      const translateX = (this.currentIndex * (this.slideWidth + this.gap)) + diff;
      this.track.style.transition = 'none';
      this.track.style.transform = `translateX(${-translateX}px)`;
    };

    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      touchEndX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
      const diff = touchStartX - touchEndX;
      const threshold = 50;

      if (diff > threshold) {
        this.next();
      } else if (diff < -threshold) {
        this.prev();
      } else {
        this.updateTrackPosition(true);
      }
    };

    this.track.addEventListener("mousedown", handleTouchStart);
    document.addEventListener("mousemove", handleTouchMove);
    document.addEventListener("mouseup", handleTouchEnd);

    this.track.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  }

  updateSizes() {
    const viewport = this.track.parentElement;
    const viewportWidth = viewport.offsetWidth;
    this.gap = parseFloat(getComputedStyle(this.track).gap) || 16;

    const minSlideWidth = 200;
    const maxSlideWidth = 300;

    let visibleCount;
    if (viewportWidth < 576) visibleCount = 1;
    else if (viewportWidth < 768) visibleCount = 2;
    else if (viewportWidth < 992) visibleCount = 3;
    else visibleCount = 4;

    this.slideWidth = Math.min(
      maxSlideWidth,
      Math.max(minSlideWidth, (viewportWidth - this.gap * (visibleCount - 1)) / visibleCount)
    );

    this.slides.forEach(slide => {
      slide.style.width = `${this.slideWidth}px`;
    });
  }

  updateImages() {
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    this.slides.forEach(slide => {
      const img = slide.querySelector("img");
      if (img && img.dataset) {
        img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
      }
    });
  }

  updateTrackPosition(animate = true) {
    if (this.isTransitioning) return;
    
    const translateX = this.currentIndex * (this.slideWidth + this.gap);
    
    if (animate) {
      this.isTransitioning = true;
      this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      this.track.style.transform = `translateX(${-translateX}px)`;
      
      setTimeout(() => {
        this.track.style.transition = '';
        this.isTransitioning = false;
        this.checkLoopReset();
      }, 500);
    } else {
      this.track.style.transition = 'none';
      this.track.style.transform = `translateX(${-translateX}px)`;
    }
  }

  checkLoopReset() {
    if (this.currentIndex < this.totalRealSlides) {
      this.currentIndex += this.totalRealSlides;
      this.updateTrackPosition(false);
    }
    else if (this.currentIndex >= this.totalRealSlides * 2) {
      this.currentIndex -= this.totalRealSlides;
      this.updateTrackPosition(false);
    }
  }

  prev() {
    if (this.isTransitioning) return;
    this.currentIndex--;
    this.updateTrackPosition(true);
  }

  next() {
    if (this.isTransitioning) return;
    this.currentIndex++;
    this.updateTrackPosition(true);
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