export class Menu {
  constructor() {
    this.menuBtn = document.getElementById('menuToggleBtn');
    this.navbarMenu = document.getElementById('navbarMenu');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => this.toggleMenu());
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navbarMenu.classList.contains('active')) {
        this.closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.navbarMenu.classList.toggle('active');
    this.menuBtn.classList.toggle('active');
    
    if (this.navbarMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.navbarMenu.classList.remove('active');
    this.menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
}