let googleToken = "";
let googleUser = null;
let googleInitialized = false;

function parseJwt(token) {
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

function showNotification(message, type = "info") {
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

function hideGoogleOverlay() {
    const overlay = document.getElementById("googleOverlay");
    if (!overlay) return;
    overlay.classList.add("hidden");
    setTimeout(() => overlay.style.display = "none", 400);
}

function handleCredentialResponse(response) {
    if (!response?.credential) return;

    googleToken = response.credential;
    googleUser = parseJwt(googleToken);

    hideGoogleOverlay();
    showNotification(`Signed in as ${googleUser?.email}`, "success");

    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) sendBtn.disabled = false;
}
window.handleCredentialResponse = handleCredentialResponse;

async function waitForGoogle() {
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

async function initGoogleSignIn(clientId) {
    try {
        await waitForGoogle();

        if (!googleInitialized) {
            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
                auto_select: false,
            });
            googleInitialized = true;
        }

        google.accounts.id.renderButton(
            document.getElementById("googleBtnContainer"),
            { theme: "outline", size: "large" }
        );
    } catch (error) {
        hideGoogleOverlay();
        const sendBtn = document.getElementById("sendBtn");
        if (sendBtn) sendBtn.disabled = false;
        showNotification("Form ready (Google sign-in skipped)", "info");
    }
}

async function submitForm(contactForm, endpoint) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const formData = {
        token: googleToken,
        name: contactForm.name.value.trim(),
        phone: contactForm.phone.value.trim(),
        company: contactForm.company.value.trim(),
        service: contactForm.service.value.trim(),
        message: contactForm.message.value.trim(),
        secret: "z3",
    };

    if (!formData.message) {
        showNotification("Message is required.", "error");
        return;
    }

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(endpoint, {
            redirect: "follow",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            showNotification(result.message, "success");
            contactForm.reset();
        } else {
            showNotification(result.message, "error");
        }
    } catch (err) {
        showNotification("Failed to send message. Please try again later.", "error");
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

export async function initContact({ clientId, endpoint }) {
    const contactForm = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, "");
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            await submitForm(contactForm, endpoint);
        });
    }

    await initGoogleSignIn(clientId);
}
