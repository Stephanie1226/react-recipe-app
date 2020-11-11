import React from 'react';
import './StatsCard.scss';

import RecipeSlider from '../recipe-slider/RecipeSlider';

const StatsCard = ({ version }) => {
  return (
    <div className={`stats-container ${version === 'v1' ? 'v1' : 'v2'}`}>
      <h5>Your records:</h5>
      <RecipeSlider />
    </div>
  );
}

export default StatsCard;
