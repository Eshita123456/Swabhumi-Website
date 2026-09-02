// =========================================
// PAGE LOADER START (NProgress)
// =========================================
if (typeof NProgress !== "undefined") {
    NProgress.configure({
        showSpinner: false,
        minimum: 0.08,
        easing: "ease",
        speed: 500,
        trickleSpeed: 120
    });

    NProgress.start();
}


// =========================================
// DOM READY
// =========================================
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ELEMENTS
    // =====================================

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("navMenu");
    const links = document.querySelectorAll("#navMenu a");

    const dropBtn = document.querySelector(".drop-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");



    // =====================================
    // NAVBAR SCROLL
    // =====================================

    window.addEventListener("scroll", function () {

        if (navbar) {

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        }

    });



    // =====================================
    // MOBILE MENU
    // =====================================

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("open");

        });

    }



    // =====================================
    // CLOSE MENU AFTER CLICK
    // =====================================

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            if (menuToggle) {

                menuToggle.classList.remove("open");

            }

        });

    });



    // =====================================
    // MOBILE DROPDOWN
    // =====================================

    if (dropBtn && dropdownMenu) {

        dropBtn.addEventListener("click", function (e) {

            if (window.innerWidth <= 768) {

                e.preventDefault();

                dropdownMenu.classList.toggle("show");

            }

        });

    }



    // =====================================
    // GALLERY LIGHTBOX
    // =====================================

    const images = document.querySelectorAll(".gallery-grid img");

    images.forEach(function (img) {

        img.addEventListener("click", function () {

            const popup = document.createElement("div");

            popup.className = "img-popup";

            popup.innerHTML = `
                <span class="close">&times;</span>
                <img src="${img.src}" class="popup-img">
            `;

            document.body.appendChild(popup);

            document.body.style.overflow = "hidden";

            popup.addEventListener("click", function () {

                popup.remove();

                document.body.style.overflow = "auto";

            });

        });

    });



    // =====================================
    // COUNTER ANIMATION
    // =====================================

    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const counter = entry.target;

                const target = parseInt(counter.dataset.target);

                let current = 0;

                const increment = target / 120;

                function updateCounter() {

                    current += increment;

                    if (current < target) {

                        if (target === 100) {

                            counter.innerHTML = Math.ceil(current) + "k+";

                        }

                        else {

                            counter.innerHTML = Math.ceil(current) + "+";

                        }

                        requestAnimationFrame(updateCounter);

                    }

                    else {

                        if (target === 100) {

                            counter.innerHTML = "100k+";

                        }

                        else {

                            counter.innerHTML = target + "+";

                        }

                    }

                }

                updateCounter();

                observer.unobserve(counter);

            }

        });

    }, {

        threshold: 0.5

    });



    counters.forEach(function (counter) {

        observer.observe(counter);

    });



    // =====================================
    // AOS INITIALIZE
    // =====================================

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 1000,
            once: true,
            offset: 120,
            easing: "ease-in-out",
            mirror: false

        });

    }

});



// =========================================
// PAGE LOADER COMPLETE
// =========================================

window.addEventListener("load", function () {

    if (typeof NProgress !== "undefined") {

        setTimeout(function () {

            NProgress.done();

        }, 400);

    }

});

// =========================================
// WHATSAPP FORM
// =========================================

function sendWhatsApp() {

    const name = document.getElementById("name")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";

    if (name === "" || phone === "") {

        alert("Please enter your Name and Phone Number.");

        return;

    }

    const message =
        `Hello, I'm interested in your project.

Name : ${name}

Phone : ${phone}

Email : ${email}

Please share complete details.`;

    const whatsappURL =
        "https://wa.me/917001667551?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}



// =========================================
// OPEN POPUP
// =========================================

function openPopup() {

    const popup = document.getElementById("popup");

    if (!popup) return;

    popup.style.display = "flex";
    document.body.style.overflow = "hidden";

}



// =========================================
// CLOSE POPUP
// =========================================

function closePopup() {

    const popup = document.getElementById("popup");

    if (!popup) return;

    popup.style.display = "none";
    document.body.style.overflow = "auto";

}



// =========================================
// AUTO POPUP
// =========================================

window.addEventListener("load", function () {

    const popup = document.getElementById("popup");

    if (!popup) return;

    if (!localStorage.getItem("popupShown")) {

        setTimeout(function () {

            popup.style.display = "flex";
            document.body.style.overflow = "hidden";

        }, 2000);

        localStorage.setItem("popupShown", "true");

    }

});



// =========================================
// CLICK OUTSIDE CLOSE
// =========================================

window.addEventListener("click", function (e) {

    const popup = document.getElementById("popup");

    if (popup && e.target === popup) {

        closePopup();

    }

});



// =========================================
// ESC KEY CLOSE
// =========================================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closePopup();

    }

});



// =========================================
// CLOSE POPUP BUTTON
// =========================================

const closeBtn = document.querySelector(".popup-close");

if (closeBtn) {

    closeBtn.addEventListener("click", closePopup);

}



// =========================================
// PAGE LOADER (NPROGRESS)
// =========================================

if (typeof NProgress !== "undefined") {

    NProgress.configure({

        minimum: 0.08,
        easing: "ease",
        speed: 600,
        showSpinner: false,
        trickleSpeed: 120

    });

    NProgress.start();

}



// =========================================
// WINDOW LOAD COMPLETE
// =========================================

window.addEventListener("load", function () {

    if (typeof NProgress !== "undefined") {

        setTimeout(function () {

            NProgress.done();

        }, 400);

    }

});



// =========================================
// SMOOTH SCROLL
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        window.scrollTo({

            top: target.offsetTop - 80,
            behavior: "smooth"

        });

    });

});

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ==========================================
           ELEMENTS
        ========================================== */

        const slider =
            document.getElementById(
                "projectsGrid"
            );

        const cards =
            Array.from(
                document.querySelectorAll(
                    ".project-card1"
                )
            );

        const prevBtn =
            document.getElementById(
                "prevProject"
            );

        const nextBtn =
            document.getElementById(
                "nextProject"
            );

        const dotsContainer =
            document.getElementById(
                "projectSliderDots"
            );

        const projectCount =
            document.getElementById(
                "projectCount"
            );


        let currentIndex = 0;


        /* ==========================================
           GET VISIBLE CARDS
        ========================================== */

        function getVisibleCards() {

            if (
                window.innerWidth <= 768
            ) {

                return 1;

            }


            if (
                window.innerWidth <= 992
            ) {

                return 2;

            }


            return 3;

        }


        /* ==========================================
           GET TOTAL SLIDES
        ========================================== */

        function getTotalSlides() {

            const visibleCards =
                getVisibleCards();

            const totalCards =
                cards.length;

            return Math.max(
                1,
                Math.ceil(
                    totalCards /
                    visibleCards
                )
            );

        }


        /* ==========================================
           CREATE DOTS
        ========================================== */

        function createDots() {

            dotsContainer.innerHTML = "";

            const totalSlides =
                getTotalSlides();


            for (
                let i = 0;
                i < totalSlides;
                i++
            ) {

                const dot =
                    document.createElement(
                        "button"
                    );

                dot.type = "button";

                dot.className =
                    "project-dot";


                if (i === 0) {

                    dot.classList.add(
                        "active"
                    );

                }


                dot.addEventListener(
                    "click",
                    function () {

                        currentIndex = i;

                        updateSlider();

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }

        }


        /* ==========================================
           UPDATE SLIDER
        ========================================== */

        function updateSlider() {

            const visibleCards =
                getVisibleCards();

            const totalSlides =
                getTotalSlides();


            /* Keep index valid */

            if (
                currentIndex >
                totalSlides - 1
            ) {

                currentIndex =
                    totalSlides - 1;

            }


            if (
                currentIndex < 0
            ) {

                currentIndex = 0;

            }


            /* =====================================
               CALCULATE MOVEMENT
            ===================================== */

            if (
                cards.length === 0
            ) {

                return;

            }


            const cardWidth =
                cards[0].getBoundingClientRect()
                    .width;


            const gap = 24;


            const moveAmount =
                (
                    cardWidth + gap
                ) *
                visibleCards *
                currentIndex;


            slider.style.transform =
                "translateX(-" +
                moveAmount +
                "px)";


            /* =====================================
               BUTTON STATES
            ===================================== */

            prevBtn.disabled =
                currentIndex === 0;


            nextBtn.disabled =
                currentIndex >=
                totalSlides - 1;


            /* =====================================
               UPDATE DOTS
            ===================================== */

            const dots =
                dotsContainer.querySelectorAll(
                    ".project-dot"
                );


            dots.forEach(
                function (
                    dot,
                    index
                ) {

                    dot.classList.toggle(
                        "active",
                        index ===
                        currentIndex
                    );

                }
            );

        }


        /* ==========================================
           NEXT
        ========================================== */

        if (nextBtn) {
            nextBtn.addEventListener(
                "click",
                function () {

                    const totalSlides = getTotalSlides();

                    if (currentIndex < totalSlides - 1) {
                        currentIndex++;
                        updateSlider();
                    }

                }
            );

        }


        /* ==========================================
           PREVIOUS
        ========================================== */

        prevBtn.addEventListener(
            "click",
            function () {

                if (
                    currentIndex > 0
                ) {

                    currentIndex--;

                    updateSlider();

                }

            }
        );


        /* ==========================================
           FILTERS
        ========================================== */

        const projectFilter =
            document.getElementById(
                "projectFilter"
            );

        const typeFilter =
            document.getElementById(
                "typeFilter"
            );

        const budgetFilter =
            document.getElementById(
                "budgetFilter"
            );

        const locationFilter =
            document.getElementById(
                "locationFilter"
            );


        function applyFilters() {

            const projectValue =
                projectFilter.value;

            const typeValue =
                typeFilter.value;

            const budgetValue =
                budgetFilter.value;

            const locationValue =
                locationFilter.value;


            let visibleCount = 0;


            cards.forEach(
                function (card) {

                    const project =
                        card.dataset.project;

                    const type =
                        card.dataset.type;

                    const budget =
                        card.dataset.budget;

                    const location =
                        card.dataset.location;


                    const projectMatch =
                        !projectValue ||
                        project ===
                        projectValue;


                    const typeMatch =
                        !typeValue ||
                        type ===
                        typeValue;


                    const budgetMatch =
                        !budgetValue ||
                        budget ===
                        budgetValue;


                    const locationMatch =
                        !locationValue ||
                        location ===
                        locationValue;


                    const show =
                        projectMatch &&
                        typeMatch &&
                        budgetMatch &&
                        locationMatch;


                    if (show) {

                        card.style.display =
                            "block";

                        visibleCount++;

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                }
            );


            projectCount.textContent =
                visibleCount;


            /*
             * Recalculate slider after filter
             */

            currentIndex = 0;

            createDots();

            updateSlider();

        }


        projectFilter.addEventListener(
            "change",
            applyFilters
        );

        typeFilter.addEventListener(
            "change",
            applyFilters
        );

        budgetFilter.addEventListener(
            "change",
            applyFilters
        );

        locationFilter.addEventListener(
            "change",
            applyFilters
        );


        /* ==========================================
           RESIZE
        ========================================== */

        window.addEventListener(
            "resize",
            function () {

                currentIndex = 0;

                createDots();

                updateSlider();

            }
        );


        /* ==========================================
           INITIALIZE
        ========================================== */

        createDots();

        updateSlider();


    }
);

// =========================================
// BACK TO TOP BUTTON
// =========================================

const backTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {

    if (!backTop) return;

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}



// =========================================
// STATS CARD HOVER EFFECT
// =========================================

document.querySelectorAll(".stat-card").forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        this.style.transform = "translateY(-10px)";
        this.style.transition = ".4s";

    });

    card.addEventListener("mouseleave", function () {

        this.style.transform = "translateY(0)";

    });

});



// =========================================
// ICON POP ANIMATION
// =========================================

document.querySelectorAll(".icon-box").forEach(function (icon) {

    icon.addEventListener("mouseenter", function () {

        this.style.transform = "scale(1.15) rotate(8deg)";
        this.style.transition = ".4s";

    });

    icon.addEventListener("mouseleave", function () {

        this.style.transform = "scale(1) rotate(0deg)";

    });

});



// =========================================
// BUTTON RIPPLE EFFECT
// =========================================

document.querySelectorAll("button").forEach(function (btn) {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = btn.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        btn.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

// ===============================
// CUSTOM PAGE LOADER
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    const bar = document.querySelector(".loader-bar");

    if (!bar) return;

    let width = 0;

    const loading = setInterval(() => {

        width += Math.random() * 8;

        if (width < 90) {
            bar.style.width = width + "%";
        }

    }, 80);

    window.addEventListener("load", () => {

        clearInterval(loading);

        bar.style.width = "100%";

        setTimeout(() => {

            document.getElementById("page-loader").style.opacity = "0";
            document.getElementById("page-loader").style.transition = ".4s";

            setTimeout(() => {

                document.getElementById("page-loader").remove();

            }, 400);

        }, 300);

    });

});

// ===============================
// CUSTOM PAGE LOADER
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    const bar = document.querySelector(".loader-bar");

    if (!bar) return;

    let width = 0;

    const loading = setInterval(() => {

        width += Math.random() * 8;

        if (width < 90) {
            bar.style.width = width + "%";
        }

    }, 80);

    window.addEventListener("load", () => {

        clearInterval(loading);

        bar.style.width = "100%";

        setTimeout(() => {

            document.getElementById("page-loader").style.opacity = "0";
            document.getElementById("page-loader").style.transition = ".4s";

            setTimeout(() => {

                document.getElementById("page-loader").remove();

            }, 400);

        }, 300);

    });

});

/// ===============================
// PREMIUM PAGE LOADER
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("page-loader");
    const bar = document.querySelector(".loader-bar");

    if (!loader || !bar) return;

    bar.style.width = "0%";
    bar.style.transition = "none";

    setTimeout(() => {
        bar.style.transition = "width 1.2s cubic-bezier(.22,.61,.36,1)";
        bar.style.width = "30%";
    }, 150);

    setTimeout(() => {
        bar.style.transition = "width 1.4s cubic-bezier(.22,.61,.36,1)";
        bar.style.width = "55%";
    }, 1200);

    setTimeout(() => {
        bar.style.transition = "width 1.6s cubic-bezier(.22,.61,.36,1)";
        bar.style.width = "75%";
    }, 2700);

    setTimeout(() => {
        bar.style.transition = "width 2s cubic-bezier(.22,.61,.36,1)";
        bar.style.width = "90%";
    }, 4500);

});


// ===============================
// REMOVE PAGE LOADER
// ===============================

window.addEventListener("load", () => {

    const loader = document.getElementById("page-loader");
    const bar = document.querySelector(".loader-bar");

    if (!loader || !bar) return;

    bar.style.transition = "width .8s ease";
    bar.style.width = "100%";

    setTimeout(() => {

        // Check again because loader may already have been removed
        const currentLoader = document.getElementById("page-loader");

        if (!currentLoader) return;

        currentLoader.style.transition = "opacity .5s ease";
        currentLoader.style.opacity = "0";

        setTimeout(() => {

            const loaderToRemove = document.getElementById("page-loader");

            if (loaderToRemove) {
                loaderToRemove.remove();
            }

        }, 500);

    }, 600);

});


// =========================================
// END OF SCRIPT
// =========================================