import React from 'react';
import './SaveRecipeBtn.scss';

import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const SaveRecipeBtn = () => {
  return (
    <IconButton color="primary">
      <FavoriteBorderIcon size='small' />
    </IconButton>
  )
}

export default SaveRecipeBtn;