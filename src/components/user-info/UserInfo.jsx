import React from 'react';
import './UserInfo.styles.scss';

import { IconButton } from "@material-ui/core";
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import StatsCard from '../stats-card/StatsCard';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userInfo: selectCurrentUser,
})

const UserInfo = ({ userInfo }) => {
  return (
    <div className='user-info'>
      <div className='user-avatar-container'>
      {
        userInfo.avatar ? <img alt='userimg' src={`data:image/png;base64,${userInfo.avatar}`} /> 
        : <img alt='default_userimg' src={require('./user_default.png')} />
      }
      </div>
      <div className='user-detailed-info'>
        <div className='name-and-email'>
          <h4>{userInfo.name}</h4>
          <h6>@{userInfo.userId}</h6>
          <h6>{userInfo.email}</h6>
        </div>
      </div>
      <StatsCard />
    </div>
  );
}

export default connect(mapStateToProps)(UserInfo);