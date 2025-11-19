export function initCertifications() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const seeLessBtn = document.getElementById('seeLessBtn');
    const certGrid = document.querySelector('.cert-grid');

    if (!seeMoreBtn || !seeLessBtn || !certGrid) return;

    initVisibleCertificates();
    
    const hiddenCerts = Array.from(certGrid.querySelectorAll('.cert-item.hidden'));

    seeMoreBtn.addEventListener('click', () => {
        loadHiddenCertificates(hiddenCerts);
        
        hiddenCerts.forEach((cert, i) => {
            cert.classList.remove('hidden');
            cert.classList.add('show-animation');
            setTimeout(() => cert.classList.add('visible'), i * 50);
        });

        seeMoreBtn.style.display = 'none';
        seeLessBtn.style.display = 'inline-flex';
        
        initCertObserver(hiddenCerts);
    });

    seeLessBtn.addEventListener('click', () => {
        hiddenCerts.forEach((cert, i) => {
            cert.classList.remove('visible');
            setTimeout(() => {
                cert.classList.add('hidden');
                cert.classList.remove('show-animation');
            }, 300 + i * 30);
        });

        seeLessBtn.style.display = 'none';
        seeMoreBtn.style.display = 'inline-flex';
    });

    initCertObserver(certGrid.querySelectorAll('.cert-item:not(.hidden)'));
}

function initVisibleCertificates() {
    updateVisibleCertImages();
    initThemeObserver();
}

function loadHiddenCertificates(hiddenCerts) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    hiddenCerts.forEach(certItem => {
        const img = certItem.querySelector('img');
        const lightSrc = img.getAttribute('data-light');
        const darkSrc = img.getAttribute('data-dark');
        
        if (currentTheme === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (lightSrc) {
            img.src = lightSrc;
        }
        
        if (!img.alt || img.alt === '') {
            const fileName = lightSrc ? lightSrc.split('/').pop().replace('.webp', '').replace(/-/g, ' ') : 'certificate';
            img.alt = `${fileName} certification`;
        }
    });
}

function updateVisibleCertImages() {
    const visibleImages = document.querySelectorAll('.cert-item:not(.hidden) img');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    visibleImages.forEach(img => {
        const lightSrc = img.getAttribute('data-light');
        const darkSrc = img.getAttribute('data-dark');
        
        if (img.src && currentTheme === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (img.src && lightSrc) {
            img.src = lightSrc;
        }
    });
}

function initThemeObserver() {
    let themeTimeout;
    const observer = new MutationObserver((mutations) => {
        clearTimeout(themeTimeout);
        themeTimeout = setTimeout(() => {
            updateVisibleCertImages();
        }, 100);
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

function initCertObserver(certItems) {
    if (!('IntersectionObserver' in window) || certItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                if (!item.classList.contains('show-animation')) {
                    item.classList.add('show-animation', 'visible');
                }
                obs.unobserve(item);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });

    certItems.forEach(item => observer.observe(item));
}