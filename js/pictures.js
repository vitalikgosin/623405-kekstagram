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
  imglement.querySelector('.picture-comments').textContent = image.comments;

  return imglement;
};

var imgGrid = document.querySelector('.pictures');


var fragment = document.createDocumentFragment();

for (var j = 0; j < 4; j++) {

  fragment.appendChild(renderImg(pictures[j][0]));
}

imgGrid.appendChild(fragment);

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayStats = document.querySelector('.gallery-overlay-controls');

galleryOverlay.classList.remove('hidden');

galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[1][0]['url'];
galleryOverlayStats.querySelector('.likes-count').textContent = pictures[1][0]['likes'];
galleryOverlay.querySelector('.comments-count').textContent = pictures[1][0]['commentsCount'];


