import React from 'react';
import './RecipeRow.styles.scss';

import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';

const RecipeRow = ({ userRecipe }) => {
  const { title, createdAt, updatedAt } = userRecipe;
  return (
    <div className='recipe-row-container'>
      <span className='recipe-row-title'>{title}</span>
      <div className='recipe-row-public'>
        <Switch checked={userRecipe.public}
          inputProps={{ 'aria-label': 'secondary checkbox' }}/>
      </div>
      <span className='recipe-row-createdat'>{createdAt.substring(0,10)}</span>
      <span className='recipe-row-updatedat'>{updatedAt.substring(0,10)}</span>
      <div className='recipe-row-edit'>
        <IconButton aria-label="edit-recipe-row" >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete-recipe-row" >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}

export default RecipeRow;