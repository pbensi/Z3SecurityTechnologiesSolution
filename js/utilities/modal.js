export class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) {
            console.error(`Modal with ID '${modalId}' not found`);
            return;
        }
        
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const closeBtn = this.modal.querySelector('.modal-close');
        const closeButton = this.modal.querySelector('.btn-close');
        
        [closeBtn, closeButton].forEach(btn => {
            btn?.addEventListener('click', () => this.close());
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && this.isOpen) {
                this.close();
            }
        });
    }
    
    open() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
        
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.setAttribute('aria-hidden', 'true');
        
        this.modal.dispatchEvent(new CustomEvent('modal:open', { bubbles: true }));
    }
    
    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.isOpen = false;
        
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.setAttribute('aria-hidden', 'false');
        
        this.modal.dispatchEvent(new CustomEvent('modal:close', { bubbles: true }));
    }
    
    setContent(title, content) {
        const titleElement = this.modal.querySelector('.modal-title');
        const bodyElement = this.modal.querySelector('.modal-body');
        
        if (titleElement && title) titleElement.textContent = title;
        if (bodyElement && content) bodyElement.innerHTML = content;
    }
}