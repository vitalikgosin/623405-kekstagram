'use strict';
(function () {

  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderImg = function (image) {
    var imglement = pictureTemplate.cloneNode(true);

    imglement.querySelector('a.picture img').src = image.url;
    imglement.querySelector('.picture-likes').textContent = image.likes;
    imglement.querySelector('.picture-comments').textContent = image.comments.length;

    return imglement;
  };


  // -----------------------------------------------------------  load

  var successHandler = function (imagesArr) {

    var imgGridElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < imagesArr.length; i++) {

      fragment.appendChild(renderImg(imagesArr[i]));
    }

    imgGridElement.appendChild(fragment);
  };


  // -----------------------------------------------------------  upload


  window.backend.load(successHandler, window.util.errorHandler);


})();
