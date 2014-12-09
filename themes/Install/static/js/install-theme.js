/* ========================================================================
 * bootstrap-switch - v3.0.2
 * http://www.bootstrap-switch.org
 * ========================================================================
 * Copyright 2012-2013 Mattia Larentis
 *
 * ========================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function() {
  var __slice = [].slice;

  (function($, window) {
    "use strict";
    var BootstrapSwitch;
    BootstrapSwitch = (function() {
      function BootstrapSwitch(element, options) {
        if (options == null) {
          options = {};
        }
        this.$element = $(element);
        this.options = $.extend({}, $.fn.bootstrapSwitch.defaults, {
          state: this.$element.is(":checked"),
          size: this.$element.data("size"),
          animate: this.$element.data("animate"),
          disabled: this.$element.is(":disabled"),
          readonly: this.$element.is("[readonly]"),
          indeterminate: this.$element.data("indeterminate"),
          onColor: this.$element.data("on-color"),
          offColor: this.$element.data("off-color"),
          onText: this.$element.data("on-text"),
          offText: this.$element.data("off-text"),
          labelText: this.$element.data("label-text"),
          baseClass: this.$element.data("base-class"),
          wrapperClass: this.$element.data("wrapper-class"),
          radioAllOff: this.$element.data("radio-all-off")
        }, options);
        this.$wrapper = $("<div>", {
          "class": (function(_this) {
            return function() {
              var classes;
              classes = ["" + _this.options.baseClass].concat(_this._getClasses(_this.options.wrapperClass));
              classes.push(_this.options.state ? "" + _this.options.baseClass + "-on" : "" + _this.options.baseClass + "-off");
              if (_this.options.size != null) {
                classes.push("" + _this.options.baseClass + "-" + _this.options.size);
              }
              if (_this.options.animate) {
                classes.push("" + _this.options.baseClass + "-animate");
              }
              if (_this.options.disabled) {
                classes.push("" + _this.options.baseClass + "-disabled");
              }
              if (_this.options.readonly) {
                classes.push("" + _this.options.baseClass + "-readonly");
              }
              if (_this.options.indeterminate) {
                classes.push("" + _this.options.baseClass + "-indeterminate");
              }
              if (_this.$element.attr("id")) {
                classes.push("" + _this.options.baseClass + "-id-" + (_this.$element.attr("id")));
              }
              return classes.join(" ");
            };
          })(this)()
        });
        this.$container = $("<div>", {
          "class": "" + this.options.baseClass + "-container"
        });
        this.$on = $("<span>", {
          html: this.options.onText,
          "class": "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor
        });
        this.$off = $("<span>", {
          html: this.options.offText,
          "class": "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor
        });
        this.$label = $("<label>", {
          html: this.options.labelText,
          "class": "" + this.options.baseClass + "-label"
        });
        if (this.options.indeterminate) {
          this.$element.prop("indeterminate", true);
        }
        this.$element.on("init.bootstrapSwitch", (function(_this) {
          return function() {
            return _this.options.onInit.apply(element, arguments);
          };
        })(this));
        this.$element.on("switchChange.bootstrapSwitch", (function(_this) {
          return function() {
            return _this.options.onSwitchChange.apply(element, arguments);
          };
        })(this));
        this.$container = this.$element.wrap(this.$container).parent();
        this.$wrapper = this.$container.wrap(this.$wrapper).parent();
        this.$element.before(this.$on).before(this.$label).before(this.$off).trigger("init.bootstrapSwitch");
        this._elementHandlers();
        this._handleHandlers();
        this._labelHandlers();
        this._formHandler();
      }

      BootstrapSwitch.prototype._constructor = BootstrapSwitch;

      BootstrapSwitch.prototype.state = function(value, skip) {
        if (typeof value === "undefined") {
          return this.options.state;
        }
        if (this.options.disabled || this.options.readonly || this.options.indeterminate) {
          return this.$element;
        }
        if (this.options.state && !this.options.radioAllOff && this.$element.is(':radio')) {
          return this.$element;
        }
        value = !!value;
        this.$element.prop("checked", value).trigger("change.bootstrapSwitch", skip);
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleState = function(skip) {
        if (this.options.disabled || this.options.readonly || this.options.indeterminate) {
          return this.$element;
        }
        return this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", skip);
      };

      BootstrapSwitch.prototype.size = function(value) {
        if (typeof value === "undefined") {
          return this.options.size;
        }
        if (this.options.size != null) {
          this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size);
        }
        if (value) {
          this.$wrapper.addClass("" + this.options.baseClass + "-" + value);
        }
        this.options.size = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.animate = function(value) {
        if (typeof value === "undefined") {
          return this.options.animate;
        }
        value = !!value;
        this.$wrapper[value ? "addClass" : "removeClass"]("" + this.options.baseClass + "-animate");
        this.options.animate = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.disabled = function(value) {
        if (typeof value === "undefined") {
          return this.options.disabled;
        }
        value = !!value;
        this.$wrapper[value ? "addClass" : "removeClass"]("" + this.options.baseClass + "-disabled");
        this.$element.prop("disabled", value);
        this.options.disabled = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleDisabled = function() {
        this.$element.prop("disabled", !this.options.disabled);
        this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled");
        this.options.disabled = !this.options.disabled;
        return this.$element;
      };

      BootstrapSwitch.prototype.readonly = function(value) {
        if (typeof value === "undefined") {
          return this.options.readonly;
        }
        value = !!value;
        this.$wrapper[value ? "addClass" : "removeClass"]("" + this.options.baseClass + "-readonly");
        this.$element.prop("readonly", value);
        this.options.readonly = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleReadonly = function() {
        this.$element.prop("readonly", !this.options.readonly);
        this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly");
        this.options.readonly = !this.options.readonly;
        return this.$element;
      };

      BootstrapSwitch.prototype.indeterminate = function(value) {
        if (typeof value === "undefined") {
          return this.options.indeterminate;
        }
        value = !!value;
        this.$wrapper[value ? "addClass" : "removeClass"]("" + this.options.baseClass + "-indeterminate");
        this.$element.prop("indeterminate", value);
        this.options.indeterminate = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.toggleIndeterminate = function() {
        this.$element.prop("indeterminate", !this.options.indeterminate);
        this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate");
        this.options.indeterminate = !this.options.indeterminate;
        return this.$element;
      };

      BootstrapSwitch.prototype.onColor = function(value) {
        var color;
        color = this.options.onColor;
        if (typeof value === "undefined") {
          return color;
        }
        if (color != null) {
          this.$on.removeClass("" + this.options.baseClass + "-" + color);
        }
        this.$on.addClass("" + this.options.baseClass + "-" + value);
        this.options.onColor = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.offColor = function(value) {
        var color;
        color = this.options.offColor;
        if (typeof value === "undefined") {
          return color;
        }
        if (color != null) {
          this.$off.removeClass("" + this.options.baseClass + "-" + color);
        }
        this.$off.addClass("" + this.options.baseClass + "-" + value);
        this.options.offColor = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.onText = function(value) {
        if (typeof value === "undefined") {
          return this.options.onText;
        }
        this.$on.html(value);
        this.options.onText = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.offText = function(value) {
        if (typeof value === "undefined") {
          return this.options.offText;
        }
        this.$off.html(value);
        this.options.offText = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.labelText = function(value) {
        if (typeof value === "undefined") {
          return this.options.labelText;
        }
        this.$label.html(value);
        this.options.labelText = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.baseClass = function(value) {
        return this.options.baseClass;
      };

      BootstrapSwitch.prototype.wrapperClass = function(value) {
        if (typeof value === "undefined") {
          return this.options.wrapperClass;
        }
        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.wrapperClass;
        }
        this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" "));
        this.$wrapper.addClass(this._getClasses(value).join(" "));
        this.options.wrapperClass = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.radioAllOff = function(value) {
        if (typeof value === "undefined") {
          return this.options.radioAllOff;
        }
        this.options.radioAllOff = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.onInit = function(value) {
        if (typeof value === "undefined") {
          return this.options.onInit;
        }
        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.onInit;
        }
        this.options.onInit = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.onSwitchChange = function(value) {
        if (typeof value === "undefined") {
          return this.options.onSwitchChange;
        }
        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.onSwitchChange;
        }
        this.options.onSwitchChange = value;
        return this.$element;
      };

      BootstrapSwitch.prototype.destroy = function() {
        var $form;
        $form = this.$element.closest("form");
        if ($form.length) {
          $form.off("reset.bootstrapSwitch").removeData("bootstrap-switch");
        }
        this.$container.children().not(this.$element).remove();
        this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch");
        return this.$element;
      };

      BootstrapSwitch.prototype._elementHandlers = function() {
        return this.$element.on({
          "change.bootstrapSwitch": (function(_this) {
            return function(e, skip) {
              var checked;
              e.preventDefault();
              e.stopImmediatePropagation();
              checked = _this.$element.is(":checked");
              if (checked === _this.options.state) {
                return;
              }
              _this.options.state = checked;
              _this.$wrapper.removeClass(checked ? "" + _this.options.baseClass + "-off" : "" + _this.options.baseClass + "-on").addClass(checked ? "" + _this.options.baseClass + "-on" : "" + _this.options.baseClass + "-off");
              if (!skip) {
                if (_this.$element.is(":radio")) {
                  $("[name='" + (_this.$element.attr('name')) + "']").not(_this.$element).prop("checked", false).trigger("change.bootstrapSwitch", true);
                }
                return _this.$element.trigger("switchChange.bootstrapSwitch", [checked]);
              }
            };
          })(this),
          "focus.bootstrapSwitch": (function(_this) {
            return function(e) {
              e.preventDefault();
              return _this.$wrapper.addClass("" + _this.options.baseClass + "-focused");
            };
          })(this),
          "blur.bootstrapSwitch": (function(_this) {
            return function(e) {
              e.preventDefault();
              return _this.$wrapper.removeClass("" + _this.options.baseClass + "-focused");
            };
          })(this),
          "keydown.bootstrapSwitch": (function(_this) {
            return function(e) {
              if (!e.which || _this.options.disabled || _this.options.readonly || _this.options.indeterminate) {
                return;
              }
              switch (e.which) {
                case 37:
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  return _this.state(false);
                case 39:
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  return _this.state(true);
              }
            };
          })(this)
        });
      };

      BootstrapSwitch.prototype._handleHandlers = function() {
        this.$on.on("click.bootstrapSwitch", (function(_this) {
          return function(e) {
            _this.state(false);
            return _this.$element.trigger("focus.bootstrapSwitch");
          };
        })(this));
        return this.$off.on("click.bootstrapSwitch", (function(_this) {
          return function(e) {
            _this.state(true);
            return _this.$element.trigger("focus.bootstrapSwitch");
          };
        })(this));
      };

      BootstrapSwitch.prototype._labelHandlers = function() {
        return this.$label.on({
          "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": (function(_this) {
            return function(e) {
              var left, pageX, percent, right;
              if (!_this.isLabelDragging) {
                return;
              }
              e.preventDefault();
              _this.isLabelDragged = true;
              pageX = e.pageX || e.originalEvent.touches[0].pageX;
              percent = ((pageX - _this.$wrapper.offset().left) / _this.$wrapper.width()) * 100;
              left = 25;
              right = 75;
              if (_this.options.animate) {
                _this.$wrapper.removeClass("" + _this.options.baseClass + "-animate");
              }
              if (percent < left) {
                percent = left;
              } else if (percent > right) {
                percent = right;
              }
              _this.$container.css("margin-left", "" + (percent - right) + "%");
              return _this.$element.trigger("focus.bootstrapSwitch");
            };
          })(this),
          "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": (function(_this) {
            return function(e) {
              if (_this.isLabelDragging || _this.options.disabled || _this.options.readonly || _this.options.indeterminate) {
                return;
              }
              e.preventDefault();
              _this.isLabelDragging = true;
              return _this.$element.trigger("focus.bootstrapSwitch");
            };
          })(this),
          "mouseup.bootstrapSwitch touchend.bootstrapSwitch": (function(_this) {
            return function(e) {
              if (!_this.isLabelDragging) {
                return;
              }
              e.preventDefault();
              if (_this.isLabelDragged) {
                _this.isLabelDragged = false;
                _this.state(parseInt(_this.$container.css("margin-left"), 10) > -(_this.$container.width() / 6));
                if (_this.options.animate) {
                  _this.$wrapper.addClass("" + _this.options.baseClass + "-animate");
                }
                _this.$container.css("margin-left", "");
              } else {
                _this.state(!_this.options.state);
              }
              return _this.isLabelDragging = false;
            };
          })(this),
          "mouseleave.bootstrapSwitch": (function(_this) {
            return function(e) {
              return _this.$label.trigger("mouseup.bootstrapSwitch");
            };
          })(this)
        });
      };

      BootstrapSwitch.prototype._formHandler = function() {
        var $form;
        $form = this.$element.closest("form");
        if ($form.data("bootstrap-switch")) {
          return;
        }
        return $form.on("reset.bootstrapSwitch", function() {
          return window.setTimeout(function() {
            return $form.find("input").filter(function() {
              return $(this).data("bootstrap-switch");
            }).each(function() {
              return $(this).bootstrapSwitch("state", this.checked);
            });
          }, 1);
        }).data("bootstrap-switch", true);
      };

      BootstrapSwitch.prototype._getClasses = function(classes) {
        var c, cls, _i, _len;
        if (!$.isArray(classes)) {
          return ["" + this.options.baseClass + "-" + classes];
        }
        cls = [];
        for (_i = 0, _len = classes.length; _i < _len; _i++) {
          c = classes[_i];
          cls.push("" + this.options.baseClass + "-" + c);
        }
        return cls;
      };

      return BootstrapSwitch;

    })();
    $.fn.bootstrapSwitch = function() {
      var args, option, ret;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ret = this;
      this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data("bootstrap-switch");
        if (!data) {
          $this.data("bootstrap-switch", data = new BootstrapSwitch(this, option));
        }
        if (typeof option === "string") {
          return ret = data[option].apply(data, args);
        }
      });
      return ret;
    };
    $.fn.bootstrapSwitch.Constructor = BootstrapSwitch;
    return $.fn.bootstrapSwitch.defaults = {
      state: true,
      size: null,
      animate: true,
      disabled: false,
      readonly: false,
      indeterminate: false,
      onColor: "primary",
      offColor: "default",
      onText: "ON",
      offText: "OFF",
      labelText: "&nbsp;",
      baseClass: "bootstrap-switch",
      wrapperClass: "wrapper",
      radioAllOff: false,
      onInit: function() {},
      onSwitchChange: function() {}
    };
  })(window.jQuery, window);

}).call(this);
;/*! UIkit 2.13.1 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
!function(t){if("function"==typeof define&&define.amd&&define("uikit",function(){var i=t(window,window.jQuery,window.document);return i.load=function(t,e,n,o){var s,a=t.split(","),r=[],l=(o.config&&o.config.uikit&&o.config.uikit.base?o.config.uikit.base:"").replace(/\/+$/g,"");if(!l)throw new Error("Please define base path to UIkit in the requirejs config.");for(s=0;s<a.length;s+=1){var c=a[s].replace(/\./g,"/");r.push(l+"/components/"+c)}e(r,function(){n(i)})},i}),!window.jQuery)throw new Error("UIkit requires jQuery");window&&window.jQuery&&t(window,window.jQuery,window.document)}(function(t,i,e){"use strict";var n={},o=window.UIkit;if(n.version="2.13.1",n._prefix="uk",n.noConflict=function(t){return o&&(window.UIkit=o,i.UIkit=o,i.fn.uk=o.fn),n._prefix=t,n},n.prefix=function(t){return"string"==typeof t?t.replace(/@/g,n._prefix):t},n.$=function(){arguments[0]&&"string"==typeof arguments[0]&&(arguments[0]=n.prefix(arguments[0]));var t,e=i.apply(i,arguments);return e.length?(["find","filter","closest","attr","parent","parents","children","addClass","removeClass","toggleClass","hasClass","is","on","one"].forEach(function(i){var o,s=e[i],a=["find","filter","parent","parents","children","closest"];return e[i]=function(){for(t=0;t<arguments.length;t++)"string"==typeof arguments[t]&&(arguments[t]=n.prefix(arguments[t]));return o=s.apply(this,arguments),a.indexOf(i)>-1?n.$(o):o},e}),e):e},n.$doc=n.$(document),n.$win=n.$(window),n.$html=n.$("html"),n.fn=function(t,e){var o=arguments,s=t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),a=s[1],r=s[2];return n[a]?this.each(function(){var t=i(this),s=t.data(a);s||t.data(a,s=n[a](this,r?void 0:e)),r&&s[r].apply(s,Array.prototype.slice.call(o,1))}):(i.error("UIkit component ["+a+"] does not exist."),this)},n.support={},n.support.transition=function(){var t=function(){var t,i=e.body||e.documentElement,n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(t in n)if(void 0!==i.style[t])return n[t]}();return t&&{end:t}}(),n.support.animation=function(){var t=function(){var t,i=e.body||e.documentElement,n={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(t in n)if(void 0!==i.style[t])return n[t]}();return t&&{end:t}}(),n.support.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},n.support.touch="ontouchstart"in window&&navigator.userAgent.toLowerCase().match(/mobile|tablet/)||t.DocumentTouch&&document instanceof t.DocumentTouch||t.navigator.msPointerEnabled&&t.navigator.msMaxTouchPoints>0||t.navigator.pointerEnabled&&t.navigator.maxTouchPoints>0||!1,n.support.mutationobserver=t.MutationObserver||t.WebKitMutationObserver||null,n.Utils={},n.Utils.str2json=function(t){return t.replace(/([\$\w]+)\s*:/g,function(t,i){return'"'+i+'":'}).replace(/'([^']+)'/g,function(t,i){return'"'+i+'"'})},n.Utils.debounce=function(t,i,e){var n;return function(){var o=this,s=arguments,a=function(){n=null,e||t.apply(o,s)},r=e&&!n;clearTimeout(n),n=setTimeout(a,i),r&&t.apply(o,s)}},n.Utils.removeCssRules=function(t){var i,e,n,o,s,a,r,l,c,h;t&&setTimeout(function(){try{for(h=document.styleSheets,o=0,r=h.length;r>o;o++){for(n=h[o],e=[],n.cssRules=n.cssRules,i=s=0,l=n.cssRules.length;l>s;i=++s)n.cssRules[i].type===CSSRule.STYLE_RULE&&t.test(n.cssRules[i].selectorText)&&e.unshift(i);for(a=0,c=e.length;c>a;a++)n.deleteRule(e[a])}}catch(u){}},0)},n.Utils.isInView=function(t,e){var o=i(t);if(!o.is(":visible"))return!1;var s=n.$win.scrollLeft(),a=n.$win.scrollTop(),r=o.offset(),l=r.left,c=r.top;return e=i.extend({topoffset:0,leftoffset:0},e),c+o.height()>=a&&c-e.topoffset<=a+n.$win.height()&&l+o.width()>=s&&l-e.leftoffset<=s+n.$win.width()?!0:!1},n.Utils.checkDisplay=function(t,e){var o=n.$("[data-@-margin], [data-@-grid-match], [data-@-grid-margin], [data-@-check-display]",t||document);return t&&!o.length&&(o=i(t)),o.trigger("display.uk.check"),e&&("string"!=typeof e&&(e=n.prefix('[class*="@-animation-"]')),o.find(e).each(function(){var t=n.$(this),i=t.attr("class"),e=i.match(/uk\-animation\-(.+)/);t.removeClass(e[0]).width(),t.addClass(e[0])})),o},n.Utils.options=function(t){if(i.isPlainObject(t))return t;var e=t?t.indexOf("{"):-1,o={};if(-1!=e)try{o=JSON.parse(n.Utils.str2json(t.substr(e)))}catch(s){}return o},n.Utils.animate=function(t,e){var o=i.Deferred();return t=n.$(t),e=n.prefix(e),t.css("display","none").addClass(e).one(n.support.animation.end,function(){t.removeClass(e),o.resolve()}).width(),t.css("display",""),o.promise()},n.Utils.uid=function(t){return(t||"id")+(new Date).getTime()+"RAND"+Math.ceil(1e5*Math.random())},n.Utils.template=function(t,i){for(var e,n,o,s,a=t.replace(/\n/g,"\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g,"{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),r=0,l=[],c=0;r<a.length;){if(e=a[r],e.match(/\{\{\s*(.+?)\s*\}\}/))switch(r+=1,e=a[r],n=e[0],o=e.substring(e.match(/^(\^|\#|\!|\~|\:)/)?1:0),n){case"~":l.push("for(var $i=0;$i<"+o+".length;$i++) { var $item = "+o+"[$i];"),c++;break;case":":l.push("for(var $key in "+o+") { var $val = "+o+"[$key];"),c++;break;case"#":l.push("if("+o+") {"),c++;break;case"^":l.push("if(!"+o+") {"),c++;break;case"/":l.push("}"),c--;break;case"!":l.push("__ret.push("+o+");");break;default:l.push("__ret.push(escape("+o+"));")}else l.push("__ret.push('"+e.replace(/\'/g,"\\'")+"');");r+=1}return s=new Function("$data",["var __ret = [];","try {","with($data){",c?'__ret = ["Not all blocks are closed correctly."]':l.join(""),"};","}catch(e){__ret = [e.message];}",'return __ret.join("").replace(/\\n\\n/g, "\\n");',"function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n")),i?s(i):s},n.Utils.events={},n.Utils.events.click=n.support.touch?"tap":"click",window.UIkit=n,i.UIkit=n,i.fn.uk=n.fn,n.langdirection="rtl"==n.$html.attr("dir")?"right":"left",n.components={},n.component=function(t,e){var o=function(e,s){var a=this;return this.UIkit=n,this.element=e?n.$(e):null,this.options=i.extend(!0,{},this.defaults,s),this.plugins={},this.element&&this.element.data(t,this),this.init(),(this.options.plugins.length?this.options.plugins:Object.keys(o.plugins)).forEach(function(t){o.plugins[t].init&&(o.plugins[t].init(a),a.plugins[t]=!0)}),this.trigger("init.uk.component",[t,this]),this};return o.plugins={},i.extend(!0,o.prototype,{defaults:{plugins:[]},boot:function(){},init:function(){},on:function(t,i,e){return n.$(this.element||this).on(t,i,e)},one:function(t,i,e){return n.$(this.element||this).one(t,i,e)},off:function(t){return n.$(this.element||this).off(t)},trigger:function(t,i){return n.$(this.element||this).trigger(t,i)},find:function(t){return n.$(this.element?this.element:[]).find(t)},proxy:function(t,i){var e=this;i.split(" ").forEach(function(i){e[i]||(e[i]=function(){return t[i].apply(t,arguments)})})},mixin:function(t,i){var e=this;i.split(" ").forEach(function(i){e[i]||(e[i]=t[i].bind(e))})}},e),this.components[t]=o,this[t]=function(){var e,o;if(arguments.length)switch(arguments.length){case 1:"string"==typeof arguments[0]||arguments[0].nodeType||arguments[0]instanceof jQuery?e=i(arguments[0]):o=arguments[0];break;case 2:e=i(arguments[0]),o=arguments[1]}return e&&e.data(t)?e.data(t):new n.components[t](e,o)},n.domready&&n.component.boot(t),o},n.plugin=function(t,i,e){this.components[t].plugins[i]=e},n.component.boot=function(t){n.components[t].prototype&&n.components[t].prototype.boot&&!n.components[t].booted&&(n.components[t].prototype.boot.apply(n,[]),n.components[t].booted=!0)},n.component.bootComponents=function(){for(var t in n.components)n.component.boot(t)},n.domObservers=[],n.domready=!1,n.ready=function(t){n.domObservers.push(t),n.domready&&t(document)},n.on=function(t,i,e){return t&&t.indexOf("ready.uk.dom")>-1&&n.domready&&i.apply(n.$doc),n.$doc.on(t,i,e)},n.one=function(t,i,e){return t&&t.indexOf("ready.uk.dom")>-1&&n.domready?(i.apply(n.$doc),n.$doc):n.$doc.one(t,i,e)},n.trigger=function(t,i){return n.$doc.trigger(t,i)},n.domObserve=function(t,i){n.support.mutationobserver&&(i=i||function(){},n.$(t).each(function(){var t=this,i=n.$(t);if(!i.data("observer"))try{var e=new n.support.mutationobserver(n.Utils.debounce(function(){i.trigger("changed.uk.dom")},50));e.observe(t,{childList:!0,subtree:!0}),i.data("observer",e)}catch(o){}}))},i(function(){n.$body=n.$("body"),n.ready(function(t){n.domObserve("[data-@-observe]",t||document)}),n.on("ready.uk.dom",function(){n.domObservers.forEach(function(t){t(document)}),n.domready&&n.Utils.checkDisplay(document)}),n.on("changed.uk.dom",function(t){var i=t.target;n.domObservers.forEach(function(t){t(i)}),n.Utils.checkDisplay(i)}),n.trigger("beforeready.uk.dom"),n.component.bootComponents(),setInterval(function(){var t,i={x:window.pageXOffset,y:window.pageYOffset},e=function(){(i.x!=window.pageXOffset||i.y!=window.pageYOffset)&&(t={x:0,y:0},window.pageXOffset!=i.x&&(t.x=window.pageXOffset>i.x?1:-1),window.pageYOffset!=i.y&&(t.y=window.pageYOffset>i.y?1:-1),i={dir:t,x:window.pageXOffset,y:window.pageYOffset},n.$doc.trigger("scrolling.uk.document",[i]))};return n.support.touch&&n.$html.on("touchmove touchend MSPointerMove MSPointerUp pointermove pointerup",e),(i.x||i.y)&&e(),e}(),15),n.trigger("ready.uk.dom"),n.support.touch&&navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&n.$win.on("load orientationchange resize",n.Utils.debounce(function(){var t=function(){return i(n.prefix(".@-height-viewport")).css("height",window.innerHeight),t};return t()}(),100)),n.trigger("afterready.uk.dom"),n.domready=!0}),n.$html.addClass(n.support.touch?"@-touch":"@-notouch"),n.support.touch){var s,a=!1,r=".@-overlay, .@-overlay-toggle, .@-caption-toggle, .@-animation-hover, .@-has-hover";n.$html.on("touchstart MSPointerDown pointerdown",r,function(){a&&n.$(".@-hover").removeClass("@-hover"),a=n.$(this).addClass("@-hover")}).on("touchend MSPointerUp pointerup",function(t){s=n.$(t.target).parents(r),a&&a.not(s).removeClass("@-hover")})}return n}),function(t){function i(t,i,e,n){return Math.abs(t-i)>=Math.abs(e-n)?t-i>0?"Left":"Right":e-n>0?"Up":"Down"}function e(){c=null,u.last&&(u.el.trigger("longTap"),u={})}function n(){c&&clearTimeout(c),c=null}function o(){a&&clearTimeout(a),r&&clearTimeout(r),l&&clearTimeout(l),c&&clearTimeout(c),a=r=l=c=null,u={}}function s(t){return t.pointerType==t.MSPOINTER_TYPE_TOUCH&&t.isPrimary}if(!t.fn.swipeLeft){var a,r,l,c,h,u={},d=750;t(function(){var f,p,g,m=0,v=0;"MSGesture"in window&&(h=new MSGesture,h.target=document.body),t(document).on("MSGestureEnd gestureend",function(t){var i=t.originalEvent.velocityX>1?"Right":t.originalEvent.velocityX<-1?"Left":t.originalEvent.velocityY>1?"Down":t.originalEvent.velocityY<-1?"Up":null;i&&(u.el.trigger("swipe"),u.el.trigger("swipe"+i))}).on("touchstart MSPointerDown pointerdown",function(i){("MSPointerDown"!=i.type||s(i.originalEvent))&&(g="MSPointerDown"==i.type||"pointerdown"==i.type?i:i.originalEvent.touches[0],f=Date.now(),p=f-(u.last||f),u.el=t("tagName"in g.target?g.target:g.target.parentNode),a&&clearTimeout(a),u.x1=g.pageX,u.y1=g.pageY,p>0&&250>=p&&(u.isDoubleTap=!0),u.last=f,c=setTimeout(e,d),!h||"MSPointerDown"!=i.type&&"pointerdown"!=i.type&&"touchstart"!=i.type||h.addPointer(i.originalEvent.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){("MSPointerMove"!=t.type||s(t.originalEvent))&&(g="MSPointerMove"==t.type||"pointermove"==t.type?t:t.originalEvent.touches[0],n(),u.x2=g.pageX,u.y2=g.pageY,m+=Math.abs(u.x1-u.x2),v+=Math.abs(u.y1-u.y2))}).on("touchend MSPointerUp pointerup",function(e){("MSPointerUp"!=e.type||s(e.originalEvent))&&(n(),u.x2&&Math.abs(u.x1-u.x2)>30||u.y2&&Math.abs(u.y1-u.y2)>30?l=setTimeout(function(){u.el.trigger("swipe"),u.el.trigger("swipe"+i(u.x1,u.x2,u.y1,u.y2)),u={}},0):"last"in u&&(isNaN(m)||30>m&&30>v?r=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=o,u.el.trigger(i),u.isDoubleTap?(u.el.trigger("doubleTap"),u={}):a=setTimeout(function(){a=null,u.el.trigger("singleTap"),u={}},250)},0):u={},m=v=0))}).on("touchcancel MSPointerCancel",o),t(window).on("scroll",o)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(i){t.fn[i]=function(e){return t(this).on(i,e)}})}}(jQuery),function(t,i){"use strict";var e=[];i.component("stackMargin",{defaults:{cls:"@-margin-small-top"},boot:function(){i.ready(function(t){i.$("[data-@-margin]",t).each(function(){var t,e=i.$(this);e.data("stackMargin")||(t=i.stackMargin(e,i.Utils.options(e.attr("data-@-margin"))))})})},init:function(){var n=this;this.columns=this.element.children(),this.columns.length&&(i.$win.on("resize orientationchange",function(){var e=function(){n.process()};return t(function(){e(),i.$win.on("load",e)}),i.Utils.debounce(e,20)}()),i.$html.on("changed.uk.dom",function(){n.columns=n.element.children(),n.process()}),this.on("display.uk.check",function(){n.columns=n.element.children(),this.element.is(":visible")&&this.process()}.bind(this)),e.push(this))},process:function(){var t=this;this.revert();var e=!1,n=this.columns.filter(":visible:first"),o=n.length?n.position().top+n.outerHeight()-1:!1;if(o!==!1)return this.columns.each(function(){var n=i.$(this);n.is(":visible")&&(e?n.addClass(t.options.cls):n.position().top>=o&&(e=n.addClass(t.options.cls)))}),this},revert:function(){return this.columns.removeClass(this.options.cls),this}})}(jQuery,UIkit),function(t,i){"use strict";function e(e,n){n=t.extend({duration:1e3,transition:"easeOutExpo",offset:0,complete:function(){}},n);var o=e.offset().top-n.offset,s=i.$doc.height(),a=window.innerHeight;o+a>s&&(o=s-a),i.$("html,body").stop().animate({scrollTop:o},n.duration,n.transition).promise().done(n.complete)}i.component("smoothScroll",{boot:function(){i.$html.on("click.smooth-scroll.uikit","[data-@-smooth-scroll]",function(){var t=i.$(this);if(!t.data("smoothScroll")){{i.smoothScroll(t,i.Utils.options(t.attr("data-@-smooth-scroll")))}t.trigger("click")}return!1})},init:function(){var t=this;this.on("click",function(n){n.preventDefault(),e(i.$(this.hash).length?i.$(this.hash):i.$("body"),t.options)})}}),i.Utils.scrollToElement=e,t.easing.easeOutExpo||(t.easing.easeOutExpo=function(t,i,e,n,o){return i==o?e+n:n*(-Math.pow(2,-10*i/o)+1)+e})}(jQuery,UIkit),function(t,i){"use strict";var e=i.$win,n=i.$doc,o=[],s=function(){for(var t=0;t<o.length;t++)i.support.requestAnimationFrame.apply(window,[o[t].check])};i.component("scrollspy",{defaults:{cls:"@-scrollspy-inview",initcls:"@-scrollspy-init-inview",topoffset:0,leftoffset:0,repeat:!1,delay:0},boot:function(){n.on("scrolling.uk.document",s),e.on("resize orientationchange",i.Utils.debounce(s,50)),i.ready(function(t){i.$("[data-@-scrollspy]",t).each(function(){var t=i.$(this);if(!t.data("scrollspy")){i.scrollspy(t,i.Utils.options(t.attr("data-@-scrollspy")))}})})},init:function(){var t,e,n,s=this,a=function(){var o=i.Utils.isInView(s.element,s.options);o&&!e&&(t&&clearTimeout(t),n||(s.element.addClass(s.options.initcls),s.offset=s.element.offset(),n=!0,s.trigger("init.uk.scrollspy")),t=setTimeout(function(){o&&s.element.addClass("@-scrollspy-inview").addClass(s.options.cls).width()},s.options.delay),e=!0,s.trigger("inview.uk.scrollspy")),!o&&e&&s.options.repeat&&(s.element.removeClass("@-scrollspy-inview").removeClass(s.options.cls),e=!1,s.trigger("outview.uk.scrollspy"))};a(),this.check=a,o.push(this)}});var a=[],r=function(){for(var t=0;t<a.length;t++)i.support.requestAnimationFrame.apply(window,[a[t].check])};i.component("scrollspynav",{defaults:{cls:"@-active",closest:!1,topoffset:0,leftoffset:0,smoothscroll:!1},boot:function(){n.on("scrolling.uk.document",r),e.on("resize orientationchange",i.Utils.debounce(r,50)),i.ready(function(t){i.$("[data-@-scrollspy-nav]",t).each(function(){var t=i.$(this);if(!t.data("scrollspynav")){i.scrollspynav(t,i.Utils.options(t.attr("data-@-scrollspy-nav")))}})})},init:function(){var n,o=[],s=this.find("a[href^='#']").each(function(){o.push(t(this).attr("href"))}),r=t(o.join(",")),l=i.prefix(this.options.cls),c=i.prefix(this.options.closest||this.options.closest),h=this,u=function(){n=[];for(var t=0;t<r.length;t++)i.Utils.isInView(r.eq(t),h.options)&&n.push(r.eq(t));if(n.length){var o,a=e.scrollTop(),u=function(){for(var t=0;t<n.length;t++)if(n[t].offset().top>=a)return n[t]}();if(!u)return;h.options.closest?(s.closest(c).removeClass(l),o=s.filter("a[href='#"+u.attr("id")+"']").closest(c).addClass(l)):o=s.removeClass(l).filter("a[href='#"+u.attr("id")+"']").addClass(l),h.element.trigger("inview.uk.scrollspynav",[u,o])}};this.options.smoothscroll&&i.smoothScroll&&s.each(function(){i.smoothScroll(this,h.options.smoothscroll)}),u(),this.element.data("scrollspynav",this),this.check=u,a.push(this)}})}(jQuery,UIkit),function(t,i,e){"use strict";var n=[];e.component("toggle",{defaults:{target:!1,cls:"@-hidden",animation:!1,duration:200},boot:function(){e.ready(function(t){e.$("[data-@-toggle]",t).each(function(){var t=e.$(this);if(!t.data("toggle")){e.toggle(t,e.Utils.options(t.attr("data-@-toggle")))}}),setTimeout(function(){n.forEach(function(t){t.getTogglers()})},0)})},init:function(){var t=this;this.getTogglers(),this.on("click",function(i){t.element.is('a[href="#"]')&&i.preventDefault(),t.toggle()}),n.push(this)},toggle:function(){if(this.totoggle.length)if(this.options.animation){var t=this,n=e.prefix(this.options.animation).split(",");1==n.length&&(n[1]=n[0]),n[0]=n[0].trim(),n[1]=n[1].trim(),this.totoggle.css("animation-duration",this.options.duration+"ms"),this.totoggle.hasClass(this.options.cls)?(this.totoggle.toggleClass(this.options.cls),this.totoggle.each(function(){e.Utils.animate(this,n[0]).then(function(){i(this).css("animation-duration",""),e.Utils.checkDisplay(this)})})):this.totoggle.each(function(){e.Utils.animate(this,n[1]+" @-animation-reverse").then(function(){e.$(this).toggleClass(t.options.cls).css("animation-duration",""),e.Utils.checkDisplay(this)}.bind(this))})}else this.totoggle.toggleClass(this.options.cls),e.Utils.checkDisplay(this.totoggle)},getTogglers:function(){this.totoggle=this.options.target?e.$(this.options.target):[]}})}(this,jQuery,UIkit),function(t,i){"use strict";i.component("alert",{defaults:{fade:!0,duration:200,trigger:".@-alert-close"},boot:function(){i.$html.on("click.alert.uikit","[data-@-alert]",function(t){var e=i.$(this);if(!e.data("alert")){var n=i.alert(e,i.Utils.options(e.attr("data-@-alert")));i.$(t.target).is(n.options.trigger)&&(t.preventDefault(),n.close())}})},init:function(){var t=this;this.on("click",this.options.trigger,function(i){i.preventDefault(),t.close()})},close:function(){var t=this.trigger("close.uk.alert"),i=function(){this.trigger("closed.uk.alert").remove()}.bind(this);this.options.fade?t.css("overflow","hidden").css("max-height",t.height()).animate({height:0,opacity:0,"padding-top":0,"padding-bottom":0,"margin-top":0,"margin-bottom":0},this.options.duration,i):i()}})}(jQuery,UIkit),function(t,i){"use strict";i.component("buttonRadio",{defaults:{target:".@-button"},boot:function(){i.$html.on("click.buttonradio.uikit","[data-@-button-radio]",function(t){var e=i.$(this);if(!e.data("buttonRadio")){var n=i.buttonRadio(e,i.Utils.options(e.attr("data-@-button-radio"))),o=i.$(t.target);o.is(n.options.target)&&o.trigger("click")}})},init:function(){var t=this;this.on("click",this.options.target,function(e){var n=i.$(this);n.is('a[href="#"]')&&e.preventDefault(),t.find(t.options.target).not(n).removeClass(i.prefix("@-active")).blur(),t.trigger("change.uk.button",[n.addClass("@-active")])})},getSelected:function(){return this.find(".@-active")}}),i.component("buttonCheckbox",{defaults:{target:".@-button"},boot:function(){i.$html.on("click.buttoncheckbox.uikit","[data-@-button-checkbox]",function(t){var e=i.$(this);if(!e.data("buttonCheckbox")){var n=i.buttonCheckbox(e,i.Utils.options(e.attr("data-@-button-checkbox"))),o=i.$(t.target);o.is(n.options.target)&&e.trigger("change.uk.button",[o.toggleClass("@-active").blur()])}})},init:function(){var e=this;this.on("click",this.options.target,function(n){t(this).is('a[href="#"]')&&n.preventDefault(),e.trigger("change.uk.button",[i.$(this).toggleClass("@-active").blur()])})},getSelected:function(){return this.find(".@-active")}}),i.component("button",{defaults:{},boot:function(){i.$html.on("click.button.uikit","[data-@-button]",function(){var t=i.$(this);if(!t.data("button")){{i.button(t,i.Utils.options(t.attr("data-@-button")))}t.trigger("click")}})},init:function(){var t=this;this.on("click",function(i){t.element.is('a[href="#"]')&&i.preventDefault(),t.toggle(),t.trigger("change.uk.button",[t.element.blur().hasClass("@-active")])})},toggle:function(){this.element.toggleClass("@-active")}})}(jQuery,UIkit),function(t,i){"use strict";var e,n=!1;i.component("dropdown",{defaults:{mode:"hover",remaintime:800,justify:!1,boundary:i.$win,delay:0},remainIdle:!1,boot:function(){var t=i.support.touch?"click":"mouseenter";i.$html.on(t+".dropdown.uikit","[data-@-dropdown]",function(e){var n=i.$(this);if(!n.data("dropdown")){var o=i.dropdown(n,i.Utils.options(n.attr("data-@-dropdown")));("click"==t||"mouseenter"==t&&"hover"==o.options.mode)&&o.element.trigger(t),o.element.find(".@-dropdown").length&&e.preventDefault()}})},init:function(){var n=this;this.dropdown=this.find(".@-dropdown"),this.centered=this.dropdown.hasClass("@-dropdown-center"),this.justified=this.options.justify?i.$(this.options.justify):!1,this.boundary=i.$(this.options.boundary),this.flipped=this.dropdown.hasClass("@-dropdown-flip"),this.boundary.length||(this.boundary=i.$win),"click"==this.options.mode||i.support.touch?this.on("click",function(t){var e=i.$(t.target);e.parents(".@-dropdown").length||((e.is("a[href='#']")||e.parent().is("a[href='#']")||n.dropdown.length&&!n.dropdown.is(":visible"))&&t.preventDefault(),e.blur()),n.element.hasClass("@-open")?(e.is("a:not(.js-@-prevent)")||e.is(".@-dropdown-close")||!n.dropdown.find(t.target).length)&&n.hide():n.show()}):this.on("mouseenter",function(){n.remainIdle&&clearTimeout(n.remainIdle),e&&clearTimeout(e),e=setTimeout(n.show.bind(n),n.options.delay)}).on("mouseleave",function(){e&&clearTimeout(e),n.remainIdle=setTimeout(function(){n.hide()},n.options.remaintime)}).on("click",function(i){var e=t(i.target);n.remainIdle&&clearTimeout(n.remainIdle),(e.is("a[href='#']")||e.parent().is("a[href='#']"))&&i.preventDefault(),n.show()})},show:function(){i.$html.off("click.outer.dropdown"),n&&n[0]!=this.element[0]&&n.removeClass("@-open"),e&&clearTimeout(e),this.checkDimensions(),this.element.addClass("@-open"),this.trigger("show.uk.dropdown",[this]),i.Utils.checkDisplay(this.dropdown,!0),n=this.element,this.registerOuterClick()},hide:function(){this.element.removeClass("@-open"),this.remainIdle=!1,n&&n[0]==this.element[0]&&(n=!1)},registerOuterClick:function(){var t=this;i.$html.off("click.outer.dropdown"),setTimeout(function(){i.$html.on("click.outer.dropdown",function(o){e&&clearTimeout(e);var s=i.$(o.target);n&&n[0]==t.element[0]&&(s.is("a:not(.js-@-prevent)")||s.is(".@-dropdown-close")||!t.dropdown.find(o.target).length)&&(t.hide(),i.$html.off("click.outer.dropdown"))})},10)},checkDimensions:function(){if(this.dropdown.length){this.justified&&this.justified.length&&this.dropdown.css("min-width","");var t=this,e=this.dropdown.css("margin-"+i.langdirection,""),n=e.show().offset(),o=e.outerWidth(),s=this.boundary.width(),a=this.boundary.offset()?this.boundary.offset().left:0;if(this.centered&&(e.css("margin-"+i.langdirection,-1*(parseFloat(o)/2-e.parent().width()/2)),n=e.offset(),(o+n.left>s||n.left<0)&&(e.css("margin-"+i.langdirection,""),n=e.offset())),this.justified&&this.justified.length){var r=this.justified.outerWidth();if(e.css("min-width",r),"right"==i.langdirection){var l=s-(this.justified.offset().left+r),c=s-(e.offset().left+e.outerWidth());e.css("margin-right",l-c)}else e.css("margin-left",this.justified.offset().left-n.left);n=e.offset()}o+(n.left-a)>s&&(e.addClass("@-dropdown-flip"),n=e.offset()),n.left-a<0&&(e.addClass("@-dropdown-stack"),e.hasClass("@-dropdown-flip")&&(this.flipped||(e.removeClass("@-dropdown-flip"),n=e.offset(),e.addClass("@-dropdown-flip")),setTimeout(function(){(e.offset().left-a<0||!t.flipped&&e.outerWidth()+(n.left-a)<s)&&e.removeClass("@-dropdown-flip")},0)),this.trigger("stack.uk.dropdown",[this])),e.css("display","")}}})}(jQuery,UIkit),function(t,i){"use strict";var e=[];i.component("gridMatchHeight",{defaults:{target:!1,row:!0},boot:function(){i.ready(function(t){i.$("[data-@-grid-match]",t).each(function(){var t,e=i.$(this);e.data("gridMatchHeight")||(t=i.gridMatchHeight(e,i.Utils.options(e.attr("data-@-grid-match"))))})})},init:function(){var n=this;this.columns=this.element.children(),this.elements=this.options.target?this.find(this.options.target):this.columns,this.columns.length&&(i.$win.on("resize orientationchange",function(){var e=function(){n.match()};return t(function(){e(),i.$win.on("load",e)}),i.Utils.debounce(e,50)}()),i.$html.on("changed.uk.dom",function(){n.columns=n.element.children(),n.elements=n.options.target?n.find(n.options.target):n.columns,n.match()}),this.on("display.uk.check",function(){this.element.is(":visible")&&this.match()}.bind(this)),e.push(this))},match:function(){this.revert();var i=this.columns.filter(":visible:first");if(i.length){var e=Math.ceil(100*parseFloat(i.css("width"))/parseFloat(i.parent().css("width")))>=100?!0:!1,n=this;if(!e)return this.options.row?(this.element.width(),setTimeout(function(){var i=!1,e=[];n.elements.each(function(){var o=t(this),s=o.offset().top;s!=i&&e.length&&(n.matchHeights(t(e)),e=[],s=o.offset().top),e.push(o),i=s}),e.length&&n.matchHeights(t(e))},0)):this.matchHeights(this.elements),this}},revert:function(){return this.elements.css("min-height",""),this},matchHeights:function(i){if(!(i.length<2)){var e=0;i.each(function(){e=Math.max(e,t(this).outerHeight())}).each(function(){var i=t(this),n=e-(i.outerHeight()-i.height());i.css("min-height",n+"px")})}}}),i.component("gridMargin",{defaults:{cls:"@-grid-margin"},boot:function(){i.ready(function(t){i.$("[data-@-grid-margin]",t).each(function(){var t,e=i.$(this);e.data("gridMargin")||(t=i.gridMargin(e,i.Utils.options(e.attr("data-@-grid-margin"))))})})},init:function(){i.stackMargin(this.element,this.options)}})}(jQuery,UIkit),function(t,i){"use strict";function e(e,n){return n?("object"==typeof e?(e=e instanceof jQuery?e:i.$(e),e.parent().length&&(n.persist=e,n.persist.data("modalPersistParent",e.parent()))):e="string"==typeof e||"number"==typeof e?t("<div></div>").html(e):t("<div></div>").html("UIkit.modal Error: Unsupported data type: "+typeof e),e.appendTo(n.element.find(".@-modal-dialog")),n):void 0}var n,o=!1,s=i.$html;i.component("modal",{defaults:{keyboard:!0,bgclose:!0,minScrollHeight:150},scrollable:!1,transition:!1,init:function(){n||(n=t("body"));var e=this;this.transition=i.support.transition,this.paddingdir="padding-"+("left"==i.langdirection?"right":"left"),this.dialog=this.find(".@-modal-dialog"),this.on("click",".@-modal-close",function(t){t.preventDefault(),e.hide()}).on("click",function(i){var n=t(i.target);n[0]==e.element[0]&&e.options.bgclose&&e.hide()})},toggle:function(){return this[this.isActive()?"hide":"show"]()},show:function(){if(!this.isActive())return o&&o.hide(!0),this.element.removeClass("@-open").show(),this.resize(),o=this,s.addClass("@-modal-page").height(),this.element.addClass("@-open").trigger("show.uk.modal"),i.Utils.checkDisplay(this.dialog,!0),this},hide:function(t){if(this.isActive()){if(!t&&i.support.transition){var e=this;this.one(i.support.transition.end,function(){e._hide()}).removeClass("@-open")}else this._hide();return this}},resize:function(){var t=n.width();this.scrollbarwidth=window.innerWidth-t,n.css(this.paddingdir,this.scrollbarwidth),this.element.css("overflow-y",this.scrollbarwidth?"scroll":"auto"),this.updateScrollable()},updateScrollable:function(){var t=this.dialog.find(".@-overflow-container:visible:first");if(t){t.css("height",0);var i=Math.abs(parseInt(this.dialog.css("margin-top"),10)),e=this.dialog.outerHeight(),n=window.innerHeight,o=n-2*(20>i?20:i)-e;t.css("height",o<this.options.minScrollHeight?"":o)}},_hide:function(){this.element.hide().removeClass("@-open"),s.removeClass("@-modal-page"),n.css(this.paddingdir,""),o===this&&(o=!1),this.trigger("hide.uk.modal")},isActive:function(){return o==this}}),i.component("modalTrigger",{boot:function(){i.$html.on("click.modal.uikit","[data-@-modal]",function(t){var e=i.$(this);if(e.is("a")&&t.preventDefault(),!e.data("modalTrigger")){var n=i.modalTrigger(e,i.Utils.options(e.attr("data-@-modal")));n.show()}}),i.$html.on("keydown.modal.uikit",function(t){o&&27===t.keyCode&&o.options.keyboard&&(t.preventDefault(),o.hide())}),i.$win.on("resize orientationchange",i.Utils.debounce(function(){o&&o.resize()},150))},init:function(){var e=this;this.options=t.extend({target:e.element.is("a")?e.element.attr("href"):!1},this.options),this.modal=i.modal(this.options.target,this.options),this.on("click",function(t){t.preventDefault(),e.show()}),this.proxy(this.modal,"show hide isActive")}}),i.modal.dialog=function(t,n){var o=i.modal(i.$(i.modal.dialog.template).appendTo("body"),n);return o.on("hide.uk.modal",function(){o.persist&&(o.persist.appendTo(o.persist.data("modalPersistParent")),o.persist=!1),o.element.remove()}),e(t,o),o},i.modal.dialog.template='<div class="@-modal"><div class="@-modal-dialog"></div></div>',i.modal.alert=function(e,n){i.modal.dialog(['<div class="@-margin @-modal-content">'+String(e)+"</div>",'<div class="@-modal-buttons"><button class="@-button @-button-primary @-modal-close">Ok</button></div>'].join("").replace(/@-/g,i._prefix+"-").replace(/@-/g,i._prefix+"-"),t.extend({bgclose:!1,keyboard:!1},n)).show()},i.modal.confirm=function(e,n,o){n=t.isFunction(n)?n:function(){};var s=i.modal.dialog(['<div class="@-margin @-modal-content">'+String(e)+"</div>",'<div class="@-modal-buttons"><button class="@-button @-button-primary js-modal-confirm">Ok</button> <button class="@-button @-modal-close">Cancel</button></div>'].join("").replace(/@-/g,i._prefix+"-"),t.extend({bgclose:!1,keyboard:!1},o));s.element.find(".js-modal-confirm").on("click",function(){n(),s.hide()}),s.show()}}(jQuery,UIkit),function(t,i){"use strict";function e(t){var e=i.$(t),n="auto";if(e.is(":visible"))n=e.outerHeight();else{var o={position:e.css("position"),visibility:e.css("visibility"),display:e.css("display")};n=e.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),e.css(o)}return n}i.component("nav",{defaults:{toggle:">li.@-parent > a[href='#']",lists:">li.@-parent > ul",multiple:!1},boot:function(){i.ready(function(t){i.$("[data-@-nav]",t).each(function(){var t=i.$(this);if(!t.data("nav")){i.nav(t,i.Utils.options(t.attr("data-@-nav")))}})})},init:function(){var t=this;this.on("click",this.options.toggle,function(e){e.preventDefault();var n=i.$(this);t.open(n.parent()[0]==t.element[0]?n:n.parent("li"))}),this.find(this.options.lists).each(function(){var e=i.$(this),n=e.parent(),o=n.hasClass("@-active");e.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'),n.data("list-container",e.parent()),o&&t.open(n,!0)})},open:function(t,n){var o=this.element,s=i.$(t);this.options.multiple||o.children(".@-open").not(t).each(function(){var t=i.$(this);t.data("list-container")&&t.data("list-container").stop().animate({height:0},function(){i.$(this).parent().removeClass("@-open")})}),s.toggleClass("@-open"),s.data("list-container")&&(n?s.data("list-container").stop().height(s.hasClass("@-open")?"auto":0):s.data("list-container").stop().animate({height:s.hasClass("@-open")?e(s.data("list-container").find("ul:first")):0}))}})}(jQuery,UIkit),function(t,i){"use strict";
var e={x:window.scrollX,y:window.scrollY},n=(i.$win,i.$doc),o=i.$html,s={show:function(t){if(t=i.$(t),t.length){var s=i.$("body"),a=t.find(".@-offcanvas-bar:first"),r="right"==i.langdirection,l=a.hasClass("@-offcanvas-bar-flip")?-1:1,c=l*(r?-1:1);e={x:window.pageXOffset,y:window.pageYOffset},t.addClass("@-active"),s.css({width:window.innerWidth,height:window.innerHeight}).addClass("@-offcanvas-page"),s.css(r?"margin-right":"margin-left",(r?-1:1)*a.outerWidth()*c).width(),o.css("margin-top",-1*e.y),a.addClass("@-offcanvas-bar-show"),this._initElement(t),n.trigger("show.uk.offcanvas",[t,a])}},hide:function(t){var n=i.$("body"),s=i.$(".@-offcanvas.@-active"),a="right"==i.langdirection,r=s.find(".@-offcanvas-bar:first"),l=function(){n.removeClass("@-offcanvas-page").css({width:"",height:"","margin-left":"","margin-right":""}),s.removeClass("@-active"),r.removeClass("@-offcanvas-bar-show"),o.css("margin-top",""),window.scrollTo(e.x,e.y),i.$doc.trigger("hide.uk.offcanvas",[s,r])};s.length&&(i.support.transition&&!t?(n.one(i.support.transition.end,function(){l()}).css(a?"margin-right":"margin-left",""),setTimeout(function(){r.removeClass("@-offcanvas-bar-show")},0)):l())},_initElement:function(e){e.data("OffcanvasInit")||(e.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas",function(t){var e=i.$(t.target);if(!t.type.match(/swipe/)&&!e.hasClass("@-offcanvas-close")){if(e.hasClass("@-offcanvas-bar"))return;if(e.parents(".@-offcanvas-bar:first").length)return}t.stopImmediatePropagation(),s.hide()}),e.on("click","a[href^='#']",function(){var e=t(this),n=e.attr("href");"#"!=n&&(i.$doc.one("hide.uk.offcanvas",function(){var e=t(n);e.length||(e=i.$('[name="'+n.replace("#","")+'"]')),i.Utils.scrollToElement&&e.length?i.Utils.scrollToElement(e):window.location.href=n}),s.hide())}),e.data("OffcanvasInit",!0))}};i.component("offcanvasTrigger",{boot:function(){o.on("click.offcanvas.uikit","[data-@-offcanvas]",function(t){t.preventDefault();var e=i.$(this);if(!e.data("offcanvasTrigger")){{i.offcanvasTrigger(e,i.Utils.options(e.attr("data-@-offcanvas")))}e.trigger("click")}}),o.on("keydown.uk.offcanvas",function(t){27===t.keyCode&&s.hide()})},init:function(){var i=this;this.options=t.extend({target:i.element.is("a")?i.element.attr("href"):!1},this.options),this.on("click",function(t){t.preventDefault(),s.show(i.options.target)})}}),i.offcanvas=s}(jQuery,UIkit),function(t,i){"use strict";function e(e,n,o){var s,a=t.Deferred(),r=i.prefix(e),l=e;return o[0]===n[0]?(a.resolve(),a.promise()):("object"==typeof e&&(r=e[0],l=e[1]||e[0]),s=function(){n&&n.hide().removeClass(i.prefix("@-active "+l+" @-animation-reverse")),o.addClass(r).one(i.support.animation.end,function(){o.removeClass(""+r).css({opacity:"",display:""}),a.resolve(),n&&n.css({opacity:"",display:""})}.bind(this)).show()},o.css("animation-duration",this.options.duration+"ms"),n&&n.length?(n.css("animation-duration",this.options.duration+"ms"),n.css("display","none").addClass(i.prefix(l+" @-animation-reverse")).one(i.support.animation.end,function(){s()}.bind(this)).css("display","")):(o.addClass("@-active"),s()),a.promise())}var n;i.component("switcher",{defaults:{connect:!1,toggle:">*",active:0,animation:!1,duration:200},animating:!1,boot:function(){i.ready(function(t){i.$("[data-@-switcher]",t).each(function(){var t=i.$(this);if(!t.data("switcher")){i.switcher(t,i.Utils.options(t.attr("data-@-switcher")))}})})},init:function(){var t=this;if(this.on("click",this.options.toggle,function(i){i.preventDefault(),t.show(this)}),this.options.connect){this.connect=i.$(this.options.connect),this.connect.find(".@-active").removeClass(".@-active"),this.connect.length&&this.connect.on("click","[data-@-switcher-item]",function(e){e.preventDefault();var n=i.$(this).data(i._prefix+"SwitcherItem");if(t.index!=n)switch(n){case"next":case"previous":t.show(t.index+("next"==n?1:-1));break;default:t.show(n)}});var e=this.find(this.options.toggle),n=e.filter(".@-active");if(n.length)this.show(n,!1);else{if(this.options.active===!1)return;n=e.eq(i.prefix(this.options.active)),this.show(n.length?n:e.eq(0),!1)}}},show:function(t,o){if(!this.animating){if(isNaN(t))t=i.$(t);else{var s=this.find(this.options.toggle);t=0>t?s.length-1:t,t=s.eq(s[t]?t:0)}var a=this,r=i.$(t),l=n[this.options.animation]||function(t,i){if(!a.options.animation)return n.none.apply(a);var o=a.options.animation.split(",");return 1==o.length&&(o[1]=o[0]),o[0]=o[0].trim(),o[1]=o[1].trim(),e.apply(a,[o,t,i])};o===!1&&(l=n.none),r.hasClass("@-disabled")||(this.find(this.options.toggle).filter(".@-active").removeClass("@-active"),r.addClass("@-active"),this.options.connect&&this.connect.length&&(this.index=this.find(this.options.toggle).index(r),-1==this.index&&(this.index=0),this.connect.each(function(){var t=i.$(this),e=i.$(t.children()),n=i.$(e.filter(".@-active")),o=i.$(e.eq(a.index));a.animating=!0,l.apply(a,[n,o]).then(function(){n.removeClass("@-active"),o.addClass("@-active"),i.Utils.checkDisplay(o,!0),a.animating=!1})})),this.trigger("show.uk.switcher",[r]))}}}),n={none:function(){var i=t.Deferred();return i.resolve(),i.promise()},fade:function(t,i){return e.apply(this,["@-animation-fade",t,i])},"slide-bottom":function(t,i){return e.apply(this,["@-animation-slide-bottom",t,i])},"slide-top":function(t,i){return e.apply(this,["@-animation-slide-top",t,i])},"slide-vertical":function(t,i){var n=["@-animation-slide-top","@-animation-slide-bottom"];return t&&t.index()>i.index()&&n.reverse(),e.apply(this,[n,t,i])},"slide-left":function(t,i){return e.apply(this,["@-animation-slide-left",t,i])},"slide-right":function(t,i){return e.apply(this,["@-animation-slide-right",t,i])},"slide-horizontal":function(t,i){var n=["@-animation-slide-left","@-animation-slide-right"];return t&&t.index()>i.index()&&n.reverse(),e.apply(this,[n,t,i])},scale:function(t,i){return e.apply(this,["@-animation-scale-up",t,i])}},i.switcher.animations=n}(jQuery,UIkit),function(t,i){"use strict";i.component("tab",{defaults:{target:">li:not(.@-tab-responsive, .@-disabled)",connect:!1,active:0,animation:!1,duration:200},boot:function(){i.ready(function(t){i.$("[data-@-tab]",t).each(function(){var t=i.$(this);if(!t.data("tab")){i.tab(t,i.Utils.options(t.attr("data-@-tab")))}})})},init:function(){var e=this;this.on("click",this.options.target,function(t){t.preventDefault(),e.find(e.options.target).not(this).removeClass(i.prefix("@-active")).blur(),e.trigger("change.uk.tab",[i.$(this).addClass("@-active")])}),this.options.connect&&(this.connect=t(this.options.connect)),this.responsivetab=i.$('<li class="@-tab-responsive @-active"><a></a></li>').append(i.prefix('<div class="@-dropdown @-dropdown-small"><ul class="@-nav @-nav-dropdown"></ul><div>')),this.responsivetab.dropdown=this.responsivetab.find(".@-dropdown"),this.responsivetab.lst=this.responsivetab.dropdown.find("ul"),this.responsivetab.caption=this.responsivetab.find("a:first"),this.element.hasClass("@-tab-bottom")&&this.responsivetab.dropdown.addClass("@-dropdown-up"),this.responsivetab.lst.on("click","a",function(i){i.preventDefault(),i.stopPropagation();var n=t(this);e.element.children(":not(.@-tab-responsive)").eq(n.data("index")).trigger("click")}),this.on("show.uk.switcher change.uk.tab",function(t,i){e.responsivetab.caption.html(i.text())}),this.element.append(this.responsivetab),this.options.connect&&i.switcher(this.element,{toggle:">li:not(.@-tab-responsive)",connect:this.options.connect,active:this.options.active,animation:this.options.animation,duration:this.options.duration}),i.dropdown(this.responsivetab,{mode:"click"}),e.trigger("change.uk.tab",[this.element.find(this.options.target).filter(".@-active")]),this.check(),i.$win.on("resize orientationchange",i.Utils.debounce(function(){e.element.is(":visible")&&e.check()},100)),this.on("display.uk.check",function(){e.element.is(":visible")&&e.check()})},check:function(){var e=this.element.children(":not(.@-tab-responsive)").removeClass("@-hidden");if(!(e.length<2)){var n,o,s=e.eq(0).offset().top+Math.ceil(e.eq(0).height()/2),a=!1;if(this.responsivetab.lst.empty(),e.each(function(){t(this).offset().top>s&&(a=!0)}),a)for(var r=0;r<e.length;r++)n=i.$(e.eq(r)),o=n.find("a"),"none"==n.css("float")||n.attr("@-dropdown")||(n.addClass("@-hidden"),n.hasClass("@-disabled")||this.responsivetab.lst.append('<li><a href="'+o.attr("href")+'" data-index="'+r+'">'+o.html()+"</a></li>"));this.responsivetab[this.responsivetab.lst.children().length?"removeClass":"addClass"]("@-hidden")}}})}(jQuery,UIkit),function(t,i){"use strict";var e,n,o;i.component("tooltip",{defaults:{offset:5,pos:"top",animation:!1,delay:0,cls:"",src:function(){return this.attr("title")}},tip:"",boot:function(){i.$html.on("mouseenter.tooltip.uikit focus.tooltip.uikit","[data-@-tooltip]",function(){var t=i.$(this);if(!t.data("tooltip")){{i.tooltip(t,i.Utils.options(t.attr("data-@-tooltip")))}t.trigger("mouseenter")}})},init:function(){var t=this;e||(e=i.$('<div class="@-tooltip"></div>').appendTo("body")),this.on({focus:function(){t.show()},blur:function(){t.hide()},mouseenter:function(){t.show()},mouseleave:function(){t.hide()}}),this.tip="function"==typeof this.options.src?this.options.src.call(this.element):this.options.src,this.element.attr("data-cached-title",this.element.attr("title")).attr("title","")},show:function(){if(n&&clearTimeout(n),o&&clearTimeout(o),this.tip.length){e.stop().css({top:-2e3,visibility:"hidden"}).show(),e.html(i.prefix('<div class="@-tooltip-inner">')+this.tip+"</div>");var s=this,a=t.extend({},this.element.offset(),{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}),r=e[0].offsetWidth,l=e[0].offsetHeight,c="function"==typeof this.options.offset?this.options.offset.call(this.element):this.options.offset,h="function"==typeof this.options.pos?this.options.pos.call(this.element):this.options.pos,u=h.split("-"),d={display:"none",visibility:"visible",top:a.top+a.height+l,left:a.left};if("fixed"==t("html").css("position")||"fixed"==t("body").css("position")){var f=i.$("body").offset(),p=i.$("html").offset(),g={top:p.top+f.top,left:p.left+f.left};a.left-=g.left,a.top-=g.top}"left"!=u[0]&&"right"!=u[0]||"right"!=i.langdirection||(u[0]="left"==u[0]?"right":"left");var m={bottom:{top:a.top+a.height+c,left:a.left+a.width/2-r/2},top:{top:a.top-l-c,left:a.left+a.width/2-r/2},left:{top:a.top+a.height/2-l/2,left:a.left-r-c},right:{top:a.top+a.height/2-l/2,left:a.left+a.width+c}};t.extend(d,m[u[0]]),2==u.length&&(d.left="left"==u[1]?a.left:a.left+a.width-r);var v=this.checkBoundary(d.left,d.top,r,l);if(v){switch(v){case"x":h=2==u.length?u[0]+"-"+(d.left<0?"left":"right"):d.left<0?"right":"left";break;case"y":h=2==u.length?(d.top<0?"bottom":"top")+"-"+u[1]:d.top<0?"bottom":"top";break;case"xy":h=2==u.length?(d.top<0?"bottom":"top")+"-"+(d.left<0?"left":"right"):d.left<0?"right":"left"}u=h.split("-"),t.extend(d,m[u[0]]),2==u.length&&(d.left="left"==u[1]?a.left:a.left+a.width-r)}d.left-=t("body").position().left,n=setTimeout(function(){e.css(d).attr("class",i.prefix(["@-tooltip","@-tooltip-"+h,s.options.cls].join(" "))),s.options.animation?e.css({opacity:0,display:"block"}).animate({opacity:1},parseInt(s.options.animation,10)||400):e.show(),n=!1,o=setInterval(function(){s.element.is(":visible")||s.hide()},150)},parseInt(this.options.delay,10)||0)}},hide:function(){this.element.is("input")&&this.element[0]===document.activeElement||(n&&clearTimeout(n),o&&clearTimeout(o),e.stop(),this.options.animation?e.fadeOut(parseInt(this.options.animation,10)||400):e.hide())},content:function(){return this.tip},checkBoundary:function(t,e,n,o){var s="";return(0>t||t-i.$win.scrollLeft()+n>window.innerWidth)&&(s+="x"),(0>e||e-i.$win.scrollTop()+o>window.innerHeight)&&(s+="y"),s}})}(jQuery,UIkit);;// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
;var ImportFixtures = function ( routesArray ) {
    var _this = this;

    _this.routes = routesArray;

    _this.callSingleImport(0);
};

ImportFixtures.prototype.routes = null;
ImportFixtures.prototype.score = 0;

ImportFixtures.prototype.callSingleImport = function( index ) {
    var _this = this;

    if(_this.routes.length > index){

        var $row = $("#"+_this.routes[index].id);
        var $icon = $row.find("i");
        $icon.removeClass('uk-icon-circle-o');
        $icon.addClass('uk-icon-spin');
        $icon.addClass('uk-icon-spinner');

        $.ajax({
            url: _this.routes[index].url,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log("success");
                _this.score++;

                $icon.removeClass('uk-icon-spinner');
                $icon.addClass('uk-icon-check');
                $row.addClass('uk-badge-success');

            },
            error: function(data) {
                console.log("error");

                $icon.removeClass('uk-icon-spinner');
                $icon.addClass('uk-icon-warning');
                $row.addClass('uk-badge-danger');
                if (typeof data.responseJSON != "undefined" && typeof data.responseJSON.error != "undefined") {
                    $row.parent().parent().after("<tr><td class=\"uk-alert uk-alert-danger\" colspan=\"3\">"+data.responseJSON.error+"</td></tr>");
                }
            },
            complete: function(data) {
                console.log("complete");
                $icon.removeClass('uk-icon-spin');

                _this.callSingleImport(index + 1);
            }
        });
    } else {

        if(_this.score === _this.routes.length){
            $('#next-step-button').removeClass('uk-button-disabled');
        }
    }
};;var ImportNodeType = function ( routesArray ) {
    var _this = this;

    _this.routes = routesArray;

    _this.always(0);
};

ImportNodeType.prototype.routes = null;
ImportNodeType.prototype.score = 0;

ImportNodeType.prototype.always = function( index) {
    var _this = this;

    if(_this.routes.length > index) {
        if (typeof _this.routes[index].update != "undefined") {
            $.ajax({
                url:_this.routes[index].update,
                type: 'GET',
                dataType: 'json',
                complete: function() {
                    console.log("updateSchema");
                    _this.callSingleImport(index);
                }
            });
        } else {
            _this.callSingleImport(index);
        }
    } else {
        $('#next-step-button').removeClass('uk-button-disabled');
    }
};

ImportNodeType.prototype.callSingleImport = function( index ) {
    var _this = this;

    //if(_this.routes.length > index) {
    //   if (typeof _this.routes[index].update != "undefined") {
    //     console.log(_this.routes[index].update);
    //     _this.always(index, _this.routes[index].update);
    //   }
    var $row = $("#"+_this.routes[index].id);
    var $icon = $row.find("i");
    $icon.removeClass('uk-icon-circle-o');
    $icon.addClass('uk-icon-spin');
    $icon.addClass('uk-icon-spinner');

    $.ajax({
        url: _this.routes[index].url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log("success");
            console.log(data);

            $icon.removeClass('uk-icon-spinner');
            $icon.addClass('uk-icon-check');
            $row.addClass('uk-badge-success');
        },
        error: function(data) {
            $icon.removeClass('uk-icon-spinner');
            $icon.addClass('uk-icon-warning');
            $row.addClass('uk-badge-danger');

            if (typeof data.responseJSON != "undefined" && typeof data.responseJSON.error != "undefined") {
                $row.parent().parent().after("<tr><td class=\"uk-alert uk-alert-danger\" colspan=\"3\">"+data.responseJSON.error+"</td></tr>");
            }
        },
        complete: function(data) {
            console.log("complete");
            console.log(index);
            $icon.removeClass('uk-icon-spin');
            _this.always(index + 1);
        }
    });
    //}
};
;var SelectDatabaseField = function () {
    var _this = this;

    _this.init();
};

SelectDatabaseField.prototype.init = function() {
    var _this = this;
    _this.changeField($("#form_driver").val());
    $("#form_driver").on('change', $.proxy(_this.changeFieldEvent, _this));
};

SelectDatabaseField.prototype.changeFieldEvent = function(event) {
    var _this = this;

    var $choices = $(event.currentTarget);

    _this.changeField($choices.val());
};

SelectDatabaseField.prototype.changeField = function(driver) {
    var _this = this;

    if (driver == "pdo_sqlite") {
        _this.disableField($("#form_host"));
        _this.disableField($("#form_port"));
        _this.disableField($("#form_unix_socket"));
        _this.enableField($("#form_path"));
        _this.disableField($("#form_dbname"));
    }
    else if (driver == "pdo_mysql") {
        _this.enableField($("#form_host"));
        _this.enableField($("#form_port"));
        _this.enableField($("#form_unix_socket"));
        _this.disableField($("#form_path"));
        _this.enableField($("#form_dbname"));
    }
    else if (driver == "pdo_pgsql") {
        _this.enableField($("#form_host"));
        _this.enableField($("#form_port"));
        _this.disableField($("#form_unix_socket"));
        _this.disableField($("#form_path"));
        _this.enableField($("#form_dbname"));
    }
    else if (driver == "oci8") {
        _this.enableField($("#form_host"));
        _this.enableField($("#form_port"));
        _this.disableField($("#form_unix_socket"));
        _this.disableField($("#form_path"));
        _this.enableField($("#form_dbname"));
    }

    Install.resizeContainer.init();
};

SelectDatabaseField.prototype.disableField = function (field) {
    field.parent().hide();
    field.attr("disabled", "disabled");
};

SelectDatabaseField.prototype.enableField = function (field) {
    field.parent().show();
    field.removeAttr("disabled");
};;/**
 * Resize container
 */

var resizeContainer = function() {
    var _this = this;

    _this.$window = $(window);
    _this.$mainContainer = $('#main-container');

    _this.$window.on('resize', $.proxy(_this.init, _this));
    _this.$window.trigger('resize');

};


resizeContainer.prototype.$window = null;
resizeContainer.prototype.windowHeight = null;
resizeContainer.prototype.windowHeightLimit = null;
resizeContainer.prototype.$mainContainer = null;
resizeContainer.prototype.mainContainerHeight = 0;
resizeContainer.prototype.margin = 50;


/**
 * Init
 * @return {[type]} [description]
 */
resizeContainer.prototype.init = function() {
    var _this = this;

    _this.windowHeight = _this.$window.height();  
    _this.mainContainerHeight = _this.$mainContainer.height();
    _this.windowHeightLimit = _this.windowHeight-(_this.margin*2);

    // Check if we have enough size to center container
    if(_this.mainContainerHeight < _this.windowHeightLimit){     
        _this.$mainContainer[0].className = 'absolute';
        _this.$mainContainer[0].style.marginTop = -_this.mainContainerHeight/2 +'px';
    }
    else{
        _this.$mainContainer[0].className = 'relative';
       _this.$mainContainer[0].style.marginTop = '50px';
    }
};
;/*
 * ============================================================================
 * Rozier entry point
 * ============================================================================
 */
var Install = {
    importFixtures: null,
    selectDatabaseField: null,
    resizeContainer: null,
    importNodeType: null
};

Install.onDocumentReady = function( event ) {

    Install.resizeContainer = new resizeContainer();

    if(typeof Install.importRoutes != "undefined"){
        Install.importFixtures = new ImportFixtures(Install.importRoutes);
    }

    if ($("#databaseForm").length) {
        Install.selectDatabaseField = new SelectDatabaseField();
    }

    if (typeof Install.importNodeTypeRoutes != "undefined"){
        Install.importNodeType = new ImportNodeType(Install.importNodeTypeRoutes);
    }

    // Add boostrap switch to checkbox
    $(".rz-boolean-checkbox").bootstrapSwitch();

};

/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(Install.onDocumentReady);