document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelectorAll(".burger");
  const cancelIcon = document.querySelector(".fa-xmark");
  const offcanvas = document.querySelector(".offcanvas");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const dropdownMenu = document.querySelectorAll(".dropdown-menu");

  // -------------------------------------------------------

  // ================= Navbar Hamburger Functionality =========================>

  // Toggle offcanvas menu for mobile
  burger.forEach((item) => {
    item.addEventListener("click", function () {
      offcanvas.classList.toggle("open");
    });
  });

  cancelIcon.addEventListener("click", function () {
    dropdownMenu.forEach((item) => {
      item.style.display = item.classList.contains("show") ? "none" : "none";
    });
  });

  // -------------------------------------------------------

  // Toggle dropdown menus on click for both desktop and mobile
  dropdownToggles.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle("show");
      dropdownMenu.style.display = dropdownMenu.classList.contains("show")
        ? "block"
        : "none";
    });
  });
});

// ================= Images Swiping Animation =========================>

const swiper = new Swiper(".mySwiper", {
  crossFade: true,
  effect: "fade",
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ================= Number Running Animation =========================>

const AnimationOfNumbers = () => {
  const countNumber = document.querySelectorAll(".counter_number");
  const speed = 200;

  countNumber.forEach((curElem) => {
    const updateNumber = () => {
      const initialNumber = parseInt(curElem.textContent);
      const targetNumber = parseInt(curElem.dataset.number);

      // Calculate the increment number
      const incrementNumber = Math.trunc(targetNumber / speed);

      if (initialNumber < targetNumber) {
        // Update the text content with the incremented number
        curElem.innerText = `${initialNumber + incrementNumber} +`;
      } else {
        // If the initial number is greater or equal to the target, clear the interval
        clearInterval(interval);
      }
    };

    // Set an interval and store its ID to clear it later
    const interval = setInterval(updateNumber, 10);
  });
};

// ================= Creating Sticky Navbar =========================>

const hading = document.querySelector(".observation");
const logo = document.querySelector(".logo");
const observer = new IntersectionObserver(
  (entries, observe) => {
    const [entry] = entries;
    console.log(entry);
    if (entry.isIntersecting) {
      document.body.classList.add("sticky");
      console.log((logo.src = "img/logo2.png"));
    } else {
      document.body.classList.remove("sticky");
      console.log((logo.src = "img/logo2.png"));
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

observer.observe(hading);

// ================= Smooth Scrolling Animation =========================>

const workSection = document.querySelector(".numbers");
console.log(workSection);

const workObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      return AnimationOfNumbers();
    }
  },
  {
    root: null,
    threshold: 0,
  }
);

workObserver.observe(workSection);






