$(function () {
  function FbKeySpec() {}
  FbKeySpec.prototype = {
    init: function () {
      let _this = this
      let titleList = document.getElementsByClassName('fb-key-spec-li-title')
      let arraryTitle = new Array(...titleList)
      arraryTitle.forEach((item) => {
        let contentDom = $(item).next('.fb-key-spec-li-content')
        let iconDom = $(item).children('.fb-key-tabIcon')

        // 添加点击事件（内容区展开/收起）
        item.addEventListener('click', () => {
          let hasOpen = contentDom.hasClass('openContent')
          if (hasOpen) {
            $(item).removeClass('openContent')
            contentDom.removeClass('openContent')
            iconDom.removeClass('openContent')
          } else {
            // 如果需要打开当前框，需要先关闭其他所有的框
            _this.removeAllContentClass()

            $(item).addClass('openContent')
            contentDom.addClass('openContent')
            iconDom.addClass('openContent')
          }
        })
      })
    },
    removeAllContentClass: function () {
      let titleList = document.getElementsByClassName('fb-key-spec-li-title')
      let arraryTitle = new Array(...titleList)
      arraryTitle.forEach((item) => {
        let contentDom = $(item).next('.fb-key-spec-li-content')
        let iconDom = $(item).children('.fb-key-tabIcon')
        $(item).removeClass('openContent')
        contentDom.removeClass('openContent')
        iconDom.removeClass('openContent')
      })
    },
  }

  var fbKeySpec = new FbKeySpec()
  fbKeySpec.init()
})
