class CookieUtil {
    static getItem(sKey) {
        return (
            unescape(
                document.cookie.replace(
                    new RegExp(
                        "(?:(?:^|.*;)\\s*" +
                        escape(sKey).replace(/[-.+*]/g, "\\$&") +
                        "\\s*\\=\\s*([^;]*).*$)|^.*$"
                    ),
                    "$1"
                )
            ) || null
        );
    }

    static setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires =
                        vEnd === Infinity ?
                        "; expires=Fri, 31 Dec 9999 23:59:59 GMT" :
                        "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie =
            escape(sKey) +
            "=" +
            escape(sValue) +
            sExpires +
            (sDomain ? "; domain=" + sDomain : "") +
            (sPath ? "; path=" + sPath : ";path=/") +
            (bSecure ? "; secure" : "");
        return true;
    }

    static removeItem(sKey, sDomain, sPath) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getItem(sKey);
        if (cval != null) {
            document.cookie =
                escape(sKey) +
                "=" +
                cval +
                ";expires=" +
                exp.toUTCString() +
                (sDomain ? ";domain=" + sDomain : "") +
                (sPath ? ";path=" + sPath : ";path=/");

            // console.log(escape(sKey) +
            //   "=" +
            //   cval +
            //   ";expires=" +
            //   exp.toUTCString() +
            //   (sDomain ? ";domain=" + sDomain : "") + (sPath ? ";path=" + sPath : ";path=/"));
        }

        return true;
    }

    static hasItem(sKey) {
        return new RegExp(
            "(?:^|;\\s*)" + escape(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\="
        ).test(document.cookie);
    }

    static keys() {
        var aKeys = document.cookie
            .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "")
            .split(/\s*(?:=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = unescape(aKeys[nIdx]);
        }
        return aKeys;
    }
}
const changeCountryUtils = {
    current_country: window.Shopify.country.toLowerCase(),
    fbShopifyRoot: window.Shopify.routes.root,
    formData: {
        token: CookieUtil.getItem('cart') || '',
        note: null,
        attributes: {},
        total_price: 0,
        total_weight: 0,
        item_count: 0,
        items: [],
        requires_shipping: false
    },
    init: function () {
        let fb_country_code_var = localStorage.getItem('fb_country_code_var') || null
        if(!fb_country_code_var) {
            localStorage.setItem('fb_country_code_var', this.current_country)
        } else {
            if(this.current_country != fb_country_code_var) {
                if(window.location.pathname.indexOf('/pages/configure') < 0 ) {
                    sessionStorage.removeItem("customer_bike_type");
                }
                CookieUtil.removeItem('discount_code')
                CookieUtil.removeItem('docapp-coupon')
                localStorage.removeItem('discount_code')
                localStorage.removeItem('docapp-coupon')
                this.clearCookie()
                this.getClear()
            }
        }
    },
    refreshSection: function () {
        setTimeout(function () {
            document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                bubbles: true  //this code is for prestige theme, is to refresh the cart
            }));
        }, 300);
    },
    clearCookie: function() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
                document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
            }
        }
    },
    getClear: function () {
        let _this = this
        fetch(_this.fbShopifyRoot + 'cart/clear.js', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_this.formData)
        }).then(function (res) {
            return res.json();
        }).then((data) => {
            localStorage.setItem('fb_country_code_var', _this.current_country)
            if(window.location.pathname.indexOf('/cart') > -1) {
               window.location.reload(true)
            } else {
                _this.refreshSection()
            }
        })
    }
}
changeCountryUtils.init()
// if(window.location.pathname.indexOf('/cart') > -1) {
//     var fb_pdp_need_clear = localStorage.getItem('fb_pdp_need_clear')
//     if(fb_pdp_need_clear && fb_pdp_need_clear == 'yes') {
//         CookieUtil.removeItem('discount_code')
//         localStorage.removeItem('discount_code')
//         CookieUtil.removeItem('docapp-coupon')
//         localStorage.removeItem('docapp-coupon')
//         localStorage.removeItem('fb_pdp_need_clear')
//     }
// } 