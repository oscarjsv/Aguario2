// ===================================
// PQRS Form - Premium JavaScript
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const form = document.getElementById("pqrsForm");
  const mensaje = document.getElementById("mensaje");
  const charCount = document.querySelector(".char-count");
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const successMessage = document.getElementById("successMessage");

  // Character Counter
  if (mensaje && charCount) {
    mensaje.addEventListener("input", () => {
      const count = mensaje.value.length;
      charCount.textContent = `${count} / 1000`;

      // Visual feedback
      if (count > 900) {
        charCount.style.color = "#ef4444";
      } else if (count > 700) {
        charCount.style.color = "#f59e0b";
      } else {
        charCount.style.color = "inherit";
      }
    });
  }

  // Form Validation & Submit
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Validate
      if (!validateForm(data)) {
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
                <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                Enviando...
            `;
      submitBtn.disabled = true;

      // Simulate API call (replace with actual endpoint)
      await simulateSubmit(data);

      // Generate radicado number
      const radicado = generateRadicado();

      // Show success message
      showSuccess(radicado);

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Reset form
      form.reset();
      if (charCount) charCount.textContent = "0 / 1000";
    });
  }

  // Hamburger Menu
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Initial check

  // Input Focus Animations
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
    });
  });
});

// Form Validation
function validateForm(data) {
  let isValid = true;
  const errors = [];

  // Required fields
  if (!data.tipo) {
    errors.push("Por favor selecciona el tipo de solicitud");
    isValid = false;
  }

  if (!data.nombre || data.nombre.length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres");
    isValid = false;
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Por favor ingresa un correo electrónico válido");
    isValid = false;
  }

  if (!data.asunto || data.asunto.length < 5) {
    errors.push("El asunto debe tener al menos 5 caracteres");
    isValid = false;
  }

  if (!data.mensaje || data.mensaje.length < 20) {
    errors.push("El mensaje debe tener al menos 20 caracteres");
    isValid = false;
  }

  if (!data.terminos) {
    errors.push("Debes aceptar los términos y condiciones");
    isValid = false;
  }

  // Show errors
  if (!isValid) {
    showErrors(errors);
  }

  return isValid;
}

// Email Validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show Errors
function showErrors(errors) {
  const errorHtml = `
        <div class="error-toast">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
                <strong>Por favor corrige los siguientes errores:</strong>
                <ul>${errors.map((err) => `<li>${err}</li>`).join("")}</ul>
            </div>
        </div>
    `;

  // Remove existing toasts
  document.querySelectorAll(".error-toast").forEach((el) => el.remove());

  // Add new toast
  document.body.insertAdjacentHTML("beforeend", errorHtml);

  // Auto remove after 5 seconds
  setTimeout(() => {
    document.querySelector(".error-toast")?.remove();
  }, 5000);
}

// Show Success
function showSuccess(radicado) {
  const successMsg = document.getElementById("successMessage");
  const radicadoEl = document.getElementById("radicado");

  if (successMsg && radicadoEl) {
    radicadoEl.textContent = radicado;
    successMsg.style.display = "block";
    successMsg.scrollIntoView({ behavior: "smooth", block: "center" });

    // Auto hide after 10 seconds
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 10000);
  }
}

// Generate Radicado Number
function generateRadicado() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `PQRS-${year}${month}${day}-${random}`;
}

// Simulate API Submit
async function simulateSubmit(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form submitted:", data);
      resolve();
    }, 1500);
  });
}

// Add spinner animation
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .spinner {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
