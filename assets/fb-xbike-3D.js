// 黑车3D模型介绍点
let  fb_xbike3Dnew_introduce_point_otherClick = null;
let xbike3Dnew_introduce_point_addListen = false;
document.addEventListener("click", function () {
    if(fb_xbike3Dnew_introduce_point_otherClick){
        let xbike3Dnew_img_introduce_point = document.getElementById(`xbike3Dnew_img_introduce_${fb_xbike3Dnew_introduce_point_otherClick}_point`);
        let xbike3Dnew_img_introduce_icon = document.getElementById(`xbike3Dnew_img_introduce_${fb_xbike3Dnew_introduce_point_otherClick}_icon`);
        xbike3Dnew_img_introduce_point.style.display = "block";
        xbike3Dnew_img_introduce_icon.style.display = "none";
        xbike3Dnew_introduce_point_addListen = false;
        fb_xbike3Dnew_introduce_point_otherClick = null;
    }
});
function fb_xbike3Dnew_pop(){
    let xbike3Dnew_pop = document.getElementById("fb_xbike3Dnew_pop");
    // let folderName = xbike3Dnew_pop.getAttribute("data-foldername");
    let xbike3Dnew_KeyShotXR = document.getElementById("KeyShotXR");
    
    if (xbike3Dnew_pop.style.display === "block"){
      if (xbike3Dnew_introduce_point_addListen === false){
        xbike3Dnew_pop.addEventListener("touchmove", function(event) {
          event.preventDefault();
        }, {passive: false});
        xbike3Dnew_pop.addEventListener("mousewheel", function(event) {
          event.preventDefault();
        }, {passive: false});
        xbike3Dnew_introduce_point_addListen = true;
        fb_xbike3Dnew_pop();
      } else {
        xbike3Dnew_pop.style.display = "none";
        xbike3Dnew_introduce_point_addListen = false;
      }
    } else {
      if (xbike3Dnew_introduce_point_addListen === false){
        xbike3Dnew_pop.addEventListener("touchmove", function(event) {
          event.preventDefault();
        }, {passive: false});
        xbike3Dnew_pop.addEventListener("mousewheel", function(event) {
          event.preventDefault();
        }, {passive: false});
        xbike3Dnew_introduce_point_addListen = true;
        fb_xbike3Dnew_pop();
      } else {
        xbike3Dnew_pop.style.display = "block";
        xbike3Dnew_introduce_point_addListen = false;
        if (xbike3Dnew_KeyShotXR.innerHTML.length === 0){
          var keyshotXR;
         
          function initKeyShotXR() {
            // KeyShotXR_klarna
            var nameOfDiv = "KeyShotXR";
            var _folderName = ""
            if( document.getElementById("fb_xbike3Dnew_pop")) {
              _folderName = document.getElementById("fb_xbike3Dnew_pop").getAttribute("data-foldername");
            }
            var folderName = _folderName;
            // freebeat_xbikeImg
            // freebeat_klarnaBikeImg
            var viewPortWidth = 1920;
            var viewPortHeight = 1080;
            var backgroundColor = "transparent";
            var uCount = 180;
            var vCount = 1;
            var uWrap = true;
            var vWrap = false;
            var uMouseSensitivity = -0.5;
            var vMouseSensitivity = 1;
            var uStartIndex = 90;
            var vStartIndex = 0;
            var minZoom = 1;
            var maxZoom = 1;
            var rotationDamping = 0.96;
            var downScaleToBrowser = true;
            var addDownScaleGUIButton = false;
            var downloadOnInteraction = false;
            var imageExtension = "png";
            var showLoading = true;
            var loadingIcon = "ks_logo.png"; // Set to empty string for default icon.
            var allowFullscreen = true; // Double-click in desktop browsers for fullscreen.
            var uReverse = false;
            var vReverse = false;
            var hotspots = {};
            var isIBooksWidget = false;
  
            keyshotXR = new window.keyshotXR(nameOfDiv,folderName,viewPortWidth,viewPortHeight,backgroundColor,uCount,vCount,uWrap,vWrap,uMouseSensitivity,vMouseSensitivity,uStartIndex,vStartIndex,minZoom,maxZoom,rotationDamping,downScaleToBrowser,addDownScaleGUIButton,downloadOnInteraction,imageExtension,showLoading,loadingIcon,allowFullscreen,uReverse,vReverse,hotspots,isIBooksWidget);
          }
  
          // window.onload = initKeyShotXR;
          initKeyShotXR();
        }
      }
    }
  }
  function fb_xbike3Dnew_popClose() {
    let xbike3Dnew_pop = document.getElementById("fb_xbike3Dnew_pop");
    if (xbike3Dnew_introduce_point_addListen === false){
      xbike3Dnew_pop.addEventListener("touchmove", function(event) {
        event.preventDefault();
      }, {passive: false});
      xbike3Dnew_pop.addEventListener("mousewheel", function(event) {
        event.preventDefault();
      }, {passive: false});
      xbike3Dnew_introduce_point_addListen = true;
      fb_xbike3Dnew_popClose();
    } else {
      xbike3Dnew_pop.style.display = "none";
      xbike3Dnew_introduce_point_addListen = false;
    }
  }
// 黑车点击点
function fb_xbike3Dnew_introduce_point(num, isOpen) {
    let xbike3Dnew_img_introduce_point = document.getElementById(`xbike3Dnew_img_introduce_${num}_point`);
    let xbike3Dnew_img_introduce_icon = document.getElementById(`xbike3Dnew_img_introduce_${num}_icon`);
    if (isOpen === true){
      if (xbike3Dnew_introduce_point_addListen === false){
        xbike3Dnew_img_introduce_icon.addEventListener("touchmove", function(event) {
          event.preventDefault();
        }, {passive: false});
        xbike3Dnew_img_introduce_icon.addEventListener("mousewheel", function(event) {
          event.preventDefault();
        }, {passive: false});
        xbike3Dnew_introduce_point_addListen = true;
        fb_xbike3Dnew_introduce_point(num, isOpen);
      } else {
        xbike3Dnew_img_introduce_point.style.display = "none";
        xbike3Dnew_img_introduce_icon.style.display = "block";
        xbike3Dnew_introduce_point_addListen = false;
        setTimeout(()=>{
          fb_xbike3Dnew_introduce_point_otherClick = num;
        }, 0);
      }
    } else {
      if (xbike3Dnew_introduce_point_addListen === false){
        xbike3Dnew_img_introduce_icon.removeEventListener("touchmove", function(event) {
          return true;
        });
        xbike3Dnew_img_introduce_icon.removeEventListener("mousewheel", function(event) {
          return true;
        });
        xbike3Dnew_introduce_point_addListen = true;
        fb_xbike3Dnew_introduce_point(num, isOpen);
      } else {
        xbike3Dnew_img_introduce_point.style.display = "block";
        xbike3Dnew_img_introduce_icon.style.display = "none";
        xbike3Dnew_introduce_point_addListen = false;
      }
    }
  }