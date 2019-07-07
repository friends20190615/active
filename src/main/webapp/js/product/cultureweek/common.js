var cw = (function() {
	var bili = 750 / 1334, //0.56  0.388  
        $wh = $(window).height(),
        $ww = $(window).width(),
        $zwwh = $(".zwtbtb").height();
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
        	screen:function(){
        		if($ww/$wh < bili){
					$(".pre-wrap").addClass("ms_abs");
					$(".td_succeed_wrap").css("height",$zwwh);
				}else{
					$(".pre-wrap").addClass("ms_h100");
				}
        	},
        	rolldate:function(){
        		var lang = {
					title: '选择出生日期',
					cancel: '取消',
					confirm: '确认',
					year: '年',
					month: '月',
					day: '日'
				};
        		var myDate = new Date(),
					year = myDate.getFullYear();
        		new Rolldate({
					el: '#dategroup',
					format: 'YYYY-MM-DD',
					beginYear: 1500,
					endYear:year,
					lang: lang,
				    init: function() {
						$("#dategroup").blur(function(){$("keyboard").hide();});
					}
				})
        	},
        	verification:function(type){
        		var that = $(type);
        		var val = $.trim(that.val());
        		if(val == ""){
        			var tips = that.attr("data-error");
        			that.parents("li").find("i").html(tips);
        			return false;
        		}else{
        			if(type == "#mobile" && val != ""){
        				if(!_person.tools.mobileValidate(val) ){
				            that.parents("li").find("i").html("请输入正确手机号");
				            return false;
				        }else{
				        	that.parents("li").find("i").html("");
				            return true;
				        };
        			}else if(type == "#idnumber" && val != ""){
        				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
						if(reg.test(val) === false){
							that.parents("li").find("i").html("请输入正确身份证号");
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
        	selectP:function(id){
        		var nameEl = document.getElementById(id);
        		var myDate = new Date();
			    var day = myDate.getDate(); 
			    console.log("day:",day);
			    
			    var dayarr = new Array();
				var i = 12;
				if( day >= 12){
			    	i = day
			    }
				do{
				  dayarr.push(i+"日");
				  i++;
				}
				while(i<22)
				console.log("dayarr:",dayarr);
				var data_visitingtime3 = [];

			    for (i = 0; i < dayarr.length; i++) {
			        data_visitingtime3[i] = {
			            text: dayarr[i],
			            value: Math.floor(Math.random() * 40)
			        }
			    }
				var data_business = [//行业
				  {
				    text: '信息技术',
				    value: 1
				  }, {
				    text: '互联网开发/应用',
				    value: 2
				  }, {
				    text: '建筑工程/装潢',
				    value: 3
				  }, {
				    text: '金融',
				    value: 4
				  }, {
				    text: '通信技术',
				    value: 5
				  }, {
				    text: '服装/纺织/皮革',
				    value: 6
				  }, {
				    text: '工程/机械',
				    value: 7
				  }, {
				    text: '电子/电器/半导体/仪器仪表',
				    value: 8
				  }, {
				    text: '贸易',
				    value: 9
				  }, {
				    text: '其他',
				    value: 10
				  }
				],
				data_visitingtime1 = [//参观时间月份
					{
					    text: '7月',
					    value: 1
					}
				],
				data_visitingtime2 = [//参观时间
					{
					    text: '上午',
					    value: 1
					}, {
					    text: '下午',
					    value: 2
					}
				],
                data_visitingtime4 = [//参观时间
                    {
                        text: '13日',
                        value: 2
                    }, {
                        text: '14日',
                        value: 3
                    }, {
                        text: '20日',
                        value: 4
                    }, {
                        text: '21日',
                        value: 5
                    }
                ],
				data_vehicletype = [//选择车型
					{
					    text: '2019年款路虎发现',
					    value: 1
					},
					{
					    text: '2019年款路虎发现神行',
					    value: 1
					}
				],
				data_dategroup = [//选择车型
					{
					    text: '20以下',
					    value: 1
					},
					{
					    text: '20-25',
					    value: 2
					},
					{
					    text: '25-30',
					    value: 3
					},
					{
					    text: '30-40',
					    value: 4
					},
					{
					    text: '40-50',
					    value: 5
					},
					{
					    text: '55以上',
					    value: 6
					}
				]/*,
				data_handler1 = [//试驾预约时间
					{
					    text: '7月',
					    value: 1
					}
				],
				data_handler2 = [//试驾预约时间
					{
					    text: '12日',
					    value: 1
					}, {
					    text: '13日',
					    value: 2
					}, {
					    text: '14日',
					    value: 3
					}, {
					    text: '15日',
					    value: 4
					}, {
					    text: '16日',
					    value: 5
					},{
						text: '17日',
					    value: 6
					},{
						text: '18日',
					    value: 7
					},{
						text: '19日',
					    value: 8
					},{
						text: '20日',
					    value: 9
					},{
						text: '21日',
					    value: 10
					}
				],
				data_city = [//城市
					{
					    text: '北京',
					    value: 1
					},
					{
					    text: '上海',
					    value: 2
					},
					{
					    text: '广东',
					    value: 3
					},
					{
					    text: '深圳',
					    value: 4
					}
				],
				data_dealer = [//经销商
					{
					    text: '测试数据1',
					    value: 1
					},
					{
					    text: '测试数据2',
					    value: 2
					},
					{
					    text: '测试数据3',
					    value: 3
					},
					{
					    text: '测试数据4',
					    value: 4
					}
				]*/
				var title = nameEl.getAttribute("data-title");
				var data_arr = [];
				var selectedIndex_arr = [];
				switch(id)
				{
				    case "business":
				        data_arr = [data_business];
				        selectedIndex_arr=[0];
				        break;
				    case "visitingtime":
                        var origin = _person.tools.getUrlParam("origin");
                        if(origin == "personnel"){
                            data_arr = [data_visitingtime1,data_visitingtime2,data_visitingtime4];
						}else{
                            data_arr = [data_visitingtime1,data_visitingtime2,data_visitingtime3];
						}
				        selectedIndex_arr=[0,0,1];
				        break;
				    case "dategroup":
				        data_arr = [data_dategroup];
				        selectedIndex_arr=[0];
				        break;
				    case "vehicletype":
				        data_arr = [data_vehicletype];
				        selectedIndex_arr=[0];
				        break;
				    case "handler":
				        data_arr = [data_handler1,data_handler2];
				        selectedIndex_arr=[0,0];
				        break;
				    case "city":
				        data_arr = [data_city];
				        selectedIndex_arr=[0];
				        break;
				    case "dealer":
				        data_arr = [data_dealer];
				        selectedIndex_arr=[0];
				        break;
				        
				}
				var picker = new Picker({
				  data: data_arr,
				  selectedIndex: selectedIndex_arr,
				  title: title
				});

				picker.on('picker.select', function (selectedVal, selectedIndex) {
					$(nameEl).parents("li").find("i").html("");
					switch(id)
					{
					    case "business":
					        nameEl.value = data_business[selectedIndex[0]].text;
				  			nameEl.setAttribute("data-attr", selectedIndex[0]);
					        break;
					    case "visitingtime":
                            var origin = _person.tools.getUrlParam("origin");
                            if(origin == "personnel"){
                                nameEl.value = data_visitingtime4[selectedIndex[2]].text+data_visitingtime2[selectedIndex[1]].text;
							}else{
                                nameEl.value = data_visitingtime3[selectedIndex[2]].text+data_visitingtime2[selectedIndex[1]].text;
							}
                                nameEl.setAttribute("data-attr", '0,' + selectedIndex[1] + ',' + selectedIndex[2])

					        break;
					    case "dategroup":
					        nameEl.value = data_dategroup[selectedIndex[0]].text;
				  			nameEl.setAttribute("data-attr", selectedIndex[0]);
					        break;
					    case "vehicletype":
					        nameEl.value = data_vehicletype[selectedIndex[0]].text;
				  			nameEl.setAttribute("data-attr", selectedIndex[0]);
					        break;
					    case "handler":
					        nameEl.value = data_handler2[selectedIndex[1]].text;
				  			nameEl.setAttribute("data-attr", '0,' + selectedIndex[1])
					        break;
					    case "city":
					        nameEl.value = data_city[selectedIndex[0]].text;
				  			nameEl.setAttribute("data-attr", selectedIndex[0]);
					        break;
					    case "dealer":
					        nameEl.value = data_dealer[selectedIndex[0]].text;
				  			nameEl.setAttribute("data-attr", selectedIndex[0]);
					        break;
						}
				  
				})

				picker.on('picker.change', function (index, selectedIndex) {
				  console.log(index);
				  console.log(selectedIndex);
				});


				picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
				  console.log(selectedVal);
				  console.log(selectedIndex);
				});

				picker.show();
			    var str = nameEl.getAttribute("data-attr");
			    if(str){
			      var arr = str.split(',');
			      picker.selectedIndex=arr;
			  	}
        	},
        	screenShot:function (targetDom,cb){
		        var copyDom = targetDom;
		        //copyDom.css('display','block');
		        //$('body').append(copyDom);
		        var width = copyDom.width();
		        var height = copyDom.height();
		        var scale = 2;//放大倍数
		        var canvas = document.createElement('canvas');
		        canvas.width = width*scale;
		        canvas.height = height*scale;
		        var content = canvas.getContext("2d");
		        content.scale(scale,scale);
		        var rect = copyDom.get(0).getBoundingClientRect();
		        content.translate(-rect.left,-rect.top);
		        html2canvas(copyDom, {
		            allowTaint:true,
		            tainTest:true,
		            scale:scale,
		            canvas:canvas,
		            width:width,
		            heigth:height,
		            onrendered: function(canvas) {
		                if(cb){
		                    //copyDom.css('display','none');
		                    cb(canvas.toDataURL("image/png"),width,height);
		                }
		            }
		        });
		    }
        },
        getCon={
        	ajax:function(type,callback){
        		/*if(callback) {
                    var param = {
                        visitingtime:"13日"
                    };
					callback(param);
				}
        		return;*/
        		//$(".enroll_wrap").hide();
	           // $(".EInvitationLetter_wrap").fadeIn("slow");
        		var name = $("#name").val(),
	        		mobile = $("#mobile").val(),
	        		dategroup = $("#dategroup").val(),
	        		business = $("#business").val(),
	        		visitingtime = $("#visitingtime").val(),
	        		cdsid = $("#cdsid").val(),
	        		url="/api/active/visit/newMember.do";
                var origin = _person.tools.getUrlParam("origin");
                if(origin == "personnel"){
                	if(visitingtime ==="12日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，12号只能预约下午时间",contentAlign:"ac"});
                		return;
					}
                    if(visitingtime ==="14日下午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，14号只能预约上午时间",contentAlign:"ac"});
                        return;
                    }
				}else{
                    if(visitingtime ==="12日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，12号只能预约下午时间",contentAlign:"ac"});
                        return;
                    }
                    if(visitingtime ==="13日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，13号只能预约下午时间",contentAlign:"ac"});
                        return;
                    }
                    if(visitingtime ==="14日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，14号只能预约下午时间",contentAlign:"ac"});
                        return;
                    }
                    if(visitingtime ==="15日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，15号只能预约下午时间",contentAlign:"ac"});
                        return;
                    }
                    if(visitingtime ==="16日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，16号只能预约下午时间",contentAlign:"ac"});
                        return;
                    }
                    if(visitingtime ==="17日上午"){
                        _person.tools.Dialog.alert({title:"",content:"很抱歉，17号只能预约下午时间",contentAlign:"ac"});
                        return;
                    }
				}
	            var param = {
	                name:name,
	                mobile:mobile,
	                dategroup:dategroup,
	                business:business,
	                cdsid:cdsid,
	                visitingtime:visitingtime
	            };
                
	            /*if(type=="testdrive"){
	        		url="试驾申请接口";
	        		param.idnumber = $("#idnumber").val();
	        		param.vehicletype = $("#vehicletype").val();
	        		param.handler = $("#handler").val();
	        		param.city = $("#city").val();
	        		param.dealer = $("#dealer").val();
	        	}*/
	            $.ajax({
	                type: "post", 
	                url: url,  
	                data: param,
	                dataType: "json",
	                async:false,
	                success:function(data){
	                    var status = data.status;
	                    if (status == 0) {
	                    	if(callback) {
								callback(param);
								return;
							}
	                    }else{
	                        _person.tools.Dialog.alert({title:"",content:data.msg,contentAlign:"ac"});
	                    }
	                },  
	                error:function(jqXHR, textStatus, errorThrown){
	                    _person.tools.Dialog.alert({title:"",content:"服务器繁忙",contentAlign:"ac"});
	                }  
	            });
	            return;
        	}
        };
	return {
		views:{
			merchandiseshow:{
				init:function(){
					tools.screen();//页面高度
					var swiper = new Swiper('#md-sc', {
				        pagination: '.swiper-pagination',
				        paginationClickable: true,
				        direction: 'vertical'
				    });
				    if($ww < $wh){
						$(".enroll_wrap").css("height",$wh);
					}
					var origin = _person.tools.getUrlParam("origin");
					if(origin == "personnel"){
						$(".cdsidshow").show();
						$(".businessshow,.inits").hide();
					}
					//tools.verification("#name");
					$("#business").on("click",function(){
						tools.selectP("business");
					})
					$("#visitingtime").on("click",function(){
						tools.selectP("visitingtime");
					})
					$("#dategroup").on("click",function(){
						tools.selectP("dategroup");
					})
					$("#mdSub").on("click",function(){
						//var arr = ["#name","#mobile"];
						if(!tools.verification("#name")){
							return false
						}
						if(!tools.verification("#mobile")){
							return false
						}
						if(origin = "personnel"){
							if(!tools.verification("#cdsid")){
								return false
							}
							if(!tools.verification("#dategroup")){
								return false
							}
						}else{
							if(!tools.verification("#dategroup")){
								return false
							}
							if(!tools.verification("#business")){
								return false
							}
						}
						
						if(!tools.verification("#visitingtime")){
							return false
						}
						var visitingtime = $("#visitingtime").val(),
                    	search = "日";
		                start = visitingtime.indexOf(search);//获得字符串的开始位置
		                dd= visitingtime.substr(0,start),
		                    afternoon = visitingtime.substr(-2),
		                    weekArray = new Array("日", "一", "二", "三", "四", "五", "六"),
		                    day = '2019/7/'+dd,
		                    week = "周"+weekArray[new Date(day).getDay()];
		                $(".sdata").html("<span>2019.7."+dd+"</span>"+week+afternoon);
		                setTimeout(function(){
		                    tools.screenShot($('#contbox'),function (canvas,width,height) {
		                        document.querySelector('#down1').src = canvas;
		                        document.querySelector('#down1').style.width = width+"px";
		                        document.querySelector('#down1').style.height = height+"px";
		                    });
		                    getCon.ajax(null,function(param){
	                            $("#md-sc").hide();
		            			$(".EInvitationLetter_wrap").addClass("visibilitypage");
							});
		                },1000);
						
					});
					$(".tatipt").on("input",function(){
				        var that = $(this);
				        if(that.val().length > 1){
				            that.parents("li").find("i").html("");
				            console.log('123')
				        }
				    }).blur(function(){
				        var that = $(this);
				        if(that.val() == ""){
				        	var tips = that.attr("data-error");
        					that.parents("li").find("i").html(tips);
				        }
				        setTimeout(function() {
				            $(window).scrollTop(0);
				        }, 100);
				    })
				}
			},
			testdrive:{
				init:function(){
					tools.screen();//页面高度
					/*var swiperH1 = new Swiper('.swiper-container-h1', {
				        paginationClickable: true,
				        spaceBetween: 50,
				        centeredSlides: true,
				        autoplay: 2500,
				        autoplayDisableOnInteraction: false,
				        onInit: function(swiper){
					      $(".tdpage1 .img_bg").addClass("animated fadeInLeft");
					    $(".tdpage1 .img_icon").addClass("fadeInLeft2");
					    },
				        onSlideChangeStart: function(swiper){
				        	console.log('ttt:',swiper.activeIndex)
				        	$(".tdpage .img_bg").removeClass("animated fadeInLeft");
				        	$(".tdpage .img_icon").removeClass("fadeInLeft2");
				        	if(swiper.activeIndex == 0){
					    		$(".tdpage1 .img_bg").addClass("animated fadeInLeft");
					    		$(".tdpage1 .img_icon").addClass("fadeInLeft2");
					    	}else if(swiper.activeIndex == 1){
					    		$(".tdpage2 .img_bg").addClass("animated fadeInLeft");
					    		$(".tdpage2 .img_icon").addClass("fadeInLeft2");
					    	}
				        }
				    });
				    var swiperH2 = new Swiper('.swiper-container-h2', {
				        paginationClickable: true,
				        spaceBetween: 50,
				        centeredSlides: true,
				        autoplay: 2500,
				        autoplayDisableOnInteraction: true,
				        onInit: function(swiper){
					      swiper.stopAutoplay();
					    },
				        onSlideChangeStart: function(swiper){
				        	console.log('ttt2:',swiper.activeIndex)
				        	$(".tdpage .td-a").removeClass("animated jello");
				        	$(".tdpage .img_w1").removeClass("fadeInLeft1");
				    		$(".tdpage .img_w2").removeClass("fadeInLeft2");
				    		$(".tdpage .img_w3").removeClass("zoomIn4");
				        	if(swiper.activeIndex == 0 ){
					    		$(".tdpage3 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage3 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage3 .img_w3").addClass("zoomIn4");
					    		$(".tdpage3 .td-a").addClass("animated jello");
					    	}else if(swiper.activeIndex == 1){
					    		$(".tdpage4 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage4 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage4 .img_w3").addClass("zoomIn4");
					    		$(".tdpage4 .td-a").addClass("animated jello");
					    	}else if(swiper.activeIndex == 2){
					    		$(".tdpage5 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage5 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage5 .img_w3").addClass("zoomIn4");
					    		$(".tdpage5 .td-a").addClass("animated jello");
					    	}
				        }
				    });
				    var swiperV = new Swiper('.swiper-container-v', {
				        paginationClickable: true,
				        direction: 'vertical',
				        spaceBetween: 100,
				        onSlideChangeStart: function(swiper){
				        	swiperH2.stopAutoplay();
				        	$(".tdpage .img_bg").removeClass("animated fadeInLeft");
				        	$(".tdpage .img_icon").removeClass("fadeInLeft2");
				        	$(".tdpage .td-a").removeClass("animated jello");
				        	$(".tdpage .img_w1").removeClass("fadeInLeft1");
				    		$(".tdpage .img_w2").removeClass("fadeInLeft2");
				    		$(".tdpage .img_w3").removeClass("zoomIn4");
				        	if(swiper.activeIndex == 0){
				        		swiperH1.startAutoplay();
				        		swiperH2.stopAutoplay();
					    		$(".tdpage1 .img_bg").addClass("animated fadeInLeft");
					    		$(".tdpage1 .img_icon").addClass("fadeInLeft2");
					    		$(".tdpage2 .img_bg").addClass("animated fadeInLeft");
					    		$(".tdpage2 .img_icon").addClass("fadeInLeft2");
					    	}else if(swiper.activeIndex == 1){
					    		swiperH2.startAutoplay();
					    		swiperH1.stopAutoplay();
					    		$(".tdpage3 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage3 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage3 .img_w3").addClass("zoomIn4");
					    		$(".tdpage3 .td-a").addClass("animated jello");
					    	}
				        }
				    });*/
					var swiper = new Swiper('#td-sc', {
				        pagination: '.swiper-pagination',
				        paginationClickable: true,
				        direction: 'vertical',
				        onSlideChangeStart: function(swiper){
				        	console.log(swiper.activeIndex)
				        	$(".tdpage .img_bg").removeClass("animated fadeInLeft");
				        	$(".tdpage .img_icon").removeClass("fadeInLeft2");
				        	$(".tdpage .td-a").removeClass("animated jello");
				        	$(".tdpage .img_w1").removeClass("fadeInLeft1");
				    		$(".tdpage .img_w2").removeClass("fadeInLeft2");
				    		$(".tdpage .img_w3").removeClass("zoomIn4");
					    	if(swiper.activeIndex == 0){
					    		$(".tdpage1 .img_bg").addClass("animated fadeInLeft");
					    		$(".tdpage1 .img_icon").addClass("fadeInLeft2");
					    	}else if(swiper.activeIndex == 1){
					    		$(".tdpage2 .img_bg").addClass("animated fadeInLeft");
					    		$(".tdpage2 .img_icon").addClass("fadeInLeft2");
					    	}else if(swiper.activeIndex == 2 ){
					    		$(".tdpage3 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage3 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage3 .img_w3").addClass("zoomIn4");
					    		$(".tdpage3 .td-a").addClass("animated jello");
					    	}else if(swiper.activeIndex == 3){
					    		$(".tdpage4 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage4 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage4 .img_w3").addClass("zoomIn4");
					    		$(".tdpage4 .td-a").addClass("animated jello");
					    	}else if(swiper.activeIndex == 4){
					    		$(".tdpage5 .img_w1").addClass("fadeInLeft1");
					    		$(".tdpage5 .img_w2").addClass("fadeInLeft2");
					    		$(".tdpage5 .img_w3").addClass("zoomIn4");
					    		$(".tdpage5 .td-a").addClass("animated jello");
					    	}
					    }
				    });



					/*$("#vehicletype").on("click",function(){
						tools.selectP("vehicletype");
					})
					$("#handler").on("click",function(){
						tools.selectP("handler");
					})
					$("#city").on("click",function(){
						tools.selectP("city");
					})
					$("#dealer").on("click",function(){
						tools.selectP("dealer");
					})
					$("#tdSub").on("click",function(){
						//var arr = ["#name","#mobile"];
						if(!tools.verification("#name")){
							return false
						}
						if(!tools.verification("#mobile")){
							return false
						}
						if(!tools.verification("#idnumber")){
							return false
						}
						if(!tools.verification("#vehicletype")){
							return false
						}
						if(!tools.verification("#handler")){
							return false
						}
						if(!tools.verification("#city")){
							return false
						}
						if(!tools.verification("#dealer")){
							return false
						}
						getCon.ajax("testdrive",function(){
							
							$(".td_signUp_wrap").hide();
							var idnumberval = $("#idnumber").val();
							idnumberval = idnumberval.substr(0,1)+"***********"+idnumberval.substr(-5);
							$(".sname").html($("#name").val());
							$(".sidnumber").html(idnumberval);
							$(".scoupontpl").html($("#vehicletype").val());
							$(".sday").html($("#handler").val());
							$(".sdealer").html($("#dealer").val());
	            			$(".td_succeed_wrap").fadeIn("slow");

						});
					})
					$(".tatipt").on("input",function(){
				        var that = $(this);
				        if(that.val().length > 1){
				            that.parents("li").find("i").html("");
				            console.log('123')
				        }
				    }).blur(function(){
				        var that = $(this);
				        if(that.val() == ""){
				        	var tips = that.attr("data-error");
        					that.parents("li").find("i").html(tips);
				        }
				    })
				    $(".td-a").on("click",function(){
				    	$("#td-sc").hide();
				    	$(".td_signUp_wrap").fadeIn("slow");
				    })*/
				}
			},
			index:{
				init:function(){
					if($ww < $wh){
						$(".index-wrap,.swiper-container,#o-c").css("height",$wh);
					}
					var origin = _person.tools.getUrlParam("origin");
					if(origin == "personnel"){
						$(".a_origin").attr("href","merchandiseshow.html?origin=personnel")
					}
					var oSwiper = new Swiper('#index-c',{
						direction : 'vertical',
						mousewheelControl: true,
						onSetTransition: function(swiper){
				            if(swiper.activeIndex==1){
					            swiper.params.onlyExternal=true;
					            swiper.disableMousewheelControl();
				           	}else{
					            swiper.params.onlyExternal=false;
					            swiper.enableMousewheelControl();
					        }
					
				        }
					   
					})
					var iSwiper = new Swiper('#index-c1',{
						scrollbar: '.swiper-scrollbar',
				        direction: 'vertical',
				        slidesPerView: 'auto',
						freeMode: true,
						freeModeMomentum : false,
						mousewheelControl: true,
						mousewheelSensitivity : 0.5,
						onSetTransition: function(swiper,translate){
							//translate 一直为0，不可直接用
							nowTranslate=swiper.translate;
							if( typeof(beforeTranslate)=="undefined"){beforeTranslate=0};
							slideHeight=swiper.slides[0].scrollHeight;
							swiperHeight=swiper.height
							if(nowTranslate>-2 && nowTranslate > beforeTranslate){oSwiper.slideTo(0);}
							if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){oSwiper.slideTo(2);}
							beforeTranslate=nowTranslate;
				           },
						 onTouchEnd:function(swiper){
							if(swiper.translate>0){oSwiper.slideTo(0);}
							if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){oSwiper.slideTo(2);}
						}

					});
					tools.audioAutoPlay("music_audio");
				}
			}

		},
		render : function(viewName, method) {
			var that = cw;
			var view = that.views[viewName];
			method = method || "init";
			if (view) {
				view[method].apply(view);
			}
		}

	}
})();