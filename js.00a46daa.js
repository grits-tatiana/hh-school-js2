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
},{}],"js/model.js":[function(require,module,exports) {
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
},{}],"js/templateProduct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescription = getDescription;
exports.getSizes = getSizes;
exports.templateButton = void 0;
var templateDescription = '<div class="product-card__description">{description}</div>';
var templateSize = '<input class="js-radio-size" type="radio" id="size_{size}" data-size-id="{size}" name="sizes"  value="{size}">\
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
},{}],"js/form/cities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCities = setCities;

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
      selectCities += "<option class=\"option\" id=\"".concat(el.id, "\" ").concat(el.city === 'Москва' ? ' selected' : '', ">").concat(el.city, "</option>");
    });
    document.querySelector(".js-select-cities").innerHTML = selectCities;
  });
}
},{}],"js/form/fields.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmpty = validateEmpty;
exports.default = fields;

var _orderForm = require("../orderForm");

function validateEmpty(field) {
  if (!field.trim()) {
    return "empty";
  }
}

function validateEmail(field) {
  var match = field.match(/@/);

  if (!match) {
    return "incorrect character";
  }
}

function fields(form) {
  var name = form.querySelector(_orderForm.selectorsData.name);
  var email = form.querySelector(_orderForm.selectorsData.email);
  var address = form.querySelector(_orderForm.selectorsData.address);
  var nameError = false;
  var emailError = false;
  var addressError = false;
  var value = {
    name: name.value,
    email: email.value,
    address: address.value
  };
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
        nameError: nameError,
        emailError: emailError,
        addressError: addressError,
        value: value,
        fields: {
          name: name,
          email: email,
          address: address
        }
      });
    });
  }

  name.addEventListener("blur", function () {
    nameError = validateEmpty(name.value);
    value.name = name.value;
    notify();
  });
  email.addEventListener("blur", function () {
    emailError = validateEmpty(email.value) || validateEmail(email.value);
    value.email = email.value;
    notify();
  });
  address.addEventListener("blur", function () {
    addressError = validateEmpty(address.value);
    value.address = address.value;
    notify();
  });
  return {
    subscribe: subscribe,
    nameError: nameError,
    emailError: emailError,
    addressError: addressError,
    value: value,
    validateFields: function validateFields() {
      nameError = validateEmpty(name.value);
      emailError = validateEmpty(email.value) || validateEmail(email.value);
      addressError = validateEmpty(address.value);
      return {
        nameError: nameError,
        emailError: emailError,
        addressError: addressError,
        value: value,
        fields: {
          name: name,
          email: email,
          address: address
        }
      };
    },
    fields: {
      name: name,
      email: email,
      address: address
    }
  };
}
},{"../orderForm":"js/orderForm.js"}],"js/form/phohe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fieldPhoneNumber;

var _orderForm = require("../orderForm");

var _fields = require("./fields");

// Здесь специфическая логика, которую мы не можем вынести в field
function fieldPhoneNumber(form) {
  var number = form.querySelector(_orderForm.selectorsData.number);
  var code = form.querySelector(_orderForm.selectorsData.code);
  var country = form.querySelector(_orderForm.selectorsData.country);

  function _validatePhoneNumber(field) {
    if ((0, _fields.validateEmpty)(field)) return "empty";
    var match = field.match(/[0-9\s]+/);

    if (!match) {
      return "incorrect character";
    }

    if (match[0] === field) {
      return false;
    }

    return "incorrect character";
  }

  var numberError = false;
  var codeError = false;
  var countryError = false;
  var error = false;
  var value = {
    number: number.value,
    code: code.value,
    country: country.value
  };
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
        value: value,
        fields: {
          number: number,
          code: code,
          country: country
        }
      });
    });
  }

  number.addEventListener("blur", function () {
    numberError = _validatePhoneNumber(number.value);
    error = numberError || codeError || countryError;
    value.number = number.value;
    notify();
  });
  code.addEventListener("blur", function () {
    codeError = _validatePhoneNumber(code.value);
    error = numberError || codeError || countryError;
    value.code = code.value;
    notify();
  });
  country.addEventListener("blur", function () {
    countryError = country.value[0] === '+' ? _validatePhoneNumber(country.value.slice(1)) : "incorrect character";
    error = numberError || codeError || countryError;
    value.country = country.value;
    notify();
  });
  return {
    subscribe: subscribe,
    error: error,
    value: value,
    validatePhoneNumber: function validatePhoneNumber() {
      numberError = _validatePhoneNumber(number.value);
      codeError = _validatePhoneNumber(code.value);
      countryError = country.value[0] === '+' ? _validatePhoneNumber(country.value.slice(1)) : "incorrect character";
      error = numberError || codeError || countryError;
      return {
        error: error,
        value: value,
        fields: {
          number: number,
          code: code,
          country: country
        }
      };
    },
    fields: {
      number: number,
      code: code,
      country: country
    }
  };
}
},{"../orderForm":"js/orderForm.js","./fields":"js/form/fields.js"}],"js/form/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionForm = functionForm;

var _phohe = _interopRequireDefault(require("./phohe"));

var _fields = _interopRequireDefault(require("./fields"));

var _orderForm = require("../orderForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function functionForm() {
  var form = document.querySelector(".js-form");
  var submit = form.querySelector(".js-submit");
  var phone = (0, _phohe.default)(form);
  var fields = (0, _fields.default)(form);
  var dataOrder = {};
  var invalidFields = new Set();
  var unsubscribeNumber = phone.subscribe(showValidationNumber);
  var unsubscribeFields = fields.subscribe(showValidation);

  function getDataProduct() {
    dataOrder.productId = _orderForm.productData.product.id;
    dataOrder.productName = _orderForm.productData.product.name;
    dataOrder.productPrice = _orderForm.productData.product.price;
    dataOrder.productSize = form.querySelector(".js-radio-size:checked").value;
  }

  function getDataOrder() {
    dataOrder.city = form.querySelector(_orderForm.selectorsData.city).value;
    dataOrder.delivery = form.querySelector(".js-radio-delivery:checked").value;
    dataOrder.payment = form.querySelector(".js-radio-payment:checked").value;
    form.querySelector(_orderForm.selectorsData.notice).checked === true ? dataOrder.notice = true : dataOrder.notice = false;
  }

  function showValidationNumber(_ref) {
    var error = _ref.error,
        value = _ref.value;
    dataOrder.phone = value;
    var _phone$fields = phone.fields,
        number = _phone$fields.number,
        code = _phone$fields.code,
        country = _phone$fields.country;

    if (error) {
      number.classList.add("input_error");
      code.classList.add("input_error");
      country.classList.add("input_error");
      invalidFields.add("phone");
      return;
    }

    number.classList.remove("input_error");
    code.classList.remove("input_error");
    country.classList.remove("input_error");
    invalidFields.delete("phone");
  }

  function showValidation(_ref2) {
    var nameError = _ref2.nameError,
        emailError = _ref2.emailError,
        addressError = _ref2.addressError,
        value = _ref2.value;
    dataOrder.name = value.name;
    dataOrder.email = value.email;
    dataOrder.address = value.address;
    var _fields$fields = fields.fields,
        name = _fields$fields.name,
        email = _fields$fields.email,
        address = _fields$fields.address;

    if (nameError) {
      name.classList.add("input_error");
      invalidFields.add("name");
    } else {
      name.classList.remove("input_error");
      invalidFields.delete("name");
    }

    if (emailError) {
      email.classList.add("input_error");
      invalidFields.add("email");
    } else {
      email.classList.remove("input_error");
      invalidFields.delete("email");
    }

    if (addressError) {
      address.classList.add("textarea_error");
      invalidFields.add("address");
    } else {
      address.classList.remove("textarea_error");
      invalidFields.delete("address");
    }
  }

  submit.addEventListener("click", function (e) {
    e.preventDefault();
    var withoutError = true;
    var stateNumber = phone.validatePhoneNumber();
    var stateFields = fields.validateFields();

    if (stateNumber.error) {
      alert("Проверьте корректность заполнения номера телефона");
      showValidationNumber(stateNumber);
      withoutError = false;
    }

    if (stateFields.nameError || stateFields.emailError || stateFields.addressError) {
      alert("Проверьте корректность заполнения всех необходимых полей: ФИО, Email, Адресс");
      showValidation(stateFields);
      withoutError = false;
    }

    if (withoutError) {
      getDataOrder();
      getDataProduct();
      console.log(dataOrder);
    }
  });
}
},{"./phohe":"js/form/phohe.js","./fields":"js/form/fields.js","../orderForm":"js/orderForm.js"}],"js/form/templateForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTemplateForm = createTemplateForm;

var _cities = require("./cities");

var _index = require("./index");

var templateForm = '\
    <div class="columns-wrapper">\
        <div class="popup-content">\
            <div class="popup-header">\
                <h1 class="heading">Оформление заказа</h1>\
                <div class="js-order-close nav-close"></div>\
            </div>\
            <div class="columns-row">\
                <div class="column column_s-2 column_m-3 column_l-6">\
                    <form class="popup-content-form-order">\
                        <div class="form-order-group">\
                            <label class="form-order__label">Контактное лицо</label>\
                                <input class="js-name input" type="text" placeholder="ФИО" value="">\
                                <input class="js-email input" type="text" placeholder="Электронная почта" value="">\
                            <div class="form-order-contact-info-number">\
                                <input class="js-phone-country input form-order-contact-info-number_number-7" type="text" placeholder="+7" value="">\
                                <input class="js-phone-code input form-order-contact-info-number_number-code" type="text" placeholder="Код" value="">\
                                <input class="js-phone-number input form-order-contact-info-number_number-number" type="text" placeholder="Номер" value="">\
                            </div>\
                        </div>\
                        <div class="form-order-group">\
                            <label class="form-order__label">Способ получения заказа</label>\
                            <div class="group-buttons">\
                                <input class="js-radio-delivery" type="radio" id="self-delivery" value="self-delivery" name="type-delivery" checked>\
                                <div class="radio-button-text radio-button-text_delivery">\
                                    <label class="radio-label" for="self-delivery">Самовывоз</label>\
                                </div>\
                                <input class="js-radio-delivery" type="radio" id="delivery" value="delivery" name="type-delivery">\
                                <div class="radio-button-text radio-button-text_delivery">\
                                    <label class="radio-label" for="delivery">Доставка</label>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="form-order-group">\
                            <label class="form-order__label">Адрес</label>\
                            <div class="form-order-address-list">\
                                <div class="select-wrapper">\
                                    <select class="js-select-cities select">\
                                    </select>\
                                </div>\
                            </div>\
                            <div class="form-order-address-text">\
                                <textarea class="js-address textarea" placeholder="Адрес"></textarea>\
                            </div>\
                        </div>\
                        <div class="form-order-group">\
                            <label class="form-order__label">Оплата</label>\
                            <div class="form-order-radio-group">\
                                <div class="form-order-radio-group__element">\
                                    <input class="js-radio-payment" type="radio" name="payment" id="online" value="online-payment" checked><label class="form-order__text" for="online">Online-оплата</label>\
                                </div>\
                                <div class="form-order-radio-group__element">\
                                    <input class="js-radio-payment" type="radio" name="payment" id="cash" value="cash-payment"><label class="form-order__text" for="cash">Наличными</label>\
                                </div>\
                                <div class="form-order-radio-group__element">\
                                    <input class="js-radio-payment" type="radio" name="payment" id="card" value="card-payment"><label class="form-order__text" for="card">Картой при получении</label>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="form-order-group">\
                            <label class="form-order__label">Уведомления</label>\
                            <div class="form-order-notice-checkbox-sms">\
                                <input class="js-notice" type="checkbox" value="sms" id="sms">\
                                <label class="form-order__text" for="sms">Хочу получать SMS уведомления</label>\
                            </div>\
                        </div>\
                        <div class="form-order-group">\
                            <button class="js-submit button form-order-confirm-button_button">Оформить заказ</button>\
                        </div>\
                    </form>\
                </div>\
                <div class="column column_s-2 column_m-3 column_l-6">\
                    <div class="popup-content-order-product">\
                        <div class="js-order-product-card product-card">\
                            <div class="product-card__image-container">\
                                <img class="js-order-product-image product-card__image">\
                                <div class="js-order-product-sale product-card__sale product-card__sale_full">sale</div>\
                            </div>\
                            <div class="js-order-product-name product-card__name product-card__name_full"></div>\
                            <div class="product-card__price">\
                                <span class="js-order-product-oldprice product-card__old-price"></span><span class="js-order-product-price"></span>\
                            </div>\
                            <div class="js-order-product-description product-card__description"></div>\
                            <div class="js-order-product-sizes product-card__sizes">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';

function createTemplateForm() {
  document.querySelector(".js-form").innerHTML = templateForm;
  (0, _cities.setCities)();
  (0, _index.functionForm)();
}
},{"./cities":"js/form/cities.js","./index":"js/form/index.js"}],"js/orderForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrderForm = createOrderForm;
exports.selectorsData = exports.productData = void 0;

var _templateProduct = require("./templateProduct");

var _templateForm = require("./form/templateForm");

// Специфическая форма заказа товара
var productData = {};
exports.productData = productData;
var selectorsData = {
  name: ".js-name",
  email: ".js-email",
  number: ".js-phone-number",
  code: ".js-phone-code",
  country: ".js-phone-country",
  city: ".js-select-cities",
  address: ".js-address",
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

function createOrderForm(choosenSize, product, imageSrc) {
  (0, _templateForm.createTemplateForm)();
  var form = document.querySelector(".js-form");
  var close = form.querySelector(".js-order-close");
  var image = form.querySelector(selectorsProduct.image);
  var sale = form.querySelector(selectorsProduct.sale);
  var name = form.querySelector(selectorsProduct.name);
  var price = form.querySelector(selectorsProduct.price);
  var oldprice = form.querySelector(selectorsProduct.oldprice);
  var description = form.querySelector(selectorsProduct.description);
  var sizes = form.querySelector(selectorsProduct.sizes);
  form.style.display = "block";
  window.setTimeout(function () {
    form.style.opacity = 1;
  }, 0);
  window.document.body.style.overflow = "hidden";
  image.setAttribute("src", imageSrc);

  if (product.sale) {
    sale.classList.remove("product-card__sale_none");
    oldprice.style.display = "inline";
    oldprice.innerHTML = product.oldPrice + " ₽";
  } else {
    sale.classList.add("product-card__sale_none");
    oldprice.style.display = "none";
  }

  name.innerHTML = product.name;
  price.innerHTML = product.price + " ₽";
  description.innerHTML = product.description;
  sizes.innerHTML = (0, _templateProduct.getSizes)(product);
  productData.product = product;
  form.querySelector(".js-radio-size[data-size-id=\"".concat(choosenSize, "\"]")).checked = true;

  function closeForm() {
    window.document.body.style.overflow = "scroll";
    window.setTimeout(function () {
      form.style.opacity = 0;
    }, 0);
    form.style.display = "none";
  }

  close.addEventListener("click", closeForm);
}
},{"./templateProduct":"js/templateProduct.js","./form/templateForm":"js/form/templateForm.js"}],"js/dropdown/productDropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _orderForm = require("../orderForm");

var _templateProduct = require("../templateProduct");

function _default(product) {
  var currentProductDropdown = document.querySelector(".js-dropdown-product[data-dropdown-id=\"".concat(product.id, "\"]"));
  currentProductDropdown.innerHTML = "<div class=\"js-dropdown-childs dropdown-product__elements\">\n        ".concat((0, _templateProduct.getDescription)(product), " \n        <div class=\"product-card__sizes\"> ").concat((0, _templateProduct.getSizes)(product), " </div> \n        ").concat(_templateProduct.templateButton, "\n        </div>");
  currentProductDropdown.style.opacity = 1;
  var sizesList = document.querySelectorAll(".js-radio-size");
  var choosenSize = null;

  if (product.sizes.length === 1) {
    currentProductDropdown.querySelector(".js-dropdown-button").disabled = false;
    choosenSize = sizesList[0].dataset.sizeId;
  } else {
    currentProductDropdown.querySelector(".js-dropdown-button").disabled = true;
  }

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

function dropdownAdd(el, ind) {
  return function () {
    if (event.type === 'click') {
      activeProductCard = ind;
    }

    if (activeProductCard === null && event.type === 'mouseenter' || event.type === 'click') {
      var dropdown = el.querySelector(".js-dropdown-product");

      if (!dropdown.hasChildNodes()) {
        (0, _productDropdown.default)(_model.default[ind]);
        document.querySelector(".product-card[data-product-id=\"".concat(ind + 1, "\"]")).classList.add("product-card_dropdown");
      }
    }
  };
}

function dropdownHide(el, ind) {
  return function () {
    if (activeProductCard !== ind && event.type === 'mouseleave' || event.type === 'click') {
      var dropdown = el.querySelector(".js-dropdown-product");

      if (dropdown.hasChildNodes()) {
        dropdown.removeChild(dropdown.firstChild);
        dropdown.style.opacity = 0;
        document.querySelector(".product-card[data-product-id=\"".concat(ind + 1, "\"]")).classList.remove("product-card_dropdown");
      }
    }

    if (activeProductCard === ind && event.type === 'click') {
      currentProductCardElement = null;
      activeProductCard = null;
    }
  };
}

popularProductsList.forEach(function (el, ind) {
  el.addEventListener("click", dropdownAdd(el, ind));
  el.addEventListener("mouseenter", dropdownAdd(el, ind));
  el.addEventListener("mouseleave", dropdownHide(el, ind));
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

require("./dropdown/controlProductCard");

require("./form");
},{"./grid":"js/grid.js","./slider":"js/slider.js","./dropdown/controlProductCard":"js/dropdown/controlProductCard.js","./form":"js/form/index.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56522" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map