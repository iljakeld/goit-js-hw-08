import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
  }
}

function onFormInput(event) {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    formData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);

  console.log(formData);
}