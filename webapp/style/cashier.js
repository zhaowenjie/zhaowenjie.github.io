var Chart = {
	browserData: {"status":0,"msg":"","data":{
		"fields":["custom_visit_title","visit_count","avg_visit_pages",
			"session_avg_visit_time","new_visitor_ratio","session_bounce_ratio"
		],
		"total":12,"sum":[[125,4.14,1276,29.63,35.2],[]],
		"pageSum":[[125,4.14,1276,29.63,35.2],[],[]],
		"items":[[[{"id":"9584127665505878768",
		"label":"Mozilla\/5.0 (Windows NT 10.0; WOW64; rv:47.0) Gecko\/20100101 Firefox\/47.0"}],
		[{"id":"4125349090821054754",
		"label":"Mozilla\/5.0 (Windows NT 10.0; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/51.0.2704.84 Safari\/537.36"}],
		[{"id":"9608361962663977186","label":"Mozilla\/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko\/20100101 Firefox\/48.0"}],
		[{"id":"4479558635719168485","label":"Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit\/601.7.7 (KHTML, like Gecko) Version\/9.1.2 Safari\/601.7.7"}],
		[{"id":"7646219115611967337","label":"Mozilla\/5.0 (Windows NT 10.0; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/47.0.2526.106 Safari\/537.36"}],
		[{"id":"1527481942589818949","label":"Mozilla\/5.0 (Windows NT 10.0; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/51.0.2704.4 Safari\/537.36"}],
		[{"id":"10834400657672007070","label":"Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/50.0.2661.102 Safari\/537.36"}],
		[{"id":"7450220047213307141","label":"Mozilla\/5.0 (Windows NT 6.1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/38.0.2125.101 Safari\/537.36"}],
		[{"id":"6686537066577835455","label":"Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/45.0.2454.101 Safari\/537.36"}],
		[{"id":"100972008221100432","label":"Mozilla\/5.0 (Windows NT 6.3; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/49.0.2623.22 Safari\/537.36 SE 2.X MetaSr 1.0"}],
		[{"id":"7452260766563547560","label":"Mozilla\/5.0 (Windows NT 5.1) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/45.0.2454.101 Safari\/537.36"}],
		[{"id":"15904889877142026393","label":"Mozilla\/5.0 (Windows NT 10.0; WOW64; Trident\/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Tablet PC 2.0; rv:11.0) like Gecko"}]],
		[[70,4.6,1356,4.55,28.57],[24,3.63,1061,10,45.83],[15,4.93,1692,22.22,40],[5,1.6,718,100,60],
		[4,2.25,1048,66.67,25],[1,1,81,100,100],[1,2,1398,100,0],[1,1,53,100,100],[1,9,3218,100,0],[1,2,221,100,0],[1,1,134,100,100],[1,2,854,100,0]],[],[]],
		"title":"browser"}
	},
	init: function(){

		this.initBrowser(this.browserData);
	},
	initBrowser: function(data){

		var data = this.getBrowserData(data);

		var systemData = this.formatSystemData(data);
		var browserData = this.formatBrowserData(data);

		this.renderSystemChart(systemData);
		this.renderBrowserChart(browserData);
		console.log(systemData);
	},
	formatSystemData: function(data){

		var obj = {
			win7: 0,
			win8: 0,
			winXP: 0,
			win10: 0,
			MAC: 0,
			other: 0
		};

		for(var i=0;i<data.length;i++){

			var label = data[i].label;
			
			if(/Windows NT 5.1/.test(label)){
				obj.winXP += data[i].pv;
			}else if(/Windows NT 6.1/.test(label)){
				obj.win7 += data[i].pv;
			}else if(/Windows NT 6.2/.test(label)||/Windows NT 6.3/.test(label)){
				obj.win8 += data[i].pv;
			}else if(/Windows NT 6.4/.test(label)||/Windows NT 10.0/.test(label)){
				obj.win10 += data[i].pv;
			}else if(/Mac OS X/.test(label)){
				obj.MAC += data[i].pv;
			}else{
				console.warn(label);
				obj.other += data[i].pv;
			}
		}
		return obj;
	},
	formatBrowserData: function(data){

		var obj = {
			IE: 0,
			firefox: 0,
			chrome: 0,
			opera: 0,
			Safari: 0,
			other: 0
		};
		console.info(data);
		for(var i=0;i<data.length;i++){

			var label = data[i].label;
			
			if(/(msie\s|trident.*rv:)([\w.]+)/.test(label)||/Trident\/7.0/.test(label)){
				// ie11 Trident\/7.0  http://www.xpc8.com/xitong/vista_win_7/vista_win_7_3887.html
				obj.IE += data[i].pv;
			}else if(/(Firefox)\/([\w.]+)/.test(label)){
				obj.firefox += data[i].pv;
			}else if(/(Chrome)\/([\w.]+)/.test(label)){
				obj.chrome += data[i].pv;
			}else if(/(opera).+version\/([\w.]+)/.test(label)){
				obj.opera += data[i].pv;
			}else if(/Version\/([\w.]+).*(Safari)/.test(label)){
				obj.Safari += data[i].pv;
			}else{
				console.warn(label);
				obj.other += data[i].pv;
			}
		}
		return obj;
	},
	getBrowserData: function(data){

		var items = data.data.items
		var pvData = items[1];
		var obj = [];

		for(var i=0; i < items[0].length;i++){

			obj.push({
				label:items[0][i][0].label,
				index: i 
			})

			obj[i].pv = pvData[i][0];
		}
		return obj;
	},
	renderSystemChart:function(data){

		var arr1 = [],arr2 = [];

		for(var k in data){

			if(data[k] == 0){continue;};
			arr1.push(k);
			arr2.push({
				value:data[k], name:k
			});
		}

		var browserOption = {
			title : {
				text: '用户操纵系统统计',
				subtext: '不完全统计',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: arr1
			},
			series : [
				{
					name: '访问来源',
					type: 'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data:arr2,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};

		var myChart = echarts.init(document.getElementById('system-chart-body'));

		myChart.setOption(browserOption);
	},
	renderBrowserChart: function(data){
		var arr1 = [],arr2 = [];

		for(var k in data){

			if(data[k] == 0){continue;};
			arr1.push(k);
			arr2.push({
				value:data[k], name:k
			});
		}

		var browserOption = {
			title : {
				text: '用户浏览器版本统计',
				subtext: '不完全统计',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: arr1
			},
			series : [
				{
					name: '访问来源',
					type: 'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data:arr2,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};

		var myChart = echarts.init(document.getElementById('browser-chart-body'));

		myChart.setOption(browserOption);
	}
};
Chart.init();