$(function () {
    function FbGifRoll () {
      this.currentIndex = 0
      this._Id = null
      this.isPc = getPcOrMobileNew()
    }
    FbGifRoll.prototype = {
        init: function(_sectionName) {
            this._Id = _sectionName
            this.swiperFun()
            this.event()
        },
        swiperFun: function () {
          let _this = this
            let centeredSlides = false
            let initialSlide = 0
            let centeredSlidesBounds = false
            if(this.isPc === 2) {
              centeredSlides = true
              initialSlide = 1
              centeredSlidesBounds=true
            }
            let swiperName = `${_this._Id} .fbGifRollSwiper`
            const swiper = new Swiper(swiperName, {
                speed: 500,
                spaceBetween: 0,
                slidesPerView: "auto",
                initialSlide: initialSlide,
                centeredSlides: centeredSlides,
                centeredSlidesBounds: centeredSlidesBounds,
                on: {
                  slideChangeTransitionEnd: function () {
                      _this.visibleFun(this.activeIndex)
                  }
                },
                navigation: {
                  nextEl: `${_this._Id} .gifroll-button-next`,
                  prevEl: `${_this._Id} .gifroll-button-prev`,
                },
                pagination: {
                  el: `${_this._Id} .gifroll-swiper-pagination`,
                  clickable: true,
                },
            });          
            
        },
        getDistance: function (xwidth, currIndex, dom) {
          let _this = this
          let typeWidth = $(`${_this._Id} .fb-gifroll_item`).innerWidth()
          let boxRollWidth = $(`${_this._Id} .fb-gifroll-content`).innerWidth()
          let xindex = Math.ceil(xwidth/typeWidth)
          let showhidePage = (boxRollWidth + xwidth).toFixed(3)*1000/1000
          let showIndex = parseInt(showhidePage/typeWidth)
          if( currIndex > xindex  &&  currIndex <= showIndex) {
          } else {
            _this.clsoeGif(dom)
          }
        },
        visibleFun: function (activeindex){
          let _this = this
         if(_this.isPc === 2) {
              this.activeGif()
              return false
          }
          $(`${_this._Id} .js-gifroll-box`).each(function(ulIndex, ul) {
              let isShowgif = $(ul).attr('data-showgif')
              if(isShowgif === 'true') {
                let currIndex =  $(ul).attr('data-index')
                let translates = $(`${_this._Id} .fb-gifroll_scroll`).css('transform')
                let obj = getTransformByMatrix(translates)
                _this.getDistance(Math.abs(obj.x),currIndex,$(ul))
              }
          })
        },
        clsoeGif: function (dom) {
            if(dom.find('.js-gif-box')){
              $(this).find('.js-gif-box').removeClass('fgshowGif')
              $(this).find('.js-gif-box').addClass('fgshowHide')
              dom.find('.js-gif-box').hide()
            }
            dom.find('.js-img-box').show()
            dom.attr("data-type", 'img')
          },
        activeGif: function () {
          let _this = this
            $(`${_this._Id} .js-gifroll-box`).each(function(ulIndex, ul) {
                let isShowgif = $(ul).attr('data-showgif')
                if(isShowgif === 'true') {
                  _this.clsoeGif($(ul))
                }
            })
        },
        event: function () {
            let _this = this
            $('body').on('click', `${_this._Id} .js-gifroll-box`, function(e) {
                e.stopPropagation();
                let imgUrl = ""
                let type = $(this).attr('data-type')
                let isShowgif = $(this).attr('data-showgif')
                if(type === 'img'){
                    _this.activeGif()
                    imgUrl  = ($(this).attr('data-srcgif'))
                    $(this).find('.js-img-box').hide()
                    $(this).attr("data-type", 'gif')
                    if(isShowgif === 'false') {
                        let imgHtml = `<div class="fb-gifroll_imgblock js-gif-box fgshowGif"><img class="Image--lazyLoad Image--fadeIn gifroll-img-block" 
                            data-src="${imgUrl}" 
                            data-sizes="auto"
                            data-optimumx="1.2"
                            data-widths="[400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200]"
                            data-sizes="auto"
                        /><span class="Image__Loader"></span> </div>`
                        $(this).append(imgHtml) 
                        $(this).attr("data-showgif", 'true')
                    } else {
                        $(this).find('.js-gif-box').show()
                    }
                } else {
                    $(this).attr("data-type", 'img')
                    $(this).find('.js-img-box').show()
                    if($(this).find('.js-gif-box')){
                        $(this).find('.js-gif-box').removeClass('fgshowGif')
                        $(this).find('.js-gif-box').addClass('fgshowHide')
                        $(this).find('.js-gif-box').hide()   
                    }
                }
            })
        }
    }
    let gifRollType = $('.fb-gifroll-section[data-type="gifroll"]')
    if(gifRollType.length > 0) {
      $.each(gifRollType, function (i, item) {
          let id = $(item).attr('id')
          new FbGifRoll().init(`#${id}`);
      })
    }
})