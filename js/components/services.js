export function initServices() {
    const categoryNav = document.querySelector('.category-nav');
    const categoryPanels = document.querySelectorAll('.category-panel');
    
    categoryNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;
        
        const category = btn.getAttribute('data-category');
        const targetPanel = document.getElementById(`${category}-panel`);
        
        if (btn.classList.contains('active')) return;
        
        document.querySelectorAll('.category-btn.active, .category-panel.active').forEach(el => {
            el.classList.remove('active');
        });
        
        btn.classList.add('active');
        targetPanel.classList.add('active');
        
        targetPanel.setAttribute('data-loaded', 'true');
    });
    
    initServiceCardAnimations();
}

function initServiceCardAnimations() {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}