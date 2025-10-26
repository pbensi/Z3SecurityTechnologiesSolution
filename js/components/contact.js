let googleToken = "";
let googleUser = null;
let isGoogleLoaded = false;

function waitForGoogle() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            isGoogleLoaded = true;
            resolve();
            return;
        }

        const maxAttempts = 50;
        let attempts = 0;

        const checkGoogle = setInterval(() => {
            attempts++;
            if (window.google && window.google.accounts && window.google.accounts.id) {
                clearInterval(checkGoogle);
                isGoogleLoaded = true;
                resolve();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkGoogle);
                reject(new Error("Google Identity Services failed to load"));
            }
        }, 100);
    });
}

function handleCredentialResponse(response) {
    googleToken = response.credential;
    googleUser = parseJwt(googleToken);
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) sendBtn.disabled = false;

    hideGoogleOverlay();
    showNotification(`Signed in as ${googleUser.email}`, "success");
}

window.handleCredentialResponse = handleCredentialResponse;

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
}

export async function initContact() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    try {
        await waitForGoogle();

        google.accounts.id.initialize({
            client_id: "1010543233965-80cp9ko0qt4vtolkeabmmf483vsgs4ll.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            auto_select: true,
        });

        google.accounts.id.prompt();

    } catch (error) {
        enableFormAndHideOverlay("Form ready (Google sign-in skipped)");
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = {
            token: googleToken,
            name: form.name.value.trim() || (googleUser ? googleUser.name : ""),
            phone: form.phone.value.trim(),
            company: form.company.value.trim(),
            service: form.service.value.trim(),
            message: form.message.value.trim(),
            secret: "z3"
        };

        if (!validateForm(formData)) return;
        await submitForm(contactForm, formData);
    });
}

function hideGoogleOverlay() {
    const googleOverlay = document.querySelector(".google");
    if (googleOverlay) {
        googleOverlay.classList.add("hidden");
        setTimeout(() => (googleOverlay.style.display = "none"), 400);
    }

    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) sendBtn.disabled = false;
}

function enableFormAndHideOverlay(msg) {
    hideGoogleOverlay();
    if (msg) showNotification(msg, "info");
}

async function submitForm(contactForm, formData) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const endpoint = "https://script.google.com/macros/s/AKfycbymCpg0NATb0ymqmPMb0Xh_UfdL5Bc1O3ABUIrZYxpUm1s91mJSbo-GRFdjBRth6F3f/exec";

    try {
        const response = await fetch(endpoint, {
            redirect: 'follow',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        if (result.success) {
            showNotification(result.message, "success");
            contactForm.reset();
        } else {
            showNotification(result.message, "error");
        }

    } catch (err) {
        console.error("Form submission error:", err);
        showNotification("Failed to send message. Please try again later.", "error");
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
}

function validateForm(formData) {
    if (!formData.message) {
        showNotification("Message is required.", "error");
        return false;
    }
    return true;
}

function showNotification(message, type) {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}
