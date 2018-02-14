// Файл setup.js
'use strict';


var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

var pictures = [];
for (var i = 1; i <= 25; i++) {
  pictures.push([
    {
      url: 'photos/' + i + '.jpg',
      comments: COMMENTS [getRndInteger(1, COMMENTS.length)],
      likes: getRndInteger(15, 200),
      commentsCount: getRndInteger(0, 1000),
    }]);

}


var pictureTemplate = document.querySelector('#picture-template').content;

var renderImg = function (image) {

  var imglement = pictureTemplate.cloneNode(true);

  imglement.querySelector('a.picture img').src = image.url;
  imglement.querySelector('.picture-likes').textContent = image.likes;
  imglement.querySelector('.picture-comments').textContent = image.commentsCount;

  return imglement;
};

var imgGrid = document.querySelector('.pictures');


var fragment = document.createDocumentFragment();

for (var j = 0; j < 4; j++) {

  fragment.appendChild(renderImg(pictures[j][0]));
}

imgGrid.appendChild(fragment);


/* ------------------------------------------------------------module4-task1-------------- */

var uploadFile = document.querySelector('#upload-file');
var uploadFormCancel = document.querySelector('#upload-cancel');
var uploadOverlayForm = document.querySelector('.upload-overlay');

var openEditForm = function () {
  uploadOverlayForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

};
var closeEditForm = function () {
  uploadOverlayForm.classList.add('hidden');
  uploadOverlayForm.value = '';

};
uploadFile.addEventListener('change', openEditForm);
uploadFormCancel.addEventListener('click', closeEditForm);

/* ------------------------------------------------------------module4-task1 effects 1-------------- */

// var effectPin = document.querySelector('.upload-effect-level-pin');

// ---------------------------------------------------------------------color effects

var mgEffectControlsElement = document.querySelector('.effect-image-preview');


var ImgEffectControls = document.querySelector('.upload-effect-controls');

ImgEffectControls.onclick = function (evt) {
  var controlTarget = evt.target.closest('INPUT');
  if (controlTarget) {
    if (controlTarget.id === 'upload-effect-chrome') {

      mgEffectControlsElement.className = ' effect-chrome';

    } else if (controlTarget.id === 'upload-effect-none') {
      mgEffectControlsElement.className = ' effect-none';
    } else if (controlTarget.id === 'upload-effect-sepia') {
      mgEffectControlsElement.className = ' effect-sepia';
    } else if (controlTarget.id === 'upload-effect-marvin') {
      mgEffectControlsElement.className = ' effect-marvin';
    } else if (controlTarget.id === 'upload-effect-phobos') {
      mgEffectControlsElement.className = ' effect-phobos';
    } else if (controlTarget.id === 'upload-effect-heat') {
      mgEffectControlsElement.className = ' effect-heat';
    }
  }
};

// -----------------------------------------------------------------------resize-controls

var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeControlsValue = document.querySelector('.upload-resize-controls-value');

mgEffectControlsElement.style.transform = ' ';

var resizeControlsVal = Math.round(parseFloat(resizeControlsValue.value)) / 100;


var resizeDecHandlerInc = function () {


  resizeControlsVal += 0.25;
  resizeControlsValue.value = Math.round(parseFloat(resizeControlsVal) * 100) + '%';
  mgEffectControlsElement.style.transform = 'scale(' + resizeControlsVal + ')';
};

var resizeDecHandlerDec = function () {
  resizeControlsVal -= 0.25;
  resizeControlsValue.value = Math.round(parseFloat(resizeControlsVal) * 100) + '%'; // resizeControlsVal*100 + '%';

  mgEffectControlsElement.style.transform = 'scale(' + resizeControlsVal + ')';

};
resizeButtonDec.addEventListener('click', resizeDecHandlerDec);
resizeButtonInc.addEventListener('click', resizeDecHandlerInc);

/* ------------------------------------------------------------module4-task1 full screen imge open -------------- */


// ----------------open popup

var imges = document.querySelectorAll('a.picture');

var clickedImg = null;

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayStats = document.querySelector('.gallery-overlay-controls');

var clickHandler = function (evt) {


  clickedImg = evt.currentTarget;
  clickedImg.classList.add('clicked');
  var imgurl = evt.path[0]['currentSrc'];
  var imglikes = evt.path[1]['children'][1]['children'][1]['innerText'];
  var imgCommentsCount = evt.path[1]['children'][1]['children'][0]['innerText'];


  galleryOverlay.classList.remove('hidden');

  galleryOverlay.querySelector('.gallery-overlay-image').src = imgurl;
  galleryOverlayStats.querySelector('.likes-count').textContent = imglikes;
  galleryOverlay.querySelector('.comments-count').textContent = imgCommentsCount;

  document.addEventListener('keydown', onPopupEscPress);

};

function addHandlersForImages(images) {
  for (var y = 0; y < images.length; y++) {
    images[y].addEventListener('click', clickHandler);
  }
}

addHandlersForImages(images); // cюда передаешь массив своих картинок

// ----------------------------------------hashtags validity

var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var MAX_LENGTH_OF_HASHTAG = 20;
var MAX_COUNT_HASHTAG = 5;


function onInputTagInvalid(evt) {

  var hashtags = evt.target.value.toLowerCase().split(' ');

  var obj = {};

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag.indexOf('#', 0) !== 0) {
      evt.target.setCustomValidity('Хэш-тег должен начинаться с символа #');
      setErrorRedLine(evt);
      return;
    }

    if (hashtag.length > MAX_LENGTH_OF_HASHTAG) {
      evt.target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
      setErrorRedLine(evt);
      return;
    }

    if (hashtag.lastIndexOf('#') !== 0) {
      evt.target.setCustomValidity('хэш-теги должны разделятся пробелами');
      setErrorRedLine(evt);
      return;
    }
    // если i элемент находиться в объекте, то
    if (hashtag in obj) {
      evt.target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды;');
      setErrorRedLine(evt);
      return;
    }

    if (hashtags.length > MAX_COUNT_HASHTAG) {
      evt.target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      setErrorRedLine(evt);
      return;
    }

    obj[hashtag] = true; // запомнить масив в виде свойства объекта для проверки на повторение
    // сбрасываем
    evt.target.setCustomValidity('');
    evt.target.style.border = '';
  }
}

//  функция для отрисовки красной линии при ошибке
function setErrorRedLine(evt) {
  evt.target.style.border = '2px solid red';
}

uploadFormHashtags.addEventListener('input', onInputTagInvalid);

// ---------------------------------------------------- close popup

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

// -----------


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
