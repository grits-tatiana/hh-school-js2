import {setCities} from './cities';
import {functionForm} from './index';

const templateForm = '\
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
    </div>'

export function createTemplateForm() {
    document.querySelector(".js-form").innerHTML = templateForm;
    setCities();
    functionForm();
}