// ===============================
// 🔥 NAVBAR SCROLL EFFECT
// ===============================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===============================
// 🔥 HAMBURGER MENU TOGGLE (FIXED)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("open"); // optional animation
    });
  }

});


// ===============================
// 🔥 CLOSE MENU ON LINK CLICK
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("#navMenu a");
  const nav = document.getElementById("navMenu");

  links.forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("active");
    });
  });
});


// ===============================
// 🔥 DROPDOWN CLICK (MOBILE FIX)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  const dropBtn = document.querySelector(".drop-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropBtn && dropdownMenu) {
    dropBtn.addEventListener("click", function (e) {

      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");
      }

    });
  }

});


// ===============================
// 🔥 POPUP AUTO OPEN (2 sec delay + once only)
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
// 🔥 POPUP CLOSE FUNCTION
// ===============================
function closePopup() {
  const popup = document.getElementById("popup");
  if (!popup) return;

  popup.style.display = "none";
  document.body.style.overflow = "auto";
}


// ===============================
// 🔥 CLICK OUTSIDE POPUP CLOSE
// ===============================
window.addEventListener("click", function (e) {
  const popup = document.getElementById("popup");

  if (!popup) return;

  if (e.target === popup) {
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