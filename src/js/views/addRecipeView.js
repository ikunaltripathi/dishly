import View from './view';
class AddRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btn = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded!';

  constructor() {
    super();
    this._addHandlerWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerWindow() {
    const callBack = this._toggleWindow.bind(this);
    this._btn.addEventListener('click', callBack);
    this._overlay.addEventListener('click', callBack);
    this._btnClose.addEventListener('click', callBack);
  }

  addHandlerUploadRecipe(handler) {
    this._parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new AddRecipeView();
