const MsgBox = {
  timer1: null,
  timer2: null,
  _html: '',
  ishow: false,
  init: function(msg, time) {
      if(this.ishow) {
          return false
      }
      this.ishow = true
      if($('#markt-hotal').length > 0) {
          $('#markt-hotal').remove()
      }
      this.GenerateHtml(msg, time)
  },
  GenerateHtml: function(msg,time) {
      this._html = `<div id="markt-hotal">
          <div class="markt-toast_box">
              <p id="market-toast">${msg}</p>
          </div>
      </div>`
      $("body").append(this._html);
      this.event(time)
  },
  event: function (time) {
      let _this = this
      $('.markt-toast_box').css({ display: 'inline-block'} )
      _this.timer1 = setTimeout(function(){
          // $('.markt-toast_box').css({animation: 'markethide 1.5s'} )
          _this.timer2 = setTimeout(function(){
              $('.markt-toast_box').css({ display: 'none'} )
              _this.ishow = false
              clearTimeout(_this.timer2)
              _this.timer1 && clearTimeout(_this.timer1)
          }, 1400)
      }, time)  
  }

}
$(function() {
  const fbHeaderBanner = {
    init: function () {
      // 初始化z-index
      let fb_current = $(`.annou-bar-swiper-slide[data-number=1]`)
      let fb_type = fb_current.attr('data-type')
      if (fb_type === 'scrollBar') {
        $('.annou-bar-deal-size1').css('z-index', 2)
        $('.annou-bar-deal-size2').css('z-index', 2)
        $('.annou-button-offer-position').css('z-index', 2)
      }
      let number = $('.annou-bar-swiper-slide').attr('data-length')
      if (number <= 1) {
        $('.announcement-left').hide()
        $('.announcement-right').hide()
      } else {
        this.swiperFun()
      }
      if ($('.js-view-annou-number').length) {
        $('.js-view-annou-number').text($('.annou-box-li').length)
      }
    },
    swiperFun: function () {
      const headerSwiper = new Swiper("#headerBanner", {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        loop: true,
        threshold: 8,
        effect: "fade",
        fadeEffect: {
          crossFade: true
        },
        on: {
          slideChange: function () {
            let realIndex = parseInt(this.realIndex) + 1
            let _current = $(`.annou-bar-swiper-slide[data-number=${realIndex}]`)
            let type = _current.attr('data-type')
            if (type === 'scrollBarImg') {
              $('.annou-bar-deal-size1').css('z-index', -1)
              $('.annou-bar-deal-size2').css('z-index', -1)
              $('.annou-button-offer-position').css('z-index', -1)
            } else {
              $('.annou-bar-deal-size1').css('z-index', 2)
              $('.annou-bar-deal-size2').css('z-index', 2)
              $('.annou-button-offer-position').css('z-index', 2)
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
  // 移动端隐藏头部
  if(window.innerWidth < 640 && window.location.pathname.indexOf('class')  === -1) {
    const currentRoute = window.location.pathname;
    let isPdp = false
    if (currentRoute.includes('products')) {
      isPdp = true
    } else {
      isPdp = false
    }
    const currentHref = window.location.href;
    var lastScrollPosition = 0;
    window.addEventListener('resize', evt => {
      evt.stopImmediatePropagation();
      evt.preventDefault();
    }, true)
    var fblastTime = 0
    window.addEventListener('scroll', function () {
      var currentScrollPosition = window.pageYOffset;
      // if (new Date().getTime() - fblastTime < 200) {
      //   return;
      // }
      // fblastTime = new Date().getTime();
      if (isPdp) return false
      if (currentScrollPosition > lastScrollPosition) {
        if (currentScrollPosition > 200) {
          $('#sticky-top-box').addClass('upTodown')
          $('#sticky-top-box').removeClass('downToUp')
        } else{
          $('#sticky-top-box').removeClass('upTodown')
          $('#sticky-top-box').removeClass('downToUp')
        }
      } else {
        // $('#sticky-top-box').slideDown()
        $('#sticky-top-box').addClass('downToUp')
        $('#sticky-top-box').removeClass('upTodown')
      }
      lastScrollPosition = currentScrollPosition;
    }, true)
  }
})