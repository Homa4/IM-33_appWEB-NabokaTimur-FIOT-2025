document.addEventListener("DOMContentLoaded", () => {
  /* ===== БУРГЕР-МЕНЮ ===== */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Закриття меню при кліку по пункту
    navLinks.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ===== ПЛАВНИЙ СКРОЛ ДО ЯКОРІВ ===== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* ===== ПРОСТА ВАЛІДАЦІЯ ФОРМИ ===== */
  const form = document.querySelector(".contact-form");
  if (form) {
    const requiredFields = ["name", "email", "service", "message"];
    const statusEl = form.querySelector(".form-status");

    form.addEventListener("submit", (e) => {
      let isValid = true;

      requiredFields.forEach((fieldName) => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const group = field?.closest(".form-group");
        const error = form.querySelector(
          `.error-message[data-for="${fieldName}"]`
        );

        if (!field || !group || !error) return;

        group.classList.remove("invalid");
        error.textContent = "";

        const value = field.value.trim();

        if (!value) {
          isValid = false;
          group.classList.add("invalid");
          error.textContent = "This field is required.";
          return;
        }

        if (fieldName === "email" && !isValidEmail(value)) {
          isValid = false;
          group.classList.add("invalid");
          error.textContent = "Please enter a valid email address.";
        }
      });

      if (!isValid) {
        e.preventDefault();
        if (statusEl) {
          statusEl.textContent =
            "Please correct the highlighted fields and try again.";
        }
        return;
      }

      // Імітація успішної відправки форми (без реального бекенду)
      e.preventDefault();
      if (statusEl) {
        statusEl.textContent =
          "Your message has been sent successfully (demo mode).";
      }
      form.reset();
    });
  }

  function isValidEmail(email) {
    // Дуже проста перевірка формату email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
