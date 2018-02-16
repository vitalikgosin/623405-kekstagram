'use strict';
/* ------------------------------------------------------------module4-task1 effects 1-------------- */

// var effectPin = document.querySelector('.upload-effect-level-pin');

// ---------------------------------------------------------------------color effects

(function () {

  var imgEffectPrev = document.querySelector('.effect-image-preview');

  var imgEffectControlsElement = document.querySelector('.upload-effect-controls');

  imgEffectControlsElement.addEventListener('click', function (evt) {
    var controlTarget = evt.target.closest('INPUT');
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
  });


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
    resizeControlsVal = resizeControlsVal - 0.25;
    resizeControlsValue.value = Math.round(parseFloat(resizeControlsVal) * 100) + '%'; // resizeControlsVal*100 + '%';

    imgEffectPrev.style.transform = 'scale(' + resizeControlsVal + ')';

  };
  resizeButtonDec.addEventListener('click', resizeDecHandlerDec);
  resizeButtonInc.addEventListener('click', resizeDecHandlerInc);

})();
