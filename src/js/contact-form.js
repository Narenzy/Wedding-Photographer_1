import { createOrder } from './api.js';
import { openModal } from './modal.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contacts-form');
  const phoneInput = document.getElementById('contact-phone');
  const nameInput = document.getElementById('contact-name');
  const messageInput = document.getElementById('contact-message');

  const showError = input => {
    input.classList.add('error');
  };

  const clearErrors = () => {
    [nameInput, phoneInput, messageInput].forEach(input => {
      input.classList.remove('error');
    });
  };

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

    if (name.length < 2) {
      showError(nameInput);
      hasError = true;
    }

    if (phone.length < 9) {
      showError(phoneInput);
      hasError = true;
    }

    if (message.length < 10) {
      showError(messageInput);
      hasError = true;
    }

    if (hasError) return;

    const submitBtn = form.querySelector('.contacts__form-btn');
    const originalBtnText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      await createOrder({ name, phone, message: message });

      iziToast.success({
        title: 'Success',
        message: 'Your message has been sent successfully!',
      });

      openModal();
      form.reset();
    } catch (error) {
      console.error('API Error:', error);
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
