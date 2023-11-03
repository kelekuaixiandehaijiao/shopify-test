function fbOpenHostedInterstitial(url, arg, un, _this) {
    try {
        kmerchant.openHostedInterstitial({ url: url }, arg, un, _this);
    } catch {
        // MsgBox.init('Page loading, please try again', 2000)
    }
}
function fbOpenHostedEligibility(url, _this) {
    try {
        kmerchant.openHostedEligibility({ url: url }, _this);
    } catch {
        // MsgBox.init('Page loading, please try again', 2000)
    }
}
$(function () {
    let fn = function (e) {
        e.preventDefault();
    };
    let is_contact_posted = getQueryString('contact_posted');
    if ($('#notice_button').length > 0 && is_contact_posted && String(is_contact_posted) === 'true') {
        let isShowNotice = $('#notice_button').attr('data-shownotice');
        if (String(isShowNotice) === 'true') {
            $('.replenishment-notice').fadeIn();
        }
    }
    $('body').on('click', '.fir_pop', function (e) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', fn, false);
        $('.gift_charity_cover').fadeIn();
        $('.gift_popup').fadeIn();
    });
    $('body').on('click', '.charity_des', function (e) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', fn, false);
        $('.gift_charity_cover').fadeIn();
        $('.charity_popup').fadeIn();
    });
    $('body').on('click', '.jump', function (e) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', fn, false);
        $('.gift_charity_cover').fadeIn();
        $('.klarnaPopup').fadeIn();
    });
    $('body').on('click', '.close', function (e) {
        document.body.style.overflow = '';
        $('.gift_popup').fadeOut();
        $('.charity_popup').fadeOut();
        $('.klarnaPopup').fadeOut();
        $('.gift_charity_cover').fadeOut();
    });
    $('body').on('click', '.close_button', function (e) {
        document.body.style.overflow = '';
        $('.klarnaPopup').fadeOut();
        $('.gift_charity_cover').fadeOut();
    });
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').on('click', '.gift_charity_cover', function (e) {
            document.body.style.overflow = '';
            $('.gift_popup').fadeOut();
            $('.charity_popup').fadeOut();
            $('.gift_charity_cover').fadeOut();
            $('.gift_charity_cover').fadeOut();
        });
    }

    const productNav = {
        totalHight: 100,
        currentIndex: 1,
        init: function () {
            this.totalHight = getProductMobTop();
            this.event();
        },
        event: function () {
            let _this = this;
            $('.js-product-nav').click(function () {
                // let height= $(this).offsetTop()
                $('.js-product-nav').removeClass('active');
                $(this).addClass('active');
                let index = parseInt($(this).attr('data-index'));
                if (_this.currentIndex == index) {
                    return false;
                }
                _this.currentIndex = index;
                if (index === 1) {
                    $('.fb-klarba-design').show();
                    $('.fb-xbike-comparision-klarna').show();
                    $('#stamped-main-widget').hide();
                    $('.js-online-reviewers').hide();
                    $('.fb-specifical').hide();
                    $('html, body').animate(
                        {
                            scrollTop: $('.fb-klarba-design').offset().top - _this.totalHight,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                } else if (index === 2) {
                    $('.fb-klarba-design').hide();
                    $('.fb-xbike-comparision-klarna').hide();
                    $('#stamped-main-widget').show();
                    $('.js-online-reviewers').show();
                    $('.fb-specifical').hide();
                    if($('.js-online-reviewers').length) {
                        $('html, body').animate(
                            {
                                scrollTop: $('.js-online-reviewers').offset().top - _this.totalHight,
                            },
                            {
                                duration: 500,
                                easing: 'swing',
                            }
                        );
                    }
                   
                } else if (index === 3) {
                    $('.fb-klarba-design').hide();
                    $('.fb-xbike-comparision-klarna').hide();
                    $('#stamped-main-widget').hide();
                    $('.js-online-reviewers').hide();
                    $('.fb-specifical').show();
                    $('html, body').animate(
                        {
                            scrollTop: $('.fb-specifical').offset().top - _this.totalHight,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                }
            });
            $('body').on('click', '.stamped-product-reviews-badge', function (e) {
                // window.location.hash = "#productDdetailnav"
                if ($('.fb-product-detailnav').width() === 0) {
                    $('html, body').animate(
                        {
                            scrollTop: $('#stamped-main-widget').offset().top - 150,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                    return false;
                } else {
                    $('html, body').animate(
                        {
                            scrollTop: $('.fb-product-detailnav').offset().top - 80,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                    $('.js-product-nav').each(function () {
                        let index = parseInt($(this).attr('data-index'));
                        if (index === 2) {
                            _this.currentIndex = index;
                            $(this).addClass('active');
                            $('.fb-klarba-design').hide();
                            $('.fb-xbike-comparision-klarna').hide();
                            $('#stamped-main-widget').show();
                            $('.fb-specifical').hide();
                        } else {
                            $(this).removeClass('active');
                        }
                    });
                    return false;
                }
            });
        },
    };
    if ($('.js-fb-prodcut-detailnav').length > 0) {
        let url = window.location.href;
        let windowSize = window.screen.width;
        if (url.includes('reviews') && windowSize < 768) {
            productNav.currentIndex = 2;
            $('.js-product-nav').eq(1).addClass('active');
            $('.js-product-nav').eq(1).siblings().removeClass('active');
            $('.fb-klarba-design').hide();
            $('.fb-xbike-comparision-klarna').hide();
            $('#stamped-main-widget').show();
            $('.fb-specifical').hide();
            $('html, body').animate(
                {
                    scrollTop: $('#stamped-main-widget').offset().top - 120,
                },
                {
                    duration: 500,
                    easing: 'swing',
                }
            );
        }

        productNav.init();
    }
    // 新版product nav
    const productNavCard = {
        totalHight: 100,
        currentIndex: 1,
        init: function () {
            this.totalHight = getProductMobTop();
            this.event();
        },
        event: function () {
            let _this = this;

            $('.js-product-newnav').click(function () {
                // let height= $(this).offsetTop()
                $('.js-product-newnav').removeClass('active');
                $(this).addClass('active');
                let index = parseInt($(this).attr('data-index'));
                if (_this.currentIndex == index) {
                    return false;
                }
                _this.currentIndex = index;
                if (index === 1) {
                    $('.js-prodcutpage-overview').show();
                    $('#stamped-main-widget').hide();
                    $('.js-online-reviewers').hide();
                    $('.js-prodcutpage-specail').hide();
                    $('html, body').animate(
                        {
                            scrollTop: $('.js-prodcutpage-overview').eq(0).offset().top - _this.totalHight,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                } else if (index === 2) {
                    $('.js-prodcutpage-overview').hide();
                    $('#stamped-main-widget').show();
                    $('.js-online-reviewers').show();
                    $('.js-prodcutpage-specail').hide();
                    $('html, body').animate(
                        {
                            scrollTop: $('.js-online-reviewers').offset().top - _this.totalHight,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                } else if (index === 3) {
                    $('.js-prodcutpage-overview').hide();
                    $('#stamped-main-widget').hide();
                    $('.js-online-reviewers').hide();
                    $('.js-prodcutpage-specail').show();
                    $('html, body').animate(
                        {
                            scrollTop: $('.js-prodcutpage-specail').offset().top - _this.totalHight,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                }
            });
            $('body').on('click', '.stamped-product-reviews-badge', function (e) {
                // window.location.hash = "#productDdetailnav"
                if ($('.js-product-detailnavcard').width() === 0) {
                    $('html, body').animate(
                        {
                            scrollTop: $('#stamped-main-widget').offset().top - _this.totalHight,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                    return false;
                } else {
                    $('html, body').animate(
                        {
                            scrollTop: $('.js-product-detailnavcard').offset().top - 80,
                        },
                        {
                            duration: 500,
                            easing: 'swing',
                        }
                    );
                    $('.js-product-newnav').each(function () {
                        let index = parseInt($(this).attr('data-index'));
                        if (index === 2) {
                            $(this).addClass('active');
                            $('.js-prodcutpage-overview').hide();
                            $('#stamped-main-widget').show();
                            $('.js-prodcutpage-specail').hide();
                            _this.currentIndex = index;
                        } else {
                            $(this).removeClass('active');
                        }
                    });
                    return false;
                }
            });
        },
    };
    if ($('.js-product-detailnavcard').length > 0) {
        let url = window.location.href;
        let windowSize = window.screen.width;
        //更新urlnew
        if (url.includes('reviews')) {
            $('.js-product-newnav').eq(1).addClass('active');
            $('.js-product-newnav').eq(1).siblings().removeClass('active');
            $('.js-prodcutpage-overview').hide();
            $('#stamped-main-widget').show();
            $('.js-prodcutpage-specail').hide();
            productNavCard.currentIndex = 2;
            $('html, body').animate(
                {
                    scrollTop: $('#stamped-main-widget').offset().top - 90,
                },
                {
                    duration: 500,
                    easing: 'swing',
                }
            );
        }

        productNavCard.init();
    }
    //售罄弹窗事件
    const notifyPop = {
        init: function () {
            this.event();
        },
        event: function () {
            $('body').on('click', '#notice_button', function (e) {
                $('.replenishment-notice').fadeIn();
            });
            $('body').on('click', '#close_pop', function (e) {
                $('.replenishment-notice').fadeOut();
            });
        },
    };
    if (document.getElementById('notice_button')) {
        notifyPop.init();
    }
    // 分期接口
    const klarnaBlock = {
        price: null,
        client_id: '9768f7b4-c985-5c8b-a3d9-d45c9fd4bdca',
        placement_key: 'credit-promotion-badge',
        init: function () {
            this.getKlarnaApi();
            // this.event()
        },
        getKlarnaApi: function () {
            this.price = $('#payOverTime').attr('data-price');
            this.price = parseInt(this.price);
            fetch(`https://osm-na.klarnaservices.com/v3/messaging?client_id=${this.client_id}&placement_key=${this.placement_key}&channel=web&locale=en-US&purchase_amount=${this.price}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.content) {
                        let arr = data.content.nodes;
                        let obj = {
                            svgUrl: '',
                            text: '',
                            text2: '',
                            action: '',
                            actionUrl: '',
                            prequalify: '',
                            prequalifyUrl: '',
                        };
                        arr.forEach((item) => {
                            if (item.name == 'KLARNA_BADGE') {
                                obj.svgUrl = item.url;
                            } else if (item.name == 'TEXT_MAIN') {
                                let arr = item.value.split('$');
                                obj.text = arr[0];
                                obj.text2 = arr[1];
                            } else if (item.name == 'ACTION_LEARN_MORE') {
                                obj.action = item.label;
                                obj.actionUrl = item.url.replace(/showButtons=false/g, 'showButtons=true').replace(/showBackground=true/g, 'showBackground=false');
                            } else if (item.name == 'ACTION_PREQUALIFY') {
                                obj.prequalify = item.label;
                                obj.prequalifyUrl = item.url.replace(/showButtons=false/g, 'showButtons=true').replace(/showBackground=true/g, 'showBackground=false');
                            }
                        });
                        // onclick="kmerchant.openHostedInterstitial({url: '${obj.prequalifyUrl}' }, arguments, undefined, this)"
                        // let blockString = `
                        // 	<div class="klarna_img">
                        // 		<img  src="${obj.svgUrl}" alt="">
                        // 	</div>
                        // 	<div class="klarna_right_box">
                        // 		<div class="low">${obj.text}
                        // 			<a href="javascript:void(0);" data-url="${obj.actionUrl}"
                        // 				onclick="fbOpenHostedInterstitial('${obj.actionUrl}',arguments, undefined, this)"
                        // 				id="klarnaLearmore">
                        // 				${obj.action}
                        // 			</a>
                        // 		</div>
                        // 		<div class="col">
                        // 			<a  href="javascript:void(0);"
                        // 				onclick="fbOpenHostedEligibility('${obj.prequalifyUrl}', this)"
                        // 				data-url="${obj.prequalifyUrl}" id="klarnaPrequalify" >
                        // 				${obj.prequalify}
                        // 			</a>
                        // 		</div>
                        // 	</div>
                        // `
                        let blockString = `
				
					<div class="klarna_right_box">
						<div class="low">${obj.text}&nbsp; 
							<a href="javascript:void(0);" data-url="${obj.actionUrl}"
								onclick="fbOpenHostedInterstitial('${obj.actionUrl}',arguments, undefined, this)"
								id="klarnaLearmore">
								${'$' + obj.text2}
							</a>
						</div>
						<div class="col">
							<div class="klarna_img">
								<img  src="${obj.svgUrl}" alt="" width="43" height="22">
							</div>
							<a  href="javascript:void(0);" 
								onclick="fbOpenHostedEligibility('${obj.prequalifyUrl}', this)"
								data-url="${obj.prequalifyUrl}" id="klarnaPrequalify" >
								Prequalify now
							</a>
						</div>
					</div>	
				`;
                        $('#renderKlarnaDom').html(blockString);
                    }
                })
                .catch((error) => {
                    console.log('error', error);
                });
        },
        // event: function () {
        // 	let _this = this
        // 	$('body').on('click', '#klarnaLearmore', function (e) {
        // 		let url = $(this).attr('data-url')
        //     })
        // 	$('body').on('click', '#klarnaPrequalify', function (e) {
        // 		let url = $(this).attr('data-url')

        //     })
        // }
    };
     if($('#renderKlarnaDom').length){
        klarnaBlock.init();
    }
    // pdp模块代码
    if ($('.js_details_icon').length > 0) {
        $('.js_details_icon .hoverIconMb').mouseenter(function () {
            $(this).next('.hoverBox').css('display', 'block');
        });
        $('.js_details_icon .hoverIconMb').mouseleave(function () {
            $(this).next('.hoverBox').css('display', 'none');
        });
    }
});
