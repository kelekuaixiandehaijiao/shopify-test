$(function () {
    //判断当前页面是否是xbike的商详页
    let currentUrl = window.location.href
    let flag = false
    //判断xbike是否售卖完毕
    const getId = document.getElementById('notice_button')
    let isSaleOut = false
    if (getId) {
        isSaleOut = getId.getAttribute('data-shownotice') ? true : false
    }
    // console.log(getId.getAttribute('data-shownotice'),isSaleOut,'是否在售卖')
    if (currentUrl.includes('products/xbike') && isSaleOut) {
        flag = true
    }
    // console.log(flag,'标志的值是设密码')
    // 这里面控制顶部倒计时和弹窗
    let is_customer_posted = getQueryString('customer_posted')
    
    const marketAllpage = {
        newYear: true,
        data: {
            discount_code: "",
            startTime: "",
            endTime: "",
            countdownTitle: "",
            popupDesc: "",
            uuid: "",
            source: ""
        },
        currentTime: "",
        source: '',
        disableCode: true,
        oldPopShowDelay: 0,
        isSucess:true,
        _jsMarketdown: $('#js-market-down'),
        _marketPop: $('#MarketNewsletterPopup'),
        _marktCirclePop: $('.js-market-circle-btn'),
        _oldPop: $('#NewsletterPopup'),
        _oldPopBg: $('#sub-bg'),
        _oldclosePcPop: $('#close-pc-popup-news'),
        _oldCirclePop: $('#mm-newsletter-button'),
        _popUpTitle: $('#js-market-popup-seconds'),
        _popUpDesc: $('.market-NewsletterPopup__Content'),
        _countDownTitle: $('#js-market-down').find('.mtd-title'),
        isStop: false,
        init: function (source) {
            let isCustomedDelyTime= $('.js-custom-popup').attr('data-delay') || 0
            this.oldPopShowDelay = parseInt(isCustomedDelyTime)
            this.gtmFun()
            // 优先判断source
            this.source = this.getQueryString('source') || ''
            if (this.source) {
                const storeData = this.getCookieLocalStorage()
                // console.log("storeData", storeData)
                if (storeData && storeData.source && storeData.source === this.source && storeData.uuid) {
                    this.getDiscountCodeApi(this.source, storeData.uuid)
                } else {
                    let uuid = getUUID(32, 16)
                    this.getDiscountCodeApi(this.source, uuid)
                }
            } else {
                //判断是否有本地存储
                this.getLocalDiscountCode()
            }
            if(localStorage.getItem('isHasCustomPosted')){
                this._oldCirclePop.hide()
            }
            if (is_customer_posted && String(is_customer_posted) === 'true'&&this.isSucess) {
                this._oldCirclePop.hide()
                this._oldPop.show()
                this._oldPop.attr('aria-hidden', 'false')
                this._oldPopBg.show()
                this._oldPopBg.attr('aria-hidden', 'false')
                localStorage.setItem('isHasCustomPosted',true)
                this.isSucess=false
                customGaEvent('homepopup', window.location.pathname, 'success')
            }
        },
        gtmFun: function() {
            $('#gtm-popup-button').on("click", function(e) {
                customGaEvent('homepopup', window.location.pathname, 'click join in')
                // 校验邮箱
                let emailStr = $('.js-popupGtm-class').attr('value') || ''
                let emailPat=/^(.+)@(.+)$/
                let matchArray=emailStr.match(emailPat)
                if (!matchArray){
                    customGaEvent('homepopup', window.location.pathname, 'email error', emailStr)
                    customGaEvent('homepopup', emailStr, 'email error detail')
                }
                if((Shopify.country  && Shopify.country == 'GB') || (Shopify.Checkout && Shopify.Checkout.currency == 'GBP')) {
                    gtag('event', 'conversion', {'send_to': 'AW-10865361993/_mJhCKjrtJcYEMmIgb0o'});
                } else if((Shopify.country  && Shopify.country == 'AU') || (Shopify.Checkout && Shopify.Checkout.currency == 'AUD')) {
                  gtag('event', 'conversion', {'send_to': 'AW-11193993920/7cmNCMKa7KcYEMCV29kp'});
                } else {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-10865443592/wHSzCOjnvoIYEIiGhr0o',
                        'value': '',
                        'currency': 'USD'
                    });
                }
            })
            $('.js-popupGtm-class').on("blur", function(e) {
                customGaEvent('homepopup', window.location.pathname, 'click enter mail')
            });
        },
        hasDiscountInit: function () {
            this.event()
            this.copyCode()
            let _input = `<input name="discount" type="hidden" value=${this.data.discount_code}>`
            $('body').find('form.js-cart-drawer').append(_input)
            $('body').find('form.js-cart-expand').append(_input)
        },
        getCookieLocalStorage: function () {
            let localData = this.getLocalStorageJson()
            let cookieCode = CookieUtil.getItem('discount_code') || ''
            if (localData && cookieCode) {
                // 判断是否两者都存在
                // 万一重名了就没办法了
                if (localData && localData.discount_code === cookieCode && localData.startTime && localData.endTime) {
                    // 判断时间有没有过期
                    return localData
                } else {
                    this.removeCookieLocaStorage()
                    return ''
                }
            } else if (localData && !cookieCode) {

                // localStorage.removeItem('discountInfo')
                if (localData.endTime && Math.floor((localData.endTime - new Date().getTime()) / 1000) > 0) {
                    // 设置新的
                    CookieUtil.setItem('discount_code', localData.discount_code, localData.endTime / 100)
                    return localData
                } else {
                    localStorage.removeItem('discountInfo')
                    return ''
                }

            } else if (cookieCode && !localData) {
                // 有cookie的时候不能清空 清空了不能维持原样
                return ''
            } else {
                return ''
            }
        },
        // oldPop逻辑
        oldPopEvent: function () {
            let _this = this
            $('body').on('click', '#close-pc-popup-news', function (e) {
                customGaEvent('homepopup', window.location.pathname, 'click close')
                e.preventDefault()
                sessionStorage.setItem("oldPopShow", "open");
                _this._oldPop.attr('aria-hidden', 'true')
                _this._oldPopBg.attr('aria-hidden', 'true')
                _this._oldPopBg.css('display', 'none')
                if (is_customer_posted && String(is_customer_posted) === 'true') {
                    window.location.href = window.location.pathname
                //   _this._oldCirclePop.hide()
                }else{
                  _this._oldCirclePop.show()
                }
                
            })
            // 悬乎窗转弹窗
            $('body').on('click', '#mm-newsletter-button', function (e) {
                // console.log("2", e)
                e.preventDefault()
                _this._oldPop.show()
                _this._oldPop.attr('aria-hidden', 'false')
                _this._oldPopBg.show()
                _this._oldPopBg.attr('aria-hidden', 'false')
                _this._oldCirclePop.hide()
                customGaEvent('homepopup', window.location.pathname, 'pop up window show up');
            })
        },
        getOldPopSession: function () {
            let _this = this
            this._oldPop.hide()
            this._oldPopBg.hide()
            _this._oldCirclePop.hide()
            _this.oldPopEvent()
            // sessionStorage.setItem("markePopShow", "open");
            // if(sessionStorage.getItem("markePopShow"))
            // 如果存在就隐藏 
            if (sessionStorage.getItem("oldPopShow") || flag) {
                // _this._oldPop.show()
                _this._oldCirclePop.show()
                return false
            }
            if (is_customer_posted && String(is_customer_posted) === 'true') {
                _this.oldPopShowDelay = 0
                localStorage.setItem('isHasCustomPosted',true)
            }
            // let oldTimer = setTimeout(() => {
            //     // console.log("3333333")
            //     _this._oldPop.show()
            //     _this._oldPop.attr('aria-hidden', 'false')
            //     _this._oldPopBg.show()
            //     _this._oldPopBg.attr('aria-hidden', 'false')
            //     _this._oldCirclePop.hide()
            //     customGaEvent('homepopup', window.location.pathname, 'pop up window show up')
            //     clearTimeout(oldTimer)
            // }, _this.oldPopShowDelay)
            if(_this.oldPopShowDelay && _this.oldPopShowDelay > 0) {
                let oldTimer = setTimeout(() => {
                    // console.log("3333333")
                    _this._oldPop.show()
                    _this._oldPop.attr('aria-hidden', 'false')
                    _this._oldPopBg.show()
                    _this._oldPopBg.attr('aria-hidden', 'false')
                    _this._oldCirclePop.hide()
                    customGaEvent('homepopup', window.location.pathname, 'pop up window show up')
                    clearTimeout(oldTimer)
                }, _this.oldPopShowDelay)
            } else {
                _this._oldPop.show()
                _this._oldPop.attr('aria-hidden', 'false')
                _this._oldPopBg.show()
                _this._oldPopBg.attr('aria-hidden', 'false')
                _this._oldCirclePop.hide()
                customGaEvent('homepopup', window.location.pathname, 'pop up window show up')
            }
           
            // clearTimeout(oldTimer)


        },
        // 获取是否有本地discount getTimeIsOk非常重要逻辑
        getLocalDiscountCode: function () {
            let _this = this
            const storeData = this.getCookieLocalStorage()
            // console.log("storeData", storeData)
            if (storeData && storeData.discount_code) {
                // 有本地存储并且可以
                this.data = storeData
                if (this.getTimeIsOk()) {
                    this.getMarketShow()
                    this.countdown()
                } else {
                    _this.getOldPopSession()
                }
            } else {
                _this.getOldPopSession()
            }
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        getMarketShow: function () {
            // 顶部倒计时 marketpopup弹窗出现  老弹窗隐藏
            customGaEvent('market-popup-show', 'show', 'market-popup-show')
            customGaEvent('market-countdown-show', 'show', 'market-countdown-show')
            this._jsMarketdown.css('display', 'block');
            //  展示文案
            this._countDownTitle.html(this.data.countdownTitle || '')
            this._popUpDesc.html(this.data.popupDesc || '')

            // console.log("this._marketPop", this._marketPop)
            if (this._oldPop && (this._oldPop.css('display') !== 'none')) {
                this._oldPop.css('display', 'none')
            }
            if (this._oldPopBg && (this._oldPopBg.css('display') !== 'none')) {
                this._oldPopBg.css('display', 'none')
            }
            if (this._oldCirclePop && (this._oldCirclePop.css('display') !== 'none')) {
                this._oldCirclePop.css('display', 'none')
            }
            //  判断是否已经关闭过弹窗
            if (this.getSessionOnce()) {
                this._marktCirclePop.css('display', 'block')
                this._marketPop.css('display', 'block')
                $('#MarketNewsletterPopup').attr("aria-hidden", "true")
            } else {
                this._marktCirclePop.css('display', 'none')
                this._marketPop.css('display', 'block')
                $('#MarketNewsletterPopup').attr("aria-hidden", "false")
            }
            // 添加复制功能
            //  $('.js-market-popup-input').val(this.data.discount_code)
            $('.js-market-popup-input').attr('value', this.data.discount_code)

            $('#js-market-popup-button').attr('data-clipboard-text', this.data.discount_code)
            this.hasDiscountInit()
        },
        // 结束时间和当前时间进行对比，获取有效时间 非常重要
        getTimeIsOk: function () {
            if (this.data.endTime && Math.floor((this.data.endTime - new Date().getTime()) / 1000) > 0) {
                // 控制第三方插件隐藏
                return true

            } else {
                this.removeCookieLocaStorage()
                return false
            }
        },
        // 获取是否存储有效的loaclstorage和cookie
        getLocalStorageJson: function () {
            let dataInfo = JSON.parse(localStorage.getItem('discountInfo') || null)
            return dataInfo
        },
        setCookieLocaStorage: function () {
            CookieUtil.setItem('discount_code', this.data.discount_code, this.data.endTime / 100)
            // CookieUtil.setItem('my_freebeat_code', this.data.discount_code, this.data.endTime/100)
            localStorage.setItem('discountInfo', JSON.stringify(this.data))
            // 设置折扣码
        },
        // 老弹窗出现 新弹窗隐藏
        hideNewShowOld: function () {
            // top倒计时
            if (this._jsMarketdown && (this._jsMarketdown.css('display') !== 'none')) {
                this._jsMarketdown.css('display', 'none')
            }
            // 弹窗倒计时
            if (this._marketPop && (this._marketPop.css('display') !== 'none')) {
                this._marketPop.css('display', 'none')
                if (this._oldPop && (this._oldPop.css('display') === 'none')) {
                    this._oldPop.css('display', 'block')
                    this._oldPopBg.css('display', 'flex')
                    document.getElementById('NewsletterPopup').setAttribute("aria-hidden", "true");
                    document.getElementById('mm-newsletter-button').style.display = "block";
                }
            }

            //  
            if (this._marktCirclePop && (this._marktCirclePop.css('display') !== 'none')) {
                this._marktCirclePop.css('display', 'none')
                if (this._oldPop && (this._oldPop.css('display') === 'none')) {
                    this._oldPop.css('display', 'block')
                    this._oldPopBg.css('display', 'flex')
                    document.getElementById('NewsletterPopup').setAttribute("aria-hidden", "false");
                    document.getElementById('mm-newsletter-button').style.display = "none";
                }
            }
            // 老弹窗
        },
        // 清除cookie和隐藏新弹窗 展示老弹窗
        removeCookieLocaStorage: function (name, value) {
            let localData = this.getLocalStorageJson()
            let cookieCode = CookieUtil.getItem('discount_code') || ''
            if (localData && localData.discount_code && cookieCode && (localData.discount_code !== cookieCode)) {
                // 判断是否来自于其他地方的折扣码，其他什么时候存折扣码是个问题
                localStorage.removeItem('discountInfo')
            } else if (!localData && cookieCode) {
                localStorage.removeItem('discountInfo')
            } else {
                CookieUtil.removeItem('discount_code')
                localStorage.removeItem('discountInfo')
            }
            // 清空的时候判断是否存在oldpop
            // 来源是当前的页面倒计时 当前页面倒计时刚好结束的话 仍然显示弹窗 
            if (!this.isStop) {
                // 判断两处 老弹窗出现 新弹窗隐藏
                this.hideNewShowOld()
            } else {
                // top倒计时
                if (this._jsMarketdown && (this._jsMarketdown.css('display') !== 'none')) {
                    this._jsMarketdown.css('display', 'none')
                }
            }

        },
        addZero: function (number) {
            return (number.toString().length === 1 ? '0' + number : number)
        },
        countdown: function () {
            let _this = this
            this.newYear = false;
            if (!$('#marketCountdown')) {
                return false
            }
            // 记得这儿换成时间戳
            let _time = this.data.endTime

            $('#marketCountdown').countdown({
                timestamp: _time,
                callback: function (days, hours, minutes, seconds, isStop) {
                    if (isStop) {
                        // 倒计时结束了 清空显示
                        _this.isStop = isStop
                        _this._jsMarketdown.css('display', 'none');
                        _this.removeCookieLocaStorage()

                    } else {
                        // 倒计时展示逻辑
                        let _htmltext = ''
                        if (_this._marktCirclePop && (_this._marktCirclePop.css('display') !== 'none')) {
                            if (days > 0) {
                                _htmltext = `<p class="ptext1">${days} ${days === 1 ? 'DAY' : 'DAYS'}</p><p class="ptext2">${hours}h ${minutes}m</p>`

                            } else if ((days === 0 || days < 0) && (hours > 2 || hours === 2)) {
                                _htmltext = `<p class="ptext3">${hours}:${_this.addZero(minutes)}:${_this.addZero(seconds)}</p>`
                            } else if (days <= 0 && hours >= 1 && hours < 2) {
                                _htmltext = `<div class="market-last-circle">
                                    <p>
                                        <img src="https://cdn.shopifycdn.net/s/files/1/0592/3766/2905/files/warn2.png?v=1648629130"/>
                                    </p>
                                    <p class="ptext5">
                                        ${_this.addZero(hours)} ${_this.addZero(minutes)}:${_this.addZero(seconds)}
                                    </p> 
                                </div>`
                                _this._marktCirclePop.addClass('market-btn-border')
                            } else if (days <= 0 && hours <= 0) {
                                _htmltext = `<div class="market-last-circle">
                                <p>
                                    <img src="https://cdn.shopifycdn.net/s/files/1/0592/3766/2905/files/warn2.png?v=1648629130"/>
                                </p>
                                <p class="ptext4">
                                   ${_this.addZero(minutes)}:${_this.addZero(seconds)}
                                </p> 
                             </div>`
                                _this._marktCirclePop.addClass('market-btn-border')
                            }
                            _this._marktCirclePop.html(_htmltext)
                        }
                        if (_this._marketPop && (_this._marketPop.css('display') !== 'none')) {
                            let dataShow = `<p>${_this.addZero(days)}</p><span></span><p>${_this.addZero(hours)}</p><span>:</span><p>${_this.addZero(minutes)}</p><span>:</span><p>${_this.addZero(seconds)}</p>`
                            if (_this._popUpTitle) {
                                _this._popUpTitle.html(dataShow)
                            }
                        }

                    }
                }
            });
        },
        event: function () {
            // 弹窗转悬乎窗
            // customGaEvent('click')
            let _this = this
            $('body').on('click', '.js-market-close-popup', function (e) {
                e.preventDefault()
                customGaEvent('market-popup-close', 'click', 'market-popup-close')
                // 判断如果是倒计时为0了 那么要先展示这个
                if (_this.isStop) {
                    _this.hideNewShowOld()
                } else {
                    _this.setSessionOnce()
                    $('#MarketNewsletterPopup').attr("aria-hidden", "true")
                    $('.js-market-circle-btn').css('display', 'block')
                }
            })
            // 悬乎窗转弹窗
            $('body').on('click', '.js-market-circle-btn', function (e) {
                e.preventDefault()
                customGaEvent('market-samllpop-close', 'click', 'market-samllpop-close')
                if (_this.isStop) {
                    // 如果当前展示的是悬乎窗，则切换到大的
                    _this.hideNewShowOld()
                } else {
                    $('.js-market-circle-btn').css('display', 'none')
                    $('#MarketNewsletterPopup').attr('aria-hidden', 'false')
                }
            })
        },
        setSessionOnce: function () {
            sessionStorage.setItem("markePopShow", "open");
        },
        getSessionOnce: function () {
            if (sessionStorage.getItem("markePopShow")) {
                return true
            } else {
                return false
            }
        },
        //复制逻辑
        copyCode: function () {
            let _this = this
            try {
                const btnclick = new ClipboardJS('#js-market-popup-button');
                // setCookie("discount_code", "")
                btnclick.on('success', function (e) {
                    // console.info('Action:', e.action);
                    // console.info('Text:', e.text);
                    // console.info('Trigger:', e.trigger);
                    MsgBox.init('Discount code copied!', 2000)
                    _this.setSessionOnce()
                    $('#MarketNewsletterPopup').attr("aria-hidden", "true")
                    $('.js-market-circle-btn').css('display', 'block')
                    customGaEvent('copy-code', 'click', 'copy-code-success')
                    e.clearSelection();
                });
                btnclick.on('error', function (e) {
                    // console.error('Action:', e.action);
                    // console.error('Trigger:', e.trigger);
                    MsgBox.init('Copy to clipboard failed.', 2000)
                    _this.setSessionOnce()
                    $('#MarketNewsletterPopup').attr("aria-hidden", "true")
                    $('.js-market-circle-btn').css('display', 'block')
                    customGaEvent('copy-code', 'click', 'copy-code-faled')
                    e.clearSelection();
                });
            } catch {
                console.log("copy bad")
            }

        },
        getDiscountCodeApi: function (source, uuid) {
            let _this = this
            fetch(`http://api.freebeatfit.com/shopify-api/getCoupon?channel=${source}&uuid=${uuid}`).then((response) => {
                //                 fetch(`http://staging-api.freebeatfit.com/shopify-api/getCoupon?channel=${source}&uuid=${uuid}`).then((response) => {
                return response.json();
            })
                .then((data) => {
                    if (data.code === 200 && data.data) {
                        // console.log("data", data.data)
                        _this.data = {
                            startTime: data.data.startTime,
                            endTime: data.data.endTime,
                            discount_code: data.data.coupon,
                            countdownTitle: data.data.countdownTitle || '',
                            popupDesc: data.data.popupDesc || '',
                            uuid: uuid,
                            source: source
                        }
                        // 先中cookie 在判断 进行计时器
                        _this.setCookieLocaStorage()
                        if (_this.getTimeIsOk()) {
                            _this.getMarketShow()
                            _this.countdown()
                        } else {
                            _this.getOldPopSession()
                        }

                    } else {
                        _this.removeCookieLocaStorage()
                        _this.getOldPopSession()
                    }
                }).catch((error) => {
                    console.log("error", error)
                    _this.removeCookieLocaStorage()
                    _this.getOldPopSession()
                }
                )
        }
    }
    marketAllpage.init()
   // 移动端底部执行的footer
      //   移动端自定义导航栏
    let nav_list = document.getElementsByClassName('nav-list')
    let nav_title = document.getElementsByClassName('nav-title')
    let tw_absolute = document.getElementsByClassName('tw-absolute')
    let arr = []
    for (let i = 0; i < nav_title.length; i++) {
        nav_title[i].addEventListener('click', (e) => {
            console.log(nav_list[i].children.length)
            if (arr[i]) {
            nav_list[i].style.height = nav_list[i].children.length * 0 + 'px'
            tw_absolute[i].classList.remove('icon_turn')
            arr[i] = false
            } else {
            nav_list[i].style.height = nav_list[i].children.length * 34 + 'px'
            tw_absolute[i].classList.add('icon_turn')
            arr[i] = true
            }
        })
    }
  
});