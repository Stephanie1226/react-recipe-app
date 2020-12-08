import { apiCall } from '../../api/api';
import UserRecipesTypes from './user.recipes.types';

export const resetUserRecipe = () => ({type: UserRecipesTypes.RESET_USER_RECIPE})

export const initialRequestAllUserRecipes = (token) => (dispatch) => {
  dispatch({ type: UserRecipesTypes.INITIAL_REQUEST_ALL_USER_RECIPES_PENDING })
  apiCall('https://chieh-recipe-manager.herokuapp.com/recipes/me/all',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: UserRecipesTypes.INITIAL_REQUEST_ALL_USER_RECIPES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UserRecipesTypes.INITIAL_REQUEST_ALL_USER_RECIPES_FAILED, payload: error }))
}

export const requestAllUserRecipes = (token, user_category) => (dispatch) => {
  dispatch({ type: UserRecipesTypes.REQUEST_ALL_USER_RECIPES_PENDING })
  apiCall(`https://chieh-recipe-manager.herokuapp.com/recipes/me/${user_category}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: UserRecipesTypes.REQUEST_ALL_USER_RECIPES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UserRecipesTypes.REQUEST_ALL_USER_RECIPES_FAILED, payload: error }))
}

export const setUserSelectedCategory = category => ({
  type: UserRecipesTypes.SET_USER_SELECTED_CATEGORY,
  payload: category
})

export const requestFilteredUserRecipes = keyword => ({
  type: UserRecipesTypes.REQUEST_FILTERED_USER_RECIPES,
  payload: keyword
})

export const resetFilteredUserRecipesAndKeywords = () => ({
  type: UserRecipesTypes.RESET_FILTERED_USER_RECIPES_AND_KEYWORDS
})

export const setUserCurrentPage = (data) => ({
  type: UserRecipesTypes.SET_USER_CURRENT_PAGE,
  payload: data
})

export const setUserTotalPage = (data) => ({
  type: UserRecipesTypes.SET_USER_TOTAL_PAGE,
  payload: data
})