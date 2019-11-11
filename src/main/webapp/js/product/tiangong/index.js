
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
	$('.svg-box').css({'width':$ww,'height':$wh});
	/*var hj = $wh/2;
	var hj2 = $wh/6;
	var wj = $ww/2;
	$('#box1').attr('points','0 0,0 ' + hj + ','  + wj + ' '+ hj2 + ' ,'  + wj + ' 0,' + hj );*/
	var swiper = new Swiper('#index-swiper', {
        paginationClickable: true,
        direction: 'vertical'
    });
}();