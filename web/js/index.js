(function($) {
	var _dcf_banner = {

		activeIndex: 0,
		timer: null,
		options: {
			width: '100%',
			pauseTime: 3000
		},
		init: function(ele, options){
			// deep
			this.options = $.extend(true, this.options, options);
			this.bannerObj = ele;
			this.render();
			this.set();
			this.bindEvent();
		},
		render: function(){

			var me = this;
		},
		set: function(activeIndex){

			var me = this;
			var activeIndex = activeIndex || this.activeIndex;
			var maxLength = me.bannerObj.find('.banner-list').length-1;
			activeIndex == 0 ? me.bannerObj.find('.banner-list').not(':first-child').css('display','none'):'第一次启动时隐藏其他的';

			me.timer = setInterval(function(){
				activeIndex++ ;
				activeIndex = activeIndex > maxLength?0:activeIndex;
				me.play(activeIndex);
			}, me.options.pauseTime);
		},
		bindEvent: function(){

			var me = this, $bannerObj = this.bannerObj;

			$bannerObj.find('.banner-content').hover(
				function (e) {
					clearInterval(me.timer);
				},
				function (e) {
					me.set($(e.target).index());
				}
			);

			$bannerObj.on('click', '.banner-btn', function(e){
				// 点击到第n张
				if($(this).hasClass('active')){
					return false;
				}
				me.activeIndex = $(this).index();
				clearInterval(me.timer);
				me.play(me.activeIndex);
			})
		},
		play: function(num){
			$('.dcf-banner .banner-list').fadeOut('300');
			setTimeout(function(){
				$('.dcf-banner .banner-list').eq(num).fadeIn('300');
			},150);
			$('.dcf-banner .banner-btn.active').removeClass('active');
			$('.dcf-banner .banner-btn').eq(num).addClass('active');
		}
	}

	$.fn.dcf_banner =  function(options) {
		
		_dcf_banner.init(this, options);
	};
})(jQuery);
console.info(1);
$('.dcf-banner').dcf_banner({});
