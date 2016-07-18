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
		if(s!=null){
			document.cookie = name + '=' + s + ';expires=' + exp.toGMTString() + ';path=/';
		}
	}
};