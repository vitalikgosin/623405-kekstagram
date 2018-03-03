'use strict';
(function () {

  window.filters = function () {


    var filtersBlock = document.querySelector('.filters');
    var sortby;

    filtersBlock.classList.remove('filters-inactive');

    var imgArrCopy = window.imgArr.slice();

    var sortHandler = {
      likes: 'likes',
      comments: 'comments',
      random: 'filter-random'
    };

    // ---------------------------------------------------- sort by

    var imagesSortHandler = function (evt) {

      if (evt.path[0].nodeName !== 'LABEL') {
        return;
      }

      var ImagesSortArrFunc;


      switch (evt.path[0].htmlFor) {

        case ('filter-popular'):
          sortby = sortHandler.likes;
          ImagesSortArrFunc = imgArrCopy.sort(function (first, second) {

            return second[sortby] - first[sortby];
          });
          break;


        case ('filter-discussed'):
          sortby = sortHandler.comments;

          ImagesSortArrFunc = imgArrCopy.sort(function (first, second) {
            return second[sortby].length - first[sortby].length;
          });
          break;
        case ('filter-random'):

          ImagesSortArrFunc = imgArrCopy.sort(function () {
            return (0.5 - Math.random());
          });
          break;

        default:
          ImagesSortArrFunc = window.imgArr;

          break;
      }
      var imgSortBy = function (ImagesSortArr) {

        // ---------------------------------------------------- clear imggrid

        while (window.imgGridElement.firstChild) {
          window.imgGridElement.removeChild(window.imgGridElement.firstChild);
        }

        // ----------------------------------------------------- new grid

        var fragmentNew = document.createDocumentFragment();


        for (var i = 0; i < ImagesSortArr.length; i++) {

          fragmentNew.appendChild(window.renderImg(ImagesSortArr[i]));

        }
        window.setTimeout(function () {
        window.imgGridElement.appendChild(fragmentNew);
      }, 1000);
      };

      imgSortBy(ImagesSortArrFunc);

    };


    filtersBlock.addEventListener('click', imagesSortHandler);

  };


})();
