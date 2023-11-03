$(function () {
    function productCardswiper () {
        this._Id = null
    }
    productCardswiper.prototype = {
        init: function (_sectionName) {
            this._Id = _sectionName
            if(window.innerWidth <= 768) {
                this.swiperFun()
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
            let typeWidth =  $(`${_this._Id} .fpc-box_item`).innerWidth()
            let boxRollWidth = $(`${_this._Id} .fbcardproductSwiperMob`).innerWidth()
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
        swiperFun: function () {
            let _this = this
            let swiperName = `${_this._Id} .fbcardproductSwiperMob`
            const swiper = new Swiper(swiperName, {
                spaceBetween: 0,
                slidesPerView: "auto",
                cssMode: true,
                initialSlide: 0,
                centeredSlides: true,
                centeredSlidesBounds: true,   
                // scrollbar: {
                //   el: `.fb-boomclg-section .swiper-scrollbar`,
                //   draggable: true
                // },
                on: {
                  setTranslate: function(swiper,translate){
                    _this.getDistance(Math.abs(translate))
                  }
                }
            });          
        }
    }
    let productSwiperCard = $('.fb-product-card[data-type="productSwiperCard"]')
    let productcardlazy = setTimeout(() => {
        $('.fb_pages_select_frame').show()
        $('.js-prodcutpage-overview').show()
        $('.js-prodcutpage-specail').show()
        $('.fb_pages_bike_img').css('visibility', 'visible')
        if(productSwiperCard.length > 0) {
            $.each(productSwiperCard, function (i, item) {
                let id = $(item).attr('id')
                new productCardswiper().init(`#${id}`);
            })
        } 
        productcardlazy && clearTimeout(productcardlazy)
    }, 5000)
   

})