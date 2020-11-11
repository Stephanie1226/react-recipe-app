import React, { Component } from 'react';
import './RecipePage.styles.scss';

import Loading from '../../components/loading/Loading';
import RecipeDetails from '../../components/recipe-details/RecipeDetails';
import UserInfo from '../../components/user-info/UserInfo';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from '../../redux/user/user.selectors';
import { requestPublicRecipeById } from '../../redux/puclic-recipes/public.recipes.actions';
import { 
  selectSinglePublicRecipePending,
  selectSinglePublicRecipe
} from '../../redux/puclic-recipes/public.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  singleRecipePending: selectSinglePublicRecipePending,
  recipe: selectSinglePublicRecipe
})

const mapDispatchToProps = (dispatch) => ({
  requestPublicRecipeById: (recipe_id) => dispatch(requestPublicRecipeById(recipe_id))
});

class RecipePage extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state === undefined) {
      this.state = {
        recipe: false
      }
    } else {
      this.state = {
        recipe: this.props.location.state.detailedRecipe
      }
    }
  }
  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.requestPublicRecipeById(this.props.match.params.id);
    }
  }

  render() {
    return (
      <div className='recipe-details-page-container'>
        <div className='details-box'>
          {
            this.state.recipe ?
            <RecipeDetails recipe={this.state.recipe} history={this.props.history}/>
            : this.props.singleRecipePending ? <div style={{marginTop:"10%"}}><Loading /></div>
              : <RecipeDetails history={this.props.history}/>
          }
        </div>
        {
          this.props.userId !== 'no-user' ?
          <div className='personal-info-box' id='personal-info-full-screen'>
            <UserInfo />
          </div>
          : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);