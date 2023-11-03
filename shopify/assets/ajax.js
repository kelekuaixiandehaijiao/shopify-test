// 封装ajax

function Ajax(obj) {
  let token = ''
  if(localStorage.memberUserInfo){
  	token = JSON.parse(localStorage.memberUserInfo).token
  }else{
  	token = ''
  }
   	
    let xmlhttp = '';
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open(obj.type, obj.url, true);
    xmlhttp.setRequestHeader('content-type', 'application/json');
  	xmlhttp.setRequestHeader('token', token);
    xmlhttp.setRequestHeader("X-Platform-Type", "web");
    xmlhttp.setRequestHeader("Authorization", token);
    let param = '' || JSON.stringify(obj.param)
    xmlhttp.send(param);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText)
            obj.success(data)
        }
    }
}
let ajax = Ajax