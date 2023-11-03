$(function () {
    const boomchallenge = {
        init: function () {
            if(window.innerWidth <= 768) {
                this.swiperFun()
            } else {
                this.swiperFunPc()
            }
        },
        playVideo: function(domClass){
            if(domClass.paused){ 
                domClass.play();
            }
        },
        pausedVideo: function (domClass) {
            if(!domClass.paused){
                domClass.pause();  
            }
        },
        getDistance: function (xwidth) {
            let _this = this
            let typeWidth = $('.fb-boomclg_item').innerWidth()
            let boxRollWidth = $('.fb-boomclg-content').innerWidth()
            let xindex = Math.ceil(xwidth/typeWidth)
            let showhidePage = (boxRollWidth + xwidth).toFixed(3)*1000/1000
            let showIndex = parseInt(showhidePage/typeWidth)
            $('.js-boomclg-video').each(function(ulIndex, ul) {
                let currIndex =  $(ul).attr('data-index')
                if(showIndex == currIndex) {
                    _this.playVideo($(ul)[0])
                } else {
                    _this.pausedVideo($(ul)[0])
                }
            })
        },
        swiperFunPc: function () {
            let _this = this
            let swiperName = `.fbboomclgSwiperMob`
            const swiper = new Swiper(swiperName, {
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                // direction: 'vertical',
                loop: true,
                effect: 'fade',
                parallax : true,
                reverseDirection: true,
                scrollbar: {
                    el: `.fb-boomclg-section .swiper-scrollbar`,
                    draggable: true
                }
            });        
        },
        swiperFun: function () {
            let _this = this
            let swiperName = `.fbboomclgSwiper`
            const swiper = new Swiper(swiperName, {
                // autoplay: {
                //     delay: 7000,
                //     disableOnInteraction: false,
                // },
                // loop: true,
                spaceBetween: 0,
                slidesPerView: "auto",
                cssMode: true,
                initialSlide: 0,
                centeredSlides: true,
                centeredSlidesBounds: true,   
                scrollbar: {
                  el: `.fb-boomclg-section .swiper-scrollbar`,
                  draggable: true
                },
                on: {
                  setTranslate: function(swiper,translate){
                    _this.getDistance(Math.abs(translate))
                  }
                }
            });          
        }
       
    }
    boomchallenge.init()
})