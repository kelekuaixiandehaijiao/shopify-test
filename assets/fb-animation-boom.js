let controller = new ScrollMagic.Controller({refreshInterval:0});
const fb_boom_bike_yellow = '/pages/boom-bike-tuscany-yellow'
const fb_boom_bike_grey = '/pages/boom-bike-mist-grey'
$(function () {
    const boomBikeFun = {
        dumbbellPlayer: null,
        totalSpace: 0,
        firstSpace: 800,
        firstAfterAdd: 300,
        firstSpaceAdd: 600,
        secondSpace: 2000,
        thirdSpace: 400,
        isSvgaDumbbellLoaded: false,
        sourceMobile: {
            video0: videoAssetUrl + "videos/c/o/v/4143a4ff3dc64b389e096806ac035900.mp4",
            video1: videoAssetUrl + "videos/c/o/v/e4f67f394fbf47f48cc5bb1bf62fc7e9.mp4",
            video2: videoAssetUrl + "videos/c/o/v/77152441294b43dabd981847deb2172e.mp4",
            arrmob: [],
            first: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boomfirst.jpg?v=1663671065"
        },
        sourcePc: {
            video0: videoAssetUrl + "videos/c/o/v/6fe4e0f7df984ca18ab65c81d43d4cd3.mp4",
            video1: videoAssetUrl + "videos/c/o/v/69ebfa9a82274e19b5b9fa3e948a40fd.mp4",
            video2: videoAssetUrl + "videos/c/o/v/e1e9dd8b07394028827ffc9be559acb1.mp4",
            arrmob: [],
            first: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/20220923-112412.jpg?v=1664170715"
        },
        sourceMobYellowGrey: {
            video0: videoAssetUrl + "videos/c/o/v/4143a4ff3dc64b389e096806ac035900.mp4",
            video1: videoAssetUrl + "videos/c/o/v/556c7703ecde463abdc80d8f8e840484.mp4",
            video2: videoAssetUrl + "videos/c/o/v/53ed4decf8bb41d1ab472886ec2156ac.mp4",
            arrmob: [],
            first: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boomfirst.jpg?v=1663671065"
        },
        sourcePcYellowGrey: {
            video0: videoAssetUrl + "videos/c/o/v/6fe4e0f7df984ca18ab65c81d43d4cd3.mp4",
            video1: videoAssetUrl + "videos/c/o/v/bbf51d48b57947a19d9aefaf5f98deb2.mp4",
            video2: videoAssetUrl + "videos/c/o/v/8eb661dd24184d5fa49d357ee5722d4b.mp4",
            arrmob: [],
            first: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/20220923-112412.jpg?v=1664170715"
        },
        sourceObj: {},
        timerBtn: null,
        boolObj: {
            zero: true,
            oneafter: true,
            one: true,
            oneadd: true,
            two: true,
            three: true,
            four: true,
        },
        boolText: {
            one: true,
            oneadd: true,
            two: true,
            three: true,
            four: true,
            five: true
        },
        chairScene: null,
        _domTotalH:  $('.fb-animation-boom-class'),
        _domScroolH: $('#fb-scroll-boom'),
        _domInnerH: $('.fb-scroll-boom-container'),
        _domFullImg: $('.boom-section-fullimg'),
        _domFullImgSrc: $('.js-boom-back'),
        _textfirst: $('.boom-section-firsttext'),
        _domVideo0: $('#boom-sectionzero-video'),
        _domVideoSrc0: $('#boom-sectionzero-videosrc'),
        _domVideo1: $('#boom-sectionfirst-video'),
        _domVideoSrc1: $('#boom-sectionfirst-videosrc'),
        _domVideo2: $('#boom-section-video'),
        _domVideoSrc2: $('#boom-section-videosrc'),
        thumVideoId0: document.getElementById("boom-sectionzero-videosrc"),
        thumVideoId1: document.getElementById("boom-sectionfirst-videosrc"),
        thumVideoId2: document.getElementById("boom-section-videosrc"),
        _domSvga1: $('#boom-section-svga'),
        _domIconMuted1: $('#boom-video-muted-one'),  //jinying 1 id
        _domIconMuted2: $('#boom-video-muted'),  //jinying 2 id
        _textSvg: $('#boom-svg-text'),
        _textVideo: $('#boom-video-text'),
        init: function () {
            this.totalSpace = this.firstSpace + this.secondSpace + this.thirdSpace + this.firstSpaceAdd + this.firstAfterAdd
            this._domTotalH.css('height', (this.totalSpace + iosMaxheight) + 'px')
            this._domScroolH.css('height', (this.totalSpace + iosMaxheight) + 'px')
            this._domInnerH.css('height', iosMaxheight + 'px')
            this.event()
            this.renderImg() 
        },
        mutedVideo1: function () {
            // jinying
            this.thumVideoId1.muted = true;
            this._domIconMuted1.find(".fac-open-video").css('display', 'none')
            this._domIconMuted1.find(".fac-close-video").css('display', 'block')
        },
        mutedVideo2: function () {
            // jinying
            this.thumVideoId2.muted = true;
            this._domIconMuted2.find(".fac-open-video").css('display', 'none')
            this._domIconMuted2.find(".fac-close-video").css('display', 'block')
        },
        renderImg: function () {
            if (window.innerWidth <= 820) {
                for(let i = 0; i<= 65; i++) {
                    this.sourceMobYellowGrey.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boomyellowtmob${i <= 9? '0' + i : i}.jpg`)
                }
                this.sourceObj = Object.assign(this.sourceMobYellowGrey, this.sourceObj)
               
            } else {
                for(let i = 0; i<= 65; i++) {
                    this.sourcePcYellowGrey.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boomyellowtpc${i<=9? '0' + i : i}.jpg`)
                }
                this.sourceObj = Object.assign(this.sourcePcYellowGrey, this.sourceObj)
            }
            this._domFullImgSrc.attr('src', this.sourceObj.first)
            this._domVideoSrc0.attr('src', this.sourceObj.video0)
            this._domVideoSrc2.attr('src', this.sourceObj.video2)
            this._domVideoSrc1.attr('src', this.sourceObj.video1)
            this.loadDumbbell(this.sourceObj.arrmob)
        },
        playVideo0: function(){
            let timer = null
            if(this.thumVideoId0.paused){ 
                this.thumVideoId0.play();
            }
        },
        pausedVideo0: function () {
            // if(!this.thumVideoId1.muted) {
            //     this.mutedVideo1()
            // }
            if(!this.thumVideoId0.paused){
                this.thumVideoId0.pause();  
            }
        },
        playVideo1: function(){
            let timer = null
            if(this.thumVideoId1.paused){ 
                this.thumVideoId1.play();
            }
        },
        pausedVideo1: function () {
            if(!this.thumVideoId1.muted) {
                this.mutedVideo1()
            }
            if(!this.thumVideoId1.paused){
                this.thumVideoId1.pause();  
            }
        },
        playVideo2: function(){
            let timer = null
            if(this.thumVideoId2.paused){ 
                this.thumVideoId2.play();
            }
        },
        pausedVideo2: function () {
            if(!this.thumVideoId2.muted) {
                this.mutedVideo2()
            }
            if(!this.thumVideoId2.paused){
                this.thumVideoId2.pause();  
            }
        },
        loadDumbbell: function (mob) {
            this.dumbbellPlayer = new ImgToFrame('#boom-section-svga', mob);
            this.isSvgaDumbbellLoaded = true;
        },
        repeatBool: function (name) {
            let _this = this
            Object.keys(_this.boolObj).forEach((key)=> {
                if(key !== name) {
                    _this.boolObj[key] = true
                }
            })
        },
        repeatText: function (name) {
            let _this = this
            Object.keys(_this.boolText).forEach((key)=> {
                if(key !== name) {
                    _this.boolText[key] = true
                }
            })
        },
        getOneSence: function () {
            let _this = this
            _this._domFullImg.css("opacity", 1)
            _this._domSvga1.removeClass('boom-move-show')
            _this._domVideo2.removeClass('boom-move-show')
            _this._domVideo1.removeClass('boom-move-show')
            _this._domVideo0.removeClass('boom-move-show')
            _this.pausedVideo0()
            _this.pausedVideo1()
            _this.pausedVideo2()
            _this._domIconMuted1.hide()
            _this._domIconMuted2.hide()
            _this.isSvgaDumbbellLoaded && _this.dumbbellPlayer.stepToPercentage(0);
        },
        event: function () {
            let _this = this
            let height = window.innerHeight;
            let dumbbellId = document.getElementById('fb-scroll-boom');
            this.chairScene = new ScrollMagic.Scene({
                duration: _this.totalSpace,
                triggerElement: dumbbellId, //触发元素
                triggerHook: "onLeave",
                offset: 1
            }).setPin('#fb-scroll-boom').addTo(controller);
            _this.chairScene.on("leave", function (evt) { 
                _this.pausedVideo0()
                _this.pausedVideo1()
                _this.pausedVideo2()
                _this._domIconMuted2.hide()
            })
            // _this.thumVideoId0.loop=false
            // _this.thumVideoId0.addEventListener('ended', function () { //结束
            //     _this._domVideo1.addClass('boom-move-show')
            //     _this._domVideo0.removeClass('boom-move-show')
            //     _this._domIconMuted1.show()
            //     _this._domIconMuted2.hide()
            //     _this.playVideo1()
            //     _this.pausedVideo0()
            // }, false);
            // opactity 做显示隐藏是为了效果 不建议用display：none 切换dom
            _this.chairScene.on("update", function (evt) {
                let delta = evt.endPos - evt.scrollPos;
                let one = parseInt(evt.startPos + _this.firstSpace)
                let oneafter =  parseInt(evt.startPos + _this.firstSpace + _this.firstAfterAdd)
                let oneadd =  parseInt(evt.startPos + _this.firstSpace + _this.firstSpaceAdd  + _this.firstAfterAdd)
                let two = parseInt(evt.startPos + _this.firstSpace + _this.secondSpace + _this.firstSpaceAdd  + _this.firstAfterAdd)
                let three = parseInt(evt.startPos + _this.firstSpace + _this.secondSpace + _this.thirdSpace + _this.firstSpaceAdd  + _this.firstAfterAdd)
                if(evt.scrollPos < evt.startPos - 260) {
                    if(_this.boolObj.zero) { 
                        _this.getOneSence()
                        _this.repeatBool('zero')
                    }
                    _this.boolObj.zero = false
                   
                } else if (evt.startPos - 260 <= evt.scrollPos && evt.scrollPos <= one - 200) {
                   if(_this.boolObj.one) {
                        _this.getOneSence()
                        _this.repeatBool('one')
                    }
                    _this.boolObj.one = false
                    // 渐现
                    if(evt.startPos < evt.scrollPos && evt.scrollPos <= evt.startPos + 400 ) {
                        let temp0 =  evt.scrollPos - evt.startPos;
                        let real0 = (temp0) / 400 * 20;
                        real0 = Math.floor(real0);
                        // _this._domFullImg.css("opacity", `${(temp1/400)}`)
                        _this._textfirst.css("opacity", `${(temp0/400)}`)
                        _this._textfirst.css("transform", `translateY(-${real0}px)`)
                    }
                } else if (one - 200 < evt.scrollPos && evt.scrollPos <= oneafter ) {
                    if(_this.boolObj.oneafter) { 
                        _this._textfirst.css("opacity", 0)
                        _this._domSvga1.removeClass('boom-move-show')
                        _this._domVideo0.addClass('boom-move-show')
                        _this._domVideo2.removeClass('boom-move-show')
                        _this._domVideo1.removeClass('boom-move-show')
                        _this.playVideo0()
                        _this.pausedVideo1()
                        _this.pausedVideo2()
                        _this._domIconMuted1.hide()
                        _this._domIconMuted2.hide()
                        _this.repeatBool('oneafter')
                    }
                    if(one - 200 < evt.scrollPos && evt.scrollPos <= one + 200 ) {
                        let temp1 = evt.scrollPos;
                        _this._domFullImg.css("opacity", `${(temp1/400)}`)
                        // _this._textfirst.css("opacity", `${(temp1/400)}`)
                    } else {
                        _this._domFullImg.css("opacity", 0)
                        // _this._textfirst.css("opacity", 0)
                    }
                    _this.boolObj.oneafter = false

                } else if (oneafter - 200 < evt.scrollPos && evt.scrollPos <= oneadd) { 
                    if(_this.boolObj.oneadd) {
                        // _this._domFullImg.removeClass('boom-move-show')
                        // _this._textfirst.removeClass('boom-move-show')
                        _this._domSvga1.removeClass('boom-move-show')
                        _this._domVideo2.removeClass('boom-move-show')
                        _this._domVideo1.addClass('boom-move-show')
                        _this._domVideo0.removeClass('boom-move-show')
                        _this.isSvgaDumbbellLoaded && _this.dumbbellPlayer.stepToPercentage(0);
                        _this._domIconMuted1.show()
                        _this._domIconMuted2.hide()
                        _this.playVideo1()
                        _this.pausedVideo2()
                        _this.pausedVideo0()
                        _this.repeatBool('oneadd')
                    }
                    // 渐隐
                   
                    _this.boolObj.oneadd = false
                    if(oneafter - 200 < evt.scrollPos && evt.scrollPos <= oneafter + 200 ) {
                        let temp2 =  evt.scrollPos - oneafter;
                        _this._domVideo0.css("opacity", `${1-(temp2/400)}`)
                    } else {
                        _this._domVideo0.css("opacity", 0)
                    }
                   
                } else if (oneadd < evt.scrollPos && evt.scrollPos <= two) {
                    let cur = evt.scrollPos - oneadd;
                    _this.isSvgaDumbbellLoaded && _this.dumbbellPlayer.stepToPercentage(cur / (_this.secondSpace));
                    if(_this.boolObj.two) {

                        _this._domFullImg.css("opacity", 0)
                        _this._textfirst.css("opacity", 0)

                        // _this._domFullImg.removeClass('boom-move-show')
                        // _this._textfirst.removeClass('boom-move-show')
                        _this._domSvga1.addClass('boom-move-show')
                        _this._domVideo2.removeClass('boom-move-show')
                        _this._domVideo1.removeClass('boom-move-show')
                        _this._domVideo0.removeClass('boom-move-show')
                        _this._domVideo0.removeClass('boom-move-show')
                        _this._domIconMuted1.hide()
                        _this._domIconMuted2.hide()
                        _this.pausedVideo2()
                        _this.pausedVideo1()
                        _this.pausedVideo0()
                        _this.repeatBool('two')
                    }
                    _this.boolObj.two = false
                } else if (two < evt.scrollPos && evt.scrollPos <= three) {
                    // three active
                    if(_this.boolObj.three) {
                        // _this._domFullImg.removeClass('boom-move-show')
                        // _this._textfirst.removeClass('boom-move-show')
                        _this._domFullImg.css("opacity", 0)
                        _this._textfirst.css("opacity", 0)
                        _this._domSvga1.removeClass('boom-move-show')
                        _this._domVideo2.addClass('boom-move-show')
                        _this._domVideo1.removeClass('boom-move-show')
                        _this._domVideo0.removeClass('boom-move-show')
                        _this._domIconMuted1.hide()
                        _this._domIconMuted2.show()
                        _this.playVideo2()
                        _this.pausedVideo1()
                        _this.pausedVideo0()
                        _this.repeatBool('three')
                    }
                    _this.boolObj.three = false
                   
                } else {
                    if(_this.boolObj.four) {
                        _this.repeatBool('four')
                    }
                    _this.boolObj.four = false                   
                }
                // text position
                if(evt.scrollPos <= oneadd - 200) {
                    if(_this.boolText.one) {
                       _this._textSvg.show()
                       _this._textVideo.hide()
                       _this.repeatText('one')
                       _this._textSvg.css("opacity", 1)
                    }
                    _this.boolText.one = false
                } else if(evt.scrollPos >  oneadd - 200 && evt.scrollPos <= oneadd  + 200) { 
                    if(_this.boolText.two) {
                       _this._textSvg.show()
                       _this._textVideo.hide()
                       _this.repeatText('two')
                    }
                    _this.boolText.two = false

                    let temp2 = oneadd  + 200 - evt.scrollPos
                    let real2 = (temp2) / 400 * 20;
                    real2 = Math.floor(real2);
                    _this._textSvg.css("transform", `translateY(-${real2}px)`)
                    _this._textSvg.css("opacity",temp2/400)

                } else  if (evt.scrollPos > (oneadd + 200)  && evt.scrollPos < two - 600) {
                    if(_this.boolText.three) {
                        _this._textSvg.hide()
                        _this._textVideo.hide()
                        _this._textSvg.css("opacity", 0)
                        _this._textVideo.css("opacity", 0)
                        _this.repeatText('three')
                    }
                    _this.boolText.three = false
                    
                } else if(evt.scrollPos > (two - 600) && evt.scrollPos <=  two) {
                    //渐现
                    if(_this.boolText.four) {
                        _this._textSvg.hide()
                        _this._textVideo.show()
                        _this._textVideo.css("opacity", 0)
                        _this.repeatText('four')
                    }
                    _this.boolText.four = false
                    let temp3 = two - evt.scrollPos

                    let real3 = (temp3) / 600 * 30;
                    real3 = Math.floor(real3);
                    _this._textVideo.css("transform", `translateY(${real3}px)`)
                    _this._textVideo.css("opacity", 1- temp3/600)

                } else if( evt.scrollPos > two) {
                    if(_this.boolText.five) {
                        _this._textSvg.hide()
                        _this._textVideo.show()
                        _this._textSvg.css("opacity", 0)
                        _this._textVideo.css("opacity", 1)
                        _this.repeatText('five')
                    }
                    _this.boolText.five = false
                }
            })
            $('#boom-video-muted-one').click(function () {
                let sta = _this.thumVideoId1.muted;
                if (sta == true) {
                    _this.thumVideoId1.muted = false;
                    _this._domIconMuted1.find(".fac-open-video").css('display', 'block')
                    _this._domIconMuted1.find(".fac-close-video").css('display', 'none')
                } else {
                    _this.mutedVideo1()
                }
            })
            $('#boom-video-muted').click(function () {
                let sta = _this.thumVideoId2.muted;
                if (sta == true) {
                    _this.thumVideoId2.muted = false;
                    _this._domIconMuted2.find(".fac-open-video").css('display', 'block')
                    _this._domIconMuted2.find(".fac-close-video").css('display', 'none')
                } else {
                    _this.mutedVideo2()
                }
            })
           
        }
    }
   

    //  chair section
    const boomBikeChair = {
        buttPlayer1: null,
        isButt1: false,
        buttPlayer2: null,
        isButt2: false,
        isPress: false,
        but1Arr: [],
        but2Arr:[],
        clickUp: "<span>Press</span><span>to Stand</span>",
        clickDown: '<span>Press</span><span>to Sit</span>',
        sourceMobile: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boomcharmob.png?v=1664274578",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boomcharmobdown.png?v=1664274578",
            arrmob: [],
        },
        sourcePc: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/chairpcup.png?v=1664276560",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/chairpcdown.png?v=1664276560",
            arrmob: [],
        },
        sourceYellowMobile: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Yellow_State2-Mobile.png?v=1669948639",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Yellow_State1-Mobile.png?v=1669948638",
            arrmob: [],
        },
        sourceYellowPc: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Yellow_State2-PC.png?v=1669948638",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Yellow_State1-PC.png?v=1669948638",
            arrmob: [],
        },
        sourceGreyMobile: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Gray_State2-Mobile.png?v=1669963712",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Gray_State1-Mobile.png?v=1669963712",
            arrmob: [],
        },
        sourceGreyPc: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Gray_State2-PC.png?v=1669963713",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Gray_State1-PC.png?v=1669963712",
            arrmob: [],
        },
        sourceObj: {},
        timerBtn: null,
        _domPressBtn: $('.js-boomchair-down'),
        _domCircleOne: $('#chair-boombtn-svga-one'),
        _domCircleTwo: $('#chair-boombtn-svga-two'),
        _domChairUp: $('.js-boom-chairup'),
        _domChairDown: $('.js-boom-chairdown'),
        init: function () {
            this.event()
            this.renderImg() 
        },
        renderImg: function () {
            if (window.innerWidth <= 820) {
                if (window.location.pathname === fb_boom_bike_yellow) { 
                    this.sourceObj = Object.assign(this.sourceYellowMobile, this.sourceObj)
                }else if(window.location.pathname === fb_boom_bike_grey) {
                    this.sourceObj = Object.assign(this.sourceGreyMobile, this.sourceObj)
                } else {
                    this.sourceObj = Object.assign(this.sourceMobile, this.sourceObj)
                }
                
            } else {
                this.clickUp = "<span>Click</span><span>to Stand</span>"
                this.clickDown = '<span>Click</span><span>to Sit</span>'
                if (window.location.pathname === fb_boom_bike_yellow) {  
                    this.sourceObj = Object.assign(this.sourceYellowPc, this.sourceObj)
                }else if(window.location.pathname === fb_boom_bike_grey) {
                    this.sourceObj = Object.assign(this.sourceGreyPc, this.sourceObj)
                }else{
                    this.sourceObj = Object.assign(this.sourcePc, this.sourceObj)
                }
               
            }
            // for(let i= 24; i<=47; i++) {
            //     this.but1Arr.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/good_000${i}.png`)
            // }
            // for(let i= 55; i<=71; i++) {
            //     this.but2Arr.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/excellent_000${i}.png`)
            // }
            this._domPressBtn.html(this.clickUp)
            this._domChairUp.attr('src', this.sourceObj.up)
            this._domChairDown.attr('src', this.sourceObj.down)
            // this.loadButt1()
            // this.loadButt2()
        },
        playVideo2: function(){
            let timer = null
            if(this.thumVideoId2.paused){ 
                this.thumVideoId2.play();
            }
        },
        loadButt1: async function () {
            this.buttPlayer1 = new ImgToFrame('#chair-boombtn-svga-one', this.but1Arr);
            this.isButt1 = true;
        },
        loadButt2: function () {
            this.buttPlayer2 = new ImgToFrame('#chair-boombtn-svga-two', this.but2Arr);
            this.isButt2 = true;
        },
        clickCircle: function() {
            this._domPressBtn.html(this.clickDown)
            this.isButt2 &&  this.buttPlayer2.play()
            this.isButt1 &&  this.buttPlayer1.stop()
            this._domChairUp.css('opacity', 0)
            this._domChairDown.css('opacity', 1)
            this._domCircleOne.css('opacity', 0)
            this._domCircleTwo.css('opacity', 1)
        },
        initialCircle: function () {
            this.isButt2 &&  this.buttPlayer2.stop()
            this.isButt1 &&  this.buttPlayer1.play()
            this._domPressBtn.html(this.clickUp)
            this._domChairUp.css('opacity', 1)
            this._domChairDown.css('opacity', 0)
            this._domCircleOne.css('opacity', 1)
            this._domCircleTwo.css('opacity', 0) 
        },
        event: function () {
            let _this = this
            this._domPressBtn.on("click", function (e) {
                e.preventDefault(); 
                // click up              
                if(!_this.isPress) {
                    _this.clickCircle()
                } else {
                    // click down
                    _this.initialCircle()
                }
                _this.isPress = !_this.isPress
                $('.boomchair-press-btn').css('transform', 'scale(0.8)')
                $('.boomchair-press-btn').css('opacity', '0.8')
                _this.timerBtn = setTimeout(() => {
                    clearTimeout(_this.timerBtn)
                    $('.boomchair-press-btn').css('transform', 'scale(1)')
                    $('.boomchair-press-btn').css('opacity', '1')
                }, 200)
            });
        }
    }
 
    const boomProgress = {
        init: function () {
            let videoboomId = null
            if(window.innerWidth >= 821 ) {
                videoboomId = document.getElementById("js-boompc-resistance");
            } else {
                videoboomId = document.getElementById("js-boommob-resistance");
            }
            
            let part3TimeId = null;
            
            var onTimeUpdate = ()=> {
                let timeDisplay = Math.floor(videoboomId.currentTime);
                if (timeDisplay === 2) {
                    progressBarPlus()
                }
                if (timeDisplay === 4) {
                    progressBarReduce();
                }
            }
    
            var progressBarPlus = () => {
                clearInterval(part3TimeId);
                let delta = 0;
                part3TimeId = setInterval(() => {
                    if (delta >= 10) {
                        clearInterval(part3TimeId);
                        return;
                    }
                    delta++;
                    $("#progressbar").progressbar({
                        value: 50 + delta
                    });
                    $('#progress-add').html(50 + delta)
                    if (!delta) {
                        $('#progress-add').html('')
                    }
                }, 150);
            }
            var progressBarReduce = () => {
                clearInterval(part3TimeId);
                let delta = 10;
                part3TimeId = setInterval(() => {
                    if (delta <= 0) {
                        clearInterval(part3TimeId);
                        return;
                    }
                    delta--;
                    $("#progressbar").progressbar({
                        value: 50 + delta
                    });
                    $('#progress-add').html(50 + delta)
                    if (!delta) {
                        $('#progress-add').html('')
                    }
                }, 150);
            }
            videoboomId.addEventListener("timeupdate", onTimeUpdate)
        }
    }

    const boomLightBelt = {
        lightbeltScence: null,
        totalSpace: 0,
        firstSpace: 1000,
        _domTotalH:  $('.fb-boomlightbelt-class'),
        _domScroolH: $('#fb-scroll-boomlightbelt'),
        _domInnerH: $('#fb-scroll-boomlightbelt-container'),
        isFirst: true,
        init: function () {
            this.totalSpace = this.firstSpace
            // this._domInnerH.css('height', iosMaxheight + 'px')
            this.event()
        },
        event: function () {
            let _this = this
            
            if(window.innerWidth > 768) {
                let height = window.innerHeight;
                let halfwh = window.innerHeight / 2
                let domMH = halfwh - 320 
                $('.fb-boom-space').css('margin-top', -domMH + 'px')

                this._domScroolH.css('height', (this.totalSpace + iosMaxheight) + 'px')
                this._domInnerH.css('height', (this.totalSpace + iosMaxheight) + 'px')
                this.lightbeltScence = new ScrollMagic.Scene({
                    duration: _this.firstSpace,
                    triggerElement: '.fb-boomlightbelt-section1',
                    triggerHook: "onLeave"
                }).setPin('.fb-boomlightbelt-section1').addTo(controller);
                this.lightbeltScence.on("update", function (evt) {
                    if (evt.scrollPos > evt.startPos && evt.scrollPos <= evt.endPos) {
                        $('.fb-boomlightbelt-video').css('border-radius', '30px')
                        let descOpacity = 1- (evt.scrollPos - evt.startPos) / 800;
                        $('.boomvideo-introduce-text').css('opacity', descOpacity)
                        let per = (evt.scrollPos - evt.startPos) / _this.firstSpace;
                        let deltaX = window.innerWidth - _this.firstSpace
                        let realW = window.innerWidth - deltaX * per
                        let deltaY = window.innerHeight - 640
                        let realH = window.innerHeight - deltaY * per;
                        $('.fb-boomlightbelt-video').css({ 'width': realW + 'px', 'height': realH + 'px' })
                        $('.boomvideo-introduce-text').css({ 'width': realW + 'px', 'height': realH + 'px' })
                    }
                    if (evt.scrollPos <= evt.startPos) {
                        // $('.boomvideo-introduce-text').css('opacity', 1)
                        $('.fb-boomlightbelt-video').css('border-radius', '0px')
                        $('.fb-boomlightbelt-video').css({ 'width': window.innerWidth + 'px', 'height': window.innerHeight + 'px' })
                        $('.boomvideo-introduce-text').css('opacity', 1)
                        $('.boomvideo-introduce-text').css({ 'width': window.innerWidth + 'px', 'height': window.innerHeight + 'px' })
                    }
                    if(evt.scrollPos > evt.endPos) {
                        $('.fb-boomlightbelt-video').css({ 'width': '1000px', 'height': '640px' })
                    }
                })
            } else {
                this._domScroolH.css('height', '100vh')
                this._domInnerH.css('height', '100vh')
            }
        }
    }

    const boomSpace = {
        POT_BOTTOM_Y: 585,
        POT_TEXT_Y: 300,
        POTS_TIMES: {
            duration: 0.5 + Math.random() * 0.3,
            delay: 0,
        },
        sourceObj: {},
        init: function () {
            this.loadImg()
        },
        loadImg: function () {
            if(window.innerWidth < 821) {
                this.POT_BOTTOM_Y = 200
            }
            this.event()
        },
        event: function () {
            let _this = this
            let dom = document.getElementById('boombikeSpaceObserve');
            const potsTimeline = [...document.querySelectorAll('.boom_space_logo')].map((pot, i) => {
                const timeline = new TimelineMax();
                timeline.from(
                  pot,
                  _this.POTS_TIMES.duration,
                  {
                    delay: _this.POTS_TIMES.delay,
                    y: -_this.POT_BOTTOM_Y,
                  }
                );
              
                return timeline;
            });

            const shadowsTimeline = [...document.querySelectorAll('.boom_space_cushion')].map((shadow, i) => {
                const timeline = new TimelineMax();
                timeline.from(
                  shadow,
                  _this.POTS_TIMES.duration,
                  {
                  //   ease: Power0.easeInOut,
                    delay: _this.POTS_TIMES.delay,
                  //   scale: 0,
                  //   transformOrigin: 'center center',
                    y: _this.POT_BOTTOM_Y,
                  }
                );
              
                return timeline;
            });
            const spacetextTimeline = [...document.querySelectorAll('.boom_space_left')].map((space, i) => {
                const timeline = new TimelineMax();
                timeline.from(
                    space,
                    _this.POTS_TIMES.duration,
                  {
                    delay: 0,
                    y: -200,
                    opacity: 0
                  }
                );
                return timeline;
            });
            // .add(spacetextTimeline, 0.8)
            let observe = new sectionCurrentView(dom, function() {
                $('.boom_space_logo').css('opacity', 1)
                $('.boom_space_cushion').css('opacity', 1)
                $('.boom_space_left').css('visibility', 'visible')
                const masterTimeline = new TimelineMax();
                masterTimeline
                .to('.boom_space_left', 0, { visibility: 'visible' })
                .to('.boom_space_shadow', 0, { opacity: 0 })
                .to('.boom_space_length', 0, { opacity: 0 })
                .to('.boom_space_left', 0, { opacity: 0 })
                .add(potsTimeline, 0)
                .add(shadowsTimeline, 0)
                .add(spacetextTimeline, 0.2)
                .to('.boom_space_shadow', 0.8, { opacity: 1 })
                .to('.boom_space_length', 0.9, { opacity: 1 })
                .to('.boom_space_left', 0.9, { opacity: 1 })

                if (!masterTimeline.isActive()) {
                    masterTimeline.restart();
                }
            })
          
        }
    }
    const preloadboomImg = {
        sourceMobile: {
            logo: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikespacemob.png?v=1666176744",
            shadow: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikeshowdmob.png?v=1666176744",
            cushion: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikecushionmob.png?v=1666176744",
            length: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikelengthmob.png?v=1666176743"
        },
        sourcePc: {
            logo: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikespace.png?v=1666145881",
            shadow: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikeshowd.png?v=1666145881",
            cushion: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikecushion.png?v=1666145881",
            length: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boombikelength.png?v=1666145881"
        },
        init: function () {
            if(window.innerWidth < 821) {
                this.sourceObj = Object.assign({}, this.sourceMobile)
                if (window.location.pathname === fb_boom_bike_yellow) { 
                    this.sourceObj.logo = "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boom_bike_yellow_dianzi_mob.png?v=1669952258"
                } else if(window.location.pathname === fb_boom_bike_grey) {
                    this.sourceObj.logo = "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boom_bike_grey_dianzi_mob.png?v=1669952257"
                }
            } else {
                this.sourceObj = Object.assign({}, this.sourcePc)
                if (window.location.pathname === fb_boom_bike_yellow) {
                    this.sourceObj.logo = "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boom_bike_yellow_dianzi_pc.png?v=1669952258"
                } else if(window.location.pathname === fb_boom_bike_grey) {
                    this.sourceObj.logo = "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/boom_bike_grey_dianzi_pc_dc777b0a-fd0a-4318-a13d-d9d612d96454.png?v=1669952258"
                }
            }
            $('.boom_space_logo img').attr('src', this.sourceObj.logo)
            $('.boom_space_shadow img').attr('src', this.sourceObj.shadow)
            $('.boom_space_cushion img').attr('src', this.sourceObj.cushion)
            $('.boom_space_length img').attr('src', this.sourceObj.length)
        }
    } 
    preloadboomImg.init()
    setTimeout(() => {
        $('.fb-boom-klarna').parent().css('padding-top', '0px')
        $('.js-boombike-delayshow').show()
        boomLightBelt.init()
        boomSpace.init()
        boomBikeFun.init()
        boomBikeChair.init()
        boomProgress.init() 
    }, 10000)
  
})
