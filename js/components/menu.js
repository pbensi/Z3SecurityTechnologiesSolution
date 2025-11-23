class Menu {
  constructor() {
    if (Menu.instance) {
      return Menu.instance;
    }
    Menu.instance = this;

    this.menuBtn = document.getElementById('menuToggleBtn');
    this.navbarMenu = document.getElementById('navbarMenu');

    this.boundToggleMenu = this.toggleMenu.bind(this);
    this.boundCloseMenu = this.closeMenu.bind(this);
    this.boundHandleEscape = this.handleEscape.bind(this);
    this.boundHandleResize = this.handleResize.bind(this);
    this.boundHandleNavLinkClick = this.handleNavLinkClick.bind(this);

    this.init();
    return this;
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', this.boundToggleMenu);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', this.boundHandleNavLinkClick);
    });

    document.addEventListener('keydown', this.boundHandleEscape);
    window.addEventListener('resize', this.boundHandleResize);
  }

  handleNavLinkClick() {
    this.boundCloseMenu();
  }

  handleEscape(e) {
    if (e.key === 'Escape' && this.navbarMenu.classList.contains('active')) {
      this.boundCloseMenu();
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.boundCloseMenu();
    }
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

let menuInstance = null;

function initMenu() {
  if (!menuInstance) {
    menuInstance = new Menu();
  }
  return menuInstance;
}

export { initMenu };