function Burger() {
  var element = document.getElementsByClassName('nav-button')[0];
  var toggleActive = false;
  var reqElement = document.getElementsByClassName('nav-mobile-list')[0];

  element.addEventListener('click', function () {
    if (!toggleActive) {
      reqElement.style.display = 'block';
      toggleActive = true;
    } else {
      reqElement.style.display = 'none';
      toggleActive = false;
    }
  })
}

var burger = new Burger();