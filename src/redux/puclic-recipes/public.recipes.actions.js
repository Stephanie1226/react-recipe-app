import { apiCall } from '../../api/api';
import PublicRecipesTypes from './public.recipes.types';

export const requestAllPublicRecipes = (url_to_match) => (dispatch) => {
  dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_PENGING })
  apiCall(`https://chieh-recipe-manager.herokuapp.com/recipes/${url_to_match}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_FAILED, payload: error }))
}

export const requestPublicRecipeById = (recipe_id) => (dispatch) => {
  dispatch({ type: PublicRecipesTypes.REQUEST_SINGLE_PUBLIC_RECIPE_PENDING })
  apiCall(`https://chieh-recipe-manager.herokuapp.com/recipes/public/${recipe_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: PublicRecipesTypes.REQUEST_SINGLE_PUBLIC_RECIPE_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: PublicRecipesTypes.REQUEST_SINGLE_PUBLIC_RECIPE_FAILED, payload: error }))
}

export const requestFilteredPublicRecipes = (keyword) => ({
  type: PublicRecipesTypes.REQUEST_FILTERED_PUBLIC_RECIPES,
  payload: keyword
})

export const setPublicSearchFilter = (filter) => ({
  type: PublicRecipesTypes.SET_PUBLIC_SEARCH_FILTER,
  payload: filter
})

export const resetFilteredPublicRecipes = () => ({
  type: PublicRecipesTypes.RESET_FILTERED_PUBLIC_RECIPES
})

export const resetPublicKeyword = () => ({
  type: PublicRecipesTypes.RESET_PUBLIC_KEYWORD,
  payload: ''
})

export const setPublicSelectedType = (selectedType) => ({
  type: PublicRecipesTypes.SET_PUBLIC_SELECTED_TYPE,
  payload: selectedType
}) 

export const setCurrentPage = (data) => ({
  type: PublicRecipesTypes.SET_CURRENT_PAGE,
  payload: data
})

export const setTotalPage = (data) => ({
  type: PublicRecipesTypes.SET_TOTAL_PAGE,
  payload: data
})