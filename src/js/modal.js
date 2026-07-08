const refs = {
  modal: document.querySelector('.success-modal'),
  closeBtn: document.querySelector('.modal-close-btn'),
};

export function openModal() {
  refs.modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function handleBackdropClick(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

refs.closeBtn.addEventListener('click', closeModal);
refs.modal.addEventListener('click', handleBackdropClick);
document.addEventListener('keydown', handleEscapeKey);
