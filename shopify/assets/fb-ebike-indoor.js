
$(function () {
  let vedioIndex=0
  function ebikeDoor() {
    this.sc_li = document.getElementsByClassName('sc-li');
    this.item_title = document.getElementsByClassName('item-title');
    this.sc_progress = document.getElementsByClassName('sc-progress');
    this.sc_info = document.getElementsByClassName('item-info');
    this.sc_dx = document.getElementsByClassName('sc-dx');
    this.timer = null
    this.proHeight = null
    this.setTimer = null
    this.height = 10
  }
  ebikeDoor.prototype = {
    init: function () {
      let _this = this
      for (let i = 0; i < this.sc_li.length; i++) {
        this.sc_li[i].addEventListener("click", (e) => {
          this.animation(i)
        });
      }

    },
    animation: function (index) {
      // console.log('i点击的状态是啥啥', index)
      vedioIndex = index
      for (let i = 0; i < this.sc_progress.length; i++) {
        if (i === index) {
          this.sc_dx[i].style.opacity = "1"
          const videoElement = this.sc_dx[i].querySelector('video');
          if (videoElement) {
            videoElement.currentTime = 0
            videoElement.play()
          }
          this.sc_dx[i].style.opacity = "1"
          this.sc_progress[i].style.opacity = "0"
          this.sc_info[i].style.opacity = "1"
          this.sc_info[i].style.height = 'auto'
          this.sc_info[i].style.marginBottom = '30px'
          // this.sc_li[i].style.pointerEvents = 'none'
          this.item_title[i].style.opacity = "1"
          this.item_title[i].style.marginBottom = "14px"
          this.height = 30
        } else {
          const videoElement = this.sc_dx[i].querySelector('video');
          if (videoElement) {
            videoElement.pause()
          }
          this.sc_info[i].style.marginBottom = 0
          this.item_title[i].style.marginBottom = "30px"
          this.height = 30
          this.sc_dx[i].style.opacity = "0"
          // this.sc_li[i].style.pointerEvents = 'auto'
          this.sc_progress[i].style.opacity = "0"
          this.sc_progress[i].style.height = "100%"
          this.sc_info[i].style.opacity = 0
          this.sc_info[i].style.height = 0
          this.item_title[i].style.opacity = "0.5"
        }
      }
    },

    pcSwiperFun: function () {
      let _this = this
      var ebikeSwiper = new Swiper('.ebike-tab', {
        loop: false,
        spaceBetween: 0,
        slidesPerView: 2,
        threshold: 50,
      });

      var containerSwiper = new Swiper('.ebike-container', {
        loop: false,
        spaceBetween: 0,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        noSwiping: true, // 根据屏幕宽度设置 noSwiping 的值
        noSwiping: window.innerWidth > 768, // 根据屏幕宽度设置 noSwiping 的值
        noSwipingClass: 'ebike-container', // 设置 noSwipingClass
        thumbs: {
          swiper: ebikeSwiper
        },
        on: {
          slideChangeTransitionStart: function () {
            const gifElement = document.getElementById('u-animation');
            gifElement.style.display = 'block'
            gifElement.src = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/20230801-134455.gif?v=1690871407';
            $("#u-static-change").css('display', 'none')
          },
          slideChangeTransitionEnd: function () {
            const gifElement = document.getElementById('u-animation');
            gifElement.style.display = 'none'
            gifElement.src = ''
            $("#u-static-change").css('display', 'block')
          },
          slideChange: function () {
            const progressBox1 = document.querySelector('.fb-ebike-indoor .progress-box1');
            progressBox1.scrollTop = 0;
            const progressBox2 = document.querySelector('.fb-ebike-indoor .progress-box2');
            progressBox2.scrollTop = 0;
            var currentSlide = containerSwiper.slides[this.activeIndex];
            currentSlide.style.pointerEvents = 'auto';
            var slides = containerSwiper.slides;
            for (var i = 0; i < slides.length; i++) {
              if (slides[i] !== currentSlide) {
                slides[i].style.pointerEvents = 'none';
              }
            }
            // console.log('asdasdasdasdasdasdasdasdsa',this.activeIndex)
            //pc端判断切换后第一个dom元素是否为视频
            var elements = currentSlide.getElementsByClassName('sc-dx-right');
            if (elements.length > 0) {
              if (elements[0].children[0] instanceof HTMLVideoElement) {
                var dataIndex = $(elements[0].children[0]).data('index');
                let index = parseInt(dataIndex) - 1
                _this.animation(index)
              } else {
                _this.animation(0)
              }
            }


          }
        },
      });
    }

  }
  if ($('.fb-ebike-indoor').length > 0) {
    var act = new ebikeDoor()
    act.init()
    act.animation(0)
    act.pcSwiperFun()
    const ebikeIntersectionObserver = new IntersectionObserver((entries) => {
      let sc_dx = document.getElementsByClassName('sc-dx');
      const videoElement = sc_dx[vedioIndex].querySelector('video');
      // console.log(vedioIndex,videoElement,'参数是的什么')
      // 如果 intersectionRatio 为 0，则目标在视野外，
      if (entries[0].intersectionRatio <= 0) {
        // console.log('不在可视区域')
        if (videoElement) {
          videoElement.pause()
        }
      } else {
        if (videoElement) {
          videoElement.play()
        } 
        // console.log('在可视区域')
      }
    });
    // 开始监听
    ebikeIntersectionObserver.observe(document.querySelector(".fb-ebike-indoor"));
  }
  let controller = new ScrollMagic.Controller({ refreshInterval: 0 });
  const FbEbikes3Animation = {
      ebikeSubSwiper: null,
      ebikeIndoorSwiper: null,
      ebikeOutSubSwiper: null,
      ebikeOutdoorSwiper: null,
      lastIndoorIdx:0,
      lastOutdoorIdx:0,
      startPos:600,
      eff_delta:300,
      _domTotalH: $('.fb-ebike-indoor_mb'),
      _domInnerH: $('#fb-ebike-indoor_mb_animation'),
      totalSpace: 1400,
      scrollScene: null,
      init: function () {
          this.initdom()
          this.event()
          this.swiperFun()
      },
      initdom: function () {
          let _iosMaxheight = $('.fixed-animation-ios').innerHeight()
          this._domTotalH.css('height', (this.totalSpace + _iosMaxheight) + 'px')
          this._domInnerH.css('height', _iosMaxheight + 'px')
      },
      swiperFun: function () {
          let _this = this

          this.ebikeSubSwiper = new Swiper('.source-list', {
              speed: 500,
              slidesPerView: "auto",
              centeredSlides: true,
              centeredSlidesBounds: true,
              initialSlide: 0,
              slideToClickedSlide: true,
              direction: 'horizontal',
              // grabCursor : true,
              on: {
              },
          });
          $('.js-indoor-sub-dot').addClass('gray-cover').eq(0).removeClass('gray-cover')
          // 大swiper
          let swiperName1 = `.indoor_swiper`
          this.ebikeIndoorSwiper = new Swiper(swiperName1, {
              spaceBetween: 0,
              allowTouchMove: true,
              initialSlide: 0,
              // effect: 'fade',
              on: {
                  slideChange: function () {
                      let realIndex = parseInt(this.realIndex)
                      _this.lastIndoorIdx = realIndex;
                      _this.ebikeSubSwiper.slideTo(realIndex, 500, false)
                      $('.js-indoor-sub-dot').addClass('gray-cover').eq(realIndex).removeClass('gray-cover')
                      _this.changeVideo(realIndex)
                  }
              },
              navigation: {
                  nextEl: ".ride-small-next",
                  prevEl: ".ride-small-prev",
              },
          });

          $(`.js-indoor-sub-dot`).click(function () {
              let slideIndex = $(this).attr('data-index')
              slideIndex = parseInt(slideIndex) - 1;
              _this.ebikeIndoorSwiper.slideTo(slideIndex, 500, false)
          })


          this.ebikeOutSubSwiper = new Swiper('.source-list2', {
              speed: 500,
              slidesPerView: "auto",
              centeredSlides: true,
              centeredSlidesBounds: true,
              initialSlide: 0,
              slideToClickedSlide: true,
              direction: 'horizontal',
              // grabCursor : true,
              on: {
              },
          });
          $('.js-outdoor-sub-dot').addClass('gray-cover').eq(0).removeClass('gray-cover')
          // 大swiper
          let swiperName2 = `.outdoor_swiper`
          this.ebikeOutdoorSwiper = new Swiper(swiperName2, {
              spaceBetween: 0,
              allowTouchMove: true,
              initialSlide: 0,
              // effect: 'fade',
              on: {
                  slideChange: function () {
                      let realIndex = parseInt(this.realIndex)
                      _this.lastOutdoorIdx = realIndex;
                      _this.ebikeOutSubSwiper.slideTo(realIndex, 500, false)
                      $('.js-outdoor-sub-dot').addClass('gray-cover').eq(realIndex).removeClass('gray-cover')
                      _this.changeVideo2(realIndex)
                  }
              },
              navigation: {
                  nextEl: ".ride-small-next",
                  prevEl: ".ride-small-prev",
              },
          });

          $(`.js-outdoor-sub-dot`).click(function () {
              let slideIndex = $(this).attr('data-index')
              slideIndex = parseInt(slideIndex) - 1;
              _this.ebikeOutdoorSwiper.slideTo(slideIndex, 500, false)
          })
      },
      playChange: function () {
          if (this.isplaying) return;
          this.isplaying = true;
          $('#change').attr("src", 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/20230801-134455.gif?v=1690871407')
          setTimeout(() => {
              this.isplaying = false;
              $('#change').attr("src", 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Frame_2x_7aaaad3a-b452-4a5e-ba46-32e7378a512e.png?v=1690886732')
          }, 1000);
      },
      pauseAllVideo: function () {
          $('.ebike-mb-outdoor-file-box').each(function (index, element) {
              let _video = $(element).find('video')
              if(_video){
                  fbPausedVideo2(_video)
              }
          })
          $('.ebike-mb-file-box').each(function (index, element) {
              let _video = $(element).find('video')
              if(_video){
                  fbPausedVideo2(_video)
              }
          })
      },
      changeVideo: function (_index) {
          $('.ebike-mb-file-box').each(function (index, element) {
              let _video = $(element).find('video')
              if(_video && _video[0] && _video[0].currentTime != undefined){
                  if (_index == index) {
                      _video[0].currentTime = 0;
                      fbPlayVideo(_video)
                  } else {
                      fbPausedVideo2(_video)
                  }
              }
          })
      }, changeVideo2: function (_index) {
          $('.ebike-mb-outdoor-file-box').each(function (index, element) {
              let _video = $(element).find('video')
              if(_video && _video[0] && _video[0].currentTime != undefined){
                  if (_index == index) {
                      _video[0].currentTime = 0;
                      fbPlayVideo(_video)
                  } else {
                      fbPausedVideo2(_video)
                  }
              }
          })
      },
      // 初始化 还可以关闭视频
      slidToInit: function () {
          this.ebikeIndoorSwiper.slideTo(0, 500, false)
      },
      event: function () {
          let _this = this
          let dumbbellId = document.getElementById('fb-ebike-indoor_mb_animation');
          this.scrollScene = new ScrollMagic.Scene({
              duration: _this.totalSpace,
              triggerElement: dumbbellId, //触发元素
              triggerHook: "onLeave",
              offset: 1
          }).setPin('#fb-ebike-indoor_mb_animation').addTo(controller);

          _this.scrollScene.on("update", function (evt) {
              let delta = $(".outdoor-container")[0].clientHeight
              let temp = evt.scrollPos - evt.startPos;
              if (temp < _this.startPos) {
                  $('.animation1').css("transform", `translateY(0px)`)
                  $('.animation2').css("transform", `translateY(0px)`)
                  $('.indoor-title-container').css("opacity", `0`)
                  $('.outdoor-title-container').css("opacity", `1`)
                  $('.indoor-container').css("opacity", `0`)
                  $('.outdoor-container').css("opacity", `1`)
              }
              else if (temp > _this.startPos && temp <= _this.startPos + _this.eff_delta) {
                  _this.playChange()
                  let real = (temp - _this.startPos) / _this.eff_delta * -1;
                  $('.animation1').css("transform", `translateY(${real * 52}px)`)
                  $('.animation2').css("transform", `translateY(${real * delta}px)`)
                  $('.outdoor-title-container').css("opacity", `${1 - Math.abs(real)}`)
                  $('.indoor-title-container').css("opacity", `${Math.abs(real)}`)
                  $('.outdoor-container').css("opacity", `${1 - Math.abs(real)}`)
                  $('.indoor-container').css("opacity", `${Math.abs(real)}`)
              }
              else {
                  $('.animation1').css("transform", `translateY(-52px)`)
                  $('.animation2').css("transform", `translateY(-${delta}px)`)
                  $('.outdoor-title-container').css("opacity", `0`)
                  $('.indoor-title-container').css("opacity", `1`)
                  $('.outdoor-container').css("opacity", `0`)
                  $('.indoor-container').css("opacity", `1`)
              }
          })

          _this.scrollScene.on("enter", function (evt) {
              _this.changeVideo2(_this.lastOutdoorIdx)
              _this.changeVideo(_this.lastIndoorIdx)
          })
          _this.scrollScene.on("leave", function (evt) {
             // _this.pauseAllVideo();
          })
          $('.ride-small-item').click(function () {
              if ($(this).hasClass('ride-video-select')) {
                  return false
              }
              let my_index = $(this).attr('data-index')
              _this.ebikeIndoorSwiper.slideTo(my_index, 500, false)
          })
      }
  }
  if ($('.fb-ebike-indoor_mb').length > 0) {
      setTimeout(()=> {
          FbEbikes3Animation.init()
      }, 200)
  }
})