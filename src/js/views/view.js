import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError(); // !data works for undefined and nulll only & we are receiving an empty array
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', html);
  }

  renderLoader() {
    // presentation logic -> view
    const markup = `<div class="spinner">
                      <svg>
                        <use href="${icons}#icon-loader"></use>
                      </svg>
                    </div>`;
    this._parentEle.innerHTML = markup;
  }

  _clear() {
    this._parentEle.innerHTML = '';
  }

  renderError(msg = this._errorMessage) {
    const markup = `<div class="error">
          <div>
          <svg>
          <use href="${icons}#icon-alert-triangle"></use>
          </svg>
          </div>
          <p>${msg}</p>
          </div>`;
    this._parentEle.innerHTML = markup;
  }

  renderSuccess(msg = this._message) {
    const markup = `<div class="message">
          <div>
          <svg>
          <use href="${icons}#icon-smile"></use>
          </svg>
          </div>
          <p>${msg}</p>
          </div>`;
    this._parentEle.innerHTML = markup;
  }
}
