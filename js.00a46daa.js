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
})({"js/grid.js":[function(require,module,exports) {
var grid = document.createElement('div');
grid.className = 'grid';
document.body.appendChild(grid);
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.code === 'KeyG') {
    grid.classList.toggle('grid_visible');
  }
});
},{}],"js/slider.js":[function(require,module,exports) {
var active = document.querySelector(".js-slide.slider-content_active");

var showSlide = function showSlide(slideId) {
  var slide = document.querySelector(".js-slide[data-slide-id=\"".concat(slideId, "\"]"));

  if (slide.classList.contains("slider-content_active")) {
    return;
  }

  slide.classList.add("slider-content_show");
  active.classList.add("slider-content_hide");
  active.classList.remove("slider-content_active");
  var previous = active;
  active = slide;
  document.querySelector(".js-slide-button[data-slide-id=\"".concat(slideId, "\"]")).classList.add("slider-content-block-dots__dot-container_choosen");
  document.querySelector(".js-slide-button[data-slide-id=\"".concat(previous.dataset.slideId, "\"]")).classList.remove("slider-content-block-dots__dot-container_choosen");
  active.addEventListener("animationend", function () {
    active.classList.add("slider-content_active");
    active.classList.remove("slider-content_show");
    previous.classList.remove("slider-content_hide");
    active.parentNode.insertBefore(active, previous);
  }, {
    once: true
  });
};

document.querySelector(".js-slide-buttons").addEventListener("click", function (e) {
  var data = e.target.dataset;

  if (!data.slideId) {
    return;
  }

  showSlide(data.slideId);
});
},{}],"js/templateProduct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescription = getDescription;
exports.getSizes = getSizes;
exports.templateButton = void 0;
var templateDescription = '<div class="product-card__description">{description}</div>';
var templateSize = '<input class="js-radio-size" type="radio" id="size_{size}" data-size-id="{size}" name="sizes">\
        <div class="radio-button-text radio-button-text_size">\
            <label class="radio-label" for="size_{size}">{size}</label>\
        </div>';
var templateButton = '<div class="dropdown-button-container">\
        <button class="js-dropdown-button button dropdown-button-container__button">Заказать</button>\
    </div>';
exports.templateButton = templateButton;

function getDescription(product) {
  return templateDescription.replace(/{([a-z]+)}/g, function () {
    return product.description;
  });
}

function getSizes(product) {
  var sizesData = "";
  product.sizes.forEach(function (el) {
    sizesData += templateSize.replace(/{([a-z]+)}/g, function () {
      return el;
    });
  });
  return sizesData;
}
},{}],"js/orderForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrderForm = createOrderForm;
exports.selectorsProduct = exports.selectorsData = void 0;

var _templateProduct = require("./templateProduct");

// Специфическая форма заказа товара
var selectorsData = {
  name: ".js-name",
  email: ".js-email",
  number: ".js-phone-number",
  code: ".js-phone-code",
  country: ".js-phone-country",
  delivery: ".js-radio-delivery",
  city: ".js-select-cities",
  address: ".js-address",
  payment: ".js-radio-payment",
  notice: ".js-notice"
};
exports.selectorsData = selectorsData;
var selectorsProduct = {
  image: ".js-order-product-image",
  sale: ".js-order-product-sale",
  name: ".js-order-product-name",
  price: ".js-order-product-price",
  oldprice: ".js-order-product-oldprice",
  description: ".js-order-product-description",
  sizes: ".js-order-product-sizes"
};
exports.selectorsProduct = selectorsProduct;
var form = document.querySelector(".js-form");
var close = document.querySelector(".js-close");
var image = document.querySelector(selectorsProduct.image);
var sale = document.querySelector(selectorsProduct.sale);
var name = document.querySelector(selectorsProduct.name);
var price = document.querySelector(selectorsProduct.price);
var oldprice = document.querySelector(selectorsProduct.oldprice);
var description = document.querySelector(selectorsProduct.description);
var sizes = document.querySelector(selectorsProduct.sizes);

function createOrderForm(choosenSize, product, imageSrc) {
  form.style.display = "block";
  window.setTimeout(function () {
    form.style.opacity = 1;
  }, 0);
  window.document.body.style.overflow = "hidden";
  image.setAttribute("src", imageSrc);

  if (product.sale) {
    sale.classList.remove("product-card__sale_none");
    oldprice.innerHTML = product.oldPrice;
  } else sale.classList.add("product-card__sale_none");

  name.innerHTML = product.name;
  price.innerHTML = product.price + " ₽";
  description.innerHTML = product.description;
  sizes.innerHTML = (0, _templateProduct.getSizes)(product);
  form.querySelector(".js-radio-size[data-size-id=\"".concat(choosenSize, "\"]")).checked = true;
}

function closeForm() {
  window.document.body.style.overflow = "scroll";
  window.setTimeout(function () {
    form.style.opacity = 0;
  }, 0);
  form.style.display = "none";
}

close.addEventListener("click", closeForm);
},{"./templateProduct":"js/templateProduct.js"}],"js/form/phohe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = field;

var _orderForm = require("../orderForm");

// Здесь специфическая логика, которую мы не можем вынести в field
function field(form, conditions) {
  var number = form.querySelector(_orderForm.selectorsData.number);
  var code = form.querySelector(_orderForm.selectorsData.code);
  var country = form.querySelector(_orderForm.selectorsData.country); // общие в field.js и специфические правила можно прокидывать в field

  function _validate(field) {
    // required
    if (!field.value.trim()) {
      return "empty";
    } // => описывается специфическим правилом


    var match = field.value.match(/[0-9\s]+/);

    if (!match) {
      return "incorrect character";
    }

    if (match[0] === field.value) {
      return false;
    }

    return "incorrect character";
  } // => field.js


  var numberError = _validate(number);

  var codeError = _validate(code);

  var error = numberError || codeError;
  var touched = false;
  var value = {
    number: number.value,
    code: code.value
  }; // простейший PubSub паттерн, можно унести в field.js

  var subscribers = [];

  function subscribe(callback) {
    subscribers.push(callback);
    return function () {
      subscribers = subscribers.filter(function (item) {
        return item !== callback;
      });
    };
  }

  function notify() {
    subscribers.forEach(function (callback) {
      callback({
        error: error,
        touched: touched,
        value: value,
        fields: {
          number: number,
          code: code,
          country: country
        }
      });
    });
  } // сохраняем изменения пользователя


  number.addEventListener("keyup", function () {
    touched = true;
    numberError = _validate(number);
    error = numberError || codeError;
    value.number = number.value;
    notify();
  });
  code.addEventListener("keyup", function () {
    touched = true;
    codeError = _validate(code);
    error = numberError || codeError;
    value.code = code.value;
    notify();
  });
  return {
    subscribe: subscribe,
    error: error,
    touched: touched,
    value: value,
    validate: function validate() {
      numberError = _validate(number);
      codeError = _validate(code);
      error = numberError || codeError;
      return {
        error: error,
        touched: touched,
        value: value,
        fields: {
          number: number,
          code: code,
          country: country
        }
      };
    },
    prepareToSubmit: function prepareToSubmit() {
      touched = true;
    },
    fields: {
      number: number,
      code: code,
      country: country
    }
  };
}
},{"../orderForm":"js/orderForm.js"}],"js/form/cities.js":[function(require,module,exports) {
function request(url) {
  return fetch(url).then(function (res) {
    return res.json();
  });
}

function setCities() {
  var url = 'https://api.hh.ru/areas/113';
  return request(url).then(function (country) {
    var cities = [];
    country.areas.forEach(function (region) {
      if (region.name === 'Московская область') {
        region.areas.forEach(function (city) {
          return cities.push({
            id: city.id,
            city: city.name
          });
        });
      } else if (region.name === 'Москва') {
        cities.push({
          id: region.id,
          city: region.name
        });
      }
    });
    var selectCities = '';
    cities.forEach(function (el) {
      selectCities += '<option class="option" id="' + el.id + '"';
      if (el.city === 'Москва') selectCities += ' selected';
      selectCities += '>' + el.city + '</option>';
    });
    document.querySelector(".js-select-cities").innerHTML = selectCities;
  });
}

setCities();
},{}],"js/form/index.js":[function(require,module,exports) {
"use strict";

var _phohe = _interopRequireDefault(require("./phohe"));

var _cities = _interopRequireDefault(require("./cities"));

var _orderForm = require("../orderForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Компонент самой формы. 
// Общая логика валидации всей формы
var form = document.querySelector(".js-form");
var submit = form.querySelector(".js-submit");
var phone = (0, _phohe.default)(form);
var state = {
  invalidFields: new Set(["phone"])
};

function showValidation(_ref) {
  var touched = _ref.touched,
      error = _ref.error,
      value = _ref.value;
  state.phone = value;
  var _phone$fields = phone.fields,
      number = _phone$fields.number,
      code = _phone$fields.code,
      country = _phone$fields.country;

  if (touched && error) {
    number.classList.add("input_error");
    code.classList.add("input_error");
    country.classList.add("input_error");
    state.invalidFields.add("phone");
    return;
  }

  state.invalidFields.remove("phone");
  number.classList.remove("input_error");
  code.classList.remove("input_error");
  country.classList.remove("input_error");
}

var unsubscribe = phone.subscribe(showValidation);
submit.addEventListener("click", function (e) {
  e.preventDefault();
  phone.prepareToSubmit();
  var state = phone.validate();

  if (e) {
    showValidation(state);
  }

  data = console.log();
});
},{"./phohe":"js/form/phohe.js","./cities":"js/form/cities.js","../orderForm":"js/orderForm.js"}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  id: '1',
  name: 'Зонт',
  image: '/product-1.jpg',
  price: '1 990',
  oldPrice: undefined,
  sale: false,
  description: 'Красный зонт',
  sizes: ['0']
}, {
  id: '2',
  name: 'Сумка',
  image: '/product-2.jpg',
  price: '290',
  oldPrice: undefined,
  sale: false,
  description: 'Красная сумка',
  sizes: ['0']
}, {
  id: '3',
  name: 'Шлепанцы',
  image: '/product-3.jpg',
  price: '790',
  oldPrice: undefined,
  sale: false,
  description: 'Красные шлепанцы',
  sizes: ['37', '38', '39', '40', '41']
}, {
  id: '4',
  name: 'Футболка',
  image: '/product-4.jpg',
  price: '390',
  oldPrice: '690',
  sale: true,
  description: 'Красная хлопковая футболка с&#160;коротким рукавом',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}, {
  id: '5',
  name: 'Толстовка',
  image: '/product-5.jpg',
  price: '3 990',
  sale: false,
  description: 'Красная толстовка',
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}, {
  id: '6',
  name: 'Подушка',
  image: '/product-6.jpg',
  price: '990',
  sale: false,
  description: 'Красная подушка',
  sizes: ['0']
}];
exports.default = _default;
},{}],"js/dropdown/productDropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _orderForm = require("../orderForm");

var _templateProduct = require("../templateProduct");

function _default(product) {
  var currentProductDropdown = document.querySelector(".js-dropdown-product[data-dropdown-id=\"".concat(product.id, "\"]"));
  currentProductDropdown.innerHTML = (0, _templateProduct.getDescription)(product) + '<div class="product-card__sizes">' + (0, _templateProduct.getSizes)(product) + '</div>' + _templateProduct.templateButton;
  currentProductDropdown.style.opacity = 1;
  currentProductDropdown.querySelector(".js-dropdown-button").disabled = true;
  var sizesList = document.querySelectorAll(".js-radio-size");
  var choosenSize = null;

  function choiseSize(el) {
    return function () {
      currentProductDropdown.querySelector(".js-dropdown-button").disabled = false;
      choosenSize = el.dataset.sizeId;
    };
  }

  sizesList.forEach(function (el) {
    el.addEventListener("click", choiseSize(el));
  });
  currentProductDropdown.querySelector(".js-dropdown-button").addEventListener("click", order);

  function order() {
    var image = document.querySelector(".js-popular-product[data-product-id=\"".concat(product.id, "\"] img")).getAttribute("src");
    (0, _orderForm.createOrderForm)(choosenSize, product, image);
  }
}
},{"../orderForm":"js/orderForm.js","../templateProduct":"js/templateProduct.js"}],"js/dropdown/controlProductCard.js":[function(require,module,exports) {
"use strict";

var _model = _interopRequireDefault(require("../model"));

var _productDropdown = _interopRequireDefault(require("./productDropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activeProductCard = null;
var currentProductCardElement = null;
var popularProductsList = document.querySelectorAll(".js-popular-product");

function dropdownAdd(el, ind, ev) {
  return function () {
    if (ev === 'click') {
      activeProductCard = ind;
    }

    if (activeProductCard === null && ev === 'hover' || ev === 'click') {
      var dropdown = el.querySelector(".js-dropdown-product");

      if (!dropdown.hasChildNodes()) {
        (0, _productDropdown.default)(_model.default[ind]);
        document.querySelector(".product-card[data-product-id=\"".concat(ind + 1, "\"]")).classList.add("product-card_dropdown");
      }
    }
  };
}

function dropdownHide(el, ind, ev) {
  return function () {
    if (activeProductCard !== ind && ev === 'hover' || ev === 'click') {
      var dropdown = el.querySelector(".js-dropdown-product");

      if (dropdown.hasChildNodes()) {
        while (dropdown.firstChild) {
          dropdown.removeChild(dropdown.firstChild);
        }

        dropdown.style.opacity = 0;
        document.querySelector(".product-card[data-product-id=\"".concat(ind + 1, "\"]")).classList.remove("product-card_dropdown");
      }
    }

    if (activeProductCard === ind && ev === 'click') {
      currentProductCardElement = null;
      activeProductCard = null;
    }
  };
}

popularProductsList.forEach(function (el, ind) {
  el.addEventListener("click", dropdownAdd(el, ind, 'click'));
  el.addEventListener("mouseenter", dropdownAdd(el, ind, 'hover'));
  el.addEventListener("mouseleave", dropdownHide(el, ind, 'hover'));
});

function checkClick(event) {
  currentProductCardElement = document.querySelector(".product-card[data-product-id=\"".concat(activeProductCard + 1, "\"]"));

  if (!currentProductCardElement.contains(event.target)) {
    dropdownHide(currentProductCardElement, activeProductCard, 'click')();
  }
}

window.addEventListener("click", checkClick, true);
},{"../model":"js/model.js","./productDropdown":"js/dropdown/productDropdown.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("./grid");

require("./slider");

require("./form");

require("./dropdown/controlProductCard");
},{"./grid":"js/grid.js","./slider":"js/slider.js","./form":"js/form/index.js","./dropdown/controlProductCard":"js/dropdown/controlProductCard.js"}],"../../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58694" + '/');

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
},{}]},{},["../../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map