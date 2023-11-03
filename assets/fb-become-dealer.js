$(function () {
    $('.js-fb-addImage').show()
   $('button').attr('disabled', false)
    const fbBecomeDealer = {
        data: null,
        dataObj: null,
        loading: false,
        ischeck: true,
        init: function () {
            this.event()
            this.verification()
        },
        submitFormFun: function (_clickthis) {
            let _this = this
            let formApi = `https://api.freebeatfit.com/gos/data/.BecomeDealer`;
            // let formApi = "http://staging-api.freebeatfit.com/gos/data/.BecomeDealer"
            fetch(formApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(_this.dataObj)
            }).then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.code === 200) {
                    MsgBox.init('Submitted Successfully!', 2000)
                    _this.loading = false
                    _clickthis.attr("disabled", false)
                    window.location.reload()
                } else {
                    MsgBox.init(data.msg, 4000)
                    _this.loading = false
                    _clickthis.attr("disabled", false)
                }
            }).catch((error) => {
                MsgBox.init('Please try again', 4000)
                _this.loading = false
                _clickthis.attr("disabled", false)
            })
        },
        verification: function () {
              // delet vaild
            $('input:text').change(function () {
                $(this).nextAll('.fb-invalid-feedback').hide()
                $(this).removeClass("is-invalid")
            });
            $('select').change(function () {
                $(this).next('.fb-invalid-feedback').hide()
                $(this).removeClass("is-invalid")
            });
        },
        event: function () {
            let _this = this
            $('#dealer_emailNews').change(function(event) {
               if($(this).prop('checked')) {
                $('.dealer-email-check').show()
                $('.dealer-email-nocheck').hide()
               } else {
                $('.dealer-email-nocheck').show()
                $('.dealer-email-check').hide()
               }
            })
            $('.js-dealer-sumbmit').click(function (event) {
                let _clickthis = $(this)
                event.preventDefault();
                event.stopPropagation();
                _this.dataObj = $('#dealer_form').serializeObject()
                if(_this.loading) {
                    return false
                }
                $(this).attr("disabled", true)
                _this.loading = true
                let isok = true
                Object.keys(_this.dataObj).forEach((key) => {
                    let name = $(`#dealer_${key}`)
                    if (!_this.dataObj[key] && name.attr('required')) {
                        $(name).addClass("is-invalid")
                        $(name).next('.fb-invalid-feedback').show().html('This field is required!')
                        isok = false
                    } else {
                        $(name).removeClass("is-invalid")
                        $(name).next('.fb-invalid-feedback').hide()
                    }
                })
                let szReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
                // let intnumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ ]*[-s./0-9]{6,}$/ 
                if (_this.dataObj.email && !szReg.test(_this.dataObj.email)) {
                    $('#dealer_email').addClass("is-invalid")
                    $('#dealer_email').next('.fb-invalid-feedback').show().html("Please enter a valid email address.")
                    isok = false
                }
                // if (_this.dataObj.phoneNumber && !intnumber.test(_this.dataObj.phoneNumber)) {
                //     $('#dealer_phoneNumber').addClass("is-invalid")
                //     $('#dealer_phoneNumber').next('.fb-invalid-feedback').show().html("Please enter a valid ten digit U.S. phone number.")
                //     isok = false
                // }
                if (!isok) {
                    MsgBox.init('Please check the field!', 2000)
                    $(this).attr("disabled", false) 
                    _this.loading = false
                    return false
                }
                let emailNews=$('#dealer_emailNews').prop("checked")
                _this.dataObj = Object.assign(_this.dataObj,{emailNews: emailNews})
                _this.submitFormFun(_clickthis)
            });
        }
    }
    fbBecomeDealer.init()
})