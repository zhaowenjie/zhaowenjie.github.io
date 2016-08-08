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
