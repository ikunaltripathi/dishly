import { async } from 'regenerator-runtime';
import { API_URL , RESULT_PER_PAGE, KEY} from './config';
import { AJAX } from './helper';
<<<<<<< HEAD
// import { getJSON , sendJSON} from './helper';
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page : 1,
    resultsPerPage : RESULT_PER_PAGE,
  },
  bookmarks : []
};

const getRecipeFormat = function(data) {
  const { recipe } = data.data;
  return {
<<<<<<< HEAD
    //assigning the ref to a new obj
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
    id : recipe.id,
    image: recipe.image_url,
    time: recipe.cooking_time,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    source: recipe.source_url,
    title: recipe.title,
<<<<<<< HEAD
    ...(recipe.key && {key : recipe.key}), //obj is returned then values spread 
=======
    ...(recipe.key && {key : recipe.key}),
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
  };
}
export const loadRecipe = async function (id) {
  try {
<<<<<<< HEAD
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json(); // also returns a promise .json is a meth on response obj
    // if (!res.ok) throw new Error(data.message);
    // // console.log(res, data);
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);
    state.recipe = getRecipeFormat(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};


export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
<<<<<<< HEAD
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`); // including the key here will load search results including our recipes
=======
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
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


export const getSearchResults = function(page = state.search.page) {
  state.search.page = page;
  const start = (page-1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
}

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings; 
};

export const addBookmark = function(recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeData();
};

export const deleteBookmark = function(id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  storeData();
}

const storeData = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const uploadRecipe = async function(newRecipe) {
  try {
    console.log(newRecipe);
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').
    map(ing => {
      const ingArr = ing[1].split(',').map(word => word.trim ());
<<<<<<< HEAD
      if (ingArr.length != 3) throw new Error("Incorrect Format! please enter the correct Format for Ingredients."); //think of the wrong input

      const [quantity, unit, description] = ingArr;
      return {quantity : quantity? +quantity : null, unit, description}; // basically in map you can send anything obtained and it will only insert that thing even if no relation to input object
=======
      if (ingArr.length != 3) throw new Error("Incorrect Format! please enter the correct Format for Ingredients.");

      const [quantity, unit, description] = ingArr;
      return {quantity : quantity? +quantity : null, unit, description};
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
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
<<<<<<< HEAD
    const data = await AJAX(`${API_URL}/?key=${KEY}`, recipe); // url gets in config *****
    state.recipe = getRecipeFormat(data); // we will pass the same json format that we recieve form the api
=======
    const data = await AJAX(`${API_URL}/?key=${KEY}`, recipe);
    state.recipe = getRecipeFormat(data);
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387
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
<<<<<<< HEAD
// clearBookmarks();
=======
>>>>>>> e65e3e99b03ccaf30ddb2df531b2896388934387




