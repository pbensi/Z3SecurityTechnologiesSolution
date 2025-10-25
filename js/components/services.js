export function initServices() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryPanels = document.querySelectorAll('.category-panel');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            const targetPanel = document.getElementById(`${category}-panel`);

            if (btn.classList.contains('active')) return;

            categoryBtns.forEach(b => b.classList.remove('active'));
            categoryPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            targetPanel.classList.add('active');
        });
    });
}