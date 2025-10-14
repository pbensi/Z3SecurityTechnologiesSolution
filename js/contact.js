function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        container.removeChild(toast);
    }, 3000);
}

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector("button[type='submit']");
    const btnText = submitButton.querySelector(".btn-text");
    const btnSpinner = submitButton.querySelector(".btn-spinner");

    submitButton.disabled = true;
    btnText.style.display = "none";
    btnSpinner.style.display = "inline-block";

    const beforeUnloadHandler = (event) => {
        event.preventDefault();
        event.returnValue = "Your message is being sent. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        company: form.company.value,
        service: form.service.value,
        message: form.message.value,
        secret: "Z3 Security Technologies Solutions"
    };

    const endpoint = "https://script.google.com/macros/s/AKfycbyw2XqgPv0Kjsps_UPGIklihhEWzFWYr0s_keS9Y-Sxm2rK5NbRB5DsagI4l5jpaVZK/exec";

    try {
        const response = await fetch(endpoint, {
            redirect: 'follow',
            method: "POST",
            body: JSON.stringify(formData),
            headers:
            {
                "Content-Type": "application/json",
                "Content-Type": "text/plain;charset=utf-8"
            }
        });

        const data = await response.json();

        if (data.success) {
            showToast(data.message, "success");
            form.reset();
        } else {
            showToast(data.message, "error");
        }
    } catch (err) {
        console.error(err);
        showToast("Failed to send message.", "error");
    } finally {
        submitButton.disabled = false;
        btnSpinner.style.display = "none";
        btnText.style.display = "inline";
        window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
});