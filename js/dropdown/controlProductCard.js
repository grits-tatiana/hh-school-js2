import products from "../model";
import productDropdown from "./productDropdown";

let activeProductCard = null;
let currentProductCardElement = null;

let popularProductsList = document.querySelectorAll(".js-popular-product");

function dropdownAdd(el, ind) {
    return function() {
        if (event.type === 'click') { 
            activeProductCard = ind;
        }
        if ((activeProductCard === null && event.type === 'mouseenter') 
            || (event.type === 'click')) {
            let dropdown = el.querySelector(".js-dropdown-product");
            if (!(dropdown.hasChildNodes())) {
                productDropdown(products[ind]);
                document
                .querySelector(`.product-card[data-product-id="${ind + 1}"]`)
                .classList.add("product-card_dropdown");
            }
        }
    }
}

function dropdownHide(el, ind) {
    return function() {
        if ((activeProductCard !== ind && event.type === 'mouseleave') || (event.type === 'click')) {
            let dropdown = el.querySelector(".js-dropdown-product");
            if (dropdown.hasChildNodes()) {
                dropdown.removeChild(dropdown.firstChild);
                dropdown.style.opacity = 0;
                document
                .querySelector(`.product-card[data-product-id="${ind + 1}"]`)
                .classList.remove("product-card_dropdown");
            }
        }
        if (activeProductCard === ind && event.type === 'click') {
            currentProductCardElement = null;
            activeProductCard = null;
        }
    }
}

popularProductsList.forEach( (el, ind) => {
    el.addEventListener("click", dropdownAdd(el,ind));
    el.addEventListener("mouseenter", dropdownAdd(el,ind)); 
    el.addEventListener("mouseleave", dropdownHide(el,ind));
})

function checkClick(event) {
    currentProductCardElement = document.querySelector(`.product-card[data-product-id="${activeProductCard + 1}"]`);
    if (!(currentProductCardElement.contains(event.target))) {
        dropdownHide(currentProductCardElement, activeProductCard, 'click')();
    }
}

window.addEventListener("click", checkClick, true);