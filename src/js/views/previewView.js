import View from './view';

class PreviewView extends View { // using previewview as a child of the bookmarks and resultsview
    _parentEle = '';
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${this._data.id === id? 'preview__link--active' : ''}" href="#${this._data.id}">
            <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">
                ${this._data.title}
            </h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            </div>
        </a>
    </li>
    `;
  }
}
export default new PreviewView();

// why all this fuss?? cuz we can't send parameter result to this generate Markup so to access data directly we want this keyword here so need to set the this._data first so render already has that -> modified the render method.
