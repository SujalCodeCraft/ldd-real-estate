const images = [
    'assets/img/real-state-2.png',
    'assets/img/real-state-3.png',
    'assets/img/real-state-4.png',
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