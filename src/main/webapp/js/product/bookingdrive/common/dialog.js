var dialog = function() {
  // 节点类型
  var elem, toastelem, dialog, toastcont, cancelBtn, confirmBtn; // 动画函数数组

  var animaArr = new Array(['fadeIn', 'fadeOut'], ['slideDown', 'slideUp'], ['scaleIn', 'scaleOut']); // 当前动画类型

  var currAnimation = '';
  /**
   * @method getNeedElement 获取所需要的节点 
   */

  var getNeedElement = function getNeedElement(type) {
    // 一家人最重要是整整齐齐 
    if (type == 'toast') {
      toastelem = document.querySelector('.toast-wrapper');
      toastcont = toastelem.querySelector('.toast-content');
    } else {
      elem = document.querySelector('.dialog-wrapper');
      dialog = elem.querySelector('.dialog');
      cancelBtn = elem.querySelector('.cancel-btn');
      confirmBtn = elem.querySelector('.confirm-btn');
    }
  };
  /**
   * @method show 显示dialog组件
   * @param {Object} options 一系列参数
   * @returns {Object} 当前dialog节点 
   */


  var show = function show(options) {
    if (options === void 0) {
      options = {};
    }

    // 获取参数
    var _options = options,
      _options$title = _options.title,
      title = _options$title === void 0 ? '' : _options$title,
      _options$content = _options.content,
      content = _options$content === void 0 ? '你好像忘记传content值了' : _options$content,
      _options$skin = _options.skin,
      skin = _options$skin === void 0 ? '' : _options$skin,
      _options$btns = _options.btns,
      btns = _options$btns === void 0 ? ['确定'] : _options$btns,
      _options$confirm = _options.confirm,
      confirm = _options$confirm === void 0 ? null : _options$confirm,
      _options$cancel = _options.cancel,
      cancel = _options$cancel === void 0 ? null : _options$cancel,
      _options$shadeClose = _options.shadeClose,
      shadeClose = _options$shadeClose === void 0 ? true : _options$shadeClose,
      _options$animation = _options.animation,
      animation = _options$animation === void 0 ? 1 : _options$animation; // 皮肤类名 

    var skinClass = skin ? " " + skin : ''; // 给当前动画类型赋值

    currAnimation = animation; // 生成按钮 

    var btnTemp = '';
    btns.forEach(function(item, index) {
      if (index == 2) return;
      var btnClass = index == 0 ? 'confirm-btn' : 'cancel-btn';
      var temp = "<button class=\"btn " + btnClass + "\">" + item + "</button>";
      btnTemp += temp;
    }); // 最终生成的HTML 

    var html = "\n      <div class=\"dialog-wrapper fadeIn\">\n        <div class=\"dialog" + skinClass + " " + animaArr[currAnimation][0] + "\">\n          <div class=\"title\">" + title + "</div> <div class=\"content\">" + content + "</div>\n          <div class=\"buttons\">" + btnTemp + "</div>\n        </div>\n      </div> "; // 添加到Body 

    document.body.innerHTML += html; // 获取所需要的节点 

    getNeedElement(); // 绑定事件 

    bindEvent(confirm, cancel, shadeClose);
    return elem;
  };
  /**
   * @method hide 关闭dialog组件
   */


  var hide = function hide(index) {
    // 最外层执行显示动画(固定) 
    elem.classList.add('fadeOut'); // 内容层执行关闭动画

    dialog.classList.add("" + animaArr[currAnimation][1]); // 最终移除 

    setTimeout(function() {
      elem.remove();
    }, 200);
  };

  var toast = function toast(options) {
    if (options === void 0) {
      options = {};
    }

    var _options2 = options,
      _options2$content = _options2.content,
      content = _options2$content === void 0 ? '你好像忘记传content值了' : _options2$content,
      _options2$hidetime = _options2.hidetime,
      hidetime = _options2$hidetime === void 0 ? 2500 : _options2$hidetime,
      _options2$toasttop = _options2.toasttop,
      toasttop = _options2$toasttop === void 0 ? "50%" : _options2$toasttop,
      _options2$animation = _options2.animation,
      animation = _options2$animation === void 0 ? 1 : _options2$animation; // 给当前动画类型赋值

    currAnimation = animation; // 最终生成的HTML

    var html = "\n      <div class=\"toast-wrapper fadeIn\" style=\"top:" + toasttop + "\">\n        <span class=\"toast-content " + animaArr[currAnimation][0] + "\">" + content + "</span>\n      </div> "; // 添加到Body 

    document.body.innerHTML += html; // 获取所需要的节点 

    getNeedElement('toast');
    setTimeout(function() {
      //toastelem.remove();
      toastelem.classList.add('fadeOut');
      toastcont.classList.add("" + animaArr[currAnimation][1]);
      setTimeout(function() {
        toastelem.remove();
      }, 200);
    }, hidetime);
  };
  /**
   * @method bindEvent 给dialog绑定事件
   * @param {Object} confirm 确认回调
   * @param {Object} cancel 取消回调 
   */


  var bindEvent = function bindEvent(confirm, cancel, shadeClose) {
    // confirm按钮的回调
    confirmBtn && confirmBtn.addEventListener('click', function(e) {
      hide();
      confirm && confirm();
    }); // cancel按钮的回调 

    cancelBtn && cancelBtn.addEventListener('click', function(e) {
      hide();
      cancel && cancel();
    }); // 是否开启点击遮罩关闭

    if (shadeClose) {
      elem.addEventListener('click', function(e) {
        var target = e.target || e.srcElement;

        if (/dialog-wrapper/.test(target.className)) {
          hide();
        }
      });
    }
  }; // 对外暴露的方法


  return {
    show: show,
    hide: hide,
    toast: toast
  };
}();