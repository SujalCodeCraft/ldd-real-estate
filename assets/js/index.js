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
    (entries) => {
      const [entry] = entries;
      console.log(entry);
      if (entry.isIntersecting) {
        document.body.classList.add("sticky");
        console.log((logo.src = "assets/img/logo2.png"));  // Update the path to match your directory
      } else {
        document.body.classList.remove("sticky");
        console.log((logo.src = "assets/img/logo2.png"));  // Same path for consistency
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



  // my custome code start


  const images = [
    'https://via.placeholder.com/700x400',
    'https://via.placeholder.com/700x400/ff7f7f',
    'https://via.placeholder.com/700x400/77dd77',
];
let currentIndex = 0;

const sliderImage = document.getElementById('slider-image');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

function updateImage(index) {
    sliderImage.src = images[index];
}

leftBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateImage(currentIndex);
});

rightBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateImage(currentIndex);
});
  // my custome code end



 


