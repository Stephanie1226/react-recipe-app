import React, { Component } from 'react';
import './EditProfile.styles.scss';

import { Button, CircularProgress} from "@material-ui/core";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  userInfo: selectCurrentUser
})

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onEditName: false,
      onEditEmail: false
    }
  }

  handleEditClick = event => {
    if (event.target.value === 'onEditName') {
      this.setState({onEditName: true});
    }
    if (event.target.value === 'onEditEmail') {
      this.setState({onEditEmail: true});
    }
  }

  handleEditNameCancel = event => {
    this.setState({onEditName: false});
  }

  handleEditEmailCancel = event => {
    this.setState({onEditEmail: false});
  }


  render() {
    const { onEditName, onEditEmail } = this.state;
    const { userInfo } = this.props;
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
          onEditName ?
          <div className='manage-edit-name'>
            <input type="text" id="edit-name" onChange={this.handleChange} defaultValue={userInfo.name} />
            <Button variant="outlined" type="button" size="small" onClick={this.handleEditNameCancel}>Cancel</Button>
          </div>
          :
          <div className='manage-edit-name'>
            <h4>{userInfo.name}</h4>
            <button className='manage-edit-btn' value='onEditName' onClick={this.handleEditClick}>Edit your name</button>
          </div>
        }
        {
          onEditEmail ?
          <div className='manage-edit-email'>
            <input type="text" id="edit-email" onChange={this.handleChange} defaultValue={userInfo.email} />
            <Button variant="outlined" type="button" size="small" onClick={this.handleEditEmailCancel}>Cancel</Button>
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

export default connect(mapStateToProps)(EditProfile);
