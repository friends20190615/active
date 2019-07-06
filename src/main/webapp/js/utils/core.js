var _person = {
	version: "1.0",
    author: "jinying.jiang",
    website: "/"
}
_person.tools = {
	Dialog:{
	    containerId:'pop-box',
	    containerClass: 'pop-box-container active fadeIn',
	    toastClass: 'pop-toast-dialog fadeIn',
	    box: null,
	    textTemplate: {
	        title: '',
	        content: '提示内容',
	        okBtn: '好的',
	        cancelBtn: '取消',
	        contentColor: '#666666',
	        contentAlign:'al',
	        okBtnColor: '#F6B340',
	        promptTitle: '',
	        promptOkBtn: "确认",
	        hidetime:2500,
	        toasttop:"50%"
	    },
	    getAlertTemplate: function () {
	        var temp =
	            '<div class="pop-box-dialog">' +
	            '<div class="pop-box-content">' +
	            '<div class="pop-box-header">' +
	            '<span class="pop-box-close-btn">×</span>' +
	            '<span class="pop-box-title">' +
	            '<span >' + this.textTemplate.title + '</span>' +
	            '</span>' +
	            '</div>' +
	            '<div class="pop-box-text ' + this.textTemplate.contentAlign + '">' +
	            '<span style="color:' + this.textTemplate.contentColor + ';">' + this.textTemplate.content + '</span>' +
	            '</div>' +
	            '<div class="pop-box-footer">' +
	            '<button class="btn-footer btn-block-footer btn-footer-ok" style="color:' + this.textTemplate.okBtnColor + ';">' + this.textTemplate.okBtn + '</button>' +
	            '</div>' +
	            '</div>' +
	            '</div>';
	        return temp;
	    },
	    getConfirmTemplate: function () {
	        return '<div class="pop-box-dialog">' +
	            '<div class="pop-box-content">' +
	            '<div class="pop-box-header">' +
	            '<span class="pop-box-close-btn">×</span>' +
	            '<span class="pop-box-title">' +
	            '<span >' + this.textTemplate.title + '</span>' +
	            '</span>' +
	            '</div>' +
	            '<div class="pop-box-text ' + this.textTemplate.contentAlign + '">' +
	            '<span style="color:' + this.textTemplate.contentColor + ';">' + this.textTemplate.content + '?</span>' +
	            '</div>' +
	            '<div class="pop-box-footer">' +
	            '<button class="btn-footer btn-left-footer btn-footer-cancel" style="color:' + this.textTemplate.cancelBtnColor + ';">' + this.textTemplate.cancelBtn + '</button>' +
	            '<button class="btn-footer btn-right-footer btn-footer-ok"  style="color:' + this.textTemplate.okBtnColor + ';">' + this.textTemplate.okBtn + '</button>' +
	            '</div>' +
	            '</div>' +
	            '</div>';
	    },
	    getToastTemplate: function () {
	        return '<span>' + this.textTemplate.content + '</span>';
	    },
	    alert: function (opt) {
	        this.textTemplate.title = opt.title || this.textTemplate.title;
	        this.textTemplate.content = opt.content || this.textTemplate.content;
	        this.textTemplate.okBtn = opt.okBtn || this.textTemplate.okBtn;
	        this.textTemplate.okBtnColor = opt.okBtnColor || this.textTemplate.okBtnColor;
	        this.textTemplate.contentColor = opt.contentColor || this.textTemplate.contentColor;
	        this.textTemplate.contentAlign = opt.contentAlign || this.textTemplate.contentAlign;
	        var box = document.createElement("div"),
	            _this = this;
	        box.className = this.containerClass;
	        box.id = this.containerId;
	        box.innerHTML = this.getAlertTemplate();
	        this.box = box;
	        document.body.appendChild(this.box);
	        var btn = document.getElementsByClassName('btn-footer-ok');
	        btn[btn.length - 1].focus();
	        btn[btn.length - 1].onclick = function () {
	            if (opt.onConfirm) {
	                opt.onConfirm();
	            }
	            _this.removeBox();
	        }
	    },
	    confirm: function (opt) {
	        this.textTemplate.title = opt.title || this.textTemplate.promptTitle;
	        this.textTemplate.promptPlaceholder = opt.promptPlaceholder || this.textTemplate.promptPlaceholder;
	        this.textTemplate.okBtn = opt.okBtn || this.textTemplate.promptOkBtn;
	        this.textTemplate.okBtnColor = opt.okBtnColor || this.textTemplate.okBtnColor;
	        this.textTemplate.cancelBtn = opt.cancelBtn || this.textTemplate.cancelBtn;
	        this.textTemplate.contentColor = opt.contentColor || this.textTemplate.contentColor;
	        this.textTemplate.contentAlign = opt.contentAlign || this.textTemplate.contentAlign;
	        this.textTemplate.cancelBtnColor = opt.cancelBtnColor || this.textTemplate.cancelBtnColor;
	        this.textTemplate.content = opt.content || this.textTemplate.content;
	        var box = document.createElement("div"),
	            _this = this;
	        this.box = box;
	        box.className = this.containerClass;
	        box.id = this.containerId;
	        box.innerHTML = this.getConfirmTemplate();
	        document.body.appendChild(box);
	        var okBtn = document.getElementsByClassName('btn-footer-ok');
	        okBtn[okBtn.length - 1].focus();
	        okBtn[okBtn.length - 1].onclick = function () {
	            if (opt.onConfirm) {
	                opt.onConfirm();
	            }
	            _this.removeBox();
	        }
	        var cancelBtn = document.getElementsByClassName('btn-footer-cancel');
	        cancelBtn[cancelBtn.length - 1].onclick = function () {
	            if (opt.onCancel) {
	                opt.onCancel();
	            }
	            _this.removeBox();
	        }
	    },
	    toast: function (opt){
	        this.textTemplate.content = opt.content || this.textTemplate.content;
	        this.textTemplate.hidetime = opt.hidetime || this.textTemplate.hidetime;
	        this.textTemplate.toasttop = opt.toasttop || this.textTemplate.toasttop;
	        var box = document.createElement("div"),
	            _this = this;
	        this.box = box;
	        box.className = this.toastClass;
	        box.id = this.containerId;
	        box.style.top = this.textTemplate.toasttop;
	        box.innerHTML = this.getToastTemplate();
	        document.body.appendChild(box);
	        setTimeout(function(){
	            _this.removeBox();
	        },this.textTemplate.hidetime);
	    },
	    colse: function () {
	        this.removeBox();
	    },
	    removeBox: function () {
	        var box = document.getElementById("pop-box");
	        var classVal = document.getElementById("pop-box").getAttribute("class");
	        classVal = classVal.replace("fadeIn","fadeOut");
	        document.getElementById("pop-box").setAttribute("class",classVal);
	        setTimeout(function(){
	            document.body.removeChild(box);
	        },900);
	    }
	},
    loading: {
		show: function() {
            var LoadingHtml = '<div class="load-view" id="loadingDiv"><div class="load-an-view"><div class="fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div></div>';
			document.write(LoadingHtml);
        },
        hide: function() {
            document.getElementById("loadingDiv").style.display="none";
        }
    },
    getUrlParam : function(key) {
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
    checkTel: function(moblie){
		if (null === moblie || "" === moblie || moblie.length === 0 || moblie==='请输入手机号') {
            //zuche.uitls.show("手机号不能为空");
            return false;
        };
        if(!this.mobileValidate(moblie) ){
            //zuche.uitls.show("手机号格式错误");
            return false;
        }else{
            return true;
        };
	},
	hideMobile: function(mobile) {
		if(mobile){
            mobile = mobile.toString();
    		mobile = mobile.substr(0,3)+"************"+mobile.substr(7,4);
    	};
    	return mobile;
	},
    setStorage: function(key, value) {
        try {
            zuche.uitls.canStorage() && (localStorage.removeItem(key),
            "string" != typeof value && (value = JSON.stringify(value)),
                localStorage.setItem(key, value))
        } catch (e) {}
    },
    getStorage: function(key) {
        if (zuche.uitls.canStorage()) {
            var value = localStorage.getItem(key);
            value && "string" == typeof value && "undefined" === value && (value = null);
            try {
                return value ? JSON.parse(value) : null
            } catch (err) {
                return value
            }
        }
    },
    removeStorage: function(key) {
        zuche.uitls.canStorage() && localStorage.removeItem(key)
    }
}