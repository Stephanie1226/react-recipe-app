import React from 'react';
import './ExploreUserInfo.styles.scss';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { selectCurrentUser } from '../../redux/user/user.selectors';
// import { selectUsersTotalCount, selectUsersPublicCount } from '../../redux/user-recipes/user.recipes.selectors';

const mapStateToProps = createStructuredSelector({

})

const ExploreUserInfo = () => {
  return (
    <div className='explore-user-info-container'>
      <div className='explore-user-info-avatar'>
        {
          //exploreUserInfo.avatar ? <img className='' alt='userimg' src={`data:image/png;base64,${exploreUserInfo.avatar}`} /> 
          //:
          <img className='explore-user-info-avatar-img' alt='default_userimg' src={require('../../assets/user_default.png')} />
        }
      </div>
      <h1 className="explore-user-info-name">Stephanie</h1>
      <div className="explore-user-info-list">
        <div className="explore-user-info-count first-count">
          <h5>10</h5>
          <span>Recipes</span>
        </div>
        <div className="explore-user-info-count">
          <h5>4</h5>
          <span>Meal</span>
        </div>
        <div className="explore-user-info-count">
          <h5>3</h5>
          <span>Dessert</span>
        </div>
        <div className="explore-user-info-count">
          <h5>3</h5>
          <span>Drink</span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(ExploreUserInfo));