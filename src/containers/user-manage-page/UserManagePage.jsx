import React from 'react';
import './UserManagePage.styles.scss';

import PersonalInfo from '../../components/personal-info/PersonalInfo';
import RecipeTable from '../../components/recipe-table/RecipeTable';

const UserManagePage = () => {
  return (
    <div className='user-manage-page'>
      <div className='user-manage-page-main'>
        <RecipeTable />
      </div>
    </div>
  )
}

export default UserManagePage;



// <div className='user-manage-page-col-1'>
// <PersonalInfo />
// </div>