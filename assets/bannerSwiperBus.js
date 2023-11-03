$(function() {
    //  .js-videoPlayer 控制全局隐藏或者显示
    if($('.js-public-gtm-index').length > 0) {
        // 首次曝光
        customGaEvent('slde-banner-exposure', window.location.pathname, 'banner1')
        $('body').on('click', '.js-public-gtm-index', function (e) { 
            customGaEvent('home-banner-scrool', window.location.pathname, 'banner' + $(this).data('number'))
        })
    }
    if($('.js-public-gtm-btn').length > 0) {
        $('body').on('click', '.js-public-gtm-btn', function (e) { 
            customGaEvent('home-banner-scrool', window.location.pathname, 'banner' + $(this).data('number') +  $(this).data('btntext'))
        })
    }
    // flickity-page-dots
    if($('body').find('.js-videoAutoPlayer').length > 0) {
        function playFbVideo () {
            // $('.js-videoAutoPlayer').trigger('play')
            $('.js-videoAutoPlayer').each(function(index) {
                if($(this).attr('src')) {
                    $(this).trigger('play')
                }
            })
        }
        function pauseFbVideo() {
            $('.js-videoAutoPlayer').each(function(index) {
                if($(this).attr('src')) {
                    $(this).trigger('pause')
                }
            })
        }

        window.addEventListener('pageshow', function() {
            playFbVideo()
            // window.location.reload()
        });
        window.addEventListener('pagehide', function() {
            pauseFbVideo()
        });
        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState == 'visible') {
                playFbVideo()
            } else {
                pauseFbVideo()
            }
        })
    }
    // announcement bar
    const announcementBar = {
        speedArr: [],
        speed: [],
        currenIndex: 0,
        nextIndex: 1,
        preIndex: 0,
        playTimer: null,
        init: function() {
            if($('.js-announcement-new').length > 0 && ($('.js-announcement-new').attr('data-show') == 'true')) {
                let newbarHtml = $('.js-announcement-new').html()
                $('.js-announcementbar-old').html(newbarHtml)
                $('.js-announcement-new').empty()
            }
            let arr = $('.AnnouncementBar').attr('data-arry').split(',')
            this.speedArr = arr.filter((s) => {
               return s && s.trim()
            }).map((item)=> parseInt(item))
            this.speed = this.speedArr[0]
            // console.log("this.speedArr", this.speedArr, this.speedArr.length)
            this.preIndex = this.speedArr.length -1
            if(this.speedArr && this.speedArr.length > 1) {
                this.event()
            }
            this.iniTopBaner()
            window.addEventListener('resize', debounce(this.iniTopBaner, 500))
           
        },
        iniTopBaner: function () {
            let height1 =  $('.AnnouncementBar').height() || 0
            let height2 = $('#section-header').height() || 0
            // 通知条导航
            if($('.AnnouncementBar').length > 0) {
                $('.shopify-section--header').css('top', height1)
            }
            // 落地页分期价格的吸顶
            if($('.fb-pages-top-banner').length > 0) {
                $('.fb-pages-top-banner').parent().css('top', height1 + height2)
            }
            // 旧版本产品页的导航
            if($('.js-fb-prodcut-detailnav').length > 0) {
                $('.js-fb-prodcut-detailnav').parent().css('top', height1 + height2)
            }
            // 新版本产品页导航
            if($('.js-product-detailnavcard').length > 0) {
                $('.js-product-detailnavcard').parent().css('top', height1 + height2)
            }
        },
        funPlay: function() {
            let _this = this
            this.currenIndex = this.currenIndex + 1
            if(this.currenIndex > ( this.speedArr.length - 1) ) {
                this.currenIndex = 0
                this.nextIndex =  this.currenIndex + 1
                this.preIndex = this.speedArr.length -1
            } else if(this.currenIndex == ( this.speedArr.length - 1) ) {
                this.nextIndex = 0
                this.preIndex = this.currenIndex - 1
            } else {
                this.nextIndex = this.currenIndex + 1
                this.preIndex = this.currenIndex - 1
            }
            $('.js-announcement-box .js-announcement-show').each(function(index) {
                if(index === _this.preIndex) {
                    // $(this).removeClass('utils-scroll-show')
                    // $(this).addClass('utils-scroll-hide')
                }
                if(index === _this.currenIndex) {
                    // $(this).removeClass('utils-scroll-hide')
                    // $(this).addClass('utils-scroll-show')
                }
            })
            this.speed = this.speedArr[this.currenIndex]
            this.playTimer && clearTimeout(this.playTimer)
            this.playTimer = setTimeout(() => {
                this.funPlay()
            }, this.speed)
        },
        event: function() {
            let _this = this
            this.playTimer = setTimeout(() => {
                this.funPlay()
            }, this.speed)
        }
    }
    if($('.AnnouncementBar').length > 0) {
        announcementBar.init()
    }
    const topBannerMarket = {
        topBannerTimer: null,
        init: function() {
            this.getLoopApi()
        },
        getLoopApi: function () {
            let _this = this
            fetch(`https://api.freebeatfit.com/getCarLimitedSale`).then((response) => {
            // fetch(`https://staging-api.freebeatfit.com/getCarLimitedSale`).then((response) => {
                return response.json();
            })
            .then((data) => {
              	$('.js-pink-market-box').css("visibility", "visible")
                if (data.code === 200 && data.data) { 
                    let _data = data.data
                    let number = parseInt(_data.sales)
                    let persent = (100 - number) / 100
                    $('.js-pink-market-text').html(_data.text)
                    $('.js-pink-market-box').each(function() {
                        let linwidth = Math.round($(this).innerWidth() * persent) + 4
                        $(this).find('.js-pink-market-line').css('width', linwidth)
                    })
                    if( number === 100) {
                        return false
                    }
                }
                let timmer = setTimeout(()=> {
                    clearTimeout(timmer)
                    _this.getLoopApi()
                }, 60000)
            }).catch(()=> {
             
            })
        }

    }
    if($('.js-pink-market-text').length > 0) {
        topBannerMarket.init()
    }
    function choosePushHref(el) {
        const target = el.getAttribute("target");
        const url = el.getAttribute("href");
        if (target === "_blank") {
            window.open(url);
        } else {
            window.location.href = url;
        }
    }
    // const keepBikeDom = document.querySelector('.js-keep-biketype')
    // console.log("keepBikeDom", keepBikeDom)
    // if(keepBikeDom) {
    //     document.body.addEventListener("click",function (event) {
    //         console.log(111)
    //         var target = event.target || event.srcElement;      // 兼容处理
    //         console.log("target", target)
    //         console.log("target", target.getAttribute("data-keep-biketype"))
    //         let dataKeepBikeType = target.getAttribute("data-keep-biketype") || null
           
    //         if (target.nodeName.toLocaleLowerCase() === "a" && dataKeepBikeType) {    // 判断是否匹配目标元素
    //             event.preventDefault();
    //             sessionStorage.setItem("customer_bike_type", dataKeepBikeType);
    //             if (event.preventDefault) {     // 对捕获到的 a 标签进行处理
    //                 event.preventDefault();
    //             } else {
    //                 window.event.returnValue = true;
    //             }
    //             choosePushHref(target); // 处理完 a 标签的内容，重新触发跳转，根据原来 a 标签页 target 来判断是否需要新窗口打开
    //         } 
    //     })
    // }
    $('.js-keep-biketype').click(function () {
        let dataKeepBikeType = $(this).attr("data-keep-biketype") || null
        let url = $(this).attr('data-url') || null
        let add_contry_url = ''
        if(Shopify &&  Shopify.country) {
            if(Shopify.country.toUpperCase() == 'GB') {
                if(Shopify.routes.root.indexOf('en-uk') > -1 && (url.indexOf('/en-uk') < 0)) {
                    add_contry_url = '/en-uk'
                }
            } else if(Shopify.country.toUpperCase() == 'AU') {
                if(Shopify.routes.root.indexOf('en-au') > -1 && (url.indexOf('/en-au') < 0)) {
                    add_contry_url = '/en-au'
                } 
            } else {
            }
        }
        if(url) {
            if(dataKeepBikeType && (url.indexOf('/pages/configure-lit-bike') > -1 || url.indexOf('/pages/configure-boom-bike') > -1 )) {
                sessionStorage.removeItem("customer_bike_type");
                sessionStorage.setItem("customer_bike_type", dataKeepBikeType);
            }
            window.location.href = add_contry_url  + url; 
        }
    })
})
