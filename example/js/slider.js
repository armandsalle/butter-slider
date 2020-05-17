// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreateSLider = function CreateSLider(container, slider, options) {
  var _this = this,
      _this$options9,
      _this$options10,
      _this$options11;

  _classCallCheck(this, CreateSLider);

  _defineProperty(this, "map", function (value, x1, y1, x2, y2) {
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
  });

  _defineProperty(this, "callCallback", function (type, value) {
    var _this$options, _this$options2, _this$options3, _this$options4, _this$options5, _this$options6, _this$options7, _this$options8;

    switch (type) {
      case 'mousedown':
        if (((_this$options = _this.options) === null || _this$options === void 0 ? void 0 : _this$options.mouseDown) && typeof ((_this$options2 = _this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.mouseDown) === 'function') {
          _this.options.mouseDown();
        }

        break;

      case 'mouseleave':
        if (((_this$options3 = _this.options) === null || _this$options3 === void 0 ? void 0 : _this$options3.mouseLeave) && typeof ((_this$options4 = _this.options) === null || _this$options4 === void 0 ? void 0 : _this$options4.mouseLeave) === 'function') {
          _this.options.mouseLeave();
        }

        break;

      case 'mouseup':
        if (((_this$options5 = _this.options) === null || _this$options5 === void 0 ? void 0 : _this$options5.mouseUp) && typeof ((_this$options6 = _this.options) === null || _this$options6 === void 0 ? void 0 : _this$options6.mouseUp) === 'function') {
          _this.options.mouseUp();
        }

        break;

      case 'mousemove':
        if (_this.options.mouseEnter && typeof _this.options.mouseEnter === 'function') {
          _this.options.mouseEnter();
        }

        break;

      case 'scrollpercent':
        if (((_this$options7 = _this.options) === null || _this$options7 === void 0 ? void 0 : _this$options7.scrollPercent) && typeof ((_this$options8 = _this.options) === null || _this$options8 === void 0 ? void 0 : _this$options8.scrollPercent) === 'function') {
          _this.options.scrollPercent(value);
        }

      default:
        break;
    }
  });

  _defineProperty(this, "getEvent", function (event) {
    return event.targetTouches ? event.targetTouches[0] : event;
  });

  _defineProperty(this, "mousedown", function (e) {
    if (!_this.isAnimating) {
      _this.anime();
    }

    var event = _this.getEvent(e);

    _this.down = true;
    _this.startX = event.pageX - _this.sliderTag.offsetLeft;
    _this.scrollLeft = _this.scrollAmount;

    _this.sliderTag.classList.add('active');

    _this.callCallback('mousedown');
  });

  _defineProperty(this, "mouseleave", function () {
    _this.down = false;

    _this.sliderTag.classList.remove('active');

    _this.callCallback('mouseleave');
  });

  _defineProperty(this, "mouseup", function () {
    _this.down = false;

    _this.sliderTag.classList.remove('active');

    _this.callCallback('mouseup');
  });

  _defineProperty(this, "mousemove", function (e) {
    _this.callCallback('mousemove');

    e.preventDefault();

    var event = _this.getEvent(e);

    if (!_this.down) return;
    _this.x = event.pageX - _this.sliderTag.offsetLeft;
    _this.dist = _this.scrollLeft - (_this.x - _this.startX) * _this.multiplicateur;
  });

  _defineProperty(this, "getScrollPercent", function () {
    var scrollPercent = _this.map(_this.scrollAmount, 0, _this.sliderTag.scrollWidth - _this.sliderTag.offsetWidth, 0, 100);

    _this.callCallback('scrollpercent', scrollPercent.toFixed(2));
  });

  _defineProperty(this, "anime", function () {
    console.log('running');
    _this.isAnimating = true; // Can't go over the slider

    if (_this.dist + _this.scrollAmount <= 0) {
      _this.dist = 0;
    }

    if (_this.dist >= _this.sliderTag.scrollWidth - _this.sliderTag.offsetWidth) {
      _this.dist = _this.sliderTag.scrollWidth - _this.sliderTag.offsetWidth;
    } // LERP functions


    _this.scrollAmount += (_this.dist - _this.scrollAmount) * _this.smoothAmount;
    _this.sliderTag.style.transform = "translate3D(".concat(-_this.scrollAmount.toFixed(2), "px, 0, 0)");

    _this.getScrollPercent();

    if (_this.stopAnimation) {
      cancelAnimationFrame(_this.anime);
    } else {
      requestAnimationFrame(_this.anime);
    }
  });

  _defineProperty(this, "init", function () {
    _this.isAnimating = false;
    _this.stopAnimation = false;

    _this.getScrollPercent();

    var isTouchScreen = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (!isTouchScreen) {
      _this.containerTag.addEventListener('mousedown', _this.mousedown);

      _this.containerTag.addEventListener('mouseleave', _this.mouseleave);

      _this.containerTag.addEventListener('mouseup', _this.mouseup);

      _this.containerTag.addEventListener('mousemove', _this.mousemove);
    } else if (isTouchScreen && _this.options.noTouchEvent === false) {
      _this.containerTag.addEventListener('touchstart', _this.mousedown);

      _this.containerTag.addEventListener('touchleave', _this.mouseleave);

      _this.containerTag.addEventListener('touchend', _this.mouseup);

      _this.containerTag.addEventListener('touchmove', _this.mousemove);
    } else if (isTouchScreen && _this.options.noTouchEvent === true) {
      _this.containerTag.style.overflowX = 'scroll';
    }
  });

  _defineProperty(this, "destroy", function () {
    _this.stopAnimation = true;

    _this.containerTag.removeEventListener('mousedown', _this.mousedown);

    _this.containerTag.removeEventListener('mouseleave', _this.mouseleave);

    _this.containerTag.removeEventListener('mouseup', _this.mouseup);

    _this.containerTag.removeEventListener('mousemove', _this.mousemove);

    _this.containerTag.removeEventListener('touchstart', _this.mousedown);

    _this.containerTag.removeEventListener('touchleave', _this.mouseleave);

    _this.containerTag.removeEventListener('touchend', _this.mouseup);

    _this.containerTag.removeEventListener('touchmove', _this.mousemove);
  });

  this.containerTag = document.querySelector(container);
  this.sliderTag = document.querySelector(slider);

  if (this.sliderTag === null) {
    console.error('Target element does not exist on the page. ', this.sliderTag);
    return;
  } else if (this.containerTag === null) {
    console.error('Target element does not exist on the page. ', this.containerTag);
    return;
  }

  this.options = _objectSpread({}, options);
  this.multiplicateur = parseInt((_this$options9 = this.options) === null || _this$options9 === void 0 ? void 0 : _this$options9.multiplicateur) || 1;
  this.smoothAmount = parseFloat((_this$options10 = this.options) === null || _this$options10 === void 0 ? void 0 : _this$options10.smoothAmount).toFixed(2) || 0.15;

  if ((_this$options11 = this.options) === null || _this$options11 === void 0 ? void 0 : _this$options11.noTouchEvent) {
    this.options.noTouchEvent = true;
  } else {
    this.options.noTouchEvent = false;
  }

  this.down = false;
  this.startX = 0;
  this.scrollLeft = 0;
  this.isAnimating = false;
  this.x = 0;
  this.dist = 0;
  this.scrollAmount = 0;
  this.stopAnimation = false;
};

var _default = CreateSLider;
exports.default = _default;
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56963" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/slider.js.map