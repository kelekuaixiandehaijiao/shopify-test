
$(function () {

    const withdraw = {
        loginInfo: JSON.parse(sessionStorage.getItem("_fri_login_user"))||{ 'email': '', 'name': '' },
        _paypalDialog: $('.fri-paypal-dialog'),
        _paypalDialog1: $('#fri-paypal-dialog1'),
        _paypalDialog2: $('#fri-paypal-dialog2'),
        _paypalDialog3: $('#fri-paypal-dialog3'),

        // _paypalCode: $('#fb_enter_paypal_email'),

        cashEmail: null,
        isPayLock: false,
        currentNum: 60,
        curEmail: null,
        ensureEmail: null,
        flag: false,
        timer: null,
        bonusInfo: {},
        ResponsePath: '',
        
        init: function () {
            this.getInfo()
            this.openPaypalDialog()
        },
        getInfo() {
            let headerPathName = window.location.origin
            let _this = this
            let firstInit = true
            _this.path = 'https://api.freebeatfit.com'
            // if (headerPathName == 'https://www.freebeatfit.com') {
            //     _this.path = 'https://api.freebeatfit.com'
            // } else {
            //     _this.path = 'https://staging-api.freebeatfit.com'
            // }
            
            var oneList = []
            var twoList = [];
            let inviteSrc = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/freebeatlogo.png?v=1668104446'
            let defaultSrc = 'https://cdn.shopify.com/s/files/1/0592/3766/2905/files/Group_197_2x_3c0c59cb-2d8c-4eb4-b68f-e21496bd719a.png?v=1667738853'
            var wrapper_first = document.getElementById('invite-box-list-first');
            var wrapper_two = document.getElementById('invite-box-list-two');
            fetch(`${_this.path}/blackfriday/user-reward?email=${this.loginInfo.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                let { code, data, msg } = res
                if (code == 200) {
                    _this.bonusInfo = data
                    $('#cashBonus').text(`$${data.totalBonus}`)
                    $('#frozenBonus').text(`$${data.frozenBonus}`)
                    $('#totalBonus').text(`$${data.totalBonus}`)
                    $('#availableBonus').text(`$${data.availableBonus}`)
                } else {
                    if (!firstInit) {
                        MsgBox.init(msg, 1000)
                    }
                    firstInit = false
                }
            });
            fetch(`${_this.path}/v1/analytics/mergeFriendBugInfo?email=${this.loginInfo.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                let { code, data, msg } = res
                if (code == 200) {
                    oneList = data.emailList.slice(0, 5) || []
                    twoList = data.purchaseList.slice(0, 12) || [];

                } else {
                    MsgBox.init(msg, 1000)
                }
                let oneNum = 5 - (oneList.length >= 5 ? 5 : oneList.length)
                let twoNum = 12 - (twoList.length >= 12 ? 12 : twoList.length)

                let obj = { "email": "", }
                for (let i = 0; i < oneNum; i++) {
                    oneList.push(obj)
                }
                for (let i = 0; i < twoNum; i++) {
                    twoList.push(obj)
                }
                //方案二
                // oneArr=new Array(5).fill({ "email": "", });
                // twoArr=new Array(12).fill({ "email": "", });
                // oneList.forEach((item, index) => {
                //     oneArr[index] = item;
                //   });
                //   twoList.forEach((item, index) => {
                //     twoArr[index] = item;
                //   });
                //   oneList = oneArr;
                //   twoList=twoArr
               
                if (wrapper_first) {
                    oneList.forEach((item, i) => {
                        if (item.email !== '') {
                            wrapper_first.innerHTML += `<img class='invite-box-icon invite-box-common' src="${inviteSrc}" alt="img">`
                        } else {
                            wrapper_first.innerHTML += `<img class='invite-box-icon invite-box-common invite-common' src="${defaultSrc}" alt="img">`
                        }
                    })
                }
                if (wrapper_two) {
                    twoList.forEach((item, i) => {
                        if (item.email !== '') {
                            wrapper_two.innerHTML += `<img class='invite-box-icon swiper-slide' src="${inviteSrc}" alt="img">`
                        } else {
                            wrapper_two.innerHTML += `<img class='invite-box-icon swiper-slide invite-common' src="${defaultSrc}" alt="img">`
                        }
                    })
                }
            }).catch(()=>{
                let oneNum = 5 
                let twoNum = 12

                let obj = { "email": "", }
                for (let i = 0; i < oneNum; i++) {
                    oneList.push(obj)
                }
                for (let i = 0; i < twoNum; i++) {
                    twoList.push(obj)
                }
                if (wrapper_first) {
                    oneList.forEach((item, i) => {
                        wrapper_first.innerHTML += `<img class='invite-box-icon invite-box-common invite-common' src="${defaultSrc}" alt="img">`
                    })
                }
                if (wrapper_two) {
                    twoList.forEach((item, i) => {
                        wrapper_two.innerHTML += `<img class='invite-box-icon swiper-slide invite-common' src="${defaultSrc}" alt="img">`
                    })
                }
            });
            $(".fb-with-card-invite .u-btn").attr('href', `${headerPathName}/pages/refer-withdraw`);
            $(".with-card-name #userName").text(this.loginInfo.name);

        },
        //打开提款弹窗
        openPaypalDialog: function () {
            let _this = this
            $('.buy_paypal_email').text(_this.loginInfo.email)
            $(".fb-with-card .u-btn").click(function () {
                _this.currentNum = 60
                _this.flag = false
                $('.buy_paypal_code input').val('')
                $('.buy_paypal_seconds').text(_this.currentNum)
                lockBody()
                $('.buy_paypal_price').text(`$${_this.bonusInfo.availableBonus}`)
                _this._paypalDialog1.show()
            })

            $("#fb-sendCode").click(function () {

                if (_this.flag) return false
                _this.currentNum = 60
                console.log(_this.flag,'zzhzhizh')
                $('.buy_paypal_seconds').text(_this.currentNum)
                _this.timer = setInterval(function () {
                    if (_this.currentNum == 0) {
                        clearInterval(_this.timer);
                        _this.currentNum = 60;
                        return false
                    }
                    _this.currentNum--;
                    
                    // console.log(_this.currentNum, '最终的值')
                    if (_this.currentNum <= 0) {
                        _this.flag = false
                    } else {
                        _this.flag = true
                    }
                    $('.buy_paypal_seconds').text(_this.currentNum)
                }, 1000);
                fetch(`${_this.path}/blackfriday/sendVerifyEmail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: _this.loginInfo.email,
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    let { code, data, msg } = res
                    if(code==200){
                        _this.flag = true
                        // MsgBox.init(msg, 1000)
                        MsgBox.init('Send successfully', 1000)
                    }else{
                        _this.flag = false
                        $('.buy_paypal_seconds').text(_this.currentNum)
                        clearInterval(_this.timer);
                        _this.currentNum = 60
                        // MsgBox.init(msg, 1000)
                        MsgBox.init('Send successfully', 1000)
                    }
                   
                });
                // lockBody()

                // _this._paypalDialog2.show()
            })
            $('.fb-confirm-email .fb_confirm_confirm').click(function () {
                lockBody()
                $('.paypal_success_price').text(`$${_this.bonusInfo.availableBonus}`)
            })
            $('#paypal_confirm_submit').click(function () {
                $('#fb_enter_paypal_email').text(_this.loginInfo.email)
                $('.fb_confirm_home_price').text(`$${_this.bonusInfo.availableBonus}`)
                console.log($('.buy_paypal_code input').val(),'zhizhi')
                _this.cashEmail = $.trim($('.buy_paypal_code input').val())
                if( _this.cashEmail==''){
                    MsgBox.init('Verification code cannot be left blank.', 1000)
                    return false
                }
                fetch(`${_this.path}/blackfriday/verifyEmailCode`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: _this.loginInfo.email,
                        code: _this.cashEmail
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    let { code, data, msg } = res
                    if (code == 200) {
                        _this._paypalDialog1.hide()
                        _this._paypalDialog2.show()
                    } else {
                        MsgBox.init(msg, 1000)
                    }
                    _this.flag = false
                    _this.currentNum = 60
                    $('.buy_paypal_seconds').text(_this.currentNum)
                    clearInterval(_this.timer);
                });
                clearInterval(_this.timer);
            })
            $('#confirm_email_submit').click(function () {
                _this.curEmail = $.trim($('#fb_enter_paypal_email').val())
                _this.ensureEmail = $.trim($('#fb_confirm_paypal_email').val())
                if ((_this.curEmail !== _this.ensureEmail)) {
                    MsgBox.init('The information you entered does not match.', 1000)
                    return false
                }
                if (_this.curEmail == '' || _this.ensureEmail == '') {
                    MsgBox.init('Email cannot be left blank.', 1000)
                    return false
                }
                if (_this.isPayLock) {
                    return false
                }
                if (!_this.bonusInfo.availableBonus) {
                    MsgBox.init("No amount can be reflected temporarily", 1000)
                    return false
                }
                _this.isPayLock = true
                fetch(`${_this.path}/blackfriday/apply-reward`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: _this.loginInfo.email,
                        beneficiaryEmail: _this.ensureEmail,
                        amount: _this.bonusInfo.availableBonus
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (res) {
                    _this.isPayLock = false
                    let { code, data, msg } = res
                    if (code == 200) {
                        $('#up-Money').text(`$${_this.bonusInfo.availableBonus}`)
                        let email = _this.ensureEmail.slice(0, 1) + '***' + _this.ensureEmail.slice(-(_this.ensureEmail.length - _this.ensureEmail.indexOf('@')))
                        $('.paypal_success_con .paypal_success_email').text(email)
                        _this._paypalDialog2.hide()
                        _this._paypalDialog3.show()
                    } else {
                        MsgBox.init(msg, 1000)
                    }

                });
    
                $('#fb_enter_paypal_email').val('')
                $('#fb_confirm_paypal_email').val('')

                // let reg=/^\w+@[a-z0-9]+\.[a-z]+$/i
                // if(reg.test(_paypalCode.value)){
                //     _this._paypalDialog2.hide()
                //     _this._paypalDialog3.show()
                // }else{
                //     MsgBox.init('Please enter a valid email', 1000)
                //     return false
                // }

            })
            $('#get_more_cash').click(function(){
                $('#ri-paypal-dialog3').hide()
                let headerPathName = window.location.origin
                $(".paypal_success_cash .u-submit").attr('href', `${headerPathName}/pages/refer-invite`);

            })
            $('.js-close-paypal').click(function () {
                clearInterval(_this.timer);
                autoBody()
                _this._paypalDialog.hide()
                window.location.reload()
            })
        }
    }
    withdraw.init()

})