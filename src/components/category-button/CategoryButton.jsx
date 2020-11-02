import React, { Component } from 'react';
import './CategoryButton.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  requestAllPublicRecipes, 
  resetFilteredPublicRecipes,
  resetPublicKeyword,
  resetPublicSortbyFilter,
  setPublicSelectedType,
  setCurrentPage
} from '../../redux/puclic-recipes/public.recipes.actions';
import {
  requestAllUserRecipes,
  resetFilteredUserRecipesAndKeywords,
  setUserSelectedCategory,
  setUserCurrentPage
} from '../../redux/user-recipes/user.recipes.actions';
import { selectUserToken } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken
});

const mapDispatchToProps = (dispatch) => ({
  requestAllPublicRecipes: (url_to_match) => dispatch(requestAllPublicRecipes(url_to_match)),
  resetFilteredPublicRecipes: () => dispatch(resetFilteredPublicRecipes()),
  resetPublicKeyword: () => dispatch(resetPublicKeyword()),
  resetPublicSortbyFilter: () => dispatch(resetPublicSortbyFilter()),
  setPublicSelectedType: (selectedType) => dispatch(setPublicSelectedType(selectedType)),
  setPublicCurrentPage: (data) => dispatch(setCurrentPage(data)),
  requestAllUserRecipes: (token, category) => dispatch(requestAllUserRecipes(token, category)),
  resetFilteredUserRecipesAndKeywords: () => dispatch(resetFilteredUserRecipesAndKeywords()),
  setUserSelectedCategory: (userSelectedcategory) => dispatch(setUserSelectedCategory(userSelectedcategory)),
  setUserCurrentPage: (data) => dispatch(setUserCurrentPage(data))
});

class CategoryButton extends Component {
  constructor() {
    super();
    this.handleExploreCategoryChange = this.handleExploreCategoryChange.bind(this);
    this.handledUserCategoryChange = this.handledUserCategoryChange.bind(this);
  }

  handleExploreCategoryChange = event => {
    this.props.setPublicSelectedType(event.currentTarget.value);
    this.props.resetPublicKeyword();
    this.props.resetPublicSortbyFilter();
    this.props.resetFilteredPublicRecipes();
    this.props.setPublicCurrentPage(1);
    if (event.currentTarget.value === 'All') {
      this.props.requestAllPublicRecipes('');
    } else {
      this.props.requestAllPublicRecipes(`?publicCategory=${event.currentTarget.value.toLowerCase()}`);
    }
  }
  handledUserCategoryChange = event => {
    console.log(event.currentTarget.value)
    this.props.setUserSelectedCategory(event.currentTarget.value);
    this.props.resetFilteredUserRecipesAndKeywords();
    this.props.setUserCurrentPage(1);
    this.props.requestAllUserRecipes(this.props.userToken,`${event.currentTarget.value.toLowerCase()}`)
  }

  render () {
    const { category, explore_category, explore_category_active } = this.props;
    const { user_category, user_category_all, user_category_active } = this.props;
    return (
      <button type='button' value={category} 
        onClick={explore_category ? this.handleExploreCategoryChange : 
                 user_category || user_category_all ? this.handledUserCategoryChange : null}
        className={`category-btn
                  ${explore_category? 'explore-category' : ''} 
                  ${explore_category_active === "true" ? 'category-active': ''}
                  ${user_category? 'user-category' : ''}
                  ${user_category_all? 'user-category-all' : ''}
                  ${user_category_active === "true" ? 'user-category-active' : ''}
                  `} >
        <span>{category}</span>
      </button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton);