const clientData = {
  'samboan-municipality': { title: 'Municipality of Samboan', description: 'Installation of 48 units 4MP IP CCTV Camera.', image: 'Municipality_of_samboan.png', sector: 'public' },
  'baybay-city-hall': { title: 'City Hall Of Bay Bay Leyte', description: 'Supply and Install of 200+ CCTV Camera, telephone system and Data System.', image: 'City_Hall_Of_Bay_Bay_Leyte.png', sector: 'public' },
  'looc-barangay': { title: 'Baranggay Looc, Lapu Lapu City', description: 'Supply and Install of 52 units of 4MP IP CCTV Camera and 14 unit IP Paging System.', image: 'barangay_looc.png', sector: 'public' },
  'mainit-municipality': { title: 'Municipality of Mainit, Surigao del Norte', description: 'Supply and Install of PABX or Telephone System and IP CCTV Camera.', image: 'Municipality_of_Mainit.png', sector: 'public' },
  'biga-barangay': { title: 'Baranggay Biga, Toledo City', description: 'Supply and Install of 40 units Two Way Radio System including monopole.', image: 'Baranggay_Biga.png', sector: 'public' },
  'dusit-thani': { title: 'Dusit Thani Mactan Resort and Spa', description: 'Supply and Install 70 IP Camera, Hold up alarm System, and Panic Alarm System.', image: 'Dusit_Thani_Mactan_Resort_and_Spa.png', sector: 'private' },
  'sister-mary-school': { title: 'Sister of Mary Boys Town', description: 'Supply and Install Conventional Fire Alarm System for 4 buildings.', image: 'The_Sisters_of_Mary_Schools.png', sector: 'private' },
  'rn-vios': { title: 'RN VIOS CONSTRUCTION AND DEV\'T CORP.', description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.', image: 'RNVios_Construction_Dev_Corp.png', sector: 'private' },
  'villa-tuna': { title: 'Villa Tuna Restaurant', description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.', image: 'villatuna.png', sector: 'private' },
  'svj-hotel': { title: 'SVJ HOTEL', description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.', image: 'svjhotel.png', sector: 'private' },
  'beaver-hotel': { title: 'Beaver Hotel & Residences', description: 'Supply and Install IP CCTV CAMERA (32 UNITS), ADDRESSABLE FIRE ALARM SYSTEM AND STRUCTURE CABLING.', image: 'breaver.png', sector: 'private' },
  'lorenzo-shipping': { title: 'LORENZO SHIPPING CORP', description: 'Supply and Install IP CCTV Camera and electrical works.', image: 'lorenzo.png', sector: 'private' },
  'mlhuillier': { title: 'MLHUILLIER IT Department office', description: 'Supply and Install Fire alarm System.', image: 'mlhuillier.png', sector: 'private' },
  'seaside-haven': { title: 'Seaside Haven', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'Seaside_Heaven.png', sector: 'private' },
  'starbucks': { title: 'Starbucks', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'starbucks_coffee.png', sector: 'private' },
  'chowking': { title: 'Chowking', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'Chowking.png', sector: 'private' },
  'ht-land': { title: 'HT LAND ONE MANDANI BAY', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'HTLand.png', sector: 'private' },
  'honda': { title: 'Honda', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'Honda.png', sector: 'private' },
  'contempo': { title: 'Contempo Property Holdings Inc.', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'ontempo.png', sector: 'private' },
  'bamboo-bay': { title: 'Bamboo Bay', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'bamboobay.png', sector: 'private' },
  'village-one': { title: 'Village One Saekyung', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'villageone.png', sector: 'private' },
  'andy-hotel': { title: 'Andy Hotel', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'andyhotel.png', sector: 'private' },
  'ml-suites': { title: 'ML Suites', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'MLSuite.png', sector: 'private' },
  'kalahi': { title: 'Kalahi-CIDSS/NCDDP', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'Kalahi.png', sector: 'private' },
  'dito': { title: 'Dito Telecommunity', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'Dito_Telecommunity.png', sector: 'private' },
  'autolab': { title: 'AutoLab Car Care Specialists', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'autolab.png', sector: 'private' },
  'lab-solutions': { title: 'LAB Solution Technologies INC.', description: 'Supply and Install IP CCTV Camera and IP PABX.', image: 'lab.png', sector: 'private' }
};

class Clients {
  constructor(container, sector) {
    if (Clients.instances && Clients.instances[sector]) {
      return Clients.instances[sector];
    }

    if (!Clients.instances) {
      Clients.instances = {};
    }
    Clients.instances[sector] = this;

    this.titleEl = container.querySelector('.current-title-text');
    this.gridEl = container.querySelector('.clients-body');
    this.prevBtn = container.querySelector('.clients-prev');
    this.nextBtn = container.querySelector('.clients-next');
    this.sector = sector;

    this.categories = {
      public: [
        { title: "Municipalities", clients: ['samboan-municipality', 'mainit-municipality', 'looc-barangay', 'biga-barangay'] },
        { title: "City Government", clients: ['baybay-city-hall'] },
      ],
      private: [
        { title: "Hospitality & Hotels", clients: ['dusit-thani', 'svj-hotel', 'beaver-hotel', 'andy-hotel', 'ml-suites'] },
        { title: "Construction & Dev", clients: ['rn-vios', 'ht-land', 'contempo'] },
        { title: "Financial Services", clients: ['lorenzo-shipping', 'mlhuillier'] },
        { title: "Restaurants & Food", clients: ['villa-tuna', 'starbucks', 'chowking'] },
        { title: "Telecom & IT", clients: ['kalahi', 'dito', 'autolab', 'lab-solutions'] },
        { title: "Automotive & Retail", clients: ['honda', 'autolab'] },
        { title: "Real Estate", clients: ['seaside-haven', 'bamboo-bay', 'village-one'] },
        { title: "Education", clients:['sister-mary-school']}
      ]
    };

    this.index = 0;
    this.categoriesList = this.categories[sector];

    this.init();
    return this;
  }

  init() {
    this.updateView();
    this.prevBtn.onclick = () => this.navigate(-1);
    this.nextBtn.onclick = () => this.navigate(1);
  }

  navigate(direction) {
    this.index = (this.index + direction + this.categoriesList.length) % this.categoriesList.length;
    this.updateView();
  }

  updateView() {
    const category = this.categoriesList[this.index];
    this.titleEl.textContent = category.title;
    this.renderGrid(category.clients);
  }

  renderGrid(clientIds) {
    this.gridEl.innerHTML = '';

    clientIds.forEach(id => {
      const client = clientData[id];
      const card = document.createElement('div');
      card.className = 'client-card';
      card.onclick = () => this.openModal(client);

      const img = document.createElement('img');
      img.src = `./assets/img/${client.sector}/${client.image}`;
      img.alt = client.title;

      card.appendChild(img);
      this.gridEl.appendChild(card);
    });
  }

  openModal(client) {
    document.getElementById('modalClientName').textContent = client.title;
    document.getElementById('modalClientImage').src = `./assets/img/${client.sector}/${client.image}`;
    document.getElementById('modalClientDescription').textContent = client.description;
    document.getElementById('clientModal').style.display = 'block';
    document.body.classList.add('modal-open');
  }
}

let clientsInstance = null;

function initClients() {
  if (!clientsInstance) {
    clientsInstance = {
      public: null,
      private: null
    };

    const publicCarousel = new Clients(document.querySelector('.public-sector'), 'public');
    const privateCarousel = new Clients(document.querySelector('.private-sector'), 'private');

    clientsInstance.public = publicCarousel;
    clientsInstance.private = privateCarousel;

    const modal = document.getElementById('clientModal');
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    };

    document.onkeydown = (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    };
  }
  return clientsInstance;
}

export { initClients };