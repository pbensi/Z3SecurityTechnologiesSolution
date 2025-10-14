document.getElementById("contactForm").addEventListener("submit", async function(e) {
      e.preventDefault();

      const form = e.target;
      const status = document.getElementById("formSuccess");
      status.textContent = "⏳ Sending...";

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        company: form.company.value,
        service: form.service.value,
        message: form.message.value,
        secret: "Z3 Security Technologies Solutions"
      };

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyw2XqgPv0Kjsps_UPGIklihhEWzFWYr0s_keS9Y-Sxm2rK5NbRB5DsagI4l5jpaVZK/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (data.success) {
          status.textContent = "✅ Message sent successfully!";
          form.reset();
        } else {
          status.textContent = "⚠️ " + data.message;
        }
      } catch (error) {
        console.error(error);
        status.textContent = "⚠️ Failed to send message.";
      }
    });