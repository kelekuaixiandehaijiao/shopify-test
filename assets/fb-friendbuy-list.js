$(function () {
    let arr = []
    let currentIndex = 0
    $('.buy_list_text').each(function (i) {
        $(this).click(function () {
            if (arr[i]) {
                $('.buy_list_desc').eq(i).css("height", "0px");
                $('.fb-tw-absolute').eq(i).css("transform", "rotate(360deg)")
                arr[i] = false;
            } else {
                $('.buy_list_desc').eq(i).css("height", "auto");
                $('.fb-tw-absolute').eq(i).css("transform", "rotate(180deg)")
                arr[i] = true;
            }
        })
    })


    // $('.buy_list_text').click(function() {
    //     console.log("this",$(this).index())
    //     $(this).find('.tw-absolute')
    // })
})
