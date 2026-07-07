import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getFeedbacks } from './api.js';

async function renderFeedbacks() {
  const wrapper = document.querySelector('.feedbacks-list');
  if (!wrapper) return;

  try {
    const data = await getFeedbacks();
    const feedbacks = data.feedbacks;

    wrapper.innerHTML = feedbacks
      .map(
        ({ name, descr }) => `
        <li class="feedbacks-card swiper-slide">
          <blockquote class="feedbacks-quote">
            <p class="feedbacks-comment">"${descr}"</p>
            <cite class="feedbacks-author">${name}</cite>
          </blockquote>
        </li>
      `
      )
      .join('');

    initSwiper();
  } catch (error) {
    console.error('Failed to load feedbacks:', error);
  }
}

function initSwiper() {
  new Swiper('.feedbacks-slider', {
    modules: [Navigation, Pagination, Keyboard, A11y],
    slidesPerView: 'auto',
    spaceBetween: 24,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: true,
    navigation: {
      nextEl: '.feedbacks-btn-next',
      prevEl: '.feedbacks-btn-prev',
      disabledClass: 'feedbacks-btn-disabled',
    },
    pagination: {
      el: '.feedbacks-pagination',
      clickable: true,
    },
  });
}

renderFeedbacks();
