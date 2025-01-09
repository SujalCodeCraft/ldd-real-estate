document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelectorAll(".burger");
  const cancelIcon = document.querySelector(".fa-xmark");
  const offcanvas = document.querySelector(".offcanvas");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle offcanvas menu for mobile
  burger.forEach((item) => {
    item.addEventListener("click", function () {
      offcanvas.classList.toggle("open");
    });
  });

  cancelIcon.addEventListener("click", function () {
    offcanvas.classList.remove("open");
  });

  // Close all dropdowns when hovering over another
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    // Show dropdown on hover
    dropdown.addEventListener("mouseenter", function () {
      closeAllDropdowns();
      menu.classList.add("show");
      menu.style.display = "block";
    });

    // Hide dropdown on mouse leave
    dropdown.addEventListener("mouseleave", function () {
      menu.classList.remove("show");
      menu.style.display = "none";
    });
  });

  // Helper function to close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.remove("show");
      menu.style.display = "none";
    });
  }
});

// ================= Images Swiping Animation =========================>

// Check if the Swiper container exists
if (document.querySelector(".mySwiper")) {
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
}

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
  console.log({ hading }); // Check if the element exists
  const logo = document.querySelector(".logo");
  
  if (hading) {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log(entry);
        if (entry.isIntersecting) {
          document.body.classList.add("sticky");
          console.log((logo.src = "assets/img/logo2.png")); // Update the path to match your directory
        } else {
          document.body.classList.remove("sticky");
          console.log((logo.src = "assets/img/logo2.png")); // Same path for consistency
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );
  
    observer.observe(hading);
  } else {
    console.warn("The element '.observation' does not exist on this page.");
  }
  

// ================= Smooth Scrolling Animation =========================>

if (document.querySelector(".numbers")) {
  const workSection = document.querySelector(".numbers");
  console.log(workSection);

  const workObserver = new IntersectionObserver(
    (entries) => {
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
}

// my custome code start

const images = [
  "https://via.placeholder.com/700x400",
  "https://via.placeholder.com/700x400/ff7f7f",
  "https://via.placeholder.com/700x400/77dd77",
];
let currentIndex = 0;

const sliderImage = document.getElementById("slider-image");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

function updateImage(index) {
  sliderImage.src = images[index];
}

if (leftBtn) {
  leftBtn.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateImage(currentIndex);
  });
}
if (rightBtn) {
  rightBtn.addEventListener("click", () => {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateImage(currentIndex);
  });
}

// my custome code end
