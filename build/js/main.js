'use strict';

(function () {
  var menuBtn = document.querySelector('.main-header__btn');
  var menuList = document.querySelector('.main-nav');
  var menuBack = document.querySelector('.main-header__logo-wrap');
  var headerLogo = document.querySelector('.main-header__logo');

  var menuHide = function () {
    menuBtn.classList.toggle('main-header__btn--open');
    menuList.classList.toggle('main-nav--hidden');

  };

  menuHide();

  menuBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    menuHide();
    menuBtn.classList.toggle('main-header__btn--close');
    menuBack.classList.toggle('main-header__logo-wrap--back');
    headerLogo.classList.toggle('main-header__logo--close');
  });
})();

(function () {
  var inputTel = document.getElementById(`tel-field`);
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
