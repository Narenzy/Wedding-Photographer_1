document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contacts-form');
  const phoneInput = document.getElementById('contact-phone');
  const nameInput = document.getElementById('contact-name');
  const messageInput = document.getElementById('contact-message');

  const showError = (input) => {
    input.classList.add('error');
  };

  const clearErrors = () => {
    [nameInput, phoneInput, messageInput].forEach(input => {
      input.classList.remove('error');
    });
  };

  phoneInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const cleanValue = value.replace(/[^0-9+\-]/g, '');
    
    if (value !== cleanValue) {
      e.target.value = cleanValue;
    }

    if (cleanValue.includes('+') || cleanValue.includes('-')) {
      showError(phoneInput);
    } else {
      phoneInput.classList.remove('error');
    }
  });

  form.addEventListener('submit', async (e) => {
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

    if (phone.length < 12 || phone.includes('+') || phone.includes('-')) {
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
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      alert('Thank you! Your message has been sent successfully. ✨');
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});