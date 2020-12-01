import React, { Component } from 'react';
import './UserManagePage.styles.scss';

import PersonalInfo from '../../components/personal-info/PersonalInfo';
import RecipeTable from '../../components/recipe-table/RecipeTable';

class UserManagePage extends Component {
  handleClick = event => {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className='user-manage-page'>
        <div className='user-manage-tab'>
          <button style={{marginRight:"40px"}} className="manage-btn" value='editProfile' onClick={this.handleClick}>Edit Profile</button>
          <button className="manage-btn" value='recipeManage' onClick={this.handleClick}>Recipe Overview</button>
        </div>
        <div className='user-manage-page-recipe'>
          <RecipeTable />
        </div>
      </div>
    )
  }
}

export default UserManagePage;



// <div className='user-manage-page-col-1'>
// <PersonalInfo />
// </div>