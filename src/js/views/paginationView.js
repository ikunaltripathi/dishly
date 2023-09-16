//Optimised to the deepest -> All scenarios :
// 1st page -> no prev, then last page no next etc
// upon creating even a small property think where it is most suitable like currpage -> state not in this class.
import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
    _parentEle = document.querySelector('.pagination');

    _generateMarkup() {
        const currPage = this._data.currPage;
        console.log(this._data);
        const numOfPages = Math.ceil (this._data.results.length / this._data.resultsPerPage); 
        if (currPage == 1 && numPage > 1) 
        return `<button class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
        if (currPage > 1 && currPage < numOfPages) 
        return `<button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage-1}</span>
                    </button>
                    <button class="btn--inline pagination__btn--next">
                    <span>Page ${currPage +1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
        if (currPage == numOfPages) 
        return `<button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage-1}</span>
                </button>`;
        return ``;
    }

}

export default new PaginationView();