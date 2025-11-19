import { Modal } from '../utilities/modal.js';

const clientData = {
  'pub-1': {
    title: 'Municipality of Samboan',
    description: 'Installation of 48 units 4MP IP CCTV Camera.',
    category: 'Public',
    image: 'Municipality_of_samboan.webp',
    sector: 'public'
  },
  'pub-2': {
    title: 'City Hall Of Bay Bay Leyte',
    description: 'Supply and Install of 200+ CCTV Camera, telephone system and Data System.',
    category: 'Public',
    image: 'City_Hall_Of_Bay_Bay_Leyte.webp',
    sector: 'public'
  },
  'pub-3': {
    title: 'Baranggay Looc, Lapu Lapu City',
    description: 'Supply and Install of 52 units of 4MP IP CCTV Camera and 14 unit IP Paging System.',
    category: 'Public',
    image: 'barangay_looc.webp',
    sector: 'public'
  },
  'pub-4': {
    title: 'Municipality of Mainit, Surigao del Norte',
    description: 'Supply and Install of PABX or Telephone System and IP CCTV Camera.',
    category: 'Public',
    image: 'Municipality_of_Mainit.webp',
    sector: 'public'
  },
  'pub-5': {
    title: 'Baranggay Biga, Toledo City',
    description: 'Supply and Install of 40 units Two Way Radio System including monopole.',
    category: 'Public',
    image: 'Baranggay_Biga.webp',
    sector: 'public'
  },
  'priv-1': {
    title: 'Dusit Thani Mactan Resort and Spa',
    description: 'Supply and Install 70 IP Camera, Hold up alarm System, and Panic Alarm System. Quarterly PMS of CCTV (200+ IP CCTV). Door Alarm System (40+ Doors).',
    category: 'Private',
    image: 'Dusit_Thani_Mactan_Resort_and_Spa.webp',
    sector: 'private'
  },
  'priv-2': {
    title: 'Sister of Mary Boys Town',
    description: 'Supply and Install Conventional Fire Alarm System for 4 buildings (400+ smoke detectors).',
    category: 'Private',
    image: 'The_Sisters_of_Mary_Schools.webp',
    sector: 'private'
  },
  'priv-3': {
    title: 'RN VIOS CONSTRUCTION AND DEV\'T CORP.',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private',
    image: 'RNVios_Construction_Dev_Corp.webp',
    sector: 'private'
  },
  'priv-4': {
    title: 'Villa Tuna Restaurant',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private',
    image: 'villatuna.webp',
    sector: 'private'
  },
  'priv-5': {
    title: 'SVJ HOTEL',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private',
    image: 'svjhotel.webp',
    sector: 'private'
  },
  'priv-6': {
    title: 'Beaver Hotel & Residences',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private',
    image: 'breaver.webp',
    sector: 'private'
  },
  'priv-7': {
    title: 'LORENZO SHIPPING CORP',
    description: 'Supply and Install IP CCTV Camera and electrical works.',
    category: 'Private',
    image: 'lorenzo.webp',
    sector: 'private'
  },
  'priv-8': {
    title: 'MLHUILLIER IT Department office',
    description: 'Supply and Install Fire alarm System.',
    category: 'Private',
    image: 'mlhuillier.webp',
    sector: 'private'
  },
  'priv-9': {
    title: 'Seaside Haven',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'Seaside_Heaven.webp',
    sector: 'private'
  },
  'priv-10': {
    title: 'Starbucks',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'starbucks_coffee.webp',
    sector: 'private'
  },
  'priv-11': {
    title: 'Chowking',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'Chowking.webp',
    sector: 'private'
  },
  'priv-12': {
    title: 'HT LAND ONE MANDANI BAY',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'HTLand.webp',
    sector: 'private'
  },
  'priv-13': {
    title: 'Honda',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'Honda.webp',
    sector: 'private'
  },
  'priv-14': {
    title: 'Contempo Property Holdings Inc.',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'ontempo.webp',
    sector: 'private'
  },
  'priv-15': {
    title: 'Bamboo Bay',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'bamboobay.webp',
    sector: 'private'
  },
  'priv-16': {
    title: 'Village One Saekyung',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'villageone.webp',
    sector: 'private'
  },
  'priv-17': {
    title: 'Andy Hotel',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'andyhotel.webp',
    sector: 'private'
  },
  'priv-18': {
    title: 'ML Suites',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'MLSuite.webp',
    sector: 'private'
  },
  'priv-19': {
    title: 'Kalahi-CIDSS/NCDDP',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'Kalahi.webp',
    sector: 'private'
  },
  'priv-20': {
    title: 'Dito Telecommunity',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'Dito_Telecommunity.webp',
    sector: 'private'
  },
  'priv-21': {
    title: 'AutoLab Car Care Specialists',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'autolab.webp',
    sector: 'private'
  },
  'priv-22': {
    title: 'LAB Solution Technologies INC.',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private',
    image: 'lab.webp',
    sector: 'private'
  },
};

class ClientModal extends Modal {
  constructor() {
    super('clientModal');
    this.clientData = clientData;
  }

  init() {
    super.init();
    this.bindClientCards();
  }

  bindClientCards() {
    document.addEventListener('click', (e) => {
      const clientCard = e.target.closest('.client-card');
      if (clientCard) {
        e.preventDefault();
        this.openClientModal(clientCard);
      }
    });
  }

  openClientModal(card) {
    const clientId = card.getAttribute('data-client-id');
    const data = this.clientData[clientId];

    if (!data) return;

    this.updateModalContent(data);
    this.open();
  }

  updateModalContent(data) {
    const imageElement = document.getElementById('modalClientImage');
    const titleElement = document.getElementById('modalClientName');
    const descriptionElement = document.getElementById('modalClientDescription');

    if (imageElement) {
      imageElement.src = `./assets/img/${data.sector}/${data.image}`;
      imageElement.alt = `${data.title} logo`;
      imageElement.loading = 'lazy';
      imageElement.width = 250;
      imageElement.height = 250;
    }
    if (titleElement) titleElement.textContent = data.title;
    if (descriptionElement) descriptionElement.textContent = data.description;
  }
}

class SectorCarousel {
  constructor(container, sectorType) {
    this.container = container;
    this.sectorType = sectorType;
    this.titlesWrapper = container.querySelector('.titles-wrapper');
    this.titlesContainer = container.querySelector('.titles-container');
    this.clientsGrid = container.querySelector('.clients-grid');
    this.prevArrow = container.querySelector('.carousel-arrow.prev');
    this.nextArrow = container.querySelector('.carousel-arrow.next');
    
    this.observer = null;
    this.hasLoadedInitialImages = false;

    this.categories = {
      public: [
        {
          title: "Municipalities",
          clients: ['pub-1', 'pub-4']
        },
        {
          title: "City Government", 
          clients: ['pub-2']
        },
        {
          title: "Barangay & Local",
          clients: ['pub-3', 'pub-5'],
        }
      ],
      private: [
        {
          title: "Hospitality & Hotels",
          clients: ['priv-1', 'priv-5', 'priv-6', 'priv-17', 'priv-18']
        },
        {
          title: "Construction & Dev", 
          clients: ['priv-3', 'priv-12', 'priv-14']
        },
        {
          title: "Financial Services",
          clients: ['priv-7', 'priv-8']
        },
        {
          title: "Restaurants & Food",
          clients: ['priv-4', 'priv-10', 'priv-11']
        },
        {
          title: "Telecom & IT",
          clients: ['priv-19', 'priv-20', 'priv-21', 'priv-22']
        },
        {
          title: "Automotive & Retail", 
          clients: ['priv-13', 'priv-21']
        },
        {
          title: "Real Estate",
          clients: ['priv-9', 'priv-15', 'priv-16']
        }
      ]
    };

    this.currentCategories = this.categories[this.sectorType];
    this.currentIndex = 0;
    this.isAnimating = false;

    this.init();
  }

  init() {
    this.createTitles();
    this.initIntersectionObserver();
    this.updateCarousel();
    this.bindEvents();
  }

  initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('img');
          if (img && img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
  }

  createTitles() {
    this.titlesContainer.innerHTML = '';

    const categoryCount = this.currentCategories.length;
    
    if (categoryCount <= 2) {
      this.titlesWrapper.classList.add('few-categories');
      if (categoryCount === 1) {
        this.titlesWrapper.classList.add('single-category');
      }
    } else {
      this.titlesWrapper.classList.remove('few-categories', 'single-category', 'two-categories');
    }

    this.currentCategories.forEach((category, index) => {
      const titleElement = document.createElement('div');
      titleElement.className = 'category-title';
      titleElement.textContent = category.title;
      titleElement.dataset.index = index;
      titleElement.setAttribute('tabindex', '0');
      titleElement.setAttribute('role', 'button');
      titleElement.setAttribute('aria-label', `View ${category.title} clients`);
      
      this.titlesContainer.appendChild(titleElement);
    });
  }

  updateCarousel() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const currentCategory = this.currentCategories[this.currentIndex];

    const titles = this.titlesContainer.querySelectorAll('.category-title');
    const totalItems = this.currentCategories.length;

    if (totalItems >= 3) {
      this.updateCarouselPositions();
    } else {
      titles.forEach((title, index) => {
        title.classList.toggle('active', index === this.currentIndex);
      });
    }

    titles.forEach((title, index) => {
      title.setAttribute('aria-pressed', index === this.currentIndex ? 'true' : 'false');
    });

    this.updateClientsGrid(currentCategory.clients);
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 150);
  }

  updateCarouselPositions() {
    const titles = this.titlesContainer.querySelectorAll('.category-title');
    const totalItems = this.currentCategories.length;

    titles.forEach(title => {
      title.className = 'category-title hidden';
    });

    const prevIndex = (this.currentIndex - 1 + totalItems) % totalItems;
    const nextIndex = (this.currentIndex + 1) % totalItems;

    if (titles[prevIndex]) {
      titles[prevIndex].className = 'category-title prev';
    }

    if (titles[this.currentIndex]) {
      titles[this.currentIndex].className = 'category-title active';
    }

    if (titles[nextIndex]) {
      titles[nextIndex].className = 'category-title next';
    }
  }

  navigate(direction) {
    if (this.isAnimating) return;
    
    this.currentIndex = (this.currentIndex + direction + this.currentCategories.length) % this.currentCategories.length;
    this.updateCarousel();
    
    const activeTitle = this.titlesContainer.querySelector('.category-title.active');
    if (activeTitle) {
      activeTitle.focus();
    }
  }

  updateClientsGrid(clientIds) {
    this.clientsGrid.innerHTML = '';
    
    clientIds.forEach((clientId, index) => {
      const client = this.getClientData(clientId);
      if (client) {
        const card = this.createClientCard(clientId, client, index);
        this.clientsGrid.appendChild(card);
        
        if (this.observer && !this.hasLoadedInitialImages) {
          this.observer.observe(card);
        }
      }
    });

    if (!this.hasLoadedInitialImages) {
      this.hasLoadedInitialImages = true;
    }
  }

  createClientCard(clientId, clientData, index) {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.setAttribute('data-client-id', clientId);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${clientData.title}`);

    const img = document.createElement('img');
    img.alt = clientData.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 100;
    img.height = 100;

    img.dataset.src = `./assets/img/${clientData.sector}/${clientData.image}`;
    
    const cardRect = this.clientsGrid.getBoundingClientRect();
    if (cardRect.top < window.innerHeight + 200) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }

    img.onload = () => {
      card.classList.remove('loading');
      img.classList.add('loaded');
    };

    img.onerror = () => {
      card.classList.remove('loading');
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zNSA0MEg2NVY2MEgzNVY0MFoiIGZpbGw9IiNDMEMwQzAiLz4KPHBhdGggZD0iTTQ1IDI1SDU1VjM1SDQ1VjI1WiIgZmlsbD0iI0MwQzBDMCIvPgo8L3N2Zz4K';
      img.alt = 'Client logo not available';
      img.classList.add('loaded');
    };

    card.appendChild(img);
    return card;
  }

  getClientData(clientId) {
    return window.clientData?.[clientId] || {
      title: 'Our Valued Client',
      description: 'We are proud to partner with this organization.',
      category: 'Unknown',
      sector: this.sectorType,
      image: 'default-client.webp'
    };
  }

  bindEvents() {
    this.titlesContainer.addEventListener('click', (e) => {
      const title = e.target.closest('.category-title');
      if (title && !title.classList.contains('hidden')) {
        const index = parseInt(title.dataset.index);
        if (index !== this.currentIndex && !this.isAnimating) {
          this.currentIndex = index;
          this.updateCarousel();
        }
      }
    });

    const categoryCount = this.currentCategories.length;
    
    if (categoryCount >= 3) {
      if (this.prevArrow) {
        this.prevArrow.style.display = 'flex';
        this.prevArrow.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.navigate(-1);
        });
      }

      if (this.nextArrow) {
        this.nextArrow.style.display = 'flex';
        this.nextArrow.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.navigate(1);
        });
      }

      this.setupSwipeSupport();
    } else {
      if (this.prevArrow) this.prevArrow.style.display = 'none';
      if (this.nextArrow) this.nextArrow.style.display = 'none';
    }
  }

  setupSwipeSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.titlesContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.titlesContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;

    if (endX < startX - swipeThreshold) {
      this.navigate(1);
    }

    if (endX > startX + swipeThreshold) {
      this.navigate(-1);
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export function initClients() {
  const clientModal = new ClientModal();
  clientModal.init();

  window.clientData = clientData;

  const publicCarousel = new SectorCarousel(document.querySelector('.public-sector .sector-carousel'), 'public');
  const privateCarousel = new SectorCarousel(document.querySelector('.private-sector .sector-carousel'), 'private');
  
  return { clientModal, publicCarousel, privateCarousel };
}