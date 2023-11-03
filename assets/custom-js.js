(function () {
  let path = window.location.href
  let pathNameCalculate = window.location.pathname
  if (path) {
    //添加mixpanel
    if (mixpanel && localStorage.memberUserInfo) {
      if (pathNameCalculate !== '/') {
        console.log('mixpanel', pathNameCalculate)
        mixpanel.track(pathNameCalculate)
      } else {
        console.log('mixpanel', 'home')
        mixpanel.track('home')
      }
    }
    // let exerciseInfoMes = getSessionStorage('exerciseInfo')

    if (pathNameCalculate === '/pages/membership' || pathNameCalculate === '/pages/members' || pathNameCalculate === '/en-uk/pages/membership' || pathNameCalculate === '/en-uk/pages/members') {
      if (localStorage.getItem('memberUserInfo')) {
        getMembership()
      }
    }
  }
  if (pathNameCalculate === '/pages/classes' || pathNameCalculate === '/en-uk/pages/classes') {
    let play2 = document.getElementById('playVideo2')
    let homeVideo2 = document.getElementById('video2')
    let Link_underline = document.getElementsByClassName('Link--underline')
    for (let i = 0; i < Link_underline.length; i++) {
      if (
        Link_underline[i].getAttribute('href') == '#' ||
        Link_underline[i].getAttribute('href') == 'Javascript:void(0)'
      ) {
        Link_underline[i].setAttribute('href', 'Javascript:void(0)')
        Link_underline[i].addEventListener('click', function () {
          homeVideo2.play()
          // let admin_iframe = document.getElementById('admin-bar-iframe');
          play2.style.display = 'block'
          // admin_iframe.style.display = "none";
          document.body.style.overflow = 'hidden'
        })
      }
    }
    let close2 = document.getElementById('colsePlay2')
    close2.addEventListener('click', function () {
      let video2 = document.getElementById('video2')
      video2.pause()
      // let admin_iframe = document.getElementById('admin-bar-iframe');
      play2.style.display = 'none'
      // admin_iframe.style.display = "block";
      document.body.style.overflow = 'auto'
    })
  }
  // membership
  let login = document.getElementById('login')
  if (login) {
    let memberUserInfo = localStorage.getItem('memberUserInfo')
    console.log("memberUserInfo", memberUserInfo)
    if (!memberUserInfo) {
      document.getElementById('loginModel').style.display = 'block'
      document.getElementById('memeberShip').style.display = 'none'
    } else {
      if (window.location.pathname === '/pages/members-bike' || window.location.pathname === '/en-uk/pages/members-bike') {
        document.getElementById('loginModel').style.display = 'block'
      } else {
        document.getElementById('loginModel').style.display = 'none'
        document.getElementById('memeberShip').style.display = 'block'
      }
    }
  }
})()

//推广弹窗关闭 6.1change
// function fbPopClose() {
//   newsletterPopupZoomOutFun()
//   setTimeout(() => {
//     document.getElementsByClassName(
//       'fb_pop_deliveryPlatform_mask'
//     )[0].style.display = 'none'
//     document.getElementById('mm-newsletter-button').style.visibility = 'visible'
//     document.getElementsByClassName('NewsletterPopup')[0].style.visibility =
//       'visible'
//   }, 500)
// }


// membership登录注册
function BackLogin() {
  document.getElementById('Register').style.display = 'none'
  document.getElementById('forgot').style.display = 'none'
  document.getElementById('login').style.display = 'flex'
}
function forGotPassword() {
  document.getElementById('Register').style.display = 'none'
  document.getElementById('forgot').style.display = 'flex'
  document.getElementById('login').style.display = 'none'
}
function createAccount() {
  document.getElementById('Register').style.display = 'flex'
  document.getElementById('forgot').style.display = 'none'
  document.getElementById('login').style.display = 'none'
}

// 输入验证
function onblurForm(e, index) {
  console.log(e.value)
  return
  let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
  switch (index) {
    case 0:
      if (e.value) {
        if (!reg.test(e.value)) {
          alert('邮箱格式不正确')
        }
      }

      break
    case 1:
      break
    case 2:
      break
    case 3:
      break
    case 4:
      if (e.value) {
        if (!reg.test(e.value)) {
          alert('邮箱格式不正确')
        }
      }
      break
    case 5:
      break
    case 6:
      if (e.value) {
        if (!reg.test(e.value)) {
          alert('邮箱格式不正确')
        }
      }
      break
    default:
      break
  }
}
//登陆
function memberLogin(event, de) {
  let email = document.getElementById('memberLoginEmail').value
  let password = document.getElementById('memberLoginPassword').value
  console.log(email, password)
  if (email && password) {
    document.getElementById('loadingbeLoading').style.display = 'block'
    de.classList.add('noClick')
    ajax({
      type: 'POST',
      url: 'https://api.freebeatfit.com/thirdparty-api/account/login',
      param: {
        account: email,
        password: password,
      },
      success: function (res) {
        console.log(res)
        if (res.code != 200) {
          document.getElementById('loadingbeLoading').style.display = 'none'
          de.classList.remove('noClick')
          document.getElementById('errorMSg1').style.display = 'block'
          document.getElementById('errorMSg1').innerHTML = res.msg
          return
        }

        if (window.location.pathname === '/pages/members-bike' || window.location.pathname === '/en-uk/pages/members-bike') {
          let { code, data } = res
          if (code == 200) {
            let udt = data.token
            window.location.href =`https://members.freebeatfit.com/?udt=${udt}`
          }
        } else {
          localStorage.setItem("memberUserInfo", JSON.stringify(res.data))
          console.log("2222")
          location.reload()
        }

        // localStorage.memberUserInfo = JSON.stringify(res.data)

        //           document.getElementById('loginModel').style.display = "none"
        //         	document.getElementById('memeberShip').style.display = "block"
      },
    })
    event.preventDefault()
  }
}
//注册 已弃用
function createUser(event, de) {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,16}$/
  var reg2 = /^\w+\.{0,1}\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
  var reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  let username = document.getElementById('memberUsername').value
  let email = document.getElementById('memberEmail').value
  let password = document.getElementById('memberPassword').value
  if (!reg.test(username)) {
    console.log(1)
    return
  }
  if (!reg2.test(email)) {
    console.log(2, email)
    return
  }
  if (!reg3.test(password)) {
    console.log(3)
    return
  }

  document.getElementById('createUsergbeLoading').style.display = 'block'
  de.classList.add('noClick')
  ajax({
    type: 'POST',
    url: 'https://api.freebeatfit.com/thirdparty-api/account/register',
    param: {
      userName: username,
      email: email,
      password: password,
    },
    success: function (res) {
      console.log(res)
      if (res.code != 200) {
        document.getElementById('createUsergbeLoading').style.display = 'none'
        de.classList.remove('noClick')
        document.getElementById('errorMSg2').style.display = 'block'
        document.getElementById('errorMSg2').innerHTML = res.msg
        return
      }
      localStorage.memberUserInfo = JSON.stringify(res.data)
      location.reload()
      //           document.getElementById('loginModel').style.display = "none"
      //         	document.getElementById('memeberShip').style.display = "block"
    },
  })
  event.preventDefault()
}
function forgetPassword(event, de) {
  let email = document.getElementById('forgotPassword').value
  var reg = /^\w+\.{0,1}\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
  if (!reg.test(email)) {
    return
  }
  ajax({
    type: 'POST',
    url: 'https://api.freebeatfit.com/thirdparty-api/account/forgot-password',
    param: {
      email: email,
    },
    success: function (res) {
      if (res.code != 200) {
        document.getElementById('errorMSg3').style.display = 'block'
        document.getElementById('errorMSg3').innerHTML = res.msg

        return
      }
      document.getElementById('success1').style.display = 'block'
      document.getElementById('success1').innerHTML =
        'A password reset link was sent. Please check your email.'
      console.log(res)
    },
  })
  event.preventDefault()
}
// let regs = /membership/;
// if(regs.test(window.location.href)){
//   console.log(localStorage.memberUserInfo)
//   if(localStorage.memberUserInfo){
//    	getMembership()
//   }
// }
//创建订单
function createOrder() {
  document.getElementById('SubscribeLoading').style.display = 'block'
  document.getElementById('Subscribe').classList.add('noClick')

  ajax({
    type: 'POST',
    url: 'https://api.freebeatfit.com/thirdparty-api/create-order',
    param: {
      skuId: '2',
    },
    success: function (res) {
      console.log(res)
      ajax({
        type: 'POST',
        url: 'https://api.freebeatfit.com/thirdparty-api/order/create-payment',
        param: {
          orderId: res.data.order.id,
        },
        success: function (ress) {
          let stripe = Stripe(ress.data.pkKey)
          let sessionId = ress.data.sessionId
          stripe
            .redirectToCheckout({
              sessionId: sessionId,
            })
            .then(handleResult)
          console.log(ress)
        },
      })
    },
  })
}
//退订

function postUnsubscribe() {
  // document.getElementById('SubscribeLoading').style.display = 'block'
  // document.getElementById('Unsubscribe').classList.add('noClick')
  $('#Unsubscribe .loading').show()
  ajax({
    type: 'POST',
    url: 'https://api.freebeatfit.com/thirdparty-api/order/subscribe-cancel',
    success: function (res) {
      if (res.code != 200) {
        return
      }
      location.reload()
      //          document.getElementById('UnsubscribeSuccess').style.display = 'block'
      //         document.getElementById('UnsubscribeSuccess').innerHTML = res.data
      //         getMembership()
      //           console.log(res)
    },
  })
}

//退订触发弹窗
function unsubscribeTrigger() {
  // document.getElementById('memeberShip').style.background = '#ccc'
  // document.getElementById('memeberShip').style.pointerEvents = 'none'
  document.getElementById('fb-subscription').style.display = 'none'
  document.getElementById('unsubscribeConfirmation-outside').style.display = 'block'
}
//退订确认
function unsubscribeConfirmFun(param) {
  if (param === 'CONFIRM') {
    postUnsubscribe()
    // document.getElementById('memeberShip').style.background = '#fff'
    // document.getElementById('memeberShip').style.pointerEvents = 'auto'
    document.getElementById('fb-subscription').style.display = 'none'
    document.getElementById('unsubscribeConfirmation-outside').style.display = 'none'
  }
  if (param === 'CANCEL') {
    // document.getElementById('memeberShip').style.background = '#fff'
    // document.getElementById('memeberShip').style.pointerEvents = 'auto'
    document.getElementById('fb-subscription').style.display = 'none'
    document.getElementById('unsubscribeConfirmation-outside').style.display = 'none'
  }
}

function getMembership() {
  try {
    ajax({
      type: 'POST',
      url: 'https://api.freebeatfit.com/thirdparty-api/order/purchase-records',
      success: function (res) {
        let tab1 = document.getElementById('table1')
        let tab2 = document.getElementById('table2')
        let subscription_table = document.getElementById('subscription_table')
        let obj = res.data

        var windowWidth = $(window).width();
        document.getElementById('border_bottom_1').style.borderBottom = '1px solid #808080'
        document.getElementById('border_bottom_2').style.borderBottom = '1px solid #808080'

        if (obj.subscribeOpen) {
          document.getElementById('Subscribe').style.display = 'block'
        } else {
          document.getElementById('Subscribe').style.display = 'none'
        }
        if (obj.unSubscribeOpen) {
          document.getElementById('Unsubscribe').style.display = 'block'
        } else {
          document.getElementById('Unsubscribe').style.display = 'none'
        }

        if (obj.memberInfoList) {
          let tr =
            '</td>' +
            '<td id="subscription_link" onclick="subscriptionShow()">' +
            obj.memberInfoList.name +
            '</td>' +
            '<td class="td_right">' +
            obj.memberInfoList.nextDeductionDate +
            '</td>' +
            '</tr>'

          let tr1 =
            '</td>' +
            '<td>' +
            obj.memberInfoList.name +
            '</td>' +
            '<td>' +
            obj.memberInfoList.status +
            '</td>' +
            '<td>' +
            obj.memberInfoList.startDate +
            '</td>' +
            '<td class="nextDeductionDate">' +
            obj.memberInfoList.nextDeductionDate +
            '</td>' +
            '</tr>'

            tab1.insertAdjacentHTML('beforeend', tr)
            subscription_table.insertAdjacentHTML('beforeend', tr1)
        } else {
          let tr =
            '</td>' +
            '<td>' +
            '--' +
            '</td>' +
            '<td class="td_right">' +
            '--' +
            '</td>' +
            '</tr>'

          let tr1 =
            '</td>' +
            '<td>' +
            '--' +
            '</td>' +
            '<td>' +
            '--' +
            '</td>' +
            '<td>' +
            '--' +
            '</td>' +
            '<td>' +
            '--' +
            '</td>' +
            '</tr>'

            tab1.insertAdjacentHTML('beforeend', tr)
            subscription_table.insertAdjacentHTML('beforeend', tr1)
        }

        if (obj.shareWithMe) {
          let arr2 = obj.shareWithMe
          arr2.forEach((item, i) => {
            let td =
              '<tr>' +
              '<td>' +
              item.name +
              '</td>' +
              '<td>' +
              item.owner +
              '</td>' +
              '<td class="td_right">' +
              item.price +
              '/MO </td>' +
              '</tr>'

            tab2.insertAdjacentHTML('beforeend', td)
          })
        } else {
          let td =
            '<tr>' +
            '<td>' +
            '--' +
            '</td>' +
            '<td id="owner">' +
            '--' +
            '</td>' +
            '<td>' +
            '--' +
            '</td>' +
            '</tr>'

          tab2.insertAdjacentHTML('beforeend', td)
        }

      },
      error: function (data) {
        console.log('member error2')
      }
    })
  } catch (exception) {

    console.log('member error')

  }

}
function subscriptionShow(){
  document.getElementById('fb-subscription').style.display = 'block'
  if(($('.nextDeductionDate').html()).indexOf('on') > -1){
    document.getElementById('footer-url2').style.display = 'none'
    return
  }else{
    document.getElementById('footer-url2').style.display = 'block'
    document.getElementById('Unsubscribe').style.display = 'inline-block'
    return
  }
}
function subscriptionQuit(){
  document.getElementById('fb-subscription').style.display = 'none'
}

function logout() {
  localStorage.removeItem('memberUserInfo')
  location.reload()
}

function hiddenPassword(e) {
  console.log(e)
  e.style.display = 'none'
  document.getElementById('shou_password').style.display = 'initial'
  document.getElementById('memberLoginPassword').type = 'text'
}
function showPassword(e) {
  console.log(e)
  e.style.display = 'none'
  document.getElementById('hidden_password').style.display = 'initial'
  document.getElementById('memberLoginPassword').type = 'password'
}

// -----membership end-----

// track order

function getTrackOrder() {
  let trackOrder = document.getElementById('trackOrder').value
  let list = document.getElementById('trackList')
  list.innerHTML = ''
  ajax({
    type: 'GET',
    url:
      'https://api.freebeatfit.com/thirdparty-api/swiship/getPackageTrackingDetails?trackingNumber=' +
      trackOrder,

    success: function (res) {
      let arr = res.data
      arr.forEach((item, i) => {
        let day = item.eventDate.substring(0, 10)
        let time = item.eventDate.substring(11, 19)
        let div =
          '<div>' +
          '<div class="trackTime">' +
          day +
          '</div>' +
          '<div class="trackInfo">' +
          '<div class="t-left">' +
          time +
          '</div>' +
          '<div class="t-right">' +
          '<div>' +
          item.eventDescription +
          '</div>' +
          '<div class="eventAddress">' +
          item.eventAddress +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'

        list.insertAdjacentHTML('beforeend', div)
      })
      console.log(res)
    },
  })
}
function getInput(val) {
  if (val.value) {
    document.getElementById('ResetBtn').style.display = 'block'
  } else {
    document.getElementById('ResetBtn').style.display = 'none'
  }
}
function ResetInput() {
  document.getElementById('trackOrder').value = ''
  document.getElementById('ResetBtn').style.display = 'none'
}

function setCustomValidity() { }

// 右下pop change
// function newsletterPopupZoomOutFun() {
//   document.getElementById('NewsletterPopup').setAttribute('aria-hidden', 'true')
//   document.getElementById('mm-newsletter-button').style.display = 'block'
// }



//----- 轮播图 PR Start----//
window.onload = (function () {
 var mySwiper = document.querySelector('.PRswiper')
 if(mySwiper) {
    mySwiper = new Swiper('.PRswiper', {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        //           loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        observeSlideChildren: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          //             dragSize: "auto",
        },
      })
      new Swiper('.PRswiper')
 }
 
  
})()
//------轮播图PR End-------//
