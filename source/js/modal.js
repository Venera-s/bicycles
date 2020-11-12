var menuBtn = document.querySelector(".main-header__btn");
var menuList = document.querySelector(".main-nav__list");

menuBtn.classList.toggle("main-header__btn--open");
menuList.classList.toggle("main-nav__list--hidden");


menuBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  menuBtn.classList.toggle("main-header__btn--close");
  menuList.classList.toggle("main-nav__list--hidden");
});
