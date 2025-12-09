class Contact {
    constructor() {
        if (Contact.instance) return Contact.instance;
        Contact.instance = this;

        this.googleToken = "";
        this.googleUser = null;
        this.googleInitialized = false;

        this.handleCredentialResponse = this.handleCredentialResponse.bind(this);
        this.handlePhoneInput = this.handlePhoneInput.bind(this);

        return this;
    }

    init({ clientId, endpoint }) {
        this.clientId = clientId;
        this.endpoint = endpoint.includes('/dev') ? endpoint.replace('/dev', '/exec') : endpoint;
        this.contactForm = document.getElementById("contactForm");
        this.phoneInput = document.getElementById("phone");

        this.setupEventListeners();
        this.initGoogleSignIn(clientId);
    }

    setupEventListeners() {
        if (this.phoneInput) {
            this.phoneInput.addEventListener("input", this.handlePhoneInput);
        }

        if (this.contactForm) {
            this.contactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.submitForm(this.contactForm, this.endpoint);
            });
        }
    }

    handlePhoneInput() {
        this.phoneInput.value = this.phoneInput.value.replace(/\D/g, "");
    }

    parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            return JSON.parse(jsonPayload);
        } catch {
            return {};
        }
    }

    showNotification(message, type = "info") {
        document.querySelectorAll(".notification").forEach(n => n.remove());
        const n = document.createElement("div");
        n.className = `notification ${type}`;
        n.textContent = message;
        document.body.appendChild(n);

        setTimeout(() => {
            n.style.opacity = "1";
            n.style.transform = "translateX(0)";
        }, 100);
        setTimeout(() => {
            n.style.opacity = "0";
            n.style.transform = "translateX(100%)";
            setTimeout(() => n.remove(), 300);
        }, 4000);
    }

    hideGoogleOverlay() {
        const overlay = document.getElementById("googleOverlay");
        if (overlay) overlay.style.display = "none";
    }

    handleCredentialResponse(response) {
        if (!response?.credential) return;

        this.googleToken = response.credential;
        this.googleUser = this.parseJwt(this.googleToken);

        this.hideGoogleOverlay();
        this.showNotification(`Signed in as ${this.googleUser?.email}`, "success");

        const sendBtn = document.getElementById("sendBtn");
        if (sendBtn) sendBtn.disabled = false;
    }

    async initGoogleSignIn(clientId) {
        if (window.google?.accounts?.id) {
            google.accounts.id.initialize({
                client_id: clientId,
                callback: this.handleCredentialResponse,
                auto_select: false,
            });

            const googleBtnContainer = document.getElementById("googleBtnContainer");
            if (googleBtnContainer) {
                google.accounts.id.renderButton(googleBtnContainer, {
                    theme: "outline",
                    size: "large"
                });
            }
        }
    }

    async submitForm(contactForm, endpoint) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        const formData = {
            token: this.googleToken,
            name: contactForm.name.value.trim(),
            phone: contactForm.phone.value.trim(),
            company: contactForm.company.value.trim(),
            service: contactForm.service.value.trim(),
            message: contactForm.message.value.trim(),
            secret: "z3",
        };

        if (!formData.message) {
            this.showNotification("Message is required.", "error");
            return;
        }

        submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="svg sending"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"/></svg> Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification(result.message, "success");
                contactForm.reset();
                this.googleToken = "";
                this.googleUser = null;
                submitBtn.disabled = true;
            } else {
                this.showNotification(result.message, "error");
            }
        } catch {
            this.showNotification("Failed to send message. Please try again later.", "error");
        } finally {
            submitBtn.innerHTML = originalText;
            if (this.googleToken) submitBtn.disabled = false;
        }
    }
}

let contactInstance = null;

function initContact(config) {
    if (!contactInstance) {
        contactInstance = new Contact();
        contactInstance.init(config);
    }
    return contactInstance;
}

export { initContact };