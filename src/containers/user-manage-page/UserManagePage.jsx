import React, { Component } from 'react';
import './UserManagePage.styles.scss';

//import PersonalInfo from '../../components/personal-info/PersonalInfo';
import RecipeTable from '../../components/recipe-table/RecipeTable';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectManagePageStatus } from '../../redux/user/user.selectors';
import { changeManagePageStatus } from '../../redux/user/user.actions';

const mapStateToProps = createStructuredSelector({
  managePageStatus: selectManagePageStatus
})

const mapDispatchToProps = (dispatch) => ({
  changeManagePageStatus: (data) => dispatch(changeManagePageStatus(data))
});

class UserManagePage extends Component {
  handleClick = event => {
    this.props.changeManagePageStatus(event.target.value)
  }

  render() {
    const { managePageStatus } = this.props;
    return (
      <div className='user-manage-page'>
        <div className='user-manage-tab'>
          <button style={{marginRight:"40px"}} value='editProfile' onClick={this.handleClick}
            className={`manage-btn ${ managePageStatus==='editProfile' ? 'underscore': ''}`}>Edit Profile</button>
          <button value='manageRecipe' onClick={this.handleClick}
            className={`manage-btn ${ managePageStatus==='manageRecipe' ? 'underscore': ''}`}>Recipe Overview</button>
        </div>
        {
          managePageStatus==='manageRecipe' ?
          <div className='user-manage-page-recipe'>
            <RecipeTable />
          </div>
          :
          <div className='user-manage-page-profile'></div>
        }
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserManagePage);



// <div className='user-manage-page-col-1'>
// <PersonalInfo />
// </div>