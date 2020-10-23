import PublicRecipesTypes from './public.recipes.types';
import { addUpTotalTime, filterPublicRecipes } from './public.recipes.utils'

const INITIAL_STATE = {
  isPending: true,
  publicRecipes: [],
  filteredPublicRecipes: [],
  selectedType: 'All',
  currentPage: 1,
  totalPages: 0,
  publicKeyword: ''
}

const requestPublicRecipesReducer = (state = INITIAL_STATE, action={}) => {
  switch (action.type) {
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_PENGING:
      return {
        ...state,
        isPending: true
      }
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_SUCCESS:
      return {
        ...state,
        publicRecipes: addUpTotalTime(action.payload),
        isPending: !state.isPending
      }
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case PublicRecipesTypes.REQUEST_FILTERED_PUBLIC_RECIPES:
      return {
        ...state,
        filteredPublicRecipes: filterPublicRecipes(action.payload, state.publicRecipes),
        publicKeyword: action.payload
      }
    case PublicRecipesTypes.RESET_FILTERED_PUBLIC_RECIPES:
      return {
        ...state,
        filteredPublicRecipes: []
      }
    case PublicRecipesTypes.SET_PUBLIC_SELECTED_TYPE:
      return {
        ...state,
        selectedType: action.payload
      }
    case PublicRecipesTypes.RESET_PUBLIC_KEYWORD: 
      return {
        ...state,
        publicKeyword: action.payload
      }
    case PublicRecipesTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case PublicRecipesTypes.SET_TOTAL_PAGE:
      return {
        ...state,
        totalPages: action.payload
      }
    default:
      return state
  }
}

export default requestPublicRecipesReducer;