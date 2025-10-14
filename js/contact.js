document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Sending...';

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
    await fetch("https://script.google.com/macros/s/AKfycbxIfggoMZsYksmkJe8_z4MMGKqT9sfC53U6z0xCIu0QCR5zv_8nIxHIVLEe4QtQwCuT/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    form.innerHTML = "<p style='color:green;'>✅ Message sent successfully! Thank you.</p>";
  } catch (err) {
    console.error(err);
    form.innerHTML = "<p style='color:red;'>⚠️ Failed to send message. Please try again later.</p>";
  }
});