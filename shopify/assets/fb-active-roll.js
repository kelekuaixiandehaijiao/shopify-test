  $(function () {
      function FbActiveRoll () {
        this.currentIndex = 0
        this._Id = null
        this.isPc = getPcOrMobile()
      }
      FbActiveRoll.prototype = {
          init: function(_sectionName) {
              this._Id = _sectionName
              this.swiperFun()
              this.event()
          },
          swiperFun: function () {
              let _this = this
              let swiperName = `${_this._Id}>.fbActiveRollSwiper`
              const swiper = new Swiper(swiperName, {
                  speed: 500,
                  spaceBetween: 0,
                  slidesPerView: "auto",
                  cssMode: true,
                  mousewheel: true,
                  initialSlide: 0,
                  centeredSlides: true,
                  centeredSlidesBounds: true,   
                  scrollbar: {
                    el: `${_this._Id} .swiper-scrollbar`,
                    draggable: true
                  },
                  on: {
                    setTranslate: function(swiper,translate){
                      _this.visibleFun(translate)
                    }
                  }
              });          
              
          },
          visibleFun: function(translate) {
              let _this = this
              $(`${_this._Id} .js-activeroll-box`).each(function(ulIndex, ul) {
                  let isShowvideo = $(ul).attr('data-showvideo')
                  if(isShowvideo === 'true') {
                    let currIndex =  $(ul).attr('data-index')
                    // let translates = $(`${_this._Id} .fb-activeroll_scroll`).css('transform')
                    // let obj = getTransformByMatrix(translates)
                    _this.getDistance(Math.abs(translate),currIndex,$(ul))
                  }
              })
          },
          getDistance: function (xwidth, currIndex, dom) {
            let _this = this
            let typeWidth = $(`${_this._Id} .fb-activeroll_item`).innerWidth()
            let boxRollWidth = $(`${_this._Id} .fb-activeroll-content`).innerWidth()
            let xindex = Math.ceil(xwidth/typeWidth)
            let showhidePage = (boxRollWidth + xwidth).toFixed(3)*1000/1000
            let showIndex = parseInt(showhidePage/typeWidth)
           
            if( currIndex >= xindex  &&  currIndex < showIndex) {
            } else {
              _this.clsoeVideo(dom)
            }
          },
          clsoeVideo: function (dom) {
            // console.log('dom', dom)
            dom.find('.js-activevideo-box').hide()
            dom.find('.js-activeimg-box').show()
            dom.find('.js-active-video').trigger('pause')
            dom.attr('data-showvideo', 'false')
          },
          event: function () {
              let _this = this
              $('body').on('click', `${_this._Id} .js-activeimg-box`, function(e) {
                	e.stopPropagation();
                  let pare = $(this).parents('.js-activeroll-box')
                  let isopen = pare.attr('data-showvideo')
                  console.log("isopen", isopen)
                  if(isopen === 'true') {
                    return false
                  }
                  $(`${_this._Id} .js-activevideo-box`).hide()
                  $(`${_this._Id} .js-activeimg-box`).show()
                  $(`${_this._Id} .js-activeroll-box`).attr('data-showvideo', 'false')
                  $(this).hide()
                  pare.find('.js-activevideo-box').show()
                  $(`${_this._Id} .js-active-video`).trigger('pause')
                  
                  pare.find('.js-active-video').trigger('play')
                  pare.attr('data-showvideo', 'true')

                  pare.find('.js-active-video').bind('ended', ()=>{
                    $(this).show()
                    pare.attr('data-showvideo', 'false')
                    pare.find('.js-activevideo-box').hide()
                  })
              })
          }
      }
      let activeRollType = $('.fb-activeroll-section[data-type="activeroll"]')
      if(activeRollType.length > 0) {
        $.each(activeRollType, function (i, item) {
            let id = $(item).attr('id')
            new FbActiveRoll().init(`#${id}`);
        })
      }
  })