import React, { Component } from 'react';
import './EditProfile.styles.scss';

import { Button, CircularProgress} from "@material-ui/core";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { onEditProfileName, onEditProfileEmail, updateUserInfo } from '../../redux/user/user.actions';
import { 
  selectUserToken,
  selectCurrentUser, 
  selectEditProfilePending,
  selectEditNameStatus,
  selectEditEmailStatus
 } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  userInfo: selectCurrentUser,
  editProfilePenging: selectEditProfilePending,
  editNameStatus: selectEditNameStatus,
  editEmailStatus: selectEditEmailStatus
})

const mapDispatchToProps = (dispatch) => ({
  onEditProfileName: () => dispatch(onEditProfileName()),
  onEditProfileEmail: () => dispatch(onEditProfileEmail()),
  updateUserInfo: (token, displayName, email) => dispatch(updateUserInfo(token, displayName, email))
});

class EditProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      displayName: props.userInfo.name,
      email: props.userInfo.email
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  handleEditClick = event => {
    if (event.target.value === 'onEditName') {
      this.props.onEditProfileName();
    }
    if (event.target.value === 'onEditEmail') {
      this.props.onEditProfileEmail();
    }
  }

  handleEditNameCancel = event => {
    this.props.onEditProfileName();
  }

  handleEditEmailCancel = event => {
    this.props.onEditProfileEmail();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateUserInfo(this.props.userToken, this.state.displayName, this.state.email);
  }

  render() {
    const { userInfo, editProfilePenging, editNameStatus, editEmailStatus } = this.props;
    return (
      <div className='manage-edit-profile'>
        <div className='manage-user-avatar'>
          <div className='user-avatar-container'>
          {
            userInfo.avatar ? <img alt='userimg' src={`data:image/png;base64,${userInfo.avatar}`} /> 
            : <img alt='default_userimg' src={require('../../assets/user_default.png')} />
          }
          </div>
          <div className='avatar-art'></div>
        </div>
        <hr className='profile-separate-line'></hr>
        {
          editNameStatus ?
          <div className='manage-edit-name'>
            <input name="displayName" ype="text" id="edit-name" onChange={this.handleChange} defaultValue={userInfo.name} />
            <form onSubmit={this.handleSubmit}>
              <Button variant="outlined" type="submit" size="small" style={{marginRight: "10px"}}
                disabled={editProfilePenging}>
                {editProfilePenging && <CircularProgress size={15} />}
                {!editProfilePenging && 'Submit'}
              </Button>
              <Button variant="outlined" type="button" size="small" onClick={this.handleEditNameCancel}>Cancel</Button>
            </form>
          </div>
          :
          <div className='manage-edit-name'>
            <h4>{userInfo.name}</h4>
            <button className='manage-edit-btn' value='onEditName' onClick={this.handleEditClick}>Edit your name</button>
          </div>
        }
        {
          editEmailStatus ?
          <div className='manage-edit-email'>
            <input name="email" type="text" id="edit-email" onChange={this.handleChange} defaultValue={userInfo.email} />
            <form onSubmit={this.handleSubmit}>
              <Button variant="outlined" type="submit" size="small" style={{marginRight: "10px"}}
                disabled={editProfilePenging}>
                {editProfilePenging && <CircularProgress size={15} />}
                {!editProfilePenging && 'Submit'}
              </Button>
              <Button variant="outlined" type="button" size="small" onClick={this.handleEditEmailCancel}>Cancel</Button>
            </form>
          </div>
          :
          <div className='manage-edit-email'>
            <span>{userInfo.email}</span>
            <button className='manage-edit-btn' value='onEditEmail' onClick={this.handleEditClick}>Edit email</button>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
