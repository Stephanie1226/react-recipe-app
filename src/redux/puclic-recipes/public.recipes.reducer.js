import PublicRecipesTypes from './public.recipes.types';
import { filterPublicRecipes } from './public.recipes.utils'

const INITIAL_STATE = {
  isPending: false,
  publicRecipes: [],
  requestPublicRecipeError: '',
  requestSingleRecipePending: true,
  singlePublicRecipe: {},
  requestSinglePublicRecipeError: '',
  exploreUserPending: false,
  exploreUserSucess: false,
  exploreUserRecipes: [],
  exploreUserFailed: false,
  exploreUserFailedMsg: '',
  publicSearchFilter: 'byTitle',
  publicSortbyFilter: 'Sort By',
  filteredPublicRecipes: [],
  publicSelectedCategory: 'All',
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
        publicRecipes: action.payload,
        isPending: !state.isPending
      }
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_FAILED:
      return {
        ...state,
        requestPublicRecipeError: action.payload
      }
    case PublicRecipesTypes.REQUEST_SINGLE_PUBLIC_RECIPE_PENDING:
      return {
        ...state,
        requestSingleRecipePending: true,
        singlePublicRecipe: {},
        requestSinglePublicRecipeError: ''
      }
    case PublicRecipesTypes.REQUEST_SINGLE_PUBLIC_RECIPE_SUCCESS:
      return {
        ...state,
        singlePublicRecipe: action.payload,
        requestSingleRecipePending: false,
        requestSinglePublicRecipeError: ''
      }
    case PublicRecipesTypes.REQUEST_SINGLE_PUBLIC_RECIPE_FAILED:
      return {
        ...state,
        requestSingleRecipePending: false,
        singlePublicRecipe: {},
        requestSinglePublicRecipeError: action.payload,
      }
    case PublicRecipesTypes.REQUEST_EXPLORE_USER_RECIPE_PENDING:
      return {
        ...state,
        exploreUserPending: true,
        exploreUserSucess: false
      }
    case PublicRecipesTypes.REQUEST_EXPLORE_USER_RECIPE_SUCCESS:
      return {
        ...state,
        exploreUserPending: false,
        exploreUserSucess: true,
        exploreUserRecipes: action.payload
      }
    case PublicRecipesTypes.REQUEST_EXPLORE_USER_RECIPE_FAILED:
      return {
        ...state,
        exploreUserPending: false,
        exploreUserFailed: true,
        exploreUserFailedMsg: action.payload
      }
    case PublicRecipesTypes.SET_PUBLIC_SEARCH_FILTER:
      return {
        ...state,
        publicSearchFilter: action.payload
      }
    case PublicRecipesTypes.SET_PUBLIC_SORTBY_FILTER:
      return {
        ...state,
        publicSortbyFilter: action.payload
      }
    case PublicRecipesTypes.RESET_PUBLIC_SORTBY_FILTER:
      return {
        ...state,
        publicSortbyFilter: 'Sort By'
      }
    case PublicRecipesTypes.REQUEST_FILTERED_PUBLIC_RECIPES:
      return {
        ...state,
        filteredPublicRecipes: filterPublicRecipes(action.payload, state.publicRecipes, state.publicSearchFilter),
        currentPage: 1,
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
        publicSelectedCategory: action.payload
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