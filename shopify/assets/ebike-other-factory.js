$(function() {
  if(document.querySelector('[data-section-type="customer-product"]')) {
      var teemo_customer_options = JSON.parse(document.querySelector('[data-section-type="customer-product"]').getAttribute('data-section-settings'));
      var teemo_customer_mediaList = {}
      var imageZoomInstancList = {}
      var teemo_customer_video_dom = document.querySelectorAll('[data-media-type-pdp="video"], [data-media-type-pdp="external_video"]')
      if(teemo_customer_video_dom.length) {
          teemo_customer_video_dom.forEach(function (video) {
              teemo_customer_mediaList[video.getAttribute('data-media-id')] = new Shopify.Plyr(video.querySelector('video'), {
                  controls: ['play', 'progress', 'mute', 'volume', 'play-large', 'fullscreen'],
                  loop: {
                      active: false
                  },
                  hideControlsOnPause: true,
                  clickToPlay: true,
                  iconUrl: '//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg',
                  tooltips: {
                      controls: false,
                      seek: true
                  }})
          });
      }
  }
  let fbShopifyRoot = window.Shopify.routes.root
  function FbEbikeRool () {
      this._Id = null
      this.fbEbikeRollSwiper = null
      this.fbEbikeImgSwiper = null
      this.isCenterActive = true
  }
  FbEbikeRool.prototype = {
      init: function(_sectionName) {
          this._Id = _sectionName
          $(`${this._Id} .js-pdp-dot`).removeClass('is-selected')
          $(`${this._Id} .js-pdp-dot[data-index=0]`).addClass('is-selected')
          // 计算是否需要点击居中
          let squel_height = window.innerWidth > 768 ? $(`${this._Id} .ebike-thumbnails-box`).height() : window.innerWidth
          let single = $(`${this._Id} .js-pdp-dot`).outerHeight(true)
          let _img_length = $(`${this._Id} .ebike-thumbnails-box`).attr('data-imglength')
          if(_img_length * single  < squel_height) { 
            $(`${this._Id} .ebike-thu-scroll-right`).hide()
            $(`${this._Id} .ebike-thu-scroll-left`).hide()
            this.isCenterActive = false
          }
          // 计算结束
          this.swiperFun()    
      },
      playVideo: function(videodom){
          if(videodom.length > 0) {
              videodom.each(function(index,elemet) {
                  if(elemet.paused) {
                      let playPromise = elemet.play()
                      if (playPromise !== undefined) {
                          playPromise.then(() => {
                              elemet.play()
                          }).catch(()=> {
                          
                          })
                      }
                      // elemet.play()
                  }
              })
          }
      },
      pausedVideo: function (videodom) {
          if(videodom.length > 0) {
              videodom.each(function(index, elemet) {
                  if(!elemet.paused) {
                      elemet.pause()
                  }
              })
          }
      },
      swiperFun: function () {
          let _this = this
          let swiper_direction = window.innerWidth > 768 ? 'vertical' : 'horizontal'
          let swiperName2 = `${_this._Id} .fbEbikeRollSwiper`
          let allowTouchMove = window.innerWidth > 768 ? false : true
          let threshold = window.innerWidth > 768 ? 10 : false
          this.fbEbikeRollSwiper = new Swiper(swiperName2, {
              speed: 500,
              slidesPerView: "auto",
              centeredSlides: _this.isCenterActive,
              centeredSlidesBounds: _this.isCenterActive,
              initialSlide: 0,
              // preventClicksPropagation : false,
              slideToClickedSlide: true,
              direction: swiper_direction,
              threshold : threshold,
              grabCursor : true,
              // allowTouchMove: allowTouchMove,
              on: {
              },
              navigation: {
                  nextEl: `${_this._Id} .ebike-thu-scroll-right`,
                  prevEl: `${_this._Id} .ebike-thu-scroll-left`,
              }        
          });
          let swiperName1 = `${_this._Id} .fbEbikeImgSwiper`
          this.fbEbikeImgSwiper = new Swiper(swiperName1, {
              spaceBetween: 0,
              allowTouchMove: allowTouchMove,
              direction: swiper_direction,
              on: {
                  slideChange: function() {
                      let realIndex = parseInt(this.realIndex)
                      _this.fbEbikeRollSwiper.slideTo(realIndex, 500, false)
                      $(`${_this._Id} .js-pdp-dot`).removeClass('is-selected')
                      $(`${_this._Id} .js-pdp-dot[data-index=${realIndex}]`).addClass('is-selected')
                      let _current = $(`${_this._Id} .ebike-pdp-slidebox-slide[data-index=${realIndex}]`)
                      let type = _current.attr('data-media-type')
                      let video_all = $(`${_this._Id} .ebike-pdp-slidebox-slide[data-media-type=video]`)
                      video_all.each(function() {
                          let _video2 = $(this).find('video')
                          _this.pausedVideo(_video2)
                      })
                      if(type === 'video') {
                          let _video1 = _current.find('video')
                          _this.playVideo(_video1)
                          if(!allowTouchMove) {
                              // pc端video上文案变颜色
                              $('.ebike-fbm-stamp-container').addClass('ebike-video-color')
                          }
                      } else {
                          if(!allowTouchMove) {
                               // pc端video上文案恢复原来的颜色
                              $('.ebike-fbm-stamp-container').removeClass('ebike-video-color')
                          }
                      }
                      if($('.ebike-dimens-section').length > 0 && window.innerWidth < 769) {
                          let _img_length = $(`${_this._Id} .ebike-thumbnails-box`).attr('data-imglength')
                          if(realIndex == (parseInt(_img_length) - 2)) {
                              $('.ebike-dimens-section').show()
                          } else {
                              $('.ebike-dimens-section').hide()
                          }
                      }
                  }
              }        
          }); 
          $(`${_this._Id} .js-pdp-dot`).click(function () {
              let slideIndex = $(this).attr('data-index')
              _this.fbEbikeImgSwiper.slideTo(slideIndex, 500, false)
              $(`${_this._Id} .js-pdp-dot`).removeClass('is-selected')
              $(this).addClass('is-selected')
          })
      },
      // 初始化 还可以关闭视频
      slidToInit: function () { 
          this.fbEbikeImgSwiper.slideTo(0, 500, false)
      },
      changeDirection: function (direction) {
          this.fbEbikeRollSwiper.changeDirection(direction)
          this.fbEbikeImgSwiper.changeDirection(direction)
          this.fbEbikeImgSwiper.slideTo(0, 500, false)
          this.fbEbikeRollSwiper.slideTo(0, 500, false)
      }
  }
  let activeRollType = $('.ebike-img-sliditem')
  var activeRollObj = {}
  var fbInitInnerWidth = window.innerWidth
  if(activeRollType.length > 0) {
      $.each(activeRollType, function (i, item) {
          let id = $(item).attr('id')
          activeRollObj[id] = new FbEbikeRool()
          activeRollObj[id].init(`#${id}`);
      })
  }
 
  const fbBikeAddToCart = {
      isloading: false,
      isSingleProduct: false,
      giftArry: [],
      showMoreGift: false,
      selectQuery: {
          id: "",    //variants id
          name: "",
          price: "",
          media: null,
          option1: "", //size
          option2: "", //color
          option3: "", //style
          secondlySize: [],
          quantity: 1,
          available: true //是否有库存
      },
      space: 6,
      productObj: null,
      queryId: null,
      fbEbikeZoomSwiper: null,
      imgArr: [],
      // addSSucc: false,
      init: function () {
          let _this = this
          // pc端才有放大swiper 因为是响应式布局 所有mob端不需要放大 但需要提前初始化
          _this.initZoomSwper()
          if(window.innerWidth < 769) {
              _this.initEbikeIntroSwiper()
          }
          _this.queryId = getQueryString('variant')
          if(window.fbproduct) {
              _this.productObj = window.fbproduct
              _this.initNeedProduct()
          } else {
              _this.getProduct(function (product) {
                  _this.productObj = product
                  _this.initNeedProduct()
              })
          }
          // 监听响应式布局切换
          window.addEventListener('resize', throttleNew(this.roolOnresize))
      },
      initNeedProduct: function () {
          this.initProductId()
          this.event()
          // this.imgevent()
      },
      refreshSection: function () {
          setTimeout(function () {
              document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                  bubbles: true  //this code is for prestige theme, is to refresh the cart
              }));
          }, 300);
      },
      klaviyAdd: function (_items) {
          let _this = this
          if(window._learnq){
              window._learnq.push(['track', 'Added to Cart', { Product: _this.selectQuery.name }]);
          }
      },
      loadAjaxNew: function () {
      },
      loadAjax: function () {
          let _this = this
          let formData = {
              items: [{
                  id: _this.selectQuery.id,
                  quantity: _this.selectQuery.quantity,
                  sections: "cart-drawer,cart-icon-bubble"
              }]
          };
          if(_this.giftArry && _this.giftArry.length >0){
              formData.items =  [...(formData.items),..._this.giftArry]
          }
          
          fetch(fbShopifyRoot + 'cart/add.js', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          }).then(function (res) {
              return res.json();
          }).then((data) => {
              _this.isloading = false
              if(data && data.items && data.items.length > 0) {
                  _this.klaviyAdd(data.items)
                  // window.location.href= "/cart"
                  document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                      bubbles: true
                  }));
                  $('.js-open-minicart').click()
              } else {
                  document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                      bubbles: true
                  }));
                  $('.js-open-minicart').click()
                  MsgBox.init(data.description || 'Oops, please try again', 2000)
              }
          }).catch((error) => {
              // $('.js-ebike-addtocart').attr('disabled', false)
              MsgBox.init('Oops, please try again', 2000)
              _this.isloading = false
          })
      },
      getProduct: function (callback) {
          $.getJSON(window.location.pathname, function(product) {
              callback && callback(product)
          })
      },
      getSoldOut: function () {
          let _this = this
          if(!this.selectQuery.available) {
              $('.js-ebike-addtocart').each(function() {
                  let soldout_text = $(this).attr('data-soldout')
                  let is_soldout_style = $(this).attr('data-soldout-style')
                  // let origin_text = $(this).attr('data-origintext')
                  if(is_soldout_style && is_soldout_style == 'true' && !$(this).hasClass('public-product-soldout')) {
                      $(this).addClass('public-product-soldout')
                      if($(this).find('span').length) {
                          $(this).find('span').text(soldout_text)
                      } else {
                          $(this).text(soldout_text)
                      }
                  }
              })
          } else {
              $('.js-ebike-addtocart').each(function() {
                  // let soldout_text = $(this).attr('data-soldout')
                  let is_soldout_style = $(this).attr('data-soldout-style')
                  let origin_text = $(this).attr('data-origintext')
                  if($(this).hasClass('public-product-soldout')) {
                      $(this).removeClass('public-product-soldout')
                      if($(this).find('span').length) {
                          $(this).find('span').text(origin_text)
                      } else {
                          $(this).text(origin_text)
                      }
                  }
              })
          }
      },
      // 初始化productid
      initProductId: function () {
          let _this = this
          if(_this.productObj && _this.productObj.variants && _this.productObj.variants.length){
              if(_this.productObj.variants.length == 1) {
                  _this.isSingleProduct = true
              }
              _this.productObj.variants.forEach((item, index)=> {
                  if(_this.queryId == item.id) {
                      _this.selectQuery.media = _this.productObj.media.slice(index * _this.space, (index * _this.space) + _this.space)
                      _this.selectQuery = Object.assign(_this.selectQuery, item)
                  } else {
                      if(index == 0) {
                          _this.selectQuery.media = _this.productObj.media.slice(index * _this.space, (index * _this.space) + _this.space)
                          _this.selectQuery = Object.assign(_this.selectQuery, item)
                      }
                  }
              })
              _this.changeImgSlide()
              _this.getSoldOut()
          }
      },
      // 切换车的类型 图片操作
      changeImgSlide: function () {
          let _this = this
          // $('.ebike-img-sliditem').css('display', 'none')
          $(`#ebike-product-${_this.selectQuery.id}`).css('display', 'flex').siblings().css('display', 'none')
          activeRollObj[`ebike-product-${_this.selectQuery.id}`].slidToInit()
          let video_all = $(`.ebike-more-imgarr .ebike-pdp-slidebox-slide[data-media-type=video]`)
          video_all.each(function() {
              let _video2 = $(this).find('video')
              fbPausedVideo(_video2)
          })
          // 初始化放大或者缩小
          let imgarr = []
          let strdom = ''
          $(`#ebike-product-${_this.selectQuery.id}`).find('.Product__SlideItem--image').each(function(index, ele) {
              let imgurl =  $(ele).find('img').attr('data-original-src')
              let str = `<div class="swiper-slide"><div class="ebike-zoom-relative swiper-zoom-container relative">
              <img class="w-full h-auto Image--lazyLoad Image--fadeIn" data-src="${imgurl}" />
              <span class="Image__Loader"></span>
              </div>
              </div>`
              strdom += str
          })
          if(strdom) {
              $('.ebike-zoom-warpper').html(strdom)
              _this.fbEbikeZoomSwiper && _this.fbEbikeZoomSwiper.update(true)
          }
          
      },
      swiperFun: function () {
          let _this = this   
      },
      event: function () {
          let _this = this
          $('.js-keep-biketype').click(function() {
              $('.js-ebike-addtocart')[0].click()
          })
          $('body').on('click', '.js-ebike-addtocart', function(e) {
              // 无库存时无法加入购物车
              if(!_this.selectQuery.available) {
                  return false
              }
              if(_this.isloading) {
                  return false
              }
              _this.isloading = true
              _this.giftArry = []
              $('.js-gift-getselect').each(function() {
                  let _data_check = $(this).attr('data-checked')
                  if(_data_check == 'true') {
                      let _id = $(this).attr('data-gift')
                      _this.giftArry.push({id: _id, quantity: _this.selectQuery.quantity}) 
                  }
              })
              _this.loadAjax()
              
          })

          // 点击图片进行放大操作
          $('.Product__SlideItem--image').click(function() {
              // 二次判断 pc切为mob
              if(window.innerWidth > 768) {
                  lockBody()
                  let zoomindex = $(this).attr('data-zoom-index')
                  $('.js-ebike-zoom-popup').addClass('ebike-zoom-popup-show')
                  _this.fbEbikeZoomSwiper.slideTo(zoomindex)
              } else {
                  return false
              }
          })
          $('.js-ebike-zoom-close').click(function() {
              autoBody()
              $('.js-ebike-zoom-popup').removeClass('ebike-zoom-popup-show')
              _this.fbEbikeZoomSwiper.zoom.out()
          })
      },
      initZoomSwper: function () { 
          let _this = this
          this.fbEbikeZoomSwiper = new Swiper('.fbEbikeZoomSwiper', {
              spaceBetween: 0,
              allowTouchMove: false,
              effect: 'fade',
              fadeEffect: {
                  crossFade: true
              },
              zoom : {
                  maxRatio: 3,
              },
              on: {
              },
              navigation: {
                  nextEl: ".ebike-zoom-next",
                  prevEl: ".ebike-zoom-prev",
               },        
          });
      },
      initEbikeIntroSwiper: function () {
          let dom2 =  new Swiper('.fbEbikIntroSwiper', {
              allowTouchMove: true,
              slidesPerView: "auto",
              centeredSlides : true,
              centeredSlidesBounds: true,
              initialSlide: 0,
              on: {
              },
              navigation: {
                  nextEl: ".ebike-fbcur-rightmodel",
                  prevEl: ".ebike-fbcur-leftmodel",
               },        
          });
      },
      roolOnresize: function () { 
          let currentW =  window.innerWidth
          if(fbInitInnerWidth === currentW) {
              return false
          }
          if(activeRollObj) {
              Object.keys(activeRollObj).forEach(function (key) {
                  if(currentW < 769 && fbInitInnerWidth > 768){
                      activeRollObj[key].changeDirection('horizontal')
                  } else if( currentW > 768 && fbInitInnerWidth < 769) {
                      activeRollObj[key].changeDirection('vertical')
                  }
              })
          }
          fbInitInnerWidth = currentW
      }
  }
  fbBikeAddToCart.init()
});