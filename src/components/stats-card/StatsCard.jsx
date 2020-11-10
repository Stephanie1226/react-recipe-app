import React from 'react';
import './StatsCard.scss';

import RecipeSlider from '../recipe-slider/RecipeSlider';

const StatsCard = () => {
  return (
    <div className='stats-container'>
      <h5>Your records:</h5>
      <RecipeSlider />
    </div>
  );
}

export default StatsCard;
