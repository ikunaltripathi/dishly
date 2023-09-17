import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) { // don't want preview.js to render thatswhy render(parameter)
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError(); // !data works for undefined and nulll only & we are receiving an empty array
    this._data = data;
    const html = this._generateMarkup();
    if (!render) return html;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', html);
  }

  update(data) { // on every view we want the update
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // returns a new range obj which contains a fragment of a document that can contain nodes and parts of text nodes.
    // createContextualFragment The DocumentFragment interface represents a minimal document object that has no parent It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document.
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEle.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl)); // the parent ele component also got false due to any change in child
      // if (!newEl.isEqualNode(curEl)) curEl.textContent = newEl.textContent; // cuz the container was false we replaced entire container with text content ||  The textContent property retrieves all of the text inside an element, including the text within its descendant elements (child elements, their children, and so on).
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') curEl.textContent = newEl.textContent; // making sur newEl is a textele

      // updates change attributes cuz can't go forward more than one time cuz data attri not got updated.
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attrib  utes); // returns NamedNodeMap(live changes)
        Array.from(newEl.attributes).forEach(attri => curEl.setAttribute(attri.name, attri.value)); 
      }
    });

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
