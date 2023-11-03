$(function () {
    $('.js-fb-addImage').show()
    $('button').attr('disabled', false)
    const fbBecomeHost = {
        data: null,
        step: null,
        localFileList: [],
        apiloadList: [],
        images: [],
        fdStepOne: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: ""
        },
        nextStep: {
            detail: "",
            state: "",
            city: "",
            unit: "",
            zip_code: ""
        },
        dataObj: {},
        loading: false,
        init: function () {
            this.event()
            this.verification()
        },
        uploadFile: function (imgSrc, name) {
            let _this = this
            $(".js-fb-addImage").before(`<li class="fb-img-local">
                    <div class="fb-loacl-src"><img src="${imgSrc}" alt=""></div>
                    <img  data-imgsrc="${imgSrc}" alt="${name}"   class="fb-loacl-close js-clear-hostimg" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/close_1881a5a1-b70c-4b3f-8155-8a8c099b6cee.png?v=1656495596" />
                </li>`)
            return true
        },
        uploadImags: function (_clickthis) {
            let _this = this
            let imgAPi = `https://api.freebeatfit.com/api-shop/showroom/files/upload`;
            // let imgAPi = "//192.168.1.109:3323/api-shop/showroom/files/upload"
            let formData = new FormData()
            
            _this.apiloadList.forEach(file => {
                formData.append('files', file);
            })
            fetch(imgAPi, {
                method: "POST",
                headers: {
                    // "X-Staging-Branch": "dev"
                },
                body: formData
            }).then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.code === 0) {
                    _this.images = data.data.urls
                    _this.dataObj = Object.assign(_this.dataObj, {images: _this.images})
                    this.submitFormFun(_clickthis)
                } else {
                    MsgBox.init(data.msg, 4000)
                    _this.loading = false
                    _clickthis.attr("disabled", false)
                }
            }).catch((error) => {
                // MsgBox.init('Failed to upload pictures', 4000)
                _this.loading = false
                _clickthis.attr("disabled", false)
            })
        },
        submitFormFun: function (_clickthis) {
            let _this = this
             let formApi = `https://api.freebeatfit.com/api-shop/showroom/application/submit`;
            // let formApi = "//192.168.1.109:3323/api-shop/showroom/application/submit"
            fetch(formApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // "X-Staging-Branch": "dev"
                },
                body: JSON.stringify(_this.dataObj)
            }).then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.code === 0) {
                    MsgBox.init('success', 2000)
                    _this.loading = false
                    _clickthis.attr("disabled", false)
                    window.location.href = "/pages/become-a-host-submit"
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
        convertFileToBase64: function (file,name) {
            let _this = this
            return new Promise((resolve, reject) => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = () => resolve(reader.result);
               reader.onerror = reject;
             }).then((picture64) => {
                _this.localFileList.push({ file: file, imgSrc: picture64 })
                _this.uploadFile(picture64, name)
            }).catch((error)=> {
                 console.log("error", error)
            })
        }, 
        verification: function () {
              // delet vaild
            $('input:text').change(function () {
                $(this).nextAll('.fb-invalid-feedback').hide()
                $(this).removeClass("is-invalid")
            });
            $('.pleasSpecify-input').change(function () {
                $(this).next('.fb-invalid-specify').hide()
                $(this).removeClass("is-invalid")
            });
            $('input:file').change(function () {
                $('.upload-img-box').find('.fb-invalid-feedback').hide()
            });
            $('select').change(function () {
                $(this).next('.fb-invalid-feedback').hide()
                $(this).removeClass("is-invalid")
            });
            $("#fb-workout-check-group").find('input:checkbox').change(function () {
                $('#fb-workout-check-group .fb-invalid-feedback').hide()
            });
            $("#fb-involved-check-group").find('input:checkbox').change(function () {
                $('#fb-involved-check-group .fb-invalid-feedback').hide()
            });
        },
        event: function () {
            let _this = this
            $('#fbUploadImage').change(function (e) {
                let fileList = e.target.files
                if (fileList) {
                    _this.apiloadList.push(fileList[0])
                    if (_this.apiloadList.length === 6) {
                        $('.js-fb-addImage').hide()
                    }
                    _this.convertFileToBase64(fileList[0], e.target.files[0].name)
                   
                }
            });
            $('body').on('click', '.js-clear-hostimg', function (e) {
                let imgsrc = $(this).attr('data-imgsrc')
                let indexNumber = 0
                _this.localFileList.forEach((item, index) => {
                    if (item.imgSrc === imgsrc) {
                        indexNumber = index
                    }
                })
                _this.localFileList.splice(indexNumber, 1);
                _this.apiloadList.splice(indexNumber, 1)
                if (_this.apiloadList.length < 6) {
                    $('.js-fb-addImage').show()
                }
                $(this).parents('.fb-img-local').remove();
            });
            // change xbile 

            $('#interestedFbt').change(function () {
                let value = $(this).children('option:selected').val();
                if (value == 'xbike') {
                    $('.fb-xbike-like').removeClass('fb-hide-like')
                    $('.fb-common-like').addClass('fb-hide-like')
                } else {
                    $('.fb-xbike-like').addClass('fb-hide-like')
                    $('.fb-common-like').removeClass('fb-hide-like')
                }
            })
           
            $('.js-host-continue').click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                _this.fdStepOne.first_name = $.trim($('#first_name').val())
                _this.fdStepOne.last_name = $.trim($('#last_name').val())
                _this.fdStepOne.email = $.trim($('#email').val())
                _this.fdStepOne.phone_number = $.trim($('#phone_number').val())
                // phone_number
                let isok = true
                Object.keys(_this.fdStepOne).forEach((key) => {
                    let name = $(`#${key}`)
                    if (!_this.fdStepOne[key]) {
                        $(name).addClass("is-invalid")
                        $(name).next('.fb-invalid-feedback').show().html('This field is required!')
                        isok = false
                    } else {
                        $(name).removeClass("is-invalid")
                        $(name).next('.fb-invalid-feedback').hide()
                    }
                })
                let szReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
                // let ten = /^[0-9]{10}$/
                let intnumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ ]*[-s./0-9]{6,}$/ 
                if (_this.fdStepOne.email && !szReg.test(_this.fdStepOne.email)) {
                    $('#email').addClass("is-invalid")
                    $('#email').next('.fb-invalid-feedback').show().html("Please enter a valid email address.")
                    isok = false
                }

                if (_this.fdStepOne.phone_number && !intnumber.test(_this.fdStepOne.phone_number)) {
                    $('#phone_number').addClass("is-invalid")
                    $('#phone_number').next('.fb-invalid-feedback').show().html("Please enter a valid ten digit U.S. phone number.")
                    isok = false
                }
                if (!isok) {
                    return false
                }
                $('.js-become-host-one').addClass('fb-hide-next')
                $('html, body').animate({ scrollTop: 0 }, 500);
                $('.js-next-application').removeClass('fb-hide-next')
            });
            //  adress go
            $("#address").change(function () {
                $('.js-address-show').css('display', 'block')
            });
            $('.js-host-submit').click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                let _clickthis = $(this)
                if(_this.loading) {
                    return false
                }
                $(this).attr("disabled", true)
                _this.loading = true
                
                let isok = true
                _this.nextStep.detail = $.trim($('#address').val())
                if (!_this.nextStep.detail) {
                    $('#address').addClass("is-invalid")
                    $(".js-address-combin").find('.fb-invalid-feedback').show().html('This field is required!')
                    isok = false
                } else {
                    $("#address").removeClass("is-invalid")
                    $(".js-address-combin").find('.fb-invalid-feedback').hide()
                }
                _this.nextStep.unit = $.trim($('#unit').val())
                _this.nextStep.city = $.trim($('#city').val())
                _this.nextStep.zip_code = $.trim($('#zip_code').val())
                _this.nextStep.state = $('#state option:selected').val()
                let selectArry = []
                $('.js-select-text').each(function () {
                    let answer = $(this).find('option:selected').val()
                    let question = $(this).prev("label").text()
                    let noRequired = $(this).attr("data-norequired")
                    if (noRequired != 'true' && (!answer || answer.indexOf("Select")!= -1)) {
                        $(this).addClass("is-invalid")
                        $(this).next('.fb-invalid-feedback').show()
                        isok = false
                    } else {
                        $(this).removeClass("is-invalid")
                        $(this).next('.fb-invalid-feedback').hide()
                    }
                    selectArry.push({ question: question, answer: answer })
                })
                // start
                let workoutAnswer = []
                let workoutGroupObj = {
                    question: $('#fb-workout-check-group').attr('data-question'),
                    answer: ''
                }
                $("#fb-workout-check-group").find('input[name="workout-checkbox"]:checked').each(function () {
                    let textString = $(this).next('label').text()
                    if($(this).attr("id") == 'pleas-specify') {
                        let specifyVal = $.trim($('.pleasSpecify-input').val())
                        if(!specifyVal) {
                            isok = false
                            $('.pleasSpecify-input').addClass('is-invalid')
                            $('.pleasSpecify-input').next('.fb-invalid-specify').show()
                        } else {
                            textString = textString + specifyVal
                            $('.pleasSpecify-input').removeClass('is-invalid')
                            $('.pleasSpecify-input').next('.fb-invalid-specify').hide()
                        }
                    }
                    workoutAnswer.push(textString)
                    
                });
                if (!workoutAnswer.length) {
                    isok = false
                    $('#fb-workout-check-group .fb-invalid-feedback').show()
                } else {
                    $('#fb-workout-check-group .fb-invalid-feedback').hide()
                    workoutGroupObj.answer = workoutAnswer.join(',')
                    selectArry.push(workoutGroupObj)
                }
                // end

                // start 
                let involvedAnswer = []
                let involvedGroupObj = {
                    question: $('#fb-involved-check-group').attr('data-question'),
                    answer: ''
                }
                $("#fb-involved-check-group").find('input[name="involved-checkbox"]:checked').each(function () {
                    involvedAnswer.push($(this).next('label').text())
                });
                if (!involvedAnswer.length) {
                    isok = false
                    $('#fb-involved-check-group .fb-invalid-feedback').show()
                } else {
                    $('#fb-involved-check-group .fb-invalid-feedback').hide()
                    involvedGroupObj.answer = involvedAnswer.join(',')
                    selectArry.push(involvedGroupObj)
                }
                // end
                if(!_this.apiloadList.length) {
                    isok = false
                    $('.upload-img-box').find('.fb-invalid-feedback').show()
                } else {
                    $('.upload-img-box').find('.fb-invalid-feedback').hide()
                }
                if(!isok) {
                    MsgBox.init('Please check the field!', 2000)
                    $(this).attr("disabled", false) 
                    _this.loading = false
                    return false
                }
                // start
                let explainObj = { question: $("#explain").prev('label').text(), answer: $("#explain").val() }
                // end
                selectArry.push(explainObj)
                // social meidia name
                let socialmeidaname = { question: $("#socialmediausername").prev('label').text(), answer: $("#socialmediausername").val() }
                selectArry.push(socialmeidaname)

                _this.dataObj= {..._this.dataObj, ..._this.fdStepOne, ..._this.nextStep}
                _this.dataObj = Object.assign(_this.dataObj, {qas: selectArry})
                _this.uploadImags(_clickthis)
            })
        }
    }
    fbBecomeHost.init()
})