import React from 'react';
import './RecipeTable.styles.scss';

import RecipeRow from '../recipe-row/RecipeRow';

const RecipeTable = () => {
  return (
    <div className='recipe-table-container'>
      <RecipeRow />
      <RecipeRow />
      <RecipeRow />
      <RecipeRow />
    </div>
  )
}

export default RecipeTable;