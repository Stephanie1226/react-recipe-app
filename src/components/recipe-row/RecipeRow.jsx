import React from 'react';
import './RecipeRow.styles.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const RecipeRow = ({userRecipe}) => {
  const { title, preparation, cook_time, servings } = userRecipe;
  return (
    <div className='recipe-row-container'>
      <span className='recipe-row-title'>{title}</span>
      <span className='recipe-row-public'>{preparation}</span>
      <span className='recipe-row-prep'>{cook_time}</span>
      <span className='recipe-row-cook'>{servings}</span>
      <div className='recipe-row-edit'>
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  )
}

export default RecipeRow;