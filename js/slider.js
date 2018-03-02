'use strict';

// ----------------------------------slider

var effectLevelBar = document.querySelector('.upload-effect-level');
var effectLevelLine = effectLevelBar.querySelector('.upload-effect-level-line');
var pinHandle = effectLevelBar.querySelector('.upload-effect-level-pin');
var effectLevelVal = document.querySelector('.upload-effect-level-val');
var MINPINCOORDS = 0;
var MAXPINCOORDS = 455;


pinHandle.addEventListener('mousedown', function (downEvt) {
  downEvt.preventDefault();

  var startCoordsX = downEvt.clientX;


  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = startCoordsX - moveEvt.clientX;

    startCoordsX = moveEvt.clientX;

    if (pinHandle.offsetLeft >= MINPINCOORDS && pinHandle.offsetLeft <= MAXPINCOORDS) {
      pinHandle.style.left = (pinHandle.offsetLeft - shift) + 'px';

    } else if (pinHandle.offsetLeft <= MINPINCOORDS) {
      pinHandle.style.left = MINPINCOORDS;

    } else if (pinHandle.offsetLeft > MAXPINCOORDS) {
      pinHandle.style.left = MAXPINCOORDS + 'px';

    }
    var EFFECTLEVELVALNUM = Math.floor(parseInt(pinHandle.style.left, 10) / 4.55);

    effectLevelVal.style.width = EFFECTLEVELVALNUM + '%';


    switch (window.imgEffectPrev.className) {
      case (' effect-chrome'):
        window.imgEffectPrev.style.filter = 'grayscale(' + EFFECTLEVELVALNUM + '%)';

        break;

      case ('effect-sepia'):
        window.imgEffectPrev.style.filter = 'sepia(' + EFFECTLEVELVALNUM + '%)';


        break;

      case ('effect-marvin'):
        window.imgEffectPrev.style.filter = 'invert(' + EFFECTLEVELVALNUM + '%)';

        break;

      case ('effect-phobos'):
        window.imgEffectPrev.style.filter = 'blur(' + EFFECTLEVELVALNUM + 'px)';

        break;
      case ('effect-heat'):
        window.imgEffectPrev.style.filter = 'brightness(' + EFFECTLEVELVALNUM + '%)';

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
