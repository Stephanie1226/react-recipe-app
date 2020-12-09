import React from 'react';
import './RecipeRow.styles.scss';
import { withRouter } from 'react-router-dom';

import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Switch from '@material-ui/core/Switch';

import DeleteAlert from '../delete-alert/DeleteAlert';

import { connect } from 'react-redux';
import { setToBeUpdatedRecipe } from '../../redux/update-recipe/update.recipe.actions';


const mapDispatchToProps = (dispatch) => ({
  setToBeUpdatedRecipe: (data) => dispatch(setToBeUpdatedRecipe(data))
});

const RecipeRow = ({ history, userRecipe, setToBeUpdatedRecipe }) => {
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
        <IconButton aria-label="edit-recipe-row" 
          onClick={() => {
            setToBeUpdatedRecipe(userRecipe);
            history.push('/updaterecipe');}}>
          <EditIcon fontSize="small" />
        </IconButton>
        <DeleteAlert onDeleteRecipe={userRecipe} onManagePage/>
      </div>
    </div>
  )
}

export default withRouter(connect(null, mapDispatchToProps)(RecipeRow));