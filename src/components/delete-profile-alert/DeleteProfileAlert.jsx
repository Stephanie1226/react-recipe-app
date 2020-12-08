import React, { Component } from 'react';
import './DeleteProfileAlert.styles.scss';
import { withRouter } from 'react-router-dom';

import { Button, CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetUserRecipe } from '../../redux/user-recipes/user.recipes.actions';
import { deleteProfile, resetUser } from '../../redux/user/user.actions';
import { selectCurrentUserAll, selectDeleteProfilePending, selectDeleteProfileSuccess } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  deleteProfilePending: selectDeleteProfilePending,
  deleteProfileSuccess: selectDeleteProfileSuccess,
  currentUser: selectCurrentUserAll
})

const mapDispatchToProps = (dispatch) => ({
  resetUser: () => dispatch(resetUser()),
  resetUserRecipe: () => dispatch(resetUserRecipe()),
  deleteProfile: (token) => dispatch(deleteProfile(token))
});

class DeleteProfileAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    this.props.deleteProfile(this.props.currentUser.token);
  };

  handleCancel = () => {
    this.handleClose();
  };

  render() {
    const { deleteProfilePending } = this.props;
    return (
      <div className='delete-user-alert-container'>
        <button className='manage-delete-user-btn' onClick={this.handleClickOpen}>Delete Profile</button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>
            {"Delete User Account Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? You will not be able to get your account back in the future!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirm} color="primary" disabled={deleteProfilePending} autoFocus>
              {deleteProfilePending && <CircularProgress size={15} />}
              {!deleteProfilePending && 'Confirm'}
            </Button>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteProfileAlert));