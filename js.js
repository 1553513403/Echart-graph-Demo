var myChart = echarts.init(document.getElementById("chartTest"));

var categories = [];
var newData = [];
var links = [];
var option = {};
var linksLabelTxt;

//function showChart() {
categories = [];
newData = [];
links = [];
option = {};

$.ajax({
	//		url: '/relation_query',
	url: './testData.json',
	type: 'get',
	dataType: 'json',
	//		data: 'org_name=' + "PCB压电传感器技术（北京）有限公司",
	async: false, //默认为true 异步   
	error: function() {
		console.log('error');
	},
	success: function(data) {
		console.log("success");
		for (var j = 0; j < data.nodes.length; j++) {
			var nodes_list_obj = {};
			nodes_list_obj.name = data.nodes[j].shortName;
			console.log(nodes_list_obj.name.length);
			//			if (data.nodes[j].shortName.length > 3) {
			//				nodes_list_obj.name = data.nodes[j].shortName.substring(0, 3) + "...";
			//			}
			nodes_list_obj.detailName = data.nodes[j].name;
			nodes_list_obj.shortMessage = data.nodes[j].shortMessage;

			//				nodes_list_obj.value = 10;
			nodes_list_obj.flag = true;
			nodes_list_obj.category = data.nodes[j].category;
			nodes_list_obj.id = data.nodes[j].id.toString();
			nodes_list_obj.symbolSize = data.nodes[j].symbolSize;
			if (data.nodes[j].id == 0) {
				nodes_list_obj.draggable = true;
				//	nodes_list_obj.ignore = false;
			}

			nodes_list_obj.invisible = true;
			nodes_list_obj.ignore = true;
			//				debugger;
			//			if (nodes_list_obj.symbolSize < 60 && nodes_list_obj.symbolSize > 30) {
			nodes_list_obj.label = {
					normal: {
						show: true,
						fontWeight: 'normal',
						position: 'inside',
						color: '#000000'
					}
				}
				//			}

			newData.push(nodes_list_obj);
		}
		for (var i = 0; i < data.links.length; i++) {
			var links_list_obj = {};
			links_list_obj.source = data.links[i].source.toString();
			links_list_obj.target = data.links[i].target.toString();

			linksLabelTxt = data.links[i].remindingTxt;
			//				console.log(linksLabelTxt);

			(function(linksLabelTxt) {
				links_list_obj.label = {
					normal: {
						show: true,
						formatter: function(value) {
							value.value = linksLabelTxt;
							return value[value] = linksLabelTxt;
						}
					}
				}
			})(linksLabelTxt);

			//				console.log(links_list_obj.label);
			links.push(links_list_obj);
		}
		for (var i = 0; i < data.category_list.length; i++) {
			var category_list_obj = {};
			category_list_obj.name = data.category_list[i];
			categories.push(category_list_obj);
		}
	}
});

option = {
	title: {
		text: ''
	},
	tooltip: {
		formatter: function(value) {
			return value[value] = value.data.detailName + ':' + value.data.shortMessage;
		},
		opacity: 0.9,
		padding: [11, 16, 11, 16]
	},
	minRadius: 1,
	legend: [{
		data: categories.map(function(a) {
			return a.name;
		}),
		padding: [16, 24, 16, 24],
		itemGap: 40,
		icon: 'circle',
		itemWidth: 10,
		textStyle: {
			color: 'rgba(0,0,0,0.82)',
			fontSize: 12
		},
		backgroundColor: 'rgba(255,255,255,0.9)',
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowBlur: 2,
		shadowOffsetY: 2,
		borderWidth: 0.5
	}],
	animation: false,
	series: [{
		name: '',
		type: 'graph',
		layout: 'force',
		roam: true,
		force: {
			//			initLayout: 'circular',
			repulsion: 1500,
			gravity: 0.001,
			//				edgeLength: 250,
			layoutAnimation: false
		},
		top: 'middle',
		draggable: false,
		//			symbol: "rect",
		//			edgeSymbol: ['none', 'arrow'],
		data: newData,
		color: ['#4485F5', '#2DB790', '#04A9F5', '#e4ab56', '#02BDD5', '#009688', '#9D28B1'],
		categories: categories,
		links: links,
		markPoint: {
			symbol: 'circle'
		},
		lineStyle: {
			normal: {
				curveness: 0.2
			}
		},
		label: {
			normal: {
				show: true,
				position: 'right',
				textStyle: {
					//					color: '#ff0000'
				},
				backgroundColor: '#000000',
				formatter: function(value) {
					//						console.log(value);
					return value[value] = value.data.name;
				}
			}
		},
		edgeLabel: {
			normal: {
				show: true,
				textStyle: {
					color: '#b5b5b5'
				}
			}
		}

	}],

	backgroundColor: "#b2b2oo",
	animationDuration: 20
};

//	debugger;
console.log(option)
myChart.setOption(option);
//}

//绑定点击事件
myChart.on('click', function(params) {
	if (params.componentType === 'series') {
		if (params.dataType === "node") {
			//			alert("node clicked");
			if (params.data.id === "0") {
				console.log(myChart.getOption().series[0].data);
				myChart.getOption().series[0].data.push({
					"category": 5,
					"symbolSize": 50,
					"id": 110,
					"value": 70,
					"name": "test",
					"shortName": "test徐亚飞徐亚飞徐亚飞",
					"shortMessage": "test"
				});
				console.log(myChart.getOption().series[0].data);

				myChart.setOption(myChart.getOption());
				if ($('.detail-info-div').hasClass('ditail-info-hide')) {
					$('.detail-info-div').removeClass('ditail-info-hide');
					$('.detail-info-div').css('display', 'block');

				} else {
					$('.detail-info-div').css('display', 'block');
				}
			}
		}
	}
});

//关闭详细信息块
function closeDetailInfo() {
	$('.detail-info-div').addClass('ditail-info-hide');
	//	$('.detail-info-div').css('display','none');
}