import { combineReducers } from 'redux';
import requestPublicRecipesReducer from './puclic-recipes/public.recipes.reducer';
import requestUserRecipesReducer from './user-recipes/user.recipes.reducer';
import createUserRecipeReducer from './create-recipe/create.recipe.reducer';
import updateUserRecipeReducer from './update-recipe/update.recipe.reducer';
import deleteUserRecipeReducer from './delete-recipe/delete.recipe.reducer';
import userReducer from './user/user.reducer';

import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'


const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'updateRecipe']
}

const UsersRecipePersistConfig = {
  key: 'usersRecipePersist',
  storage: storageSession,
  whitelist: ['userRecipes', 'public_count', 'total_count']
};

const PublicRecipePersistConfig = {
  key: 'pubicRecipePersist',
  storage: storageSession,
  whitelist: ['selectedType', 'totalPages', 'publicSearchFilter']
}

const rootRuducer = combineReducers({
  publicRecipes: persistReducer(PublicRecipePersistConfig, requestPublicRecipesReducer),
  userRecipes: persistReducer(UsersRecipePersistConfig, requestUserRecipesReducer),
  user: userReducer,
  createRecipe: createUserRecipeReducer,
  updateRecipe: updateUserRecipeReducer,
  deleteRecipe: deleteUserRecipeReducer
})

export default persistReducer(persistConfig, rootRuducer)
