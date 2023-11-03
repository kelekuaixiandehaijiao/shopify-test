// $(function () {
    const chairfun = {
        chairScene: null,
        chairOffset: 0,
        isOpen: true,
        dumbbellPlayer: null,
        buttPlayer1: null,
        isButt1: false,
        buttPlayer2: null,
        isButt2: false,
        isSvgaDumbbellLoaded: false,
        totalSpace: 0,
        firstSpace: 400,
        secondSpace: 700,
        thirdSpace: 1000,
        thumVideoId: document.getElementById("dumbbell-section-video"),
        isPress: false,
        but1Arr: [],
        but2Arr:[],
        clickUp: "Press <br/> to Stand",
        clickDown: 'Press <br/>to Sit',
        sourceMobile: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whitemdown.png?v=1659495905",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whitemup.png?v=1659495905",
            video: `${videoAssetUrl}videos/c/o/v/15637bba39c34e36bac5ecc559b20b9a.mp4`,
            // mob: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/mob.svga?v=1658918192",
            arrmob: [],
        },
        sourcePc: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/chairedownwhite.png?v=1658832615",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/chaireupwhite.png?v=1658832287",
            video: `${videoAssetUrl}videos/c/o/v/0f7f9b9fc6064bcebf3c14b46597d3fb.mp4`,
            // mob: 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pc.svga?v=1658918299',
            arrmob: [],
        },
        sourceMobileBeige: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigemdown.png?v=1659496027",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigemup.png?v=1659496028",
            video: `${videoAssetUrl}videos/c/o/v/51b594b36dc24e7ea5cf75b246bdd3d3.mp4`,
            // mob: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/mob_6c190a9e-c1b3-46a0-9ccc-2d4c46151595.svga?v=1658977840",
            arrmob: [],
        },
        sourcePcBeige: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigechairpcup.png?v=1659604974",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigechairpcudown.png?v=1659605032",
            video: `${videoAssetUrl}videos/c/o/v/b57f634d72da43c0ab8dcb0d3988b391.mp4`,
            // mob: 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pc_53652e9e-111e-469f-829a-b28e59b35492.svga?v=1658977981',
            arrmob: [],
        },
        sourceMobileBlack: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blacksitdownmob.png?v=1663148276",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blacksitupmob.png?v=1663148286",
            video: `${videoAssetUrl}videos/c/o/v/ab5457b1ae7b40a0812089c43134b3ea.mp4`,
            arrmob: []
        },
        sourcePcBlack: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blacksitdown.png?v=1663145743",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blacksitup.png?v=1663145782",
            video: `${videoAssetUrl}videos/c/o/v/6e651972f76746419dbab7a4c788f385.mp4`,
            arrmob: []
        },
        sourceMobilePink: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkmobchairup.png?v=1663209486",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkmobchairdown.png?v=1663209486",
            video: `${videoAssetUrl}videos/c/o/v/07b75ab0816b488db739ab1fd8fbcc93.mp4`,
            arrmob: []
        },
        sourcePcPink: {
            up: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkchairpcdown.png?v=1663151362",
            down: "https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkpcchairpcup.png?v=1663151385",
            video: `${videoAssetUrl}videos/c/o/v/9e615a347e404259ac4f94f680d848a0.mp4`,
            arrmob: []
        },
        sourceObj: {},
        timerBtn: null,
        boolObj: {
            zero: true,
            one: true,
            two: true,
            three: true,
            four: true
        },
        boolText: {
            one: true,
            two: true,
        },
        shichabool: true,
        init: function () {
            this.totalSpace = this.firstSpace + this.secondSpace + this.thirdSpace
            // let iosheight= $('.fixed-animation-ios').innerHeight()
            $('.fb-scroll-dumbbell-class').css('height', (this.totalSpace + iosMaxheight) + 'px')
            $('#fb-scroll-dumbbell').css('height', (this.totalSpace + iosMaxheight) + 'px')
            $('.fb-scroll-container').css('height', iosMaxheight + 'px')
            // this.resizeFun()
            this.event()
            this.renderImg() 
        },
        resizeFun: function () {
            let _this = this 
            new goAnimationResize().init((height) => {
    
                $('.fb-scroll-dumbbell-class').css('height', (_this.totalSpace + height) + 'px')
                $('#fb-scroll-dumbbell').css('height', (_this.totalSpace + height) + 'px')
                $('.fb-scroll-container').css('height', height + 'px')
            })
        },
        renderImg: function () {
            if (window.innerWidth <= 820) {
                if (window.location.pathname === '/pages/lit-bike-snowpeak-white') {
                    for(let i = 0; i<=59; i++) {
                        this.sourceMobile.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whitechairm${i <= 9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourceMobile, this.sourceObj)
                } else if(window.location.pathname === '/pages/lit-bike') {
                    // 黑车移动端落地页
                    for(let i = 0; i<=59; i++) {
                        this.sourceMobileBlack.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blackchairmob${i <= 9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourceMobileBlack, this.sourceObj)

                } else if(window.location.pathname === '/pages/lit-bike-klarna' || window.location.pathname === '/pages/jenselter-special-lit-bike-aurora-pink') { 
                    // 粉车移动端落地页
                    for(let i = 0; i<=59; i++) {
                        this.sourceMobilePink.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkchairmob${i <= 9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourceMobilePink, this.sourceObj)
                } else {
                    for(let i = 0; i<=59; i++) {
                        this.sourceMobileBeige.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigechairm${i <= 9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourceMobileBeige, this.sourceObj)
                }
            } else {
                this.clickUp = "Click <br/> to Stand"
                this.clickDown = 'Click <br/>to Sit'
                if (window.location.pathname === '/pages/lit-bike-snowpeak-white') {
                    for(let i = 0; i<=49; i++) {
                        this.sourcePc.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whitechairpc${i<=9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourcePc, this.sourceObj)
                } else if(window.location.pathname === '/pages/lit-bike') { 
                    // 黑车pc端落地页
                    for(let i = 0; i<=49; i++) {
                        this.sourcePcBlack.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blackchairpc${i<=9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourcePcBlack, this.sourceObj)
                } else if(window.location.pathname === '/pages/lit-bike-klarna' || window.location.pathname === '/pages/jenselter-special-lit-bike-aurora-pink') { 
                    // 粉车pc端落地页
                    for(let i = 0; i<=49; i++) {
                        this.sourcePcPink.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkchairpc${i<=9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourcePcPink, this.sourceObj)
                } else {
                    for(let i = 0; i<=49; i++) {
                        this.sourcePcBeige.arrmob.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigechairpc${i<=9? '0' + i : i}.webp`)
                    }
                    this.sourceObj = Object.assign(this.sourcePcBeige, this.sourceObj)
                }
            }
            $('#chairup').attr('src', this.sourceObj.up)
            $('#chairdown').attr('src', this.sourceObj.down)
            $('#dumbbell-section-video').attr('src', this.sourceObj.video)
            $('.js-chair-down').html(this.clickUp)
            for(let i= 24; i<=47; i++) {
                this.but1Arr.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/good_000${i}.png`)
            }
            for(let i= 55; i<=71; i++) {
                this.but2Arr.push(`https://cdn.shopify.com/s/files/1/0592/3766/2905/files/excellent_000${i}.png`)
            }
            this.loadDumbbell(this.sourceObj.arrmob)
            this.loadButt1()
            this.loadButt2()
        },
        playVideo: function(){
            let timer = null
            if(this.thumVideoId.paused){ 
                this.thumVideoId.play();
            }
        },
        mutedVideo: function () {
            // jinying
            this.thumVideoId.muted = true;
            $('#dumbbell-video-muted').find(".fac-open-video").css('display', 'none')
            $('#dumbbell-video-muted').find(".fac-close-video").css('display', 'block')
        },
        pausedVideo: function () {
            if(!this.thumVideoId.muted) {
                this.mutedVideo()
            }
            if(!this.thumVideoId.paused){
                this.thumVideoId.pause();  
            }
        },
        loadButt1: async function () {
            this.buttPlayer1 = new ImgToFrame('#chair-btn-svga-one', this.but1Arr);
            this.isButt1 = true;
        },
        loadButt2: function () {
            this.buttPlayer2 = new ImgToFrame('#chair-btn-svga-two', this.but2Arr);
            this.isButt2 = true;
        },
        loadDumbbell: function (mob) {
            this.dumbbellPlayer = new ImgToFrame('#dumbbell-section-svga', mob);
            this.isSvgaDumbbellLoaded = true;
        },
        clickCircle: function() {
            $(".js-chair-down").html(this.clickDown)
            this.isButt2 &&  this.buttPlayer2.play()
            this.isButt1 &&  this.buttPlayer1.stop()
            $('#chairup').css('opacity', 0)
            $('#chairdown').css('opacity', 1)
            $('#chair-btn-svga-one').css('opacity', 0)
            $('#chair-btn-svga-two').css('opacity', 1)
        },
        initialCircle: function () {
            this.isButt2 &&  this.buttPlayer2.stop()
            this.isButt1 &&  this.buttPlayer1.play()
            $(".js-chair-down").html(this.clickUp)
            $('#chairup').css('opacity', 1)
            $('#chairdown').css('opacity', 0)
            $('#chair-btn-svga-one').css('opacity', 1)
            $('#chair-btn-svga-two').css('opacity', 0) 
        },
        repeatBool: function (name) {
            let _this = this
            Object.keys(_this.boolObj).forEach((key)=> {
                if(key !== name) {
                    _this.boolObj[key] = true
                }
            })
        },
        event: function () {
            let _this = this
            let height = window.innerHeight;
            const postSidebar = document.querySelector(".fb-scroll-chair-space");
            let dumbbellId = document.getElementById('fb-scroll-dumbbell');
            this.chairScene = new ScrollMagic.Scene({
                duration: _this.totalSpace,
                triggerElement: dumbbellId, //触发元素
                triggerHook: "onLeave",
                offset: 1
            })
                .setPin('#fb-scroll-dumbbell')
                .addTo(controller);
            // _this.chairScene.on("enter", function (evt) { 
            //     // _this.resizeFun()
            //     _this.isneedResize = true
            //     _this.repeatResize()

            // })
            _this.chairScene.on("leave", function (evt) { 
                // _this.isneedResize = false 
                _this.pausedVideo()
            })
            _this.chairScene.on("update", function (evt) {
                let delta = evt.endPos - evt.scrollPos;
                let one = parseInt(evt.startPos + _this.firstSpace)
                let two = parseInt(evt.startPos + _this.firstSpace + _this.secondSpace)
                let three = parseInt(evt.startPos + _this.firstSpace + _this.secondSpace + _this.thirdSpace)
                // parallax
                // if (evt.scrollPos >= evt.startPos - 200 && evt.scrollPos < evt.startPos) {
                //     if(_this.shichabool) {
                //         let delta2 = evt.scrollPos + 400 - evt.startPos;
                //         translateEffByDelta('#chair-press-box', delta2, 400, -1, 100)
                //     }
                //     _this.shichabool = false
                // } else {
                //     _this.shichabool = true
                // }
                if(evt.scrollPos < evt.startPos - 260) {
                    if(_this.boolObj.zero) { 
                        _this.isButt1 &&  _this.buttPlayer1.stop()
                        _this.isButt2 &&  _this.buttPlayer2.stop()
                        _this.repeatBool('zero')
                    }
                    _this.boolObj.zero = false
                   
                } else if (evt.startPos - 260 <= evt.scrollPos && evt.scrollPos <= one) {
                    // parallax
                   if(_this.boolObj.one) {
                        // translateEffByDelta('#chair-press-box', 400, 400, -1, 100)
                        $('#chair-press-box').addClass('chair-show-opacity')
                        $('#dumbbell-video').removeClass('chair-show-opacity')
                        $('#dumbbell-section-svga').removeClass('chair-show-opacity')
                        _this.isButt1 &&  _this.buttPlayer1.play()
                        _this.isSvgaDumbbellLoaded && _this.dumbbellPlayer.stepToPercentage(0);
                        $('#dumbbell-video-muted').hide()
                        if(_this.isPress) {
                            _this.initialCircle()
                            _this.isPress = false
                        }
                        _this.repeatBool('one')
                    }
                    _this.boolObj.one = false
                    
                } else if (one < evt.scrollPos && evt.scrollPos <= two) {
                    let cur = evt.scrollPos - one;
                    _this.isSvgaDumbbellLoaded && _this.dumbbellPlayer.stepToPercentage(cur / (_this.secondSpace));
                    if(_this.boolObj.two) {
                        $('#chair-press-box').removeClass('chair-show-opacity')
                        $('#dumbbell-section-svga').addClass('chair-show-opacity')
                        $('#dumbbell-video').removeClass('chair-show-opacity')
                        _this.pausedVideo()
                        _this.isButt1 &&  _this.buttPlayer1.stop()
                        $('#dumbbell-video-muted').hide()
                        _this.isButt2 &&  _this.buttPlayer2.stop()
                        _this.repeatBool('two')
                    }
                    _this.boolObj.two = false
                } else if (two < evt.scrollPos && evt.scrollPos <= three) {
                    // three active
                    if(_this.boolObj.three) {
                        $('#chair-press-box').removeClass('chair-show-opacity')
                        $('#dumbbell-section-svga').removeClass('chair-show-opacity')
                        $('#dumbbell-video').addClass('chair-show-opacity')
                        _this.playVideo()
                        _this.isButt1 &&  _this.buttPlayer1.stop()
                        _this.isButt2 &&  _this.buttPlayer2.stop()
                        $('#dumbbell-video-muted').show()
                        _this.repeatBool('three')
                    }
                    _this.boolObj.three = false
                   
                } else {
                    if(_this.boolObj.four) {
                        _this.pausedVideo()
                        $('#dumbbell-video-muted').hide()
                        _this.repeatBool('four')
                    }
                    _this.boolObj.four = false                   
                }
                //  text position
                if(evt.scrollPos > evt.startPos - 400  &&  evt.scrollPos <= one + 200) {
                    if(_this.boolText.one) {
                        // $('#chair-text').show()
                        $('#dumbbell-text').css('opacity', 0)
                        _this.boolText.two = true
                    }
                    // $('#chair-text').show()
                    // $('#dumbbell-text').hide()
                    if (evt.scrollPos > (evt.startPos - 400) && evt.scrollPos <= one + 200) {
                        if(evt.scrollPos <= evt.startPos) {
                            let temp1 = evt.startPos - evt.scrollPos;
                            let real1 = temp1 / 400 * 30;
                            real1 = Math.floor(real1);
                            $('#chair-text').css("transform", `translateY(${real1}px)`)
                            $('#chair-text').css("opacity", `${(100 - temp1 / 350 * 100) / 100}`)
                        } else if(evt.startPos < evt.scrollPos < one + 200) {
                            let temp11 = (one + 200) - evt.scrollPos;
                            $('#chair-text').css("opacity", `${temp11/200}`)
                        } else {
                            $('#chair-text').css("opacity", `${0}`)
                        }
                    }
                    _this.boolText.one = false
                } else  if(evt.scrollPos > one + 200 && evt.scrollPos <= three)  {
                    if(_this.boolText.two) {
                        $('#chair-text').css("opacity", 0)
                        // $('#chair-text').hide()
                        // $('#dumbbell-text').show()
                        _this.boolText.one = true
                    }
                    if (evt.scrollPos > two - 400 && evt.scrollPos <= two) {
                        let temp2 = two - evt.scrollPos;
                        let real2 = temp2 / 400 * 30;
                        real2 = Math.floor(real2);
                        $('#dumbbell-text').css("transform", `translateY(${real2}px)`)
                        $('#dumbbell-text').css("opacity", `${(100 - temp2 / 350 * 100) / 100}`)
                    }
                    _this.boolText.two = false
                }
            })
            $(".js-chair-down").on("click", function (e) {
                e.preventDefault(); 
                // click up              
                if(!_this.isPress) {
                    _this.clickCircle()
                } else {
                    // click down
                    _this.initialCircle()
                }
                _this.isPress = !_this.isPress
                $('.chair-press-btn').css('transform', 'scale(0.8)')
                $('.chair-press-btn').css('opacity', '0.8')
                _this.timerBtn = setTimeout(() => {
                    clearTimeout(_this.timerBtn)
                    $('.chair-press-btn').css('transform', 'scale(1)')
                    $('.chair-press-btn').css('opacity', '1')
                }, 200)
            });
            $('#dumbbell-video-muted').click(function () {
                let sta = _this.thumVideoId.muted;
                if (sta == true) {
                    _this.thumVideoId.muted = false;
                    $('#dumbbell-video-muted').find(".fac-open-video").css('display', 'block')
                    $('#dumbbell-video-muted').find(".fac-close-video").css('display', 'none')
                } else {
                    _this.mutedVideo()
                }
            })
           
        }
    }
    // dandan author
    let scrollAIchipVideoTween;
    const AIfun = {
        AIplayNum1:0,
        AIplayNum2:0,
        init: function () {
            if (window.innerWidth < 769) {
                $('#fb-ai-chip').css('height', (1000 + window.innerHeight) + 'px')
                $('#fb-cover-img').css('height', (1000 + window.innerHeight) + 'px')
            } else {
                $('#fb-cover-img').css('height', (1100 + window.innerHeight) + 'px')
                $('#fb-ai-chip').css('height', (1100 + window.innerHeight) + 'px')
            }
            this.event()
        },
        createTween: function () {
            scrollAIchipVideoTween = new TimelineMax();
            scrollAIchipVideoTween.to("#videoContainer", 2, {
                scale: '0.38',
                y:130,
                ease: Linear.easeNone
            })
        },
        createTweenMb: function () {
            scrollAIchipVideoTween = new TimelineMax();
            scrollAIchipVideoTween.to("#videoContainer", 2, {
                scale: "0.35",
                y:125,
                ease: Linear.easeNone
            })
        },
        event: function () {
            let _this = this

            if (window.innerWidth < 769) {
                _this.createTweenMb();
            } else {
                _this.createTween();
            }
            this.step3Scene = new ScrollMagic.Scene({
                duration: 1000,
                triggerElement: '#fb-cover-img',
                triggerHook: "onLeave",
            })
                .setPin('#fb-cover-img')
                // .addIndicators()
                .setTween(scrollAIchipVideoTween)
                .addTo(controller);
            _this.step3Scene.on("update", function (evt) {
                // console.log('AIevt', evt.scrollPos,evt.endPos);
                if (evt.scrollPos >= evt.endPos ) {
                    if(_this.AIplayNum1 === 0) {
                        $('#AIvideo').trigger('play');
                        _this.AIplayNum2 = 0
                    }
                    _this.AIplayNum1 = 1
                } else {
                    if(_this.AIplayNum2 === 0) {
                        $('#AIvideo').trigger('pause');
                        _this.AIplayNum1 = 0
                    }
                    _this.AIplayNum2 = 1
                }
            })
        }
    }

    // AIfun.init()
    // chairfun.init()
// })ani
