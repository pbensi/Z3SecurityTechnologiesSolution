export function initCertifications() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const seeLessBtn = document.getElementById('seeLessBtn');
    const certGrid = document.querySelector('.cert-grid');

    if (!seeMoreBtn || !seeLessBtn || !certGrid) return;

    updateCertImages();

    const hiddenCerts = Array.from(certGrid.querySelectorAll('.cert-item.hidden'));

    seeMoreBtn.addEventListener('click', () => {
        hiddenCerts.forEach((cert, i) => {
            cert.classList.remove('hidden');
            cert.classList.add('show-animation');
            setTimeout(() => cert.classList.add('visible'), i * 50);
        });

        seeMoreBtn.style.display = 'none';
        seeLessBtn.style.display = 'inline-flex';
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
    
    initThemeObserver();
}

function updateCertImages() {
    const certImages = document.querySelectorAll('.cert-item img');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    certImages.forEach(img => {
        const lightSrc = img.getAttribute('data-light');
        const darkSrc = img.getAttribute('data-dark');
        
        if (currentTheme === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (lightSrc) {
            img.src = lightSrc;
        }
        
        if (!img.alt) {
            const fileName = lightSrc?.split('/').pop() || 'certificate';
            img.alt = `Certificate ${fileName}`;
        }
    });
}

function initThemeObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                updateCertImages();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

function initCertObserver(certItems) {
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
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    certItems.forEach(item => observer.observe(item));
}