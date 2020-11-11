import React from 'react';
import './UserInfo.styles.scss';

import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons'

import StyledGreyButton from '../styled-buttons/StyledGreyButton';
import StatsCard from '../stats-card/StatsCard';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUsersTotalCount, selectUsersPublicCount } from '../../redux/user-recipes/user.recipes.selectors';

const mapStateToProps = createStructuredSelector({
  userInfo: selectCurrentUser,
  usersTotalCount: selectUsersTotalCount,
  usersPublicCount: selectUsersPublicCount,
})

const UserInfo = ({ history, userInfo, usersTotalCount, usersPublicCount, v1, v2 }) => {
  return (
    <div className={`user-info-container ${v1 ? 'v1' : 'null'} ${v2 ? 'v2' : null}` }>
      <div className='user-info-avatar'>
      {
        userInfo.avatar ? <img className='user-info-avatar-img' alt='userimg' src={`data:image/png;base64,${userInfo.avatar}`} /> 
        : <img className='user-info-avatar-img' alt='default_userimg' src={require('./user_default.png')} />
      }
      </div>
      <div className='user-detailed-info'>
        <h4>{userInfo.name}</h4>
        <h6>@{userInfo.userId}</h6>
        <div className='user-info-stats'>
          <div className='user-info-stats-public'>
            <h5>{usersPublicCount}</h5>
            <span>Public</span>
          </div>
          <div className='user-info-stats-private'>
            <h5>{usersTotalCount-usersPublicCount}</h5>
            <span>Private</span>
          </div>
        </div>
        <div className='user-info-badge'>
          <FontAwesomeIcon style={{color:"#C4C4C4"}} size="2x" icon={faMedal} />
        </div>
        <div className='user-info-stats-slider'>
          <StatsCard version={v1 ? 'v1' : 'v2'} />
        </div>
        <div className='user-info-edit-btn'>
          <StyledGreyButton size="small" component="span" startIcon={<EditRoundedIcon />}
            onClick={() => {history.push('/usermanage');}}> 
            Edit Profile 
          </StyledGreyButton>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(UserInfo);