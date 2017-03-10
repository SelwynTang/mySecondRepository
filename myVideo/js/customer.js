window.onload = function(){
	//获取传递来的数据
	var service_href = location.href;
	console.log(service_href);
	//截取出所需要的信息（活动id）
	var web_id = service_href.substr(service_href.indexOf("?") + 1);

	var myIframe = document.querySelector("#myiframe");
	var src = "http://e.vhall.com/webinar/inituser/";
	//动态改变iframe的地址
	myIframe.src = src + web_id;
	
	//发送ajax
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

	var ctCheme = document.querySelector(".ct_cheme");
	var activityIntro = document.querySelector(".activity_intro");
	var ciHost = document.querySelector(".ciHost");
	var ciTime = document.querySelector(".ciTime");


	//主页面的登录注册
	var window_width = document.body.clientWidth || document.documentElement.clientWidth;
	var window_height = document.body.clientHeight || document.documentElement.clientHeight;
	$("#register_login").css({"width": window_width, "height": window_height});
	// 点击“登录”显示登录框
	$(".hr_login").click(function(){
		$("#register_login").css("display", "block");	
		$(".rb_register").hide().siblings().show();
		$(".rbnav_left").css({"backgroundColor": "#c3c3c3", "color": "#fff"});
		fn_re_lo();
	})
	// 点击“注册”显示注册框
	$(".hr_register").click(function(){
		$("#register_login").css("display", "block");		
		$(".rb_login").hide().siblings().show();
		$(".rbnav_right").css({"backgroundColor": "#c3c3c3", "color": "#fff"});
		fn_re_lo();
	})
	//隐藏登录框
	$(".rb_title>img").click(function(){
		$("#register_login").css("display", "none");
		$(".rbnav_right").css({"backgroundColor": "#fff", "color": "#f58416"}).siblings().css({"backgroundColor": "#fff", "color": "#f58416"});
	})

	// 点击登录框中的“登录注册”的函数
	function fn_re_lo(){
		//点击登录框中的“登录”	
		$(".rbnav_left").click(function(){
			$(".rbnav_left").css({"backgroundColor": "#c3c3c3", "color": "#fff"}).siblings().css({"backgroundColor": "#fff", "color": "#f58416"});
			$(".rb_register").hide().siblings().fadeIn();
		});
		//点击登录框中的“注册”	
		$(".rbnav_right").click(function(){
			$(".rbnav_right").css({"backgroundColor": "#c3c3c3", "color": "#fff"}).siblings().css({"backgroundColor": "#fff", "color": "#f58416"});
			$(".rb_login").hide().siblings().fadeIn();
		});
	}


	//上传本地头像
	$(function(){
		var maxlen = 5,    //文件可读取最大长度
		filelist = [],    //存放 File对象数组
		index = 0;    //当前存放File的长度

		// 按钮元素监听click事件，执行add方法
		$(".add-button").bind('click',add);

		// input[type=file]元素监听change事件 执行filter方法
		$("#pic_files").bind('change',filter);

		// 模拟input[type=file]添加文件的动作
		function add(e){
			if (index < maxlen ){ 
				$("#pic_files").trigger("click");
			}else{
				// 超过了选中文件文件的限制
				// AnimateUtils.info('超过最大上传限制');
			}
		}

		//  过滤文件类型    
		function filter(e){
			var files = e.target.files,   // 获取本地文件File对象集合
			typelist = ["image/jpeg","image/png"]  // 合法文件type列表 

			//  针对PC端多选的情况,前提是 input[type=file]元素包含 multiple属性
			for (var i =0,len=files.length; i <len && index < 5 ;i++){
				var filetype  = files[i].type;// 当前文件的类型
				//判断filetype是否属于图片
				var isPic= typelist.some(function(item){return item == filetype;});// 文件类型是否合法标识
				if(isPic){
					filelist.push(files[i]);  //添加至文件列表
					addImage(files[i]);   //同时添加到页面
					index++;
				}else{
					// 提示文件非图片
					// AnimateUtils.info('不支持的文件类型');
				}
			}
		}

		// 将图片加载至浏览器中,并且显示出来
		function addImage(file){

			// 创建 一个FileReader对象
			var reader = new FileReader();
			// 读取文件作为URL可访问地址
			reader.readAsDataURL(file);

			// 监控读取加载过程 
			reader.onprogress =function(e){

			// 是否支持获取当前读取文件长度
			if(e.lengthComputable){

				// 将新创建的一个展示区域元素存放在 reader.uploadBox 中
				reader.uploadBox= reader.uploadBox || $('<div class="upload-box"></div>').insertBefore('.add-button');
				// 读取进度显示
				reader.uploadBox.text( Math.ceil((e.loaded / e.total) * 100) +"%");

			}

			//异步加载文件成功
			reader.onload = function(e){
				// this 对象为reader
				// reader.result 表示图片地址
				reader.uploadBox.wrapInner('<img src="' + reader.result + '" alt="' + file.name + '" />');
				$(".add-button").hide();
				}

			}
		}

	});


	//第三方创建用户（注册）
	var userRegisterURL = "http://e.vhall.com/api/vhallapi/v2/user/register";	
	function fnUserRegister(data){
		console.log(data);
	};
	$(".sub_register").click(function(){
		var $third_user_imgurl = $("#upload_pic .upload-box>img").attr("src");
		var $third_user_id = $(".rb_register .third_user_id").val();
		var $third_user_pass = $(".rb_register .third_user_pass").val();
		var $third_user_phone = $(".rb_register .third_user_phone").val();
		var $third_user_name = $(".rb_register .third_user_name").val();
		var userRegisterData = {
			auth_type: 1,
			account: "v15483438",
			password: "Beijing20170227",
			third_user_id: $third_user_id,
			pass: $third_user_pass,
			phone: $third_user_phone,
			name: $third_user_name,
			head: $third_user_imgurl
		}; 
		fnAjax(userRegisterURL, userRegisterData, fnUserRegister);
		alert("注册成功，请登录");
	});

	// 获取微吼用户ID（登录）
	var userLoginURL = "http://e.vhall.com/api/vhallapi/v2/user/get-user-id";
	function fnUserLogin(data){
		console.log(data);
		$(".hr_login").html("微吼id为" + data.data.id + "的用户已登录")
	};
	$(".sub_login").click(function(){
		var $third_user_id = $(".rb_login .third_user_id").val();
		var userLoginData = {
			auth_type: 1,
			account: "v15483438",
			password: "Beijing20170227",
			third_user_id: $third_user_id
		}; 
		fnAjax(userLoginURL, userLoginData, fnUserLogin);
		alert("登录成功");

		//退出登录框
		$("#register_login").css("display", "none");
		$(".rbnav_right").css({"backgroundColor": "#fff", "color": "#f58416"}).siblings().css({"backgroundColor": "#fff", "color": "#f58416"});
	})

	


	//获取活动信息
	var fetchURL = "http://e.vhall.com/api/vhallapi/v2/webinar/fetch";
	var fields = "subject: '能源培训第一课',introduction: '能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会|能源十三五规划解读会',img_url: '../img/loading.png',t_start: '2017-03-15 17:00:00',host: 'Holly'";
	var fetchData = {
		auth_type: 1,
		account: "v15483438",
		password: "Beijing20170227",
		webinar_id: web_id,
		fields: fields
	}
	function fnFetch(data){
		var fetchInf = JSON.stringify(data.data);
		var arr01 = fetchInf.split(",");
		var arr03 = [];
		console.log(arr01);
		for(var i = 0; i < arr01.length; i++){
			var arr02 = arr01[i].substring(arr01[i].indexOf("'") + 1, arr01[i].lastIndexOf("'")).split();
			arr03[i] = arr02;
		};
		ctCheme.innerHTML = arr03[0][0];
		activityIntro.innerHTML = arr03[1][0];
		ciTime.innerHTML = arr03[3][0];
		ciHost.innerHTML = arr03[4][0];

	}

	fnAjax(fetchURL, fetchData, fnFetch);


	//获取当前在线人数
	var currentOnlineNumURL = "http://e.vhall.com/api/vhallapi/v2/webinar/current-online-number";
	var currentOnlineNumData = {
		auth_type: 1,
		account: "v15483438",
		password: "Beijing20170227",
		webinar_id: web_id
	};
	function fnCurrentOnlineNum(data){
		console.log(data);
	};
	var obj01 = new Object();
	//仅支持30s获取一次
	fnAjax(currentOnlineNumURL, currentOnlineNumData, fnCurrentOnlineNum);
	obj01.timer = setInterval(function(){
		clearInterval(obj01.timer);
		fnAjax(currentOnlineNumURL, currentOnlineNumData, fnCurrentOnlineNum);
	}, 31000)
	

	//获取直播活动用户访问记录
	var attendeeRecordsURL = "http://e.vhall.com/api/vhallapi/v2/report/attendee-records";
	var attendeeRecordsData = {
		auth_type: 1,
		account: "v15483438",
		password: "Beijing20170227",
		webinar_id: web_id
	}; 
	function fnAttendeeRecords(data){
		console.log(data);
	};
	fnAjax(attendeeRecordsURL, attendeeRecordsData, fnAttendeeRecords);


	//活动统计
	var reportURL = "http://e.vhall.com/api/vhallapi/v2/webinar/report";
	var ctBrowse = document.querySelector(".ct_browse>span");
	var reportData = {
		auth_type: 1,
		account: "v15483438",
		password: "Beijing20170227",
		webinar_id: web_id,
		time_span: 2
	}; 
	function fnReport(data){
		// console.log("活动统计");
		console.log(data);
		//累积在线总人数
		ctBrowse.innerHTML = data.data.total_watch_number;
	};
	fnAjax(reportURL, reportData, fnReport);







}