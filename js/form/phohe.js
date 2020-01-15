// Здесь специфическая логика, которую мы не можем вынести в field
import {selectorsData} from '../orderForm';
import {validateEmpty} from './fields';

  export default function fieldPhoneNumber(form) {

    const number = form.querySelector(selectorsData.number);
    const code = form.querySelector(selectorsData.code);
    const country = form.querySelector(selectorsData.country);

    function validatePhoneNumber(field) {

      if (validateEmpty(field)) return "empty";
      const match = field.match(/[0-9\s]+/);
      if (!match) {
        return "incorrect character";
      }
      if (match[0] === field) {
        return false;
      }
      return "incorrect character";
    }
  
    let numberError = false;
    let codeError = false;
    let countryError = false;
    let error = false;

    let value = {
      number: number.value,
      code: code.value,
      country: country.value,
    };
  
    let subscribers = [];
    function subscribe(callback) {
      subscribers.push(callback);
      return () => {
        subscribers = subscribers.filter(item => item !== callback);
      };
    }
    
    function notify() {
      subscribers.forEach(callback => {
        callback({
          error,
          value,
          fields: { number, code, country }
        });
      });
    }
  
    number.addEventListener("blur", () => {
      numberError = validatePhoneNumber(number.value);
      error = numberError || codeError || countryError;
      value.number = number.value;
      notify();
    });
    code.addEventListener("blur", () => {
      codeError = validatePhoneNumber(code.value);
      error = numberError || codeError || countryError;
      value.code = code.value;
      notify();
    });
    country.addEventListener("blur", () => {
      countryError = (country.value[0] === '+' ? validatePhoneNumber(country.value.slice(1)) : "incorrect character");
      error = numberError || codeError || countryError;
      value.country = country.value;
      notify();
    });
  
    return {
      subscribe,
      error,
      value,
      validatePhoneNumber: () => {
        numberError = validatePhoneNumber(number.value);
        codeError = validatePhoneNumber(code.value);
        countryError = (country.value[0] === '+' ? validatePhoneNumber(country.value.slice(1)) : "incorrect character");
        error = numberError || codeError || countryError;
        return {
          error,
          value,
          fields: { number, code, country }
        };
      },
      fields: { number, code, country }
    };
  }