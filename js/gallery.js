'use strict';
(function () {

  var pictureTemplate = document.querySelector('#picture-template').content;

  window.renderImg = function (image) {
    var imglement = pictureTemplate.cloneNode(true);

    imglement.querySelector('a.picture img').src = image.url;
    imglement.querySelector('.picture-likes').textContent = image.likes;
    imglement.querySelector('.picture-comments').textContent = image.comments.length;

    return imglement;
  };

  // -----------------------------------------------------------  load

  window.successHandler = function (imagesArr) {

    window.imgGridElement = document.querySelector('.pictures');
    window.fragment = document.createDocumentFragment();

    for (var i = 0; i < imagesArr.length; i++) {

      window.fragment.appendChild(window.renderImg(imagesArr[i]));
    }

    window.imgGridElement.appendChild(window.fragment);
  };
  // -----------------------------------------------------------  upload

  window.backend.load(window.successHandler, window.util.errorHandler);


})();
