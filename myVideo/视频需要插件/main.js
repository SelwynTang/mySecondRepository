//格式化年月日
//var dDate = new Date();获取当前的年月日时分秒
//月份从0开始
function fnDate(dDate,sMark){
	var dYear = dDate.getFullYear();
	var dMonth = add10(dDate.getMonth()+1);
	var dDay = add10(dDate.getDate());
	var result = "";
	if(sMark){
		result = dYear + sMark + dMonth + sMark + dDay;
	}else{
		result = dYear + "年" + dMonth + "月" + dDay + "日";
	}
	return result;
}

//格式化时间
function fnTime(dDate,sMark){
	var dHours = add10(dDate.getHours());
	var dMinutes = add10(dDate.getMinutes());
	var dSeconds = add10(dDate.getSeconds());
	var result = "";
	if(sMark){
		result = dHours + sMark + dMinutes + sMark + dSeconds;
	}else{
		result = dHours + "时" + dMinutes + "分" + dSeconds + "秒";
	}
	return result;
}

//格式化星期
//星期从周日开始，对应数字0
function fnWeek(dDate){
	var dWeek = dDate.getDay();
	var nWeek = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	
	return nWeek[dWeek];
}

//补位（当数位不足10的时候）
function add10(num){
	if(num < 10){
		num = "0" + num;
	}
	return num;
}

//计算天数
//getTime()获取的时间单位是毫秒
function fnDays(dDate){
	var dYear = dDate.getFullYear();
	var dMonth = dDate.getMonth();
	var dDate01 = new Date(dYear,dMonth,1);
	var dDate02 = new Date(dYear,dMonth+1,1);
	var nDays = (dDate02.getTime()-dDate01.getTime())/1000/60/60/24;
	return nDays;
}

//通过className获取元素名，IE8以下不兼容document.getElementsByClassName()，用此法解决
function getClassName(obj,sClassName){
	var aTag = obj.getElementsByTagName("*");
	var aNewTag = [];
	for(var i = 0;i < aTag.length;i++){
		if(aTag[i].className == sClassName){
			aNewTag.push(aTag[i]);
		}
	}
	return aNewTag;
}

//冒泡排序（有小到大）
function fnBub(){
	for(var i = 1; i < arr.length; i++){
		for(var j = 0; j < arr.length-i; j++){
			if(arr[j] > arr[j+1]){
				var temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
}

//随机颜色（数组方式，颜色赋值为16进制）
function fnRandomColor(){
	var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	var sColor = "#";
	for(var i = 1;i <= 6;i++){
		sColor += arr[Math.floor(Math.random()*arr.length)];
	}
	alert(sColor);//可以把sColor赋值给变量
}
//随机颜色（颜色赋值为rgb）
function randomColor(obj){
	obj.style.backgroundColor = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) +  ")";
}


//数组去重（定义一个新的空数组，将去重后的数据放到新数组中）
//arr为需要去重的数组
function fnRepetition(){
	var arr01 = [];
	arr01.push(arr[0]);
	for(var i = 1;i < arr.length;i++){
		var bBool = true;//开关
		for(var j =0;j < arr01.length;j++){
			if(arr01[j] == arr[i]){
				bBool = false;
				break;
			}		
		}
		if(bBool){
			arr01.push(arr[i]);
		}
	}
	alert(arr01);
}

//将字符串中的部分字符用*替代
//sStr为整个字符串，nStart为开头不须隐藏的字符数，nEnd为末尾不须隐藏的字符数
function hidStr(sStr, nStart, nEnd){
	var sStart = sStr.substring(0, nStart);
	var sEnd = sStr.substring(sStr.length-nEnd);
	var sHid = "";
	var nStar = sStr.length-nStart-nEnd;
	for(var i = 0; i < nStar; i++){
		sHid += "*";
	}
	return sStart + sHid + sEnd;
}

//scroll到某个位置，出现“返回顶部”的标签（在window.onscroll=function(){}中调用fnScroll）
//sId为“返回顶部”标签的id名
function fnScroll(sId,nHeight){
	var oBox = document.getElementById(sId);
	var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
	if(scrollT > nHeight){
		oBox.style.display = 'block';
	}else{
		oBox.style.display = 'none';
	}
}

//触发点击事件fnScrollTo，回到顶部
//电商网站中经常用到
function fnScrollTo(){
	var timer = setInterval(function(){
		var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollT == 0){
			clearInterval(timer);
		}else{
			window.scrollTo(0,scrollT-200);
		}	
	},100);
}

//读取进度条
//sId为进度条的id名，nW为进度条的长度，nWe为单位时间的加载量，timer为单位时间的变化量
function readerBar(sId,nW,nWe,timer){
	var oBox = document.getElementById(sId);
	var timer = setInterval(function(){
		var nWidth = parseInt(oBox.style.width);
		if(nWidth == nW){  
			clearInterval(timer);
		}else{
			oBox.style.width = nWidth + nWe + 'px';
		}
	},timer);
}

//通过Ajax获取数据
//url为数据的路径，fnSucc为正确获取数据后的操作，fnFail为未正确获取数据后的操作
function fnAjax(url, fnSucc, fnFail){
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("MSXML2.XMLHttp");
	}
	xhr.open("GET", url, true);//true为异步
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				fnSucc(xhr.responseText);
			}else{
				fnFail(xhr.status);
			}
		}
	}
}
//使用Ajax后为未正确获取数据后的操作，对应上面的fnFail
function fnError(code){
	if(code == 404){
		oBtn.innerHTML = "文件未找到";
	}else{
		oBtn.innerHTML = "服务器错误";
	}
}


//获取CSS中的样式
//oDiv为获取的对象，direct为需要的属性
function getStyle(oDiv, direct){
	var result = "";
	if(window.getComputedStyle){
		result = window.getComputedStyle(oDiv, false)[direct];//高版本浏览器
	}else{
		result = oDiv.currentStyle[direct];//IE浏览器
	}
	return result;
}


//匀速运动（包括了opacity属性）
//oDiv为获取的对象，nTarget为运动的总距离，nSpeed为运动的单位速度，direct为变化的属性
function constantSpeed(oDiv, nTarget, nSpeed, direct){
	//先关闭上一个定时器
	clearInterval(oDiv.timer);
	
	var offSet = parseInt(getStyle(oDiv,direct));
	
	if(direct == "opacity"){
		offSet = getStyle(oDiv, direct)*100;
	}
	//判断速度的方向
	if(nTarget < offSet){
		nSpeed *= -1;
	}
	//开启定时器，开始运动
	oDiv.timer = setInterval(function(){
		//获取当前位置，进行位置改变（加上速度）
		offSet = parseInt(getStyle(oDiv, direct));//获取普通属性值
		
		if(direct == "opacity"){
			offSet = getStyle(oDiv, direct)*100//获取透明度属性值
		}
		
		var nEnd = 0;//定义一个变量，用于存放下一次运动的位置
		if(Math.abs(nTarget-offSet) <= Math.abs(nSpeed)){
			clearInterval(oDiv.timer);//清除定时器；
			nEnd = nTarget;//如果将会到达终点，则nEnd直接等于终点
		}else{
			nEnd = offSet + nSpeed;//其他情况，nEnd等于下次运动的位置
		}
		
		//进行最终操作，改变样式
		if(direct == "opacity"){
			oDiv.style.opacity = nEnd/100;
			oDiv.style.filter = "alpha(opacity:"+nEnd+")";
		}else{
			oDiv.style[direct] = nEnd + "px";
		}
	},30);
}

//加速运动（包括了opacity属性）
//oBox为获取的对象，nTarget为运动的总距离，direct为变化的属性，fn为回调函数（用于链式运动）
function accelerateSpeed(oBox, oJson, fn){
	clearInterval(oBox.timer);
	oBox.timer = setInterval(function(){
		var bSwitch = true;
		for(var direct in oJson){
			var offSet = parseInt(getStyle(oBox, direct));
			if(direct == "opacity"){
				var offSet = getStyle(oBox, direct)*100;
			}
			
			var nSpeed = (oJson[direct] - offSet)/6;
			
			nSpeed = nSpeed > 0?Math.ceil(nSpeed):Math.floor(nSpeed);
			
			if(nSpeed != 0){
				bSwitch = false;
			}
			
			if(direct == "opacity"){
				oBox.style[direct] = (offSet + nSpeed)/100;
				oBox.style["filter"] = "alpha(opacity:" + (offSet + nSpeed) + ")";
			}else{
				oBox.style[direct] = offSet + nSpeed + "px";
			}
			
		}
		if(bSwitch){
			clearInterval(oBox.timer);
			if(fn){
				fn();	
			}	
		}
	}, 30)
}

//改变透明度
//oDiv为获取的对象，nTarget为最终透明度的值，nSpeed为运动的单位速度
function opacityChange(oBox, nTarget, nSpeed){
	clearInterval(oBox.timer);
	var offSet = getStyle(oBox,"opacity")*100;
	if(nTarget < offSet){
		nSpeed *= -1;
	}
	oBox.timer = setInterval(function(){
		offSet = getStyle(oBox,"opacity")*100;
		if(Math.abs(nTarget-offSet) < Math.abs(nSpeed)){
			clearInterval(oBox.timer);
			oBox.style.opacity = nTarget/100;
			oBox.style.filter = "alpha(opacity:"+nTarget+")";
		}else{
			oBox.style.opacity = (offSet + nSpeed)/100;
			oBox.style.filter = "alpha(opacity:" +(offSet + nSpeed) +")";
		}
	}, 30);	
}	

//DOM2级事件添加方法
function addEvent(oBox, sEvent, aFn){
	for(var i=0; i<aFn.length; i++){
		if(oBox.addEventListener){
			oBox.addEventListener(sEvent, aFn[i], false);
		}else{
			oBox.attachEvent("on"+sEvent, aFn[i])
		}
	}
}

//创建cookie
//sKey为cookie中的键，sValue为cookie中的值，passday为过期时间
function setCookie(sKey, sValue, passDay){
	//创建过期时间
	var dDate = new Date();
	dDate.setDate(dDate.getDate()+passDay);
	//设置cookie
	//存放cookie应该以名值对儿的形式，key=value;
	document.cookie = sKey+"="+sValue+"; expires="+dDate;
}

//获取cookie
//sKey为cookie中的name
function getCookie(sKey){
	var result = "";
	//将整条cookie分割为键值对儿的数组：["name=张三", "age=12"];
	var aCookie = document.cookie.split("; ");
	for(var i=0; i<aCookie.length; i++){
		//通过“=”将键值对儿拆分为数组：["name", "张三"];
		var aCook = aCookie[i].split("=");
		//匹配sKey，如果aCook[0] === sKey,则拿到这个值
		if(aCook[0] === sKey){
			result = aCook[1];
		}
	}
	return result;//返回取到的值
}

//删除cookie
function delCookie(sKey){
	setCookie(sKey, "", -1);
}
