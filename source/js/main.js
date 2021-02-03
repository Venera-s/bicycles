'use strict';

(function () {
  var menuBtn = document.querySelector('.main-header__btn');
  var menuList = document.querySelector('.main-nav');
  var menuBack = document.querySelector('.main-header__logo-wrap');
  var headerLogo = document.querySelector('.main-header__logo');
  var mainHeader = document.querySelector('.main-header__wrap');
  var mainNavList = menuList.querySelector('.main-nav__list');

  var menuHide = function () {
    menuBtn.classList.toggle('main-header__btn--open');
    menuList.classList.toggle('main-nav--hidden');
    menuBack.classList.toggle('main-header__logo-wrap--back');
  };

  menuHide();

  menuBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    menuList.classList.toggle('main-nav--hidden');
    menuBtn.classList.toggle('main-header__btn--close');
    menuBack.classList.toggle('main-header__logo-wrap--back');
    headerLogo.classList.toggle('main-header__logo--close');
    document.body.classList.toggle('overflow-hidden');
    mainHeader.classList.toggle('main-header__wrap--absolute');
    mainNavList.classList.toggle('main-nav__list--fixed');
  });
})();

(function () {
  var inputTel = document.getElementById('tel-field');
  var MIN_TITLE_LENGTH = 22;

  var phoneMask = function () {
    window.iMask.phone(inputTel, {
      mask: '+{7} (000) 000 - 00 - 00',
    });
  };

  phoneMask();

  var onInputTelInput = function () {
    var numberLength = inputTel.value.length;

    if (numberLength < MIN_TITLE_LENGTH) {
      inputTel.setCustomValidity('Введите 10 цифр номера телефона.');
    } else {
      inputTel.setCustomValidity('');
    }
    inputTel.reportValidity();
  };

  inputTel.addEventListener('input', onInputTelInput);

})();
