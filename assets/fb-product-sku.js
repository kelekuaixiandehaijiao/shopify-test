$(function () {
    const fbMainPdp = {
        mediaList: [],
        init: function () {
            this.event()
            // this.slodOut()
        },
        event: function () {
            let _this = this
            $('.js-pdp-dot').click(function () {
                let media_count = $('.fbm-pdp-slidebox').attr('data-media-count')
                let index = $(this).attr('data-index')
                media_count = parseInt(media_count)
                index = parseInt(index)
                if (index === media_count - 1) return;
                let maxRight = 5
                let moveLen = 0
                if (index <= 5) {
                    moveLen = 0
                    maxRight = 5
                } else {
                    moveLen = index - 5
                    maxRight = index
                }
                if (index === maxRight) {
                    let value = "-" + ((moveLen + 1) * 29) + 'px'
                    // if (mobile_flag) {
                    //     value = "-" + ((moveLen + 1) * 16) + 'px'
                    // }
                    $(".flickity-page-dots-frame").css("margin-left", value)
                } else if (index < maxRight) {
                    $(".flickity-page-dots-frame").css("margin-left", "0px")
                }
                if(window.innerWidth > 768) {
                   let checkMedia = $(`.Product__SlideItem[data-media-position='${index + 1}']`)
                   let type = checkMedia.attr('data-media-type')
                   if(type == 'video') {
                        $('.fbm-pdp-product-wrapper').addClass('fbm-pdp-videobox')
                        $('.chooseBikeColor .changecolorWrapperBack').css('display', 'flex')
                   } else {
                        $('.fbm-pdp-product-wrapper').removeClass('fbm-pdp-videobox')
                        $('.chooseBikeColor .changecolorWrapperBack').css('display', 'none')
                   }
                }
            })
        },
        eventDelegateCallbackCartDiscount: function (selector, callback, e) {
            const elements = Array.from(document.querySelectorAll(selector));
            for (let i = 0, len = elements.length; i < len; i++) {
                const el = elements[i];
                if ([e.target, e.target.closest(selector)].includes(el)) {
                    callback.call(el, e);
                    break;
                }
            }
        },
        getSoldText: function () {
          let _this = this
          $('.main_product_payBtn').addClass('public-product-soldout')
          $('.main_product_payBtn').text('SOLD OUT')
          $('.prboom_button_one').addClass('public-product-soldout')
          $('.prboom_button_one span').text('SOLD OUT')
          $('.prboom_button').text('SOLD OUT')
          // $('.prboom_button').css('font-size', '14px')
          // $('.prboom_button').css('bottom', '27px')
          // EXPLORE OTHER BIKES
          document.addEventListener('click', function (e) {
              _this.eventDelegateCallbackCartDiscount('.js-keep-biketype', function () {
                  if(this){
                      e.stopPropagation()
                  }
              }, e)
          }, true)
        },
        slodOut: function () {
            let _this = this
            if((Shopify &&  Shopify.country && Shopify.country.toUpperCase() == 'AU') || window.location.pathname.indexOf('en-au') > -1) {
                if(window.location.pathname.indexOf('boom-bike-mist-grey') > -1) {
                   _this.getSoldText()
                } else {
                }
            } else if(Shopify &&  Shopify.country && (Shopify.country.toUpperCase() == 'GB') || window.location.pathname.indexOf('en-uk') > -1){
                  if(window.location.pathname.indexOf('boom-bike-mist-grey') > -1 || window.location.pathname.indexOf('boom-bike-arctic-white') > -1 || window.location.pathname.indexOf('lit-bike-moonbow-beige') > -1 ) {
                      _this.getSoldText()
                  } else {
                  }
            } else {
            }
        }
    }
fbMainPdp.init()
})