'use strict';
/* ------------------------------------------------------------module4-task1-------------- */

(function () {

  window.popupOpen = function () {

    var uploadFile = document.querySelector('#upload-file');
    var uploadFormCancel = document.querySelector('#upload-cancel');
    var uploadOverlayForm = document.querySelector('.upload-overlay');

    var openEditForm = function () {
      uploadOverlayForm.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);

    };

    window.closeEditForm = function () {
      uploadOverlayForm.classList.add('hidden');
      uploadOverlayForm.value = '';
    };
    uploadFile.addEventListener('change', openEditForm);
    uploadFormCancel.addEventListener('click', window.closeEditForm);

    // ----------------open popup

    var imagesElements = document.querySelectorAll('a.picture');


    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayStats = document.querySelector('.gallery-overlay-controls');

    var clickHandler = function (evt) {
      var target = evt.currentTarget;
      target.classList.add('clicked');
      var imgUrl = evt.path[0]['currentSrc'];
      var imgLikes = evt.path[1]['children'][1]['children'][1]['innerText'];
      var imgCommentsCount = evt.path[1]['children'][1]['children'][0]['innerText'];


      galleryOverlay.classList.remove('hidden');

      galleryOverlay.querySelector('.gallery-overlay-image').src = imgUrl;
      galleryOverlayStats.querySelector('.likes-count').textContent = imgLikes;
      galleryOverlay.querySelector('.comments-count').textContent = imgCommentsCount;

      document.addEventListener('keydown', onPopupEscPress);

    };

    function addHandlersForImages(images) {
      for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('click', clickHandler);
      }
    }

    addHandlersForImages(imagesElements); // cюда передаешь массив своих картинок


    // ----------------------------------------hashtags

    var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
    var MAX_LENGTH_OF_HASHTAG = 20;
    var MAX_COUNT_HASHTAG = 5;

    // Функцмя для вылидации поля с хэштегами
    function onInputTagInvalid(e) {
      // Создаем массив из сттрок поля на котором происходит действие
      var hashtags = e.target.value.toLowerCase().split(' ');
      // создаем пустой объект для проверки массива на одинаковые значения
      var obj = {};

      for (var i = 0; i < hashtags.length; i++) {
        var hashtag = hashtags[i];
        // проверка на наличие хэштега первым символом
        if (hashtag.indexOf('#', 0) !== 0) {
          e.target.setCustomValidity('Хэш-тег должен начинаться с символа #');
          setErrorRedLine(e);
          return;
        }
        // проверка на количество символов в хэштеге
        if (hashtag.length > MAX_LENGTH_OF_HASHTAG) {
          e.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
          setErrorRedLine(e);
          return;
        }
        // проверка на наличие пробелов между хэштегами
        // если индекс хэштега не 0, т.е он не первый, то оштбка
        if (hashtag.lastIndexOf('#') !== 0) {
          e.target.setCustomValidity('хэш-теги должны разделятся пробелами');
          setErrorRedLine(e);
          return;
        }
        // если i элемент находиться в объекте, то
        if (hashtag in obj) {
          e.target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
          setErrorRedLine(e);
          return;
        }

        // проверка на количество элементов в массиве хэштегов
        if (hashtags.length > MAX_COUNT_HASHTAG) {
          e.target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
          setErrorRedLine(e);
          return;
        }

        obj[hashtag] = true; // запомнить масив в виде свойства объекта для проверки на повторение
        // сбрасываем
        e.target.setCustomValidity('');
        e.target.style.border = '';
      }
    }

    //  функция для отрисовки красной линии при ошибке
    function setErrorRedLine(e) {
      e.target.style.border = '2px solid red';
    }
    // навешиваем обработчики событий
    uploadFormHashtags.addEventListener('input', onInputTagInvalid);

    // ----------------------------------------------------

    // -----------------------------check input on focus

    var ESC_KEYCODE = 27;
    var formHashtag = document.querySelector('.upload-form-hashtags');
    var formDescription = document.querySelector('.upload-form-description');

    var formInputOnFocus = false;

    var focusHandler = function () {
      formInputOnFocus = true;

    };
    var blurHandler = function () {
      formInputOnFocus = false;
    };

    formDescription.addEventListener('focus', focusHandler);
    formDescription.addEventListener('blur', blurHandler);
    formHashtag.addEventListener('focus', focusHandler);
    formHashtag.addEventListener('blur', blurHandler);

    // -----------------------------------------------------------------close overlay

    var closeOverlay = document.querySelector('.gallery-overlay-close');

    var closeClickHandler = function () {

      galleryOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE && formInputOnFocus === false) {
        uploadOverlayForm.classList.add('hidden');
        galleryOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
      }
    };

    closeOverlay.addEventListener('click', closeClickHandler);

  };

  // --------------------------------------------------------------------- submit form

  //var uploadOverlayForm = document.querySelector('.upload-form');
  var form = document.querySelector('form.upload-form');
  form.addEventListener('submit', function (evt) {
    
    window.backend.save(new FormData(form), function (response) {
      //userDialog.classList.add('hidden');
      window.popupOpen.galleryOverlay.classList.add('hidden');
      window.closeEditForm();
    });
    evt.preventDefault();
  });

})();
