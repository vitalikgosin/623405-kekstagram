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

var imgEffectPrev = document.querySelector('.effect-image-preview');


var ImgEffectControls = document.querySelector('.upload-effect-controls');

ImgEffectControls.onclick = function (event) {
  var controlTarget = event.target.closest('INPUT');
  if (controlTarget) {
    if (controlTarget.id === 'upload-effect-chrome') {

      imgEffectPrev.className = ' effect-chrome';

    } else if (controlTarget.id === 'upload-effect-none') {
      imgEffectPrev.className = ' effect-none';
    } else if (controlTarget.id === 'upload-effect-sepia') {
      imgEffectPrev.className = ' effect-sepia';
    } else if (controlTarget.id === 'upload-effect-marvin') {
      imgEffectPrev.className = ' effect-marvin';
    } else if (controlTarget.id === 'upload-effect-phobos') {
      imgEffectPrev.className = ' effect-phobos';
    } else if (controlTarget.id === 'upload-effect-heat') {
      imgEffectPrev.className = ' effect-heat';
    }
  }
};

// -----------------------------------------------------------------------resize-controls

var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
var resizeControlsValue = document.querySelector('.upload-resize-controls-value');

imgEffectPrev.style.transform = ' ';

var resizeControlsVal = Math.round(parseFloat(resizeControlsValue.value)) / 100;


var resizeDecHandlerInc = function () {


  resizeControlsVal += 0.25;
  resizeControlsValue.value = Math.round(parseFloat(resizeControlsVal) * 100) + '%';
  imgEffectPrev.style.transform = 'scale(' + resizeControlsVal + ')';
};

var resizeDecHandlerDec = function () {
  resizeControlsVal -= 0.25;
  resizeControlsValue.value = Math.round(parseFloat(resizeControlsVal) * 100) + '%'; // resizeControlsVal*100 + '%';

  imgEffectPrev.style.transform = 'scale(' + resizeControlsVal + ')';

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

for (var y = 0; y < imges.length; y++) {
  imges[y].addEventListener('click', clickHandler);
}

// -----------------------------------------------------------------------------close popup

var ESC_KEYCODE = 27;

// ----------------------------------------esc when text input focus

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
// -----------------------------------------------------

// --------------------------------------------------------------------heshtags validation
var uploadSubmit = document.querySelector('#upload-submit');

;
var sendClickHandler = function (evt) {
  
  //evt.preventDefault();
  var arrFormHashtag = formHashtag.value.split(' ');

  for (var z = 0; z < arrFormHashtag.length; z++){
  if ( arrFormHashtag[z].charAt(0) != '#'){
    
    console.log(arrFormHashtag[z].charAt(0));

   
    formHashtag.setCustomValidity("This not valid value for this form no #");
    break;


 
  }
  if ( arrFormHashtag[z].length > 20 ){
 
    console.log(arrFormHashtag[z].length);
    formHashtag.setCustomValidity("This not valid value for this form  tag length > 20");
 

 
  }
  if ( arrFormHashtag.length > 5){
    console.log(arrFormHashtag.length);
    formHashtag.setCustomValidity("This not valid value for this form  to many tags");


 
  }
  }
  

}
uploadSubmit.addEventListener('click', sendClickHandler);


// ----------------------------------------------------

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
