import lThrottle from 'lodash.throttle';

const formRef = document.querySelector('form.feedback-form');
const fieldEmail = document.querySelector('input[name=email]');
const fieldMessage = document.querySelector('textarea[name=message]');
const valueFields = { email: '', message: '' };

const throttle = lThrottle(ev => {
  localStorage.setItem('feedback-form-state', JSON.stringify(ev));
}, 500);

formRef.addEventListener('input', ev => {
  const field = ev.target;
  if (field.name === 'email') valueFields.email = field.value;
  if (field.name === 'message') valueFields.message = field.value;
  throttle(valueFields);
});

document.addEventListener('DOMContentLoaded', () => {
  const values = getLocalStorageValues();
  if (!values) return;
  setValues(values.email, values.message);
});

formRef.addEventListener('submit', elem => {
  elem.preventDefault();
  const values = getLocalStorageValues();
  if (!values) return;
  setValues('', '');
  console.log(values);
  localStorage.removeItem('feedback-form-state');
});

const setValues = (mail, msg) => {
  fieldEmail.value = mail;
  fieldMessage.value = msg;
};
const getLocalStorageValues = () =>
  JSON.parse(localStorage.getItem('feedback-form-state'));
