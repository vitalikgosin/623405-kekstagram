'use strict';
(function () {
  var pictures = [];
  for (var i = 1; i <= 25; i++) {
    pictures.push([{
      url: 'photos/' + i + '.jpg',
      comments: window.data.COMMENTS [window.data.randomIinteger(1, window.data.COMMENTS.length)],
      likes: window.data.randomIinteger(15, 200),
      commentsCount: window.data.randomIinteger(0, 1000),
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

  var imgGridElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < 4; j++) {
    fragment.appendChild(renderImg(pictures[j][0]));
  }

  imgGridElement.appendChild(fragment);

})();
