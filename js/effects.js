'use strict';
/* ------------------------------------------------------------module4-task1 effects 1-------------- */

// ---------------------------------------------------------------------color effects

(function () {

  window.imgEffectPrev = document.querySelector('.effect-image-preview');

  var imgEffectControlsElement = document.querySelector('.upload-effect-controls');

  imgEffectControlsElement.addEventListener('click', function (evt) {
    var controlTarget = evt.target.closest('INPUT');
    if (controlTarget) {
      switch (controlTarget.id) {
        case ('upload-effect-chrome'):
          window.imgEffectPrev.className = ' effect-chrome';
          break;

        case ('upload-effect-sepia'):
          window.imgEffectPrev.className = 'effect-sepia';
          break;

        case ('upload-effect-marvin'):
          window.imgEffectPrev.className = 'effect-marvin';
          break;

        case ('upload-effect-phobos'):
          window.imgEffectPrev.className = 'effect-phobos';
          break;
        case ('upload-effect-heat'):
          window.imgEffectPrev.className = 'effect-heat';
          break;

        default:
          window.imgEffectPrev.className = 'effect-none';
          break;
      }
    }
  });


  var resizeButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsValue = document.querySelector('.upload-resize-controls-value');
  resizeControlsValue.value = '100%';

  window.imgEffectPrev.style.transform = ' ';

  var resizeControlsVal = Math.round(parseFloat(resizeControlsValue.value)) / 100;


  var resizeDecHandler = function (evt) {
    var incdec = evt.currentTarget.classList.contains('upload-resize-controls-button-inc') ? +1 : -1;

    resizeControlsVal = resizeControlsVal + 0.25 * incdec;

    switch (true) {
      case resizeControlsVal < 0.25: resizeControlsVal = 0.25; break;
      case resizeControlsVal > 1 : resizeControlsVal = 1; break;
    }


    if (resizeControlsVal <= 1 && resizeControlsVal >= 0.25) {

      resizeControlsValue.value = Math.round(parseFloat(resizeControlsVal) * 100) + '%';
      window.imgEffectPrev.style.transform = 'scale(' + resizeControlsVal + ')';

    }
  };
  resizeButtonInc.addEventListener('click', resizeDecHandler);
  resizeButtonDec.addEventListener('click', resizeDecHandler);

})();
