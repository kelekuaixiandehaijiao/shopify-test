
// 获取登录信息
const  FrienBuyLoginInfo = JSON.parse(sessionStorage.getItem("_fri_login_user") || null)
if((window.location.pathname == '/pages/refer-invite' || window.location.pathname == '/pages/refer-withdraw') && !FrienBuyLoginInfo) {
    window.location.href='/pages/refer'
}
let fbheaderPathName = window.location.origin
let fbpath = 'https://api.freebeatfit.com'
// 为1时为接口还未成功  2为接口请求成功，为符合条件的IP地址  3为接口请求成功，但不是符合条件的IP地址
let canShowAnim = 1


const  headers = {
    'Content-Type':'application/json',
    'Accept':'application/json'
}
$(function(){
    const friendbuy = {
        friUserInfo: {
            name: '',
            email: ''
        },
        _termDialog: $('.fri-terms-dialog'),
        _shareDialog: $('.fri-share-discount'),
        _shareEmail:  $('.js-share-email'),
        isSharelock: false,
        init: function (){
            this.event()
            $('.start-earning-text').fadeTo(1, 0)
            $('.view-rewards').fadeTo(1, 0)
            // this.getAuth()
            this.swiper()
            this.openShareDialog() //打开分享弹窗
            this.startCountryCheck()
            this.startAnim()
            console.log('startCountryCheck init' )
            // this.openPaypalDialog() //打开提款弹窗
              //copy功能
        },
        copyCode: function () {
            let _this = this
            try {
                const btnclick = new ClipboardJS('.js-fri-copyurl');
                // setCookie("discount_code", "")
                btnclick.on('success', function (e) {
                    MsgBox.init('copied!', 2000)
                    e.clearSelection();
                });
                btnclick.on('error', function (e) {
                    MsgBox.init('Copy to clipboard failed.', 2000)
                    e.clearSelection();
                });
            } catch {
                console.log("copy bad")
            }

        },
        event: function () {
            let _this = this
            // 控制input取消样式
            $('input:text').change(function () {
                $(this).nextAll('.fb-invalid-feedback').hide()
                $(this).removeClass("is-invalid")
            });
            $('.js-fri-submitemail').click(function() {
                if (canShowAnim == 3) {
                    MsgBox.init("It's limited to participation in North America.")
                    return
                }
                _this.friUserInfo.name = $.trim($('#fri_user_name').val())
                _this.friUserInfo.email = $.trim($('#fri_email').val())
                let isok = true
                if(!_this.friUserInfo.name) {
                    MsgBox.init('Please enter your name', 2000)
                    // $('#fri_user_name').addClass("is-invalid")
                    // $('#fri_user_name').next('.fb-invalid-feedback').show().html("Please enter name")
                    // isok = false
                    return false
                }
                if (!_this.friUserInfo.email) {
                    MsgBox.init('Please enter a valid email address', 2000)
                    // $('#fri_email').addClass("is-invalid")
                    // $('#fri_email').next('.fb-invalid-feedback').show().html("Please enter a valid email address.") 
                    // isok = false
                    return false
                }
               
                // if(!isok) {
                //     return false
                // }
                fetch(`${fbpath}/v1/event/account-sign-up`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: _this.friUserInfo.email,
                        customerId: _this.friUserInfo.email,
                        firstName: _this.friUserInfo.name,
                        lastName: ""
                })
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    _this.isSharelock = false
                    let { code, data, msg } = res
                    if (code == 200) {
                    //   MsgBox.init('login successful', 2000)
                        // friendbuyAPI.push([
                        //     "track",
                        //     "sign_up",
                        //     {
                        //         id: _this.friUserInfo.email,
                        //         email: _this.friUserInfo.email,
                        //         name: _this.friUserInfo.name
                        //     }
                        // ]);
                      sessionStorage.setItem("_fri_login_user", JSON.stringify(_this.friUserInfo));
                      window.location.href= "/pages/refer-invite"
                    } else {
                        MsgBox.init(msg, 2000)
                    }
                })
                // lockBody()
                // _this._shareDialog.show()
              
            })
            $('.js-open-termdialog').click(function() {
                lockBody()
                $('.fri-dialog-container').hide()
                _this._termDialog.show()
                // _this._paypalDialog.show()
            })
            $('.js-close-terms').click(function() { 
                autoBody()
                _this._termDialog.hide()
                // _this._paypalDialog.hide()
            })
         
        },
        startCountryCheck: function() {
            console.log('startCountryCheck')
            fetch(`${fbpath}/v1/event/verifyCountry`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                console.log('startCountryCheck  111' +res)
                return res.json();
            }).then(function (res) {
                console.log('startCountryCheck  222' +res)
                let { code, data, msg } = res
                if (code == 200) {
                  canShowAnim = 2
                } else {
                    canShowAnim = 3
                    // MsgBox.init(msg, 2000)
                }
            })
        },
        startAnim: function() {
            console.log('canshowanim 0')
            let _this = this
            if(canShowAnim == 1) {
                console.log('canshowanim 1')
                $('.start-earning').fadeTo(1000, 0.2)
                $('.start-earning').fadeTo(1000, 1, function () {
                    _this.startAnim()
                })
                return
            }
            if (canShowAnim == 2) {
                console.log('canshowanim 2')
                $('.start-earning').fadeTo(1000, 0.2)
                $('.start-earning').fadeTo(1000, 1)
                $('.start-earning-text').fadeTo(1000, 0)
                $('.start-earning-text').fadeTo(1000, 1)
                $('.view-rewards').fadeTo(1000, 0)
                $('.view-rewards').fadeTo(1000, 1)
                return
            }
            if (canShowAnim == 3) {
                $('.start-earning').fadeTo(1000, 0.2)
                $('.start-earning').fadeTo(1000, 0.5)
                $('.start-earning-text').fadeTo(1000, 0)
                $('.start-earning-text').fadeTo(1000, 0.5)
                $('.view-rewards').fadeTo(1000, 0)
                $('.view-rewards').fadeTo(1000, 0.5)
                console.log('canshowanim 3')
            }
            
        },
        // 打开分享弹窗
        openShareDialog: function () {
            let _this = this
            let shortData = null
            // if(!FrienBuyLoginInfo) {
            //     MsgBox.init('Please login first', 1000)
            //     return false
            // }
           
            $(document).on('click', '.invite-common', function(){
                lockBody()
                _this._shareDialog.show()
        
                fetch(`${fbpath}/v1/personal-referral-link`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: FrienBuyLoginInfo.email,
                        firstName: FrienBuyLoginInfo.name || '',
                        lastName: ""
                    }),
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    let { code, data, msg } = res
                    if (code == 200) {
                        shortData = data
                       $('.js-fri-copyurl').attr('value', data.link)
                       $('.js-fri-copyurl').attr('data-clipboard-text', data.link)
                       _this.copyCode()
                    } else {
                        MsgBox.init(msg, 2000)
                    }
                });
            })
            $('.js-close-share').click(function() { 
                autoBody()
                _this._shareDialog.hide()
            })
            $('.js-fb-share-app').click(function () {
                if(!shortData) {
                    MsgBox.init('Please try again', 2000)
                    return false
                }
                let _link = shortData.link.split('?share=')[0]
                let type = $(this).attr('data-type')
                let desc = $(this).attr('data-desc') 
                let mess = ""
                if(desc) {
                    mess = desc
                } else {
                    mess =  $('.fb-share-textarea p').text()
                    mess = mess.replace("\"","").replace("\"","")
                }
                fbShareApp(type, _link, mess)
            })
            $('#fb-share-email-submit').click(function() {
                if(!shortData) {
                    MsgBox.init('Please try again', 2000)
                    return false
                }
                let shareEmail = $.trim(_this._shareEmail.val())
                // let shareContent = $.trim($('.fb-share-textarea').val())
                // if (!shareEmail) {
                //     _this._shareEmail.addClass("is-invalid")
                //     MsgBox.init('Please enter a valid email address', 1500)
                //     // _this._shareEmail.next('.fb-invalid-feedback').show().html("Please enter a valid email address") 
                //     return false
                // }
                if(_this.isSharelock) {
                    return false
                }
                _this.isSharelock = true

                fetch(`${fbpath}/blackfriday/sendShareMessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: shareEmail,
                        name: FrienBuyLoginInfo.name,
                        url: shortData.link,
                        content: $('.fb-share-textarea p').text()
                       
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    _this.isSharelock = false
                    let { code, data, msg } = res
                    if (code == 200) {
                      MsgBox.init('Send successfully', 2000)
                      window.location.reload()
                    } else {
                        MsgBox.init(msg, 2000)
                    }
                })
            })

            
        },
        swiper: function(){
            // effect: 'fade',
            let swiperName = '.fbFriendbuyActive'
            const swiperSingleGoods = new Swiper(swiperName, {
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                direction: 'vertical',
                loop: true,
                parallax : true,
                reverseDirection: true,
                on: { 
                }
            }); 
        }
    }
    friendbuy.init()
   
})
