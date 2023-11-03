$(function() {

    const rightNavBanner = {
        isCurrentPull: false,
        storeNavColor: {
            ispull: false
            // newScrollH: 0,
            // oldScrollH: 0,
            // isNew: true
        },
        openH: '356px',
        scalH: '52px',
        isOpen: sessionStorage.getItem("openNavColor") || null,
        _dompull: $('.js-rbcb-pull'),
        _domscale: $('.js-rbcb-scale'),
        _domnav: $('.js-choose-navcolor'),
        _domcontent: $('.js-pcshow-navcolor'),
        init: function () {
            let template = this._domcontent.attr('data-template')
            if( template == 'page.lit-bike' || template == 'page.lit-bike-klarna') {
                this.initDom(1)
            } else if(template == 'page.lit-bike-white' || template == 'page.lit-bike-beige') {
                this.initDom(2)
            }
            this.event()
                // window.addEventListener("scroll", debounce(this.getScrollBar, 200));
        },
        getScrollBar: function () {
            // 监听滚动条
            let scrollTop= document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            console.log("scrollTop", scrollTop)
            
        },
        initDom: function (number) {
            if(number == 2 &&(!this.isOpen || this.isOpen != 'open' )) {
                setTimeout(() => {
                    this._domcontent.show()
                }, 10000)
            } else {
                this._domcontent.show()
            } 
            // 白裸车添加变色
            if(number == 2) {
                this.scrollBackground($('.js-pcshow-navcolor .rbcb-block'))
            }
            // 计算距离
            // let  topfixed =  '38%'
            // if($('.fb-pages-top-banner').length > 0) {
            //     topfixed =  ($('.fb-pages-top-banner').offset().top + 150)
            //     topfixed = `${topfixed}px`
            // }
            // $(".right-bikecolor-box").css('top', topfixed)
            let openPage = ['/pages/lit-bike-moonbow-beige','/pages/lit-bike-snowpeak-white','/pages/lit-bike','/pages/lit-bike-klarna']
            let isPage = false
            openPage.forEach((item, index) => {
                if(document.referrer && document.referrer.includes(item)) {
                    isPage = true
                }
            })
            if(this.isOpen && this.isOpen == 'open' && isPage) {
                this.isCurrentPull = true
                this._dompull.css('height', this.openH)
            } else {
                this._dompull.css('height', this.scalH)
            }  
        },
        scrollBackground: function ($dom) {
            let _this = this
            let animationBike = document.getElementById('scroll-section2');
            let observerBtn = new IntersectionObserver(function(entries){
                entries.forEach( function(element, index) {
                    if (element.isIntersecting) {
                        if(!_this.isCurrentPull) {
                            _this.isCurrentPull = true
                            _this._dompull.css('height', _this.openH)
                            // $dom.removeClass('light-backstyle')
                            // $dom.addClass('dark-backstyle2')
                        }
                    } else {
                        // if($dom.hasClass('dark-backstyle2')) {
                        //     $dom.removeClass('dark-backstyle2')
                        //     $dom.addClass('light-backstyle')
                        // }
                    }
                });
            }, {
                root: null,
                threshold:[0, 1]
            });
             observerBtn.observe(animationBike)
        },
        event: function () {
            let _this = this
            _this._domscale.on("click", function(e) {
                if(_this.isCurrentPull) {
                    _this.isCurrentPull = false
                    _this._dompull.css('height', _this.scalH)
    
                } else {
                    _this.isCurrentPull = true
                    _this._dompull.css('height', _this.openH)
                }
              
            })
            _this._domnav.on("click", function(e) {
                let url = $(this).attr('data-url')
                _this.storeNavColor.ispull = true
                sessionStorage.setItem("openNavColor", "open");
                window.location.href = url
            })
        }
    }
    // pc端展示
    if(window.innerWidth > 768  && $('.js-pcshow-navcolor').length) {
        rightNavBanner.init()
    }
})

