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
