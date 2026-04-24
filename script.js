let slides = document.querySelectorAll(".slides img");
let dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
  });
});

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 3000);
