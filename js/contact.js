function initContact() {
    const ENDPOINT = "https://script.google.com/macros/s/AKfycbxIfggoMZsYksmkJe8_z4MMGKqT9sfC53U6z0xCIu0QCR5zv_8nIxHIVLEe4QtQwCuT/exec";
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!contactForm || !formSuccess) return;

    const formFields = contactForm.querySelectorAll('.form__field');

    formFields.forEach(field => {
        const label = field.nextElementSibling;

        if (field.value && label) {
            label.classList.add('active');
        }

        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', () => {
            field.parentElement.classList.toggle('focused', !!field.value);
        });

        field.addEventListener('input', () => {
            if (label) label.classList.toggle('active', !!field.value);
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            company: form.company.value.trim(),
            service: form.service.value.trim(),
            message: form.message.value.trim()
        };

        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        formSuccess.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending message...`;
        formSuccess.classList.add('show');

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            if (json && json.success) {
                formSuccess.innerHTML = `<i class="fas fa-check-circle" aria-hidden="true"></i> Thank you for your message! We'll get back to you soon.`;
                formSuccess.classList.add('show');

                contactForm.reset();
                formFields.forEach(field => {
                    const label = field.nextElementSibling;
                    if (label) label.classList.remove('active');
                    field.parentElement.classList.remove('focused');
                });

                setTimeout(() => {
                    formSuccess.classList.remove('show');
                    formSuccess.innerHTML = '';
                }, 3000);
            } else {
                formSuccess.innerHTML = `<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again later.`;
                formSuccess.classList.add('show');
            }
        } catch (err) {
            formSuccess.innerHTML = `<i class="fas fa-times-circle"></i> Error sending message: ${err.message}`;
            formSuccess.classList.add('show');
        }

        console.log('Form submitted:', data);
    });
}