
let googleToken = "";
let googleUser = null;
let isGoogleLoaded = false;
let googleInitialized = false;

function waitForGoogle() {
    return new Promise((resolve, reject) => {
        if (window.google?.accounts?.id) {
            isGoogleLoaded = true;
            resolve();
            return;
        }

        const maxAttempts = 50;
        let attempts = 0;

        const checkGoogle = setInterval(() => {
            attempts++;
            if (window.google?.accounts?.id) {
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
    if (!response?.credential) {
        return;
    }

    try {
        googleToken = response.credential;
        googleUser = parseJwt(googleToken);

        hideGoogleOverlay();
        enableForm();

        showNotification(`Signed in as ${googleUser.email}`, "success");
    } catch (err) {
        console.error("Error parsing Google token:", err);
    }
}

window.handleCredentialResponse = handleCredentialResponse;

export async function initContact() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) {
        return;
    }

    disableForm();

    try {
        await waitForGoogle();

        if (!googleInitialized) {
            google.accounts.id.initialize({
                client_id: "1010543233965-80cp9ko0qt4vtolkeabmmf483vsgs4ll.apps.googleusercontent.com",
                callback: handleCredentialResponse,
                auto_select: true,
            });
            googleInitialized = true;
        }
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {

            }
        });

        let retries = 0;
        const maxRetries = 15;
        const checkInterval = setInterval(() => {
            retries++;
            if (googleUser && googleToken) {
                hideGoogleOverlay();
                enableForm();
                clearInterval(checkInterval);
            } else if (retries >= maxRetries) {
                clearInterval(checkInterval);
            }
        }, 200);
    } catch (error) {
        console.error("Google Sign-In load error:", error);
    }

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!googleUser || !googleToken) {
            return;
        }

        const form = e.target;
        const formData = {
            token: googleToken,
            name: form.name.value.trim() || googleUser.name || "",
            phone: form.phone.value.trim(),
            company: form.company.value.trim(),
            service: form.service.value.trim(),
            message: form.message.value.trim(),
            secret: "z3",
        };

        if (!validateForm(formData)) return;
        await submitForm(contactForm, formData);
    });
}

async function submitForm(contactForm, formData) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const endpoint = "https://script.google.com/macros/s/AKfycbymCpg0NATb0ymqmPMb0Xh_UfdL5Bc1O3ABUIrZYxpUm1s91mJSbo-GRFdjBRth6F3f/exec";

    try {
        const response = await fetch(endpoint, {
            redirect: "follow",
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Content-Type": "text/plain;charset=utf-8"
            },
        });

        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

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

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
    return JSON.parse(jsonPayload);
}

function hideGoogleOverlay() {
    const overlay = document.querySelector(".google");
    if (!overlay || overlay.classList.contains("hidden")) return;

    overlay.classList.add("hidden");
    setTimeout(() => (overlay.style.display = "none"), 400);
}

function showNotification(message, type) {
    const existing = document.querySelectorAll(".notification");
    existing.forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}