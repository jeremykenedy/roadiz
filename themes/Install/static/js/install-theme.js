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
;/*! UIkit 2.8.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */

!function(a){if("function"==typeof define&&define.amd&&define("uikit",function(){var b=a(window,window.jQuery,window.document);return b.load=function(a,c,d,e){var f,g=a.split(","),h=[],i=(e.config&&e.config.uikit&&e.config.uikit.base?e.config.uikit.base:"").replace(/\/+$/g,"");if(!i)throw new Error("Please define base path to uikit in the requirejs config.");for(f=0;f<g.length;f+=1){var j=g[f].replace(/\./g,"/");h.push(i+"/js/addons/"+j)}c(h,function(){d(b)})},b}),!window.jQuery)throw new Error("UIkit requires jQuery");window&&window.jQuery&&a(window,window.jQuery,window.document)}(function(a,b,c){"use strict";var d=b.UIkit||{},e=b("html"),f=b(window),g=b(document);if(d.fn)return d;if(d.version="2.8.0",d.$doc=g,d.$win=f,d.fn=function(a,c){var e=arguments,f=a.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),g=f[1],h=f[2];return d[g]?this.each(function(){var a=b(this),f=a.data(g);f||a.data(g,f=d[g](this,h?void 0:c)),h&&f[h].apply(f,Array.prototype.slice.call(e,1))}):(b.error("UIkit component ["+g+"] does not exist."),this)},d.support={},d.support.transition=function(){var a=function(){var a,b=c.body||c.documentElement,d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(a in d)if(void 0!==b.style[a])return d[a]}();return a&&{end:a}}(),d.support.animation=function(){var a=function(){var a,b=c.body||c.documentElement,d={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(a in d)if(void 0!==b.style[a])return d[a]}();return a&&{end:a}}(),d.support.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(a){setTimeout(a,1e3/60)},d.support.touch="ontouchstart"in window&&navigator.userAgent.toLowerCase().match(/mobile|tablet/)||a.DocumentTouch&&document instanceof a.DocumentTouch||a.navigator.msPointerEnabled&&a.navigator.msMaxTouchPoints>0||a.navigator.pointerEnabled&&a.navigator.maxTouchPoints>0||!1,d.support.mutationobserver=a.MutationObserver||a.WebKitMutationObserver||a.MozMutationObserver||null,d.Utils={},d.Utils.debounce=function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}},d.Utils.removeCssRules=function(a){var b,c,d,e,f,g,h,i,j,k;a&&setTimeout(function(){try{for(k=document.styleSheets,e=0,h=k.length;h>e;e++){for(d=k[e],c=[],d.cssRules=d.cssRules,b=f=0,i=d.cssRules.length;i>f;b=++f)d.cssRules[b].type===CSSRule.STYLE_RULE&&a.test(d.cssRules[b].selectorText)&&c.unshift(b);for(g=0,j=c.length;j>g;g++)d.deleteRule(c[g])}}catch(l){}},0)},d.Utils.isInView=function(a,c){var d=b(a);if(!d.is(":visible"))return!1;var e=f.scrollLeft(),g=f.scrollTop(),h=d.offset(),i=h.left,j=h.top;return c=b.extend({topoffset:0,leftoffset:0},c),j+d.height()>=g&&j-c.topoffset<=g+f.height()&&i+d.width()>=e&&i-c.leftoffset<=e+f.width()?!0:!1},d.Utils.options=function(a){if(b.isPlainObject(a))return a;var c=a?a.indexOf("{"):-1,d={};if(-1!=c)try{d=new Function("","var json = "+a.substr(c)+"; return JSON.parse(JSON.stringify(json));")()}catch(e){}return d},d.Utils.template=function(a,b){for(var c,d,e,f,g=a.replace(/\n/g,"\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g,"{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),h=0,i=[],j=0;h<g.length;){if(c=g[h],c.match(/\{\{\s*(.+?)\s*\}\}/))switch(h+=1,c=g[h],d=c[0],e=c.substring(c.match(/^(\^|\#|\!|\~|\:)/)?1:0),d){case"~":i.push("for(var $i=0;$i<"+e+".length;$i++) { var $item = "+e+"[$i];"),j++;break;case":":i.push("for(var $key in "+e+") { var $val = "+e+"[$key];"),j++;break;case"#":i.push("if("+e+") {"),j++;break;case"^":i.push("if(!"+e+") {"),j++;break;case"/":i.push("}"),j--;break;case"!":i.push("__ret.push("+e+");");break;default:i.push("__ret.push(escape("+e+"));")}else i.push("__ret.push('"+c.replace(/\'/g,"\\'")+"');");h+=1}f=["var __ret = [];","try {","with($data){",j?'__ret = ["Not all blocks are closed correctly."]':i.join(""),"};","}catch(e){__ret = [e.message];}",'return __ret.join("").replace(/\\n\\n/g, "\\n");',"function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n");var k=new Function("$data",f);return b?k(b):k},d.Utils.events={},d.Utils.events.click=d.support.touch?"tap":"click",b.UIkit=d,b.fn.uk=d.fn,b.UIkit.langdirection="rtl"==e.attr("dir")?"right":"left",b(function(){if(g.trigger("uk-domready"),setInterval(function(){var a={x:window.scrollX,y:window.scrollY},c=function(){(a.x!=window.scrollX||a.y!=window.scrollY)&&(a={x:window.scrollX,y:window.scrollY},g.trigger("uk-scroll",[a]))};return b.UIkit.support.touch&&g.on("touchmove touchend MSPointerMove MSPointerUp",c),(a.x||a.y)&&c(),c}(),15),d.support.mutationobserver){try{var a=new d.support.mutationobserver(d.Utils.debounce(function(){g.trigger("uk-domready")},150));a.observe(document.body,{childList:!0,subtree:!0})}catch(c){}d.support.touch&&d.Utils.removeCssRules(/\.uk-(?!navbar).*:hover/)}}),e.addClass(d.support.touch?"uk-touch":"uk-notouch"),d.support.touch){var h,i=!1,j=".uk-overlay, .uk-overlay-toggle, .uk-has-hover";g.on("touchstart MSPointerDown",j,function(){i&&b(".uk-hover").removeClass("uk-hover"),i=b(this).addClass("uk-hover")}).on("touchend MSPointerUp",function(a){h=b(a.target).parents(j),i&&i.not(h).removeClass("uk-hover")})}return d}),function(a){a.Promise=a.Promise||function(a,b){function c(a,b){return(typeof b)[0]==a}function d(f,g){return g=function h(i,j,k,l,m,n){if(l=h.q,i!=c)return d(function(a,b){l.push({p:this,r:a,j:b,1:i,0:j})});if(k&&c(a,k)|c(b,k))try{m=k.then}catch(o){j=0,k=o}if(c(a,m)){var p=function(a){return function(b){return m&&(m=0,h(c,a,b))}};try{m.call(k,p(1),j=p(0))}catch(o){j(o)}}else for(g=function(b,g){return c(a,b=j?b:g)?d(function(a,c){e(this,a,c,k,b)}):f},n=0;n<l.length;)m=l[n++],c(a,i=m[j])?e(m.p,m.r,m.j,k,i):(j?m.r:m.j)(k)},g.q=[],f.call(f={then:function(a,b){return g(a,b)},"catch":function(a){return g(0,a)}},function(a){g(c,1,a)},function(a){g(c,0,a)}),f}function e(d,e,f,g,h){setTimeout(function(){try{g=h(g),h=g&&c(b,g)|c(a,g)&&g.then,c(a,h)?g==d?f(TypeError()):h.call(g,e,f):e(g)}catch(i){f(i)}},0)}function f(a){return d(function(b){b(a)})}return d.resolve=f,d.reject=function(a){return d(function(b,c){c(a)})},d.all=function(a){return d(function(b,c,d,e){e=[],d=a.length||b(e),a.map(function(a,g){f(a).then(function(a){e[g]=a,d-=1,d||b(e)},c)})})},d}("f","o")}(this),function(a,b){"use strict";b.components={},b.component=function(c,d){var e=function(b,d){var f=this;this.element=b?a(b):null,this.options=a.extend(!0,{},this.defaults,d),this.plugins={},this.element&&this.element.data(c,this),this.init(),(this.options.plugins.length?this.options.plugins:Object.keys(e.plugins)).forEach(function(a){e.plugins[a].init&&(e.plugins[a].init(f),f.plugins[a]=!0)}),this.trigger("init",[this])};return e.plugins={},a.extend(!0,e.prototype,{defaults:{plugins:[]},init:function(){},on:function(){return a(this.element||this).on.apply(this.element||this,arguments)},one:function(){return a(this.element||this).one.apply(this.element||this,arguments)},off:function(b){return a(this.element||this).off(b)},trigger:function(b,c){return a(this.element||this).trigger(b,c)},find:function(b){return this.element?this.element.find(b):a([])},proxy:function(a,b){var c=this;b.split(" ").forEach(function(b){c[b]||(c[b]=function(){return a[b].apply(a,arguments)})})},mixin:function(a,b){var c=this;b.split(" ").forEach(function(b){c[b]||(c[b]=a[b].bind(c))})}},d),this.components[c]=e,this[c]=function(){var d,e;if(arguments.length)switch(arguments.length){case 1:"string"==typeof arguments[0]||arguments[0].nodeType||arguments[0]instanceof jQuery?d=a(arguments[0]):e=arguments[0];break;case 2:d=a(arguments[0]),e=arguments[1]}return d&&d.data(c)?d.data(c):new b.components[c](d,e)},e},b.plugin=function(a,b,c){this.components[a].plugins[b]=c}}(jQuery,jQuery.UIkit),function(a,b){"use strict";var c=a(window),d="resize orientationchange",e=[];b.component("stackMargin",{defaults:{cls:"uk-margin-small-top"},init:function(){var f=this;this.columns=this.element.children(),this.columns.length&&(c.on(d,function(){var d=function(){f.process()};return a(function(){d(),c.on("load",d)}),b.Utils.debounce(d,150)}()),a(document).on("uk-domready",function(){f.columns=f.element.children(),f.process()}),e.push(this))},process:function(){var b=this;this.revert();var c=!1,d=this.columns.filter(":visible:first"),e=d.length?d.offset().top:!1;if(e!==!1)return this.columns.each(function(){var d=a(this);d.is(":visible")&&(c?d.addClass(b.options.cls):d.offset().top!=e&&(d.addClass(b.options.cls),c=!0))}),this},revert:function(){return this.columns.removeClass(this.options.cls),this}}),a(document).on("uk-domready",function(){a("[data-uk-margin]").each(function(){var c,d=a(this);d.data("stackMargin")||(c=b.stackMargin(d,b.Utils.options(d.attr("data-uk-margin"))))})}),a(document).on("uk-check-display",function(){e.forEach(function(a){a.element.is(":visible")&&a.process()})})}(jQuery,jQuery.UIkit),function(a){function b(a,b,c,d){return Math.abs(a-b)>=Math.abs(c-d)?a-b>0?"Left":"Right":c-d>0?"Up":"Down"}function c(){j=null,l.last&&(l.el.trigger("longTap"),l={})}function d(){j&&clearTimeout(j),j=null}function e(){g&&clearTimeout(g),h&&clearTimeout(h),i&&clearTimeout(i),j&&clearTimeout(j),g=h=i=j=null,l={}}function f(a){return a.pointerType==a.MSPOINTER_TYPE_TOUCH&&a.isPrimary}var g,h,i,j,k,l={},m=750;a(function(){var n,o,p,q=0,r=0;"MSGesture"in window&&(k=new MSGesture,k.target=document.body),a(document).bind("MSGestureEnd",function(a){var b=a.originalEvent.velocityX>1?"Right":a.originalEvent.velocityX<-1?"Left":a.originalEvent.velocityY>1?"Down":a.originalEvent.velocityY<-1?"Up":null;b&&(l.el.trigger("swipe"),l.el.trigger("swipe"+b))}).on("touchstart MSPointerDown",function(b){("MSPointerDown"!=b.type||f(b.originalEvent))&&(p="MSPointerDown"==b.type?b:b.originalEvent.touches[0],n=Date.now(),o=n-(l.last||n),l.el=a("tagName"in p.target?p.target:p.target.parentNode),g&&clearTimeout(g),l.x1=p.pageX,l.y1=p.pageY,o>0&&250>=o&&(l.isDoubleTap=!0),l.last=n,j=setTimeout(c,m),k&&"MSPointerDown"==b.type&&k.addPointer(b.originalEvent.pointerId))}).on("touchmove MSPointerMove",function(a){("MSPointerMove"!=a.type||f(a.originalEvent))&&(p="MSPointerMove"==a.type?a:a.originalEvent.touches[0],d(),l.x2=p.pageX,l.y2=p.pageY,q+=Math.abs(l.x1-l.x2),r+=Math.abs(l.y1-l.y2))}).on("touchend MSPointerUp",function(c){("MSPointerUp"!=c.type||f(c.originalEvent))&&(d(),l.x2&&Math.abs(l.x1-l.x2)>30||l.y2&&Math.abs(l.y1-l.y2)>30?i=setTimeout(function(){l.el.trigger("swipe"),l.el.trigger("swipe"+b(l.x1,l.x2,l.y1,l.y2)),l={}},0):"last"in l&&(isNaN(q)||30>q&&30>r?h=setTimeout(function(){var b=a.Event("tap");b.cancelTouch=e,l.el.trigger(b),l.isDoubleTap?(l.el.trigger("doubleTap"),l={}):g=setTimeout(function(){g=null,l.el.trigger("singleTap"),l={}},250)},0):l={},q=r=0))}).on("touchcancel MSPointerCancel",e),a(window).on("scroll",e)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(b){a.fn[b]=function(c){return a(this).on(b,c)}})}(jQuery),function(a,b){"use strict";b.component("alert",{defaults:{fade:!0,duration:200,trigger:".uk-alert-close"},init:function(){var a=this;this.on("click",this.options.trigger,function(b){b.preventDefault(),a.close()})},close:function(){function a(){b.trigger("closed").remove()}var b=this.trigger("close");this.options.fade?b.css("overflow","hidden").css("max-height",b.height()).animate({height:0,opacity:0,"padding-top":0,"padding-bottom":0,"margin-top":0,"margin-bottom":0},this.options.duration,a):a()}}),a(document).on("click.alert.uikit","[data-uk-alert]",function(c){var d=a(this);if(!d.data("alert")){var e=b.alert(d,b.Utils.options(d.data("uk-alert")));a(c.target).is(d.data("alert").options.trigger)&&(c.preventDefault(),e.close())}})}(jQuery,jQuery.UIkit),function(a,b){"use strict";b.component("buttonRadio",{defaults:{target:".uk-button"},init:function(){var b=this;this.on("click",this.options.target,function(c){a(this).is('a[href="#"]')&&c.preventDefault(),b.find(b.options.target).not(this).removeClass("uk-active").blur(),b.trigger("change",[a(this).addClass("uk-active")])})},getSelected:function(){this.find(".uk-active")}}),b.component("buttonCheckbox",{defaults:{target:".uk-button"},init:function(){var b=this;this.on("click",this.options.target,function(c){a(this).is('a[href="#"]')&&c.preventDefault(),b.trigger("change",[a(this).toggleClass("uk-active").blur()])})},getSelected:function(){this.find(".uk-active")}}),b.component("button",{defaults:{},init:function(){var a=this;this.on("click",function(b){a.element.is('a[href="#"]')&&b.preventDefault(),a.toggle(),a.trigger("change",[$element.blur().hasClass("uk-active")])})},toggle:function(){this.element.toggleClass("uk-active")}}),a(document).on("click.buttonradio.uikit","[data-uk-button-radio]",function(c){var d=a(this);if(!d.data("buttonRadio")){var e=b.buttonRadio(d,b.Utils.options(d.attr("data-uk-button-radio")));a(c.target).is(e.options.target)&&a(c.target).trigger("click")}}),a(document).on("click.buttoncheckbox.uikit","[data-uk-button-checkbox]",function(c){var d=a(this);if(!d.data("buttonCheckbox")){var e=b.buttonCheckbox(d,b.Utils.options(d.attr("data-uk-button-checkbox"))),f=a(c.target);f.is(e.options.target)&&d.trigger("change",[f.toggleClass("uk-active").blur()])}}),a(document).on("click.button.uikit","[data-uk-button]",function(){var c=a(this);if(!c.data("button")){{b.button(c,b.Utils.options(c.attr("data-uk-button")))}c.trigger("click")}})}(jQuery,jQuery.UIkit),function(a,b){"use strict";var c,d=!1;b.component("dropdown",{defaults:{mode:"hover",remaintime:800,justify:!1,boundary:a(window),delay:0},remainIdle:!1,init:function(){var e=this;this.dropdown=this.find(".uk-dropdown"),this.centered=this.dropdown.hasClass("uk-dropdown-center"),this.justified=this.options.justify?a(this.options.justify):!1,this.boundary=a(this.options.boundary),this.flipped=this.dropdown.hasClass("uk-dropdown-flip"),this.boundary.length||(this.boundary=a(window)),"click"==this.options.mode||b.support.touch?this.on("click",function(b){var c=a(b.target);c.parents(".uk-dropdown").length||((c.is("a[href='#']")||c.parent().is("a[href='#']"))&&b.preventDefault(),c.blur()),e.element.hasClass("uk-open")?(c.is("a:not(.js-uk-prevent)")||c.is(".uk-dropdown-close")||!e.dropdown.find(b.target).length)&&(e.element.removeClass("uk-open"),d=!1):e.show()}):this.on("mouseenter",function(){e.remainIdle&&clearTimeout(e.remainIdle),c&&clearTimeout(c),c=setTimeout(e.show.bind(e),e.options.delay)}).on("mouseleave",function(){c&&clearTimeout(c),e.remainIdle=setTimeout(function(){e.element.removeClass("uk-open"),e.remainIdle=!1,d&&d[0]==e.element[0]&&(d=!1)},e.options.remaintime)}).on("click",function(b){var c=a(b.target);e.remainIdle&&clearTimeout(e.remainIdle),(c.is("a[href='#']")||c.parent().is("a[href='#']"))&&b.preventDefault(),e.show()})},show:function(){d&&d[0]!=this.element[0]&&d.removeClass("uk-open"),c&&clearTimeout(c),this.checkDimensions(),this.element.addClass("uk-open"),this.trigger("uk.dropdown.show",[this]),d=this.element,this.registerOuterClick()},registerOuterClick:function(){var b=this;a(document).off("click.outer.dropdown"),setTimeout(function(){a(document).on("click.outer.dropdown",function(e){c&&clearTimeout(c);var f=a(e.target);d&&d[0]==b.element[0]&&(f.is("a:not(.js-uk-prevent)")||f.is(".uk-dropdown-close")||!b.dropdown.find(e.target).length)&&(d.removeClass("uk-open"),a(document).off("click.outer.dropdown"))})},10)},checkDimensions:function(){if(this.dropdown.length){this.justified&&this.justified.length&&this.dropdown.css("min-width","");var b=this,c=this.dropdown.css("margin-"+a.UIkit.langdirection,""),d=c.show().offset(),e=c.outerWidth(),f=this.boundary.width(),g=this.boundary.offset()?this.boundary.offset().left:0;if(this.centered&&(c.css("margin-"+a.UIkit.langdirection,-1*(parseFloat(e)/2-c.parent().width()/2)),d=c.offset(),(e+d.left>f||d.left<0)&&(c.css("margin-"+a.UIkit.langdirection,""),d=c.offset())),this.justified&&this.justified.length){var h=this.justified.outerWidth();if(c.css("min-width",h),"right"==a.UIkit.langdirection){var i=f-(this.justified.offset().left+h),j=f-(c.offset().left+c.outerWidth());c.css("margin-right",i-j)}else c.css("margin-left",this.justified.offset().left-d.left);d=c.offset()}e+(d.left-g)>f&&(c.addClass("uk-dropdown-flip"),d=c.offset()),d.left-g<0&&(c.addClass("uk-dropdown-stack"),c.hasClass("uk-dropdown-flip")&&(this.flipped||(c.removeClass("uk-dropdown-flip"),d=c.offset(),c.addClass("uk-dropdown-flip")),setTimeout(function(){(c.offset().left-g<0||!b.flipped&&c.outerWidth()+(d.left-g)<f)&&c.removeClass("uk-dropdown-flip")},0)),this.trigger("uk.dropdown.stack",[this])),c.css("display","")}}});var e=b.support.touch?"click":"mouseenter";a(document).on(e+".dropdown.uikit","[data-uk-dropdown]",function(c){var d=a(this);if(!d.data("dropdown")){var f=b.dropdown(d,b.Utils.options(d.data("uk-dropdown")));("click"==e||"mouseenter"==e&&"hover"==f.options.mode)&&f.element.trigger(e),f.element.find(".uk-dropdown").length&&c.preventDefault()}})}(jQuery,jQuery.UIkit),function(a,b){"use strict";var c=a(window),d="resize orientationchange",e=[];b.component("gridMatchHeight",{defaults:{target:!1,row:!0},init:function(){var f=this;this.columns=this.element.children(),this.elements=this.options.target?this.find(this.options.target):this.columns,this.columns.length&&(c.on(d,function(){var d=function(){f.match()};return a(function(){d(),c.on("load",d)}),b.Utils.debounce(d,150)}()),a(document).on("uk-domready",function(){f.columns=f.element.children(),f.elements=f.options.target?f.find(f.options.target):f.columns,f.match()}),e.push(this))},match:function(){this.revert();var b=this.columns.filter(":visible:first");if(b.length){var c=Math.ceil(100*parseFloat(b.css("width"))/parseFloat(b.parent().css("width")))>=100?!0:!1,d=this;if(!c)return this.options.row?(this.element.width(),setTimeout(function(){var b=!1,c=[];d.elements.each(function(){var e=a(this),f=e.offset().top;f!=b&&c.length&&(d.matchHeights(a(c)),c=[],f=e.offset().top),c.push(e),b=f}),c.length&&d.matchHeights(a(c))},0)):this.matchHeights(this.elements),this}},revert:function(){return this.elements.css("min-height",""),this},matchHeights:function(b){if(!(b.length<2)){var c=0;b.each(function(){c=Math.max(c,a(this).outerHeight())}).each(function(){var b=a(this),d=c-(b.outerHeight()-b.height());b.css("min-height",d+"px")})}}}),b.component("gridMargin",{defaults:{cls:"uk-grid-margin"},init:function(){b.stackMargin(this.element,this.options)}}),a(document).on("uk-domready",function(){a("[data-uk-grid-match],[data-uk-grid-margin]").each(function(){var c,d=a(this);d.is("[data-uk-grid-match]")&&!d.data("gridMatchHeight")&&(c=b.gridMatchHeight(d,b.Utils.options(d.attr("data-uk-grid-match")))),d.is("[data-uk-grid-margin]")&&!d.data("gridMargin")&&(c=b.gridMargin(d,b.Utils.options(d.attr("data-uk-grid-margin"))))})}),a(document).on("uk-check-display",function(){e.forEach(function(a){a.element.is(":visible")&&a.match()})})}(jQuery,jQuery.UIkit),function(a,b,c){"use strict";function d(b,c){return c?("object"==typeof b?(b=b instanceof jQuery?b:a(b),b.parent().length&&(c.persist=b,c.persist.data("modalPersistParent",b.parent()))):b=a("<div></div>").html("string"==typeof b||"number"==typeof b?b:"$.UIkitt.modal Error: Unsupported data type: "+typeof b),b.appendTo(c.element.find(".uk-modal-dialog")),c):void 0}var e,f=!1,g=a("html");b.component("modal",{defaults:{keyboard:!0,bgclose:!0,minScrollHeight:150},scrollable:!1,transition:!1,init:function(){e||(e=a("body"));var c=this;this.transition=b.support.transition,this.dialog=this.find(".uk-modal-dialog"),this.on("click",".uk-modal-close",function(a){a.preventDefault(),c.hide()}).on("click",function(b){var d=a(b.target);d[0]==c.element[0]&&c.options.bgclose&&c.hide()})},toggle:function(){return this[this.isActive()?"hide":"show"]()},show:function(){if(!this.isActive())return f&&f.hide(!0),this.element.removeClass("uk-open").show(),this.resize(),f=this,g.addClass("uk-modal-page").height(),this.element.addClass("uk-open").trigger("uk.modal.show"),a(document).trigger("uk-check-display"),this},hide:function(a){if(this.isActive()){if(!a&&b.support.transition){var c=this;this.one(b.support.transition.end,function(){c._hide()}).removeClass("uk-open")}else this._hide();return this}},resize:function(){var a="padding-"+("left"==b.langdirection?"left":"right"),c="margin-"+("left"==b.langdirection?"left":"right"),d=e.width();this.scrollbarwidth=window.innerWidth-d,g.css(c,-1*this.scrollbarwidth),this.element.css(a,""),this.dialog.offset().left>this.scrollbarwidth&&this.element.css(a,this.scrollbarwidth-(this.element[0].scrollHeight==window.innerHeight?0:this.scrollbarwidth)),this.updateScrollable()},updateScrollable:function(){var a=this.dialog.find(".uk-overflow-container:visible:first");if(a){a.css("height",0);var b=Math.abs(parseInt(this.dialog.css("margin-top"),10)),c=this.dialog.outerHeight(),d=window.innerHeight,e=d-2*(20>b?20:b)-c;a.css("height",e<this.options.minScrollHeight?"":e)}},_hide:function(){this.element.hide().removeClass("uk-open"),g.removeClass("uk-modal-page").css("margin-"+("left"==b.langdirection?"left":"right"),""),f===this&&(f=!1),this.trigger("uk.modal.hide")},isActive:function(){return f==this}}),b.component("modalTrigger",{init:function(){var c=this;this.options=a.extend({target:c.element.is("a")?c.element.attr("href"):!1},this.options),this.modal=b.modal(this.options.target,this.options),this.on("click",function(a){a.preventDefault(),c.show()}),this.proxy(this.modal,"show hide isActive")}}),b.modal.dialog=function(c,e){var f=b.modal(a(b.modal.dialog.template).appendTo("body"),e);return f.on("uk.modal.hide",function(){f.persist&&(f.persist.appendTo(f.persist.data("modalPersistParent")),f.persist=!1),f.element.remove()}),d(c,f),f},b.modal.dialog.template='<div class="uk-modal"><div class="uk-modal-dialog"></div></div>',b.modal.alert=function(c,d){b.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(c)+"</div>",'<div class="uk-modal-buttons"><button class="uk-button uk-button-primary uk-modal-close">Ok</button></div>'].join(""),a.extend({bgclose:!1,keyboard:!1},d)).show()},b.modal.confirm=function(c,d,e){d=a.isFunction(d)?d:function(){};var f=b.modal.dialog(['<div class="uk-margin uk-modal-content">'+String(c)+"</div>",'<div class="uk-modal-buttons"><button class="uk-button uk-button-primary js-modal-confirm">Ok</button> <button class="uk-button uk-modal-close">Cancel</button></div>'].join(""),a.extend({bgclose:!1,keyboard:!1},e));f.element.find(".js-modal-confirm").on("click",function(){d(),f.hide()}),f.show()},a(document).on("click.modal.uikit","[data-uk-modal]",function(c){var d=a(this);if(d.is("a")&&c.preventDefault(),!d.data("modalTrigger")){var e=b.modalTrigger(d,b.Utils.options(d.attr("data-uk-modal")));e.show()}}),a(document).on("keydown.modal.uikit",function(a){f&&27===a.keyCode&&f.options.keyboard&&(a.preventDefault(),f.hide())}),c.on("resize orientationchange",b.Utils.debounce(function(){f&&f.resize()},150))}(jQuery,jQuery.UIkit,jQuery(window)),function(a,b){"use strict";var c={x:window.scrollX,y:window.scrollY},d=a(window),e=a(document),f=a("html"),g={show:function(b){if(b=a(b),b.length){var h=a("body"),i=(d.width(),b.find(".uk-offcanvas-bar:first")),j="right"==a.UIkit.langdirection,k=i.hasClass("uk-offcanvas-bar-flip")?-1:1,l=k*(j?-1:1);c={x:window.scrollX,y:window.scrollY},b.addClass("uk-active"),h.css({width:window.innerWidth,height:d.height()}).addClass("uk-offcanvas-page"),h.css(j?"margin-right":"margin-left",(j?-1:1)*i.outerWidth()*l).width(),f.css("margin-top",-1*c.y),i.addClass("uk-offcanvas-bar-show"),b.off(".ukoffcanvas").on("click.ukoffcanvas swipeRight.ukoffcanvas swipeLeft.ukoffcanvas",function(b){var c=a(b.target);if(!b.type.match(/swipe/)&&!c.hasClass("uk-offcanvas-close")){if(c.hasClass("uk-offcanvas-bar"))return;if(c.parents(".uk-offcanvas-bar:first").length)return}b.stopImmediatePropagation(),g.hide()}),e.on("keydown.ukoffcanvas",function(a){27===a.keyCode&&g.hide()})}},hide:function(b){var d=a("body"),g=a(".uk-offcanvas.uk-active"),h="right"==a.UIkit.langdirection,i=g.find(".uk-offcanvas-bar:first");g.length&&(a.UIkit.support.transition&&!b?(d.one(a.UIkit.support.transition.end,function(){d.removeClass("uk-offcanvas-page").css({width:"",height:""}),g.removeClass("uk-active"),f.css("margin-top",""),window.scrollTo(c.x,c.y)}).css(h?"margin-right":"margin-left",""),setTimeout(function(){i.removeClass("uk-offcanvas-bar-show")},0)):(d.removeClass("uk-offcanvas-page").css({width:"",height:""}),g.removeClass("uk-active"),i.removeClass("uk-offcanvas-bar-show"),f.css("margin-top",""),window.scrollTo(c.x,c.y)),g.off(".ukoffcanvas"),e.off(".ukoffcanvas"))}};b.component("offcanvasTrigger",{init:function(){var b=this;this.options=a.extend({target:b.element.is("a")?b.element.attr("href"):!1},this.options),this.on("click",function(a){a.preventDefault(),g.show(b.options.target)})}}),b.offcanvas=g,e.on("click.offcanvas.uikit","[data-uk-offcanvas]",function(c){c.preventDefault();var d=a(this);if(!d.data("offcanvasTrigger")){{b.offcanvasTrigger(d,b.Utils.options(d.attr("data-uk-offcanvas")))}d.trigger("click")}})}(jQuery,jQuery.UIkit),function(a,b){"use strict";function c(b){var c=a(b),d="auto";if(c.is(":visible"))d=c.outerHeight();else{var e={position:c.css("position"),visibility:c.css("visibility"),display:c.css("display")};d=c.css({position:"absolute",visibility:"hidden",display:"block"}).outerHeight(),c.css(e)}return d}b.component("nav",{defaults:{toggle:">li.uk-parent > a[href='#']",lists:">li.uk-parent > ul",multiple:!1},init:function(){var b=this;this.on("click",this.options.toggle,function(c){c.preventDefault();var d=a(this);b.open(d.parent()[0]==b.element[0]?d:d.parent("li"))}),this.find(this.options.lists).each(function(){var c=a(this),d=c.parent(),e=d.hasClass("uk-active");c.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>'),d.data("list-container",c.parent()),e&&b.open(d,!0)})},open:function(b,d){var e=this.element,f=a(b);this.options.multiple||e.children(".uk-open").not(b).each(function(){a(this).data("list-container")&&a(this).data("list-container").stop().animate({height:0},function(){a(this).parent().removeClass("uk-open")})}),f.toggleClass("uk-open"),f.data("list-container")&&(d?f.data("list-container").stop().height(f.hasClass("uk-open")?"auto":0):f.data("list-container").stop().animate({height:f.hasClass("uk-open")?c(f.data("list-container").find("ul:first")):0}))}}),a(document).on("uk-domready",function(){a("[data-uk-nav]").each(function(){var c=a(this);if(!c.data("nav")){b.nav(c,b.Utils.options(c.attr("data-uk-nav")))}})})}(jQuery,jQuery.UIkit),function(a,b,c){"use strict";var d,e;b.component("tooltip",{defaults:{offset:5,pos:"top",animation:!1,delay:0,src:function(){return this.attr("title")}},tip:"",init:function(){var b=this;d||(d=a('<div class="uk-tooltip"></div>').appendTo("body")),this.on({focus:function(){b.show()},blur:function(){b.hide()},mouseenter:function(){b.show()},mouseleave:function(){b.hide()}}),this.tip="function"==typeof this.options.src?this.options.src.call(this.element):this.options.src,this.element.attr("data-cached-title",this.element.attr("title")).attr("title","")},show:function(){if(e&&clearTimeout(e),this.tip.length){d.stop().css({top:-2e3,visibility:"hidden"}).show(),d.html('<div class="uk-tooltip-inner">'+this.tip+"</div>");var b=this,c=a("body").offset(),f=a.extend({},this.element.offset(),{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}),g=d[0].offsetWidth,h=d[0].offsetHeight,i="function"==typeof this.options.offset?this.options.offset.call(this.element):this.options.offset,j="function"==typeof this.options.pos?this.options.pos.call(this.element):this.options.pos,k=j.split("-"),l={display:"none",visibility:"visible",top:f.top+f.height+h,left:f.left};f.left-=c.left,f.top-=c.top,"left"!=k[0]&&"right"!=k[0]||"right"!=a.UIkit.langdirection||(k[0]="left"==k[0]?"right":"left");var m={bottom:{top:f.top+f.height+i,left:f.left+f.width/2-g/2},top:{top:f.top-h-i,left:f.left+f.width/2-g/2},left:{top:f.top+f.height/2-h/2,left:f.left-g-i},right:{top:f.top+f.height/2-h/2,left:f.left+f.width+i}};a.extend(l,m[k[0]]),2==k.length&&(l.left="left"==k[1]?f.left:f.left+f.width-g);var n=this.checkBoundary(l.left,l.top,g,h);if(n){switch(n){case"x":j=2==k.length?k[0]+"-"+(l.left<0?"left":"right"):l.left<0?"right":"left";break;case"y":j=2==k.length?(l.top<0?"bottom":"top")+"-"+k[1]:l.top<0?"bottom":"top";break;case"xy":j=2==k.length?(l.top<0?"bottom":"top")+"-"+(l.left<0?"left":"right"):l.left<0?"right":"left"}k=j.split("-"),a.extend(l,m[k[0]]),2==k.length&&(l.left="left"==k[1]?f.left:f.left+f.width-g)}l.left-=a("body").position().left,e=setTimeout(function(){d.css(l).attr("class","uk-tooltip uk-tooltip-"+j),b.options.animation?d.css({opacity:0,display:"block"}).animate({opacity:1},parseInt(b.options.animation,10)||400):d.show(),e=!1},parseInt(this.options.delay,10)||0)}},hide:function(){this.element.is("input")&&this.element[0]===document.activeElement||(e&&clearTimeout(e),d.stop(),this.options.animation?d.fadeOut(parseInt(this.options.animation,10)||400):d.hide())},content:function(){return this.tip},checkBoundary:function(a,b,d,e){var f="";return(0>a||a-c.scrollLeft()+d>window.innerWidth)&&(f+="x"),(0>b||b-c.scrollTop()+e>window.innerHeight)&&(f+="y"),f}}),a(document).on("mouseenter.tooltip.uikit focus.tooltip.uikit","[data-uk-tooltip]",function(){var c=a(this);if(!c.data("tooltip")){{b.tooltip(c,b.Utils.options(c.attr("data-uk-tooltip")))}c.trigger("mouseenter")}})}(jQuery,jQuery.UIkit,jQuery(window)),function(a,b){"use strict";b.component("switcher",{defaults:{connect:!1,toggle:">*",active:0},init:function(){var b=this;if(this.on("click",this.options.toggle,function(a){a.preventDefault(),b.show(this)}),this.options.connect){this.connect=a(this.options.connect).find(".uk-active").removeClass(".uk-active").end();var c=this.find(this.options.toggle),d=c.filter(".uk-active");d.length?this.show(d):(d=c.eq(this.options.active),this.show(d.length?d:c.eq(0)))}},show:function(b){b=isNaN(b)?a(b):this.find(this.options.toggle).eq(b);var c=b;if(!c.hasClass("uk-disabled")){if(this.find(this.options.toggle).filter(".uk-active").removeClass("uk-active"),c.addClass("uk-active"),this.options.connect&&this.connect.length){var d=this.find(this.options.toggle).index(c);this.connect.children().removeClass("uk-active").eq(d).addClass("uk-active")}this.trigger("uk.switcher.show",[c]),a(document).trigger("uk-check-display")}}}),a(document).on("uk-domready",function(){a("[data-uk-switcher]").each(function(){var c=a(this);if(!c.data("switcher")){b.switcher(c,b.Utils.options(c.attr("data-uk-switcher")))}})})}(jQuery,jQuery.UIkit),function(a,b){"use strict";b.component("tab",{defaults:{connect:!1,active:0},init:function(){var b=this;if(this.on("click",this.options.target,function(c){c.preventDefault(),b.find(b.options.target).not(this).removeClass("uk-active").blur(),b.trigger("change",[a(this).addClass("uk-active")])}),this.options.connect&&(this.connect=a(this.options.connect)),location.hash&&location.hash.match(/^#[a-z0-9_-]+$/)){var c=this.element.children().filter(window.location.hash);c.length&&this.element.children().removeClass("uk-active").filter(c).addClass("uk-active")}var d=a('<li class="uk-tab-responsive uk-active"><a href="javascript:void(0);"></a></li>'),e=d.find("a:first"),f=a('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>'),g=f.find("ul");e.html(this.find("li.uk-active:first").find("a").text()),this.element.hasClass("uk-tab-bottom")&&f.addClass("uk-dropdown-up"),this.element.hasClass("uk-tab-flip")&&f.addClass("uk-dropdown-flip"),this.find("a").each(function(c){var d=a(this).parent(),e=a('<li><a href="javascript:void(0);">'+d.text()+"</a></li>").on("click",function(){b.element.data("switcher").show(c)
});a(this).parents(".uk-disabled:first").length||g.append(e)}),this.element.uk("switcher",{toggle:">li:not(.uk-tab-responsive)",connect:this.options.connect,active:this.options.active}),d.append(f).uk("dropdown",{mode:"click"}),this.element.append(d).data({dropdown:d.data("dropdown"),mobilecaption:e}).on("uk.switcher.show",function(a,b){d.addClass("uk-active"),e.html(b.find("a").text())})}}),a(document).on("uk-domready",function(){a("[data-uk-tab]").each(function(){var c=a(this);if(!c.data("tab")){b.tab(c,b.Utils.options(c.attr("data-uk-tab")))}})})}(jQuery,jQuery.UIkit),function(a,b){"use strict";var c=a(window),d=a(document),e=[],f=function(){for(var a=0;a<e.length;a++)b.support.requestAnimationFrame.apply(window,[e[a].check])};b.component("scrollspy",{defaults:{cls:"uk-scrollspy-inview",initcls:"uk-scrollspy-init-inview",topoffset:0,leftoffset:0,repeat:!1,delay:0},init:function(){var a,c,d,f=this,g=function(){var e=b.Utils.isInView(f.element,f.options);e&&!c&&(a&&clearTimeout(a),d||(f.element.addClass(f.options.initcls),f.offset=f.element.offset(),d=!0,f.trigger("uk.scrollspy.init")),a=setTimeout(function(){e&&f.element.addClass("uk-scrollspy-inview").addClass(f.options.cls).width()},f.options.delay),c=!0,f.trigger("uk.scrollspy.inview")),!e&&c&&f.options.repeat&&(f.element.removeClass("uk-scrollspy-inview").removeClass(f.options.cls),c=!1,f.trigger("uk.scrollspy.outview"))};g(),this.check=g,e.push(this)}});var g=[],h=function(){for(var a=0;a<g.length;a++)b.support.requestAnimationFrame.apply(window,[g[a].check])};b.component("scrollspynav",{defaults:{cls:"uk-active",closest:!1,topoffset:0,leftoffset:0,smoothscroll:!1},init:function(){var d,e=[],f=this.find("a[href^='#']").each(function(){e.push(a(this).attr("href"))}),h=a(e.join(",")),i=this,j=function(){d=[];for(var a=0;a<h.length;a++)b.Utils.isInView(h.eq(a),i.options)&&d.push(h.eq(a));if(d.length){var e=c.scrollTop(),g=function(){for(var a=0;a<d.length;a++)if(d[a].offset().top>=e)return d[a]}();if(!g)return;i.options.closest?f.closest(i.options.closest).removeClass(i.options.cls).end().filter("a[href='#"+g.attr("id")+"']").closest(i.options.closest).addClass(i.options.cls):f.removeClass(i.options.cls).filter("a[href='#"+g.attr("id")+"']").addClass(i.options.cls)}};this.options.smoothscroll&&b.smoothScroll&&f.each(function(){b.smoothScroll(this,i.options.smoothscroll)}),j(),this.element.data("scrollspynav",this),this.check=j,g.push(this)}});var i=function(){f(),h()};d.on("uk-scroll",i),c.on("resize orientationchange",b.Utils.debounce(i,50)),d.on("uk-domready",function(){a("[data-uk-scrollspy]").each(function(){var c=a(this);if(!c.data("scrollspy")){b.scrollspy(c,b.Utils.options(c.attr("data-uk-scrollspy")))}}),a("[data-uk-scrollspy-nav]").each(function(){var c=a(this);if(!c.data("scrollspynav")){b.scrollspynav(c,b.Utils.options(c.attr("data-uk-scrollspy-nav")))}})})}(jQuery,jQuery.UIkit),function(a,b){"use strict";b.component("smoothScroll",{defaults:{duration:1e3,transition:"easeOutExpo",offset:0,complete:function(){}},init:function(){var b=this;this.on("click",function(){{var c=a(a(this.hash).length?this.hash:"body"),d=c.offset().top-b.options.offset,e=a(document).height(),f=a(window).height();c.outerHeight()}return d+f>e&&(d=e-f),a("html,body").stop().animate({scrollTop:d},b.options.duration,b.options.transition).promise().done(b.options.complete),!1})}}),a.easing.easeOutExpo||(a.easing.easeOutExpo=function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c}),a(document).on("click.smooth-scroll.uikit","[data-uk-smooth-scroll]",function(){var c=a(this);if(!c.data("smoothScroll")){{b.smoothScroll(c,b.Utils.options(c.attr("data-uk-smooth-scroll")))}c.trigger("click")}return!1})}(jQuery,jQuery.UIkit),function(a,b,c){c.component("toggle",{defaults:{target:!1,cls:"uk-hidden"},init:function(){var a=this;this.totoggle=this.options.target?b(this.options.target):[],this.on("click",function(b){a.element.is('a[href="#"]')&&b.preventDefault(),a.toggle()})},toggle:function(){this.totoggle.length&&(this.totoggle.toggleClass(this.options.cls),"uk-hidden"==this.options.cls&&b(document).trigger("uk-check-display"))}}),b(document).on("uk-domready",function(){b("[data-uk-toggle]").each(function(){var a=b(this);if(!a.data("toggle")){c.toggle(a,c.Utils.options(a.attr("data-uk-toggle")))}})})}(this,jQuery,jQuery.UIkit);;// Avoid `console` errors in browsers that lack a console.
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
            dataType: 'json'
        })
        .done(function(data) {
            console.log("success");
            console.log(data);
            _this.score++;

            $icon.removeClass('uk-icon-spinner');
            $icon.addClass('uk-icon-check');
            $row.addClass('uk-badge-success');

        })
        .fail(function(data) {
            console.log("error");
            console.log(data.responseJSON);

            $icon.removeClass('uk-icon-spinner');
            $icon.addClass('uk-icon-warning');
            $row.addClass('uk-badge-danger');

            $row.parent().parent().after("<tr><td class=\"uk-alert uk-alert-danger\" colspan=\"3\">"+data.responseJSON.error+"</td></tr>");
        })
        .always(function(data) {
            console.log("complete");
            $icon.removeClass('uk-icon-spin');

            _this.callSingleImport(index + 1);
        });
    } else {

        if(_this.score === _this.routes.length){
            $('#next-step-button').removeClass('uk-button-disabled');
        }
    }
};;var ImportNodeType = function ( routesArray ) {
    var _this = this;

    _this.routes = routesArray;

    _this.callSingleImport(0);
};

ImportNodeType.prototype.routes = null;
ImportNodeType.prototype.score = 0;

ImportNodeType.prototype.always = function( index, data ) {
    var _this = this;

    if (typeof data.request != "undefined") {
        $.ajax({
            url:data.request,
            type: 'GET',
            dataType: 'json'
        })
        .always(function() {
            console.log("updateSchema");
            _this.callSingleImport(index + 1);
        });
    } else {
        _this.callSingleImport(index + 1);
    }
};

ImportNodeType.prototype.callSingleImport = function( index ) {
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
            dataType: 'json'
        })
        .done(function(data) {
            console.log("success");
            console.log(data);

            $icon.removeClass('uk-icon-spinner');
            $icon.addClass('uk-icon-check');
            $row.addClass('uk-badge-success');
            _this.always(index, data);
        })
        .fail(function(data) {
            console.log("error");
            console.log(data.responseJSON);

            $icon.removeClass('uk-icon-spinner');
            $icon.addClass('uk-icon-warning');
            $row.addClass('uk-badge-danger');

            $row.parent().parent().after("<tr><td class=\"uk-alert uk-alert-danger\" colspan=\"3\">"+data.responseJSON.error+"</td></tr>");

            _this.always(index, data.responseJSON);
        })
        .always(function(data) {
            console.log("complete");
            console.log(data);
            $icon.removeClass('uk-icon-spin');

        });
    } else {
        $('#next-step-button').removeClass('uk-button-disabled');
    }
};;var SelectDatabaseField = function () {
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