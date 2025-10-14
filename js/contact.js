document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById("statusMsg");

  status.textContent = "⏳ Sending...";

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    company: form.company.value,
    service: form.service.value,
    message: form.message.value,
    secret: "Z3 Security Technologies Solutions" // must match your script
  };

  try {
    await fetch("https://script.google.com/macros/s/AKfycbxIfggoMZsYksmkJe8_z4MMGKqT9sfC53U6z0xCIu0QCR5zv_8nIxHIVLEe4QtQwCuT/exec", {
      method: "POST",
      mode: "no-cors", // prevents browser CORS errors
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    status.textContent = "✅ Message sent successfully!";
    form.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "⚠️ Failed to send message. Please try again.";
  }
});