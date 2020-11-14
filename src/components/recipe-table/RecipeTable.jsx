import React from 'react';
import './RecipeTable.styles.scss';

import RecipeRow from '../recipe-row/RecipeRow';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  selectAllUserRecipes, 
} from '../../redux/user-recipes/user.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  userRecipes: selectAllUserRecipes
});

const RecipeTable = ({ userRecipes }) => {
  return (
    <div className='recipe-table-container'>
      {
        userRecipes && userRecipes.map(userRecipe => {
          return <RecipeRow key={userRecipe._id} userRecipe={userRecipe} />
        })
      }
    </div>
  );
}

export default connect(mapStateToProps)(RecipeTable);
