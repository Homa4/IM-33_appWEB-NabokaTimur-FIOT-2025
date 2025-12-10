document.addEventListener("DOMContentLoaded", function () {
  const navBtn = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (navBtn && navMenu) {
    navBtn.onclick = function () {
      navMenu.classList.toggle("open");
    };

    const links = navMenu.querySelectorAll("a");
    links.forEach(function (link) {
      link.onclick = function () {
        navMenu.classList.remove("open");
      };
    });
  }

  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (item) {
    item.onclick = function (e) {
      const hash = this.getAttribute("href");
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    };
  });

  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");

  const popup = document.querySelector(".popup");
  const popupBtn = document.querySelector(".popup-close");

  function showPopup() {
    popup.classList.add("show");
  }
  if (popupBtn) {
    popupBtn.onclick = function () {
      popup.classList.remove("show");
    };
  }

  function saveToStorage() {
    localStorage.setItem(
      "contactData",
      JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        service: form.service.value,
        budget: form.budget.value,
        message: form.message.value,
      })
    );
  }

  function loadFromStorage() {
    const saved = localStorage.getItem("contactData");
    if (!saved) return;

    const data = JSON.parse(saved);
    form.name.value = data.name || "";
    form.email.value = data.email || "";
    form.phone.value = data.phone || "";
    form.service.value = data.service || "";
    form.budget.value = data.budget || "";
    form.message.value = data.message || "";
  }

  if (form) {
    loadFromStorage();

    form.oninput = saveToStorage;

    form.onsubmit = function () {
      console.log("📩 Form data saved:", localStorage.getItem("contactData"));

      if (status) {
        status.textContent = "";
      }

      showPopup();
      form.reset();
      localStorage.removeItem("contactData");

      return false;
    };
  }
});
