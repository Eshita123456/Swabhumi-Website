// ===============================
// 🔥 DOM READY (ALL IN ONE)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("navMenu");
  const links = document.querySelectorAll("#navMenu a");
  const dropBtn = document.querySelector(".drop-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");


  // ===============================
  // 🔥 NAVBAR SCROLL EFFECT
  // ===============================
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });


  // ===============================
  // 🔥 HAMBURGER MENU
  // ===============================
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });
  }


  // ===============================
  // 🔥 CLOSE MENU ON CLICK
  // ===============================
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
    });
  });


  // ===============================
  // 🔥 MOBILE DROPDOWN
  // ===============================
  if (dropBtn && dropdownMenu) {
    dropBtn.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
      }
    });
  }


  // ===============================
  // 🔥 GALLERY LIGHTBOX (NEW 🔥)
  // ===============================
  const images = document.querySelectorAll(".gallery-grid img");

  images.forEach(img => {
    img.addEventListener("click", () => {
      const popup = document.createElement("div");
      popup.classList.add("img-popup");

      popup.innerHTML = `
        <span class="close">&times;</span>
        <img src="${img.src}" class="popup-img">
      `;

      document.body.appendChild(popup);
      document.body.style.overflow = "hidden";

      popup.addEventListener("click", () => {
        popup.remove();
        document.body.style.overflow = "auto";
      });
    });
  });

});


// ===============================
// 🔥 VIDEO PLAY FUNCTION
// ===============================
function playVideo() {
  const video = document.getElementById("siteVideo");
  const btn = document.querySelector(".play-btn");

  if (video) {
    video.play();
    video.controls = true;
  }

  if (btn) btn.style.display = "none";
}


// ===============================
// 🔥 WHATSAPP FORM FUNCTION
// ===============================
function sendWhatsApp() {

  const name = document.getElementById("name")?.value || "";
  const phone = document.getElementById("phone")?.value || "";
  const email = document.getElementById("email")?.value || "";

  const message = `Hello, I'm interested in your project.

Name: ${name}
Phone: ${phone}
Email: ${email}`;

  const url = "https://wa.me/917001667551?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}


// ===============================
// 🔥 LAYOUT UNLOCK
// ===============================
function openPopup() {
  const popup = document.getElementById("popup");

  if (popup) {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}


// ===============================
// 🔥 POPUP AUTO OPEN
// ===============================
window.addEventListener("load", function () {

  const popup = document.getElementById("popup");
  if (!popup) return;

  if (!localStorage.getItem("popupShown")) {

    setTimeout(() => {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    }, 2000);

    localStorage.setItem("popupShown", "true");
  }
});


// ===============================
// 🔥 POPUP CLOSE
// ===============================
function closePopup() {
  const popup = document.getElementById("popup");

  if (!popup) return;

  popup.style.display = "none";
  document.body.style.overflow = "auto";
}


// ===============================
// 🔥 CLICK OUTSIDE CLOSE
// ===============================
window.addEventListener("click", function (e) {
  const popup = document.getElementById("popup");

  if (popup && e.target === popup) {
    closePopup();
  }
});


// ===============================
// 🔥 ESC KEY CLOSE
// ===============================
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePopup();
  }
});