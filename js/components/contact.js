class Contact {
    constructor() {
        if (Contact.instance) {
            return Contact.instance;
        }
        Contact.instance = this;

        this.googleToken = "";
        this.googleUser = null;
        this.googleInitialized = false;

        this.boundHandleCredentialResponse = this.handleCredentialResponse.bind(this);
        this.boundHandlePhoneInput = this.handlePhoneInput.bind(this);

        return this;
    }

    init({ clientId, endpoint }) {
        this.clientId = clientId;
        this.endpoint = endpoint;
        this.contactForm = document.getElementById("contactForm");
        this.phoneInput = document.getElementById("phone");

        this.setupEventListeners();
        this.initGoogleSignIn(clientId);
    }

    setupEventListeners() {
        if (this.phoneInput) {
            this.phoneInput.addEventListener("input", this.boundHandlePhoneInput);
        }

        if (this.contactForm) {
            this.contactForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                await this.submitForm(this.contactForm, this.endpoint);
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
        if (!overlay) return;
        overlay.classList.add("hidden");
        setTimeout(() => overlay.style.display = "none", 400);
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

    async waitForGoogle() {
        if (window.google?.accounts?.id) return true;
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (window.google?.accounts?.id) {
                    clearInterval(interval);
                    resolve(true);
                } else if (attempts > 50) {
                    clearInterval(interval);
                    reject("Google Identity Services failed to load");
                }
            }, 100);
        });
    }

    async initGoogleSignIn(clientId) {
        try {
            await this.waitForGoogle();

            if (!this.googleInitialized) {
                google.accounts.id.initialize({
                    client_id: clientId,
                    callback: this.boundHandleCredentialResponse,
                    auto_select: false,
                });
                this.googleInitialized = true;
            }

            google.accounts.id.renderButton(
                document.getElementById("googleBtnContainer"),
                { theme: "outline", size: "large" }
            );
        } catch (error) {
            this.hideGoogleOverlay();
            const sendBtn = document.getElementById("sendBtn");
            if (sendBtn) sendBtn.disabled = false;
            this.showNotification("Form ready (Google sign-in skipped)", "info");
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
                redirect: "follow",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                this.showNotification(result.message, "success");
                contactForm.reset();
            } else {
                this.showNotification(result.message, "error");
            }
        } catch (err) {
            this.showNotification("Failed to send message. Please try again later.", "error");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
}

let contactInstance = null;

function initContact(config) {
    if (!contactInstance) {
        contactInstance = new Contact();
        contactInstance.init(config);
        window.handleCredentialResponse = contactInstance.boundHandleCredentialResponse;
    }
    return contactInstance;
}

export { initContact };