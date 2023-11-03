$(function () {

    const autoFillDiscountCart = {
        fbPdiscountCode: null,
        allPIsCodeApplied: false,
        applyPagesTimes: 0, // 处理异常情况
        countryCodeDsiacount: [
            {
                country: 'CA',
                litbike: 'LITSALE',
                boombike: 'BOOMSALE',
                isCurrent: true,
                currency: 'CAD'
            },{
                country: 'GB',
                litbike: 'LITSALEUK',
                boombike: 'BOOMSALEUK',
                isCurrent: false,
                currency: 'GBP'
            },{
                country: 'AU',
                litbike: 'LITSALEAU',
                boombike: 'BOOMSALEAU',
                isCurrent: false,
                currency: 'AUD'
            }
        ],
        currentCode: {},
        disabledCode: [],
        totalCode: ['LITSALE', 'BOOMSALE', 'LITSALEUK', 'BOOMSALEUK', 'LITSALEAU', 'BOOMSALEAU', 'FIGHT'],
        currentCodeArr: [],
        timer1: null,
        timerDiscountApp: null,
        loopcartIndex: 0,
        cartproappLoop: 0, 
        isLit: false,
        isBoom: false, 
        isPink: false,
        init: function () {
            let shopify_country_code =  Shopify && Shopify.country
            this.countryCodeDsiacount.map((item) => {
                if(item.country.toLowerCase() === shopify_country_code.toLowerCase()) {
                    item.isCurrent = true
                    this.currentCode =  Object.assign(this.currentCode, item)
                    this.currentCodeArr = [item.litbike,item.boombike]
                } else {
                    item.isCurrent = false
                    this.disabledCode.push(item.litbike,item.boombike)
                }
                return item
            })
            if(window.location.pathname.indexOf('/cart') > -1) {
                this.cartPage()
            } else {
                this.sidebarCart()
            }
            this.event()
        },
        initCodeArr: function () {
            let _this = this
            let discountArr = []
            let isCodeApplied = false
            if($('.docapp-coupon-input--bean-container--bean-remove').length > 0 ) {
                $('.docapp-coupon-input--bean-container--bean-remove').each(function() {
                    discountArr.push($(this).attr('data-code'))
                })
                // 如果有折扣码 会去验证是否正确 不正确会去掉
                discountArr.forEach((item, index)=> {
                    for(item2 of _this.totalCode ){
                        if(item2.toLowerCase() == item.toLowerCase() ) {
                            isCodeApplied = true
                        }
                    }
                })
            }
            return isCodeApplied
        },
        getCardCode: function () {
            let _this = this
            _this.isLit = false
            _this.isBoom = false
            let code = null
            let productArry = []
            $('.CartItem__Title a').each(function() {
                productArry.push($(this).text())
            })
            if(productArry.length) {
                let productString = productArry.toString()
                if(productString.indexOf('Lit Bike') > -1) {
                    _this.isLit = true
                    code = _this.currentCode.litbike
                }
                if(productString.indexOf('Boom Bike') > -1) {
                    _this.isBoom = true
                    code = _this.currentCode.boombike
                }
                if (productString.indexOf('Lit Bike Aurora Pink') > -1) {
                    _this.isPink = true
                    code = 'FIGHT'
                }
            }
            return code
        },
        removeDisabledCode: function () {
            let _this = this
            if($('.docapp-coupon-input--bean-container--bean-remove').length > 0 ) {
                $('.docapp-coupon-input--bean-container--bean-remove').each(function() {
                    let datacode = $(this).attr('data-code')
                    datacode = datacode.toLowerCase()
                    for (let itemvalue of _this.disabledCode) {
                        if(itemvalue.toLowerCase() == datacode) {
                            $(this).click()
                            break
                         }
                    }
                })
            }
        },
        eventDelegateCallbackCartDiscount: function (selector, callback, e) {
            const elements = Array.from(document.querySelectorAll(selector));
            for (let i = 0, len = elements.length; i < len; i++) {
                const el = elements[i];
                if ([e.target, e.target.closest(selector)].includes(el)) {
                    callback.call(el, e);
                    break;
                }
            }
        },
        checkDiscountResult: function () {
            let _this = this
            let valueww =  $('.docapp-coupon-input--input').attr('value')
            let isRight = true
            if(valueww) {
                valueww = valueww.toLowerCase()
                for (let itemvalue of _this.disabledCode) {
                    if(itemvalue.toLowerCase() == valueww) {
                        if(!$('.js-copy-docapp-wrong').length) {
                            let rtringcode = `<div class="docapp-coupon-input--message-container docapp-alert-danger js-copy-docapp-wrong">
                            <div class="docapp-coupon-input--message-x js-copy-docapp-close">×</div>
                            <div class="docapp-coupon-input--message-content" role="alert">Coupon code <span class='js-copyapp-disabledcode'>${itemvalue}</span> could not be applied.</div>
                            </div>`
                            $('.docapp-coupon-input--bean-container').after(rtringcode)
                        } else {
                            $('.js-copyapp-disabledcode').html(itemvalue)
                        }
                        $('.docapp-coupon-input--input').attr('value', '')
                        isRight = false
                        break
                    }
                }
            }
            return isRight
        },
        eventStopDiscount: function () {
            let _this = this 
            document.addEventListener('click', function (e) {
                _this.eventDelegateCallbackCartDiscount('.docapp-coupon-input--button', function () {
                    if(this){
                       let isRight = _this.checkDiscountResult()
                       if(!isRight) {
                            e.stopPropagation()
                       }
                    }
                }, e)
            }, true)
            document.addEventListener('keydown', function (e) {
                _this.eventDelegateCallbackCartDiscount('.docapp-coupon-input--input', function () {
                    if(this){
                        if (e.keyCode == "13") {
                            let isRight = _this.checkDiscountResult()
                            if(!isRight) {
                                e.stopPropagation()
                                e.preventDefault()
                            }
                        }
                    }
                }, e)
            }, true)
        },
        cartPageDiscountLoad: function () {
            let _this = this
            _this.timer1 && clearTimeout(_this.timer1)
            _this.timer1 = setTimeout(() => { 
                _this.loopcartIndex += 1
                if($('.docapp-cart-with-coupon-summary').length){
                    _this.allPIsCodeApplied = _this.initCodeArr() 
                    _this.fbPdiscountCode = _this.getCardCode()
                    if (!_this.allPIsCodeApplied && _this.fbPdiscountCode) {
                        let miniCartInput = document.querySelector('body .docapp-coupon-input--input')
                        let applyButton = document.querySelector('.docapp-coupon-input--button');
                        if(miniCartInput){
                            miniCartInput.value = _this.fbPdiscountCode;
                            if (applyButton && _this.applyPagesTimes < 3) {
                                // applyButton.removeAttribute("disabled");
                                applyButton.click();
                                _this.applyPagesTimes += 1
                            }
                        }
                    } else {
                        // 如果有折扣码 判断是否是错误的折扣码 然后删除
                        _this.removeDisabledCode()
                    }
                    _this.timer1 && clearTimeout(_this.timer1) 
                } else if(!$('.docapp-cart-with-coupon-summary').length && _this.loopcartIndex < 10) {
                    _this.cartPageDiscountLoad()
                } else {
                    _this.timer1 && clearTimeout(_this.timer1) 
                }
            }, 1000)
        },
        getDiscountOnCartProApp: function () { 
            let _this = this
            _this.timerDiscountApp = setInterval(() => {
                _this.cartproappLoop += 1
                if(_this.cartproappLoop > 90) {
                    clearInterval(_this.timerDiscountApp)
                    return false
                }
                if(window.discountOnCartProApp) {
                   clearInterval(_this.timerDiscountApp) 
                   let appArr = window.discountOnCartProApp.codes
                  
                   _this.fbPdiscountCode = _this.getCardCode()
                   if(!_this.fbPdiscountCode){
                        return false
                   }
                   if(appArr && appArr.length > 0) {
                        let isCodeApply = false
                        appArr.forEach(item => {
                            if(_this.isBoom && _this.isLit) {
                                _this.currentCodeArr.forEach(code => {
                                    if(item.toLowerCase() == code.toLowerCase()) {
                                        isCodeApply = true
                                    }
                                })
                            } else {
                                if(item.toLowerCase() == _this.fbPdiscountCode.toLowerCase()) {
                                    isCodeApply = true
                                }
                            }
                        })
                        if(!isCodeApply) {
                            window.discountOnCartProApp.applyCode(_this.fbPdiscountCode)
                        }
                   } else {
                        window.discountOnCartProApp.applyCode(_this.fbPdiscountCode)
                   }
                }
            }, 1000)
        },
        cartPage: function () {
            let _this = this
            _this.eventStopDiscount()
            // const fbCartPageObserver = new MutationObserver(function () {
            //          //绑定输入折扣码的监听事件
            //         _this.loopcartIndex = 0
            //         _this.cartPageDiscountLoad()
            // });
            // if(document.querySelector(".PageContent")) {
            //     fbCartPageObserver.observe(document.querySelector(".PageContent"), {childList: true})
            // }
            _this.getDiscountOnCartProApp()
        },
        sidebarCart: function () {
            let _this = this
            _this.eventStopDiscount()
            let inputSelector = `#sidebar-cart .Drawer__Footer input[name=temp-discount], #order-summary #checkout_reduction_code`
            let applyButtonSelector = `#sidebar-cart .Drawer__Footer .docapp-coupon-input--button, #order-summary #checkout_submit`
            const fbCodeObserver = new MutationObserver(function () {
                // 如果有应用过折扣码就终止
                if(_this.allPIsCodeApplied) {
                    return false
                }
               let isCodeTextLength = $('.docapp-coupon-input--bean-container--bean-remove').length > 0 
                _this.allPIsCodeApplied = _this.initCodeArr() 
                _this.fbPdiscountCode = _this.getCardCode()
                const miniCartInput = document.querySelector(inputSelector)
                const applyButton = document.querySelector(applyButtonSelector);
                if (miniCartInput && !_this.allPIsCodeApplied && _this.fbPdiscountCode) {
                    miniCartInput.value = _this.fbPdiscountCode;
                    // 判断存在折扣码 嵌入 no apply
                    if(isCodeTextLength) {
                       return false 
                    }
                    if (applyButton && _this.applyPagesTimes < 3) {
                        applyButton.removeAttribute("disabled");
                        applyButton.click();
                        _this.applyPagesTimes += 1
                    }
                } else{
                    // 如果有折扣码 判断是否是错误的折扣码 然后删除
                    _this.removeDisabledCode()
                }
            });
            if(document.querySelector("#sidebar-cart, #order-summary")) {
                fbCodeObserver.observe(document.querySelector("#sidebar-cart, #order-summary"), {childList: true, subtree: true})
            }
        },
        event: function () {
            $('body').on('click', '.js-copy-docapp-close', function (e) {
                e.preventDefault()
                $('.js-copy-docapp-wrong').remove()
            })
        }
    }
    autoFillDiscountCart.init()
})
