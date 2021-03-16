import { createSelector } from 'reselect';

const selectPublicRecipes = state => state.publicRecipes

export const selectPublicRecipesPending = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.isPending
)

export const selectAllPublicRecipes = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicRecipes
)

export const selectSinglePublicRecipePending = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.requestSingleRecipePending
)

export const selectSinglePublicRecipe = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.singlePublicRecipe
)

export const selectSinglePublicRecipeFailed = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.requestSinglePublicRecipeError
)

export const selectPublicSelectedCategory = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicSelectedCategory
)

export const selectPublicFilterType = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicSearchFilter
)

export const selectPublicSortbyFilter = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicSortbyFilter
)

export const selectFilteredPublicRecipes = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.filteredPublicRecipes
)

export const selectFilteredPublicKeyword = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicKeyword
)

export const selectPublicCurrentPage = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.currentPage
)

export const selectPublicTotalPages = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.totalPages
)

export const selectExploreUserPending = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.exploreUserPending
)

export const selectExploreUserSucess = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.exploreUserSucess
)

export const selectExploreUserRecipes = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.exploreUserRecipes
)

export const selectExploreUserFailed = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.exploreUserFailed
)

export const selectExploreUserFailedMsg = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.exploreUserFailedMsg
)