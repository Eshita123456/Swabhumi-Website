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
// 🔥 HAMBURGER MENU TOGGLE
// ===============================
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (!nav) return;

  nav.classList.toggle("active");
}


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
// 🔥 POPUP AUTO OPEN (2 sec delay + once only)
// ===============================
window.addEventListener("load", function () {

  const popup = document.getElementById("popup");
  if (!popup) return;

  // show only once
  if (!localStorage.getItem("popupShown")) {

    setTimeout(() => {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden"; // lock scroll
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
  document.body.style.overflow = "auto"; // unlock scroll
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