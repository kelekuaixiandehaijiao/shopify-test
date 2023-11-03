let featureClassHeight = 0;
let allHeaderHeightDom = 0;
let headerNoFeatureHeight = 0;
let featureSectionPageLocation = 0;

let isMobile = window.screen.width < 768;

let classFeaturesAnchor = 0;
let classTypesAnchor = 0;
let motivationAnchor = 0;
let priceAnchor = 0;

// 常规默认状态
const featureScrollStatusNormal = 0;
// 已经在吸顶状态
const featureScrollStatusTopShow = 1;
// 取消了吸顶状态
const featureScrollStatusTopHide = 2;

// 使用featureScrollStatusNormal状态
let featureScrollStatus = 0;

$(function () {
    do {
        headerNoFeatureHeight = $('#shopify-section-announcement').height() + $('#section-header').height();
        if (isMobile) {
            featureClassHeight = $('.fb-features-main-mob').height();
            
            break;
        }
        
        featureClassHeight = $('.fb-features-main').height();
        
    } while (null);

    featureSectionPageLocation = $('.fb-class-banner').height() + headerNoFeatureHeight
    console.log('featureSectionPageLocation:', featureSectionPageLocation)
    allHeaderHeightDom = headerNoFeatureHeight + featureClassHeight;
    classGetDomLocation();
});

// PC
$('.features-left-item').click(function () {
    $(this).addClass('item-showtext');
    $(this).siblings().removeClass('item-showtext');
    let getContentLocation = $(this).attr('data-slidecontent');
    if (getContentLocation == 0) {
        $('html,body').scrollTop(Math.trunc($('.fb-class-exercise-type').offset().top - allHeaderHeightDom + featureClassHeight));
    } else if (getContentLocation == 1) {
        $('html,body').scrollTop(Math.trunc($('.fb-class-extended').offset().top - allHeaderHeightDom));
    } else if (getContentLocation == 2) {
        $('html,body').scrollTop(Math.trunc($('.fb-class-freebeat').offset().top - allHeaderHeightDom));
    } else if (getContentLocation == 3) {
        $('html,body').scrollTop(Math.trunc($('.fb-savings-calculator').offset().top - allHeaderHeightDom));
    } else {
        console.log('没有模块了');
    }
});
$('.features-left').click(function () {
    // $('.features-wrapper').toggle();
    if ($('.features-wrapper').css('display') == 'none') {
        $('.feature-left-image').removeClass('open');
        $('.features-wrapper').css('display','flex');
    } else {
        $('.feature-left-image').addClass('open');
        $('.features-wrapper').css('display','none');
    }
});
$('.wrapper-item-click').click(function () {
    let headerStickyTopMob = Number($('.headerPadding').height()) + Number($('.AnnouncementBar').height());
    $('.left-text').text($(this).attr('data-text'));
    $('.features-wrapper').css('display', 'none');
    $('.feature-left-image').removeClass('open');
});
$('.wrapper-item-click').click(function () {

    let currentClassHeightDom = $('.fb-features-main-mob').height()
    console.log(featureClassHeight,'featureClassHeight----featureClassHeight')
    console.log(currentClassHeightDom,'currentClassHeightDom---currentClassHeightDom---currentClassHeightDom')
    let currentSelectIndex = $(this).attr('data-index');
    if (currentSelectIndex == 0) {
        $('html,body').scrollTop(Math.trunc($('.fb-class-exercise-type').offset().top - allHeaderHeightDom + 54));
        // $('html,body').scrollTop(Math.trunc($('.fb-class-exercise-type').offset().top - allHeaderHeightDom + 54));
    } else if (currentSelectIndex == 1) {
        $('html,body').scrollTop(Math.trunc($('.fb-class-extended').offset().top - allHeaderHeightDom - currentClassHeightDom));
    } else if (currentSelectIndex == 2) {
        $('html,body').scrollTop(Math.trunc($('.fb-class-freebeat').offset().top - allHeaderHeightDom - currentClassHeightDom));
    } else if (currentSelectIndex == 3) {
        $('html,body').scrollTop(Math.trunc($('.fb-savings-calculator').offset().top - allHeaderHeightDom - 54));
    } else {
        console.log('没有模块了');
    }
});

window.addEventListener('scroll', () => {
    let topValue = document.documentElement.scrollTop;
    classRangeLocationName(topValue);

    // 滚动到大于feature导航栏所在位置时
    // 执行吸顶操作
    if (topValue > featureSectionPageLocation - headerNoFeatureHeight) {
        if (featureScrollStatus == featureScrollStatusTopShow) {
            return;
        }
        if (isMobile) {
            $('.fb-features-main-mob').addClass('fb-features-top-mob');
            $('.fb-features-top-mob').css('top', headerNoFeatureHeight);
            $('.exercise-type-title').css('marginTop', '114px');
        } else {
            $('.fb-features-main').addClass('fb-features-top')
            $('.fb-features-top').css('top',headerNoFeatureHeight)
            $('.exercise-type-title').css('marginTop', 100 + featureClassHeight + "px");
        }

        featureScrollStatus = featureScrollStatusTopShow;
    } else if (topValue <= featureSectionPageLocation - headerNoFeatureHeight + 1) {
        // 滚动到正好在feature导航栏前1个像素时执行取消吸顶操作
        if (featureScrollStatus == featureScrollStatusTopHide) {
            return;
        }
        if (isMobile) {
            $('.fb-features-main-mob').removeClass('fb-features-top-mob');
            $('.exercise-type-title').css('marginTop', '60px');
        } else {
            $('.fb-features-main').removeClass('fb-features-top')
            $('.exercise-type-title').css('marginTop', '100px');
        }
        
        featureScrollStatus = featureScrollStatusTopHide;
    } else {
        featureScrollStatus = featureScrollStatusNormal;
    }
});

function classGetDomLocation() {
    let featuresTypesDom = $('.fb-class-exercise-type').offset();
    let classTypesDom = $('.fb-class-extended').offset();
    let motivationDom = $('.fb-class-freebeat').offset();
    let priceDom = $('.fb-savings-calculator').offset();
    console.log(featuresTypesDom,'featuresTypesDom---featuresTypesDom---featuresTypesDom')
    if (featuresTypesDom){
        console.log(isMobile,'isMobile---isMobile')
        if(isMobile){
            classFeaturesAnchor = Math.trunc(featuresTypesDom.top - allHeaderHeightDom - 75);
        }else{
            classFeaturesAnchor = Math.trunc(featuresTypesDom.top - allHeaderHeightDom);
        }
    }
    if (classTypesDom){
        if(isMobile){
            classTypesAnchor = Math.trunc(classTypesDom.top - allHeaderHeightDom - 75);
          }else{
            classTypesAnchor = Math.trunc(classTypesDom.top - allHeaderHeightDom);
          }
    } 
    if (motivationDom){
        if(isMobile){
            motivationAnchor = Math.trunc(motivationDom.top - allHeaderHeightDom - 75);
          }else{
            motivationAnchor = Math.trunc(motivationDom.top - allHeaderHeightDom);
          }
    } 
    if (priceDom){
      if(isMobile){
        priceAnchor = Math.trunc(priceDom.top - allHeaderHeightDom - 75);
        // priceAnchor = Math.trunc(priceDom.top - allHeaderHeightDom - 75);
        // priceAnchor = Math.trunc(priceDom.top - allHeaderHeightDom - 34);
      }else{
        priceAnchor = Math.trunc(priceDom.top - allHeaderHeightDom);
      }
    } 
}

function classSetActiveStyle(activeIndex) {
    if (activeIndex === undefined) {
    }
    for (let index = 0; index < $('.features-left-item').length; index++) {
        let dom = $('.features-left-item')[index];
        if (activeIndex === undefined) {
            $(dom).removeClass('item-showtext');
        } else {
            if (activeIndex === index) {
                $(dom).addClass('item-showtext');
            } else {
                $(dom).removeClass('item-showtext');
            }
        }
    }
}

function classRangeLocationName(topValue) {
    // console.log('scroll', 'classFeaturesAnchor:' + classFeaturesAnchor + '  classTypesAnchor:' + classTypesAnchor + '  motivationAnchor:' + motivationAnchor + '  priceAnchor:' + priceAnchor + '  topValue:' + topValue);
    if (topValue >= classFeaturesAnchor || topValue < classFeaturesAnchor) {
        if (isMobile) $('.left-text').text('Features');
        classSetActiveStyle(0);
    }
    if (Math.ceil(topValue) >= classTypesAnchor) {
        if (isMobile) $('.left-text').text('Class Types');
        classSetActiveStyle(1);
    }
    if (Math.ceil(topValue) >= motivationAnchor) {
        if (isMobile) $('.left-text').text('Motivation Activites');
        classSetActiveStyle(2);
    }
    
    if (Math.ceil(topValue) >= priceAnchor) {
        console.log(topValue,'topValue---priceAnchor',priceAnchor)
        if (isMobile) $('.left-text').text('Price');
        classSetActiveStyle(3);
    }
}
