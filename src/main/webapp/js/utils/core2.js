var _person = {
    version: "2.0",
    author: "jinying.jiang",
    website: "/"
};
_person.tools = {
	getUrlParam: function(name,str) {
        if (!name) {}
        var url = window.location.search;
        if(str){
			url = str;
        }
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = url.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    };
	    return null;
    },
    getsec: function(str) {
        console.log(str);
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == 's') {
            return str1 * 1000;
        } else if (str2 == 'm') {
            return str1 * 60 * 1000;
        } else if (str2 == 'h') {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == 'd') {
            return str1 * 24 * 60 * 60 * 1000;
        }
    },
    canStorage: function() {
        return !!window.localStorage ? true : false;
    },
    setStorage: function(key, value) {
        try {
            if (_person.tools.canStorage()) {
                localStorage.removeItem(key);
                if (typeof value !== 'string') {
                    value = JSON.stringify(value);
                }
                localStorage.setItem(key, value);
            }
        } catch (e) {}
    },
    getStorage: function(key) {
        if (_person.tools.canStorage()) {
            var value = localStorage.getItem(key);
            if (value && typeof value === 'string' && value === 'undefined') {
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
        if (_person.tools.canStorage()) {
            localStorage.removeItem(key);
        }
    },
    setSession: function(key, value) {
        if (window.sessionStorage) {
            try {
                sessionStorage.removeItem(key);
                if (typeof value !== 'string') {
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
                if (value && typeof value === 'string' && value === 'undefined') {
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
        var strsec = _person.tools.getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    },
    getCookie: function(name) {
        var cookieArray = document.cookie.split('; ');
        for (var i = 0; i < cookieArray.length; i++) {
            var arr = cookieArray[i].split('=');
            if (arr[0] == name) {
                return unescape(arr[1]);
            }
        }
    },
    removeCookie: function(name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + '=a; expires=' + date.toGMTString();
    },
    hideMobile: function(mobile) { // 手机号省略显示
        if (mobile) {
            mobile = mobile.toString();
            mobile = mobile.substr(0, 3) + '****' + mobile.substr(7, 4);
        };
        return mobile;
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
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            zhifubao: u.indexOf('Alipay') > -1, //是否微信 
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
        };
	    //if(_person.tools.browserVersions.mobile||_person.tools.browserVersions.android){ alert("移动端"); }
    }(),
	dialog: function() {
		var elem, toastelem, dialog, toastcont, cancelBtn, confirmBtn, once = 0;
		var animaArr = new Array(['fadeInD', 'fadeOutD'], ['slideDownD', 'slideUpD'], ['scaleInD', 'scaleOutD']);
		var currAnimation = '';
		var getNeedElement = function getNeedElement(type) {
			if (type == 'toast') {
				toastelem = document.querySelector('.toast-wrapper');
				toastcont = toastelem.querySelector('.toast-content')
			} else {
				elem = document.querySelector('.dialog-wrapper');
				dialog = elem.querySelector('.dialog');
				cancelBtn = elem.querySelector('.cancel-btn');
				confirmBtn = elem.querySelector('.confirm-btn')
			}
		};
		var show = function show(options) {
			if (once == 0) {addstyle();once = 1;}
			if (options === void 0) {options = {}}
			var _options = options,
				_options$title = _options.title, title = _options$title === void 0 ? '' : _options$title,
				_options$content = _options.content, content = _options$content === void 0 ? '你好像忘记传content值了' : _options$content,
				_options$skin = _options.skin, skin = _options$skin === void 0 ? '' : _options$skin,
				_options$btns = _options.btns, btns = _options$btns === void 0 ? ['确定'] : _options$btns,
				_options$confirm = _options.confirm, confirm = _options$confirm === void 0 ? null : _options$confirm,
				_options$cancel = _options.cancel, cancel = _options$cancel === void 0 ? null : _options$cancel,
				_options$shadeClose = _options.shadeClose, shadeClose = _options$shadeClose === void 0 ? true : _options$shadeClose,
				_options$animation = _options.animation, animation = _options$animation === void 0 ? 1 : _options$animation;
			var skinClass = skin ? '' + skin : 'default';
			currAnimation = animation;
			var btnTemp = '';
			btns.forEach(function(item, index) {
				if (index == 2) return;
				var btnClass = index == 0 ? 'confirm-btn' : 'cancel-btn';
				var temp = '<button class=\"btn ' + btnClass + '\">' + item + '</button>';
				btnTemp += temp
			});
			var html = '\n        <div class=\"dialog ' + animaArr[currAnimation][0] + '\">\n          <div class=\"title\">' + title + '</div> <div class=\"content\">' + content + '</div>\n          <div class=\"buttons\">' + btnTemp + '</div>\n        </div>';
            var op = document.createElement("div");
            op.className = 'dialog-wrapper fadeInD '+skinClass;
            op.innerHTML = html;
            document.body.appendChild(op);
			getNeedElement();
			bindEvent(confirm, cancel, shadeClose);
			return elem
		};
		var hide = function hide(index) {
			elem.classList.add('fadeOutD');
			dialog.classList.add('' + animaArr[currAnimation][1]);
			setTimeout(function() { elem.remove() }, 200)
		};
		var toast = function toast(options) {
            if (once == 0) {addstyle();once = 1;}
			if (options === void 0) { options = {} }
			var _options2 = options,
				_options2$content = _options2.content, content = _options2$content === void 0 ? '你好像忘记传content值了' : _options2$content,
				_options2$hidetime = _options2.hidetime, hidetime = _options2$hidetime === void 0 ? 2500 : _options2$hidetime,
				_options2$toasttop = _options2.toasttop, toasttop = _options2$toasttop === void 0 ? '50%' : _options2$toasttop,
				_options2$animation = _options2.animation, animation = _options2$animation === void 0 ? 1 : _options2$animation;
			currAnimation = animation;
			var html = '\n        <span class=\"toast-content ' + animaArr[currAnimation][0] + '\">' + content + '</span>';
			var op = document.createElement("div");
            op.className = 'toast-wrapper fadeInD';
            op.innerHTML = html;
            op.style.top = toasttop;
            document.body.appendChild(op);
			getNeedElement('toast');
			setTimeout(function() {
				toastelem.classList.add('fadeOutD');
				toastcont.classList.add('' + animaArr[currAnimation][1]);
				setTimeout(function() { toastelem.remove() }, 200)
			}, hidetime)
		};
		var bindEvent = function bindEvent(confirm, cancel, shadeClose) {
			confirmBtn && confirmBtn.addEventListener('click', function(e) {
				hide();
				confirm && confirm()
			});
			cancelBtn && cancelBtn.addEventListener('click', function(e) {
				hide();
				cancel && cancel()
			});
			if (shadeClose) {
				elem.addEventListener('click', function(e) {
					var target = e.target || e.srcElement;
					if (/dialog-wrapper/.test(target.className)) {
						hide()
					}
				})
			}
		};
		var addstyle = function addstyle() {
			var style = document.createElement('style'); 
            style.type = 'text/css'; 
            style.innerHTML = '.dialog-wrapper{position:fixed;display:flex;justify-content:center;align-items:center;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0, 0, 0, .5);color:#313131;font-size:10px;-webkit-tap-highlight-color:transparent;z-index:999999}' +
            '.dialog-wrapper.fadeInD{animation:fadeInD .5s ease}.dialog-wrapper.fadeOutD{animation:fadeOutD .2s ease forwards}.dialog-wrapper .dialog{position:relative;max-width:32em;width:85vw;border-radius:.4em;background-color:#fff;box-sizing:border-box;overflow:hidden;box-shadow:0 0 10px 1px rgba(0, 0, 0, .1)}' + 
            '.dialog-wrapper .dialog.slideDownD{animation:slideDownD .2s ease}.dialog-wrapper .dialog.slideUpD{animation:slideUpD .2s ease forwards}.dialog-wrapper .dialog.scaleInD{animation:scaleInD .2s cubic-bezier(.07, .89, .95, 1.4)}' + 
            '.dialog-wrapper .dialog.scaleOutD{animation:scaleOutD .2s cubic-bezier(.07, .89, .95, 1.4) forwards}.dialog-wrapper .btn{cursor:pointer;display:inline-block;flex:1;padding:15px;text-align:center;border:1px solid #ebebeb;background:#fff}' + 
            '.dialog-wrapper .close-btn{position:absolute;top:0;right:0;padding:10px;font-size:1.8em}.dialog-wrapper .title{font-size:1.8em;padding:15px;text-align:center;background-color:#f4f4f4}.dialog-wrapper .title:empty{display:none}.dialog-wrapper .content{padding:40px 20px;font-size:1.6em;text-align:center}' + 
            '.dialog-wrapper .buttons{display:flex;flex-direction:row;flex-wrap:wrap-reverse;justify-content:space-around;align-items:center;align-content:stretch}.dialog-wrapper .btn.confirm-btn{color:#287ff4}.dialog-wrapper .btn.cancel-btn{color:#313131}' + 
            '.toast-wrapper{position:fixed;left:0;top:50%;width:100%;text-align:center;z-index:9999}.toast-wrapper span{display:inline-block;max-width:370px;padding:10px 15px;color:#fff;border-radius:2px;font-size:12px;background:rgba(0, 0, 0, .6)}' + 
            '.toast-wrapper.fadeInD{animation:fadeInD .2s ease}.toast-wrapper.fadeOutD{animation:fadeOutD .2s ease forwards}.toast-wrapper .toast-content.scaleInD{animation:scaleInD .2s cubic-bezier(.07, .89, .95, 1.4)}' + 
            '.toast-wrapper .toast-content.scaleOutD{animation:scaleOutD .2s cubic-bezier(.07, .89, .95, 1.4) forwards}.toast-wrapper .toast-content.slideDownD{animation:slideDownD .2s ease}.toast-wrapper .toast-content.slideUpD{animation:slideUpD .2s ease forwards}' + 
            '@keyframes slideDownD{from{transform:translateY(-3em)}to{transform:translateY(0)}}@keyframes slideUpD{from{transform:translateY(0)}to{transform:translateY(-3em)}}@keyframes fadeInD{from{opacity:.5}to{opacity:1}}' + 
            '@keyframes fadeOutD{from{opacity:1}to{opacity:0}}@keyframes scaleInD{from{transform:scale(.8)}to{transform:scale(1)}}@keyframes scaleOutD{from{transform:scale(1)}to{transform:scale(.8)}}'; 
            document.getElementsByTagName('head').item(0).appendChild(style);
		}
		return {
			show: show,
			hide: hide,
			toast: toast
		}
	}(),
	loading: {
		show: function() {
			var LoadingHtml = '<div class="load-an-view"><div class="fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>';
            var box = document.createElement('div'),
            	_this = this;
	        box.className = 'load-view';
	        box.id = 'loadingDiv';
	        box.innerHTML = LoadingHtml;
	        this.box = box;
	        document.documentElement.appendChild(this.box);
        },
        hide: function() {
            document.documentElement.removeChild(document.getElementById('loadingDiv'));
        }
    }
}
_person.utils = {
    isMiniProgram: function(){//判断微信小程序
        if(_person.tools.browserVersions.weixin){
            try{
                wx.miniProgram.getEnv(function(res) {
                    if(res.miniprogram) {
                        console.log('在小程序里');
                        return true;
                    }else {
                        console.log('不在小程序里/在微信里');
                        return false;
                    }
                })
            }catch(e){
                _person.tools.dialog.show({content: e.message+',请引入jweixin-1.3.2.js'});
            }
        }else{
            console.log('不在微信里');
            return false;
        }
    },
	checkEmail: function(input){
		return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/i.test(input);
	},
	checkPhone: function(input){
		return /^1[34578]\d{9}$/i.test(input);
	},
	checkIdCard: function(input){
		return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/i.test(input);
	},
	isEmpty: function(input) {
		return input == null || input == '';
	},
	isNotEmpty: function(input) {
		return !this.isEmpty(input);
	}
}
_person.lib = {
	$Ajax:function(options, success, error){
		var ajaxOption = $.extend(true, options, {
			success: function(data) {
				if (data) {
					if (success) {
						success(data);
					}
				} else {
					_person.tools.dialog.show({
						content: data.msg ? data.msg : '系统繁忙，请稍后再试'
					});
				}
			},
			error: function(request, status, error) {
				if (error) {
					if (error) {
						error(data);
					}
				} else {
					_person.tools.dialog.show({content: '系统繁忙，请稍后再试'});
				}
			},
			cache: false,
			dataType: 'json'
        });
		if (ajaxOption.method) {
			ajaxOption.type = ajaxOption.method;
		}
		if (typeof ajaxOption.data === 'object' && ajaxOption.data !== null) {
			var dataLen = Object.keys(ajaxOption.data).length;
			dataLen > 0 && Object.keys(ajaxOption.data).forEach(function(propName, idx) {
				var prop = ajaxOption.data[propName], isEmpty = typeof prop === undefined || prop === '';
				if (isEmpty) {
					delete ajaxOption.data[propName];
				}
			});
		}
        $.ajax(ajaxOption);
	}
}
try {
    $(document).on("ajaxStart", function() {
        _person.tools.loading.show()
    });
    $(document).on("ajaxStop", function() {
        _person.tools.loading.hide()
    });
} catch (e) {}