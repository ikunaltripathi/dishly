import { async } from 'regenerator-runtime';
import { API_URL , RESULT_PER_PAGE, KEY} from './config';
import { AJAX } from './helper';
// import { getJSON , sendJSON} from './helper';

export const state = {
  //contains all the data about the application so include the search res
  recipe: {},
  search: {
    query: '', // maybe for some data analytics in future
    results: [],
    page : 1,
    // resultsPerPage : 10 magic no -> config
    resultsPerPage : RESULT_PER_PAGE,
  },
  bookmarks : []
};

const getRecipeFormat = function(data) {
  const { recipe } = data.data;
  return {
    //assigning the ref to a new obj
    id : recipe.id,
    image: recipe.image_url,
    time: recipe.cooking_time,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    source: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && {key : recipe.key}), //obj is returned then values spread 
  };
}
export const loadRecipe = async function (id) {
  try {
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json(); // also returns a promise .json is a meth on response obj
    // if (!res.ok) throw new Error(data.message);
    // // console.log(res, data);
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = getRecipeFormat(data);

    // adding bookmarked prprty to each recipe loaded (basically we are loading these recipes straight from the api then how will we remember that curr recipe we have bookmarked or not thatswhy if we have prev done it then just add a prprty to it.)
    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // alert(err);
    // console.error(err);
    throw err;
  }
};

//model also doesn't know about controller so implement in a way mvc rule follows.

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`); // including the key here will load search results including our recipes
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && {key : rec.key})
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

// while implementing a func start with model ->controller -> view
// In model while creating a new data see if it imp data & should it be incl in state.

export const getSearchResults = function(page = state.search.page) {
  state.search.page = page; // imp data for the state add it.
  const start = (page-1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage; // cuz one less for slice method
  return state.search.results.slice(start, end);
  // add resultsPerPage to state cuz its imp data
}

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings; 
  // new Qty = oldQty * newServings /oldServings;
};

//bookmarks
export const addBookmark = function(recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true; // useful for updating in the view as well this prprty (render krte waqt pta ho ki fill class lgani hai)
  storeData();
};

export const deleteBookmark = function(id) { // its a common pattern that while adding something to state you pass whole obj then while deleting it you only need to pass the id.
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false; // so that in the view it will not get a fill class
  storeData();
}

// local storage -> when adding or deleting bookmarks cuz don't know when it is gone
const storeData = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const uploadRecipe = async function(newRecipe) {
  try {
    console.log(newRecipe);
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').
    map(ing => {
      const ingArr = ing[1].split(',').map(word => word.trim ());
      if (ingArr.length != 3) throw new Error("Incorrect Format! please enter the correct Format for Ingredients."); //think of the wrong input

      const [quantity, unit, description] = ingArr;
      return {quantity : quantity? +quantity : null, unit, description}; // basically in map you can send anything obtained and it will only insert that thing even if no relation to input object
    });
    const recipe = {
      cooking_time : +newRecipe.cookingTime,
      ingredients,
      publisher : newRecipe.publisher,
      servings : +newRecipe.servings,
      image_url : newRecipe.image,
      source_url : newRecipe.sourceUrl,
      title : newRecipe.title
    };
    const data = await AJAX(`${API_URL}/?key=${KEY}`, recipe); // url gets in config *****
    state.recipe = getRecipeFormat(data); // we will pass the same json format that we recieve form the api
    addBookmark(state.recipe);
  }
  catch(err) {
    throw err;
  }
}

const init  = function() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function() {
  localStorage.clear('bookmarks');
}
// clearBookmarks();




