
let tools = {
	audioAutoPlay : function(id){
        var audio = document.getElementById(id),
            play = function(){
                audio.play();
                document.removeEventListener("touchstart",play,false);
            };
        //audio.play();
        document.addEventListener("WeixinJSBridgeReady",function(){
            play()
        },false);
    },
	verification:function(type){
		var that = $(type);
		var val = $.trim(that.val());
		if(val == ""){
			var tips = that.attr("data-error");
			that.parents("li").find("i").html(tips);
			return false;
		}else{
			if(type == "#bookingdrive1001_mobile" || type == "#lecture_mobile" && val != ""){
				if(!_person.utils.checkPhone(val) ){
		            that.parents("li").find("i").html("请输入正确手机号");
		            return false;
		        }else{
		        	that.parents("li").find("i").html("");
		            return true;
		        };
			}else{
				that.parents("li").find("i").html("");
				return true;
			}
		}
	},
	lineclick:function(obj) {
		console.log(obj.getAttribute("url")); 
		window.location.href=obj.getAttribute("url");
	}
},
init=function(){
	var bili = 750 / 1334, //0.56  0.388  
        $wh = $('html').attr('data-h'),
        $ww = $('html').attr('data-w');
        console.log($wh)
    if($ww/$wh > bili){
		$('#index-swiper').addClass('waph')
	}
	$('#svg-box').css({'width':$ww,'height':$wh});
	/*var hj = $wh/2;
	var hj2 = $wh/6;
	var wj = $ww/2;
	$('#box1').attr('points','0 0,0 ' + hj + ','  + wj + ' '+ hj2 + ' ,'  + wj + ' 0,' + hj );*/
	var swiper = new Swiper('#index-swiper', {
        paginationClickable: true,
        direction: 'vertical'
    });
window.onload = function(argument) {
	w = window.innerWidth,
	h = window.innerHeight;
	/* svg init */
	var paper = Snap("#svg-box");

	/*var team_rwby = {
		"ruby": "img/4.jpg",
		"weiss": "img/3.jpg",
		"blake": "img/2.jpg",
		"yang": "img/1.jpg"
	};*/


	/* this polygons' array include coordinates and image's source  */
	var polygons = [];
	polygons.push({//0 0,0 320,180 120 ,180 0,320
		"coordinates": [
			[0, 0],
			[w * 0.5, 0],
			[w * 0.5, h * 0.15],
			[w * 0.15, h * 0.48],
			[0, h * 0.48]
		],
		"strokeStyle": "black",
		"strokeWidth": 0,
		"strokeUrl":"tiangong/timershaft.html"
	}, {
		"coordinates": [
			[0, h * 0.5],
			[w * 0.15, h * 0.5],
			[w * 0.5, h * 0.85],
			[w * 0.5, h],
			[0, h]
		],
		"strokeStyle": "black",
		"strokeWidth": 0,
		"strokeUrl":"456"
	}, {
		"coordinates": [
			[w * 0.15, h * 0.5],
			[w * 0.5, h * 0.18],
			[w * 0.85, h * 0.5],
			[w * 0.5, h * 0.82],
		],
		"strokeStyle": "black",
		"strokeWidth": 0,
		"strokeUrl":"tiangong/presentationsoftware.html"
	}, {
		"coordinates": [
			[w * 0.5, h],
			[w * 0.5, h * 0.85],
			[w * 0.85, h * 0.5],
			[w, h * 0.5],
			[w, h],
		],
		"strokeStyle": "black",
		"strokeWidth": 0,
		"strokeUrl":"***"
	}, {
		"coordinates": [
			[w * 0.5, 0],
			[w, 0],
			[w, h * 0.48],
			[w * 0.85, h * 0.48],
			[w * 0.5, h * 0.15],
		],
		"strokeStyle": "black",
		"strokeWidth": 0,
		"strokeUrl":"tiangong/apply.html"
	});

	for (var i = 0; i < polygons.length; i++) {
		make_polygon_layout(paper, polygons[i]);
	}
}




function make_polygon_layout() {
	paper = arguments[0];
	polygon = arguments[1];
	tempA = [];
	for (var i = 0; i < polygon.coordinates.length; i++) {
		tempA[i] = polygon.coordinates[i];
	}
	/* get largest and smallest x coordinate */
	tempA.sort(function(a, b) {
		return a[0] - b[0];
	});
	sX = tempA[0][0];
	bX = tempA[tempA.length - 1][0];

	/* get largest and smallest ycoordinate */
	tempA.sort(function(a, b) {
		return a[1] - b[1];
	});
	sY = tempA[0][1];
	bY = tempA[tempA.length - 1][1];

	polygon.startPoint = [sX, sY];
	polygon.endPoint = [bX, bY];

	polygon.width = polygon.endPoint[0] - polygon.startPoint[0];
	polygon.height = polygon.endPoint[1] - polygon.startPoint[1];


	var path = paper.path({
		"d": make_path(polygon.coordinates),
		"strokeWidth": polygon.strokeWidth,
		'stroke-linejoin': "round",
		'stroke': polygon.strokeStyle,
		'fill': 'rgba(255, 255, 255, 0)',
		'url': polygon.strokeUrl,
		'onclick': 'tools.lineclick(this)'
	});
	/*path.click(function(event) {
		var classname = this.getAttribute('class');
		console.log(classname)
		//window.location.href = 'http://www.baidu.com'
	});*/
}

function make_path() {
	d = "M";
	coordinates = arguments[0];
	for (var i = 0; i < coordinates.length; i++) {
		if (i == 0) {
			d += coordinates[i][0] + " " + coordinates[i][1]
		} else {
			d += "L" + coordinates[i][0] + " " + coordinates[i][1]
		}
	}
	return d + "z";
	// return d;
}
}();