const MsgBox = {
    timer1: null,
    timer2: null,
    _html: '',
    ishow: false,
    init: function(msg, time) {
        if(this.ishow) {
            return false
        }
        this.ishow = true
        if($('#markt-hotal').length > 0) {
            $('#markt-hotal').remove()
        }
        this.GenerateHtml(msg, time)
    },
    GenerateHtml: function(msg,time) {
        this._html = `<div id="markt-hotal">
            <div class="markt-toast_box">
                <p id="market-toast">${msg}</p>
            </div>
        </div>`
        $("body").append(this._html);
        this.event(time)
    },
    event: function (time) {
        let _this = this
        $('.markt-toast_box').css({ display: 'inline-block'} )
        _this.timer1 = setTimeout(function(){
            // $('.markt-toast_box').css({animation: 'markethide 1.5s'} )
            _this.timer2 = setTimeout(function(){
                $('.markt-toast_box').css({ display: 'none'} )
                _this.ishow = false
                clearTimeout(_this.timer2)
                _this.timer1 && clearTimeout(_this.timer1)
            }, 1400)
        }, time)  
    }

}