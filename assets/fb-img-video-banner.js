$(function () {
    function fbImgVIdeoBannerFun () {
        this.currentIndex = 0
        this._Id = null
        this.isPc = getPcOrMobileNew()
      }
      fbImgVIdeoBannerFun.prototype = {
        init: function(_sectionName) {
            this._Id = _sectionName
            let number = $(`${this._Id} .js-banner-kinds`).attr('data-length')
            if(number > 1) {
                this.swiperFun()
            } 
           
            // this.event()
        },
        event: function () {

        },
        playVideo: function(videodom){
            if(videodom.length > 0) {
                videodom.each(function(index,elemet) {
                    let _isrc = $(elemet).attr('src')
                    if(_isrc && elemet.paused) {
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
                    let _isrc= $(elemet).attr('src')
                    if(_isrc && !elemet.paused) {
                        elemet.pause()
                    }
                })
            }
        },
        swiperFun: function () {
            let _this = this
            let swiperName = `${_this._Id}>.fbHomeImgVideoBanner`
            const swiperSingleGoods = new Swiper(swiperName, {
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                loop: true,
                threshold: 8,
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                on: {
                    slideChange: function() {
                        let realIndex = parseInt(this.realIndex) + 1
                        let _current = $(`${_this._Id} .js-homebanner-slid[data-number=${realIndex}]`)
                        let type = _current.attr('data-type')
                        if(type === 'video_banner') {
                            let _video1 = _current.find('video')
                            _this.playVideo(_video1)
                        } else {
                            let video_all = $(`${_this._Id} .js-homebanner-slid[data-type=video_banner]`)
                            let _video2 = video_all.find('video')
                            _this.pausedVideo(_video2)
                        }
                    }
                },
                pagination: {
                    el: `${_this._Id} .fbhomebaner-swiper-pagination`,
                    clickable: true,
                }
        
            }); 
        }
    }
    let fbhomebannerType = $('.fb-newhome-baner[data-type="swiper"]')
    if(fbhomebannerType.length > 0) {
      $.each(fbhomebannerType, function (i, item) {
          let id = $(item).attr('id')
          new fbImgVIdeoBannerFun().init(`#${id}`);
      })
    }
})