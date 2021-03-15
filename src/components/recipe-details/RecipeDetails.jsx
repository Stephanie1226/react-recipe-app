import React from 'react';
import './RecipeDetails.scss';

import DeleteAlert from '../../components/delete-alert/DeleteAlert';
import Hashtag from '../hashtag/Hashtag';

import { Button, IconButton, Checkbox, FormControlLabel } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AlarmIcon from '@material-ui/icons/Alarm';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Stepper, Step, StepLabel, StepContent, Typography } from "@material-ui/core";

import SaveRecipeBtn from '../save-recipe-btn/SaveRecipeBtn';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from '../../redux/user/user.selectors';
import { selectSinglePublicRecipe } from '../../redux/puclic-recipes/public.recipes.selectors';
import { setToBeUpdatedRecipe, resetUpdateRecipe } from '../../redux/update-recipe/update.recipe.actions';
import { setOnEditRecipeForPhoto } from '../../redux/create-recipe/create.recipe.actions'

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  single_recipe: selectSinglePublicRecipe,
})

const mapDispatchToProps = (dispatch) => ({
  setToBeUpdatedRecipe: (data) => dispatch(setToBeUpdatedRecipe(data)),
  resetUpdateRecipe: () => dispatch(resetUpdateRecipe()),
  setOnEditRecipeForPhoto: (data) => dispatch(setOnEditRecipeForPhoto(data))
});

const RecipeDetails = ({ recipe, history, userId, setToBeUpdatedRecipe, resetUpdateRecipe, setOnEditRecipeForPhoto, single_recipe }) => {
  if (recipe) {
    var { img, title, preparation, meal, dessert, drink, total_time, cook_time, servings, ingredients, steps, owner, owner_name } = recipe;
    var recipe_public = recipe.public;
  } else {
    ({ img, title, preparation, meal, dessert, drink, total_time, cook_time, servings, ingredients, steps, owner, owner_name } = single_recipe);
    recipe_public = single_recipe.public;
  }

  return (
    <div className='recipe-details'>
      <div className='recipe-details-row1'>
        <Button onClick={() => history.goBack()}
          type="button" startIcon={<KeyboardBackspaceIcon />}>
            Go Back
        </Button>
        <Button onClick={() => {
          resetUpdateRecipe();
          if (userId !== 'no-user') {
            history.push('/createrecipe');
          } else {
            history.push('/signin');
          }}}
          variant="outlined" color="default" startIcon={<AddIcon />}>
            Create Recipe
        </Button>

      </div>

      <div className='hashtag-container'>
        { meal ? <Hashtag hashtag="Meal" food_category /> : null }
        { dessert ? <Hashtag hashtag="Dessert" food_category /> : null }
        { drink ? <Hashtag hashtag="Drink" food_category /> : null }
        <Hashtag hashtag={`${recipe_public ? 'Public' : 'Private'}`} public_private />
      </div>

      <div className='recipe-details-row2'>
        <h1>{title}</h1>
        {
          userId !== 'no-user' && userId === owner ?
            <div className='edit-delete-icons'>
              <IconButton type="button" aria-label="edit-recipe" 
                onClick={() => {
                  setToBeUpdatedRecipe(recipe);
                  history.push('/updaterecipe');}}>
                <EditRoundedIcon />
              </IconButton> 
              <DeleteAlert onDeleteRecipe={recipe} onDetailsPage/>
            </div> 
            : null
        }
      </div>
      <div className='recipe-details-row2-1'>
        <span>by&nbsp;&nbsp;<a href={`/exploreuser/:${owner}`} className="recipe-details-ownername">{owner_name}</a></span>
      </div>
      <div className='recipe-details-row3'>
        <div className='recipe-details-row3-left'>
          <AlarmIcon /><span style={{paddingLeft: "5px"}}>{total_time} mins</span>
          <div style={{paddingLeft: "16px", fontSize: "13px"}}><span>Prep: </span><br /><span>{preparation} mins</span></div>
          <div style={{paddingLeft: "16px", fontSize: "13px"}}><span>Cook: </span><br /><span>{cook_time} mins</span></div>
          <PersonOutlineIcon style={{marginLeft: 16}} /><span style={{paddingLeft: "5px"}}>{servings} people</span>
        </div>
        <SaveRecipeBtn />
      </div>

      <div className={`${userId !== 'no-user' &&  userId === owner ? 'recipe-details-auth': ''} recipe-details-img-container`}>
      {
        img ? <img alt='foodimg' src={`data:image/png;base64,${img}`} /> 
        : <img className='food-img-default' alt='default_foodimg' src={require('../../assets/foodimg_default_detail.png')} />
      }
      {
        userId !== 'no-user' && userId === owner ?
          <div className='food-pic-camera-btn'>
            <IconButton color='default' aria-label="upload food picture" component="span" 
              onClick={() => {
                setOnEditRecipeForPhoto(recipe)
                history.push('/editrecipephoto');}}>
              <PhotoCamera style={{fontSize: '300%'}} />
            </IconButton>
          </div>
          : null
      }
      </div>

      <div className='recipe-details-ingredients-container'>
        <h3>{`Ingredients`}</h3>
        <div className='recipe-details-ingredient'>
        {
          ingredients.map((ingredient, index) => {
            return <FormControlLabel
                      key={index}
                      value="end"
                      control={<Checkbox color="primary" />}
                      label={<span style={{ fontSize: '18px' }}>{ingredient}</span>}
                      labelPlacement="end"
                      fontSize={15}
                    />
          })
        }
        </div>
      </div>
      <div className='recipe-details-steps-container'>
        <h3>{`Steps`}</h3>
        <Stepper className='stepper' orientation="vertical">
        {steps.map((step, index) => (
          <Step className='step' key={index} active={true} >
            <StepLabel className='stepLabel'>{`  Step ${index+1}`}</StepLabel>
            <StepContent className='stepContent'>
              <Typography className='typography'>{step}</Typography>
            </StepContent>
          </Step>
        ))}
        </Stepper>
      </div >
      <Button variant="outlined" type="button" size="small" onClick={() => history.goBack()}>Go Back</Button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);