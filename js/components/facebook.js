class FacebookWidget {
    constructor() {
        this.widget = document.getElementById('fbWidgetContainer');
        this.content = document.querySelector('.fb-content');
        this.icon = document.getElementById('fbWidgetIcon');
        this.closeBtn = document.getElementById('fbCloseBtn');
        this.overlay = null;
        this.isOpen = false;
        this.pageUrl = 'https://www.facebook.com/z3tecsolution';
        this.currentWidth = 0;
        this.resizeTimer = null;
        
        this.init();
    }
    
    init() {
        if (!this.widget || !this.content || !this.icon || !this.closeBtn) {
            console.warn('Facebook Widget: Required elements not found');
            return;
        }
        
        this.createOverlay();
        this.bindEvents();
    }
    
    createOverlay() {
        try {
            this.overlay = document.createElement('div');
            this.overlay.className = 'fb-overlay';
            document.body.appendChild(this.overlay);
        } catch (error) {
            console.warn('Could not create overlay:', error);
        }
    }
    
    bindEvents() {
        this.icon.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    handleResize() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        
        this.resizeTimer = setTimeout(() => {
            if (this.isOpen) {
                const newWidth = this.widget.offsetWidth;
                
                if (Math.abs(newWidth - this.currentWidth) > 50) {
                    this.currentWidth = newWidth;
                    this.createIframe();
                }
            }
        }, 250);
    }
    
    createIframe() {
        if (!this.content) return;
        
        try {
            this.content.innerHTML = '';
            
            this.currentWidth = this.widget.offsetWidth;
            const height = this.content.offsetHeight;
            
            const iframe = document.createElement('iframe');
            iframe.src = this.getFacebookUrl(this.currentWidth, height);
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            iframe.title = 'Facebook Feed';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
            
            iframe.onload = () => {
                console.log('Facebook iframe loaded successfully');
            };
            
            this.content.appendChild(iframe);
            
        } catch (error) {
            console.warn('Error creating Facebook iframe:', error);
            
            this.content.innerHTML = `
                <div style="padding: 40px 20px; text-align: center;">
                    <h4 style="color: #1877f2; margin-bottom: 10px;">Facebook Feed</h4>
                    <p style="color: #666; margin-bottom: 20px;">Unable to load Facebook feed.</p>
                    <a href="${this.pageUrl}" target="_blank" rel="noopener" 
                       style="display: inline-block; padding: 10px 20px; background: #1877f2; color: white; 
                              text-decoration: none; border-radius: 4px; font-weight: 600;">
                        Visit Facebook Page
                    </a>
                </div>
            `;
        }
    }
    
    getFacebookUrl(width, height) {
        try {
            const encodedUrl = encodeURIComponent(this.pageUrl);
            return `https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
        } catch (error) {
            return `https://www.facebook.com/plugins/page.php?href=${this.pageUrl}&tabs=timeline&width=${width}&height=${height}`;
        }
    }
    
    open() {
        if (this.isOpen) return;
        
        try {
            this.widget.classList.add('active');
            this.overlay.classList.add('active');
            document.body.classList.add('fb-widget-open');
            this.isOpen = true;
            
            this.createIframe();
        } catch (error) {
            console.warn('Error opening Facebook widget:', error);
        }
    }
    
    close() {
        if (!this.isOpen) return;
        
        try {
            this.widget.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.classList.remove('fb-widget-open');
            this.isOpen = false;
            
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = null;
            }
        } catch (error) {
            console.warn('Error closing Facebook widget:', error);
        }
    }
    
    updatePage(url) {
        if (typeof url === 'string' && url.includes('facebook.com')) {
            this.pageUrl = url;
            if (this.isOpen) {
                this.createIframe();
            }
        }
    }
}

let facebookInstance = null;

function initFacebook() {
    if (!facebookInstance) {
        facebookInstance = new FacebookWidget();
    }
    return facebookInstance;
}

export { initFacebook };