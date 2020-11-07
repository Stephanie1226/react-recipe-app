import React from 'react';
import './RecipeRow.styles.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const RecipeRow = () => {
  return (
    <div className='recipe-row-container'>
      <span className='recipe-row-title'>Chocolate tart</span>
      <span className='recipe-row-public'>true</span>
      <span className='recipe-row-prep'>10min</span>
      <span className='recipe-row-cook'>10min</span>
      <div className='recipe-row-edit'>
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  )
}

export default RecipeRow;