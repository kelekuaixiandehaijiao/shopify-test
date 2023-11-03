
const PaymentInfo = JSON.parse(localStorage.getItem('memberUserInfo') || null);
let couponId = ''
let memberType = null
let isRedeem = false
let productUrl = 'https://api.freebeatfit.com'
let findPlanObject = null
let findArrBike = ['ebike', 'boombike_lite']
const currentRoute = window.location.href;
const memberPlanName = window.location.pathname == '/pages/membership-plans' ? true : false //是否为移动端的绑卡选择页面
console.log(memberPlanName, '数据')
var regex = /membership/;
let tokenValue = null

let membershipIsPc = window.innerWidth > 768 ? true : false

// var isLoggedIn = false;
const queryString = window.location.search;
// 使用正则表达式提取'token'参数的值
const fromPlatformRegex = /[\&]fromPlatform=([^&#]+)/;
const fromPlatform = queryString.match(fromPlatformRegex);
const tokenRegex = /[\?&]token=([^&#]+)/;
const tokenMatch = queryString.match(tokenRegex);
if (tokenMatch && tokenMatch[1] && memberPlanName) {
  $(document).ready(function () {
    $(".AnnouncementBar").css('display', 'none')
    $("#section-header").css('display', 'none')
    $("#shopify-section-footer").css('display', 'none')
  })
}
if (regex.test(currentRoute)) {
  isMembership = true

} else {
  isMembership = false
}

$(function () {

  //会员订阅
  $("#member-Subscription .u-cancel").click(function () {
    $("#member-Subscription").css({
      "display": "none",
    })
  })
  const membershipSubscription = {
    _cancel: $("#member-Subscription .u-cancel"),
    init: function () {

    }

  }

  membershipSubscription.init()


  const paymeniInfo = {
    _paymentPrompt: $('#payment-prompt'),
    _paymentAccountOne: $('#payment-account-one'),
    _paymentAccountTwo: $('#payment-account-two'),
    _footerUrl: $('#footer-url'),
    _footerUrl2: $('#footer-url2'),
    _fbMembership2: $('.fb-membership2'),
    init: function () {
      this.ShowPayment();
      this.PaymentCheck();
    },
    updateOrder(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      console.log('update Order');
      if (!memberPlanName) {
        document.getElementById('SubscribeLoading').style.display = 'block';
        document.getElementById('Subscribe').classList.add('noClick');
      }

      ajax({
        type: 'GET',
        url: `${productUrl}/client-api/v1/create-customer-portal-session`,
        param: {
          skuId: '2',
        },
        success: function (res) {
          console.log(res);
          document.getElementById('SubscribeLoading').style.display = 'none';
          window.location.href = res.data;
        },
      });
    },
    PaymentCheck(data) {
      let _this = this;
      _this._footerUrl2.hide();
      if (!data) {
        _this._paymentPrompt.show();
        _this._paymentAccountOne.show();
        _this._paymentAccountTwo.hide();
        _this._footerUrl.show();
        if (!memberPlanName) {
          document.getElementById('Subscribe').style.display = 'block';
          document.getElementById('Unsubscribe').style.display = 'none';
        }

      } else {
        _this._paymentAccountOne.hide();
        _this._paymentAccountTwo.show();
        _this._paymentPrompt.show();
        let cart = 'No payment found.';
        if (data.paymentAccountNumber) {
          cart = data.paymentAccountNumber;
          _this._paymentPrompt.hide();
          _this._footerUrl.show();
          if (!memberPlanName) {
            document.getElementById('Subscribe').style.display = 'block';
            document.getElementById('Unsubscribe').style.display = 'block';
          }

          // document.getElementById('Subscribe').addEventListener('click', _this.updateOrder, true);
        } else {
          _this._footerUrl.show();
          if (!memberPlanName) {
            document.getElementById('Subscribe').style.display = 'block';
            document.getElementById('Unsubscribe').style.display = 'none';
          }

          // document.getElementById('Subscribe').removeEventListener('click', _this.updateOrder, true);
        }
        _this._paymentAccountTwo.text(cart);
      }
    },


    ShowPayment() {
      let _this = this;
      ajax({
        type: 'POST',
        url: `${productUrl}/client-api/v1/order/renewalMember`,
        success: function (res) {
          let { code, data, msg } = res;
          if (code == 200) {
            _this.PaymentCheck(data || null);
          }
        },
      });
    },
  };

  if (PaymentInfo && PaymentInfo.token) {
    paymeniInfo.init();
  }
});
//领取优惠券
function receiveRetentionCoupons() {
  if (!isRedeem) return false
  ajax({
    type: 'POST',
    url: `${productUrl}/member/v1/coupon/receiveRetentionCoupons`,
    param: {
      "couponId": couponId
    },
    success: function (res) {
      let { code, ext, msg } = res;
      if (code == 0) {
        $('.cancelBox-tit').text(`${ext.title}`)
        $('.cancel-redeem').text(`${ext.button1Text}`)
        if ($("#gotIt").next("#u-got").length > 0) {
          $('#gotIt').after(ext.desc);
        }
        document.getElementById('cancelBox').style.display = 'none'
        document.getElementById('u-getSuccess').style.display = 'flex'
        $(".preferential-box").css('display', 'none')
        findRetentionStrategy()

      }
    },
  });
}
if (isMembership) {
  if (tokenMatch && tokenMatch[1]) {
    tokenValue = tokenMatch[1]
    memberLoginLink(event, this)

  } else {
    findPlan()
  }

  findRetentionStrategy()
  $("#thirtyNinePointNine").click(function () {
    createOrder('2')
  })
  $("#memeberShip .thirtyNinePointNineTop").click(function () {
    createOrder('2', 1)
  })
  $("#eighteenPointEight").click(function () {
    createOrder('21')
  })
}

//登录
function memberLoginLink(event, de) {
  ajax({
    type: 'POST',
    url: `${productUrl}/thirdparty-api/account/login`,
    param: {
      account: '',
      password: '',
      tempWebLoginToken: tokenValue,
      fromPlatform:fromPlatform?fromPlatform[1]:undefined
    },
    success: function (res) {
      if (res.code == 200) {
        localStorage.setItem("memberUserInfo", JSON.stringify(res.data))
        localStorage.getItem('memberUserInfo')
        findPlan()
      } else {
        localStorage.removeItem("memberUserInfo");
        window.location.href = '/pages/membership'
      }
    },
  })
}
function showTips(imgElement) {
  // 获取对应的 m-tips-box 元素
  var tipsBox = imgElement.parentNode.parentNode.nextElementSibling;
  // 显示 m-tips-box
  tipsBox.style.display = "block";
}

function hideTips() {
  // 获取所有的 m-tips-box 元素
  var tipsBoxes = document.querySelectorAll(".m-tips-box");
  var tipsOneBoxes = document.querySelectorAll(".tips-box-one");
  var tipslastBoxes = document.querySelectorAll(".m-tips-box-last");
  // 隐藏所有的 m-tips-box
  tipsBoxes.forEach(function (tipsBox) {
    tipsBox.style.display = "none";
  });
  tipsOneBoxes.forEach(function (tipsBox) {
    tipsBox.style.display = "none";
  });
  tipslastBoxes.forEach(function (tipsBox) {
    tipsBox.style.display = "none";
  });
}
//js判断数组是否有重合的数据
function arraysHaveCommonElements(findArrBike, arr2) {
  return findArrBike.some(item => arr2.includes(item));
}


//查询会员计划
function findPlan() {
  ajax({
    type: 'POST',
    url: `${productUrl}/member/v1/info/findPlan`,
    success: function (res) {
      let { code, data } = res
      findPlanObject = data
      if (code == 0) {
        if (tokenMatch && tokenMatch[1]) {
          if (!localStorage.getItem('isLoggedIn')) {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('findPlanObject', JSON.stringify(findPlanObject));
            if (!memberPlanName) {
              location.reload();
            }
          } else {
            showPop();
          }
        }


        if (data.hasTrialVip && data.primaryAccount) {
          $(".four-box .four-tit").text('START 45-DAY TRIAL')
        } else {
          $(".four-box .four-tit").text('SELECT PLAN')
        }
        //若用户已经订阅
        if (data.subscribed) {
        } else { //用户未订阅
          //若用户未绑卡
          if (!data.bindCard) {
            //用户未绑卡且没有领取45天会员，且是老车的情况展示蓝色引导框
            if (!arraysHaveCommonElements(findArrBike, data.boundList) && data.hasTrialVip && data.primaryAccount) {
              $("#member-Subscription").css("display", 'none')
              $(".free-trial").css("display", 'flex')
            }
            //当前设备 45 天会员已领取，则界面不变
            else if (!arraysHaveCommonElements(findArrBike, data.boundList) && !data.hasTrialVip) {
              $("#member-Subscription").css("display", 'none')
              $(".free-trial").css("display", 'none')
            }
            //用户未绑卡且有领取45天会员，且是新车的情况展示灰色的会员卡
            else if (arraysHaveCommonElements(findArrBike, data.boundList) && data.hasTrialVip && data.primaryAccount) {
              $(".free-trial").css("display", 'flex')
              if (findPlanObject.primaryAccount&&memberPlanName) {
                $("#card-grey").css("display", 'block')
                $("#subscription-box").addClass("subscription-box-card");

              }
            }
            //用户未绑卡且没有领取45天会员，流程不变
            else if (arraysHaveCommonElements(findArrBike, data.boundList) && !data.hasTrialVip) {
              $(".free-trial").css("display", 'none')
              $("#card-grey").css("display", 'none')
              $("#member-Subscription").css("display", 'none')
            } else {//除以上所有情况
              $("#member-Subscription").css("display", 'none')
              if (data.hasTrialVip && data.primaryAccount) {
                $(".free-trial").css("display", 'flex')
              } else {
                $(".free-trial").css("display", 'none')
              }
            }

          }
        }


      }
    },
  })
}
function showPop(val) {
  
  if (tokenMatch && tokenMatch[1]) {
    findPlanObject = localStorage.getItem('findPlanObject') ? JSON.parse(localStorage.getItem('findPlanObject')) : null
  }
  //若用户已经订阅
  if (findPlanObject && findPlanObject.subscribed) {
    //且关联了ebike或者boombike_lite显示弹窗
    if (arraysHaveCommonElements(findArrBike, findPlanObject.boundList)) {
      // $("#member-Subscription").css("display", 'block')
      if (membershipIsPc) {
        $("#member-Subscription").css("display", 'block')
      } else {
        if (!memberPlanName) {
          window.location.href = '/pages/membership-plans'
        }
      }
    }
  } else { //用户未订阅

    //若用户未绑卡
    if (!findPlanObject.bindCard) {
      
      //用户未绑卡且没有领取45天会员权益，且是老车的情况展示蓝色引导框
      if (!arraysHaveCommonElements(findArrBike, findPlanObject.boundList) && findPlanObject.hasTrialVip && findPlanObject.primaryAccount) {
        $("#member-Subscription").css("display", 'none')
      }
      //当前设备不可领取45天会员，则界面不变
      else if (!arraysHaveCommonElements(findArrBike, findPlanObject.boundList) && !findPlanObject.hasTrialVip) {
        $("#member-Subscription").css("display", 'none')
        $(".free-trial").css("display", 'none')
      }
      //用户未绑卡且可以领取45天会员权益，且是新车的情况展示灰色的会员卡
      else if (arraysHaveCommonElements(findArrBike, findPlanObject.boundList) && findPlanObject.hasTrialVip) {
        $(".free-trial").css("display", 'flex')
        if (findPlanObject.primaryAccount) {
          $("#card-grey").css("display", 'block')
          $("#subscription-box").addClass("subscription-box-card");
          if (val) {
            if (membershipIsPc) {
              $("#member-Subscription").css("display", 'block')
            } else {
              if (!memberPlanName) {
                window.location.href = '/pages/membership-plans'
              }
            }
          }
        }
      }
      //用户未绑卡且不可领取45天会员，流程不变 且是新车的情况
      else if (arraysHaveCommonElements(findArrBike, findPlanObject.boundList) && !findPlanObject.hasTrialVip) {
        $(".free-trial").css("display", 'none')
        $("#card-grey").css("display", 'none')
        $("#member-Subscription").css("display", 'none')
        if (val) {
          if (membershipIsPc) {
            $("#member-Subscription").css("display", 'block')
          } else {
            if (!memberPlanName) {
              window.location.href = '/pages/membership-plans'
            }
          }
        }
      } else {//除以上所有情况
        $("#member-Subscription").css("display", 'none')
        if (findPlanObject.hasTrialVip && data.primaryAccount) {
          $(".free-trial").css("display", 'flex')
        } else {
          $(".free-trial").css("display", 'none')
        }
      }

    } else {//用户已经绑卡
      //若该账号下仅关联了 ebike，或boombike without screen
      if (arraysHaveCommonElements(findArrBike, findPlanObject.boundList)) {
        if (membershipIsPc) {
          $("#member-Subscription").css("display", 'block')
        } else {
          if (!memberPlanName) {
            window.location.href = '/pages/membership-plans'
          }
        }
      } else {
        $("#member-Subscription").css("display", 'none')
      }

      if ($(".subscription-box-card").length > 0) {
        $("#subscription-box").removeClass("subscription-box-card");
      }
      $("#card-grey").css("display", 'none')
    }
  }
}

function createOrder(val = '2', num) {
  if (num) {
    if (findPlanObject.subscribed) {
      //且关联了ebike或者boombike_lite显示弹窗
      if (arraysHaveCommonElements(findArrBike, findPlanObject.boundList)) {
        showPop()
        return false
      }
    } else {
      if (findPlanObject.bindCard && arraysHaveCommonElements(findArrBike, findPlanObject.boundList)) {
        showPop(1)
        return false
      }
      if (!findPlanObject.bindCard && arraysHaveCommonElements(findArrBike, findPlanObject.boundList)) {
        showPop(1)
        return false
      }
    }



  }
  document.getElementById('SubscribeLoading').style.display = 'block'
  if (membershipIsPc) {
    $("#member-Subscription").css("display", 'none')
    document.getElementById('Subscribe').classList.add('noClick')
  }

  ajax({
    type: 'POST',
    url: `${productUrl}/client-api/v1/web/bindOrPay`,
    success: function (res) {
      let { code, data, msg } = res
      if (code == 0) {
        if (!data.nextStep) {
          ajax({
            type: 'GET',
            url: `${productUrl}/client-api/v1/create-customer-portal-session`,
            success: function (ress) {
              if (ress.code == 200) {
                if (memberPlanName) {
                  document.getElementById('SubscribeLoading').style.display = 'none'
                }
                window.location.href = ress.data
              } else {
                MsgBox.init(msg, 1000)
              }
            },
          })
        } else {
          ajax({
            type: 'POST',
            url: `${productUrl}/thirdparty-api/create-order`,
            param: {
              skuId: val,
            },
            success: function (res1) {
              ajax({
                type: 'POST',
                url: `${productUrl}/thirdparty-api/order/create-payment`,
                param: {
                  orderId: res1.data.order.id,
                },
                success: function (ress) {
                  let { code, data, msg } = ress
                  if (code == 200) {
                    let stripe = Stripe(ress.data.pkKey)
                    let sessionId = ress.data.sessionId
                    stripe.redirectToCheckout({
                      sessionId: sessionId,
                    })
                      .then(handleResult)
                  } else {
                    document.getElementById('SubscribeLoading').style.display = 'none'
                    if (membershipIsPc) {
                      document.getElementById('Subscribe').classList.remove('noClick')
                    }
                    MsgBox.init(msg, 1000)
                  }

                  console.log(ress)
                },
              })
            },
          })
        }
      } else {
        MsgBox.init(msg, 1000)
      }
    },
  })

}
//查询状态
function findRetentionStrategy() {
  ajax({
    type: 'POST',
    url: `${productUrl}/member/v1/info/findRetentionStrategy`,
    success: function (res) {
      let { code, data, msg } = res;
      if (code == 0) {
        isRedeem = data?.redeem
        memberType = data?.type
        if (data?.type == 1) {//未领取优惠券
          couponId = data.couponId
          $('#cancelBox .cancelBox-tit').text(`${data.title}`)
          $('#cupon-des').text(`${data.desc}`)
          $('#cancelBox .u-money').text(`${data.val}`)
          $('#cancelBox .cancel-redeem').text(`${data.button1Text}`)
          $('#cancelBox .cancel-btn').text(`${data.button2Text}`)
        } else if (data?.type == 2) { //领取成功未使用
          $('#notUseBox .cancelBox-tit').text(`${data.title}`)
          $('#notUseBox-des').text(`${data.desc}`)
          $('#notUseBox .u-money').text(`${data.val}`)
          $('#notUseBox .cancel-redeem').text(`${data.button1Text}`)
          $('#notUseBox .cancel-btn').text(`${data.button2Text}`)
        } else {//纯挽留
          $('#u-retention .cancelBox-tit').text(`${data?.title}`)
          $('.retention-des').text(`${data?.desc}`)
        }
      }
    },
  });
}
//退订触发弹窗
function unsubscribeTrigger() {
  document.getElementById('fb-subscription').style.display = 'none'
  // document.getElementById('unsubscribeConfirmation-outside').style.display = 'block'
  document.getElementById('cancelConfirm').style.display = 'block'
  if (memberType == 1) {
    document.getElementById('cancelBox').style.display = 'flex'
    $(".preferential-box").css('display', 'flex')
  } else if (memberType == 2) {
    $(".preferential-box").css('display', 'none')
    document.getElementById('notUseBox').style.display = 'flex'

  } else {
    document.getElementById('u-retention').style.display = 'flex'
    $(".preferential-box").css('display', 'none')

  }

}

