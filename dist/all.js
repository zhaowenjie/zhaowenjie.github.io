console.log('This would be the main JS file.');

/*
 * base JS
 *
 * @author wenjie
 * @since 07.20.2015
 * @version 1.0.0
 * @lastUpdatedBy Zhao Wenjie at 07.20.2015
 定义全局变量
 */
var BASE = {
	init:function(){

		this.initBaidu();
		this.loadHead();
	},
	initBaidu:function(){
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?330b3da8e0f6dc0819216d4eb8b8e404";
			var s = document.getElementsByTagName("script")[0]; 
			s.parentNode.insertBefore(hm, s);
		})();
	},
	loadHead:function(){

		if($('header').length < 1){

			$('body').prepend('<header></header>');

			var head = $('header');

			$('header').load('/head.html');
		}
	},	
};

$(function(){

	BASE.init();
});

/*
 * util JS
 *
 * @author wenjie
 * @since 07.24.2015
 * @version 1.0.0
 * @lastUpdatedBy Zhao Wenjie at 07.24.2015
 */
var jaywin = {};
//cookie处理部分
jaywin.Cookie = {
	//读取
	read : function(name){
		var cookieStr = '; '+ document.cookie + '; ';
		var index = cookieStr.indexOf('; ' + name + '=');
		if(index!= -1){
			var s = cookieStr.substring(index + name.length + 3,cookieStr.length);
			return uneseape(s.substring(0, s.indexOf('; ')));
		}else{
			return null;
		}

	},
	//设置
	set : function(name,value,expires){
		var expDays = expires*24*60*60*1000;
		var expDate = new Date();
		expDate.setTime(expDate.getTime()+expDays);
		var expString = expires ? '; expires=' + expDate.toGMTString() : '';
		var pathString = ';path=/';
		document.cookie = name + '=' + excape(value) + expString + pathString;

	},
	//删除
	del : function(name){
		var exp = new Date(new Date().getTime()-1);
		var s = this.read(name);
		if(s!==null){
			document.cookie = name + '=' + s + ';expires=' + exp.toGMTString() + ';path=/';
		}
	}
};
$(function(){
	var browse = navigator.userAgent,
		ischrome,
		isfirefox;

	browse = browse.toLowerCase();
	ischrome = browse.indexOf('chrome') >= 0 ? true : false;
	isfirefox = browse.indexOf('firefox') >= 0 ? true : false;
	console.log(browse, "ischrome", ischrome, "isfirefox", isfirefox);
	function init(){
		playBanner();
	}
	function playBanner(){
		var i = 0;
		var plays = setInterval(function(){
			i++ ;
			i = i > 4?1:i;
			play(i);
		},3000);

	}
	function play(num){
		$('.page-header').fadeOut('slow');
		$('.banner'+num).fadeIn('slow');
	}
	init();
});

console.log('This would be the test JS file.');

/*
 * util.ajax JS
 *
 * @author wenjie
 * @since 09.14.2015
 * @version 1.0.0
 * @lastUpdatedBy Zhao Wenjie at 09.14.2015
 */
 function XMLHttpRequest(){
	var request;
	if(window.XMLHttpRequest){
		request = new XMLHttpRequest();//IE7+,Firefox,Chrome,Ooera,Safari...
	}else{
		request = new ActiveXObject("Microsoft.XMLHTTP");//IE6,IE7
	}
// XMLHttpRequest发送请求：
// 两个方法
// open(method,url,async)
// method：规定HTTP发送请求的方式是get还是post,不区分大小写，一般来说用大写
// url：请求地址(相对地址或绝对地址)
// async:同步/异步(false/true)，默认是异步也就是true，可以不用填写

// send(string):发送到服务器（该参数可以填或者不填-----get方法不填或填null，post:一般要填）
}
XMLHttpRequest();
/*
 * util.event JS
 *
 * @author wenjie
 * @since 08.21.2015
 * @version 1.0.0
 * @lastUpdatedBy Zhao Wenjie at 08.21.2015
 event对象处理
 */
var eventUtil={
	// 添加句柄
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	// 删除句柄
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getType:function(event){
		return event.type;
	},
	getElement:function(event){
		return event.target || event.srcElement;
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
};