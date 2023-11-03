function branchEvent(event, orderId, userId) {
    try {
      window.branch && window.branch.logEvent(
        event,
        {
          orderId: orderId || '',
          userId: userId || ''
        }
      );
    } catch (e) { }
  }
function customGtmEvent(category, action, label, value) {
    console.log("category", category)
    let eventObj = {
        'event': 'custom_event',
        'gtm.category': category,
        'gtm.action': action,
        'gtm.label': label,
        'gtm.value': value,
    };
    try {
        window.dataLayer && window.dataLayer.push(eventObj);
        console.log("window.dataLayer", window.dataLayer)
    } catch (e) {}
}
function customGaEvent(category,action,label, value) {
    try {
//         ga(action, '', {
//             'event_category': category,
//             '‘event_label’': label
//         })
       ga('send', 'event', category, action, label, value);
    } catch (e) {

    }
}

function uet_report_conversion_subscribe() {
    console.log('uet_report_conversion_subscribe')
      window.uetq = window.uetq || [];
      window.uetq.push('event', 'subscribe', {});
  }
