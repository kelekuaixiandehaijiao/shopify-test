/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./shopify/sections/**/*.{html,js,liquid}",
    "./shopify/layout/*.{html,js,liquid}",
    "./shopify/snippets/*.{html,js,liquid}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat"],
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      lineHeight: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        24: "6rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.5rem",
      },
      flex: {
        .5: "1 1 50%",
      },
      fontSize: {
        40: ["40px", "48px"],
        32: ["32px", "40px"],
        24: ["24px", "32px"],
        20: ["20px", "28px"],
        18: ["18px", "26px"],
        16: ["16px", "24px"],
        14: ["14px", "20px"],
        12: ["12px", "16px"],
        10: ["10px", "14px"],
        11: ["11px", "11px"],
        32: ["32px", "40px"],
        "h-20": ["20px", "24px"],
        "h-12": ["12px", "18px"],
        "h-24": ["24px", "24px"],
        "h-12-s": ["12px", "12px"],
        "h-18": ["18px", "18px"],
        "h-16": ["16px", "16px"],
        "h-14": ["14px", "14px"],
        "h-10": ["10px", "10px"],
        "3r": ["3rem", "3rem"],
        "4r": ["4rem", "4rem"],
      },
      colors: {
        "00cc45": "#00cc45",
        a1f200: "#a1f200",
        121212: "#121212",
        666666: "#666666",
        999999: "#999999",
        cccccc: "#cccccc",
        e6e6e6: "#e6e6e6",
        f5f5f5: "#f5f5f5",
        a2a2a2: "#a2a2a2",
        333333: "#333333",
        D9D9D9:"#D9D9D9",
        "d1d1d1": "#d1d1d1",
        "808080":"#808080"
      },
      height: {
        "4.5": "18px"
      },
      screens: {
        "fb-sm": "640px",
        "fb-md": "1280px",
        "fb-769": "769px", //ebike page
        "fb-1120": "1120px", //ebike page
        "fb-max-768": { max: "768px" }, //ebike page
        "fb-1211": "1211px"  //ebike page
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
        29: "7.25rem",
        30: "7.5rem",
        31: "7.75rem",
        33: "8.25rem",
        34: "8.5rem",
        35: "8.75rem",
        37: "9.25rem",
        38: "9.5rem",
        39: "9.75rem",
        41: "10.25rem",
        42: "10.5rem",
        43: "10.75rem",
        45: "11.25rem",
        46: "11.5rem",
        47: "11.75rem",
        49: "12.25rem",
        50: "12.5rem",
        51: "12.75rem",
        53: "13.25rem",
        54: "13.5rem",
        55: "13.75rem",
        57: "14.25rem",
        58: "14.5rem",
        59: "14.75rem",
        61: "15.25rem",
        62: "15.5rem",
        63: "15.75rem",
        65: "16.25rem",
        66: "16.5rem",
        67: "16.75rem",
        68: "17rem",
        69: "17.25rem",
        70: "17.5rem",
        71: "17.75rem",
        72: "18rem",
        73: "18.25rem",
        74: "18.5rem",
        75: "18.75rem",
        76: "19rem",
        77: "19.25rem",
        78: "19.5rem",
        79: "19.75rem",
        80: "20rem",
        81: "20.25rem",
        82: "20.5rem",
        83: "20.75rem",
        84: "21rem",
        85: "21.25rem",
        86: "21.5rem",
        87: "21.75rem",
        88: "22rem",
        89: "22.25rem",
        90: "22.5rem",
        91: "22.75rem",
        92: "23rem",
        93: "23.25rem",
        94: "23.5rem",
        95: "23.75rem",
        96: "24rem",
        97: "24.25rem",
        98: "24.5rem",
        99: "24.75rem",
        100: "25rem",
        101: "25.25rem",
        102: "25.5rem",
        103: "25.75rem",
        104: "26rem",
        105: "26.25rem",
        106: "26.5rem",
        107: "26.75rem",
        108: "27rem",
        109: "27.25rem",
        110: "27.5rem",
        111: "27.75rem",
        112: "28rem",
        113: "28.25rem",
        114: "28.5rem",
        115: "28.75rem",
        116: "29rem",
        117: "29.25rem",
        118: "29.5rem",
        119: "29.75rem",
        120: "30rem",
        121: "30.25rem",
        122: "30.5rem",
        123: "30.75rem",
        124: "31rem",
        125: "31.25rem",
        126: "31.5rem",
        127: "31.75rem",
        128: "32rem",
        129: "32.25rem",
        130: "32.5rem",
        131: "32.75rem",
        132: "33rem",
        133: "33.25rem",
        134: "33.5rem",
        135: "33.75rem",
        136: "34rem",
        137: "34.25rem",
        138: "34.5rem",
        139: "34.75rem",
        140: "35rem",
        141: "35.25rem",
        142: "35.5rem",
        143: "35.75rem",
        144: "36rem",
        145: "36.25rem",
        146: "36.5rem",
        147: "36.75rem",
        148: "37rem",
        149: "37.25rem",
        150: "37.5rem",
        151: "37.75rem",
        152: "38rem",
        153: "38.25rem",
        154: "38.5rem",
        155: "38.75rem",
        156: "39rem",
        157: "39.25rem",
        158: "39.5rem",
        159: "39.75rem",
        160: "40rem",
        "1r": "1rem",
        "2r": "2rem",
        "3r": "3rem",
        "4r": "4rem",
        "5r": "5rem",
        "6r": "6rem",
        "7r": "7rem",
        "8r": "8rem",
        "9r": "9rem",
        "10r": "10rem",
        "11r": "11rem",
        "12r": "12rem",
        "13r": "13rem",
        "14r": "14rem",
        "15r": "15rem",
        "16r": "16rem",
        "17r": "17rem",
        "18r": "18rem",
        "19r": "19rem",
        "20r": "20rem",
        "21r": "21rem",
        "22r": "22rem",
        "23r": "23rem",
        "24r": "24rem",
        "25r": "25rem",
        "26r": "26rem",
        "27r": "27rem",
        "28r": "28rem",
        "29r": "29rem",
        "30r": "30rem",
        "31r": "31rem",
        "32r": "32rem",
        "33r": "33rem",
        "34r": "34rem",
        "35r": "35rem",
        "36r": "36rem",
        "37r": "37rem",
        "38r": "38rem",
        "39r": "39rem",
        "40r": "40rem",
        "41r": "41rem",
        "42r": "42rem",
        "43r": "43rem",
        "44r": "44rem",
        "45r": "45rem",
        "46r": "46rem",
        "47r": "47rem",
        "48r": "48rem",
        "49r": "49rem",
        "50r": "50rem",
        "51r": "51rem",
        "52r": "52rem",
        "53r": "53rem",
        "54r": "54rem",
        "55r": "55rem",
        "56r": "56rem",
        "57r": "57rem",
        "58r": "58rem",
        "59r": "59rem",
        "60r": "60rem",
        "61r": "61rem",
        "62r": "62rem",
        "63r": "63rem",
        "64r": "64rem",
        "65r": "65rem",
        "66r": "66rem",
        "67r": "67rem",
        "68r": "68rem",
        "69r": "69rem",
        "70r": "70rem",
        "71r": "71rem",
        "72r": "72rem",
        "73r": "73rem",
        "74r": "74rem",
        "75r": "75rem",
        "76r": "76rem",
        "77r": "77rem",
        "78r": "78rem",
        "79r": "79rem",
        "80r": "80rem",
        "81r": "81rem",
        "82r": "82rem",
        "83r": "83rem",
        "84r": "84rem",
        "85r": "85rem",
        "86r": "86rem",
        "87r": "87rem",
        "88r": "88rem",
        "89r": "89rem",
        "90r": "90rem",
        "91r": "91rem",
        "92r": "92rem",
        "93r": "93rem",
        "94r": "94rem",
        "95r": "95rem",
        "96r": "96rem",
        "97r": "97rem",
        "98r": "98rem",
        "99r": "99rem",
        "100r": "100rem",
        "1/20": "5%",
        "2/20": "10%",
        "3/20": "15%",
        "4/20": "20%",
        "5/20": "25%",
        "6/20": "30%",
        "7/20": "35%",
        "8/20": "40%",
        "9/20": "45%",
        "10/20": "50%",
        "11/20": "55%",
        "12/20": "60%",
        "13/20": "65%",
        "14/20": "70%",
        "15/20": "75%",
        "16/20": "80%",
        "17/20": "85%",
        "18/20": "90%",
        "19/20": "95%",
      },
      maxWidth: {
        "2r": "2rem",
        "4r": "4rem",
        "6r": "6rem",
        "8r": "8rem",
        "10r": "10rem",
        "12r": "12rem",
        "14r": "14rem",
        "16r": "16rem",
        "18r": "18rem",
        "20r": "20rem",
        "22r": "22rem",
        "24r": "24rem",
        "26r": "26rem",
        "28r": "28rem",
        "30r": "30rem",
        "32r": "32rem",
        "34r": "34rem",
        "36r": "36rem",
        "38r": "38rem",
        "40r": "40rem",
        "42r": "42rem",
        "44r": "44rem",
        "46r": "46rem",
        "48r": "48rem",
        "50r": "50rem",
        "52r": "52rem",
        "54r": "54rem",
        "56r": "56rem",
        "58r": "58rem",
        "60r": "60rem",
        "62r": "62rem",
        "64r": "64rem",
        "66r": "66rem",
        "68r": "68rem",
        "70r": "70rem",
        "75r": "75rem",
      },
      minHeight: {
        "2r": "2rem",
        "4r": "4rem",
        "6r": "6rem",
        "8r": "8rem",
        "10r": "10rem",
        "12r": "12rem",
        "14r": "14rem",
        "16r": "16rem",
        "18r": "18rem",
        "20r": "20rem",
        "22r": "22rem",
        "24r": "24rem",
        "26r": "26rem",
        "28r": "28rem",
        "30r": "30rem",
        "32r": "32rem",
        "34r": "34rem",
        "36r": "36rem",
        "38r": "38rem",
        "40r": "40rem",
        "42r": "42rem",
        "44r": "44rem",
        "46r": "46rem",
        "48r": "48rem",
        "50r": "50rem",
        "52r": "52rem",
        "54r": "54rem",
        "56r": "56rem",
        "58r": "58rem",
        "60r": "60rem",
        "62r": "62rem",
        "64r": "64rem",
        "66r": "66rem",
        "68r": "68rem",
        "70r": "70rem",
        "75r": "75rem",
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
