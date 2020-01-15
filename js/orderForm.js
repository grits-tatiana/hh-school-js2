// Специфическая форма заказа товара
import {getSizes} from './templateProduct';
import {createTemplateForm} from './form/templateForm';

export const productData = {};

export const selectorsData = {
    name: ".js-name",
    email: ".js-email",
    number: ".js-phone-number",
    code: ".js-phone-code",
    country: ".js-phone-country",
    city: ".js-select-cities",
    address: ".js-address",
    notice: ".js-notice"
};

const selectorsProduct = {
    image: ".js-order-product-image",
    sale: ".js-order-product-sale",
    name: ".js-order-product-name",
    price: ".js-order-product-price",
    oldprice: ".js-order-product-oldprice",
    description: ".js-order-product-description",
    sizes: ".js-order-product-sizes"
}

export function createOrderForm(choosenSize, product, imageSrc) {
    createTemplateForm();

    const form = document.querySelector(".js-form");
    const close = form.querySelector(".js-order-close");
    const image = form.querySelector(selectorsProduct.image);
    const sale = form.querySelector(selectorsProduct.sale);
    const name = form.querySelector(selectorsProduct.name);
    const price = form.querySelector(selectorsProduct.price);
    const oldprice = form.querySelector(selectorsProduct.oldprice);
    const description = form.querySelector(selectorsProduct.description);
    const sizes = form.querySelector(selectorsProduct.sizes);

    form.style.display = "block";
    window.setTimeout(function(){
        form.style.opacity = 1;
    },0);
    window.document.body.style.overflow = "hidden";
    image.setAttribute("src", imageSrc);
    if (product.sale) {
        sale.classList.remove("product-card__sale_none");
        oldprice.style.display = "inline";
        oldprice.innerHTML = product.oldPrice + " ₽";
    }
    else { 
        sale.classList.add("product-card__sale_none");
        oldprice.style.display = "none";
    }
    name.innerHTML = product.name;
    price.innerHTML = product.price + " ₽";
    description.innerHTML = product.description;
    sizes.innerHTML = getSizes(product);
    productData.product = product;
    form.querySelector(`.js-radio-size[data-size-id="${choosenSize}"]`).checked = true;

    function closeForm() {
        window.document.body.style.overflow = "scroll";
        window.setTimeout(function(){
            form.style.opacity = 0;
        },0);
        form.style.display = "none";
      }
      
    close.addEventListener("click", closeForm);

}


