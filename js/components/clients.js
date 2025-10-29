import { Modal } from '../utilities/modal.js';

const clientData = {
  'pub-1': {
    title: 'Municipality of Samboan',
    description: 'Installation of 48 units 4MP IP CCTV Camera.',
    category: 'Public'
  },
  'pub-2': {
    title: 'City Hall Of Bay Bay Leyte',
    description: 'Supply and Install of 200+ CCTV Camera, telephone system and Data System.',
    category: 'Public'
  },
  'pub-3': {
    title: 'Baranggay Looc, Lapu Lapu City',
    description: 'Supply and Install of 52 units of 4MP IP CCTV Camera and 14 unit IP Paging System.',
    category: 'Public'
  },
  'pub-4': {
    title: 'Municipality of Mainit, Surigao del Norte',
    description: 'Supply and Install of PABX or Telephone System and IP CCTV Camera.',
    category: 'Public'
  },
  'pub-5': {
    title: 'Baranggay Biga, Toledo City',
    description: 'Supply and Install of 40 units Two Way Radio	 System including monopole.',
    category: 'Public'
  },
  'priv-1': {
    title: 'Dusit Thani Mactan Resort and Spa',
    description: 'Supply and Install 70 IP Camera,Hold up alarm System, and Panic Alarm System. Quarterly PMS of CCTV (200+ IP CCTV). Door Alarm System (40+ Doors).',
    category: 'Private'
  },
  'priv-2': {
    title: 'Sister of Mary Boys Town',
    description: 'Supply and Install Conventional Fire Alarm System for 4 buildings ( 400+ smoke detectors).',
    category: 'Private'
  },
  'priv-3': {
    title: 'RN VIOS CONSTRUCTION AND DEV’T CORP.',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private'
  },
  'priv-4': {
    title: 'Villa Tuna Restaurant',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private'
  },
  'priv-5': {
    title: 'SVJ HOTEL',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private'
  },
  'priv-6': {
    title: 'Beaver Hotel & Residences',
    description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.',
    category: 'Private'
  },
  'priv-7': {
    title: 'LORENZO SHIPPING CORP',
    description: 'Supply and Install IP CCTV CAMERA and electrical works.',
    category: 'Private'
  },
  'priv-8': {
    title: 'MLHUILLIER IT Department office',
    description: 'Supply and Install Fire alarm System.',
    category: 'Private'
  },
  'priv-9': {
    title: 'Seaside Haven',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-10': {
    title: 'Starbucks',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-11': {
    title: 'Chowking',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-12': {
    title: 'HT LAND ONE MANDANI BAY',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-13': {
    title: 'Honda',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-14': {
    title: 'Contempo Property Holdings Inc.',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-15': {
    title: 'Bamboo Bay',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-16': {
    title: 'Village One Saekyung',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-17': {
    title: 'Andy Hotel',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-18': {
    title: 'ML Suites',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-19': {
    title: 'Kalahi-CIDSS/NCDDP',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-20': {
    title: 'Dito Telecommunity',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-21': {
    title: 'AutoLab Car Care Specialists',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
  },
  'priv-22': {
    title: 'LAB Solution Technologies INC.',
    description: 'Supply and Install IP CCTV Camera and IP PABX.',
    category: 'Private'
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
      if (clientCard && !clientCard.classList.contains('hidden')) {
        e.preventDefault();
        this.openClientModal(clientCard);
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.client-card')) {
        e.preventDefault();
        const card = e.target.closest('.client-card');
        if (!card.classList.contains('hidden')) {
          this.openClientModal(card);
        }
      }
    });
  }

  openClientModal(card) {
    const clientId = card.getAttribute('data-client-id');
    const imgElement = card.querySelector('img');

    if (!imgElement || !clientId) return;

    const data = this.clientData[clientId] || {
      title: imgElement.alt || 'Our Valued Client',
      description: 'We are proud to partner with this organization...',
      category: 'Client'
    };

    this.updateModalContent(imgElement.src, data.title, data.description);
    this.open();
  }

  updateModalContent(imageSrc, title, description) {
    const imageElement = document.getElementById('modalClientImage');
    const titleElement = document.getElementById('modalClientTitle');
    const descriptionElement = document.getElementById('modalClientDescription');

    if (imageElement) imageElement.src = imageSrc;
    if (titleElement) titleElement.textContent = title;
    if (descriptionElement) descriptionElement.textContent = description;
  }
}

function initSeeMoreButtons() {
  const seeMoreButtons = document.querySelectorAll('.see-more');
  const seeLessButtons = document.querySelectorAll('.see-less');

  seeMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
      const column = this.closest('.clients-column');
      showMoreCards(column, this);
    });
  });

  seeLessButtons.forEach(button => {
    button.addEventListener('click', function () {
      const column = this.closest('.clients-column');
      showLessCards(column, this);
    });
  });
}

function showMoreCards(column, button) {
  const hiddenCards = Array.from(column.querySelectorAll('.client-card.hidden'));
  const cardsToShow = hiddenCards.slice(0, 5);
  const seeMoreBtn = column.querySelector('.see-more');
  const seeLessBtn = column.querySelector('.see-less');

  if (cardsToShow.length === 0) return;

  button.classList.add('btn-loading');

  seeMoreBtn.style.display = 'none';

  cardsToShow.forEach((card) => {
    card.classList.remove('hidden');
    card.classList.add('show-animation');
    
    setTimeout(() => {
      card.classList.add('visible');
    }, 10);
  });

  setTimeout(() => {
    button.classList.remove('btn-loading');

    const remainingHidden = column.querySelectorAll('.client-card.hidden');
    
    if (remainingHidden.length > 0) {
      seeMoreBtn.style.display = 'inline-flex';
    }

    seeLessBtn.style.display = 'inline-flex';
  }, 300);
}

function showLessCards(column, button) {
  const allCards = Array.from(column.querySelectorAll('.client-card:not(.hidden)'));
  const cardsToHide = allCards.slice(5);
  const seeMoreBtn = column.querySelector('.see-more');
  const seeLessBtn = column.querySelector('.see-less');

  if (cardsToHide.length === 0) return;

  button.classList.add('btn-loading');

  seeLessBtn.style.display = 'none';

  cardsToHide.forEach((card) => {
    card.classList.remove('visible');
    
    setTimeout(() => {
      card.classList.remove('show-animation');
      card.classList.add('hidden');
    }, 300);
  });

  setTimeout(() => {
    button.classList.remove('btn-loading');

    seeMoreBtn.style.display = 'inline-flex';
  }, 300);
}

function hideExtraCards() {
  document.querySelectorAll('.clients-column').forEach(column => {
    const allCards = column.querySelectorAll('.client-card');
    const visibleCount = 5;
    const seeMoreBtn = column.querySelector('.see-more');
    const seeLessBtn = column.querySelector('.see-less');

    allCards.forEach((card, index) => {
      if (index >= visibleCount) {
        card.classList.add('hidden');
      }
    });

    const hiddenCards = column.querySelectorAll('.client-card.hidden');
    
    if (seeMoreBtn) {
      if (hiddenCards.length === 0) {
        seeMoreBtn.style.display = 'none';
      } else {
        seeMoreBtn.style.display = 'inline-flex';
      }
    }
    
    if (seeLessBtn) {
      seeLessBtn.style.display = 'none';
    }
  });
}

export function initClients() {
  const clientModal = new ClientModal();
  initSeeMoreButtons();
  hideExtraCards();

  console.log('Clients component initialized');
  return clientModal;
}

export { initSeeMoreButtons, hideExtraCards, showMoreCards, showLessCards };