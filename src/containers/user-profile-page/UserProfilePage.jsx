import React from 'react';
import './UserProfilePage.styles.scss';
import UserInfo from  '../../components/user-info/UserInfo';

const UserProfilePage = (props) => {
  return (
    <div className='user-profile-container'>
      <div className='small-screen-user-profile'>
        <UserInfo />
      </div>
    </div>
  );
}

export default UserProfilePage;