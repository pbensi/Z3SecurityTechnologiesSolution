export function initPartners() {
    const partnersTrack = document.querySelector('.partners-track');
    
    if (!partnersTrack) return;

    partnersTrack.addEventListener('mouseenter', () => {
        partnersTrack.classList.add('paused');
    });

    partnersTrack.addEventListener('mouseleave', () => {
        partnersTrack.classList.remove('paused');
    });
}

export default { initPartners };