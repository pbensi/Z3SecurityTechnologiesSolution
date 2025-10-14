function initPartners() {
    const partners = [
        { name: 'Ajhua', logo: './img/ajhua-Logo.png' },
        { name: 'Hikvision', logo: './img/hikvision-Logo.png' },
        { name: 'Honeywell', logo: './img/honeywell-Logo.png' },
        { name: 'YearStar', logo: './img/yeastar-Logo.png' },
        { name: 'ZK Teco', logo: './img/zkteco-Logo.png' },
        { name: 'Ubiquiti', logo: './img/ubiquiti-Logo.png' },
        { name: 'Apollo', logo: './img/apollo-Logo.png' },
        { name: 'GST', logo: './img/gst-Logo-1.png' },
        { name: 'TYY', logo: './img/TYY-Logo.png' },
    ];

    const partnersTrack = document.querySelector('.partners-track');
    if (!partnersTrack) return;
    
    function createSeamlessMarquee() {
        let content = '';
        for (let i = 0; i < 4; i++) {
            partners.forEach(partner => {
                content += `
                    <div class="partner-logo">
                        <img src="${partner.logo}" alt="${partner.name} Logo" loading="lazy">
                    </div>
                `;
            });
        }
        partnersTrack.innerHTML = content;
    }

    createSeamlessMarquee();

    partnersTrack.addEventListener('mouseenter', () => {
        partnersTrack.classList.add('paused');
    });

    partnersTrack.addEventListener('mouseleave', () => {
        partnersTrack.classList.remove('paused');
    });
}