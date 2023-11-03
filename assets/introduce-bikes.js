$(function () {
  const fbIntroduceLoop = {
    init: function () {
      this.swiperFun();
      this.setStar();
    },
    visibleFun: function () {},
    setStar: function () {
      $(".intoduce-bikes-products-pc .introduce-bikes-box-pc").each(function (
        i,
        docEle
      ) {
        $(this)
          .find(".stampedRating-pdp")
          .text($(this).find(".stamped-badge").attr("data-rating"));
      });
    },
    swiperFun: function () {
      let _this = this;
      var windowWidth = $(window).width();
      const myIntroduceSwiper = new Swiper("#introduceBikesSwiper", {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
        on: {
          slideChange: function () {
            $(".ib-fsg-loop-profooter").hide();
            let realIndex = parseInt(this.realIndex) + 1;
            let showclass = `.ib-loop-index${realIndex}`;
            let circleindex = `.ib-sg-mobile-doc${realIndex}`;
            $(showclass).show();
            $(`.ib-sg-mobile-lopbox${realIndex}`).find(".fb-sg-default").show();
            $(`.ib-sg-mobile-lopbox${realIndex}`).find(".fb-sg-active").hide();
            $(`.ib-sg-mobile-lopbox${realIndex}`)
              .children(circleindex)
              .find(".fb-sg-default")
              .hide();
            $(`.ib-sg-mobile-lopbox${realIndex}`)
              .children(circleindex)
              .find(".fb-sg-active")
              .show();
          },
        },
        pagination: {
          el: ".fb-sg-dotter-mobile",
        },
      });
      if($('#introduceBikesSwiperBoom .swiper-slide').length > 1){
            var myIntroduceSwiperBoom = new Swiper("#introduceBikesSwiperBoom", {
                autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                },
                loop: true,
                on: {
                slideChange: function () {
                    $(".ib-fsg-loop-profooter-boom").hide();
                    let boomrealIndex = parseInt(this.realIndex) + 1;
                    let showclassboom = `.ib-loopboom-index${boomrealIndex}`;
                    let circleindexboom = `.ib-sg-mobile-boom-doc${boomrealIndex}`;
                    $(showclassboom).show();
                    $(`.ib-sg-mobile-boom-lopbox${boomrealIndex}`)
                    .find(".fb-sg-default")
                    .show();
                    $(`.ib-sg-mobile-boom-lopbox${boomrealIndex}`)
                    .find(".fb-sg-active")
                    .hide();
                    $(`.ib-sg-mobile-boom-lopbox${boomrealIndex}`)
                    .children(circleindexboom)
                    .find(".fb-sg-default")
                    .hide();
                    $(`.ib-sg-mobile-boom-lopbox${boomrealIndex}`)
                    .children(circleindexboom)
                    .find(".fb-sg-active")
                    .show();
                },
                },
                pagination: {
                el: ".fb-sg-dotter-mobile",
                },
            });
        } else {
            $(`.ib-sg-mobile-boom-lopbox1`).find(".fb-sg-default").hide();
            $(`.ib-sg-mobile-boom-lopbox1`).find(".fb-sg-active").show();
        }
        $(".ib-sg-imgbox-mobile1").click(function () {
            let click_index = $(this).attr("data-index");
            click_index = parseInt(click_index);
            myIntroduceSwiper.slideTo(click_index, 1000, false);
        });
        $(".ib-sg-imgbox-mobile2").click(function () {
            let click_index_boom = $(this).attr("data-index");
            click_index_boom = parseInt(click_index_boom);
            myIntroduceSwiperBoom.slideTo(click_index_boom, 1000, false);
        });
    },
    event: function () {},
  };
  fbIntroduceLoop.init();
});
