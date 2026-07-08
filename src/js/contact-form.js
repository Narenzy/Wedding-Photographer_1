import { createOrder } from './api.js';
import { openModal } from './modal.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contacts-form');
  const phoneInput = document.getElementById('contact-phone');
  const nameInput = document.getElementById('contact-name');
  const messageInput = document.getElementById('contact-message');

  const showError = (input, message) => {
    input.classList.add('error');
    const errorSpan = input.parentElement.querySelector('.contacts__form-error');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  };

  const clearErrors = () => {
    [nameInput, phoneInput, messageInput].forEach(input => {
      input.classList.remove('error');
    });
  };

  [nameInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
    });
  });

  phoneInput.addEventListener('input', e => {
    const value = e.target.value;
    const cleanValue = value.replace(/[^0-9]/g, '');

    if (value !== cleanValue) {
      e.target.value = cleanValue;
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;

    const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+$/;

    if (name.length < 2) {
      showError(nameInput, 'Name must be at least 2 characters long.');
      hasError = true;
    } else if (!nameRegex.test(name)) {
      showError(nameInput, 'Name must contain letters only.');
      hasError = true;
    }

    if (phone.length !== 12) {
      showError(phoneInput, 'Phone number must contain exactly 12 digits (including country code).');
      hasError = true;
    }

    if (message.length > 0 && message.length < 5) {
      showError(messageInput, 'Message is optional, but must be at least 5 characters long.');
      hasError = true;
    }

    if (hasError) return;

    const submitBtn = form.querySelector('.contacts__form-btn');
    const originalBtnText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const requestData = {
      name: name,
      phone: phone
    };

    try {
      await createOrder(requestData);

      iziToast.success({
        title: 'Success',
        message: 'Your message has been sent successfully!',
      });

      openModal();
      form.reset();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('DETAILED SERVER ERROR:', error.response.data);
      } else {
        console.error('API Error:', error);
      }
      
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});