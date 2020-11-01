import UpdateRecipeTypes from './update.recipe.types';

export const setToBeUpdatedRecipe = (data) => ({
  type: UpdateRecipeTypes.RECIPE_TO_BE_UPDATE,
  payload: data
})

export const resetUpdateRecipe = () => ({
  type: UpdateRecipeTypes.RESET_UPDATE_RECIPE
})

export const updateRecipe = (recipeID, userToken, title, prep_time, cook_time, dessert, meal, drink, servings, ingredients, steps, public_recipe) => (dispatch) => {
  console.log(public_recipe)
  dispatch({ type: UpdateRecipeTypes.UPDATE_RECIPE_PENDING })
  fetch(`https://chieh-recipe-manager.herokuapp.com/recipes/${recipeID}`,
  {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      preparation: parseInt(prep_time),
      cook_time: parseInt(cook_time),
      total_time: parseInt(prep_time) + parseInt(cook_time),
      servings: parseInt(servings),
      dessert: dessert,
      meal: meal,
      drink: drink,
      ingredients: ingredients.split('\n').filter(Boolean),
      steps: steps.split('\n').filter(Boolean),
      public: public_recipe
    })
  }).then(response => {
    if(response.ok) {
      dispatch({ type: UpdateRecipeTypes.UPDATE_RECIPE_SUCCESS });
      return response.json();
    } else {
      dispatch({ type: UpdateRecipeTypes.UPDATE_RECIPE_FAILED, payload: 'Something went wrong, please make sure you filled out the recipe form and submit it again.' })
    }
  }).catch(error => dispatch({ type: UpdateRecipeTypes.UPDATE_RECIPE_FAILED, payload: error }))
}

export const deleteRecipe = (userToken, recipeID) => (dispatch) => {
  dispatch({ type: UpdateRecipeTypes.DELETE_RECIPE_PENDING })
  fetch(`https://chieh-recipe-manager.herokuapp.com/recipes/delete`,
  {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: recipeID
    })
  }).then(response => dispatch({ type: UpdateRecipeTypes.DELETE_RECIPE_SUCCESS }))
}
