import * as model from './model.js';
<<<<<<< HEAD
import 'core-js/stable'; // only ecmascript stable features and not experimental
import 'regenerator-runtime/runtime'; // async await
import { MODAL_CLOSE_SEC } from './config.js'; // named import
import recipeView from './views/recipeView.js'; // default import
=======
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
<<<<<<< HEAD
// scipts in parcel can't have imports/exports so make it a module || // in the newly created files by parcel the path is unavailable so we r gonna import the files and set the path. can import all kinds of assets via parcel.
// const recipeContainer = document.querySelector('.recipe');
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387



const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderLoader();

    resultsView.update(model.getSearchResults());
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
getRecipe();

const controlSearchResults = async function () {
  try {
    resultsView.renderLoader();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResults());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(gotoPage) {
  resultsView.render(model.getSearchResults(gotoPage));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {
    addRecipeView.renderLoader();
<<<<<<< HEAD
    await model.uploadRecipe(newRecipe); //by not awaiting it will immediately return a promise and the error will not be shown
    recipeView.render(model.state.recipe); 
    addRecipeView.renderMessage();// with these methods its convenient to add the msgs

    controlBookmarks( ); // not using update here cuz need to insert a new ele \\ always use update for correction

    window.history.pushState(null, '', `${model.state.recipe.id}`); // history -> api, utilises changing id without reloading the page
    // window.history.back(); for going back in the page
=======
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe); 
    addRecipeView.renderMessage();

    controlBookmarks( );

    window.history.pushState(null, '', `${model.state.recipe.id}`);
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387


    setTimeout(
      function() {
<<<<<<< HEAD
        addRecipeView._toggleWindow(); // close form window
      }, MODAL_CLOSE_SEC * 1000); //2500 no magic no
=======
        addRecipeView._toggleWindow();
      }, MODAL_CLOSE_SEC * 1000);
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
  }
  catch(err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerBookmarks(controlBookmarks);
  recipeView.addAllRender(getRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
};
init();

<<<<<<< HEAD
// in controller only call functions don't write any logic here

// --dist-dir ./dist
// distribution directory
=======

>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
