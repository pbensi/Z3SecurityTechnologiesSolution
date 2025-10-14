  window.addEventListener("message", function(e) {
    if (e.data && e.data.message) {
      const status = document.getElementById("formSuccess");
      status.textContent = e.data.message;
      if (e.data.success) {
        document.getElementById("contactForm").reset();
      }
    }
  }, false);