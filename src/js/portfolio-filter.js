const photoport = document.querySelector("#photoport");
const categories = document.querySelector("#categories");
const loader = document.querySelector("#loader");
const buttonport = document.querySelector("#buttonport");

const BASE_URL = "https://wedding-photographer.b.goit.study/api";
const INITIAL_LIMIT = 9; 
const STEP_LIMIT = 3; 


let currentCategoryId = ""; 
let currentPage = 1;
let currentLimit = INITIAL_LIMIT;
let loadedItems = 0; 
let totalItems = 0;  

                  
async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error("Не вдалося завантажити категорії");
    }

    const data = await response.json();

    renderCategories(data);
  } catch (error) {
    console.log(error);
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
    .map((item) => {
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
    .join("");

  categories.innerHTML = allPhotosBtn + markup;
}

categories.addEventListener("click", onCategoryClick);

function onCategoryClick(event) {
  if (event.target.nodeName !== "BUTTON") {
    return; 
  }

  const btn = event.target;

  if (btn.classList.contains("active")) {
    return; 
  }

  const prevActiveBtn = categories.querySelector(".categories-btn.active");
  if (prevActiveBtn) {
    prevActiveBtn.classList.remove("active");
  }
  btn.classList.add("active");

 
  currentCategoryId = btn.dataset.id;
  currentPage = 1;
  currentLimit = INITIAL_LIMIT;
  loadedItems = 0;

  getFoto(true);
}

                
async function getFoto(isNewSearch) {
  showLoader();
  buttonport.disabled = true;

  let url =
    BASE_URL +
    "/wedding-photos?page=" +
    currentPage +
    "&limit=" +
    currentLimit +
    "&sortName=title";

  if (currentCategoryId) {
    url += "&categoryId=" + currentCategoryId;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error");
    }

    const data = await response.json();

    totalItems = data.totalItems;
    loadedItems += data.weddingPhotos.length;

    renderFotos(data.weddingPhotos, isNewSearch);
    updateShowMoreBtn();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader(); 
  }
}

function renderFotos(fotosList, isNewSearch) {
  const markup = fotosList
    .map((item) => {
      return `<li class="photoport-item">
        <img  class="photoport-img"
              src="${item.img}"
              alt="${item.title}"
              loading="lazy">
           </li>`;
    })
    .join("");

  if (isNewSearch) {
    photoport.innerHTML = markup; 
  } else {
    photoport.innerHTML = photoport.innerHTML + markup; 
  }
}

                 
buttonport.addEventListener("click", function () {
  currentLimit = STEP_LIMIT;
  currentPage = Math.floor(loadedItems / STEP_LIMIT) + 1;
  getFoto(false);
});

function updateShowMoreBtn() {
  const hasMorePhotos = loadedItems < totalItems;

  if (hasMorePhotos) {
    buttonport.classList.remove("hidden");
    buttonport.disabled = false;
  } else {
    buttonport.classList.add("hidden");
    buttonport.disabled = true;
  }
}

                 
function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// START
getCategories();
getFoto(true);