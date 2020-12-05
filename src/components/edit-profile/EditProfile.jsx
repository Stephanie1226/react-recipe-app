import React, { Component } from 'react';
import './EditProfile.styles.scss';

import { IconButton, CircularProgress} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { 
  onEditProfileName, 
  onEditProfileEmail, 
  updateUserInfo,
  uploadProfileImage, 
  uploadProfileImageTypeError, 
  deleteProfileImage 
} from '../../redux/user/user.actions';
import { 
  selectUserToken,
  selectCurrentUser, 
  selectEditProfilePending,
  selectEditNameStatus,
  selectEditEmailStatus,
  selectUploadProfilePicPending,
  selectDeleteProfilePicPending
 } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  userInfo: selectCurrentUser,
  editProfilePenging: selectEditProfilePending,
  editNameStatus: selectEditNameStatus,
  editEmailStatus: selectEditEmailStatus,
  uploadProfilePicPending: selectUploadProfilePicPending,
  deleteProfilePicPending: selectDeleteProfilePicPending
  
})

const mapDispatchToProps = (dispatch) => ({
  onEditProfileName: () => dispatch(onEditProfileName()),
  onEditProfileEmail: () => dispatch(onEditProfileEmail()),
  updateUserInfo: (token, displayName, email) => dispatch(updateUserInfo(token, displayName, email)),
  uploadProfileImage: (token, profilepic) => dispatch(uploadProfileImage(token, profilepic)),
  uploadProfileImageTypeError: data => dispatch(uploadProfileImageTypeError(data)),
  deleteProfileImage: token => dispatch(deleteProfileImage(token)),
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

  onChangeFile = event => {
    const imageFile = event.target.files[0];

    if (!imageFile) {
      this.props.uploadProfileImageTypeError('Please select an image.')
      return false;
    }
    if (!imageFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|HEIC)$/)) {
      this.props.uploadProfileImageTypeError('File type must be .jpg/jpeg, .png, .HEIC')
      return false;
    } else {
      this.props.uploadProfileImage(this.props.userToken, imageFile);
    }
  }

  onDelete = event => {
    if (this.props.userInfo.avatar) {
      this.props.deleteProfileImage(this.props.userToken);
    }
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
    const { uploadProfilePicPending, deleteProfilePicPending } = this.props;
    return (
      <div className='manage-edit-profile'>
        <div className='manage-user-avatar'>
          <div className='user-avatar-container'>
            <div className='user-avatar-n-btn'>
              <div className='user-avatar-edit'>
                {
                  userInfo.avatar ? <img alt='userimg' src={`data:image/png;base64,${userInfo.avatar}`} /> 
                  : <img alt='default_userimg' src={require('../../assets/user_default.png')} />
                }
              </div>
              <div className='uploaduserimg-container'>
                <input 
                  accept="image/*" 
                  id="upload-avatar"
                  type="file" 
                  style={{display:"none"}}
                  onChange={this.onChangeFile}
                />
                <label htmlFor="upload-avatar">
                  <IconButton size="small" component="span">
                    {!uploadProfilePicPending && <PhotoCamera />}
                    {uploadProfilePicPending && <CircularProgress size={15} />}
                  </IconButton>
                </label>
              </div>
              <div className='deleteuserimg-container'>
                <IconButton size="small" onClick={this.onDelete} >
                  {!deleteProfilePicPending && <DeleteIcon />}
                  {deleteProfilePicPending && <CircularProgress size={15} />}
                </IconButton>
              </div>
            </div>
            <span>@{userInfo.userId}</span>
          </div>
          <img alt='manage-deco' src={require('../../assets/manage_deco.png')} className='manage-deco' />
        </div>
        <hr className='profile-separate-line'></hr>
        {
          editNameStatus ?
          <div className='manage-edit-name'>
            <input name="displayName" ype="text" id="edit-name" onChange={this.handleChange} defaultValue={userInfo.name} />
            <form onSubmit={this.handleSubmit}>
              <button className='manage-edit manage-edit-submit' variant="outlined" type="submit" size="small" style={{marginRight: "10px"}}
                disabled={editProfilePenging}>
                {editProfilePenging && <CircularProgress size={15} />}
                {!editProfilePenging && 'Submit'}
              </button>
              <button className='manage-edit manage-edit-cancel' variant="outlined" type="button" size="small" onClick={this.handleEditNameCancel}>Cancel</button>
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
              <button className='manage-edit manage-edit-submit' variant="outlined" type="submit" size="small" style={{marginRight: "10px"}}
                disabled={editProfilePenging}>
                {editProfilePenging && <CircularProgress size={15} />}
                {!editProfilePenging && 'Submit'}
              </button>
              <button className='manage-edit manage-edit-cancel' variant="outlined" type="button" size="small" onClick={this.handleEditEmailCancel}>Cancel</button>
            </form>
          </div>
          :
          <div className='manage-edit-email'>
            <span className='user-email-display'>{userInfo.email}</span>
            <button className='manage-edit-btn' value='onEditEmail' onClick={this.handleEditClick}>Edit email</button>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
