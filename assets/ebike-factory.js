$(function() {
    var fbFactoryScrollType = 0
    var fbFactoryResizeType = 0
    var fbFactoryNavBarPc = 1280
    var fbFactoryNavBarMob = 1279
    var isOpenPdpVideo = false
    var isEbikePdp = window.location.pathname.indexOf('ebike') > -1 ? true : false
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
    // 吸顶栏
    const fixedTop = {
        dom1: null,
        announcementBarHeight: 0,
        showSection1: [
            {
                ele: '.fb-ebike-ride',
                isShow: false,
                desc: "RIDE BEYOND THE NORM",
                section: 1,
                categorize: 'Features'
            },
            {
                ele: '.fb-ebike-indoor-morph',
                isShow: false,
                desc: "FREEBEAT MORPH 2-IN-1 EBIKE",
                section: 2,
                categorize: "Features"
            },
            {
                ele: '.ebike-break-traditional',
                isShow: false,
                desc: "BREAK THE MOLD OF TRADITIONAL EBIKE",
                section: 3,
                categorize: "Features"
            },
            {
                ele: '.fb-newhome-baner',
                isShow: false,
                desc: "Banner",
                section: 4,
                categorize: "Features"
            },
            {
                ele: '.js-online-reviewers',
                isShow: false,
                desc: "Reviews",
                section: 5,
                categorize: "Reviews"
            },
            {
                ele: '.fb-unboxing-content',
                isShow: false,
                desc: "unboxing",
                section: 6,
                categorize: "Reviews"
            },
            {
                ele: '.fb-planTree-content',
                isShow: false,
                desc: "planTree",
                section: 7,
                categorize: "Reviews"
            },
            {
                ele: '.fb-ebike-speciafication',
                isShow: false,
                desc: "Specifications",
                section: 8,
                categorize: "Specifications"
            }
        ],
        showSection2: [
            {
                ele: '.fb_value_prboom',
                isShow: false,
                desc: "",
                section: 1,
                categorize: 'Features'
            },
            {
                ele: '.fb_newPages_PR_swiper',
                isShow: false,
                desc: "",
                section: 1,
                categorize: 'Features'
            },
            {
              ele: '.fb-newhome-baner',
              isShow: false,
              desc: "",
              section: 1,
              categorize: 'Features'
            },
            {
                ele: '.fb-pages-video-introduce',
                isShow: false,
                desc: "",
                section: 1,
                categorize: 'Features'
            },
            {
                ele: '.fb-product-card',
                isShow: false,
                desc: "",
                section: 1,
                categorize: 'Features'
            },
            {
              ele: '.fb-new-class',
              isShow: false,
              desc: "",
              section: 1,
              categorize: 'Features'
            },
            {
                ele: '.fb-boomclg-section',
                isShow: false,
                desc: "",
                section: 1,
                categorize: 'Features'
            },
            {
                ele: '.fb-boom-klarna',
                isShow: false,
                desc: "",
                section: 1,
                categorize: 'Features'
            },
            {
                ele: '.fb-savings-calculator',
                isShow: false,
                desc: "",
                section: 2,
                categorize: 'Compare'
            },
            {
                ele: '.fb-lit-compare',
                isShow: false,
                desc: "",
                section: 2,
                categorize: 'Compare'
            },
            {
                ele: '.fb-new-performance-section',
                isShow: false,
                desc: "",
                section: 2,
                categorize: 'Compare'
            },
            {
                ele: '.js-online-reviewers',
                isShow: false,
                desc: "",
                section: 3,
                categorize: 'Reviews'
            },
            {
                ele: '.stamped-main-widget',
                isShow: false,
                desc: "",
                section: 3,
                categorize: 'Reviews'
            },
            {
                ele: '.fb-home-social',
                isShow: false,
                desc: "",
                section: 3,
                categorize: 'Specifications'
            },
            {
              ele: '.fb-activeroll-section',
              isShow: false,
              desc: "",
              section: 3,
              categorize: 'Specifications'
            },
            {
                ele: '.fb-key-specifical',
                isShow: false,
                desc: "",
                section: 4,
                categorize: 'Specifications'
            }
        ],
        showSection: [],
        init: function() {
            $('.fb-ebike-nav-bar').parent().css('position', 'fixed')
            $('.fb-ebike-nav-bar').parent().css('width', '100%')
            $('#sticky-top-box').css('position', 'fixed')
            $('#MainContent').css('padding-top', ($('#sticky-top-box').height()) + 'px')
            if(isEbikePdp) {
                this.showSection = [...this.showSection1]
            } else {
                this.showSection = [...this.showSection2] 
            }
            this.renderNavTitle()
            // 移动端改变header样式
            this.dom1 = $(".ebike-ebr-flex").clone()
            // $($(".Header__RightItem")[1]).append($(this.dom1))
            $(".js-header-right-pdp").html($(this.dom1))
            // 记录高度 后面高度变为0 还需变换回来
            this.announcementBarHeight = $('#section-announcement').height() || 0
            this.initTopNavBarPcTopPx()
            this.event()
        },
        renderNavTitle: function() {
            let str = ''
            let reduceArry = [];
            this.showSection.forEach(el => {
                if (!reduceArry.find(e => e.categorize == el.categorize)) {
                    reduceArry.push(el);
                    str += `<a class="js-ebike-eblt-navchoose" href="javascript:void(0);"
                    data-categorize="${el.categorize}">
                        ${el.categorize}
                     </a>`
                }
            })
            $('.js-ebike-eblt-abox').html(str)
        },
        navigateSection: function() {
            this.showSection.forEach(function (item, index) {
                let _dom = item.ele ? document.querySelector(item.ele) || '' : ''
                if(!_dom){
                    return false
                }
                let section_is_show = FbIsInViewPort(_dom)
                if(section_is_show) { 
                    let categorize = item.categorize
                    let cat_dom = $(`.js-ebike-eblt-navchoose[data-categorize=${categorize}]`)
                    if(cat_dom.length && !cat_dom.hasClass('ebike-eblt-select')) { 
                        // pc端
                        $(`.js-ebike-eblt-navchoose[data-categorize=${categorize}]`).addClass('ebike-eblt-select').siblings().removeClass('ebike-eblt-select')
                        $('.js-current-navtitle').text(categorize) //mob端
                    }
                }
            })
        },
        navigatePdp: function () {
            let _dom =  document.querySelector('.ebike-more-imgarr') || ''
            if(!_dom){
                return false
            }
            let video_all = $(`.ebike-more-imgarr .ebike-pdp-slidebox-slide[data-media-type=video]`)
            let section_is_show = FbIsInViewPort(_dom)
            if(section_is_show === isOpenPdpVideo) {
                return false
            } else {
                isOpenPdpVideo = section_is_show
            }
            if(section_is_show) {
                video_all && video_all.each(function() {
                    let _video = $(this).find('video')
                    let this1 = $(this)
                    if(_video.length > 0) {
                        _video.each(function(index,elemet) {
                            let data_open = $(this).attr('data-open')
                            if(elemet.paused && data_open && data_open == 'true') {
                                let playPromise = elemet.play()
                                if (playPromise !== undefined) {
                                    playPromise.then(() => {
                                        elemet.play()
                                    }).catch(()=> {
                                    })
                                }
                                $(this).attr('data-open', 'false')
                            }
                        })
                    }
                })
            } else {
                video_all && video_all.each(function() {
                    let _video = $(this).find('video')
                    let this1 = $(this)
                    if(_video.length > 0) {
                        _video.each(function(index, elemet) {
                            if(!elemet.paused) {
                                elemet.pause()
                                $(this).attr('data-open', 'true')
                            }
                        })
                    }
                })
            }
           
        },
        resizeBarHeight: function() { 
            this.announcementBarHeight = $('#section-announcement').height() || 0
        },
        resizeNavMob: function() { 
            this.resizeBarHeight()
            $('.js-ebike-mobtop-frame').hide()
            $('.ebike-ebl-nav-icon-img').removeClass('navi-open')
        },
        resizeNavPc: function() { 
            this.resizeBarHeight()
            $('.js-ebike-mobtop-frame').show() //pc端是展开的 模式不一样 切换窗口需要重置状态
            $('.ebike-ebl-nav-icon-img').removeClass('navi-open')
        },
        initTopNavBarPcTopPx: function() { 
            let height1 = $('#shopify-section-announcement').height() || 0
            let header_height = $('#shopify-section-header').height() || 0
            let nav_bar_top = header_height + height1
            // let nav_bar_top = $('#sticky-top-box').height() || 0
            $('.fb-ebike-nav-bar').parent().css('top', nav_bar_top + 'px')
        },
        showTopNavBarMob: function() { 
            // 操作topbanner动画效果
            $('.AnnouncementBar').css({'height': '0px', 'opacity': '0', 'transition': 'all 0.5s'})
            this.getSpace(0)
            $('.fb-ebike-nav-bar').addClass('ebike_nav_show')
            // $(".Header__FlexItem--logo").removeClass("show")
            // $(".Header__FlexItem--priceItem").addClass("show")
            // $($(".Header__RightItem")[0]).removeClass("show")
            // $($(".Header__RightItem")[1]).addClass("show")
            $(".fb-header-logo").hide()
            $('.js-header-right').hide()
            $('.js-header-right-pdp').show()
        },
        hideTopNavBarMob: function() { 
            // 操作nav-bar隐藏
            this.resizeHeaderStyle()
            // 操作topbanner动画效果
            $('.fb-ebike-nav-bar').removeClass('ebike_nav_show')
            $('.AnnouncementBar').css({'height': this.announcementBarHeight + 'px', 'opacity': '1', 'transition': 'all 0.3s'})
            this.getSpace(this.announcementBarHeight)
        },
        showTopNavBarCom: function() { 
            if(window.innerWidth > fbFactoryNavBarMob) { 
                $('.fb-ebike-nav-bar').addClass('ebike_nav_show')
            } else {
                this.showTopNavBarMob()
            }
        },
        hideTopNavBarCom: function() { 
            if(window.innerWidth > fbFactoryNavBarPc) { 
                $('.fb-ebike-nav-bar').removeClass('ebike_nav_show')
            } else {
                this.hideTopNavBarMob()
            }
        },
        getSpace: function(number) { 
            let height1 = number
            // $('#shopify-section-header').css({'top': `${height1}px`, 'transition': 'all 0.3s'})
            let header_height = $('#shopify-section-header').height()
            let nav_bar_top = height1 + header_height
            // let nav_bar_top = $('#sticky-top-box').height() || 0
            $('.fb-ebike-nav-bar').parent().css('top', nav_bar_top + 'px')
        },
        resizeHeaderStyle: function() { 
            // $(".Header__FlexItem--priceItem").removeClass("show")
            // $(".Header__FlexItem--logo").addClass("show")
            // $($(".Header__RightItem")[0]).addClass("show")
            // $($(".Header__RightItem")[1]).removeClass("show")
            $('.js-header-right-pdp').hide()
            $(".fb-header-logo").show()
            $('.js-header-right').show()
        },
        event: function() {
            let _this = this
            $('.js-ebike-mobtop-open').click(function() {
                if(window.innerWidth < fbFactoryNavBarPc) {
                    if($('.ebike-ebl-nav-icon-img').hasClass('navi-open')) {
                        $('.js-ebike-mobtop-frame').slideUp()
                        $('.ebike-ebl-nav-icon-img').removeClass('navi-open')
                    } else {
                        $('.ebike-ebl-nav-icon-img').addClass('navi-open')
                        $('.js-ebike-mobtop-frame').slideDown()
                    }
                } else {
                    return false
                }
            })
            // 点击顶部导航栏跳转到指定地方
            $('.js-ebike-eblt-navchoose').click(function () {
                if($(this).hasClass('ebike-eblt-select')) { 
                    return false
                }
                // mob 端
                if(window.innerWidth < fbFactoryNavBarPc ) {
                    if($('.ebike-ebl-nav-icon-img').hasClass('navi-open')) {
                        $('.js-ebike-mobtop-frame').slideUp()
                        $('.ebike-ebl-nav-icon-img').removeClass('navi-open')
                    }
                }
                // 共用
                // let allHeaderHeight = ($("#shopify-section-header").height() || 0) + ($('.AnnouncementBar').height() || 0) + ($('.fb-ebike-nav-bar').height() || 0)
                let allHeaderHeight = ($('#sticky-top-box').height() || 0) + ($('.fb-ebike-nav-bar').height() || 0)
                let categorize = $(this).attr('data-categorize')
                let current_ele = ''
                _this.showSection.forEach(function (item, index) {
                    if(item.categorize.toLocaleLowerCase() == categorize.toLocaleLowerCase()) {
                        if(!current_ele) {
                            current_ele = item.ele
                        }
                    }
                })
                if(current_ele && $(current_ele).length) { 
                    $(this).addClass('ebike-eblt-select').siblings().removeClass('ebike-eblt-select')
                    $('.js-current-navtitle').text(categorize)
                    document.documentElement.scrollTop = $(current_ele).offset().top - allHeaderHeight
                }
               
            })
        }
    }
    fixedTop.init()
    const ebikeScollSection = {
        enabledPause: true,
        scrollHandle: null,
        resizeHandle: null,
        init: function () {
            this.initScrollThrottle() //初始化一次
            // this.initResize() //初始化一次
            this.event();
            
        },
        bottomFixedBarSection: function () { 
            let contentTop  = $('#js-addtocart-button-scroll').offset().top
            let clientHeight = window.innerHeight || document.documentElement.clientHeight
            let scrollTop = document.documentElement.scrollTop;
            if( scrollTop > contentTop) { 
                if(fbFactoryScrollType != 1){
                    fixedTop.showTopNavBarCom()
                    fbFactoryScrollType = 1
                }
            } else {
                if(fbFactoryScrollType != 2){
                    fixedTop.hideTopNavBarCom() 
                    fbFactoryScrollType = 2
                }
            }
            if(contentTop < clientHeight) {
                $('.ebike-fbm-test-show-fixed').hide()
                return false
            }
            if(contentTop <  scrollTop + clientHeight) {
                $('.ebike-fbm-test-show-fixed').fadeOut(500)
            } else {
                $('.ebike-fbm-test-show-fixed').fadeIn(500)
            }
        },
        fbRideCompanionSection: function (isShow) {
            $('.ride-companion-item').each(function (index, element) {
                if($(element).hasClass('swiper-slide-active')) {
                    let _video = $(element).find('video')
                    if(_video.length) {
                        isShow &&  fbPlayVideo(_video)
                        !isShow && fbPausedVideo(_video)
                    }
                }
            }) 
        },
        resizeThrottle: function () { 
            let _this = this
            let currentW =  window.innerWidth
            fbFactoryScrollType = 0  //宽度改变需要重置scoll状态
            if(currentW < fbFactoryNavBarPc){
                if(fbFactoryResizeType != 1) {
                    fixedTop.resizeNavMob()
                    fbFactoryResizeType = 1
                }
            } else  {
                if(fbFactoryResizeType != 2) {
                    // 简短版本
                    fixedTop.initTopNavBarPcTopPx()
                    fixedTop.resizeHeaderStyle()
                    fixedTop.resizeNavPc()
                   
                } else {
                    return false
                }
                fbFactoryResizeType = 2    
            }
        },
        scrollThrottle: function () {
            let _this = this
            // 吸底部操作 和 header顶部变化
            _this.bottomFixedBarSection()
            // 顶部nav导航栏定位操作  test show
            fixedTop.navigateSection()
            fixedTop.navigatePdp()
        },
        // 因为litbike 有延迟500s加载 所以 初始化的时候得重新同步
        initScrollThrottle: function () {
            let _this = this
            // 吸底部操作 和 header顶部变化
            _this.bottomFixedBarSection()

            fixedTop.navigateSection()
            $('.js-ebike-eblt-abox').css('visibility', 'visible')
            $('.ebike-ebl-nav-hide').css('visibility', 'visible')
            // if(isEbikePdp) {
            //     fixedTop.navigateSection()
            //     $('.js-ebike-eblt-abox').css('visibility', 'visible')
            //     $('.ebike-ebl-nav-hide').css('visibility', 'visible')
            // } else {
            //     let productcardlazy = setTimeout(() => {
            //         fixedTop.navigateSection()
            //         $('.js-ebike-eblt-abox').css('visibility', 'visible')
            //         $('.ebike-ebl-nav-hide').css('visibility', 'visible')
            //         productcardlazy && clearTimeout(productcardlazy)
            //     }, 5000)
            // }
        },
        event: function() {
            let _this = this
            this.scrollHandle = throttleNew(this.scrollThrottle, 300, this, true)
            window.addEventListener('scroll', this.scrollHandle, true);
            this.resizeHandle = throttleNew(this.resizeThrottle, 300, this, true)
            window.addEventListener('resize',  this.resizeHandle)
        }
    }
    ebikeScollSection.init();
});