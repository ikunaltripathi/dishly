import 'core-js/stable'; // only ecmascript stable features and not experimental
import 'regenerator-runtime/runtime'; // async await
import icons from 'url:../img/icons.svg'; // scipts in parcel can't have imports/exports so make it a module || // in the newly created files by parcel the path is unavailable so we r gonna import the files and set the path. can import all kinds of assets via parcel.
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const loader = function (parentEl) {
  const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
  parentEl.innerHTML = markup;
};
///////////////////////////////////////
// parcel converts sass to css as browser doesn't understands it.
// parcel build/start && source prprty in pkg.json -> gives entry point to the parcel to start its work.
//Parcel can compile your source code in multiple different ways simultaneously. These are called targets. For example, you could have a “modern” target that targets newer browsers and a “legacy” target for older browsers. The main field is intended for libraries. Libraries are modules that can be used by other projects. The main field specifies the file that should be loaded when someone requires your library. thatswhy only js files.
// npm command: npm i Parcel@next(for newer version) -D(for dev dependency)

// loading a recipe
const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    loader(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json(); // also returns a promise .json is a meth on response obj
    if (!res.ok) throw new Error(data.message);
    // console.log(res, data);
    let { recipe } = data.data;
    recipe = {
      //assigning the ref to a new obj
      image: recipe.image_url,
      time: recipe.cooking_time,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipe);

    // 2. Rendering recipe
    const html = `<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>
        <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients
        .map(ing => {
          return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
        `;
        })
        .join('')}
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.source}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    alert(err);
  }
};
getRecipe();

['load', 'hashchange'].forEach(ev => window.addEventListener(ev, getRecipe)); // eff way of attaching same callback to multiple events. (think all possibilites)
