'use strict';

// ----------------------------------slider

var effectLevelBar = document.querySelector('.upload-effect-level');
var effectLevelLine = effectLevelBar.querySelector('.upload-effect-level-line');
var pinHandle = effectLevelBar.querySelector('.upload-effect-level-pin');
var effectLevelVal = document.querySelector('.upload-effect-level-val');


pinHandle.addEventListener('mousedown', function (downEvt) {
  downEvt.preventDefault();

  var startCoords = {
    x: downEvt.clientX,
  };


  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };
    if (pinHandle.offsetLeft >= 0 && pinHandle.offsetLeft <= 455) {
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';

    } else if (pinHandle.offsetLeft <= 0) {
      pinHandle.style.left = 0;

    } else if (pinHandle.offsetLeft > 455) {
      pinHandle.style.left = 455 + 'px';

    }
    var effectLevelValnum = Math.floor(parseInt(pinHandle.style.left, 10) / 4.55);

    effectLevelVal.style.width = effectLevelValnum + '%';


    switch (window.imgEffectPrev.className) {
      case (' effect-chrome'):
        window.imgEffectPrev.style.filter = 'grayscale(' + effectLevelValnum + '%)';

        break;

      case ('effect-sepia'):
        window.imgEffectPrev.style.filter = 'sepia(' + effectLevelValnum + '%)';


        break;

      case ('effect-marvin'):
        window.imgEffectPrev.style.filter = 'invert(' + effectLevelValnum + '%)';

        break;

      case ('effect-phobos'):
        window.imgEffectPrev.style.filter = 'blur(' + effectLevelValnum + 'px)';

        break;
      case ('effect-heat'):
        window.imgEffectPrev.style.filter = 'brightness(' + effectLevelValnum + '%)';

        break;
      default:
        window.imgEffectPrev.style.filter = '';
        break;
    }


  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    effectLevelLine.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {

      var onClickPreventDefoult = function (evt) {

        evt.preventDefault();

        effectLevelBar.removeEventListener('click', onClickPreventDefoult);
      };
      effectLevelBar.addEventListener('click', onClickPreventDefoult);
    }


  };

  effectLevelLine.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
