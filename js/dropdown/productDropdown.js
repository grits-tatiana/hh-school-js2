import {createOrderForm} from '../orderForm';
import {getDescription, getSizes, templateButton} from '../templateProduct';

export default function (product)
{
    let currentProductDropdown = document.querySelector(`.js-dropdown-product[data-dropdown-id="${product.id}"]`);
    currentProductDropdown.innerHTML = 
        `<div class="js-dropdown-childs dropdown-product__elements">
        ${ getDescription(product)} 
        <div class="product-card__sizes"> ${getSizes(product)} </div> 
        ${templateButton}
        </div>`;
    currentProductDropdown.style.opacity = 1;

    let sizesList = document.querySelectorAll(".js-radio-size");
    let choosenSize = null;

    if (product.sizes.length === 1) 
    {
        currentProductDropdown.querySelector(".js-dropdown-button").disabled = false;
        choosenSize = sizesList[0].dataset.sizeId;
    }
    else {
        currentProductDropdown.querySelector(".js-dropdown-button").disabled = true;
    }

    function choiseSize(el) {
        return function() {
            currentProductDropdown.querySelector(".js-dropdown-button").disabled = false;
            choosenSize = el.dataset.sizeId;
        }
    }

    sizesList.forEach( (el) => {
        el.addEventListener("click", choiseSize(el));
    })

    currentProductDropdown.querySelector(".js-dropdown-button").addEventListener("click", order);

    function order() {
        let image = document.querySelector(`.js-popular-product[data-product-id="${product.id}"] img`).getAttribute("src");
        createOrderForm(choosenSize, product, image);
    }
}