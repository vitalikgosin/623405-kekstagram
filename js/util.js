'use strict';
(function () {
  var previousTimeout = null;
  window.util = {
    COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],

    randomIinteger: function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1));
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },

     debounce: function(callback, delayTime) {
      if (previousTimeout) { 
        window.clearTimeout(previousTimeout); 
      } 
      previousTimeout = window.setTimeout(callback, delayTime); 
    }
  };
  
})();
