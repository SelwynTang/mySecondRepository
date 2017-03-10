var video = document.querySelector("video");
var isPlay = document.querySelector(".switch");
var controls = document.querySelector(".controls");
var expand = document.querySelector(".expand");
var volume = document.querySelector(".volume");
var voRange = document.querySelector(".vo_range");
var voRangeInput = document.querySelector(".vo_range>input");
var voRangeSpan = document.querySelector(".vo_range>span");
var progress = document.querySelector(".progress");
var loaded = document.querySelector(".progress > .loaded");
var currPlayTime = document.querySelector(".timer > .current");
var totalTime = document.querySelector(".timer > .total");
var showLike = document.querySelector("#showlike");
//当视频可播放的时候
video.oncanplay = function() {
    //显示视频
    this.style.display = "block";
    //显示视频总时长
    totalTime.innerHTML = getFormatTime(this.duration);
};
//播放按钮控制
isPlay.onclick = function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    this.classList.toggle("fa-pause");
};
//全屏
expand.onclick = function() {
    video.webkitRequestFullScreen();
};
//音量
//静音与取消静音
volume.onclick = function() {
    if (video.muted) {
        video.muted = false;
        this.classList.remove("fa-volume-off");
        this.classList.add("fa-volume-up");
    } else {
        video.muted = true;
        this.classList.remove("fa-volume-up");
        this.classList.add("fa-volume-off");
    }
};
//音量调节
voRangeSpan.innerHTML = voRangeInput.value;

function rangeChange() {
    voRangeSpan.innerHTML = voRangeInput.value;
};
//播放进度
video.ontimeupdate = function() {
    var currTime = this.currentTime, //当前播放时间
        duration = this.duration; // 视频总时长
    //百分比
    var pre = currTime / duration * 100 + "%";
    //显示进度条
    loaded.style.width = pre;
    //显示当前播放进度时间
    currPlayTime.innerHTML = getFormatTime(currTime);
};
//跳跃播放
progress.onclick = function(e) {
    var event = e || window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
};
//播放完毕还原设置
video.onended = function() {
    var that = this;
    //切换播放按钮状态
    isPlay.classList.remove("fa-pause");
    isPlay.classList.add("fa-play");
    //进度条为0
    loaded.style.width = 0;
    //还原当前播放时间
    currPlayTime.innerHTML = getFormatTime();
    //视频恢复到播放开始状态
    that.currentTime = 0;
};

function getFormatTime(time) {
    var time = time || 0;
    var h = parseInt(time / 3600),
        m = parseInt(time % 3600 / 60),
        s = parseInt(time % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return h + ":" + m + ":" + s;
}


//点赞功能
function zan(id) {
    this.box = document.getElementById(id);
}
zan.prototype.move = function() {
    var star = document.createElement('div');
    //设置随机背景色
    var r = Math.floor(Math.random() * 255 + 1);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    //设置速度
    star.sy = 0;
    star.ay = Math.floor(Math.random() * 11 + 5);
    star.sx = Math.floor(Math.random() * 40);
    var num = parseInt(Math.random() * 10) + 1;
    star.style.cssText = 'background:url("img/zan' + num + '.png") no-repeat center;position: absolute;border-radius: 50%;;right:' + star.rg + 'px;bottom:-30px;width:30px;height:30px;';
    var self = this;
    star.timer = setInterval(function() {
        star.sy += star.ay;
        var x = Math.cos(star.sy * Math.PI / 180) * star.sx;
        if (star.sy > 300) {
            clearInterval(star.timer);
            self.box.removeChild(star)
        }
        star.style.right = x + 30 + 'px';
        star.style.bottom = star.sy + 'px';
    }, 50)
    this.box.appendChild(star)
}

var z = new zan('showlike');
showLike.onclick = function(e) {
    z.move();
    // e.stopPropagation();
}


//接入微吼的API，创建活动
// function loadXMLDoc(cnt, url) {
//     var xmlhttp;
//     if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp = new XMLHttpRequest();
//     } else { // code for IE6, IE5
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlhttp.onreadystatechange = function(data) {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             // document.getElementById("ans").innerHTML = xmlhttp.responseText;
//             console.log(data);
//         }
//     }
//     xmlhttp.open("POST", url, true);
//     xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
//     xmlhttp.send(cnt);
// }


// var createURL = "http://e.vhall.com/api/vhallapi/v2/webinar/create";
// var createContent = 'subject = "培训" & start_time = 1488420000';
// var oStart = document.getElementById("start");
// oStart.onclick = function() {
//     loadXMLDoc(createContent, createURL);
// }


//接入微吼
function fnAjax(url, data, fn) {
    $.ajax({
        //提交数据的类型 POST GET
        type: "POST",
        //提交的网址
        url: url,
        //提交的数据
        data: data,
        //返回数据的格式
        datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        // beforeSend: function() {
        //     $("#msg").html("logining");
        // },
        //成功返回之后调用的函数             
        success: function(data) {
            fn(data);
        },
        //调用执行后调用的函数
        // complete: function(XMLHttpRequest, textStatus) {
        //     alert(XMLHttpRequest.responseText);
        //     alert(textStatus);
        //     HideLoading();
        // },
        //调用出错执行的函数
        error: function() {
            //请求出错处理
            alert("error")
        }
    });

}

//创建活动
var webinar_id = null;
var createURL = "http://e.vhall.com/api/vhallapi/v2/webinar/create";
var createData = {
	    auth_type: 1,
	    account: "v15483438",
	    password: "Beijing20170227",
	    subject: "培训",
	    start_time: 1489562018
	};


function fnCreate(data){
	var webinar_id = data.data;
    console.log(webinar_id);
    console.log("http://e.vhall.com/webinar/inituser/" + webinar_id);
    inputNum.value = webinar_id;
	var startURL = "http://e.vhall.com/api/vhallapi/v2/webinar/start";
	var startData = {
		auth_type: 1,
	    account: "v15483438",
	    password: "Beijing20170227",
		webinar_id : webinar_id
	};
	function fnStart(data){
		console.log(data.data);
	};

	fnAjax(startURL, startData, fnStart);
};


var oStart = document.getElementById("start");
var inputNum = document.getElementById("input_num");
oStart.onclick = function() {
    fnAjax(createURL, createData, fnCreate);

}


