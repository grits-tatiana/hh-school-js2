export default function (product)
{
    const templateDescription = 
    '<div class="product-card__description">{description}</div>'

    const templateSize = 
            '<input class="js-radio-size" type="radio" id="size_{size}" data-size-id="{size}" name="sizes">\
            <div class="radio-button-text radio-button-text_size">\
                <label for="size_{size}">{size}</label>\
            </div>'

    const templateButton = 
        '<div class="dropdown-button-container">\
            <button class="js-dropdown-button button dropdown-button-container__button">Заказать</button>\
        </div>'

    const descriptionData = templateDescription.replace(/{([a-z]+)}/g, () => {
        return product.description;
    })

    let sizesData = "";
    product.sizes.forEach((el) => {
        sizesData += templateSize.replace(/{([a-z]+)}/g, () => {
            return el;
        })
    })

    document.querySelector(`.js-dropdown-product[data-dropdown-id="${product.id}"]`).innerHTML = 
        descriptionData + 
        '<div class="product-card__sizes">'
            + sizesData +
        '</div>'
        + templateButton;

    document.querySelector(".js-dropdown-button").disabled = true;

    let sizesList = document.querySelectorAll(".js-radio-size");
    let choosenSize = null;

    function choiseSize(el) {
        return function() {
            document.querySelector(".js-dropdown-button").disabled = false;
            choosenSize = el.dataset.sizeId;
        }
    }

    sizesList.forEach( (el) => {
        el.addEventListener("click", choiseSize(el));
    })

    document.querySelector(".js-dropdown-button").addEventListener("click", order);

    function order() {
        console.log(choosenSize);
        console.log(product);
    }
}