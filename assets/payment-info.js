      
const PaymentInfo = JSON.parse(localStorage.getItem('memberUserInfo') || null);

$(function () {
  const paymeniInfo = {
    _paymentPrompt: $('#payment-prompt'),
    _paymentAccountOne: $('#payment-account-one'),
    _paymentAccountTwo: $('#payment-account-two'),
    _footerUrl: $('#footer-url'),
    _footerUrl2: $('#footer-url2'),
    _fbMembership2: $('.fb-membership2'),
    init: function () {
      this.ShowPayment();
      this.PaymentCheck();
    },
    updateOrder(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      console.log('update Order');
      document.getElementById('SubscribeLoading').style.display = 'block';
      document.getElementById('Subscribe').classList.add('noClick');

      ajax({
        type: 'GET',
        url: 'https://api.freebeatfit.com/client-api/v1/create-customer-portal-session',
        param: {
          skuId: '2',
        },
        success: function (res) {
          console.log(res);
          document.getElementById('SubscribeLoading').style.display = 'none';
          window.location.href = res.data;
        },
      });
    },
    PaymentCheck(data) {
      let _this = this;
      _this._footerUrl2.hide();
      if (!data) {
        _this._paymentPrompt.show();
        _this._paymentAccountOne.show();
        _this._paymentAccountTwo.hide();
        _this._footerUrl.show();
        document.getElementById('Subscribe').style.display = 'block';
        document.getElementById('Unsubscribe').style.display = 'none';
      } else {
        _this._paymentAccountOne.hide();
        _this._paymentAccountTwo.show();
        _this._paymentPrompt.show();
        let cart = 'No payment found.';
        if (data.paymentAccountNumber) {
          cart = data.paymentAccountNumber;
          _this._paymentPrompt.hide();
          _this._footerUrl.show();
          document.getElementById('Subscribe').style.display = 'block';
          document.getElementById('Unsubscribe').style.display = 'block';
          document.getElementById('Subscribe').addEventListener('click', _this.updateOrder, true);
        } else {
          _this._footerUrl.show();
          document.getElementById('Subscribe').style.display = 'block';
          document.getElementById('Unsubscribe').style.display = 'none';
          document.getElementById('Subscribe').removeEventListener('click', _this.updateOrder, true);
        }
        _this._paymentAccountTwo.text(cart);
      }
    },
    ShowPayment() {
      let _this = this;
      ajax({
        type: 'POST',
        url: 'https://api.freebeatfit.com/client-api/v1/order/renewalMember',
        success: function (res) {
          let { code, data, msg } = res;
          if (code == 200) {
            _this.PaymentCheck(data || null);
          }
        },
      });
    },
  };

  if (PaymentInfo && PaymentInfo.token) {
    paymeniInfo.init();
  }
});

    