$(function () {
    const fbSingleLoop ={
        init: function() {
            this.swiperFun()
        },
        visibleFun: function () {
        },
        swiperFun: function () {
            let _this = this
            var windowWidth=$(window).width();
                let swiperName = '.fbSingleGoodsSwiper'
                const swiperSingleGoods = new Swiper(swiperName, {
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    //   loopFillGroupWithBlank: true,
                    //   autoplayDisableOnInteraction: false,
                    on: {
                        slideChange: function () {
                            $('.js-fsg-loop-profooter').hide()
                            let realIndex = parseInt(this.realIndex) + 1
                            let showclass = `.fb-loop-index${realIndex}`           
                            let circleindex=  `.fb-sg-mobile-doc${realIndex}`
                            $(showclass).show()
                            $(`.fb-sg-mobile-lopbox${realIndex}`).find('.fb-sg-default').show()
                            $(`.fb-sg-mobile-lopbox${realIndex}`).find('.fb-sg-active').hide()
                            $(`.fb-sg-mobile-lopbox${realIndex}`).children(circleindex).find('.fb-sg-default').hide()
                            $(`.fb-sg-mobile-lopbox${realIndex}`).children(circleindex).find('.fb-sg-active').show()
                            // $('.js-fsg-changeurl').attr('href', $(showclass).attr("data-url"))
                        }
                    },
                    pagination: {
                        el: '.fb-sg-dotter-mobile',
                    },
            
                }); 
                const swiperSingleGoodsBoom = new Swiper('.fbSingleGoodsSwiperBoom', {
                    
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    loop: true,
                    //   loopFillGroupWithBlank: true,
                    //   autoplayDisableOnInteraction: false,
                    on: {
                        slideChange: function () {   
                            $('.js-fsg-loop-profooter-boom').hide()
                            let boomrealIndex = parseInt(this.realIndex) + 1
                            let showclassboom = `.fb-loopboom-index${boomrealIndex}`
                            let circleindexboom=  `.fb-sg-mobile-boom-doc${boomrealIndex}`
                            $(showclassboom).show()
                            $(`.fb-sg-mobile-boom-lopbox${boomrealIndex}`).find('.fb-sg-default').show()
                            $(`.fb-sg-mobile-boom-lopbox${boomrealIndex}`).find('.fb-sg-active').hide()
                            $(`.fb-sg-mobile-boom-lopbox${boomrealIndex}`).children(circleindexboom).find('.fb-sg-default').hide()
                            $(`.fb-sg-mobile-boom-lopbox${boomrealIndex}`).children(circleindexboom).find('.fb-sg-active').show()
                        }
                    },
                    pagination: {
                        el: '.fb-sg-dotter-mobile',
                    },
            
                }); 
                $('.fb-sg-imgbox-mobile1').click(function() {
                    let click_index = $(this).attr('data-index')
                    click_index = parseInt(click_index)
                    swiperSingleGoods.slideTo(click_index, 1000, false)
                })
                $('.fb-sg-imgbox-mobile2').click(function() {
                    let click_index_boom = $(this).attr('data-index')
                    click_index_boom = parseInt(click_index_boom)
                    swiperSingleGoodsBoom.slideTo(click_index_boom, 1000, false)
                })
            
        },
        event: function() {

        }
    }
    fbSingleLoop.init() 
})