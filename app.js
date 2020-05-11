// words bank to suggest password
const WORDS = ["search","water","down","name","cloud","shallow","because","headed","great","electricity","among","rise","provide","donkey","clothing","goes","examine","jungle","start","dish","widely","flies","plural","sold","ancient","route","art","sick","taste","hang","image","happy","weather","knife","wall","except","satellites","also","tonight","suppose","wise","congress"];

// grab html elements
let userPassword = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let phoneNumber = document.querySelector('#phoneNumber');
let emailAddress = document.querySelector('#emailAddress');
let streetAddress = document.querySelector('#streetAddress');
let fullName = document.querySelector('#fullName');
let submitButton = document.querySelector('.submitButton');
let resetButton = document.querySelector('.clearButton');
let termsOfService = document.querySelector('input[type="checkbox"]');
let form = document.querySelector('form');
let suggestButton = document.querySelector('.suggestButton');

// create the wrong password div
let badPassword = document.createElement('div');
// add the styling to that element
badPassword.classList.add('badPassword');

// initialize password suggestion string
let suggestedPassword;
// create the suggested password div
let wordSuggest = document.createElement('div');
// add styling to the wordSuggest element
wordSuggest.classList.add('wordSuggest');

// add click listener to the suggest button
suggestButton.addEventListener('click', suggestPassword);

// add click listener to reset button
resetButton.addEventListener('click', resetForm);

// add click listener to submit button
submitButton.addEventListener('click', formValidity);

function formValidity(e) {
  // check if terms is checked and comparePassword is true
  if (termsOfService.checked && comparePassword()) {
    alert("User created")
  // alert user that he needs to accept terms of service
  } else if (!termsOfService.checked) {
    alert("Please accept the non existent terms of service")
  // prevent to form from submitting if not valid
  } else {
    e.preventDefault();
  }
}

function resetForm() {
  // reinitialize all inputs
  fullName.value = '';
  streetAddress.value = '';
  emailAddress.value = '';
  phoneNumber.value = '';
  userPassword.value = '';
  confirmPassword.value = '';
  termsOfService.checked = false;
  // hide additionnal alerts
  badPassword.style.display = 'none';
  wordSuggest.style.display = 'none';
  // remove border on password input
  userPassword.setAttribute('style', 'border: 1px solid grey;');
  confirmPassword.setAttribute('style', 'border: 1px solid grey;');
}

function comparePassword() {
  // return true if passwords are the same and more than 10 character long
  if (userPassword.value === confirmPassword.value && userPassword.value.length >= 10) {
    return true
  // alert user to have longer password if length is less than 10 and not 0
  } else if (userPassword.value.length < 10 && userPassword.value.length !== 0) {
    // display the alert
    badPassword.style.display = 'flex';
    // update innerText of said alert
    badPassword.innerText = 'Your password is too short! Please provide a password \nwith at least 10 characters. Click the teal button for a suggestion!';
    // add red borders to show what field needs change
    confirmPassword.setAttribute('style', 'border: 4px solid hsl(333deg, 100%, 44%);');
    userPassword.setAttribute('style', 'border: 4px solid hsl(333deg, 100%, 44%);');
    // add the div to the form in html
    form.insertBefore(badPassword, form.childNodes[4]);
    // put the focus on userPassword so he can change without clicking
    userPassword.focus();
  // check if password is present and the confirmation isn't valid
  } else if (userPassword.value.length !== 0) {
    // display the alert
    badPassword.style.display = 'flex';
    // update innerText of said alert
    badPassword.innerText = 'Please make sure to confirm your password';
    // add red border to the confirm input
    confirmPassword.setAttribute('style', 'border: 4px solid hsl(333deg, 100%, 44%);');
    // remove red border / add grey border to user password input
    userPassword.setAttribute('style', 'border: 1px solid grey;');
    // add the div to the form in html
    form.insertBefore(badPassword, form.childNodes[4]);
    // put the focus on confirm input so user doesn't need to click
    confirmPassword.focus();
  }
}

function suggestPassword() {
  // reinitialize the password
  suggestedPassword = '';
  // add 4 different words to the string
  for (let i = 0; i < 4; i++) {
    // random number between 0 and WORDS.length
    let randomNum = Math.floor(Math.random() * WORDS.length);
    // add a hyphen between each words
    suggestedPassword += WORDS[randomNum] + '-';
  }
  // remove last hyphen
  suggestedPassword = suggestedPassword.slice(0, (suggestedPassword.length - 1));
  // display the suggested word 
  wordSuggest.style.display = 'flex';
  // update the text with the generated word
  wordSuggest.innerText = suggestedPassword;
  // add the alert to the form
  form.insertBefore(wordSuggest, form.childNodes[6]);
}