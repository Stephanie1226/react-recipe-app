import React, { Component } from 'react';
import './UserRecipePage.styles.scss';
import { withRouter } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import SearchBar from '../../components/searchbar/SearchBar';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import UserInfo from '../../components/user-info/UserInfo';
import ErrorBoundry from '../../components/error-boundry/ErrorBoundry';
import RecipesOverview from '../../components/recipes-overview/RecipesOverview';
import EmptyMatch from '../../components/empty-match/EmptyMatch';
import PinkBlueButton from '../../components/pink-blue-button/PinkBlueButton';
import CategoryButton from '../../components/category-button/CategoryButton';

import Pagination from '@material-ui/lab/Pagination';

import { userPagination } from '../../utils/user-recipes.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetUpdateRecipe } from '../../redux/update-recipe/update.recipe.actions';
import { 
  initialRequestAllUserRecipes, 
  requestFilteredUserRecipes, 
  setUserCurrentPage, 
  setUserTotalPage 
} from '../../redux/user-recipes/user.recipes.actions';
import { 
  selectUserRecipesPending, 
  selectAllUserRecipes, 
  selectUserSelectedCategory,
  selectFilteredUserRecipes,
  selectUserKeyword,
  selectUserCurrentPage,
  selectUserTotalPages 
} from '../../redux/user-recipes/user.recipes.selectors';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapStateToProps = createStructuredSelector({
  isPending: selectUserRecipesPending,
  userRecipes: selectAllUserRecipes,
  userSelectedCategory: selectUserSelectedCategory,
  filteredUserRecipes: selectFilteredUserRecipes,
  userKeyword: selectUserKeyword,
  userCurrentPage: selectUserCurrentPage,
  userTotalPages: selectUserTotalPages,
  token: selectUserToken
});

const mapDispatchToProps = (dispatch) => ({
  initialRequestAllUserRecipes: (token) => dispatch(initialRequestAllUserRecipes(token)),
  requestFilteredUserRecipes: (keyword) => dispatch(requestFilteredUserRecipes(keyword)),
  setUserCurrentPage: (data) => dispatch(setUserCurrentPage(data)),
  setUserTotalPage: (data) => dispatch(setUserTotalPage(data)),
  resetUpdateRecipe: () => dispatch(resetUpdateRecipe())
})

class UserRecipePage extends Component {
  componentDidMount() {
    if (this.props.userRecipes.length === 0) {
      this.props.initialRequestAllUserRecipes(this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filteredUserRecipes !== this.props.filteredUserRecipes
      && typeof(this.props.filteredUserRecipes) === 'string') {
        this.props.setUserTotalPage(0)
    }
    if ( prevProps.filteredUserRecipes !== this.props.filteredUserRecipes
      && this.props.filteredUserRecipes !== []
      && typeof(this.props.filteredUserRecipes) !== 'string') {
        this.props.setUserTotalPage(Math.ceil(this.props.filteredUserRecipes.length / 6));
      } else if (prevProps.userRecipes !== this.props.userRecipes) {
      this.props.setUserTotalPage(Math.ceil(this.props.userRecipes.length / 6))
    }
  }

  handleChange = event => {
    this.props.requestFilteredUserRecipes(event.target.value);
  }

  handlePagination = (event, value) => {
    this.props.setUserCurrentPage(value)
  };

  render() {
    const { isPending, userRecipes, filteredUserRecipes, userCurrentPage, userTotalPages } = this.props;
    const { history, userKeyword, userSelectedCategory, resetUpdateRecipe } = this.props;
    const userRecipesPagination = userPagination(userRecipes, filteredUserRecipes, userCurrentPage, userTotalPages);
    return (
      <div className='user-recipe-page-container'>
        <div className='user-recipe-container'>
          <div className='user-searchbar-container'>
            <h1>My Recipes.</h1>
            <div className='user-searchbar'>
              <div className='searchbar-user'>
                <SearchBar onChange={this.handleChange}  value={userKeyword}>Search...</SearchBar>
                <div className='category-btn-group'>
                  <CategoryButton category="All" user_category_all user_category_active={`${userSelectedCategory === "All" ? 'true': ''}`} />
                  <CategoryButton category="Public" user_category user_category_active={`${userSelectedCategory === "Public" ? 'true': ''}`} />
                  <CategoryButton category="Private" user_category user_category_active={`${userSelectedCategory === "Private" ? 'true': ''}`} />
                </div>
              </div>
              <div onClick={() => {
                    resetUpdateRecipe();
                    history.push('/createrecipe');}}
              >
                <PinkBlueButton btn_type="button" btn_text={"＋ Create Recipe"} createRecipe />
              </div>
            </div>
          </div>
          {
            isPending ? <Loading /> : userRecipes.length === 0 ? 
              <EmptyMatch emptyMsg={"You don't have any recipe yet. Create one today!"}/>
              :
              <div>
                <ErrorBoundry>
                {
                  typeof(userRecipesPagination) === 'string' ? 
                  <EmptyMatch emptyMsg={"No matches found!"}/>
                  : <div className='user-recipe-overview'><RecipesOverview recipes={userRecipesPagination} /></div>
                }
                </ErrorBoundry>
                {
                  userTotalPages === 0 ? null 
                  :
                  <div className='user-pagination-container'>
                    <Pagination 
                      variant='outlined'
                      color='primary'
                      count={userTotalPages} 
                      page={userCurrentPage} 
                      onChange={this.handlePagination} 
                    />
                  </div>
                }
              </div>
          }
        </div>
        <div className='personal-info-container' id='personal-info-full-screen'>
          <UserInfo />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRecipePage));