/*
 * util.ajax JS
 *
 * @author wenjie
 * @since 09.14.2015
 * @version 1.0.0
 * @lastUpdatedBy Zhao Wenjie at 09.14.2015
 */
 function(){
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
}();