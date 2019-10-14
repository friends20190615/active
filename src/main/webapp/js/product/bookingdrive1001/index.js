
let select_province = [{text: '',value: ''}],
	select_array = [{text: '',value: ''}],
	data_month = [];
	data_date = [],
	tools = {
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
	forAO:function(array,keyMap){
		for (var i = 0; i < array.length; i++) {
			var obj = array[i];
			for (var key in obj) {
				var newKey = keyMap[key];
				if (newKey) {
					obj[newKey] = obj[key];
					delete obj[key];
				}
			}
		}
		return array;
	},
	dow:function(array,start,end){
        do{
            array[array.length] = {
                text:start.getDate()+'日'
            }
            start.setDate(start.getDate()+1);
        }while(end >= start);
    },
	generateArray:function(){
		var timeStr = '-';
        var curDate = new Date();
        var curYear =curDate.getFullYear();  
        var curMonth = curDate.getMonth()+1;  
        var curDay = curDate.getDate();      
        var start9 = new Date("2019-09-01".replace(/-/g,"/"));
        var end9 = new Date("2019-09-30".replace(/-/g,"/"));
        var start10 = new Date("2019-10-01".replace(/-/g,"/"));
        var end10 = new Date("2019-10-31".replace(/-/g,"/"));
        var date_array9=[],date_array10=[];
        if(curMonth == 10){
            var current=curYear+timeStr+curMonth+timeStr+curDay;
            start10 = new Date(current.replace(/-/g,"/"));
            tools.dow(date_array10,start10,end10)
            date_array = [
                {
                    "text":"10月",
                    "date":date_array10
                }
            ]
        }else if(curMonth == 9){
            date_array = [
                {
                    "text":"9月",
                    "date":date_array9
                },
                {
                    "text":"10月",
                    "date":date_array10
                }
            ]
            var current=curYear+timeStr+curMonth+timeStr+curDay;
            start9 = new Date(current.replace(/-/g,"/"));
            tools.dow(date_array9,start9,end9)
            tools.dow(date_array10,start10,end10)
        }else{
            date_array = [
                {
                    "text":"9月",
                    "date":date_array9
                },
                {
                    "text":"10月",
                    "date":date_array10
                }
            ]
            tools.dow(date_array9,start9,end9)
            tools.dow(date_array10,start10,end10)
        }
        console.log("date_array",date_array)
    	return date_array;
	},
	creatList:function(obj, list) {
		obj.forEach(function(item, index, arr) {
			var temp = new Object();
			temp.text = item.text;
			temp.value = index;
			list.push(temp);
		})
	},
	selectP:function(id){
		let nameEl = document.getElementById(id),
			title = nameEl.getAttribute("data-title"),
			data_arr = [],
			selectedIndex = [0],
			data_province = select_province,
			data_array = select_array,
			data_vehicleType = [ //车型
				{
					text: '极光',
					value: 4001
				}, {
					text: '星脉',
					value: 4002
				}, {
					text: '揽胜',
					value: 4003
				}, {
					text: '揽运',
					value: 4004
				}
			],
			data_lectureCity = [ //活动城市
				{
					text: '北京',
					value: 5001
				}, {
					text: '杭州',
					value: 5002
				}, {
					text: '成都',
					value: 5003
				}, {
					text: '深圳',
					value: 5004
				}
			];
		switch (id) {
			case "bookingdrive1001_province":
				data_arr = [select_province];
				break;
			case "bookingdrive1001_vehicleType":
				data_arr = [data_vehicleType];
				break;
			case "bookingdrive1001_time":
				data_arr = [data_month,data_date];
				selectedIndex=[0,0];
				break;
			case "lecture_city":
				data_arr = [data_lectureCity];
				break;
			default:
				data_arr = [select_array];
		}
		let picker = new Picker({
			data: data_arr,
			selectedIndex: selectedIndex,
			title: title
		});
		picker.on('picker.select', function(selectedVal, selectedIndex) {
			$(nameEl).parents("li").find("i").html("");
			switch (id) {
				case "bookingdrive1001_province":
					nameEl.value = data_province[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_province[selectedIndex[0]].value);
					break;
				case "bookingdrive1001_vehicleType":
					nameEl.value = data_vehicleType[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_vehicleType[selectedIndex[0]].value);
					break;
				case "bookingdrive1001_time":
					nameEl.value = data_month[selectedIndex[0]].text+data_date[selectedIndex[1]].text;
					nameEl.setAttribute("data-attr", selectedIndex[0].value + '/' + selectedIndex[1].value);
					break;
				case "lecture_city":
					nameEl.value = data_lectureCity[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_lectureCity[selectedIndex[0]].value);
					break;
				default:
					nameEl.value = data_array[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_array[selectedIndex[0]].value);
			}

		})

		picker.on('picker.change', function(index, selectedIndex) {
			console.log('1',index);
			console.log('2',selectedIndex);
			if(id == "bookingdrive1001_time"){
				if (index === 0) {
					firstChange();
				}

				function firstChange() {
					var checked = [0, 0];
					data_date = [];
					checked[0] = selectedIndex;
					var firstDate = date_array[selectedIndex];
					console.log('firstDate', firstDate)
					if (firstDate.hasOwnProperty('date')) {
						tools.creatList(firstDate.date, data_date);
					}
					console.log('***', data_date)
					picker.refillColumn(1, data_date);
				}
			}
		});


		picker.on('picker.valuechange', function(selectedVal, selectedIndex) {
			console.log('3',selectedVal);
			console.log('4',selectedIndex);
			switch (id) {
				case "bookingdrive1001_province":
					$("#bookingdrive1001_city,#bookingdrive1001_dealer").val("");
					break;
				case "bookingdrive1001_city":
					$("#bookingdrive1001_dealer").val("");
					break;
			}
		});

		picker.show();
	}
},
getCon = {
	select:function(type,options){
		var options, keyMap;
		switch (type) {
			case "bookingdrive1001_province":
				keyMap = {
					"provinceName":"text",
                    "provinceName":"text",
				}
				break;
			case "bookingdrive1001_city":
				keyMap = {
					"cityName":"text",
				}
				break;
			case "bookingdrive1001_dealer":
				keyMap = {
					"dealerName":"text",
					"dealerCode":"value"
				}
				break;
		}
		_person.lib.$Ajax(options,function(data){
			if(data){
				if(data.status == 0){
					if(type == "bookingdrive1001_province"){
						select_province = data.result;
						tools.forAO(select_province,keyMap);
					}else{
						select_array = data.result;
						tools.forAO(select_array,keyMap);
						tools.selectP(type);
					}
				}else{
					var msg = data.msg || '请稍后重试！';
					dialog.toast({content:msg});
					return false;
				}
			}
		})
	}
},
init=function(){
	var bili = 750 / 1334, //0.56  0.388  
        $wh = $(window).height(),
        $ww = $(window).width();
        console.log($wh)
    if($ww < $wh){
		$(".addh,#bd-w1.swiper-container,#bd-w2.swiper-container").css("height",$wh);
	}
	var province_options = {
		url:'/active/road/getProvinceList.do',
		type:'get',
		params:''
	}
	getCon.select('bookingdrive_province',province_options)
	var oSwiper = new Swiper('#bd-w1', {
		direction: 'vertical',
		mousewheelControl: true
	})
	tools.generateArray();
	//tools.audioAutoPlay("music_audio");
	tools.creatList(date_array, data_month);
	console.log("data_month",data_month)
	var selectedIndex = [0, 0];
	if (date_array[selectedIndex[0]].hasOwnProperty('date')) {
		tools.creatList(date_array[selectedIndex[0]].date, data_date);
	}
	console.log("data_date",data_date)
}();
$(".activehref").on("click",function(){
	$("#bd-w1").hide();
	$("#bd-w2").show();
	var oSwiper = new Swiper('#bd-w2', {
		direction: 'vertical',
		mousewheelControl: true
	})
})
$(".drivehref").on("click",function(){
	$("#bd-w1,#bd-w2,#putin_succeed_active").hide();
	$("#putin_ipt_drive").show();
})
$("#lecture_city").on("click",function(){
	tools.selectP("lecture_city");
})
$("#bookingdrive1001_province").on("click",function(){
	tools.selectP("bookingdrive1001_province");
})
$("#bookingdrive1001_city").on("click",function(){
	if (!tools.verification("#bookingdrive1001_province")) {
		return false
	}
	var provinceName= $("#bbookingdrive1001_province").val();
	var params = {
		"pName":provinceName
	}
	var options = {
		url:'/active/road/getCityList.do',
		type:'get',
		params:params
	}
	getCon.select('bookingdrive1001_city',options)
	
})
$("#bookingdrive1001_dealer").on("click",function(){
	if (!tools.verification("#bookingdrive1001_province")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_city")) {
		return false
	}
	var cityName = $("#bbookingdrive1001_city").val();
    var pName = $("#bookingdrive1001_province").val();
	var params = {
		"cName":cityName,
		"pName":pName
	}
	var options = {
		url:'/active/road/getDealerList.do',
		type:'get',
		params:params
	}
	getCon.select('bookingdrive1001_dealer',options)
	
})
$("#bookingdrive1001_vehicleType").on("click",function(){
	tools.selectP("bookingdrive1001_vehicleType");
})
$("#bookingdrive1001_time").on("click",function(){
	tools.selectP("bookingdrive1001_time");
})
$("#lecture_submit").on("click", function() {
	if (!tools.verification("#lecture_name")) {
		return false
	}
	if (!tools.verification("#lecture_mobile")) {
		return false
	}
	if (!tools.verification("#lecture_city")) {
		return false
	}
	var params = {
		name:$("#lecture_name").val(),
		mobile:$("#lecture_mobile").val(),
		cityName:$("#lecture_city").val()
	}
	var options = {
		url:'/active/road/xxxxxxxxxx.do',
		type:'get',
		params:params
	}
	_person.lib.$Ajax(options,function(data){
		if(data){
			if(data.status == 0){
                $("#bd-w1,#bd-w2").hide();
				$("#putin_succeed_active").fadeIn('slow');
			}else{
                dialog.show({content:data.msg});
                return false;
			}
		}else{
			dialog.show({content:data.msg});
			return false;
		}
	})
})
$("#bookingdrive1001_submit").on("click", function() {
	if (!tools.verification("#bookingdrive1001_name")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_mobile")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_province")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_city")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_dealer")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_vehicleType")) {
		return false
	}
	if (!tools.verification("#bookingdrive1001_time")) {
		return false
	}
	var params = {
		name:$("#bookingdrive1001_name").val(),
		mobile:$("#bookingdrive1001_mobile").val(),
		provinceName:$("#bookingdrive1001_province").val(),
		cityName:$("#bookingdrive1001_city").val(),
		dealerCode:$("#bookingdrive1001_dealer").attr("data-attr"),
		carModal:$("#bookingdrive1001_vehicleType").val(),
		appointTime:$("#bookingdrive1001_time").val()
	}
	var options = {
		url:'/active/road/addInfo.do',
		type:'get',
		params:params
	}
	_person.lib.$Ajax(options,function(data){
		if(data){
			if(data.status == 0){
				var result = data.result;
				if(result){
					var  areaCode= result.areaCode,
						tel = result.phoneNum,
						dealer = result.delaerSortName,
						date = result.appointTime,
                        location=result.delaerAdress;
					$("#suc_time").html(date);
					$("#suc_dealer").html(dealer);
					$(".inif_location").html(location);
					$(".inif_tel").html(areaCode+"-"+tel);

					$("#putin_ipt_drive").hide();
					$("#putin_succeed_drive").fadeIn('slow');
				}
			}else if(data.status == 0){
                dialog.show({content:"该用户已报过名"});
                return false;
			}else{
                dialog.show({content:data.msg});
                return false;
			}
		}else{
			dialog.show({content:data.msg});
			return false;
		}
	})
})