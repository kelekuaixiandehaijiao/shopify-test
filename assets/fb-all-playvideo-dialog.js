
$(function () {
    const playAllVideoDialog = {
        init: function() {
            if($('.js-open-videodialog[data-type="playvideo"]').length > 0) {
                $('.js-open-videodialog[data-type="playvideo"]').css('display', 'block')
                this.event()
            } else {
                return false
            }
        },
        event: function() {
            // $('body').on('click', '#insta-feed', function(e) {

            // })
            $('body').on('click', '.js-open-videodialog[data-type="playvideo"]', function(e) {
                e.preventDefault()
                let videourl = $(this).attr('data-videourl')
                if(!videourl) {
                    return false
                }
                $('#js-trigger-video').attr('src', videourl)
                $('#all-page-playVideo').show()
                $('#js-trigger-video').trigger('play')
                document.body.style.overflow = "hidden";
            })
            $('body').on('click', '#all-page-colsePlay', function(e) {
                e.preventDefault()
                $('#js-trigger-video').trigger('pause')
                $('#all-page-playVideo').hide()
                document.body.style.overflow = "auto";
            })
            if(window.navigator && window.navigator.userAgent) {
                if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    $('#js-trigger-video').on('webkitbeginfullscreen', function() {
                    }).on('webkitendfullscreen', function() {
                        $('#js-trigger-video').trigger('pause')
                        $('#all-page-playVideo').hide()
                        document.body.style.overflow = "auto";
                    })
                }
            }
        }
    }
    playAllVideoDialog.init()
    const fbHeaderBanner = {
      init:function(){
        let fb_current = $(`.announcement-scroll-1`)
        let fb_type = fb_current.attr('data-isimgae')
        if(fb_type && fb_type == 'true') {
            $('.annou-button-offer-position').css('z-index', -1)
            $('.annou-button-offer-position').css('visibility', 'hidden')
        } else {
            $('.annou-button-offer-position').css('z-index', 2)
            $('.annou-button-offer-position').css('visibility', 'visible')
        }

        let number = $('#headerBanner .swiper-slide').length
        if(number <= 1) {
           $('.announcement-left').hide()
            $('.announcement-right').hide()
        } else {
            this.swiperFun()
        }
        this.swiperFun()
        if($('.js-view-annou-number').length) {
          $('.js-view-annou-number').text($('.annou-box-li').length)
        }
      },
      swiperFun:function(){
        const headerSwiper = new Swiper("#headerBanner",{
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          loop: true,
          allowTouchMove: false,
          threshold: 8,
          effect: "fade",
          fadeEffect: {
            crossFade: true
          },
          on:{
            slideChange: function() {
              let realIndex = parseInt(this.realIndex) + 1
              let _current = $(`.announcement-scroll-${realIndex}`)
              let type = _current.attr('data-isimgae')
              if(type && type == 'true') {
                  $('.annou-button-offer-position').css('z-index', -1)
                  $('.annou-button-offer-position').css('visibility', 'hidden')
              } else {
                  $('.annou-button-offer-position').css('z-index', 2)
                  $('.annou-button-offer-position').css('visibility', 'visible')
              }
           }
          },
          navigation: {
            nextEl: '.announcement-right',
            prevEl: '.announcement-left',
          },
          pagination: {
              el: '.announcement-left .announcement-right',
              clickable: true,
          }
        })
      }
    }
    fbHeaderBanner.init()
})