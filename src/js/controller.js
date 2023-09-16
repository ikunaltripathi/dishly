import * as model from './model.js';
import 'core-js/stable'; // only ecmascript stable features and not experimental
import 'regenerator-runtime/runtime'; // async await
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
// scipts in parcel can't have imports/exports so make it a module || // in the newly created files by parcel the path is unavailable so we r gonna import the files and set the path. can import all kinds of assets via parcel.
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// parcel converts sass to css as browser doesn't understands it.
// parcel build/start && source prprty in pkg.json -> gives entry point to the parcel to start its work.
//Parcel can compile your source code in multiple different ways simultaneously. These are called targets. For example, you could have a “modern” target that targets newer browsers and a “legacy” target for older browsers. The main field is intended for libraries. Libraries are modules that can be used by other projects. The main field specifies the file that should be loaded when someone requires your library. thatswhy only js files.
// npm command: npm i Parcel@next(for newer version) -D(for dev dependency)
if (module.hot) {
  module.hot.accept();
}

// loading a recipe
const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // renderLoader(recipeContainer);
    recipeView.renderLoader();

    // 1. Load Recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    // recipeView.renderError(`Can't load the recipe`); // wrong place to declare the msg cuz it deals with the view \\ think every components right place.
    recipeView.renderError();
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
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addAllRender(getRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
