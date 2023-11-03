
  
$(function () {
    let fbShopifyRoot = window.Shopify.routes.root
    function FbEbikeRool () {
        this._Id = null
        this.fbEbikeRollSwiper = null
        this.fbEbikeImgSwiper = null
    }
    FbEbikeRool.prototype = {
        init: function(_sectionName) {
            this._Id = _sectionName
            $(`${this._Id} .js-pdp-dot`).removeClass('is-selected')
            $(`${this._Id} .js-pdp-dot[data-index=0]`).addClass('is-selected')
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
                centeredSlides : true,
                centeredSlidesBounds: true,
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
                        if($('.ebike-dimens-section').length > 0&&window.innerWidth<768) {
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
        secondlyQuery: [
            {
                option1: "High-Step",
                arr: [{
                    option3: "Regular",
                    number: `5'6"-6'4"`,
                    icon: 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/ebike-r.png?v=1690539700',
                    active: 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/ebike-rr.png?v=1690539701',
                    default: true
                }]
            },
            {
                option1: "Step-Thru",
                arr: [{
                    option3: "Regular",
                    number: `5'1"-6'`,
                    icon: 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/ebike-r.png?v=1690539700',
                    active: 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/ebike-rr.png?v=1690539701',
                    default: true
                }]
            }
        ],
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
        loadAjax: function () {
            let _this = this
            let formData = {
                items: [{
                    id: _this.selectQuery.id,
                    quantity: _this.selectQuery.quantity
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
                    MsgBox.init(data.description || 'Oops, please try again', 2000)
                }
            }).catch((error) => {
                // $('.js-ebike-addtocart').attr('disabled', false)
                MsgBox.init('Oops, please try again', 2000)
                _this.isloading = false
            })
        },
        getProduct: function (callback) {
            $.getJSON(window.Shopify.routes.root + 'products/morphrover-2-in-1-ebike.js', function(product) {
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
        initBikeShow: function () {
            let _this = this
            $('.js-ebike-productcolor').each(function () {
                  //option2 color
                let data_color = $(this).attr('data-color')
                if(data_color == _this.selectQuery.option2) {
                    $(`.js-ebike-productcolor[data-color='${data_color}']`).addClass('ebike-choose-item-checked').siblings().removeClass('ebike-choose-item-checked')
                    $('.js-ebike-color').text(data_color)
                }
            })
            $('.js-ebike-productsize').each(function () {
                //option1 size
                let data_size = $(this).attr('data-size')
                if(data_size == _this.selectQuery.option1) {
                    $(this).addClass('ebike-choose-item-checked').siblings().removeClass('ebike-choose-item-checked')
                    $('.js-sizemob-name').text(data_size)
                }
            })
        },
        // 初始化productid
        initProductId: function () {
            let _this = this
            if(_this.productObj && _this.productObj.variants && _this.productObj.variants.length){
                if(_this.productObj.variants.length == 1) {
                    _this.isSingleProduct = true
                    _this.getCountryNum(_this.productObj.variants[0].id)
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
                if(!_this.isSingleProduct) {
                    _this.initBikeShow()
                }
                _this.changeImgSlide()
                // _this.getSoldOut()
            }
        },
        // 自动售罄与超卖
        getCountryNum:function(id){
            let overSoldCaArr=window.fbGlobalCaOverSold
            let overSoldGbArr=window.fbGlobalGbOverSold
            let overSoldAuArr=window.fbGlobalAuOverSold
            console.log(Shopify.country,'guojia',id)
            let overSoldArr=[]
            if(Shopify.country=='CA'){
                overSoldArr=overSoldCaArr
            }else if(Shopify.country=='GB'){
                overSoldArr=overSoldGbArr
            }else if(Shopify.country=='AU'){
                overSoldArr=overSoldAuArr
            }
            console.log(overSoldArr,'数组',id)

            ajax({
                type: 'GET',
                url:  `https://api.freebeatfit.com/shopify/v1/inventory?id=${id}`,
                success: function (res) {
                 let {code,data}=res
                 if(code==0){
                    let available=data.length&&data.find(item=>item.country_code==Shopify.country).available
                    if(available>0){
                        $('.js-ebike-addtocart').each(function() {
                            let origin_text = $(this).attr('data-origintext')
                            if($(this).hasClass('public-product-soldout')) {
                                $(this).removeClass('public-product-soldout')
                                if($(this).find('span').length) {
                                    $(this).find('span').text("ADD TO CART")
                                } if($(this).find('div').length) {
                                    $(this).find('div').text("ADD TO CART")
                                }else {
                                    $(this).text("ADD TO CART")
                                }
                            }
                        })
                        if( $(".ebike-fbcur-introduce-ul #bike-overSold").length>0){
                            $(".ebike-fbcur-introduce-ul #bike-overSold").css('display','none')
                        }
                        if( $(".ebike-fbcur-introduce-ul #bike-sold").length>0){
                            $(".ebike-fbcur-introduce-ul #bike-sold").css('display','block')
                        }
                    }
                    else{
                        let showOverSold=overSoldArr.find(item=>item.id==id).oversold
                        if(showOverSold){
                            $('.js-ebike-addtocart').each(function() {
                                let origin_text = $(this).attr('data-origintext')
                                if($(this).hasClass('public-product-soldout')) {
                                    $(this).removeClass('public-product-soldout')
                                    if($(this).find('span').length) {
                                        $(this).find('span').text("ADD TO CART")
                                    } if($(this).find('div').length) {
                                        $(this).find('div').text("ADD TO CART")
                                    }else {
                                        $(this).text("ADD TO CART")
                                    }
                                }
                            })
                            if( $(".ebike-fbcur-introduce-ul #bike-overSold").length>0){
                                $(".ebike-fbcur-introduce-ul #bike-overSold").css('display','block')
                            }
                            if( $(".ebike-fbcur-introduce-ul #bike-sold").length>0){
                                $(".ebike-fbcur-introduce-ul #bike-sold").css('display','none')
                            }
                        }else{
                            $('.js-ebike-addtocart').each(function() {
                                let soldout_text = $(this).attr('data-soldout')
                                if(!$(this).hasClass('public-product-soldout')) {
                                    $(this).addClass('public-product-soldout')
                                    if($(this).find('span').length) {
                                        $(this).find('span').text("SOLD OUT")
                                    }if($(this).find('div').length) {
                                        $(this).find('div').text("SOLD OUT")
                                    } else {
                                        $(this).text("SOLD OUT")
                                    }
                                }
                            })
                            if( $(".ebike-fbcur-introduce-ul #bike-overSold").length>0){
                                $(".ebike-fbcur-introduce-ul #bike-overSold").css('display','none')
                            }
                            if( $(".ebike-fbcur-introduce-ul #bike-sold").length>0){
                                $(".ebike-fbcur-introduce-ul #bike-sold").css('display','block')
                            }
                        }
                     
                    }
                 }else{//接口异常处理
                    if( $(".ebike-fbcur-introduce-ul #bike-overSold").length>0){
                        $(".ebike-fbcur-introduce-ul #bike-overSold").css('display','none')
                    }
                    if( $(".ebike-fbcur-introduce-ul #bike-sold").length>0){
                        $(".ebike-fbcur-introduce-ul #bike-sold").css('display','block')
                    }
                 }
                },
              })
        },
        // 切换的时候选中的产品
        getProductVariantId: function () {
            let _this = this
            if(_this.productObj && _this.productObj.variants && _this.productObj.variants.length){
                _this.productObj.variants.forEach((item, index)=> {
                    let _option = item.options.toString() 
                    if(_option.indexOf(_this.selectQuery.option1) > -1 && _option.indexOf(_this.selectQuery.option2) > -1 && _option.indexOf(_this.selectQuery.option3) > -1) {
                        _this.selectQuery.media = _this.productObj.media.slice(index * _this.space, (index * _this.space) + _this.space)
                        _this.selectQuery = Object.assign(_this.selectQuery, item)
                    }
                })
                _this.changeImgSlide()
                // _this.getSoldOut()
                // 更改url
                let url = window.location
                let pathName = url.pathname
                let locationSearch = url.search
                let searchArr = locationSearch.substring(1).split('&')
                searchArr[0] = `variant=${_this.selectQuery.id}`
                let searchStr = `?${searchArr.join('&')}`
                let newUrl = url.origin + pathName + searchStr
                history.replaceState('', '', newUrl) 
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
                let str = `<div class="swiper-slide"><div class="ebike-zoom-relative swiper-zoom-container">
                <img class="Image--lazyLoad Image--fadeIn" data-src="${imgurl}" />
                <span class="Image__Loader"></span>
                </div>
                </div>`
                strdom += str
            })
            if(strdom) {
                $('.ebike-zoom-warpper').html(strdom)
                _this.fbEbikeZoomSwiper && _this.fbEbikeZoomSwiper.update(true)
            }
            
            // 侧边栏弹出层增加图片
            // let strdom = ` <img class="Image--lazyLoad Image--fadeIn" data-src="${}" >
            // <span class="Image__Loader"></span>`

            // $('.js-ebike-sizeli-img').html(strdom)
            if(!_this.isSingleProduct) {
                let strdom2 = ''
                let cuurent_Style = []
                _this.secondlyQuery.forEach(item => {
                    if(item.option1 == _this.selectQuery.option1) {
                        cuurent_Style = item.arr
                    }
                })
                // 暂时保存 选择2的一个尺寸
                // cuurent_Style.forEach(item =>{
                //     let str2 = ` <li class="ebike-choose-size-mob ebike-other-csm js-ebike-productsize2 ${item.default?'ebike-choose-item-checked': ''}" data-style="${item.option3}" >
                //         <div class="span-option3">
                //             <img src="${item.icon}" class="e-default-icon" />
                //             <img src="${item.active}" class="e-active-icon" />
                //             <span>${item.option3}</span>
                //         </div>
                //         <div class="span-number"><span>${item.number}</span></div>
                //     </li>`
                //     strdom2 += str2
                // })
                // $('.js-ebike-mobcfm-sizevalue').html(strdom2)
                $('.js-ebike-single-style').text(cuurent_Style[0] ? cuurent_Style[0].number: '')
                // 切换产品重置加购数量
                _this.selectQuery.quantity = 1
                $('.js-qiantity-number').text(_this.selectQuery.quantity)
                
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
                if($(this).hasClass("public-product-soldout")){
                    e.preventDefault()
                    return false
                }
             
            // $('.js-ebike-addtocart').click(function (e) {
                // 临时测试stat
                if($('.js-ebike-sing-up').length) {
                    let allHeaderHeight = ($("#shopify-section-header").height() || 0) + ($('.AnnouncementBar').height() || 0) + ($('.fb-ebike-nav-bar').height() || 0)
                    $('html, body').animate({
                        'scrollTop': $('.js-ebike-sing-up').offset().top - allHeaderHeight
                    }, 400);
                    return false
                }
                // 临时测试end
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
            $('.js-ebike-productcolor').click(function() {
                let data_color = $(this).attr('data-color')
                if(data_color == _this.selectQuery.option2) {
                    return false
                }
                $(`.js-ebike-productcolor[data-color='${data_color}']`).addClass('ebike-choose-item-checked').siblings().removeClass('ebike-choose-item-checked')
                _this.selectQuery.option2 = data_color
                $('.js-ebike-color').text(data_color)
                _this.getProductVariantId()
                let data_type = $(this).attr('data-type')
                if(data_type == 'nav') {
                    $('html, body').animate({
                        'scrollTop': 0
                    }, 400);
                }
            })
            $('.js-ebike-productsize').click(function() {
                let data_size = $(this).attr('data-size')
                $(this).parents('.js-ebike-mobcfm-box').removeClass('ebike-cfm-focus')
                if( _this.selectQuery.option1 == data_size ) {
                    return false
                }
                _this.selectQuery.option1 = data_size
                _this.getProductVariantId()
                $('.js-sizemob-name').text(data_size)   
                $(`.js-ebike-productsize[data-size=${data_size}]`).addClass('ebike-choose-item-checked').siblings().removeClass('ebike-choose-item-checked')
            })
            $('body').on('click', '.js-ebike-productsize2', function(e) {
                let data_style = $(this).attr('data-style')
                $(this).parents('.js-ebike-mobcfm-box').removeClass('ebike-cfm-focus')
                if( _this.selectQuery.option3 == data_style ) {
                    return false
                }
                _this.selectQuery.option3 = data_style
                _this.getProductVariantId()
                $('.js-sizemob-name2').text(data_style)
            })
           
            $('.js-ebike-mobcfm-title').click(function() {
                let mobcfm = $(this).parents('.js-ebike-mobcfm-box')
                if( mobcfm.hasClass('ebike-cfm-focus')) {
                    mobcfm.removeClass('ebike-cfm-focus')
                } else {
                    mobcfm.addClass('ebike-cfm-focus')
                }
            })
            $('.js-ebike-mobcfm-title2').click(function() {
                let mobcfm2= $(this).parents('.js-ebike-mobcfm-box2')
                if( mobcfm2.hasClass('ebike-cfm-focus')) {
                    mobcfm2.removeClass('ebike-cfm-focus')
                } else {
                    mobcfm2.addClass('ebike-cfm-focus')
                }
            })
            // 数量控制
            $('.js-add-quantity').click(function() {
                if( _this.selectQuery.quantity >= 10){
                    $(this).addClass('disabled')
                    return false
                } else {
                    if($('.js-reduce-quantity').hasClass('disabled')) {
                        $('.js-reduce-quantity').removeClass('disabled')
                    } else {
                    }
                }
                _this.selectQuery.quantity += 1 
                $('.js-qiantity-number').text(_this.selectQuery.quantity)
               
            })
            $('.js-reduce-quantity').click(function() {
                if( _this.selectQuery.quantity <=1){
                    $(this).addClass('disabled')
                    return false
                } else {
                    if($('.js-add-quantity').hasClass('disabled')) {
                        $('.js-add-quantity').removeClass('disabled')
                    } else {
                    }
                }
                _this.selectQuery.quantity -=1
                $('.js-qiantity-number').text(_this.selectQuery.quantity)
            })

            $(document).bind("click",function(e){      
                if($(e.target).closest(".js-other-target-box1").length == 0){
                    //点击id为menu之外且id不是不是open，则触发
                    if($('.js-other-target-box1').hasClass("ebike-cfm-focus")){
                        $('.js-other-target-box1').removeClass('ebike-cfm-focus')
                    }
                }
                if($(e.target).closest(".js-other-target-box2").length == 0){
                    //点击id为menu之外且id不是不是open，则触发
                    if($('.js-other-target-box2').hasClass("ebike-cfm-focus")){
                        $('.js-other-target-box2').removeClass('ebike-cfm-focus')
                    }
                }
            })
             // 移动端的操作end
            $('.js-egl-select-gift').click(function() {
                let ischeck = $(this).attr('data-checked')
                if(ischeck == 'true') {
                    $(this).removeClass('egl-checkbox-checked')
                    $(this).attr('data-checked', 'false')
                } else {
                    $(this).addClass('egl-checkbox-checked')
                    $(this).attr('data-checked', 'true')
                }
            })
            $('.js-ebkie-showmore-gift').click(function () {
                if(_this.showMoreGift) {
                    $('.ebkie-gift-showhide').slideUp()
                    $(this).text($(this).attr('data-text'))
                } else {
                    $('.ebkie-gift-showhide').slideDown()
                    $(this).text('Show less')
                }
                _this.showMoreGift = !_this.showMoreGift
            })
            // 唤起弹窗
            $('.js-open-ebikedilaog').click(function () {
                // lockBody()
                let name = $(this).attr('data-name')
                let desc = $(this).find('.size-fit-config-desc-hide').html()
                let dom_img = $(this).attr('data-img')
                let dom_index = $(this).attr('data-index')
                $('.js-sizelipopup-title').text(name)
                $('.ebike-sizeli-desc').html(desc)
                if(dom_index == '2') {
                    $('.js-ebike-sizeli-img img').attr('src', dom_img)
                }
                $(`.ebike-sizeli-modelshow`).hide()
                $(`.ebike-sizeli-modelshow[data-index=${dom_index}]`).show()
                $(`.ebike-sizeli-public-top`).hide()
                $(`.ebike-sizeli-public-top[data-index=${dom_index}]`).show()
                // $('.js-sizeli-dialog').fadeIn();
            })
            $('.js-open-litboomdialog').click(function () {
                let _index =  $(this).attr('data-index')
                $(`.lit-boom-size-config[data-index=${_index}]`).show().siblings('.lit-boom-size-config').hide()
            })
            $('.ebike-sizeli-door-button').click(function () {
                let doortype = $(this).attr('data-type')
                $(this).addClass('dooractive').siblings().removeClass('dooractive')
                $(`.js-ebike-sizeli-doorcontent[data-type=${doortype}]`).show().siblings('.js-ebike-sizeli-doorcontent').hide()
            })
            // $('.js-sizeli-close').click(function () {
            //     autoBody()
            //     $(this).parents('.js-sizeli-dialog').fadeOut();
            // })
            // $('.js-sizeli-dialog').click(function(e) {
            //     if (!$(e.target).closest('.ebike-sizeli-content').length) {
            //         $('.js-sizeli-dialog').fadeOut();
            //         autoBody()
            //     } else {
            //     }
            // })
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
            // 点击出现小弹窗
            $('.js-hover-edesc-icon').click(function() {
                if(window.innerWidth < 769) { 
                    lockBody()
                    let stringText = $(this).next('.elii-item-hover-desc').html()
                    $('.js-ebike-popup').fadeIn()
                    $('.ebike-popup-text').html(stringText)
                }
            })
            $('.js-ebike-popup').click(function(e) { 
                if (!$(e.target).closest('.ebike-popup-content').length) {
                    autoBody()
                    $('.js-ebike-popup').fadeOut()
                    $('.ebike-popup-text').html()
                } else {
                }
            })
            $('.js-ebike-popup-close').click(function() {
                autoBody()
                $('.js-ebike-popup').fadeOut()
                $('.ebike-popup-text').html()
            })
            $('.js-open-dimessdilaog-ebike').click(function () {
                lockBody()
                $('.js-dimens-dialog-ebike').show()
            })
            $('.js-dimens-close-ebike').click(function () {
                autoBody()
                $('.js-dimens-dialog-ebike').hide()
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
    if(window,innerWidth<768){
        const options = {
            threshold: 0.95, // 设置阈值为0.5，表示当元素的50%或更多进入视口时触发回调
          };
        const targetElementFirst = $(".ebkie-left-icon-info .elii-content .elii-item:first").get(0);
        const targetElementLast = $(".ebkie-left-icon-info .elii-content .elii-item:last").get(0);
        const leftPopintersectionObserver = new IntersectionObserver((entries) => {
            // 如果 intersectionRatio 为 0，则目标在视野外
            // console.log(entries[0].intersectionRatio,'数据值是多少')
            if (entries[0].intersectionRatio <= 0.95) {
                // 元素的90%或更多不在视窗内
                $(".ebkie-left-icon-info-left").css('display','block');
              } else {
                // 元素的90%或更多在视窗内
                $(".ebkie-left-icon-info-left").css('display','none');
              }
          },options);
        const rightPopintersectionObserver = new IntersectionObserver((entries) => {
            // 如果 intersectionRatio 为 0，则目标在视野外
            if (entries[0].intersectionRatio <= 0.95) {//不在可视区域
                $(".ebkie-left-icon-info-right").css('display','block')
            }else{
                $(".ebkie-left-icon-info-right").css('display','none')
            }
          },options);
        $(document).ready(function() {
            if(targetElementFirst && targetElementLast){ 
                leftPopintersectionObserver.observe(targetElementFirst)
                rightPopintersectionObserver.observe(targetElementLast)
            }
        });

    }
   
    fbBikeAddToCart.init()
})

