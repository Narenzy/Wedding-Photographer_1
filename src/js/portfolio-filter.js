import { getCategories, getWeddingPhotos } from './api.js';
import { showLoader, hideLoader } from './loader.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const photoport = document.querySelector('#photoport');
const categories = document.querySelector('#categories');
const buttonport = document.querySelector('#buttonport');

const INITIAL_LIMIT = 9;
const STEP_LIMIT = 3;

let currentCategoryId = '';
let currentPage = 1;
let currentLimit = INITIAL_LIMIT;
let loadedItems = 0;
let totalItems = 0;

async function loadCategories() {
  try {
    const data = await getCategories();
    renderCategories(data);
  } catch (error) {
    iziToast.error({
      message: 'Failed to load data',
      position: 'topRight',
    });
  }
}

function renderCategories(categoriesList) {
  const allPhotosBtn = `
    <li class="categories-item">
      <button class="categories-btn active" type="button" data-id="">
        All Photos
      </button>
    </li>`;

  const markup = categoriesList
    .map(item => {
      return `
        <li class="categories-item">
          <button class="categories-btn"
          type="button"
          data-id="${item._id}">
          ${item.category}
          </button>
        </li>
      `;
    })
    .join('');

  categories.innerHTML = allPhotosBtn + markup;
}

categories.addEventListener('click', onCategoryClick);

function onCategoryClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const btn = event.target;

  if (btn.classList.contains('active')) {
    return;
  }

  const prevActiveBtn = categories.querySelector('.categories-btn.active');
  if (prevActiveBtn) {
    prevActiveBtn.classList.remove('active');
  }
  btn.classList.add('active');

  currentCategoryId = btn.dataset.id;
  currentPage = 1;
  currentLimit = INITIAL_LIMIT;
  loadedItems = 0;

  getFoto(true);
}
async function getFoto(isNewSearch) {
  showLoader();
  buttonport.disabled = true;

  const params = {
    page: currentPage,
    limit: currentLimit,
    sortName: 'title',
  };

  if (currentCategoryId) {
    params.categoryId = currentCategoryId;
  }

  try {
    const data = await getWeddingPhotos(params);

    totalItems = data.totalItems;
    loadedItems += data.weddingPhotos.length;

    renderFotos(data.weddingPhotos, isNewSearch);
    updateShowMoreBtn();
  } catch (error) {
    iziToast.error({
      message: 'Failed to load photos',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function renderFotos(fotosList, isNewSearch) {
  const markup = fotosList
    .map(item => {
      return `<li class="photoport-item">
        <img  class="photoport-img"
              src="${item.img}"
              alt="${item.title}"
              loading="lazy">
           </li>`;
    })
    .join('');

  if (isNewSearch) {
    photoport.innerHTML = markup;
  } else {
    photoport.innerHTML = photoport.innerHTML + markup;
  }
}

buttonport.addEventListener('click', function () {
  currentLimit = STEP_LIMIT;
  currentPage = Math.floor(loadedItems / STEP_LIMIT) + 1;
  getFoto(false);
});

function updateShowMoreBtn() {
  const hasMorePhotos = loadedItems < totalItems;

  if (hasMorePhotos) {
    buttonport.classList.remove('hidden');
    buttonport.disabled = false;
  } else {
    buttonport.classList.add('hidden');
    buttonport.disabled = true;
  }
}

loadCategories();
getFoto(true);
