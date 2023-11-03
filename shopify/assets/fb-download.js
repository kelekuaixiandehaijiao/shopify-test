var timeArr = [7000, 4000, 3000, 2000, 3000];
$(function () {
  let downloadIndex = 0;
  let downloadOneSlideIndex = 0;
  let downloadTitleMbNormal = 30;
  let downloadTitleMb = 30;
  let progressHeight = 115;
  function Download() {
    this.download_sc_li = document.getElementsByClassName("left-download-li");
    this.download_item_title = document.getElementsByClassName(
      "left-download-title",
    );
    this.download_sc_progress = document.getElementsByClassName(
      "left-download-progress",
    );
    this.download_sc_info =
      document.getElementsByClassName("left-download-info");
    this.download_sc_dx = document.getElementsByClassName("download-right-img");
    this.downloadTimer = null;
    this.downloadProHeight = null;
    this.downloadSetTimer = null;
    this.downloadHeight = 10;
  }
  Download.prototype = {
    init: function () {
      let _this = this;
      for (let i = 0; i < this.download_sc_li.length; i++) {
        this.download_sc_li[i].addEventListener("click", (e) => {
          this.downloadActiveFun(i);
        });
      }
    },
    downloadActiveFun: function (index) {
      // console.log(index, '当前点击的索引')
      let _this = this;
      let downloadDuration = timeArr[index];
      this.downloadHeight = 30;
      this.downloadHeight2 = 30;
      this.animation(index);
      let num = index + 1;
      if (num === this.download_sc_progress.length) {
        num = 0;
      }
      function interval() {
        if (num === _this.download_sc_progress.length) {
          num = 0;
        } else {
          num++;
        }
      }
    },

    animation: function (index) {
      let downloadDuration = timeArr[index];
      // console.log(downloadDuration,'hahha')
      for (let i = 0; i < this.download_sc_progress.length; i++) {
        if (i === index) {
          this.download_sc_dx[i].style.display = 'block';
          this.download_sc_progress[i].style.opacity = "1";
          this.download_sc_info[i].style.opacity = "1";
          this.download_sc_info[i].style.height = "auto";
          this.download_sc_info[i].style.marginBottom = "20px";
          // this.download_sc_li[i].style.pointerEvents = 'none'
          this.download_item_title[i].style.opacity = "1";
          this.download_item_title[i].style.marginBottom = downloadTitleMb + "px";
          
          this.downloadHeight = 30;
          this.downloadProHeight = setInterval(() => {
            // this.download_sc_progress[i].style.height = this.downloadHeight++ + "%"
            // this.download_sc_progress[i].style.height = "80%"
            this.download_sc_progress[i].style.height = progressHeight + "px";
            // this.download_sc_progress[i].style.height = "100%"
          }, 71.428571);
          this.downloadSetTimer = setTimeout(() => {
            clearInterval(this.downloadProHeight);
            clearTimeout(this.downloadSetTimer);
          }, downloadDuration);
        } else {
          this.download_sc_info[i].style.marginBottom = 0;
          this.download_item_title[i].style.marginBottom = downloadTitleMbNormal + "px";
          this.downloadHeight = 30;
          this.download_sc_dx[i].style.display = "none";
          this.download_sc_progress[i].style.opacity = "0";
          this.download_sc_progress[i].style.height = "80%";
          this.download_sc_info[i].style.opacity = 0;
          this.download_sc_info[i].style.height = 0;
          this.download_item_title[i].style.opacity = "0.5";
        }
      }
    },
    downloadMbSwiperFun: function () {
      let _this = this;

      const imageSwiper = new Swiper(".mbDoLoad", {
        spaceBetween: 0,
        // slidesPerView: 1,
        // initialSlide: 0,
        loop: false,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        on: {
          slideChange() {},
        },
      });

      const downloadMbSwiper = new Swiper(".fbdownloadSwiper", {
        spaceBetween: 0,
        slidesPerView: "auto",
        cssMode: true,
        initialSlide: 0,
        centeredSlides: true,
        centeredSlidesBounds: true,
        scrollbar: {
          el: ".mb-download-swiper-scrollbar",
          draggable: true,
        },
        on: {
          slideChange() {
            var startX, startY;

            document.addEventListener(
              "touchstart",
              function (event) {
                // 获取触摸起始点的坐标
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
              },
              false,
            );
          },
        },
        controller: {
          control: imageSwiper, //控制Swiper1
        },
      });
      // 设置双向控制
      imageSwiper.controller.control = downloadMbSwiper;
      downloadMbSwiper.controller.control = imageSwiper;
    },
    downloadPcSwiper: function () {
      let _this = this;
      var downloadSwiper = new Swiper(".fb-download-tab", {
        loop: false,
        spaceBetween: 10,
        slidesPerView: 2,
        freeMode: true,
      });
      var downloadContainerSwiper = new Swiper(".left-discover-container", {
        loop: false,
        spaceBetween: 10,
        // effect: 'fade',
        // initialSlide: 0,
        noSwiping: window.innerWidth > 768, // 根据屏幕宽度设置 noSwiping 的值
        noSwipingClass: "left-download-container", // 设置 noSwipingClass
        // noSwipingClass: 'left-discover-container', // 设置 noSwipingClass
        thumbs: {
          swiper: downloadSwiper,
        },
        on: {
          slideChange: function () {
            if (window.innerWidth > 768) {
              if (this.activeIndex === 1) {
                downloadContainerSwiper.slideTo(1, 300, false); // 切换到 outdoor
                _this.downloadActiveFun(4);
              } else {
                _this.downloadActiveFun(0);
              }
            } else {
              var downloadImgElement = $(".bg-box:eq(4)")[0];
              if (this.activeIndex == 1) {
                downloadImgElement.style.opacity = "1";
                downloadIndex = 1;
              } else {
                var downloadImgElement = $(
                  `.bg-box:eq(${downloadOneSlideIndex})`,
                )[0];
                downloadImgElement.style.opacity = "1";
                downloadIndex = 0;
              }
            }
          },
        },
      });
    },
  };
  if (window.innerWidth < 1280) {
    downloadTitleMb = 10;
    downloadTitleMbNormal = 26;
    progressHeight = 115;
  } else {
    downloadTitleMb = 16;
    downloadTitleMbNormal = 46;
    progressHeight = 120;
  }
  var downloadAct = new Download();
  if (window.innerWidth <= 768) {
    downloadAct.downloadMbSwiperFun();
  } else {
    downloadAct.init();
    downloadAct.downloadActiveFun(0);
  }
  
  downloadAct.downloadPcSwiper();
});
