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
      <div className='recipe-table-titles'>
        <span className='table-title'>Title</span>
        <span className='table-public'>Public</span>
        <span className='table-create'>Create time</span>
        <span className='table-update'>Last update</span>
        <span className='table-edit'></span>
      </div>
      <div className='recipe-table-rows'>
      {
        userRecipes && userRecipes.map(userRecipe => {
          return <RecipeRow key={userRecipe._id} userRecipe={userRecipe} />
        })
      }
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(RecipeTable);
