/** *
 *
 * 获取请求的UUID，指定长度和进制,如
 * getUUID(8, 2)   //"01001010" 8 character (base=2)
 * getUUID(8, 10) // "47473046" 8 character ID (base=10)
 * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
 *
 */

function getUUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    var i
    radix = radix || chars.length
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      var r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
}

function  getPcOrMobile() {
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    // mobile
    return  2
  } else {
    // pc
    return 1
  } 
}
function  getPcOrMobileNew() {
  if(window.innerWidth <= 768) {
    return  2
  } else {
    return 1
  }
}
function getTransformByMatrix(translateString) {
  var matrix = translateString.match(/matrix(3d)?\((.+?)\)/);
  var is3D = matrix && matrix[1];
  if (matrix) {
      matrix = matrix[2].split(",");
      if (is3D === "3d")
          matrix = matrix.slice(12, 15);
      else {
          matrix.push(0);
          matrix = matrix.slice(4, 7);
      }
  } else {
      matrix = [0, 0, 0];
  }
  var result = {
      x: parseFloat(matrix[0]),
      y: parseFloat(matrix[1]),
      z: parseFloat(matrix[2])
  };
  return result;
}
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
function getObjectURL(file) {
  var url = null;
  try {
      if(window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if(window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if(window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else {
        url = ""
      }
  }catch (e) {
    
  }

  return url;
}
// function getImgBase64Data(file, callback) {
//   var reader = new FileReader();
//   reader.onload = function (e) {
//       callback(e.target.result);
//   };
//   reader.readAsDataURL(file); 
// }
function getfilesize(size) {
  if (!size)
  return '';

  var num = 1024.00; //byte

  if (size < num)
  return size + 'B';
  if (size < Math.pow(num, 2))
  return (size / num).toFixed(2) + 'K'; //kb
  if (size < Math.pow(num, 3))
  return (size / Math.pow(num, 2)).toFixed(2) + 'M'; //M
  if (size < Math.pow(num, 4))
  return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
  return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
}
function getQueryString (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
 
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
 
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
 
    return result
  }
}
let seconds11 = 200
function fbThrottle(func, wait) {
    var timer = null;
    var startTime = Date.now();  

    return function(){
        var curTime = Date.now();
        var remaining = seconds11-(curTime-startTime); 
        var context = this;
        var args = arguments;

        clearTimeout(timer);

        if(remaining<=0){ 
            func.apply(context, args);

            startTime = Date.now();

        }else{
            timer = setTimeout(fun, remaining);  // 如果小于wait 保证在差值时间后执行
        }
    }
}
/**
 * 防抖节流
 * @param {*} action 回调
 * @param {*} delay 等待的时间
 * @param {*} context this指针
 * @param {Boolean} iselapsed 是否等待上一次
 * @returns {Function}
 */
function throttleNew (action, delay, context, iselapsed) {
    let timeout = null;
    let lastRun = 0;
    return function () {
        if (timeout) {
            if (iselapsed) {
                return;
            } else {
                clearTimeout(timeout);
                timeout = null;
            }
        }
        let elapsed = Date.now() - lastRun;
        let args = arguments;
        if (iselapsed && elapsed >= delay) {
            runCallback();
        } else {
            timeout = setTimeout(runCallback, delay);
        }
        /**
         * 执行回调
         */
        function runCallback() {
            lastRun = Date.now();
            timeout = false;
            action.apply(context, args);
        }
    }
}
// shopify video
function fbPlayVideo(videodom){
    if(videodom.length > 0) {
        videodom.each(function(index,elemet) {
            if(elemet.paused) {
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
}
function fbPausedVideo (videodom) {
    if(videodom.length > 0) {
        videodom.each(function(index, elemet) {
            if(!elemet.paused) {
                elemet.pause()
            }
        })
    }
}
// 普通 video
function fbPlayVideo2(videodom){
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
}
function  fbPausedVideo2(videodom) {
    if(videodom.length > 0) {
        videodom.each(function(index, elemet) {
            let _isrc= $(elemet).attr('src')
            if(_isrc && !elemet.paused) {
                elemet.pause()
            }
        })
    }
}
// function fbthrottle(fn, delay = 200) {
//     let timer = null
//     return function () {
//         if(timer) return
//         timer = setTimeout(() => {
//           fn.apply(this,arguments)
//           timer = null
//         })
//     }
//  }
/**
 * @dom  '#dom'
 * @delta
 * @total
 * @direction -1/1
 */
 function translateEffByDelta(dom,delta,total,direction, space = 200){
    let progress = (total - delta)/total;
    let max = direction * space;
    let res = progress * max;
    $(dom).css("transform",`translateY(${res}px)`)
}
var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
var iosMaxheight= ($('.fixed-animation-ios').length > 0)? $('.fixed-animation-ios').innerHeight() : window.innerHeight
var videoAssetUrl = document.querySelector('.fixed-animation-ios')?document.querySelector('.fixed-animation-ios').getAttribute('data-video-src') : 'https://cdn.shopify.com/'
class ImgToFrame {
    constructor(dom, frames) {
        let timeId = null;
        let curFrame = 0;
        let totalFrames = frames.length;
        let _rate = 24;
        let lastImgObj = {};
        let imgDic = {};
        let loadFrames = () => {
            for (const iterator of frames) {
                let img = new Image()
                img.src = iterator;
                img.onload = ()=> {
                    imgDic[iterator] = img;
                    chackCurFrame();
                }
            }
        }

        let chackCurFrame = ()=> {
            if(lastImgObj && lastImgObj.url)
            {
                if(imgDic[lastImgObj.url]){
                    updateFrame(lastImgObj.frame);
                }
            }
        }

        let updateFrame = frame => {
            let url = frames[frame];
            if(imgDic[url]){
                $(dom).attr('src', frames[frame]);
            }
            else{
                lastImgObj.url = url;
                lastImgObj.frame = frame;
            }
        }

        updateFrame(0);
        loadFrames();

        this.play = (rate = 22) => {
            timeId && clearInterval(timeId);
            _rate = rate;
            let rRate = 1000 / _rate;
            timeId = setInterval(() => {
                if (curFrame < totalFrames - 2) {
                    curFrame++;
                } else {
                    curFrame = 0;
                }
                updateFrame(curFrame);
            }, rRate)
        }

        this.stop = () => {
            timeId && clearInterval(timeId);
        }

        this.gotoAndPlay = frame => {
            curFrame = frame;
            updateFrame(frame);
            this.play(_rate);
        }

        this.destory = () => {
            this.stop();
            imgDic = {};
        }

        this.stepToPercentage = step => {
            let toStep = Math.floor((frames.length - 1) * step);
            updateFrame(toStep);
        }
    }
}
// open tidio live chat
function TidioShowFun() {
    if(tidioChatApi) {
        tidioChatApi.open();
    }
}
// dom 参数 js获取元素
// callback 回调函数
class sectionCurrentView {
    constructor(dom, callback) {
        let isOnce = false
        let observerBtn = new IntersectionObserver(function(entries){
            entries.forEach( function(element, index) {
                if (element.isIntersecting) {
                    // && element.intersectionRect.bottom > 300
                   if(!isOnce) {
                        isOnce = true
                        callback && callback()
                        // 解绑监视器
                        observerBtn.disconnect()
                   }
                } else {
                }
            });
        }, {
            root: null,
            threshold:[0.75]
        });
        observerBtn.observe(dom)
    }
}
// 拉起弹窗 防止滚动穿透 公共方法
function lockBody () {
    $('body').css('height', '100vh')
    $('body').css('overflow', 'hidden')
}
function autoBody () {
    $('body').css('height', 'auto')
    $('body').css('overflow', 'unset')
}
function toOpen (url){
    console.log("url", url)
   var option='toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350';
   option= getPcOrMobile()== 1 ?option:'';
   console.log("option", option)
   window.open(
       url,'_blank',option,
   );
}
function fbShareApp(type, hrefurl, titletext, messages){//分享
    let href=encodeURIComponent(hrefurl);
    let  title=encodeURIComponent(titletext);
    switch(type){
        case 'facebook'://分享到Facebook的代码
            href=encodeURIComponent('https://static.freebeatfit.com/share/share-last.html?redirect_url=' + hrefurl);
            toOpen('http://www.facebook.com/sharer.php?u='+href+'&t='+title);
            break;
        case 'whatsapp'://分享到whatsapp        
           toOpen('https://api.whatsapp.com/send?&url='+href+'&text='+title + ' ' + href);
            break;
        case 'twitter'://分享到twitter的代码
            toOpen('http://twitter.com/share?url=' + href + '&title=' + title);
            break;
        case 'instagram'://分享到twitter的代码
           
            break;
        case 'google'://分享到Google的代码
            toOpen('http://www.google.com/bookmarks/mark?op=add&bkmk='+href+'&title='+title);
            break;
        case 'yahoo'://分享到yahoo
            toOpen('http://myweb2.search.yahoo.com/myresults/bookmarklet?u='+href+'&t='+title);
            break;
        case 'linkedin'://分享到linkedin
            toOpen('http://www.linkedin.com/shareArticle?mini=true&url='+href+'&title='+title);
            break;
       
    }	
}
function fbchangeNum(string) {
    //如果用户第一位输入的是小数点，则重置输入框内容
    if (string != '' && string.substr(0, 1) == '.') {
      string = "";
    }
    string = string.replace(/^0*(0\.|[1-9])/, '$1');//粘贴不生效
    string = string.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    string = string.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    string = string.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    string = string.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');//只能输入四个小数
    if (string.indexOf(".") < 0 && string != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      if (string.substr(0, 1) == '0' && string.length == 2) {
        string = string.substr(1, string.length);
      }
    }
    return string
}
function evaEmail () {
    var atpos = x.indexOf("@")
    var dotpos = x.lastIndexOf(".")
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
}
function getProductMobTop () {
    let height1 = $('.AnnouncementBar').height() || 0
    let height2 = $('#section-header').height() || 0
    let height3 = $('.fb-product-detailnav').height() || 0
    return  parseInt(height1 + height2 + height3)
}
function fbGetNumberFromText(str) {
    str = str + "";
    const regex = /[\d\.]/i;
    let num = "";
    for (let i = 0; i < str.length; i++) {
        if (regex.test(str[i])) num += str[i];
    }
    return +num;
};
function fbtoDecimal(x) {   
    var f = parseFloat(x);    
    if (isNaN(f)) {   
        return 0;    
    }          
    f = Math.round(x*100)/100;  
    return f;        
 } 
 $.fn.serializeObject = function()
 {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
 };

 function FbIsInViewPort(element) {
    const offset = element.getBoundingClientRect();
    const offsetTop = offset.top;
    const offsetBottom = offset.bottom;
    const offsetHeight = offset.height;
    // 进入可视区域
    if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
        return true
    } else {
        return false
    }
}


