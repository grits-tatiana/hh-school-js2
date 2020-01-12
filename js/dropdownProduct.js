import products from "./model";
import createProductTemplate from "./createProductDropdown";

let activeProductCard = null;
let currentProductCardElement = null;

let popularProductsList = document.querySelectorAll(".js-popular-product");

function dropdownAdd(el, ind, ev) {
    return function() {
        if (ev === 'click') { 
            activeProductCard = ind;
        }
        if ((activeProductCard === null && ev === 'hover') 
            || (ev === 'click')) {
            let dropdown = el.querySelector(".js-dropdown-product");
            if (!(dropdown.hasChildNodes())) {
                createProductTemplate(products[ind]);
                document
                .querySelector(`.product-card[data-product-id="${ind + 1}"]`)
                .classList.add("product-card_dropdown");
            }
        }
    }
}

function dropdownHide(el, ind, ev) {
    return function() {
        if ((activeProductCard !== ind && ev === 'hover') || (ev === 'click')) {
            let dropdown = el.querySelector(".js-dropdown-product");
            if (dropdown.hasChildNodes()) {
                while (dropdown.firstChild) {
                    dropdown.removeChild(dropdown.firstChild);
                }
                document
                .querySelector(`.product-card[data-product-id="${ind + 1}"]`)
                .classList.remove("product-card_dropdown");
            }
        }
        if (activeProductCard === ind && ev === 'click') {
            currentProductCardElement = null;
            activeProductCard = null;
        }
    }
}

popularProductsList.forEach( (el, ind) => {
    el.addEventListener("click", dropdownAdd(el,ind, 'click'));
    el.addEventListener("mouseenter", dropdownAdd(el,ind, 'hover')); 
    el.addEventListener("mouseleave", dropdownHide(el,ind, 'hover'));
})

function checkClick(event) {
    currentProductCardElement = document.querySelector(`.product-card[data-product-id="${activeProductCard + 1}"]`);
    console.log(!(currentProductCardElement.contains(event.target)));
    if (!(currentProductCardElement.contains(event.target))) {
        dropdownHide(currentProductCardElement, activeProductCard, 'click')();
    }
}

window.addEventListener("click", checkClick, true);