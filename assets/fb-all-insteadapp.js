$(function () {
    const insteadApp = {
        number: 0,
        insta_feed_load: null,
        init: function () {
            this.instaEvent()
        },
        instaEvent: function () {
            let _this = this
            _this.insta_feed_load = setInterval(()=>{
                if(_this.number > 150) {
                    clearInterval(_this.insta_feed_load);
                }
                _this.number = _this.number + 1
                if ($('#insta-feed h2') && $('#insta-feed h2').length >0){
                    $('#insta-feed h2').html('Follow us on Instagram <a href="https://www.instagram.com/freebeatfit/" target="_blank">@freebeatfit</a>')
                    clearInterval(_this.insta_feed_load);
                }
            }, 1000);
        }
    }
    insteadApp.init()
})