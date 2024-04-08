import View from './view';
import previewView from './previewView';
class ResultsView extends View {
  _parentEle = document.querySelector('.results');
  _errorMessage = `No recipe found for your query, Please try again!`;
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join(''); 
  }
}

export default new ResultsView();
