import React from 'react';
import './RecipeTableScroll.styles.scss';

const RecipeTableScroll = (props) => {
  return (
    <div className="recipe-table-scroll">
      {props.children}
    </div>
  );
};

export default RecipeTableScroll;