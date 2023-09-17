import View from './view';
import previewView from './previewView';
class BookmarkView extends View {
  _parentEle = document.querySelector('.bookmarks__list');
  _errorMessage = `No Bookmarks yet!`;
  _message = '';

  addHandlerBookmarks (handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // return this._data.map(previewView._generateMarkup()).join(''); // don't do it like this || why?? cuz we still needed to set the data property to the data that we passed in (view.js) || data flow -> bookmarks.render (bookmarks array so data property of that one is whole bookmarks array then we call preview.render on which the data property of that one will be the current bookmark and we needed to set the this.data so we called render instead of directly calling generate markup of preview.js).
    return this._data.map(bookmark => previewView.render(bookmark, false)).join(''); // rendering it one by one  
  }
}
export default new BookmarkView();
