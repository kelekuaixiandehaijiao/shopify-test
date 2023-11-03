$(function () {
  var realIndex =null
  function NewClass() {
    this.currentIndex = 0
    this.initialSlide = 3
    this.isPc = getPcOrMobile()
  }
  NewClass.prototype = {
    init: function () {
      this.classSwiperFun()
    },
    classSwiperFun: function () {
      let _this = this
      _this.myClassSwiper = new Swiper('.new-class', {
        loop: true,
        centeredSlides: _this.isPc==1?true:false,
        initialSlide:0,
        centeredSlidesBounds: _this.isPc==1?true:false,
        speed: 500,
        spaceBetween: 0,
        slidesPerView: _this.isPc==1?"auto":1,
        noSwiping: _this.isPc==1?true:false, // 根据屏幕宽度设置 noSwiping 的值
        noSwipingClass: 'swiper-wrapper', // 设置 noSwipingClass
        navigation: {
          nextEl: '.class-button-next',
          prevEl: '.class-button-prev',
        },
        pagination: {
          el: '.class-swiper-pagination',
          clickable: true
        },
        loopedSlides: 5,
        on: {
          slideChange: function () {
            realIndex = this.realIndex; // 获取当前居中的slide的索引
            // console.log(realIndex,'hahahhah当前居中的slide的索引',this.activeIndex)
            if(window.innerWidth<768){
              $('.class-img-box').each(function(index,ele){ 
                let boxIndex = $(ele).attr('data-index')
                 if(boxIndex==(realIndex+1)){
                   $(ele).removeClass('clicked')
                   $(ele).siblings().addClass('clicked')
                   if (_this.classlistSwiper) {
                    _this.classlistSwiper.slideTo(boxIndex, 500, false)
                  }
                 }
               })
            }
            $('.new-class-vedio').each(function (index, ele) {
              let currIndex = $(ele).attr('data-index')
              if ((realIndex +1)== currIndex) {
                _this.playVideo($(ele)[0])
              }else{
                _this.pausedVideo($(ele)[0])
              }
            })
            
          },
        }
      })
      _this.classlistSwiper=new Swiper('.fb-class-list',{
        speed: 500,
        slidesPerView: "auto",
        initialSlide: 0,
        slideToClickedSlide: true,
      })
      $('.class-img-box').click(function () {
        let slideIndex = $(this).attr('data-index')
        $(this).removeClass('clicked')
        $(this).siblings().addClass('clicked')
        slideIndex = parseInt(slideIndex-1);
        // console.log(slideIndex,'点击的索引是什么')
        _this.myClassSwiper.slideToLoop(slideIndex, 500, false)
     })
    },
    playVideo: function (domClass) {
      domClass.currentTime=0
      domClass.play()
    },
    pausedVideo: function (domClass) {
      domClass.pause();
    },
  }
  if ($('.fb-new-class').length > 0) {
    var NewClass = new NewClass()
    NewClass.init()
    const classIntersectionObserver = new IntersectionObserver((entries) => {
      // var videoElement=null
      if (entries[0].intersectionRatio <= 0) {
        // console.log('非可视区')
        $('.new-class-vedio').each(function (index, ele) {
          let currIndex = $(ele).attr('data-index')
          if ((realIndex +1)== currIndex) {
            // console.log('暂停了')
            $(ele)[0].pause()
          }
        })
      } else {
        // console.log('是啊可视区')
        $('.new-class-vedio').each(function (index, ele) {
          let currIndex = $(ele).attr('data-index')
          if ((realIndex +1)== currIndex) {
            // console.log('播放啊')
            $(ele)[0].play()
          }
        })
      }
    });
    // 开始监听
    if(window.innerWidth>768){
      classIntersectionObserver.observe(document.querySelector(".fb-new-class"));
    }
  }
})