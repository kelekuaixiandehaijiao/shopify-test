(function ($) {
  let isDiscountCodeAdded = false;
  let discountCode = null;
  let productArry = [];
  let isOnce = true;
  const getIdName = (id) => {
    return document.getElementById(id);
  };
  function parseToHTML(HTMLString) {
    const doc = new DOMParser().parseFromString(HTMLString, "text/html");
    return doc.body.children[0];
  }
  //insert promo code in checkout and back to cart
  const dispatchEvent = function (element, eventName) {
    if (typeof element === "string") element = document.querySelector(element);
    if (!element) return;
    const evt = new MouseEvent(eventName);
    evt.initEvent(eventName, true, false);
    element.dispatchEvent(evt);
  };
  const parseHTML = function (HTMLString = "") {
    const container = document.createElement("div");
    container.innerHTML = HTMLString;
    const elements = Array.from(container.children);
    if (elements.length > 1) {
      const fragment = new DocumentFragment();
      elements.forEach((el) => {
        const id = el.getAttribute("id");
        fragment.appendChild(el);
      });
      return fragment;
    } else {
      const id = elements[0].getAttribute("id");
      return elements[0];
    }
  };
  const waitFor = function (
    condition,
    name,
    period,
    maxWaitTime,
    maxWaitTimeCallback,
    payload
  ) {
    return new Promise((resolve, reject) => {
      if (typeof condition !== "function")
        reject(
          `condition parameter should be a function with boolean return value`
        );
      const _period = period ? period : 100;
      const _name = name ? name : "initialization";
      const stopWaiters = function () {
        clearInterval(window[_name]);
        clearTimeout(window[_name + "_parent"]);
        window[_name] = undefined;
        window[_name + "_parent"] = undefined;
      };
      const _log = function () {
        console.log(`waiting for ${_name}`);
      };

      const result = condition();
      if (result) {
        stopWaiters();
        resolve(payload ? { payload, result } : result);
        return;
      }

      window[_name] = setInterval(function () {
        const result = condition();
        if (result) {
          stopWaiters();
          resolve(payload ? { payload, result } : result);
        } else {
        //   _log();
        }
      }, _period);

      if (maxWaitTime) {
        window[_name + "_parent"] = setTimeout(function () {
          stopWaiters();
          if (
            maxWaitTimeCallback &&
            typeof maxWaitTimeCallback === "function"
          ) {
            maxWaitTimeCallback();
            reject(true);
          }
          reject(false);
        }, maxWaitTime);
      }
    });
  };
  const checkoutFun = {
    once: false,
    countryCodeDsiacount: [
        {
            country: 'CA',
            litbike: 'LITSALE',
            boombike: 'BOOMSALE',
            isCurrent: true,
            currency: 'CAD'
        },{
            country: 'GB',
            litbike: 'LITSALEUK',
            boombike: 'BOOMSALEUK',
            isCurrent: false,
            currency: 'GBP'
        },{
            country: 'AU',
            litbike: 'LITSALEAU',
            boombike: 'BOOMSALEAU',
            isCurrent: false,
            currency: 'AUD'
        }
    ],
    currentCode: {},
    disabledCode: [],
    init: function () {
      this.event();
    },
    initDiscount: function () {
        let _this = this
        let shopify_currency = Shopify.Checkout.currency  //有时会没有值 但以这个为准
        let shopify_country =  Shopify.country
        _this.countryCodeDsiacount.map((item) => {
            if((shopify_currency && shopify_currency.toLowerCase() == item.currency.toLowerCase()) || (!shopify_currency && shopify_country.toLowerCase() == item.country.toLowerCase())) {
                item.isCurrent = true
                _this.currentCode =  Object.assign(_this.currentCode, item)

            } else {
                item.isCurrent = false
                _this.disabledCode.push(item.litbike, item.boombike)
            }
            return item
        })
        _this.initDiscountPublic()
        //  _this.setSelectChecked('checkout_shipping_address_country', _this.currentCode.country)
    },
    initDiscountPublic: function () {
        let shopify_currency = Shopify.Checkout.currency  //有时会没有值 但以这个为准
        let dom_country = $('.js-checkout-keep-data').attr('data-locale')
        if(shopify_currency) {
            if(shopify_currency.indexOf(dom_country) > -1) {
                $('.js-announcementbar-old').show()
            } else {
                $('.js-announcementbar-old').hide()
            }
        }
    },
    initChooseAddressDiscount: function () {
        let _this = this
        let shippngAddrress =  Shopify.Checkout.shippingAddress ? Shopify.Checkout.shippingAddress.countryCode : null
        _this.countryCodeDsiacount.map((item) => {
            if(shippngAddrress.toLowerCase() == item.country.toLowerCase()) {
                item.isCurrent = true
                _this.currentCode =  Object.assign(_this.currentCode, item)

            } else {
                item.isCurrent = false
                _this.disabledCode.push(item.litbike, item.boombike)
            }
            return item
        })
        // _this.setSelectChecked('checkout_shipping_address_country', _this.currentCode.country)
    },
    fetchSuscribe: function () {

      let _this = this
      let email = document.querySelector('#checkout_email').value
      console.log('fetchSuscribe')
      let url = `https://api.freebeatfit.com/shopify/v1/klaviyo/checkoutGenerateProfile`
      let data = {
        "email": email,
        "from": Shopify.Checkout.currency,
      }
      // fetch  request header use json
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('res:', res)
        }
        ).catch((err) => {
          console.log('err:', err)
        })
    },
    customGaEvent: function (category, action, label, value) {
      try {
        ga("send", "event", category, action, label, value);
      } catch (e) {}
    },
    TidioShowFun: function () {
      if(tidioChatApi) {
        tidioChatApi.open();
        return;
      }
      
    },
    insertCustomerServiceLink: function () {
      let _this = this;
      let payTitle = "Having issues with your order?";
      let payExplain = "Connect with a specialist.";
      if (Shopify.Checkout.step === "payment_method") {
        payTitle = "Payment Issues?";
        payExplain = "Let us help you.";
      }

      let classList = "";
      let originEle = $(".step__footer");

      if (!_this.isMobile().isMobile) {
        classList = "speciallist-pc";
        originEle = $(".order-summary__section--total-lines");
      }

      if ($("#specialist").length == 0) {
        originEle.after(`<div id="specialist" class="${classList}">
                    <img class="serviceImg" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/image_1_2x_d31c0ef6-323c-46f9-9ce5-4e4541fded6f.png?v=1669283512" alt="specialist" />
                    <div class="serviceInfo">
                    <span class="serviceTitle">${payTitle}</span><br/>
                    <span class="serviceExplain">${payExplain}</span>
                    </div>
                </div>`);
      }

      $("#specialist").on("click", _this.TidioShowFun);
    },
    isMobile: function () {
      let screen_width = window.screen.width;
      return {
        isMobile: screen_width > 325 && screen_width < 750,
        screenWidth: screen_width,
      };
    },
    getTotalMoney: function () {
      let boomnumber = 0;
      let litnumber = 0;
      if ($(".product").length > 0) {
        $(".product").each(function () {
          let productName = $(this)
            .find(".product-thumbnail__image")
            .attr("alt");
          if (productName.indexOf("Boom Bike") > -1) {
            let totalShipping = $(".total-line--shipping")
              .find(".skeleton-while-loading")
              .attr("data-checkout-total-shipping-target");
            totalShipping = parseInt(totalShipping);
            if (totalShipping < 1) {
              let quantityNumber = $(this).find(".product-thumbnail__quantity")
                ? $(this).find(".product-thumbnail__quantity").text()
                : null;
              boomnumber = quantityNumber ? parseInt(quantityNumber) : 0;
            }
          }
          if (productName.indexOf("Lit Bike") > -1) {
            let totalShipping2 = $(".total-line--shipping")
              .find(".skeleton-while-loading")
              .attr("data-checkout-total-shipping-target");
            totalShipping2 = parseInt(totalShipping2);
            if (totalShipping2 < 1) {
              let quantityNumber2 = $(this).find(".product-thumbnail__quantity")
                ? $(this).find(".product-thumbnail__quantity").text()
                : null;
              litnumber = quantityNumber2 ? parseInt(quantityNumber2) : 0;
            }
          }
        });
      }
      let amount =
        $(".order-summary__emphasis").attr(
          "data-checkout-payment-due-target"
        ) || 0;
      if (amount > 0) {
        amount = amount.toString();
        amount =
          amount.slice(0, amount.length - 2) +
          "." +
          amount.slice(amount.length - 2);
        amount = parseFloat(amount) + 99 * boomnumber + 99 * litnumber;
      }
      return amount;
    },
    renderAbKlarna: function (amount) {
      let finalPrice = Math.ceil(amount / 4);
      // 去掉重复渲染
      if (document.querySelector(".klarna_customer_fb_container")) {
        let target = document.querySelector(
          ".klarna_customer_fb_initialized .klarna_customer_fb_breakDown span"
        );
        target.innerHTML = `&nbsp$${finalPrice}/mo`;
        return false;
      }
      const toHideTarget = document.querySelector(".main__header .shown-if-js");
      const testName = "klarna_customer";
      const clientName = "fb";
      const prefix = `${testName}_${clientName}`;
      let html = `<div class="${prefix}_container">
            <div class="${prefix}_title">
                <p>Flexible payments available with</p>
                <div class="${testName}_fb_kalrnaLogo">
                    
                    <span class="_klarnaSVG"><img alt="original_k" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/klarnaImg.jpg?v=1672113291" /></span>
                </div>
            </div>
            <div class="${prefix}_breakDown"><p>Pay as low as </p><span>/mo</span></div>
            <div class="${prefix}_separator"><span class="separator_before"></span><span class="separator_middle">or</span><span class="separator_after"></span></div>
            <div class="${prefix}_imgs">
            <img alt="master" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/master.png?v=1672113459">
            <img alt="visa" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/visa.png?v=1672113326">
            <img alt="amex" src="https://cdn.shopify.com/s/files/1/0592/3766/2905/files/amex.png?v=1672113459"></div>
            </div>`;
      document
        .querySelector("body")
        .classList.add("klarna_customer_fb_initialized");
      let parsedHtml = parseToHTML(html);
      toHideTarget.before(parsedHtml);
      toHideTarget.classList.add("klarna_customer_fb_hide");
      let target = document.querySelector(
        ".klarna_customer_fb_initialized .klarna_customer_fb_breakDown span"
      );
      target.innerHTML = `&nbsp$${finalPrice}/mo`;
    },
    event: function () {
      let _this = this;
      $(document).on("page:load page:change", function () {
        // _this.shopingcart()
        if (
          Shopify.Checkout.step === "contact_information" &&
          Shopify.Checkout.dynamicCheckoutPaymentInstrumentsConfig
        ) {
          _this.handleCheckout();
        }
        // 第一步取contry自带地址

        // if( Shopify.Checkout.step === "contact_information") {
        //     _this.initDiscount();
        // } else if (Shopify.Checkout.step === "shipping_method" ||  Shopify.Checkout.step === "payment_method") {
        // //  第二步取前面填写的地址
        //     _this.initChooseAddressDiscount()
        // }

        if (
          Shopify.Checkout.step === "contact_information" ||
          Shopify.Checkout.step === "shipping_method" ||
          Shopify.Checkout.step === "payment_method"
        ) {
            
        //   _this.initDiscount();
            _this.initDiscount();

            if(window.fbGlobalInfo && (Shopify.country == "GB" &&window.fbGlobalInfo.gbbikeUseDiscountPrice)){
              _this.discountFun();
            }else if(window.fbGlobalInfo && (Shopify.country == "AU" &&window.fbGlobalInfo.aubikeUseDiscountPrice)){
              _this.discountFun();
            }else if(window.fbGlobalInfo && (Shopify.country == "CA" &&window.fbGlobalInfo.bikeUseDiscountPrice)){
              _this.discountFun();

            }
           
        //   _this.removeCountry()
          $("#checkout_reduction_code").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-discount-code",
              "checkout",
              "Discount_apply_code"
            );
          });

          $("#checkout_submit").on("click", function (e) {
            _this.customGaEvent(
              "checkout-discount-code",
              "checkout",
              "Discount_apply_btn"
            );
          });

          if (
            $("#checkout_reduction_code") &&
            $("#checkout_reduction_code").length > 0
          ) {
            let codeStatusText = $("#checkout_reduction_code").attr(
              "aria-describedby"
            );
            if (
              codeStatusText &&
              codeStatusText === "error-for-reduction_code"
            ) {
              _this.customGaEvent(
                "checkout-discount-code",
                "checkout",
                "Discount_apply_fail"
              );
            }
            if ($(".tags-list") && $(".tags-list").length > 0) {
              _this.customGaEvent(
                "checkout-discount-code",
                "checkout",
                "Discount_apply_success"
              );
            }
            if ($(".notice") && $(".notice").length > 0) {
              _this.customGaEvent(
                "checkout-discount-code",
                "checkout",
                "Discount_apply_fail"
              );
            }
          }

          // 展示调用客服聊天框的handle
          // _this.insertCustomerServiceLink();
        }
        if (Shopify.Checkout.step === "contact_information") {
          document.querySelector('#checkout_email').addEventListener('blur', function (params) {
            let email = this.value
            if (!email) {
              return;
            }
            let checkbox = document.querySelector('#checkout_buyer_accepts_marketing')
            if (!checkbox.checked) {
              return;
            }
            // jquery fetch data
            _this.fetchSuscribe()
          });
          

          let checkbox = document.querySelector('#checkout_buyer_accepts_marketing')
          if (checkbox) {
            checkbox.addEventListener('click', function (params) {
              
              if (!this.checked) {
                return;
              }
              let email = document.querySelector('#checkout_email').value
              if (!email) {
                return;
              }
              if (this.checked) {
                _this.fetchSuscribe()
              }
            })
          }


          window.uetq = window.uetq || [];
          let totalPrice =
            $(".order-summary__emphasis").attr(
              "data-checkout-payment-due-target"
            ) || 0;
          totalPrice = totalPrice.toString();
          totalPrice =
            totalPrice.slice(0, totalPrice.length - 2) +
            "." +
            totalPrice.slice(totalPrice.length - 2);
          window.uetq.push("event", "begin_checkout", {
            revenue_value: totalPrice,
            currency: "USD",
          });
          let ads_key_begin_checkout = $(".js-checkout-keep-data").attr(
            "data-begin-checkout"
          );
          gtag("event", "conversion", {
            send_to: "AW-" + ads_key_begin_checkout,
            value: totalPrice,
            currency: "USD",
          });
          $("#checkout_shipping_address_first_name").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_first_name"
            );
          });
          $("#checkout_shipping_address_last_name").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_last_name"
            );
          });
          $("#checkout_shipping_address_company").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_company"
            );
          });
          $("#checkout_shipping_address_address1").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_address1"
            );
          });
          $("#checkout_shipping_address_address2").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_address2"
            );
          });
          $("#checkout_shipping_address_city").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_city"
            );
          });

          $("#checkout_shipping_address_country").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_country"
            );
          });
          $("#checkout_shipping_address_province").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_province"
            );
          });
          $("#checkout_shipping_address_zip").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_zip"
            );
          });

          $("#checkout_shipping_address_phone").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "address_phone"
            );
          });
          $("#checkout_remember_me").on("blur", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "Save_this_information_for_next_time"
            );
          });
          $("#checkout_buyer_accepts_sms").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "Text_me_with_news_and_offers"
            );
          });
          $("#continue_button").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Information",
              "checkout",
              "Continue_to_shipping"
            );
          });
        } else if (Shopify.Checkout.step === "shipping_method") {
          $(".link--small").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Shipping",
              "checkout",
              $(this).find(".visually-hidden").text()
            );
          });
          $("#continue_button").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Shipping",
              "checkout",
              "Continue_to_payment"
            );
          });

          $(".step__footer__previous-link").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Shipping",
              "checkout",
              "Return_to_information"
            );
          });
        } else if (Shopify.Checkout.step === "payment_method") {
          if ((Shopify.country && ( Shopify.country == "AU")) || (Shopify.Checkout && ( Shopify.Checkout.currency == "AUD"))) {
            document.querySelector(
              '[data-gateway-name="offsite_v2"]'
            ).style.display = "none";
            document.querySelector(
              '[data-gateway-name="offsite_v2"]'
            ).nextElementSibling.style.display = "none";
            document
              .querySelector('[data-gateway-name="credit_card"]')
              .querySelector(".radio__input")
              .firstElementChild.click();
          }
          if ((Shopify.country && ( Shopify.country == "GB")) || (Shopify.Checkout && ( Shopify.Checkout.currency == "GBP"))) {
                      // 找到具有.hidden-if-js类的元素
              var hiddenIfJsElements = $('.hidden-if-js');

              // 遍历每个.hidden-if-js元素
              hiddenIfJsElements.each(function() {
                  // 查找该元素后的所有<p>标签
                  var subsequentPTags = $(this).nextAll('p');

                  // 隐藏这些<p>标签
                  subsequentPTags.hide();
              });
          }

          $(".link--small").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Payment",
              "checkout",
              $(this).find(".visually-hidden").text()
            );
          });
          // paypal
          $("#checkout_payment_gateway_71931986105").on("click", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "Paypal");
          });
          $("#checkout_payment_gateway_71822213305").on("click", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "Klarna");
          });
          $("#checkout_payment_gateway_70924304569").on("click", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "Credit_card");
          });
          $("#checkout_different_billing_address_false").on(
            "click",
            function (e) {
              _this.customGaEvent(
                "checkout-Payment",
                "checkout",
                "Same_as_shipping_address"
              );
            }
          );
          $("#checkout_different_billing_address_true").on(
            "click",
            function (e) {
              _this.customGaEvent(
                "checkout-Payment",
                "checkout",
                "Use_a_different_billing_address"
              );
            }
          );

          $("#checkout_billing_address_first_name").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "first_name");
          });
          $("#checkout_billing_address_last_name").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "last_name");
          });
          $("#checkout_billing_address_company").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "company");
          });

          $("#checkout_billing_address_address1").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "address1");
          });
          $("#checkout_billing_address_address2").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "address2");
          });
          $("#checkout_billing_address_city").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "city");
          });
          $("#checkout_billing_address_country").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "country");
          });

          $("#checkout_billing_address_province").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "province");
          });
          $("#checkout_billing_address_zip").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "zip");
          });
          $("#checkout_billing_address_phone").on("blur", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "phone");
          });
          $(".step__footer__previous-link").on("click", function (e) {
            _this.customGaEvent(
              "checkout-Payment",
              "checkout",
              "Return_to_information"
            );
          });
          $(".continue_button").on("click", function (e) {
            _this.customGaEvent("checkout-Payment", "checkout", "Pay_now");
          });
        } else if (Shopify.Checkout.step === "thank_you") {
          window.uetq = window.uetq || [];
          let payment_due__price =
            $(".order-summary__emphasis").attr(
              "data-checkout-payment-due-target"
            ) || 0;
          if (payment_due__price > 0) {
            payment_due__price = payment_due__price.toString();
            payment_due__price =
              payment_due__price.slice(0, payment_due__price.length - 2) +
              "." +
              payment_due__price.slice(payment_due__price.length - 2);
          }
          window.uetq.push("event", "purchase", {
            revenue_value: payment_due__price,
            currency: "USD",
          });
          let ads_key_purchase = $(".js-checkout-keep-data").attr(
            "data-purchase"
          );
          gtag("event", "conversion", {
            send_to: "AW-" + ads_key_purchase,
            value: payment_due__price,
            currency: "USD",
            transaction_id: "",
          });

          console.log(
            "contact thank you  ",
            $(".payment-due__price").attr("data-checkout-payment-due-target")
          );
          _this.customGaEvent("checkout-thank_you", "checkout", "Pay_success");
        } else {
        }
      });
    },
    handleCheckout: async (noExpand) => {
      document.body.setAttribute("data-test-page", "checkout");
      const input = await waitFor(
        () => document.getElementById("checkout_reduction_code"),
        "discount input"
      );
      // if (!document.querySelector(getIdName("back-to-cart", true))) {
      //   input
      //     .closest("form")
      //     .after(
      //       parseHTML(
      //         `<span id="${getIdName(
      //           "back-to-cart"
      //         )}">Apply multiple codes at the CART only. <a style='text-decoration: underline!important;' href="/cart">Back to CART</a></span>`
      //       )
      //     );
      // }

      if (!document.querySelector(getIdName("input_title", true))) {
        input
          .closest(".field__input-btn-wrapper")
          .before(
            parseHTML(`<span id="${getIdName("input_title")}">Discount</span>`)
          );
      }

      if (!noExpand) {
        let isorderSummer = $(".order-summary-toggle").length
          ? $(".order-summary-toggle").attr("aria-expanded")
          : null;
        if (isorderSummer == "false") {
          const orderSummary = document.querySelector(
            ".order-summary-toggle__text"
          );
          dispatchEvent(orderSummary, "click");
        }
      }
    },
    removeDisabledCode: function () {
        let _this = this;
        if ( $(".tags-list").length > 0 && $(".tags-list .reduction-code__text").length > 0) {
            let one = $(".tags-list:first .reduction-code__text").text().toLowerCase();
            for (let itemvalue of _this.disabledCode) {
                if(one == itemvalue.toLowerCase()) {
                    $(".tag__button").click(); 
                    break
                }
            }
        }
    },
    discountFun: async function () {
      let _this = this;
      let btnlistDiscount = document.getElementsByName("checkout[submit]");
      let inputReductionCode = document.getElementsByName(
        "checkout[reduction_code]"
      );
      const input = await waitFor(
        () => document.getElementById("checkout_reduction_code"),
        "discount input"
      );
      if ($(".product").length > 0) {
        $(".product").each(function () {
          let productName = $(this)
            .find(".product-thumbnail__image")
            .attr("alt");
          productArry.push(productName);
        });
        if (productArry.length) {
          let productString = productArry.toString();
          if (productString.indexOf("Lit Bike") > -1) {
            discountCode = _this.currentCode.litbike;
          }
          if (productString.indexOf("Boom Bike") > -1) {
            discountCode = _this.currentCode.boombike;
          }
        }
      }
      if (
        $(".tags-list").length > 0 &&
        $(".tags-list .reduction-code__text").length > 0
      ) {
        let stringCode =  $(".tags-list:first .reduction-code__text").text().toLowerCase();
        let one = $(".tags-list:first .reduction-code__text").text().toLowerCase();
        let _discountCode = discountCode?.toLowerCase()
        // 多一步判断合并折扣码
        if(one.indexOf("+") > -1) {
            one = one.toLowerCase()
            if(one.indexOf(_discountCode) > -1) {
                isDiscountCodeAdded = true;
            } else {
                isDiscountCodeAdded = false; 
            }
        } else if (one == _discountCode ) {
            isDiscountCodeAdded = true;
        } else {
            isDiscountCodeAdded = false;
        }
      } else {
        isDiscountCodeAdded = false;
      }
      if (
        !isDiscountCodeAdded &&
        document.querySelectorAll("#checkout_reduction_code").length > 0 &&
        isOnce &&
        discountCode
      ) {
        // debugger

        isOnce = false;
        input.value = discountCode;
        dispatchEvent(input, "input");
        if ($(".extensible-discounts").length < 1) {
          for (let i = 0; i < btnlistDiscount.length; i++) {
            dispatchEvent(btnlistDiscount[i], "click");
          }
        }
      } else if (
        isDiscountCodeAdded &&
        document.querySelectorAll("#checkout_reduction_code").length > 0
      ) {
        isOnce = false;
        _this.removeDisabledCode();
      } else {
        // isOnce = false
        input.value = "";
        dispatchEvent(input, "input");
      }

      for (let i = 0; i < btnlistDiscount.length; i++) {
        btnlistDiscount[i].addEventListener(
          "click",
          function (event) {
            let disabledtext = inputReductionCode[i].value;
            for (let itemvalue of _this.disabledCode) {
              if ( itemvalue.toLowerCase() == disabledtext.toLowerCase()) {
                // let wrongmsg = '<p class="field__message field__message--error" id="error-for-reduction_code">Enter a valid discount code</p>'
                inputReductionCode[i]
                  .closest("form")
                  .classList.add("field--error");
                event.stopPropagation();
                event.preventDefault();
                break;
              }
            }
          },
          true
        );
      }
    },
    setSelectChecked: function (selectId, checkCode) {
        console.log("checkCode", checkCode)
        let select = document.getElementById(selectId);  
        if(select) {
            for (var i = 0; i < select.options.length; i++){  
                console.log("11", select.options[i].selected)
                if (select.options[i].getAttribute('data-code') == checkCode  && !select.options[i].selected){ 
                    select.options[i].selected = true; 
                } else {
                }  
            }
        }
    },
    removeCountry: function () {
        function set_select_checked(selectId, checkCode){  
            var select = document.getElementById(selectId);  
            if(select) {
                for (var i = 0; i < select.options.length; i++){  
                    if (select.options[i].getAttribute('data-code') == checkCode){ 
                        select.options[i].disabled = true;
                        if(select.options[i].selected == true) {
                            if((i+1) < select.options.length) {
                                select.options[i+1].selected = true; 
                            }
                        }
                    } else {
                    }  
                }
            }
        }
        // set_select_checked('checkout_shipping_address_country', 'AU');
    }
  };
  checkoutFun.init();
  const fbAnnouncementBar = {
    speedArr: [],
    speed: [],
    currenIndex: 0,
    nextIndex: 1,
    preIndex: 0,
    playTimer: null,
    init: function () {
      if (
        $(".js-announcement-new").length > 0 &&
        $(".js-announcement-new").attr("data-show") == "true"
      ) {
        let newbarHtml = $(".js-announcement-new").html();
        $(".js-announcementbar-old").html(newbarHtml);
        $(".js-announcement-new").empty();
      }
      let arr = $(".AnnouncementBar").attr("data-arry").split(",");
      this.speedArr = arr
        .filter((s) => {
          return s && s.trim();
        })
        .map((item) => parseInt(item));
      this.speed = this.speedArr[0];
      // console.log("this.speedArr", this.speedArr, this.speedArr.length)
      this.preIndex = this.speedArr.length - 1;
      if (this.speedArr && this.speedArr.length > 1) {
        this.event();
      }
      let height1 = 0;
      if ($(".AnnouncementBar").length > 0) {
        height1 = $(".AnnouncementBar").height();
        $(".shopify-section--header").css("top", height1);
      }
      if ($(".fb-pages-top-banner").length > 0) {
        let height2 = $("#section-header").height();
        $(".fb-pages-top-banner")
          .parent()
          .css("top", height1 + height2);
      }
    },
    funPlay: function () {
      let _this = this;
      this.currenIndex = this.currenIndex + 1;
      if (this.currenIndex > this.speedArr.length - 1) {
        this.currenIndex = 0;
        this.nextIndex = this.currenIndex + 1;
        this.preIndex = this.speedArr.length - 1;
      } else if (this.currenIndex == this.speedArr.length - 1) {
        this.nextIndex = 0;
        this.preIndex = this.currenIndex - 1;
      } else {
        this.nextIndex = this.currenIndex + 1;
        this.preIndex = this.currenIndex - 1;
      }
      $(".js-announcement-box .js-announcement-show").each(function (index) {
        if (index === _this.preIndex) {
          $(this).removeClass("utils-scroll-show");
          $(this).addClass("utils-scroll-hide");
        }
        if (index === _this.currenIndex) {
          $(this).removeClass("utils-scroll-hide");
          $(this).addClass("utils-scroll-show");
        }
      });
      this.speed = this.speedArr[this.currenIndex];
      this.playTimer && clearTimeout(this.playTimer);
      this.playTimer = setTimeout(() => {
        this.funPlay();
      }, this.speed);
    },
    event: function () {
      let _this = this;
      this.playTimer = setTimeout(() => {
        this.funPlay();
      }, this.speed);
    },
  };
  if ($(".AnnouncementBar").length > 0) {
    fbAnnouncementBar.init();
  }
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
  var  fbCheckoutInfo = window.fbCheckoutInfo || {}
  const checkoutPayment = {
      webPixelsData: null,
      firstKlarna:true,
      loading: false,
      init: function () {
          this.event()
      },
      getFormData(formData) {
          let data = {}
          $.each(formData, function (index, item) {
              data[item.name] = item.value
          })
          return data;
      },
      getCartApiInfo: function (callback) {
          $.getJSON(window.location.origin + '/cart.js', function(data) {
              // callback && callback(product)
             
              callback && callback(data)
          })
      },
      getKlarnaUrl: function (dataObj) {
          let _this = this
          fetch('https://api.freebeatfit.com/shopify/v1/klarna/checkout', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataObj)
          }).then((response) => {
              return response.json();
          }).then((data) => {
              _this.loading = false
              $('.step__footer__continue-btn').removeClass('btn--loading')
              if (data.code == 0 && data.data && data.data.redirect_url) {
                  window.location.href = data.data.redirect_url
              } else {
                  MsgBox.init(`Oops,${data.msg || ''} `, 2000)
              }
          }).catch((error) => {
              _this.loading = false
              $('.step__footer__continue-btn').removeClass('btn--loading')
              MsgBox.init('Oops, please try again', 2000)
              console.log("error", error)
          })
      },
      paymentKlarnaChange: function () {
          let _this = this
          let currentUrl = window.location.href
          document.getElementById('continue_button').addEventListener("click",function (event) {
              if( _this.loading) {
                  return false
              }
              if(!$("#checkout_payment_gateway_96172048683").prop("checked")){
                return false
              }
              _this.loading = true
              $('.step__footer__continue-btn').addClass('btn--loading')
              let formObject = $('form[data-payment-form]').serializeArray();
              let formData = _this.getFormData(formObject)
              let clickPayment = formData['checkout[payment_gateway]']
              let order_amount = formData['checkout[total_price]']
              let tag_code = ""
              if ($(".tags-list").length > 0 &&$(".tags-list .reduction-code__text").length > 0) {
                  tag_code = $(".tags-list:first .reduction-code__text").text()
              }
              let isklarna = $(`label[for=checkout_payment_gateway_${clickPayment}]`)
              // if(isklarna && isklarna.text() && (isklarna.text().toLowerCase().indexOf('klarna') > -1)) {
                  let dataObj = {
                      purchase_currency: fbCheckoutInfo.purchase_currency || '',
                      // order_amount: order_amount,
                      code: tag_code,
                      phone: fbCheckoutInfo.phone || '',
                      shopping_amount: fbCheckoutInfo.shopping_amount || 0,
                      email: fbCheckoutInfo.email || '',
                      order_lines: [],
                      shipping_address: fbCheckoutInfo.shipping_address || {},
                      billing_address: fbCheckoutInfo.shipping_address || {},
                      redirect_urls: {
                          back: currentUrl,
                          cancel: currentUrl,
                          error: currentUrl,
                          failure: currentUrl,
                          success: window.location.origin + '/pages/klarna-loading'
                      }
                  }
                  // 发送前校验一下api
                  _this.getCartApiInfo(function (cartData) {
                      if(cartData && cartData.items && cartData.items.length > 0) {
                          dataObj.purchase_currency = cartData.currency || ''
                          cartData.items.forEach((lib)=> {
                              // let lineDisObj = lib.line_level_discount_allocations && lib.line_level_discount_allocations[0]
                              // let applied_discount = {}
                              // if(lineDisObj && lineDisObj.discount_application) {
                              //     let lineDisApp = lineDisObj.discount_application
                              //     applied_discount.description = lineDisApp.target_selection || ''
                              //     applied_discount.value_type = lineDisApp.value_type || ''
                              //     applied_discount.value = lineDisApp.value  || ''
                              //     applied_discount.amount = lineDisApp.value  || ''
                              //     applied_discount.title = lineDisApp.title || ''
                              // }
                              dataObj.order_lines.push({
                                  quantity: lib.quantity,
                                  image_url: lib.image,
                                  variant_id: lib.variant_id,
                                  product_id: lib.product_id
                                  // applied_discount: applied_discount
                              })
                          })
                          _this.getKlarnaUrl(dataObj)
                      } else {
                          _this.loading = false
                          $('.step__footer__continue-btn').removeClass('btn--loading')
                          $('#card-fields__processing-error').removeClass('hidden')
                      }
                  })
                  event.stopPropagation();
                  event.preventDefault();
              // }      
          },true)
      },
      event: function () {
          let _this = this
          $(document).on("page:load page:change", function (){
              if((Shopify.Checkout.step === "payment_method"&&Shopify.country == "GB")||(Shopify.Checkout.step === "payment_method"&&Shopify.Checkout.currency == "GBP")) {                
                _this.paymentKlarnaChange()
              }  
              else if(!Shopify.Checkout.step){
                  if(window.location.pathname.indexOf('orders') > -1) {
                    var stepFooter = $('.step__footer__info');
                    var newDiv = $(`<a href="https://global.freebeatfit.com/en-uk" >
                    <div class="shopping-box">Continue shopping</div> </a>`);
                  
                    if($('.step__footer__info').length>0){
                      stepFooter.before(newDiv)
                      if(window.innerWidth>768){
                        $(".shopping-box").css(
                          {
                            "width":'175px',
                            "height":'60px',
                            "float":'right',
                            "background":'#1C1B1B',
                            "color":'white',
                            "box-sizing": "border-box",
                            "border": "1px",
                            "border-radius": "5px",
                            "font-weight":" 500",
                            "padding":" 1.4em",
                            "text-align": "center",
  
                          }
                        )
                      }else{
                        $(".shopping-box").css(
                          {
                            "width":'100%',
                            "height":'70px',
                            "float":'right',
                            "background":'#1C1B1B',
                            "color":'white',
                            "box-sizing": "border-box",
                            "border": "1px",
                            "border-radius": "5px",
                            "font-weight":" 500",
                            "text-align": "center",
                            "line-height": "70px",
                            "margin":'20px 0'
                            
                          }
                        )
                      }
                    }
                      // let fb_name = getCheckoutQueryString('fb_name')
                      // let fb_orderid = getCheckoutQueryString('fb_orderid')
                      // console.log(fb_name,fb_orderid,'hahhaha要填充的数据')
                      // if(fb_name && fb_orderid ) {
                      //     $('#email').val(fb_name)
                      //     $('#order_number').val(fb_orderid)
                      //     $("button[type='submit']").click()
                      // }
                  }
              } 
              else {
              }
             
          })
      }
  }
  checkoutPayment.init()
})(Checkout.$);
