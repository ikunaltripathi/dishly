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
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}
export default new BookmarkView();
