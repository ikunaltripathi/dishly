import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json(); // also returns a promise .json is a meth on response obj
    // if (!res.ok) throw new Error(data.message);
    // // console.log(res, data);
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      //assigning the ref to a new obj
      image: recipe.image_url,
      time: recipe.cooking_time,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      source: recipe.source_url,
      title: recipe.title,
    };
    // console.log(recipe);
  } catch (err) {
    // alert(err);
    // console.error(err);
    throw err;
  }
};

//model also doesn't know about controller so implement in a way mvc rule follows.
