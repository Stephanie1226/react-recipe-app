import PublicRecipesTypes from './public.recipes.types';
import { addUpTotalTime, filterPublicRecipes } from './public.recipes.utils'

const INITIAL_STATE = {
  isPending: true,
  publicRecipes: [],
  filteredPublicRecipes: [],
  currentPage: 1,
  totalPages: 0
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
        //publicRecipes: action.payload,
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
        filteredPublicRecipes: filterPublicRecipes(action.payload, state.publicRecipes)
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