// Специфическая форма заказа товара
import {getSizes} from './templateProduct';

export const selectorsData = {
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

export const selectorsProduct = {
    image: ".js-order-product-image",
    sale: ".js-order-product-sale",
    name: ".js-order-product-name",
    price: ".js-order-product-price",
    oldprice: ".js-order-product-oldprice",
    description: ".js-order-product-description",
    sizes: ".js-order-product-sizes"
}

const form = document.querySelector(".js-form");
const close = document.querySelector(".js-close");
const image = document.querySelector(selectorsProduct.image);
const sale = document.querySelector(selectorsProduct.sale);
const name = document.querySelector(selectorsProduct.name);
const price = document.querySelector(selectorsProduct.price);
const oldprice = document.querySelector(selectorsProduct.oldprice);
const description = document.querySelector(selectorsProduct.description);
const sizes = document.querySelector(selectorsProduct.sizes);

export function createOrderForm(choosenSize, product, imageSrc) {
    form.style.display = "block";
    window.setTimeout(function(){
        form.style.opacity = 1;
    },0);
    window.document.body.style.overflow = "hidden";
    image.setAttribute("src", imageSrc);
    if (product.sale) {
        sale.classList.remove("product-card__sale_none");
        oldprice.innerHTML = product.oldPrice;
    }
    else sale.classList.add("product-card__sale_none");
    name.innerHTML = product.name;
    price.innerHTML = product.price + " ₽";
    description.innerHTML = product.description;
    sizes.innerHTML = getSizes(product);
    form.querySelector(`.js-radio-size[data-size-id="${choosenSize}"]`).checked = true;
}

function closeForm() {
    window.document.body.style.overflow = "scroll";
    window.setTimeout(function(){
        form.style.opacity = 0;
    },0);
    form.style.display = "none";
  }
  
close.addEventListener("click", closeForm);


