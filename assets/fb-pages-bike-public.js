$(function() {
        const savingsCalcu = {
            peopleMaxNumber: 10,
            weekMaxNumber: 7,
            curPeoNumber: 2,
            curWeekNumber: 3,
            _showPeoNum: $('.js_savCal_people_number'),
            _showWeekNum: $('.js_savCal_week_number'),
            init: function() {
                this.peopleMaxNumber = parseInt($('.fb-savings-calculator').attr('data-people'))
                this.weekMaxNumber = parseInt($('.fb-savings-calculator').attr('data-week'))
                this._showPeoNum.text('0' + this.curPeoNumber)
                this._showWeekNum.text('0' + this.curWeekNumber)
                this.computedResult(this.curPeoNumber, this.curWeekNumber)
                this.event()
            },
            computedResult: function(people, workout) {
                // let bikePrice = fbGetNumberFromText($('.fb_black_variant_price').text())
                let bikePrice = $('.fb-savings-calculator').attr('data-price')
                bikePrice = parseInt(bikePrice)
                // console.log("bikePrice", bikePrice)
                let klarna = bikePrice / 36;
                let totalCost = bikePrice + (39 * 58.5);
                let weeklyCost = totalCost / 52 / 5;
                let finalOutPut =  (weeklyCost / people / workout).toFixed(2);
                $('.fb_lower_title_block h2').html(`$${finalOutPut}`)
            },
            event: function() {
                let _this = this
                $('.js_upArrow').click(function(){
                    let _numberdom = $(this).attr('data-change')
                    if(_numberdom == 'js_savCal_people_number' && _this.curPeoNumber> 0 && _this.curPeoNumber < _this.peopleMaxNumber) {
                        _this.curPeoNumber += 1 
                        if(_this.curPeoNumber ==  _this.peopleMaxNumber ){
                            $(this).find('.sacCal_used').hide()
                            $(this).find('.sacCal_disabled').show()
                           $(`.${_numberdom}`).text(_this.curPeoNumber)
                        } else {
                            $(this).find('.sacCal_used').show()
                            $(this).find('.sacCal_disabled').hide()
                            $(`.${_numberdom}`).text('0' + _this.curPeoNumber)
                        }
                         _this.computedResult(_this.curPeoNumber, _this.curWeekNumber)
                    }
                    if(_numberdom == 'js_savCal_week_number' && _this.curWeekNumber > 0 && _this.curWeekNumber < _this.weekMaxNumber) {
                        _this.curWeekNumber += 1 
                        if(_this.curWeekNumber ==  _this.weekMaxNumber ){
                            $(this).find('.sacCal_used').hide()
                            $(this).find('.sacCal_disabled').show()
                        } else {
                            $(this).find('.sacCal_used').show()
                            $(this).find('.sacCal_disabled').hide()
                        }
                        $(`.${_numberdom}`).text('0' + _this.curWeekNumber)
                        _this.computedResult(_this.curPeoNumber, _this.curWeekNumber)
                    }
                   
                    $(this).next('.js_downArrow').find('.sacCal_used').show()
                    $(this).next('.js_downArrow').find('.sacCal_disabled').hide()
                })
                $('.js_downArrow').click(function(){
                    let _numberdom = $(this).attr('data-change')
                    if(_numberdom == 'js_savCal_people_number' && _this.curPeoNumber > 1 && _this.curPeoNumber <= _this.peopleMaxNumber) {
                        _this.curPeoNumber -= 1 
                        if(_this.curPeoNumber ==  1 ){
                            $(this).find('.sacCal_used').hide()
                            $(this).find('.sacCal_disabled').show()
                           
                        } else {
                            $(this).find('.sacCal_used').show()
                            $(this).find('.sacCal_disabled').hide()
                        }
                        $(`.${_numberdom}`).text('0' + _this.curPeoNumber)
                         _this.computedResult(_this.curPeoNumber, _this.curWeekNumber)
                    }
                    if(_numberdom == 'js_savCal_week_number' && _this.curWeekNumber> 1 && _this.curWeekNumber <= _this.weekMaxNumber) {
                        _this.curWeekNumber -= 1 
                        if(_this.curWeekNumber ==  1 ){
                            $(this).find('.sacCal_used').hide()
                            $(this).find('.sacCal_disabled').show()
                        } else {
                            $(this).find('.sacCal_used').show()
                            $(this).find('.sacCal_disabled').hide()
                        }
                        $(`.${_numberdom}`).text('0' + _this.curWeekNumber)
                         _this.computedResult(_this.curPeoNumber, _this.curWeekNumber)
                    }
                    $(this).prev('.js_upArrow').find('.sacCal_used').show()
                    $(this).prev('.js_upArrow').find('.sacCal_disabled').hide()
                })
            }
    } 
    savingsCalcu.init()
})
