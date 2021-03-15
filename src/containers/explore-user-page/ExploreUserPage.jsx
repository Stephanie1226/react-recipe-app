import React, { Component } from 'react';
import './ExploreUserPage.styles.scss';
import { withRouter } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import CategoryButton from '../../components/category-button/CategoryButton';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import SortByFilter from '../../components/sortby-filter/SortByFilter';
import ExploreUserInfo from '../../components/explore-user-info/ExploreUserInfo';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  requestExploreUserRecipes,
} from '../../redux/puclic-recipes/public.recipes.actions';

import { 
  selectPublicSelectedCategory,
  selectExploreUserPending,
  selectExploreUserSucess,
  selectExploreUserRecipes,
  selectExploreUserFailed,
  selectExploreUserFailedMsg
} from '../../redux/puclic-recipes/public.recipes.selectors';


const mapStateToProps = createStructuredSelector({
  publicSelectedCategory: selectPublicSelectedCategory,
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
    const { publicSelectedCategory } = this.props;
  
    return (

      <div className='explore-user-page-container'>
        {/* <div className="explore-user-name">
          <h1>Stephanie</h1>
        </div> */}
        <div className="explore-user-info">
          <ExploreUserInfo />
        </div>
        <div className='explore-filter-container'>
          <div className='explore-filter-buttons'>
              <CategoryButton category="All" explore_category explore_category_active={`${publicSelectedCategory === "All" ? "true" : ""}`} />
              <CategoryButton category="Meal" explore_category explore_category_active={`${publicSelectedCategory === "Meal" ? "true" : ""}`} />
              <CategoryButton category="Dessert" explore_category explore_category_active={`${publicSelectedCategory === "Dessert" ? "true" : ""}`} />
              <CategoryButton category="Drink" explore_category explore_category_active={`${publicSelectedCategory === "Drink" ? "true" : ""}`} />
          </div>
          <div className="explore-filter-sort">
            <SortByFilter />
          </div>
        </div>
        <div className='explore-user-recipes-container'>
        {
          exploreUserPending ?
          <Loading />
          :
          <RecipesOverview recipes={exploreUserRecipes} />
        }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExploreUserPage));