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

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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