$(function () {
    let fbShopifyRoot = window.Shopify.routes.root
    const fbCustomerShop = {
        bikeType: 1,
        variantid: '',
        originPrice: '',
        title: '',
        isloading: false,
        goUrl: '',
        defaultCode: Shopify.country.toLowerCase(),
        currCode: Shopify.country.toLowerCase(),
        selectArry: [
            { code: 'ca', url: '', isShow: false, selected: false },
            { code: 'gb', url: '/en-uk', isShow: false, selected: false },
            { code: 'au', url: '/en-au', isShow: false, selected: false },
        ],
        chooseCountry: { code: 'ca', url: '' },
        // addSSucc: false,
        init: function () {
            let _this = this
            let _index = getQueryString('type')
            if(!_index) {
                _index = sessionStorage.getItem("customer_bike_type")
            }
            // 检验 biketype是否符合规则
            this.bikeType = _index ? parseInt(_index) : 1
            //加拿大的bike 只有3 有其他车的时候需要修改
            if(!_index && window.location.href.indexOf('/pages/configure-boom-bike') > -1) {
                this.bikeType = 3
            }
            if (!$(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`).length) {
                this.bikeType = 1
            }
            this.variantid = $(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`).attr('data-variantid')
            this.originPrice = $(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`).attr('data-price')
            this.title = $(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`).attr('data-title')
            this.goUrl = $(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`).attr('data-url')
            $('.js-keep-productdata').attr('data-title', this.title)
            $('.js-keep-productdata').attr('data-price', this.originPrice)
            $('.js-keep-productdata').attr('data-variantid', this.variantid)
            $('.js-goproduct-page').attr('url', this.goUrl)

            this.initdom()
            this.event()
            // window.addEventListener('resize', debounce(this.initTop, 500)) 
        },
        // initTop: function () {
        //     if(window.innerWidth > 1365) {
        //         $('.fbcu-block-left').css('top', $('.fbcu-block-left').offset().top + 'px')
        //     } else {
        //         $('.fbcu-block-left').css('top', 'auto')
        //     }
        // },
        getSoldOut: function () {
            if(window.location.pathname.indexOf('boom-bike')> -1){
              if((Shopify &&  Shopify.country && Shopify.country.toUpperCase() == 'AU') || window.location.pathname.indexOf('en-au') > -1) {
                  if(this.bikeType == 1) {
                      $('.js-customershop-addtocart').addClass('public-product-soldout')
                      $('.js-customershop-addtocart').text('SOLD OUT')
                  } else {
                      $('.js-customershop-addtocart').removeClass('public-product-soldout')
                      $('.js-customershop-addtocart').text('ADD TO CART') 
                  }
              } else if(Shopify &&  Shopify.country && (Shopify.country.toUpperCase() == 'GB') || window.location.pathname.indexOf('en-uk') > -1){
                  if(this.bikeType == 1 || this.bikeType == 3) {
                      $('.js-customershop-addtocart').addClass('public-product-soldout')
                      $('.js-customershop-addtocart').text('SOLD OUT')
                  } else {
                      $('.js-customershop-addtocart').removeClass('public-product-soldout')
                      $('.js-customershop-addtocart').text('ADD TO CART') 
                  }

              } else {

              }
            } else if(window.location.pathname.indexOf('lit-bike')> -1) {
              // 英国站litbike裸车售罄 临时
              if(Shopify &&  Shopify.country && (Shopify.country.toUpperCase() == 'GB') || window.location.pathname.indexOf('en-uk') > -1){
                if(this.bikeType == 1) {
                    $('.js-customershop-addtocart').addClass('public-product-soldout')
                    $('.js-customershop-addtocart').text('SOLD OUT')
                } else {
                    $('.js-customershop-addtocart').removeClass('public-product-soldout')
                    $('.js-customershop-addtocart').text('ADD TO CART') 
                }
              }
            } else {

            }
        },
        initdom: function () {
            //  if(Shopify && Shopify.country  && Shopify.country == 'GB') {
            //     $('.js-customershop-addtocart').attr('disabled', true)
            // }
            let _this = this
            $('.js-fbcu-hide').hide()
            $(`.js-fbcu-show${this.bikeType}`).show()
            $('.js-fbchoose-productcolor').removeClass('fbcur-choose-item-checked')
            $(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`).addClass('fbcur-choose-item-checked')
            // 新增选择国家操作
            this.getDeliverCode()
        },
        getDeliverCode: function () {
            let _this = this
            if($('.js-select-countrycode').length) {
                let productColor=$(`.js-fbchoose-productcolor[data-type='${this.bikeType}']`)
                let gbshow = productColor.attr('data-gbshow')
                let cashow = productColor.attr('data-cashow')
                let aushow = productColor.attr('data-aushow')
                _this.selectArry.map(item => {
                    let _code_dom =  $(`.js-select-countrycode li[data-code=${item.code}]`)
                    if(item.code == 'gb') {
                        item.isShow = (gbshow === 'true') ? true: false
                        if(item.isShow) {
                            _code_dom.removeClass('disabled-deliver-code')
                        } else {
                            _code_dom.addClass('disabled-deliver-code')
                        }
                    } else 
                    if (item.code == 'ca') {
                        item.isShow = (cashow === 'true') ? true : false
                        if(item.isShow) {
                            _code_dom.removeClass('disabled-deliver-code')
                        } else {
                            _code_dom.addClass('disabled-deliver-code')
                        }
                    }
                    if (item.code == 'au') {
                        item.isShow = (aushow === 'true') ? true : false
                        if(item.isShow) {
                            _code_dom.removeClass('disabled-deliver-code')
                        } else {
                            _code_dom.addClass('disabled-deliver-code')
                        }
                    }
                    if(item.code == _this.currCode) {
                        _code_dom.addClass('checked-deliver-code')
                        item.selected = true
                        _this.chooseCountry = item
                    } else {
                        _code_dom.removeClass('checked-deliver-code')
                        item.selected = false
                    }
                    return item
                })
            }
            this.getSoldOut()
        },
        refreshSection: function () {
            setTimeout(function () {
                document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                    bubbles: true  //this code is for prestige theme, is to refresh the cart
                }));
            }, 300);
        },
        getClearThenAdd: function (isOk) {
            let _this = this
            let formData = {
                token: CookieUtil.getItem('cart') || '',
                note: null,
                attributes: {},
                total_price: 0,
                total_weight: 0,
                item_count: 0,
                items: [],
                requires_shipping: false
            }
            fetch(fbShopifyRoot + 'cart/clear.js', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(function (res) {
                return res.json();
            }).then((data) => {
                console.log("clear success")
                _this.getAddProductToCart(isOk)
            }).catch((error) => {
                $('.js-customershop-addtocart').attr('disabled', false)
                MsgBox.init('Oops, please try again', 2000)
                _this.isloading = false
            })
        },
        klaviyAdd: function (_items) {
            let _this = this
            if(window._learnq){
                window._learnq.push(['track', 'Added to Cart', { Product: _this.title }]);
            }
        },
        getAddProductToCart: function (isOk) {
            let _this = this
            let formData = {
                items: [{
                    id: _this.variantid,
                    quantity: 1
                }]
            };
            fetch(fbShopifyRoot + 'cart/add.js', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(function (res) {
                return res.json();
            }).then((data) => {
                // localStorage.setItem('fb_country_code_var', _this.currCode)
                // localStorage.setItem('fb_pdp_need_clear', 'yes')
                $('.js-customershop-addtocart').attr('disabled', false)
                _this.isloading = false
                if(data && data.items && data.items.length > 0) {
                    _this.klaviyAdd(data.items)
                    window.location.href= fbShopifyRoot + "cart"
                } else {
                    MsgBox.init('Oops, please try again', 2000)
                }
            }).catch((error) => {
                console.log("error", error)
                $('.js-customershop-addtocart').attr('disabled', false)
                MsgBox.init('Oops, please try again', 2000)
                _this.isloading = false
            })
        },
        loadAjax: function (isOk) {
            let _this = this
            // if(_this.currCode != _this.defaultCode) {
            //     _this.getClearThenAdd(isOk)
            // } else {
            //     _this.getAddProductToCart(isOk)
            // }
            _this.getAddProductToCart(isOk)
        },
        event: function () {
            let _this = this
            $('body').on('click', '.js-customershop-addtocart', function (e) {
                // 新增sold out
                if(window.location.pathname.indexOf('boom-bike')> -1){
                  if((Shopify &&  Shopify.country && Shopify.country.toUpperCase() == 'AU') || window.location.pathname.indexOf('en-au') > -1) {
                      if(_this.bikeType == 1) {
                        return false
                      }
                  }else if((Shopify &&  Shopify.country && Shopify.country.toUpperCase() == 'GB') || window.location.pathname.indexOf('en-uk') > -1) {
                    if(_this.bikeType == 1 || _this.bikeType == 3) {
                      return false
                    }
                  }
                }else if(window.location.pathname.indexOf('lit-bike')> -1){
                  if((Shopify &&  Shopify.country && Shopify.country.toUpperCase() == 'GB') || window.location.pathname.indexOf('en-uk') > -1) {
                    if(_this.bikeType == 1) {
                      return false
                    }
                  }
                } else {
                }

                $(this).attr('disabled', true)
                if(_this.isloading) {
                    return false
                }
                _this.isloading = true
                _this.loadAjax() 
                if(Shopify.country == 'US') {
                    if(obApi) {
                        obApi('track', 'Add to cart', {
                            orderValue: _this.originPrice,
                            currency: 'USD',
                        })
                    }
                    _tfa && _tfa.push({notify: 'event', name: 'add-to-cart', id: 1529954, revenue: _this.originPrice});
                }
                
                // $('#xbike-add-to-cart-main').click()
               
            })
            // 选择产品
            $('.js-fbchoose-productcolor').click(function () {
                if($(this).hasClass('fbcur-choose-item-checked')) {
                    return false
                } else {
                    $('.js-fbchoose-productcolor').removeClass('fbcur-choose-item-checked')
                }
                $(this).addClass('fbcur-choose-item-checked')
                _this.variantid = $(this).attr('data-variantid')
                _this.originPrice = $(this).attr('data-price')
                _this.title = $(this).attr('data-title')
                _this.bikeType = $(this).attr('data-type')
                _this.goUrl = $(this).attr('data-gourl')

                $('.js-keep-productdata').attr('data-title', _this.title)
                $('.js-keep-productdata').attr('data-price', _this.originPrice)
                $('.js-keep-productdata').attr('data-variantid', _this.variantid)
                $('.js-goproduct-page').attr('url', _this.goUrl)
                $('.js-fbcu-hide').hide()
                $(`.js-fbcu-show${_this.bikeType}`).show()
                _this.currCode = _this.defaultCode
                _this.getDeliverCode()
            })
            $('.js-open-dimessdilaog').click(function () {
                lockBody()
                let type = $(this).attr('data-type')
                $('.js-dimens-dialog').show()
                $('.js-show-dimensionimg').hide()
                $(`.show-dimens-dialog-${type}`).show()
            })
            $('.js-dimens-close').click(function () {
                autoBody()
                $('.js-dimens-dialog').hide()
                $('.js-show-dimensionimg').hide()
                // $(this).parents('.js-dimens-dialog').hide();
            })
            $('.js-introduce-service-dialog').click(function () {
                lockBody()
                $(this).next('.fbcur-introduce-dialog').show();
            })
            $('.js-intro-dialog-close').click(function () {
                $(this).parents('.fbcur-introduce-dialog').hide();
                autoBody()
                $(this).parents('.fbcur-introduce-dialog').hide()
            })
            // if($('.fbcur-introduce-product-name').length > 0) {
            //     $('.fbcur-introduce-product-name').mouseenter(function() {
            //         console.log("1111")
            //         $(this).find('.fbcur-introduce-tips').css('display', 'block')
            //     }) 
            //     $('.fbcur-introduce-product-name').mouseleave(function() {
            //         $(this).find('.fbcur-introduce-tips').css('display', 'none')
            //     }) 
            // }
            $('.js-select-countrycode li').click(function (e) {
                // console.log("e", e.target)
                let code = $(this).attr('data-code')
                let cuur =  window.location.pathname.replace('/en-uk', '')
                cuur =  cuur.replace('/en-au', '')
                // disabled-deliver-code
                if($(this).hasClass('disabled-deliver-code')) {
                    return false
                }
                if(code != _this.defaultCode) {
                    _this.currCode = code
                    _this.getDeliverCode()
                    if(!_this.chooseCountry.isShow) {
                        return false
                    }
                    sessionStorage.setItem("customer_bike_type", _this.bikeType);
                    CookieUtil.removeItem('discount_code')
                    localStorage.removeItem('discount_code')
                    CookieUtil.removeItem('docapp-coupon')
                    localStorage.removeItem('docapp-coupon')
                    window.location.href = _this.chooseCountry.url + cuur
                }
                
            })

        }
      
    }
    fbCustomerShop.init()
})