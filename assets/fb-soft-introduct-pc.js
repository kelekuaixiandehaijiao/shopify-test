var timeArr=[7000,4000,3000,2000,3000]
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
     let _this=this
     for (let i = 0; i < this.sc_li.length; i++) {
       this.sc_li[i].addEventListener("click", (e) => {
         this.activeFun(i)
       });
     }
    
   },
   activeFun: function(index){
    let _this=this
    let duration=timeArr[index]
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
    this.timer = setInterval(interval,duration)
    function interval(){
        clearInterval(_this.proHeight)
        clearTimeout(_this.setTimer)
        clearInterval(_this.timer);
        _this.animation(num)
        if (num=== _this.sc_progress.length) {
          num = 0
        } else {
          num++
        }
        if (num == 0) {
          _this.timer=setInterval(interval,timeArr[-1])
         }else{
          _this.timer=setInterval(interval,timeArr[num-1])
         }
       
    }
    
 },


 
   animation: function(index){
    let duration=timeArr[index]
    // console.log(duration,'hahha')
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
       }, duration)

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
