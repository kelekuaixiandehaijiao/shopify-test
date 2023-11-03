$(function() {
    //  bick卖点特效
  function Effect(){
    this.sc_li = document.getElementsByClassName('sc-li');
    this.item_title = document.getElementsByClassName('item-title');
    this.sc_progress = document.getElementsByClassName('sc-progress');
    this.sc_info = document.getElementsByClassName('item-info');
    this.sc_dx = document.getElementsByClassName('sc-dx');
    this.timer = null
    this.proHeight = null
    this.setTimer = null
    this.height = 30
  }
  Effect.prototype = {
    init: function(){
      for (let i = 0; i < this.sc_li.length; i++) {
        this.sc_li[i].addEventListener("click", (e) => {
          this.activeFun(i)
        });
      }
    },
    activeFun: function(index){
      this.height = 30
      this.height2 = 30
      clearInterval(this.timer)
      clearInterval(this.proHeight)
      clearTimeout(this.setTimer)
      this.animation(index)
      let num = index + 1
      if (num === this.sc_progress.length) {
        num = 0
      }
      this.timer = setInterval(() => {
                               clearInterval(this.proHeight)
      clearTimeout(this.setTimer)
      this.animation(num)
      if (num === this.sc_progress.length - 1) {
        num = 0
      } else {
        num++
      }
    }, 5000)
  },
    animation: function(index){
      for (let i = 0; i < this.sc_progress.length; i++) {
        if (i === index) {
          this.sc_dx[i].style.opacity = "1"
          this.sc_progress[i].style.opacity = "1"
          this.sc_info[i].style.opacity = "1"
          this.sc_info[i].style.height = '92px'
          this.sc_li[i].style.pointerEvents = 'none'
          this.item_title[i].style.opacity = "1"
          this.height = 30
          this.proHeight = setInterval(() => {
                                       this.sc_progress[i].style.height = this.height++ + "%"
                                       }, 71.428571)
          this.setTimer = setTimeout(() => {
                                     clearInterval(this.proHeight)
          clearTimeout(this.setTimer)
        }, 5000)

      } else {
        this.height = 30
        this.sc_dx[i].style.opacity = "0"
        this.sc_li[i].style.pointerEvents = 'auto'
        this.sc_progress[i].style.opacity = "0"
        this.sc_progress[i].style.height = "30%"
        this.sc_info[i].style.opacity = 0
        this.sc_info[i].style.height = 0
        this.item_title[i].style.opacity = "0.5"
      }
    }
	}
 }

 var act = new Effect()
  act.init()
  act.activeFun(0)
// -------买点end--------
  

})