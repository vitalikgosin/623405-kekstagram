'use strict';
(function () {

  window.filters = function () {


    var filtersBlock = document.querySelector('.filters');
    var filterPopularItem = filtersBlock.querySelector('#filter-popular');

    filtersBlock.classList.remove('filters-inactive');

    var imgArrCopy = window.imgArr;

    var sortHendler = {
        likes: 'likes',
        comments: 'comments.length'
    };
    
    // ---------------------------------------------------- sort by popularity
    
    var imagesSortHandler = function (evt) {
        //evt.currentTarget.id.contains('filter-popular');
        console.log(evt.currentTarget.textContent);
       if(evt.currentTarget.textContent == 'Популярные'){
        var sorby = sortHendler.likes;
        console.log(evt.currentTarget.textContent);
       }
       else if (evt.currentTarget.textContent === 'Обсуждаемые'){
        var sorby = sortHendler.comments;

       }
        
      var ImagesSortArrFunc = imgArrCopy.sort(function (first, second) {

        
        if (first['sorby'] > second['sorby']) {
           
          return 1;
        } else if (first['sorby'] < second['sorby']) {
          return -1;
      
        } else {
          return 0;
         
        }
      });
      
      var imgSortByLikes = function (ImagesSortArr) {

  // ---------------------------------------------------- clear imggrid

        while (window.imgGridElement.firstChild) {
       window.imgGridElement.removeChild(window.imgGridElement.firstChild);
        }

  // ---------------------------------------------------

        var fragmentNew = document.createDocumentFragment();


        for (var i = 0; i < ImagesSortArr.length; i++) {
    
          fragmentNew.appendChild(window.renderImg(ImagesSortArr[i]));
          
        }
        
        window.imgGridElement.appendChild(fragmentNew);
        
      };

      imgSortByLikes(ImagesSortArrFunc);

    };

    
    filtersBlock.addEventListener('click', imagesSortHandler);

    // -------------------------------------------------------------------- sort by discussed



    



  };


})();
