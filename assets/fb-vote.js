  /* 彩车添加心愿单 */
  window.onload = (function () {
    let optionItems = document.querySelectorAll('.options li')
    let cardItems = document.querySelectorAll('.card li')
    // 给每个选项 绑定单击事件
    for (let i = 0; i < optionItems.length; i++) {
      optionItems[i].index = i //每个options下的li添加一个index属性
      optionItems[i].onclick = function () {
        for (let j = 0; j < optionItems.length; j++) {
          optionItems[j].classList.remove('active')
          cardItems[j].classList.remove('active')
          optionItems[j].classList.remove('activeM')
          cardItems[j].classList.remove('activeM')
        }
        this.classList.add('active')
        cardItems[this.index].classList.add('active')
        this.classList.add('activeM')
        cardItems[this.index].classList.add('activeM')
      }
    }
    //获取元素
    let pop = document.querySelector('.popFrame')
    let mask = document.querySelector('#mask')
    let addToWish = document.querySelector('.addToWish')
    let closeBtn = document.querySelector('#vote_reject')
    let subBtn = document.querySelector('#vote_resolve')
    let colorCard = document.getElementById('card_color_all')
    let everyColor = document.querySelectorAll('.card_color_all div span')
    let colorBorder = document.querySelectorAll('.card_color_all div')
    let colorDes = document.querySelector('.color_des')
    let email = document.getElementById('e-mail')
    let img_swiper = document.querySelector('.fb_vote_swiper')
    let success = document.querySelector('.success')
    let timestamp = ''
    let imgList = [
      {
        src: 'https://static.freebeatfit.com/campaign/SMOKE_WHITE.gif',
        isloading: true,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/AQUA_BLUE.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/DISCO_BRONZE.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/CAUTION_MATTE.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/TECHNO_GREY.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/MIDNIGHT_ABYSS.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/SCORCH_RED.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/BLUE_STING.gif',
        isloading: false,
      },
      // 	  {src: "https://static.freebeatfit.com/campaign/RAZZLE_CHROME.gif", isloading: false},
      //       {src: "https://static.freebeatfit.com/campaign/PURPLE_PRINCE.gif", isloading: false},
      //       第二组
      {
        src: 'https://static.freebeatfit.com/campaign/SMOKE_WHITE.gif',
        isloading: true,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/AQUA_BLUE.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/DISCO_BRONZE.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/CAUTION_MATTE.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/TECHNO_GREY.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/MIDNIGHT_ABYSS.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/SCORCH_RED.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/BLUE_STING.gif',
        isloading: false,
      },
      // 	  {src: "https://static.freebeatfit.com/campaign/RAZZLE_CHROME.gif", isloading: false},
      //       {src: "https://static.freebeatfit.com/campaign/PURPLE_PRINCE.gif", isloading: false},
    ]
    let mbImgList = [
      {
        src: 'https://static.freebeatfit.com/campaign/SMOKE_WHITE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/AQUA_BLUE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/DISCO_BRONZE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/CAUTION_MATTE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/TECHNO_GREY_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/MIDNIGHT_ABYSS_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/SCORCH_RED_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/BLUE_STING_mb.gif',
        isloading: false,
      },
      //       {src: "https://static.freebeatfit.com/campaign/RAZZLE_CHROME_mb.gif", isloading: false},
      //       {src: "https://static.freebeatfit.com/campaign/PURPLE_PRINCE_mb.gif", isloading: false},
      //       第二组
      {
        src: 'https://static.freebeatfit.com/campaign/SMOKE_WHITE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/AQUA_BLUE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/DISCO_BRONZE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/CAUTION_MATTE_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/TECHNO_GREY_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/MIDNIGHT_ABYSS_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/SCORCH_RED_mb.gif',
        isloading: false,
      },
      {
        src: 'https://static.freebeatfit.com/campaign/BLUE_STING_mb.gif',
        isloading: false,
      },
      //       {src: "https://static.freebeatfit.com/campaign/RAZZLE_CHROME_mb.gif", isloading: false},
      //       {src: "https://static.freebeatfit.com/campaign/PURPLE_PRINCE_mb.gif", isloading: false}
    ]
    let deviceImgList = []

    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      deviceImgList = mbImgList
    } else {
      deviceImgList = imgList
    }
    img_swiper.children[0].setAttribute('src', deviceImgList[0].src)
    //添加边框
    for (let i = 0; i < colorBorder.length; i++) {
      colorBorder[i].onclick = function () {
        for (let j = 0; j < colorBorder.length; j++) {
          colorBorder[j].classList.remove('card_border')
        }
        this.classList.add('card_border')

        const teemoimgLoad = (v) => {
          return new Promise((resolve) => {
            const img = new Image()
            img.src = v
            img.onload = () =>
              resolve({ width: img.width || '', height: img.height || '' })
          })
        }
        if (!deviceImgList[i].isloading) {
          img_swiper.children[0].setAttribute('src', '')
          //           img_swiper.children[1].setAttribute("src", "");
          document.querySelector('.teemo-use-loading').style.display = 'block'
          //           img_swiper.children[0].style.visibility = "hidden"
          teemoimgLoad(deviceImgList[i].src)
            .then((data) => {
              deviceImgList[i].isloading = true
              document.querySelector('.teemo-use-loading').style.display =
                'none'
              //              img_swiper.children[0].style.visibility = "visible"
              img_swiper.children[0].setAttribute('src', deviceImgList[i].src)
              //             img_swiper.children[1].setAttribute("src", mbImgList[i].src);
            })
            .catch(() => {
              img_swiper.children[0].setAttribute('src', '')
              //             img_swiper.children[1].setAttribute("src", '');
            })
        } else {
          document.querySelector('.teemo-use-loading').style.display = 'none'
          img_swiper.children[0].setAttribute('src', deviceImgList[i].src)
          //           img_swiper.children[1].setAttribute("src", mbImgList[i].src);
        }
      }
    }
    //点击添加心愿單
    addToWish.onclick = function () {
      timestamp = new Date().getTime()
      localStorage.setItem('timestamp', timestamp)
      localStorage.setItem('color', colorDes.innerHTML)
      // https://api.freebeatfit.com/
      fetch('https://api.freebeatfit.com/litbike/submitcolor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: '',
          color: colorDes.innerHTML,
          submitTime: timestamp,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.code === 200) {
            //             console.log(data);
          } else {
            //             console.log("error");
          }
        })
      pop.style.display = 'block'
      mask.style.display = 'block'
      //       console.log(timestamp);
    }
    subBtn.onclick = function () {
      let pattern =
        /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
      if (pattern.test(email.value)) {
        fetch('https://api.freebeatfit.com/litbike/submitcolor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            color: colorDes.innerHTML,
            submitTime: timestamp,
          }),
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            if (data.code === 200) {
              console.log(data)
            } else {
              console.log('error')
            }
          })
        success.style.display = 'block'
        let setTimerClose = setTimeout(() => {
          success.style.display = 'none'
          mask.style.display = 'none'
          clearTimeout(setTimerClose)
        }, 5000)
      } else {
        alert('invalid email')
        mask.style.display = 'none'
      }
      email.value = ''
      pop.style.display = 'none'
      //       mask.style.display = "none";
    }
    closeBtn.onclick = function () {
      pop.style.display = 'none'
      mask.style.display = 'none'
    }
    for (let i = 0; i < everyColor.length; i++) {
      everyColor[i].onclick = function () {
        // 替换文字
        colorDes.innerHTML = everyColor[i].id.replace('_', ' ')
      }
    }
})
  /* 彩车添加心愿单End */