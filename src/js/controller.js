import * as model from './model.js';
import 'core-js/stable'; // only ecmascript stable features and not experimental
import 'regenerator-runtime/runtime'; // async await
import { MODAL_CLOSE_SEC } from './config.js'; // named import
import recipeView from './views/recipeView.js'; // default import
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// scipts in parcel can't have imports/exports so make it a module || // in the newly created files by parcel the path is unavailable so we r gonna import the files and set the path. can import all kinds of assets via parcel.
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// parcel converts sass to css as browser doesn't understands it.
// parcel build/start && source prprty in pkg.json -> gives entry point to the parcel to start its work.
//Parcel can compile your source code in multiple different ways simultaneously. These are called targets. For example, you could have a “modern” target that targets newer browsers and a “legacy” target for older browsers. The main field is intended for libraries. Libraries are modules that can be used by other projects. The main field specifies the file that should be loaded when someone requires your library. thatswhy only js files.
// npm command: npm i Parcel@next(for newer version) -D(for dev dependency)
// if (module.hot) {
//   module.hot.accept();
// }

// loading a recipe
const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // renderLoader(recipeContainer);
    recipeView.renderLoader();

    resultsView.update(model.getSearchResults());
    // 1. Load Recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
    // debugger;
    bookmarksView.update(model.state.bookmarks); // for active class
  } catch (err) {
    // alert(err);
    // recipeView.renderError(`Can't load the recipe`); // wrong place to declare the msg cuz it deals with the view \\ think every components right place.
    recipeView.renderError();
    console.error(err);
  }
};
getRecipe();
// ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, getRecipe)); //need to shift it to view but can't import getRecipe in view cuz view doesn't not know anything about the controller (rule of mvc)
// eff way of attaching same callback to multiple events. (think all possibilites)
// command when parcel doesn't runs -> Remove-Item -Force .cache
// keep the code in controller minimal

const controlSearchResults = async function () {
  try {
    resultsView.renderLoader();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results); for pagination create a func that will only send limited data to render each time.
    resultsView.render(model.getSearchResults());

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(gotoPage) { // these func's are just event handlers that run upon some event
  resultsView.render(model.getSearchResults(gotoPage));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  model.updateServings(newServings); // controller will not update the servings rather view will. mvc (Keep the controller flexible as possible)
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);// thatswhy we stored entire data about bookmarks to display it
};

const controlBookmarks = function() { // cuz while calling the update at the getRecipe controller if there are no bookmarks yet so virtual dom is comparing elements to currDom and both the arrays have different length
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {
    addRecipeView.renderLoader();
    await model.uploadRecipe(newRecipe); //by not awaiting it will immediately return a promise and the error will not be shown
    recipeView.render(model.state.recipe); 
    addRecipeView.renderMessage();// with these methods its convenient to add the msgs

    controlBookmarks( ); // not using update here cuz need to insert a new ele \\ always use update for correction

    window.history.pushState(null, '', `${model.state.recipe.id}`); // history -> api, utilises changing id without reloading the page
    // window.history.back(); for going back in the page


    setTimeout(
      function() {
        addRecipeView._toggleWindow(); // close form window
      }, MODAL_CLOSE_SEC * 1000); //2500 no magic no
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

// in controller only call functions don't write any logic here

// --dist-dir ./dist
// distribution directory