const slide = document.getElementsByClassName('slider');
let slideIndex = 0;

const showSlides = () => {
  for (let i = 0; i < slide.length; i += 1) {
    slide[i].style.display = 'none';
  }
  slideIndex += 1;

  if (slideIndex > slide.length) {
    slideIndex = 1;
  }
  slide[slideIndex - 1].style.display = 'flex';

  setTimeout(showSlides, 7000);
};

export default showSlides;
