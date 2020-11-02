import UserRecipesTypes from './user.recipes.types';
import { addUpTotalTime, filterUserRecipes, countPublicStats } from './user.recipes.utils';

const INITIAL_STATE = {
  isPending: true,
  userRecipes: [],
  userSelectedCategory: "All",
  filteredUserRecipes: [],
  userCurrentPage: 1,
  userTotalPages: 0,
  total_count: 0,
  public_count: 0,
  userKeyword: ''
}

const requestUserRecipesReducer = (state = INITIAL_STATE, action={}) => {
  switch(action.type) {
    case UserRecipesTypes.INITIAL_REQUEST_ALL_USER_RECIPES_PENDING:
      return {
        ...state,
        isPending: true
      }
    case UserRecipesTypes.INITIAL_REQUEST_ALL_USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: addUpTotalTime(action.payload),
        total_count: action.payload.length,
        public_count: countPublicStats(action.payload),
        isPending: false
      }
    case UserRecipesTypes.INITIAL_REQUEST_ALL_USER_RECIPES_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case UserRecipesTypes.REQUEST_ALL_USER_RECIPES_PENDING:
      return {
        ...state,
        isPending: true
      }
    case UserRecipesTypes.REQUEST_ALL_USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: addUpTotalTime(action.payload),
        isPending: false
      }
    case UserRecipesTypes.REQUEST_ALL_USER_RECIPES_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case UserRecipesTypes.SET_USER_SELECTED_CATEGORY:
      return {
        ...state,
        userSelectedCategory: action.payload
      }
    case UserRecipesTypes.REQUEST_FILTERED_USER_RECIPES:
      return {
        ...state,
        filteredUserRecipes: filterUserRecipes(action.payload, state.userRecipes),
        userCurrentPage: 1,
        userKeyword: action.payload
      }
    case UserRecipesTypes.RESET_FILTERED_USER_RECIPES_AND_KEYWORDS:
      return {
        ...state,
        filteredUserRecipes: [],
        userKeyword: ''
      }
    case UserRecipesTypes.SET_USER_CURRENT_PAGE:
      return {
        ...state,
        userCurrentPage: action.payload
      }
    case UserRecipesTypes.SET_USER_TOTAL_PAGE:
      return {
        ...state,
        userTotalPages: action.payload
      }
    default:
      return state
  }
}

export default requestUserRecipesReducer;