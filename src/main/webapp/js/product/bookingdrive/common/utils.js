var _person = {
	version: "1.0",
	author: "jinying.jiang",
	website: "/"
}

_person.tools = {
    loading: {
		show: function() {
            //var LoadingHtml = '<div class="load-view" id ="loadingDiv"><div class="load-an-view"><div class="fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div></div>';
            var LoadingHtml = '<div class="load-an-view"><div class="fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>';
			var box = document.createElement("div"),
            _this = this;
	        box.className = 'load-view';
	        box.id = 'loadingDiv';
	        box.innerHTML = LoadingHtml;
	        this.box = box;
	        document.body.appendChild(this.box);
			//document.body.appendChild(LoadingHtml)
        },
        hide: function() {
            document.body.removeChild(document.getElementById("loadingDiv"));
        }
    },
	getUrlParam: function(key) {
		if (!key) {}
		var url = window.location.search;
		url = url.split("?")[1];
		if (!url) {
			return null;
		}
		var value = null;
		var params = url.split("&");
		$.each(params,
			function(i, param) {
				var kv = param.split("=");
				if (kv[0] == key) {
					value = decodeURIComponent(kv[1]);
					return false;
				}
			});
		return value;
	},
	getStrParam: function(str, key) {
		if (!key) {}
		var url = str;
		url = url.split("?")[1];
		if (!url) {
			return null;
		}
		var value = null;
		var params = url.split("&");
		$.each(params,
			function(i, param) {
				var kv = param.split("=");
				if (kv[0] == key) {
					value = decodeURIComponent(kv[1]);
					return false;
				}
			});
		return value;
	},
	canStorage: function() {
		return !!window.localStorage ? true : false;
	},
	setStorage: function(key, value) {
		try {
			if (zuche.uitls.canStorage()) {
				localStorage.removeItem(key);
				if (typeof value !== "string") {
					value = JSON.stringify(value);
				}
				localStorage.setItem(key, value);
			}
		} catch (e) {}
	},
	getStorage: function(key) {
		if (zuche.uitls.canStorage()) {
			var value = localStorage.getItem(key);
			if (value && typeof value === "string" && value === "undefined") {
				value = null;
			}
			try {
				return value ? JSON.parse(value) : null;
			} catch (err) {
				return value;
			}
		}
	},
	removeStorage: function(key) {
		if (zuche.uitls.canStorage()) {
			localStorage.removeItem(key);
		}
	},
	setSession: function(key, value) {
		if (window.sessionStorage) {
			try {
				sessionStorage.removeItem(key);
				if (typeof value !== "string") {
					value = JSON.stringify(value);
				}
				sessionStorage.setItem(key, value);
			} catch (e) {}
		}
	},
	getSession: function(key) {
		if (window.sessionStorage) {
			try {
				var value = sessionStorage.getItem(key);
				if (value && typeof value === "string" && value === "undefined") {
					value = null;
				}
				try {
					return value ? JSON.parse(value) : null;
				} catch (err) {
					return value;
				}
			} catch (e) {}
		}
	},
	removeSession: function(key) {
		sessionStorage.removeItem(key);
	},
	setCookie: function(name, value, time) {
		var strsec = zuche.uitls.getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec * 1);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.zuche.com;path=/";
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	},
	hideMobile: function(mobile) { // 手机号省略显示
        if (mobile) {
            mobile = mobile.toString();
            mobile = mobile.substr(0, 3) + "****" + mobile.substr(7, 4);
        };
        return mobile;
    },
    mobileValidate: function(mobile) {
        if (null === mobile || "" === mobile) {
			return false;
		} else {
			var reg = /(^0?(1[2-9])[0-9]{9}$)|(^886[0-9]{9}$)/;
			if (!reg.test(mobile)) {
				return false;
			} else {
				return true;
			}
		}
    },
    ajax: function(options, success) {
        $.ajax({
            url:options.url,
            type:options.type,
            data:options.params,
            dataType:"json",
            cache : false,
            success:function(data){
                if(data){
                    if(data && (data.status == "SUCCESS" || data.status == 0)){//成功
                        if(success){
                            success(data);
                        }
                    }else{
                        dialog.toast({content:data.msg});
                    }
                }else{
                    dialog.toast({content:data.msg});
                }
            },
            error: function(request, status, error) {
                dialog.toast({content:"系统繁忙，请稍后再试！"});
            }
        });
    },
    browserVersions: function(){
    	var u = navigator.userAgent, app = navigator.appVersion;
    	return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
	    //if(browserVersions.mobile||browserVersions.android||browserVersions.ios){ alert("移动端"); }
    }()
}
$(document).on("ajaxStart", function() {
    _person.tools.loading.show();
}),
$(document).on("ajaxStop", function() {
    _person.tools.loading.hide();
})