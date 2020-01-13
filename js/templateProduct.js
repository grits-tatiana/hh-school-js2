const templateDescription = 
'<div class="product-card__description">{description}</div>'

const templateSize = 
        '<input class="js-radio-size" type="radio" id="size_{size}" data-size-id="{size}" name="sizes">\
        <div class="radio-button-text radio-button-text_size">\
            <label class="radio-label" for="size_{size}">{size}</label>\
        </div>'

export const templateButton = 
    '<div class="dropdown-button-container">\
        <button class="js-dropdown-button button dropdown-button-container__button">Заказать</button>\
    </div>'

export function getDescription(product) {
    return templateDescription.replace(/{([a-z]+)}/g, () => {
        return product.description;
    })
}

export function getSizes(product) {
    let sizesData = "";
    product.sizes.forEach((el) => {
        sizesData += templateSize.replace(/{([a-z]+)}/g, () => {
            return el;
        })
    })
    return sizesData;
}