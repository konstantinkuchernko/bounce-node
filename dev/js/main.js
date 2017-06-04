/**
 * ISOTOPE
 */
 
 $(document).ready(function() {

    var grid = $('.portfolio-works').isotope({
        itemSelector: '.portfolio-works__item',
        layoutMode: 'masonry',
        masonry: {
            horizontalOrder: true
        }
    });

    $('.portfolio__filter').click(function() {
        var filterValue = $( this ).attr('data-filter');
        grid.isotope({ filter: filterValue });

        $(".portfolio__filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });

    /**
     * SmoothScroll
     */
     smoothScroll.init({
        selector: '[data-scroll]',
        selectorHeader: null,
        speed: 500, 
        easing: 'ease',
        offset: 0
    });

    /**
     * Active-nav-link
     */

     $('.top-nav__item').click(function() { 
        $(".top-nav__item").removeClass("active-nav-link");
        $(this).addClass("active-nav-link");
    });

    /**
     * bxSlider for TEAM and testimonials cards
     */

   $('.team__cards--slider').bxSlider({
    controls: false,
    keyboardEnabled: true
  });

   $('.testimonials__cards--slider').bxSlider({
    controls: false,
    keyboardEnabled: true,
    auto: true
  });

  });

/**
 * Contact google maps
 */

 (function () {
  window.onload = function () {
    var map,
    point = {lat: 51.4938405, lng: 31.2999212},
    iv1Content = document.querySelector('.info-window-1');

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: point,
        zoom: 16,
                scrollwheel: false,  // отключить скрол
                mapTypeControl: false  //
              });

      var marker = new google.maps.Marker({
        position: point,
        map: map
      });

      var image = {
        url: '../img/marker.png',
        scaledSize : new google.maps.Size(22, 32)
      };

    }

    initMap();
  }
})();
