
$(function () {
    const playAllVideoDialog = {
        init: function() {
            if($('.js-open-videodialog[data-type="playvideo"]').length > 0) {
                $('.js-open-videodialog[data-type="playvideo"]').css('display', 'block')
                this.event()
            } else {
                return false
            }
        },
        event: function() {
            // $('body').on('click', '#insta-feed', function(e) {

            // })
            $('body').on('click', '.js-open-videodialog[data-type="playvideo"]', function(e) {
                e.preventDefault()
                let videourl = $(this).attr('data-videourl')
                if(!videourl) {
                    return false
                }
                $('#js-trigger-video').attr('src', videourl)
                $('#all-page-playVideo').show()
                $('#js-trigger-video').trigger('play')
                document.body.style.overflow = "hidden";
            })
            $('body').on('click', '#all-page-colsePlay', function(e) {
                e.preventDefault()
                $('#js-trigger-video').trigger('pause')
                $('#all-page-playVideo').hide()
                document.body.style.overflow = "auto";
            })
            if(window.navigator && window.navigator.userAgent) {
                if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                    $('#js-trigger-video').on('webkitbeginfullscreen', function() {
                    }).on('webkitendfullscreen', function() {
                        $('#js-trigger-video').trigger('pause')
                        $('#all-page-playVideo').hide()
                        document.body.style.overflow = "auto";
                    })
                }
            }
        }
    }
    playAllVideoDialog.init()
})