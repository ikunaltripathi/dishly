import View from './view';
class AddRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btn = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded!';

  constructor() {
    // don't need a controller to interfere
    super(); //need to call super to use this keyword || Before you can set properties on the child class's instance, the parent class's instance needs to be set up and initialized.
    this._addHandlerWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerWindow() {
    const callBack = this._toggleWindow.bind(this); // this keyword inside the handler points to ele to which it is attached to
    this._btn.addEventListener('click', callBack); // can't use any prprty or meth without this
    this._overlay.addEventListener('click', callBack);
    this._btnClose.addEventListener('click', callBack);
  }

  addHandlerUploadRecipe(handler) {
    //add handler upload publisher subscriber pattern
    this._parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // cuz inside a handler func
      const data = Object.fromEntries(dataArr); // converting entries to object
      handler(data);
    });
  }
  // Api calls happen in the module {business logic}
}
export default new AddRecipeView(); // need to import this to controller cuz otherwise the obj won't be created and neither of these event listenrs will be createdd.
