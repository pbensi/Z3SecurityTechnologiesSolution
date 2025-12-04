class Certifications {
  constructor(container, name, prevBtn, nextBtn, slides) {

    if (Certifications.instances && Certifications.instances[name]) {
      return Certifications.instances[name];
    }
    if (!Certifications.instances) Certifications.instances = {};
    Certifications.instances[name] = this;

    this.carouselEl = container;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;

    this.slides = slides;

    this.index = 0;
    this.isAnimating = false;

    this.init();
    window.addEventListener('resize', () => this.updateView());
  }

  init() {
    this.updateView();

    this.prevBtn.onclick = () => this.slide(-1);
    this.nextBtn.onclick = () => this.slide(1);

    this.initThemeWatcher();
  }

  getVisibleCount() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    return 3;
  }

  updateView() {
    const visibleCount = this.getVisibleCount();
    const theme = document.documentElement.getAttribute("data-theme") || "light";

    this.carouselEl.innerHTML = '';

    for (let i = 0; i < visibleCount + 1; i++) {
      const slide = this.slides[(this.index + i) % this.slides.length];

      const img = document.createElement('img');
      img.src = theme === "dark" ? slide.dark : slide.light;
      img.alt = slide.alt;

      const slideWrapper = document.createElement('div');
      slideWrapper.className = 'cert-slide';
      slideWrapper.style.flex = `0 0 calc(${100 / visibleCount}% - ${20 * (visibleCount - 1) / visibleCount}px)`;
      slideWrapper.appendChild(img);

      this.carouselEl.appendChild(slideWrapper);
    }

    this.carouselEl.style.transform = 'translateX(0)';
  }

  slide(direction) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const visibleCount = this.getVisibleCount();
    const slideWidth = this.carouselEl.querySelector('.cert-slide').offsetWidth + 20;
    this.carouselEl.style.transition = 'transform 0.5s ease';
    this.carouselEl.style.transform = `translateX(${-direction * slideWidth}px)`;

    this.carouselEl.addEventListener('transitionend', () => {
      this.carouselEl.style.transition = 'none';
      this.index = (this.index + direction + this.slides.length) % this.slides.length;
      this.updateView();
      this.isAnimating = false;
    }, { once: true });
  }

  initThemeWatcher() {
    new MutationObserver(() => this.updateView()).observe(
      document.documentElement,
      { attributes: true, attributeFilter: ["data-theme"] }
    );
  }
}

let certificateInstance = null;

function initCertifications() {
  if (!certificateInstance) {
    const carouselContainer = document.querySelector('#certCarousel');
    const prevBtn = document.querySelector('#certPrev');
    const nextBtn = document.querySelector('#certNext');

    const slidesData = [
      { light: "assets/img/certificate/light/cisco-networking-academy.png", dark: "assets/img/certificate/dark/cisco-networking-academy.png", alt: "Cisco Networking Academy" },
      { light: "assets/img/certificate/light/advanced-autocad-2015.png", dark: "assets/img/certificate/dark/advanced-autocad-2015.png", alt: "Advanced AutoCAD 2015" },
      { light: "assets/img/certificate/light/ubiquiti-broad-band-wireless-admin.png", dark: "assets/img/certificate/dark/ubiquiti-broad-band-wireless-admin.png", alt: "Ubiquiti Broadband Wireless Admin" },
      { light: "assets/img/certificate/light/ubiquiti-broad-band-wireless-specialist.png", dark: "assets/img/certificate/dark/ubiquiti-broad-band-wireless-specialist.png", alt: "Ubiquiti Wireless Specialist" },
      { light: "assets/img/certificate/light/ubiquiti-enterprise-wireless-specialist.png", dark: "assets/img/certificate/dark/ubiquiti-enterprise-wireless-specialist.png", alt: "Ubiquiti Enterprise Wireless Specialist" },
      { light: "assets/img/certificate/light/yeastar-certified-technician.png", dark: "assets/img/certificate/dark/yeastar-certified-technician.png", alt: "Yeastar Certified Technician" },
      { light: "assets/img/certificate/light/hikvision-certified-security-associate.png", dark: "assets/img/certificate/dark/hikvision-certified-security-associate.png", alt: "Hikvision Certified Security Associate" },
      { light: "assets/img/certificate/light/dahua-video-surveillance-system-certified-engineer.png", dark: "assets/img/certificate/dark/dahua-video-surveillance-system-certified-engineer.png", alt: "Dahua Video Surveillance System Certified Engineer" },
      { light: "assets/img/certificate/light/dahua-cloud-management-system-certified-engineer.png", dark: "assets/img/certificate/dark/dahua-cloud-management-system-certified-engineer.png", alt: "Dahua Cloud Management System Certified Engineer" },
      { light: "assets/img/certificate/light/40hrs-construction-occupational-safety-health.png", dark: "assets/img/certificate/dark/40hrs-construction-occupational-safety-health.png", alt: "40hrs Construction Occupational Safety Health" }
    ];

    certificateInstance = new Certifications(carouselContainer, 'main', prevBtn, nextBtn, slidesData);
  }
  return certificateInstance;
}

export { initCertifications };
