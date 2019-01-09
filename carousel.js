function Carousel(element, containerName, sliderItem) {
  var slider = element;
  var sliderParent = slider.parentNode;
  var sliderContainer = document.createElement("div");
  var width;
  var height;
  var images = slider.getElementsByClassName(sliderItem);
  var imageNumber = images.length;
  var rightArrow = document.createElement("img");
  var leftArrow = document.createElement("img");
  var dotContainer = document.createElement("div");
  var navButtons = [];

  var imageWidth;
  var x = 0;
  var speed;
  var delta = 1;

  var mainTimeout;
  var buttonTimeInterval;
  var mainInterval;

  function setWidthAndHeight() {
    width = sliderContainer.offsetWidth;
    height = sliderContainer.offsetHeight;
    imageWidth = width;
  }

  function createAll() {
    sliderContainer = document.createElement("div");
    rightArrow = document.createElement("img");
    leftArrow = document.createElement("img");
    dotContainer = document.createElement("div");
    sliderContainer.classList.add(containerName);
    rightArrow.classList.add("right-arrow");
    leftArrow.classList.add("left-arrow");
    dotContainer.classList.add("dot-container");
    sliderParent.removeChild(slider);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(dotContainer);
    sliderContainer.appendChild(leftArrow);
    sliderContainer.appendChild(rightArrow);
    sliderParent.appendChild(sliderContainer);
  }

  function dotInit() {
    for (var i = 0; i < imageNumber; i++) {
      var spanElement = document.createElement("span");
      spanElement.classList.add("nav-button" + i);
      dotContainer.appendChild(spanElement);
      navButtons.push(spanElement);
      spanElement.addEventListener("click", function(e) {
        navSlide(e);
      });
    }
  }

  function sliderStyler() {}

  function imgStyler() {}

  function arrowStyler() {
    leftArrow.src = "./assets/arrow-top-left.png";
    rightArrow.src = "./assets/arrow-top-right.png";
  }

  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function(e) {
      navSlide(e);
    });
  }

  var positionLeft;

  function navSlide(event) {
    clearInterval(mainInterval);
    clearInterval(buttonTimeInterval);
    clearTimeout(mainTimeout);
    navIndexPosition =
      parseInt(
        event.target.className.slice("10", event.target.className.length)
      ) * imageWidth;
    positionLeft = x > navIndexPosition;

    if (navIndexPosition === x) {
      initiateMovement(2000);
    } else {
      if (navIndexPosition < x) delta = -1;
      else delta = 1;
      buttonTimeInterval = setInterval(function() {
        slider.style.left = "-" + x + "px";
        checkActiveButton();
        if (positionLeft !== x > navIndexPosition || x === navIndexPosition) {
          clearInterval(buttonTimeInterval);
          initiateMovement(
            x != 0 && x != imageWidth * (imageNumber - 1) ? 2000 : 0
          );
        } else {
          x += speed * delta;
        }
      }, 4);
    }
  }

  function buttonSlide(d) {
    delta = d;
    clearInterval(mainInterval);
    clearInterval(buttonTimeInterval);
    clearTimeout(mainTimeout);
    if (
      (x >= imageWidth * (imageNumber - 1) && delta === 1) ||
      (x === 0 && delta === -1)
    ) {
      clearInterval(mainInterval);
      initiateMovement(0);
    } else {
      initiateMovement(0);
    }
  }

  function slide() {
    imageWidth = sliderContainer.offsetWidth;
    slider.style.left = "-" + x + "px";
    x += speed * delta;

    if (x >= imageWidth * (imageNumber - 1)) delta = -1;
    else if (x <= 0) delta = 1;

    if (x % imageWidth === 0) {
      slider.style.left = "-" + x + "px";
      clearInterval(mainInterval);
      initiateMovement(2000);
    }
  }

  function checkActiveButton() {
    for (i = 0; i < imageNumber; i++) {
      if (x / imageWidth === i) navButtons[i].classList.add("active-button");
      else navButtons[i].classList.remove("active-button");
    }
  }

  function initiateMovement(timeLimit) {
    checkActiveButton();

    mainTimeout = setTimeout(function() {
      mainInterval = setInterval(slide, 4);
    }, timeLimit);
  }

  this.documentInit = function() {
    createAll();
    dotInit();
    setWidthAndHeight();
    sliderStyler();
    arrowStyler();
    imgStyler();

    speed = 1;

    rightArrow.addEventListener("click", function() {
      buttonSlide(1);
    });

    leftArrow.addEventListener("click", function() {
      buttonSlide(-1);
    });

    checkActiveButton();
    initiateMovement(2000);
  };
}

var slider = document.getElementsByClassName("slider")[0];
var twitterSlider = document.getElementsByClassName("twitter-slider")[0];
new Carousel(slider, "container-wrapper", "slider-item").documentInit();
// new Carousel(twitterSlider, 'twitter-wrapper', 'content').documentInit();
