import icons from 'url:../../img/icons.svg';
import num2fraction from 'num2fraction';
// we import pkgs from npm when we want a functionality & don't wanna apply ourselves.(num2F)
class RecipeView {
  #parentEle = document.querySelector('.recipe');
  #data;
  #errorMessage = `We couldn't find that recipe. Please try again!`;
  #message = '';

  render(data) {
    this.#data = data;
    const html = this.#generateMarkup();
    this.#clear();
    this.#parentEle.insertAdjacentHTML('afterbegin', html);
  }

  renderLoader() {
    // presentation logic -> view
    const markup = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this.#parentEle.innerHTML = markup;
  }

  #clear() {
    this.#parentEle.innerHTML = '';
  }

  addAllRender(handler) {
    //publisher-subscriber pattern
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }

  renderError(msg = this.#errorMessage) {
    const markup = `<div class="error">
        <div>
        <svg>
            <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${msg}</p>
  </div>`;
    this.#parentEle.innerHTML = markup;
  }

  renderSuccess(msg = this.#message) {
    const markup = `<div class="message">
        <div>
        <svg>
            <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${msg}</p>
  </div>`;
    this.#parentEle.innerHTML = markup;
  }

  #generateMarkup() {
    return `<figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>
    
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.time
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="src/img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this.#data.servings
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
          ${this.#data.ingredients
            .map(ing => this.#generateIngredients(ing))
            .join('')}
      </div>
    
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.source}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }

  #generateIngredients(ing) {
    // one task per func
    return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? num2fraction(ing.quantity) : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
        </div>
    </li>`;
  }
}
// don't need any constructor cuz no data passed
export default new RecipeView(); // why without def it doesn't works cuz named exports require a unique name || not exporting the whole class cuz no use and abstraction, overhead for controller || takeaway -> don't add overheads for controller, pass obj's instead

// What we r trying to do? -> create specific class obj and just call some functionality on that obj the func will be working same for all other objects like render spinner in various places. -> oops

// everything related to dom should be in view
