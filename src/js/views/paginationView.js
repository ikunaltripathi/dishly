import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
    _parentEle = document.querySelector('.pagination');

    _generateMarkup() {
        const currPage = this._data.page;
        const numOfPages = Math.ceil (this._data.results.length / this._data.resultsPerPage); 
        if (currPage === 1 && numOfPages > 1) 
        return this._getMarkupButton('next', currPage);
        if (currPage > 1 && currPage < numOfPages) 
        return `${this._getMarkupButton('prev', currPage)} ${this._getMarkupButton('next', currPage)}`;
        if (currPage === numOfPages) 
        return this._getMarkupButton('prev', currPage);
        return ``;
    }

    _getMarkupButton(btnType, currPage) {
        const targetPage = btnType === 'prev'? currPage-1:currPage+1; 
        return `<button data-goto= "${targetPage}" class="btn--inline pagination__btn--${btnType}">
                    <span>Page ${targetPage}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-${btnType === 'prev'? 'left' : 'right'}"></use>
                    </svg>
                </button>`;
    }

    addHandlerClick(handler) {
        this._parentEle.addEventListener('click', function(e) {
            const btnEle = e.target.closest('.btn--inline');
            if (!btnEle) return;
            handler(+btnEle.dataset.goto);
        });
    }

}

export default new PaginationView();