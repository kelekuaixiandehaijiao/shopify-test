  
//software introduction
    let softwareContain
    
    const software = {
        // lastInnerHeight: window.innerHeight,
        // isneedResize :true,
        init: function () {
            $('#software').css('height',  iosMaxheight + 'px')
            $('.fb-soft-mobile').css('height', (4040 +iosMaxheight) + 'px')
            // window.addEventListener('resize', this.onresize)
            this.event()
        },

        // onresize: function () {
        //     let currentH =  window.innerHeight
        //     if(this.lastInnerHeight === currentH) {
        //         return false
        //     }
        //     if(window.innerWidth < 768 && this.isneedResize){
        //         this.lastInnerHeight = window.innerHeight
        //         $('#software').css('height',  (window.innerHeight) + 'px')
        //         $('.fb-soft-mobile').css('height', (4040 +window.innerHeight) + 'px')
        //     }
        // },
        createTweenHide: function () {
            softwareContain = new TimelineMax();
            softwareContain.to(".introduction-box", 1, {
                opacity: '0',
                ease: Linear.easeNone
            },"+=0.5")
        },
        createTweenShow: function () {
            softwareContain = new TimelineMax();
            softwareContain.to(".introduction-box", 1, {
                opacity: '1'
            })
        },
        event: function () {
            var _this = this
            var totalTime=4000            
            this.step4Scene = new ScrollMagic.Scene({
                duration: totalTime,
                triggerElement: '#software',
                triggerHook: "onLeave",
            }).setPin('#software')
                // .addIndicators()
                .setTween(softwareContain)
                .addTo(controller)
            this.step4Scene.on("update", function (evt) {
                // console.log(evt.scrollPos+'滚动',evt.startPos+'开始',evt.endPos+'结束',)
                if(evt.scrollPos - evt.startPos>0&&evt.scrollPos - evt.startPos<totalTime/5){
                    // console.log(totalTime/5,)
                    introductSwiper.slideTo(0, 400, true);
                }
                if(evt.scrollPos - evt.startPos>totalTime/5&&evt.scrollPos - evt.startPos<totalTime/5*2){
                    // console.log(totalTime/5,totalTime/5*2)
                    introductSwiper.slideTo(1, 400, true);
                }
                else if(evt.scrollPos - evt.startPos>=totalTime/5*2&&evt.scrollPos - evt.startPos<totalTime/5*3){
                    // console.log(totalTime/5*2,totalTime/5*3)
                    introductSwiper.slideTo(2, 400, true);
                }
                else if(evt.scrollPos - evt.startPos>=totalTime/5*3&&evt.scrollPos - evt.startPos<totalTime/5*4){
                    // console.log(totalTime/5*3,totalTime/5*4)
                    introductSwiper.slideTo(3, 400, true);
                }else if(evt.scrollPos - evt.startPos>=totalTime/5*4&&evt.scrollPos - evt.startPos<totalTime/5*5){
                    // console.log(totalTime/5*4,totalTime/5*5)
                    introductSwiper.slideTo(4, 400, true);
                }
            })
            this.step4Scene.on("enter", (evt)=> {
                _this.createTweenHide()
                // this.isneedResize = true
                // this.onresize()
            })
            this.step4Scene.on('leave', (evt) => {
                // this.isneedResize = false
                _this.createTweenShow()
            })
        }
    }
    var introductSwiper = new Swiper(".software", {
        init: true,
        direction: 'vertical',
        spaceBetween: 60,
        effect: 'fade',
        initialSlide: 0,
        noSwipingClass: 'software',//限制文字的class不做滑动
        on: {
            slidePrevTransitionStart: function (swiper) {
                // console.log('向左或向上，动画从上往下',this.activeIndex);
                $(".software__content").addClass("downToUp");
            },
            slideNextTransitionStart: function () {
                // console.log('向右或向下切换，动画从下往上',this.activeIndex);
                $(".software__content").addClass("upTodown")
            },
            transitionEnd() {
                // console.log('向右或向下切换，动画从下往上',this.activeIndex);
                $(".software__content").removeClass("upTodown downToUp")
            },

        },
    })
   