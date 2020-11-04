import React from 'react';
import './UserManagePage.styles.scss';

import PersonalInfo from '../../components/personal-info/PersonalInfo';

const UserManagePage = () => {
  return (
    <div className='user-manage-page'>
      <h1>User Manage page</h1>
      <div className='user-manage-page-col-1'>
        <PersonalInfo />
      </div>
    </div>
  )
}

export default UserManagePage;