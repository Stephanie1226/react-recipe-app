import React, { Component } from 'react';
import './UserManagePage.styles.scss';

import RecipeTable from '../../components/recipe-table/RecipeTable';
import EditProfile from '../../components/edit-profile/EditProfile';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectManagePageStatus, selectDeleteProfileSuccess } from '../../redux/user/user.selectors';
import { changeManagePageStatus, resetUser } from '../../redux/user/user.actions';
import { resetUserRecipe } from '../../redux/user-recipes/user.recipes.actions';


const mapStateToProps = createStructuredSelector({
  managePageStatus: selectManagePageStatus,
  deleteProfileSuccess: selectDeleteProfileSuccess
})

const mapDispatchToProps = (dispatch) => ({
  resetUser: () => dispatch(resetUser()),
  resetUserRecipe: () => dispatch(resetUserRecipe()),
  changeManagePageStatus: (data) => dispatch(changeManagePageStatus(data))
});

class UserManagePage extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.deleteProfileSuccess !== this.props.deleteProfileSuccess
      && this.props.deleteProfileSuccess) {
      this.props.resetUser();
      this.props.resetUserRecipe();
      this.props.history.push('/');
   }
  }

  handleClick = event => {
    this.props.changeManagePageStatus(event.target.value)
  }

  render() {
    const { managePageStatus } = this.props;
    return (
      <div className='user-manage-page'>
        <div className='user-manage-tab'>
          <button style={{marginRight:"40px"}} value='editProfile' onClick={this.handleClick}
            className={`manage-btn ${ managePageStatus==='editProfile' ? 'underscore': ''}`}>
            Edit Profile
          </button>
          <button value='manageRecipe' onClick={this.handleClick}
            className={`manage-btn ${ managePageStatus==='manageRecipe' ? 'underscore': ''}`}>
            Recipe Overview
          </button>
        </div>
        <img alt='manage-bg' src={require('../../assets/manage_bg.png')} className='manage-bg' />
        {
          managePageStatus==='manageRecipe' ?
          <div className='user-manage-page-recipe'>
            <RecipeTable />
          </div>
          :
          <div className='user-manage-page-profile'>
            <EditProfile />
          </div>
        }
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserManagePage);
