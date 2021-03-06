import React, { Component } from 'react';
import './ExploreUserPage.styles.scss';
import { withRouter } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { requestExploreUserRecipes } from '../../redux/puclic-recipes/public.recipes.actions';
import { 
  selectExploreUserPending,
  selectExploreUserSucess,
  selectExploreUserRecipes,
  selectExploreUserFailed,
  selectExploreUserFailedMsg
} from '../../redux/puclic-recipes/public.recipes.selectors';


const mapStateToProps = createStructuredSelector({
  exploreUserPending: selectExploreUserPending,
  exploreUserSucess: selectExploreUserSucess,
  exploreUserRecipes: selectExploreUserRecipes,
  exploreUserFailed: selectExploreUserFailed,
  exploreUserFailedMsg: selectExploreUserFailedMsg,
});

const mapDispatchToProps = (dispatch) => ({
  requestExploreUserRecipes: (user_id) => dispatch(requestExploreUserRecipes(user_id)),
});

class ExploreUserPage extends Component {
  componentDidMount () {
    this.props.requestExploreUserRecipes("5f876f5ca6c31700173fc01c");
  }

  render() {
    const { exploreUserPending, exploreUserSucess, exploreUserRecipes, exploreUserFailed, exploreUserFailedMsg } = this.props;

    return (
      <div className=''>
      {
        exploreUserPending ?
        <Loading />
        :
        <RecipesOverview recipes={exploreUserRecipes} />
      }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExploreUserPage));