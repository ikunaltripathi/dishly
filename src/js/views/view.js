import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  // JS DOC -> Documentation format
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    // don't want preview.js to render thatswhy render(parameter)
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); // !data works for undefined and nulll only & we are receiving an empty array
    this._data = data;
    const html = this._generateMarkup();
    if (!render) return html;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEle.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attri =>
          curEl.setAttribute(attri.name, attri.value)
        );
      }
    });
  }

  renderLoader() {
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

  renderMessage(_msg = this._message) {
    const markup = `<div class="message">
          <div>
          <svg>
          <use href="${icons}#icon-smile"></use>
          </svg>
          </div>
          <p>${_msg}</p>
          </div>`;
    this._parentEle.innerHTML = markup;
  }
}
