$(function () {
    var mySwiperOnline = undefined;

    function initSwiper() {
      var screenWidth = $(window).width();
      if (screenWidth < 769 && mySwiperOnline == undefined) {
        var mySwiperOnline = new Swiper('.testswiper', {
          loop: true,
          spaceBetween: 20,
          speed: 500,
        //   autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        //   },
          pagination: {
            el: '.online-reviewers .swiper-pagination',
          },
        });
      } else if (screenWidth >= 769) {
        var mySwiper = new Swiper('.testswiper', {
          speed: 500,
          spaceBetween: 50,
          slidesPerView: 'auto',
          cssMode: true,
          mousewheel: true,
          initialSlide: 0,
          centeredSlides: true,
          centeredSlidesBounds: true,
          scrollbar: {
            el: '.online-reviewers .testscrollbar',
            draggable: true,
          },
        });
      }
    }
    initSwiper();
  });