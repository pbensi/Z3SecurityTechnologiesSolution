export class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) {
            console.error(`Modal with ID '${modalId}' not found`);
            return;
        }
        
        this.isOpen = false;
        this.previouslyFocusedElement = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('role', 'dialog');
        
        const titleElement = this.modal.querySelector('.modal-title');
        if (titleElement && !titleElement.id) {
            titleElement.id = 'modalTitle';
        }
        if (titleElement && titleElement.id) {
            this.modal.setAttribute('aria-labelledby', titleElement.id);
        }
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

        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isOpen) {
                this.trapFocus(e);
            }
        });
    }
    
    open() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
        
        this.previouslyFocusedElement = document.activeElement;
        
        this.modal.removeAttribute('aria-hidden');
        
        setTimeout(() => {
            const focusableElements = this.getFocusableElements();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }, 100);
        
        this.modal.dispatchEvent(new CustomEvent('modal:open', { bubbles: true }));
    }
    
    close() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.isOpen = false;
        
        this.modal.removeAttribute('aria-hidden');
        
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
        }
        
        this.modal.dispatchEvent(new CustomEvent('modal:close', { bubbles: true }));
    }

    getFocusableElements() {
        return Array.from(this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.hasAttribute('disabled'));
    }

    trapFocus(e) {
        const focusableElements = this.getFocusableElements();
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
    
    setContent(title, content) {
        const titleElement = this.modal.querySelector('.modal-title');
        const bodyElement = this.modal.querySelector('.modal-body');
        
        if (titleElement && title) titleElement.textContent = title;
        if (bodyElement && content) bodyElement.innerHTML = content;
    }
}