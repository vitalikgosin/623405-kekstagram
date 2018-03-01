'use strict';
(function () {
 
  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderImg = function (image) {
    var imglement = pictureTemplate.cloneNode(true);

    imglement.querySelector('a.picture img').src = image.url;
    imglement.querySelector('.picture-likes').textContent = image.likes;
    imglement.querySelector('.picture-comments').textContent = image.commentsCount;

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
}

  
// -----------------------------------------------------------  upload

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);


})();
