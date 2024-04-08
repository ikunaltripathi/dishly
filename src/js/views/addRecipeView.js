import View from './view';
class AddRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btn = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded!';


<<<<<<< HEAD
  constructor() { // don't need a controller to interfere
    super(); //need to call super to use this keyword || Before you can set properties on the child class's instance, the parent class's instance needs to be set up and initialized.
=======
  constructor() {
    super();
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
    this._addHandlerWindow();
  }

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerWindow() {
<<<<<<< HEAD
    const callBack = this._toggleWindow.bind(this); // this keyword inside the handler points to ele to which it is attached to
    this._btn.addEventListener('click', callBack); // can't use any prprty or meth without this
=======
    const callBack = this._toggleWindow.bind(this);
    this._btn.addEventListener('click', callBack);
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
    this._overlay.addEventListener('click', callBack);
    this._btnClose.addEventListener('click', callBack);
  }

<<<<<<< HEAD
  addHandlerUploadRecipe(handler) { //add handler upload publisher subscriber pattern
    this._parentEle.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const dataArr = [...new FormData(this)]; // cuz inside a handler func
        const data = Object.fromEntries(dataArr);// converting entries to object
=======
  addHandlerUploadRecipe(handler) {
    this._parentEle.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const dataArr = [...new FormData(this)];
        const data = Object.fromEntries(dataArr);
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
        handler(data);
    });
                                    
    }
<<<<<<< HEAD
    // Api calls happen in the module {business logic}
}
export default new AddRecipeView(); // need to import this to controller cuz otherwise the obj won't be created and neither of these event listenrs will be createdd.
=======
}
export default new AddRecipeView();
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387

