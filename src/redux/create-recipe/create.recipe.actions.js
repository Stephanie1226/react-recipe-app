import CreateRecipesTypes from './create.recipe.types';

export const resetCreateNeRecipeState = () => ({
  type: CreateRecipesTypes.CREATE_NEW_RECIPE_RESET_STATE
})

export const createNewRecipe = (userToken, title, prep_time, cook_time, dessert, meal, drink, servings, ingredients, steps, public_recipe) => (dispatch) => {
  dispatch({ type: CreateRecipesTypes.CREATE_NEW_RECIPE_PENDING })
  fetch('https://chieh-recipe-manager.herokuapp.com/recipes',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      preparation: parseInt(prep_time),
      cook_time: parseInt(cook_time),
      total_time: parseInt(prep_time) + parseInt(cook_time),
      dessert: dessert,
      meal: meal,
      drink: drink,
      servings: parseInt(servings),
      ingredients: ingredients.split('\n').filter(Boolean),
      steps: steps.split('\n').filter(Boolean),
      public: public_recipe
    })
  }).then(response => {
    if(response.ok) {
      return response.json();
    } else {
      dispatch({ type: CreateRecipesTypes.CREATE_NEW_RECIPE_FAILED, payload: 'Something went wrong, please make sure you filled out the recipe form and submit it again.' })
    }
  }).then(data => {
    if (data !== undefined) {
      dispatch({ type: CreateRecipesTypes.CREATE_NEW_RECIPE_SUCCESS, payload: data })
    }
  }).catch(error => dispatch({ type: CreateRecipesTypes.CREATE_NEW_RECIPE_FAILED, payload: error }))
}


export const uploadRecipeImage = (recipeId, recipeImg) => (dispatch) => {
	dispatch({ type: CreateRecipesTypes.UPLOAD_RECIPE_PIC_PENDING })
	const formData = new FormData();
	formData.append("foodimg", recipeImg);
	fetch(`https://chieh-recipe-manager.herokuapp.com/recipes/${recipeId}/foodimg`,
	{
		method: 'POST',
		body: formData
	})
	.then(response => 
		{
			if(response.ok) {
				return response.json();
			} else {
				dispatch({ type: CreateRecipesTypes.UPLOAD_RECIPE_PIC_FAILED, payload: "Something went wrong..." })
			}
		}
  )
  .then(data => {
    if (data !== undefined) {
      dispatch({ type: CreateRecipesTypes.UPLOAD_RECIPE_PIC_SUCCESS, payload: data })
    }
  })
	.catch(error => dispatch({ type: CreateRecipesTypes.UPLOAD_RECIPE_PIC_FAILED, payload: error }))
}

export const uploadRecipeImgError = (errorMsg) => ({
  type: CreateRecipesTypes.UPLOAD_RECIPE_PIC_FAILED,
  payload: errorMsg
})

export const setOnEditRecipeForPhoto = (data) => ({
  type: CreateRecipesTypes.SET_ON_EDIT_RECIPE_FOR_PHOTO,
  payload: data
})