import makePhone from './phohe';
import setCities from './cities';
import makeFields from './fields';
import {selectorsData, productData} from '../orderForm';

const form = document.querySelector(".js-form");
const submit = form.querySelector(".js-submit");
const phone = makePhone(form);
const fields = makeFields(form);

const dataOrder = {};
const invalidFields = new Set();

function getDataProduct() {
  dataOrder.productId = productData.product.id;
  dataOrder.productName = productData.product.name;
  dataOrder.productPrice = productData.product.price;
  dataOrder.productSize = form.querySelector(`.js-radio-size:checked`).value;
}

function getDataOrder() {
  dataOrder.city = form.querySelector(selectorsData.city).value;
  dataOrder.delivery = form.querySelector(`.js-radio-delivery:checked`).value;
  dataOrder.payment = form.querySelector(`.js-radio-payment:checked`).value;
  form.querySelector(selectorsData.notice).checked === true ? dataOrder.notice = true : dataOrder.notice = false;  
}

function showValidationNumber({ error, value }) {
  dataOrder.phone = value;
  const { number, code, country } = phone.fields;
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

function showValidation({ nameError, emailError, addressError, value}) {
  dataOrder.name = value.name;
  dataOrder.email = value.email;
  dataOrder.address = value.address;
  const { name, email, address } = fields.fields;
  if (nameError) {
    name.classList.add("input_error");
    invalidFields.add("name");
  } 
  else {
    name.classList.remove("input_error");
    invalidFields.delete("name");
  }
  if (emailError) {
    email.classList.add("input_error");
    invalidFields.add("email");
  } 
  else {
    email.classList.remove("input_error");
    invalidFields.delete("email");
  }
  if (addressError) {
    address.classList.add("textarea_error");
    invalidFields.add("address");
  } 
  else {
    address.classList.remove("textarea_error");
    invalidFields.delete("address");
  }
}

const unsubscribeNumber = phone.subscribe(showValidationNumber);
const unsubscribeFields = fields.subscribe(showValidation);

submit.addEventListener("click", e => {

  e.preventDefault();
  let withoutError = true;
  const stateNumber = phone.validatePhoneNumber();
  const stateFields = fields.validateFields();
  if (stateNumber.error) {
    alert("Проверьте корректность заполнения номера телефона")
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
