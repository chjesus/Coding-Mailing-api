/**
 * import styles scss
 */

import './scss/style.scss';

/**
 * import images in the project
 *
 * import Icon from './img/name.jpg';
 */

/**
 * import multiple js files
 *
 * import { nameFunction } from "./name.js"
 */

/**
 * import if you want to use bootstrap
 *
 * import 'bootstrap';
 */

/**
  * import if you want to use jquery
  *
  * import $ from 'jquery';
  */

const btn = document.getElementById('btn');
const email = document.getElementById('email');
const errorMessage = document.getElementById('error');
const succesMessage = document.getElementById('succes');

const containerError = document.querySelector('.error');
const containerSucces = document.querySelector('.succes');

const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const fecthEmail = async (emailSend) => {
  const response = await fetch('https://api.staging.fourthwall.com/api/mailing-list', {
    body: `{ "email": "${emailSend}" }`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopid': 'sh_9f57832f-456b-44f3-888f-8a370b155a18',
    },
    method: 'POST',
  });

  const data = await response.json();
  return data.id;
};

const validateSignUp = async () => {
  if (email.value === '') {
    errorMessage.textContent = 'Enter an Email';
    containerError.classList.add('active');
  } else if (!emailValidation.test(email.value)) {
    errorMessage.textContent = 'Email no valid';
    containerError.classList.add('active');
  } else {
    const emailToken = await fecthEmail(email.value);

    succesMessage.textContent = `You token is: ${emailToken}`;
    containerError.classList.remove('active');
    containerSucces.classList.add('active');
  }
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  validateSignUp();
});
