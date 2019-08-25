
let select_province = [{text: '',value: ''}],
	select_array = [{text: '',value: ''}],
	tools = {
	verification:function(type){
		var that = $(type);
		var val = $.trim(that.val());
		if(val == ""){
			var tips = that.attr("data-error");
			that.parents("li").find("i").html(tips);
			return false;
		}else{
			if(type == "#bookingdrive_mobile" && val != ""){
				if(!_person.tools.mobileValidate(val) ){
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
	selectP:function(id){
		let nameEl = document.getElementById(id),
			title = nameEl.getAttribute("data-title"),
			data_arr = [],
			data_province = select_province,
			data_array = select_array,
			data_vehicleType = [ //车型
				{
					text: '路虎发现',
					value: 4001
				}, {
					text: '路虎发现神行',
					value: 4002
				}
			]
		switch (id) {
			case "bookingdrive_province":
				data_arr = [select_province];
				break;
			case "bookingdrive_vehicleType":
				data_arr = [data_vehicleType];
				break;
			default:
				data_arr = [select_array];
		}
		let picker = new Picker({
			data: data_arr,
			selectedIndex: [0],
			title: title
		});
		picker.on('picker.select', function(selectedVal, selectedIndex) {
			$(nameEl).parents("li").find("i").html("");
			switch (id) {
				case "bookingdrive_province":
					nameEl.value = data_province[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_province[selectedIndex[0]].value);
					break;
				case "bookingdrive_vehicleType":
					nameEl.value = data_vehicleType[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_vehicleType[selectedIndex[0]].value);
					break;
				default:
					nameEl.value = data_array[selectedIndex[0]].text;
					nameEl.setAttribute("data-attr", data_array[selectedIndex[0]].value);
			}

		})

		picker.on('picker.change', function(index, selectedIndex) {
			console.log('1',index);
			console.log('2',selectedIndex);
		});


		picker.on('picker.valuechange', function(selectedVal, selectedIndex) {
			console.log('3',selectedVal);
			console.log('4',selectedIndex);
			switch (id) {
				case "bookingdrive_province":
					$("#bookingdrive_city,#bookingdrive_dealer").val("");
					break;
				case "bookingdrive_city":
					$("#bookingdrive_dealer").val("");
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
			case "bookingdrive_province":
				keyMap = {
					"provinceName":"text",
                    "provinceName":"text",
				}
				break;
			case "bookingdrive_city":
				keyMap = {
					"cityName":"text",
				}
				break;
			case "bookingdrive_dealer":
				keyMap = {
					"dealerName":"text",
					"dealerCode":"value"
				}
				break;
		}
		_person.tools.ajax(options,function(data){
			if(data){
				if(data.status == 0){
					if(type == "bookingdrive_province"){
						select_province = data.result;
						tools.forAO(select_province,keyMap);
					}else{
						select_array = data.result;
						tools.forAO(select_array,keyMap);
						tools.selectP(type);
					}
				}else{
					dialog.toast({content:data.msg});
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
		$(".addh,#bd-w.swiper-container").css("height",$wh);
	}
	var province_options = {
		url:'/active/road/getProvinceList.do',
		type:'get',
		params:''
	}
	getCon.select('bookingdrive_province',province_options)
	var oSwiper = new Swiper('#bd-w', {
		direction: 'vertical',
		mousewheelControl: true,
		onSetTransition: function(swiper) {
			if (swiper.activeIndex == 3) {
				swiper.params.onlyExternal = true;
				swiper.disableMousewheelControl();
			} else {
				swiper.params.onlyExternal = false;
				swiper.enableMousewheelControl();
			}

		}
	})
	var iSwiper = new Swiper('#bd-wh', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: false,
		mousewheelControl: true,
		mousewheelSensitivity: 0.5,
		onSetTransition: function(swiper, translate) {
			//translate 一直为0，不可直接用
			nowTranslate = swiper.translate;
			if (typeof(beforeTranslate) == "undefined") {
				beforeTranslate = 0
			};
			slideHeight = swiper.slides[0].scrollHeight;
			swiperHeight = swiper.height
			if (nowTranslate > -2 && nowTranslate > beforeTranslate) {
				oSwiper.slideTo(2);
			}
			beforeTranslate = nowTranslate;
		},
		onTouchEnd: function(swiper) {
			if (swiper.translate > 0) {
				oSwiper.slideTo(2);
			}
		}

	});
}()
$("#bookingdrive_province").on("click",function(){
	tools.selectP("bookingdrive_province");
})
$("#bookingdrive_city").on("click",function(){
	if (!tools.verification("#bookingdrive_province")) {
		return false
	}
	var provinceName= $("#bookingdrive_province").val();
	console.info(provinceName);
	var params = {
		"pName":provinceName
	}
	var options = {
		url:'/active/road/getCityList.do',
		type:'get',
		params:params
	}
	getCon.select('bookingdrive_city',options)
	
})
$("#bookingdrive_dealer").on("click",function(){
	if (!tools.verification("#bookingdrive_province")) {
		return false
	}
	if (!tools.verification("#bookingdrive_city")) {
		return false
	}
	var cityName = $("#bookingdrive_city").val();
    var pName = $("#bookingdrive_province").val();
	var params = {
		"cName":cityName,
		"pName":pName
	}
	var options = {
		url:'/active/road/getDealerList.do',
		type:'get',
		params:params
	}
	getCon.select('bookingdrive_dealer',options)
	
})
$("#bookingdrive_vehicleType").on("click",function(){
	tools.selectP("bookingdrive_vehicleType");
})
$("#bookingdrive_time").on("click",function(){
	console.log('选择时间')
	//tools.selectP("visitingtime");
})
$("#bookingdrive_submit").on("click", function() {
	if (!tools.verification("#bookingdrive_name")) {
		return false
	}
	if (!tools.verification("#bookingdrive_mobile")) {
		return false
	}
	if (!tools.verification("#bookingdrive_province")) {
		return false
	}
	if (!tools.verification("#bookingdrive_city")) {
		return false
	}
	if (!tools.verification("#bookingdrive_dealer")) {
		return false
	}
	if (!tools.verification("#bookingdrive_vehicleType")) {
		return false
	}
	/*if (!tools.verification("#bookingdrive_time")) {
		return false
	}*/
	var params = {
		name:$("#bookingdrive_name").val(),
		mobile:$("#bookingdrive_mobile").val(),
		provinceName:$("#bookingdrive_province").val(),
		cityName:$("#bookingdrive_city").val(),
		dealerCode:$("#bookingdrive_dealer").attr("data-attr"),
		carModal:$("#bookingdrive_vehicleType").val(),
		appointTime:$("#bookingdrive_time").val()
	}
	var options = {
		url:'/active/road/addInfo.do',
		type:'get',
		params:params
	}
	_person.tools.ajax(options,function(data){
		if(data){
			if(data.status == 0){
				var result = data.result;
				if(result){
					var location = result.booking_location,
						tel = result.booking_tel,
						dealer = result.booking_dealer,
						date = result.booking_date;
					$("#suc_time").html(date);
					$("#suc_dealer").html(dealer);
					$(".inif_location").html(location);
					$(".inif_tel").html(tel);

					$("#bd-w").hide();
					$(".page_succeed").show();
				}
			}
		}else{
			dialog.show({content:data.msg});
			return false;
		}
	})
})