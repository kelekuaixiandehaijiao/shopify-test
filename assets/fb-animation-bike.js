$('#txt-container0').css('opacity', 0)
$('#txt-container2').css('opacity', 0)
$('#txt-container1').css('opacity', 0)
$('#txt-container3').css('opacity', 0)

let controller = new ScrollMagic.Controller({refreshInterval:0});
$(function () {
    setTimeout(() => {
        $('.fb-annimation-bike').show()
        $('.fb-scroll-dumbbell-class').show()
        $('.AI_chip').show()
        $('.fb-software-introduction-container').show()
        $('.shopify-section--slideshow').show()
        let eff = new ScrollMagicEff();
        eff.setup();
        chairfun.init()
        AIfun.init()
        if (window.innerWidth < 769){
            software.init()
        }
    }, 10000)
   
})
class ScrollMagicEff {
    constructor() {
        let isSvga1Loaded = false;
        let isSvga2Loaded = false;
        let svgaPlayer1 = null;
        let svgaPlayer2 = null;
        let scrollSection1VideoTween = null;
        let part3TimeId = null;

        let totalFrame;
        let step1Frame = 700;
        let step2Frame = 1000;
        let step3Frame = 2200;
        let step3TurnFrame = 800;

        let step1Scene = null;
        let step2Scene = null;
        let tempTime = 0;

        let isStep2Playing = false;
        let boolObj = {
            one: true,
            two: true,
            three: true,
            four: true
        }
        let textOne = true
        let textTwo = true
        let textTwoMb = true
        let textOneMb = true

        let videoId = document.getElementById("scroll-section2-video");
        videoId.addEventListener('playing', ()=> {
            if(videoId.style.opacity === '1'){
                if($('#scroll-section2-video-muted')[0].style.display != 'block' && boolObj.four){
                    $('#scroll-section2-video-muted').show();
                }
            }
        });
        

        var repeatBool = function (name) {
            Object.keys(boolObj).forEach((key)=> {
                if(key !== name) {
                    boolObj[key] = true
                }
            })
        }

        let sourceMobile = {
            video1: videoAssetUrl + "videos/c/o/v/7a387fbc251c4635b6267ecdfb86299c.mp4",
            video2: videoAssetUrl + "videos/c/o/v/7b6ab24719f34af5afb4d0acddf72963.mp4",
            video3: videoAssetUrl + "videos/c/o/v/73b1b2d7a8284af78e0909df7c61f26f.mp4",
            imgAry1:[],
            imgAry2:[],
        }
        let sourcePc = {
            video1: videoAssetUrl + "videos/c/o/v/50f38e67d60f4bccaa39aebb0154a7e5.mp4",
            video2: videoAssetUrl + "videos/c/o/v/7e767719a4394ccc82dfa24dba2f8e9a.mp4",
            video3: videoAssetUrl + "videos/c/o/v/920faceb382745aabd4c5b1bc3d3ac82.mp4",
            imgAry1:[],
            imgAry2:[],
        }
        let sourceMobileBeige = {
            video1: videoAssetUrl + "videos/c/o/v/646c079aacc249309d1b3f3a28b16b40.mp4",
            video2: videoAssetUrl + "videos/c/o/v/7c1485bc54af4d8ab559f1cf20fca686.mp4",
            video3: videoAssetUrl + "videos/c/o/v/0d19dad5b81e43818ba9f7d1f605b123.mp4",
            imgAry1:[],
            imgAry2:[],
        }
        let sourcekMobileBlack = {
            video1: videoAssetUrl + "videos/c/o/v/e0d2e83e144c4974827c033c6eed3f61.mp4",
            video2: videoAssetUrl + "videos/c/o/v/c383a7aadcc04bc1b92daf0b44b94efb.mp4",
            video3: videoAssetUrl + "videos/c/o/v/996a28a47c274fa99328a52a7269119e.mp4",
            imgAry1:[],
            imgAry2:[]
        }
        let sourcePcBlack = {
            video1: videoAssetUrl + "videos/c/o/v/1f7919782eb54d63aa79ba9b6a25c7a7.mp4",
            video2: videoAssetUrl + "videos/c/o/v/a0dc44f9d8a84eeb8fb40e5b3f52effd.mp4",
            video3: videoAssetUrl + "videos/c/o/v/4119e7e684fe413c829f1e2b7ca991e6.mp4",
            imgAry1:[],
            imgAry2:[]
        }
        let sourceMobilePink = {
            video1: videoAssetUrl + "videos/c/o/v/09fe96320f07426489a6f415d807c0fc.mp4",
            video2: videoAssetUrl + "videos/c/o/v/58330a5cd8e744e186ca67a715d3b40b.mp4",
            video3: videoAssetUrl + "videos/c/o/v/7574dfdf691b47bc9d5f94122bbf5e3f.mp4",
            imgAry1:[],
            imgAry2:[]
        }
        let sourcePcPink = {
            video1: videoAssetUrl + "videos/c/o/v/5d219f067aca40c5a77f309449791d22.mp4",
            video2: videoAssetUrl + "videos/c/o/v/d30b924265c74fb8b99973410e0a7341.mp4",
            video3: videoAssetUrl + "videos/c/o/v/a1590db5dc7843debcb2ce552773b0f4.mp4",
            imgAry1:[],
            imgAry2:[]
        }
        let sourcePcBeige = {
            video1: videoAssetUrl + "videos/c/o/v/c5573b6a3017474e87f8b878fc3c6f06.mp4",
            video2: videoAssetUrl + "videos/c/o/v/d22ec9783a764d5ab9e20340c08df5e0.mp4",
            video3: videoAssetUrl + "videos/c/o/v/61c8bb68d908461f81f5c613e785d284.mp4",
            imgAry1:[],
            imgAry2:[],
        }
        let sourceObj = {}

        this.setup = () => {
            totalFrame = step1Frame + step2Frame + step3Frame;

            $('#scroll-magic-container').css('height', (totalFrame + iosMaxheight + 540) + 'px');
            $('#scroll-section2').css('height', (totalFrame + iosMaxheight) + 'px');
            $('.section2-container').css('height',  iosMaxheight + 'px');
            createTween();
            createScene();
            calcResurce();
            initView();
            loadSVGA1();
            loadSVGA2();
        }

        var isPc = () => {
            return window.innerWidth > 768;
        }

        var calcResurce = () => {
            if (window.innerWidth <= 768) {
                if (window.location.pathname === '/pages/lit-bike-snowpeak-white') {
                    sourceObj = Object.assign(sourceMobile, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whitemob' + (100 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whitemob' + (1000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }
                } else if (window.location.pathname === '/pages/lit-bike') { 
                    // 黑车落地页
                    sourceObj = Object.assign(sourcekMobileBlack, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blackmob' + (1000000 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blackmob'+ (1000000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }
                } else if (window.location.pathname === '/pages/lit-bike-klarna' || window.location.pathname === '/pages/jenselter-special-lit-bike-aurora-pink') { 
                    // 粉车落地页
                    sourceObj = Object.assign(sourceMobilePink, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkmob' + (1000000 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    for (let index2 = 333; index2 < 362; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkmob'+ (1000000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }
                } else {
                    sourceObj = Object.assign(sourceMobileBeige, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigemob' + (100 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigemob' + (index2).toString() + '.webp';
                        sourceObj.imgAry2.push(url);
                    }

                }
            } else {
                if (window.location.pathname === '/pages/lit-bike-snowpeak-white') {
                    sourceObj = Object.assign(sourcePc, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whiteweb' + (1000000 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/whiteweb' + (1000000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }

                } else if (window.location.pathname === '/pages/lit-bike') {
                    // 黑车落地页
                    sourceObj = Object.assign(sourcePcBlack, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blackweb' + (1000000 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/blackweb' + (1000000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }

                } else if (window.location.pathname === '/pages/lit-bike-klarna' || window.location.pathname === '/pages/jenselter-special-lit-bike-aurora-pink') {
                    // 粉车落地页
                    sourceObj = Object.assign(sourcePcPink, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkweb' + (1000000 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/pinkweb' + (1000000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }
                } else {
                    sourceObj = Object.assign(sourcePcBeige, sourceObj)
                    for (let index = 0; index < 34; index++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigeweb' + (1000000 + index).toString().substring(1) + '.webp';
                        sourceObj.imgAry1.push(url);
                    }
                    for (let index2 = 334; index2 < 363; index2++) {
                        let url = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/beigeweb' + (1000000 + index2).toString().substring(1) + '.webp';
                        sourceObj.imgAry2.push(url);
                    }
                }
            }
        }
        
        var createScene = () => {
            if (isPc()) {
                $('#scroll-section1-web-container').show();
                $('#scroll-magic-container').css('height', (totalFrame + window.innerHeight + window.innerHeight + 1000) + 'px');
                $('#scroll-section1-web-container').css('height', (1000 + window.innerHeight) + 'px');
                $('#scroll-section1').hide();
                step1Scene = new ScrollMagic.Scene({
                    duration: 1000,
                    triggerElement: '#scroll-section1-web',
                    triggerHook: "onLeave",
                })
                    .setPin('#scroll-section1-web')
                    .addTo(controller);



                step1Scene.on("update", function (evt) {
                    if (evt.scrollPos > evt.startPos && evt.scrollPos <= evt.endPos) {
                        let descOpacity = (evt.scrollPos - evt.startPos) / 800;
                        $('#scroll-section1-desc-web').css('opacity', descOpacity)
                        let per = (evt.scrollPos - evt.startPos) / 1000;
                        let realW = window.innerWidth - per * window.innerWidth / 2.3;
                        let realH = window.innerHeight - per * window.innerHeight / 2.3;

                        $('#scroll-section1-video-container-web').css({ 'width': realW + 'px', 'height': realH + 'px' })
                    }
                    if (evt.scrollPos <= evt.startPos) {
                        $('#scroll-section1-desc-web').css('opacity', 0)
                        $('#scroll-section1-video-container-web').css({ 'width': window.innerWidth + 'px', 'height': window.innerHeight + 'px' })
                    }
                })
            }
            else {
                $('#scroll-section1-web').hide();
                $('#scroll-section1').show();
                step1Scene = new ScrollMagic.Scene({
                    duration: 1000,
                    triggerElement: '#scroll-section1',
                    triggerHook: "onLeave",
                    offset:-100,
                })
                    .setTween(scrollSection1VideoTween)
                    .addTo(controller);
            }


            step2Scene = new ScrollMagic.Scene({
                duration: totalFrame,
                triggerElement: '#scroll-section2',
                triggerHook: "onLeave",
            })
                .setPin('#scroll-section2')
                .addTo(controller);
            addSceneEvent();
        }

        var addSceneEvent = () => {
            step2Scene.on("update", function (evt) {
                // if (evt.scrollPos >= evt.startPos - 400 && evt.scrollPos < evt.startPos) {
                //     let delta = evt.scrollPos + 400 - evt.startPos;
                //     translateEffByDelta('#scroll-section1-svga', delta, 400, -1,60)
                // }

                if (evt.scrollPos > evt.startPos && evt.scrollPos < evt.startPos + step1Frame) {
                    translateEffByDelta('#scroll-section1-svga', 400, 400, -1)
                    let cur = evt.scrollPos - evt.startPos;
                    let total = step1Frame;
                    isSvga1Loaded && svgaPlayer1.stepToPercentage(cur / total);


                    if(boolObj.one) {
                        $('#scroll-section2-video').css('opacity', 0)
                        $('#scroll-section1-svga2').css('opacity', 0)
                        $('#scroll-section2-video-muted').hide()
                        $('#txt-container2').css('opacity', 0)
                        pauseVideo();

                        repeatBool('one')
                    }
                    boolObj.one = false
                    
                } else if(evt.scrollPos <= evt.startPos) {
                    isSvga1Loaded && svgaPlayer1.stepToPercentage(0);
                }


                let delta = evt.endPos - evt.scrollPos;
                delta = Math.ceil(delta);
  
                if (delta <= (step2Frame + step3Frame) && delta > step3Frame) {
                    $('#txt-container2').css('opacity', 0)
                    if(boolObj.two) {
                        $('#scroll-section2-video').css('opacity', 1)
                        $("#scroll-section2-video").attr("src", sourceObj.video2);
                        playVideo();
                        repeatBool('two')
                    }
                    boolObj.two = false
                }
                else if (delta <= step3Frame) {

                    if (delta > step3Frame - step3TurnFrame ) {
                        if(step3Frame - delta < step3TurnFrame/2){

                            let temp = delta - (step3Frame - step3TurnFrame);
                            let real = temp / step3TurnFrame * 30;
                            real = Math.floor(real);

                            let alpha = step3Frame - delta;
                            $('#txt-container2').css("transform", `translateY(${real}px)`)
                            $('#txt-container2').css("opacity", `${alpha*2 / step3TurnFrame}`)
                        }
                        else{
                            let alpha = step3TurnFrame - (step3Frame - delta);
                            $('#txt-container2').css("opacity", `${alpha / step3TurnFrame}`)
                        }

                        let cur = (evt.scrollPos - evt.endPos + step3Frame) / step3TurnFrame * 100;
                        cur = Math.ceil(cur);
                        isSvga2Loaded && svgaPlayer2.stepToPercentage(cur / 100);

                        if(boolObj.three) {
                            $('#txt-container1').css('opacity', 0)
                            $('#txt-container5').css('opacity', 0)
                            
                            $('#scroll-section1-svga2').css('opacity', 1)
                            $('#scroll-section2-video').css('opacity', 0)
                            pauseVideo();

                            repeatBool('three')
                        }
                        boolObj.three = false
                    }


                    if (delta <= (step3Frame - step3TurnFrame) && evt.scrollPos < evt.endPos) {
                        if(delta < step3Frame  - step3TurnFrame - 200){
                            if(boolObj.four) {
                                $('#txt-container1').css('opacity', 0)
                                $('#txt-container5').css('opacity', 0)
                                $('#txt-container2').css('opacity', 0)
                                $('#txt-container3').css('opacity', 0)
                                $('#txt-container2').css("transform", `translateY(0px)`);
                                $('#scroll-section2-video').css('opacity', 1)
                                $("#scroll-section2-video").attr("src", sourceObj.video3);
                                
                                videoId.muted = true;
                                playVideo();
                                isStep2Playing = true;
                                progressBarUpdate();
                                var video = document.getElementById('scroll-section2-video')
                                video.currentTime = 0;
                                tempTime = 0;
                                video.addEventListener(
                                    "timeupdate", onTimeUpdate)
    
                                repeatBool('four')
                            }
                            boolObj.four = false;
                        }
                    }
                    else {
                        resetPart3();
                    }
                }

                if(isPc()){
                    scene2TxtFrameUpdatePC(evt);
                }
                else{
                    scene2TxtFrameUpdate(evt);
                }
            });

            step2Scene.on('leave', () => {
                pauseVideo();
            })
        }

        var onTimeUpdate = ()=> {
            let timeDisplay = Math.floor(videoId.currentTime);
            if (isStep2Playing) {
                if (timeDisplay === 2) {
                    if (tempTime === 2) return;
                    tempTime = 2;
                    progressBarPlus()
                }
                if (timeDisplay === 4) {
                    if (tempTime === 4) return;
                    tempTime = 4;
                    progressBarReduce();
                }
            }
        }

        var scene2TxtFrameUpdate = evt=> {
            if(evt.scrollPos > evt.startPos - 400 && evt.scrollPos < evt.startPos){
                $('#txt-container1').css('opacity', 0)
                let temp = evt.startPos - evt.scrollPos;
                let real = temp / 400 * 30;
                real = Math.floor(real);
                $('#txt-container0').css("transform", `translateY(${real}px)`)
                $('#txt-container0').css("opacity", `${(100 - temp / 400 * 100) / 100}`)
                textTwoMb = true
                textOneMb = true
            }
            else if(evt.scrollPos > evt.startPos && evt.scrollPos < evt.endPos){
                let delta = evt.scrollPos - evt.startPos;

                if(delta > 0 && delta < 400){
                    
                    // $('#txt-container0').css('opacity', 1)
                    // $('#txt-container1').css('opacity', 0)
                    if(textTwoMb) {
                        $('#txt-container0').animate({ opacity: 1 }, 200)
                        $('#txt-container1').animate({ opacity: 0 }, 300)
                        textTwoMb = false
                    }
                    if(delta > 100){
                        let temp = 300 - (delta - 100);
                        let realScale = temp / 300;
                        if(realScale < 0.9){
                            realScale = 0.9;
                        }
                        $('#txt-container0').css("transform", `scale(${realScale})`)
                    }
                }

                if(delta > 500 && delta < 1600){
                    let temp1 = 1100 - (delta - 500);
                    let real1 = temp1 / 1100 * 30;
                    real1 = Math.floor(real1);
                    if(textOneMb) {
                        // $('#txt-container0').animate({ opacity: 1 }, 200)
                        $('#txt-container0').animate({ opacity: 0 }, 200)
                        textOneMb = false
                    }
                    // $('#txt-container0').css('opacity', 0)
                    $('#txt-container1').css("transform", `translateY(${real1}px)`)
                    $('#txt-container1').css("opacity", `${(100 - temp1 / 1100 * 100) / 100}`)
                    $('#txt-container2').css('opacity', 0)
                }
            } else {
                textTwoMb = true
                textOneMb = true
            }

        }

        var scene2TxtFrameUpdatePC = evt=> {
            if(evt.scrollPos > evt.startPos - 400 && evt.scrollPos < evt.startPos){
                $('#txt-container5').css('opacity', 0)
                let temp = evt.startPos - evt.scrollPos;
                let real = temp / 400 * 30;
                real = Math.floor(real);
                $('#txt-container0').css("transform", `translateY(${real}px)`)
                $('#txt-container0').css("opacity", `${(100 - temp / 400 * 100) / 100}`)
            }
            else if(evt.scrollPos > evt.startPos && evt.scrollPos < evt.endPos){
                let delta = evt.scrollPos - evt.startPos;

                if(delta > 0 && delta < 400){
                    if(textTwo) {
                        $('#txt-container0').animate({ opacity: 1 }, 200)
                        $('#txt-container5').animate({ opacity: 0 }, 300)
                        textTwo = false
                    }
                    if(delta > 100){
                        let temp = 300 - (delta - 100);
                        let realScale = temp / 300;
                        if(realScale < 0.8){
                            realScale = 0.8;
                        }
                        $('#txt-container0').css("transform", `scale(${realScale})`)
                    }
                } else {
                    textTwo = true
                }

                if(delta > 500 && delta < 1600){
                    if(delta > 500 && delta < 900){

                        let temp1 = 900 - delta;
                        let real1 = temp1 / 900 * 30;
                        real1 = Math.floor(real1);
                        if(textOne) {
                            $('#txt-container0').animate({ opacity: 0 }, 200)
                            $('#txt-container5').animate({ opacity: 1 }, 300);
                            textOne = false
                        }
                      
                        $('#txt-container2').css('opacity', 0);
                       
    
                        $('#scroll-title-1').css('opacity', 0);
                        $('#scroll-desc-1').css('opacity', 0);
    
                        $('#scroll-title-1').css("transform", `translateY(${real1}px)`)
                        $('#scroll-title-1').css("opacity", `${(100 - temp1 / 900 * 100) / 100}`)
                    }

                    else if(delta > 900 && delta < 1600){
                        let temp2 = 1500 - delta;
                        let real2 = temp2 / 1000 * 40;
                        let alpha1 = (900 - (1500 - delta))/1000 - 0.2;
                        let alpha2 =  (900 - (delta - 900))/1000;

                        let scaleXY = alpha2;
                        if(scaleXY < 0.7){
                            scaleXY = 0.7
                        }

                        if(alpha2 < 0.3){
                            alpha2 = 0.3;
                        }
                        $('#txt-container5').css('opacity', 1);
                        $('#scroll-desc-1').css("transform", `translateY(${real2}px)`)
                        $('#scroll-desc-1').css("opacity", `${alpha1}`)
                        $('#scroll-title-1').css("opacity", `${alpha2}`)
                        $('#scroll-title-1').css("transform", `scale(${scaleXY})`)
                    }
                    
                } else {
                    textOne = true
                }

                let step3Start = evt.startPos + step1Frame + step2Frame + step3TurnFrame; 
                if (evt.scrollPos >= step3Start && evt.scrollPos < evt.endPos) {
                    $('#txt-container3').css('opacity', 0);
                    if(evt.scrollPos > step3Start + 200 && evt.scrollPos < step3Start + 400){
                        $('#scroll-desc-3').css("opacity", '0')
                        $('#scroll-title-3').css("opacity", '1')
                        $('#txt-container2').css('opacity', 0);
                        $('#txt-container4').css('opacity', 1);
                        $('#scroll-title-3').css("transform", `scale(1)`)

                        let xDelta = evt.scrollPos - step3Start - 200;
                        let real2 = (200 - xDelta) / 200 * 40;
                        let alpha1 = xDelta/200;

                        $('#scroll-title-3').css("transform", `translateY(${real2}px)`)
                        $('#scroll-title-3').css("opacity", `${alpha1}`)
                    }
                    let total = step3Frame - step3TurnFrame;

                    let delta2 = evt.endPos - evt.scrollPos;
                    if(evt.scrollPos > step3Start + 400 && evt.scrollPos < evt.endPos - 400){
                        let real2 = delta2/total * 40;
                        let alpha1 = (total - delta2)/total - 0.2;
                        let alpha2 =  delta2/(total - 400);

                        let scaleXY = alpha2;
                        if(scaleXY < 0.7){
                            scaleXY = 0.7
                        }

                        if(alpha2 < 0.3){
                            alpha2 = 0.3;
                        }
                        $('#txt-container4').css('opacity', 1);
                        $('#scroll-desc-3').css("transform", `translateY(${real2}px)`)
                        $('#scroll-desc-3').css("opacity", `${alpha1}`)
                        $('#scroll-title-3').css("opacity", `${alpha2}`)
                        $('#scroll-title-3').css("transform", `scale(${scaleXY})`)
                    }

                    else if(evt.scrollPos > evt.endPos - 400 && evt.scrollPos < evt.endPos){
                        $('#scroll-desc-3').css("opacity", '1')
                        $('#scroll-title-3').css("opacity", '0.3')
                    }

                }
            }

        }

        var pauseVideo = () => {
            if(!videoId.muted) {
                mutedVideo()
            }
            if (!videoId.paused) {
                videoId.pause();
            }
        }

        var playVideo = () => {
            if (videoId.paused) {
                videoId.play();
            }
        }

        var createTween = () => {
            scrollSection1VideoTween = new TimelineMax();
            scrollSection1VideoTween.to("#scroll-section1-video", 2, {
                y: "400",
                ease: Linear.easeNone
            });
        }
        var loadSVGA1 = () => {
            if(!svgaPlayer1){
                svgaPlayer1 = new ImgToFrame('#scroll-section1-svga',sourceObj.imgAry1);
                isSvga1Loaded = true;
            }
        }
        var loadSVGA2 = () => {
            if(!svgaPlayer2){
                svgaPlayer2 = new ImgToFrame('#scroll-section1-svga2',sourceObj.imgAry2);
                isSvga2Loaded = true;
            }
        }

        var resetPart3 = () => {
            if($('#scroll-section2-video-muted')[0].style.display != 'none'){
                $('#scroll-section2-video-muted').hide()
            }

            if(!isStep2Playing)return;
            clearInterval(part3TimeId);
            $('#txt-container3').css('opacity', 0)
            $('#scroll-title-3').css("opacity", 0)
            $('#scroll-desc-3').css("opacity", 0)
            if($('#progressbar-container')[0].style.display != 'none'){
                $('#progressbar-container').hide();
            }
            $("#progressbar").progressbar({
                value: 50
            });

            $('#progress-add').html('')
            isStep2Playing = false;
            boolObj.four = true;
        }

        var initView = () => {
            $('#progress-add').html('');
            $('#txt-container0').css('opacity', 0)
            $('#txt-container2').css('opacity', 0)
            $('#txt-container1').css('opacity', 0)
            $('#txt-container3').css('opacity', 0)
            $('#scroll-section1-svga2').css('opacity', 0)
            $('#progressbar-container').hide();

            $('#scroll-section2-video').css('opacity', 0)

            let videoWeb = $('#scroll-section1-video-web')[0];
            let video = $('#scroll-section1-video')[0];
            video.src = sourceObj.video1;
            videoWeb.src = sourceObj.video1;
            try {
                video.play()
                videoWeb.play()
            } catch (error) {

            }

            $("#progressbar").progressbar({
                value: 50
            });

            $('#scroll-section2-video-muted').click(function () {
                let sta = videoId.muted;
                if (sta == true) {
                    videoId.muted = false;
                    $(this).find(".fac-open-video").css('display', 'block')
                    $(this).find(".fac-close-video").css('display', 'none')
                } else {
                    mutedVideo();
                }
            })
        }

        var progressBarUpdate = () => {
            $('#txt-container2').css('opacity', 0)
            $('#txt-container3').css('opacity', 0)

            $('#txt-container3').css('opacity', 1)
            if($('#progressbar-container')[0].style.display === 'none'){
                $('#progressbar-container').show();
            }

        }

        var mutedVideo = ()=> {
            // jinying
            videoId.muted = true;
            $('#scroll-section2-video-muted').find(".fac-open-video").css('display', 'none')
            $('#scroll-section2-video-muted').find(".fac-close-video").css('display', 'block')
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

    }
}