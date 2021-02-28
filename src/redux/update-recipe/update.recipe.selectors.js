import { createSelector } from 'reselect';

const selectUpdateRecipe = state => state.updateRecipe;

export const selectRecipeToBeUpdate = createSelector(
  [selectUpdateRecipe],
  updateRecipe => updateRecipe.recipeToBeUpdate
)

export const selectUpdateRecipePending = createSelector(
  [selectUpdateRecipe],
  updateRecipe => updateRecipe.updateRecipePending
)

export const selectUpdateRecipeSuccess = createSelector(
  [selectUpdateRecipe],
  updateRecipe => updateRecipe.updateRecipeSuccess
)

export const selectUpdateRecipeFailed = createSelector(
  [selectUpdateRecipe],
  updateRecipe => updateRecipe.updateRecipeFailed
)



