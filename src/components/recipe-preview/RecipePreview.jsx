import React from 'react';
import { withRouter } from 'react-router-dom';
import './RecipePreview.styles.scss';

import TimerIcon from '@material-ui/icons/Timer';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const RecipePreview = ({ recipe, match, history }) => {
  const { _id, title, preparation, cook_time, servings, owner, owner_name } = recipe;
  return (
    <div className='recipe-container' 
      onClick={() => history.push({
        pathname: `${match.url}/${_id}`,
        state: {
          detailedRecipe: recipe
        }
      })}
    >
      <div className='foodimg_container'>
      {
        recipe.img ? <img alt='foodimg' src={`data:image/png;base64,${recipe.img}`} /> 
        : <img alt='default_foodimg' src={require('../../assets/food_default.png')} />
      }
      </div>
      <div className='preview-title-name'>
        <h4>{title}</h4>
        <h6>by <a href={`/exploreuser/:${owner}`} className="preview-owner-name">{owner_name}</a></h6>
      </div>
      <div className='recipe-preview-icons'>
        <div className='recipe-preview-row1'>
          <TimerIcon /><span style={{paddingLeft: "5px", paddingRight: "15px", fontSize: "20px"}}><span style={{fontSize: "17px"}}>Prep: </span>{preparation} <span style={{fontSize: "16px"}}>mins</span></span>
          <span style={{fontSize: "20px"}}><span style={{fontSize: "17px"}}>Cook: </span>{cook_time} <span style={{fontSize: "16px"}}>mins</span></span>
        </div>
        <div className='recipe-preview-row2'>
          <PersonOutlineIcon /><span style={{paddingLeft: "5px", fontSize: "20px"}}>{servings} <span style={{fontSize: "16px"}}>people</span></span>
        </div>
      </div>
    </div>
  );
}


export default withRouter(RecipePreview);