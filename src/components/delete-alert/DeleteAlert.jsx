import React, { Component } from 'react';
import './DeleteAlert.styles.scss';
import { withRouter } from 'react-router-dom';

import { Button, IconButton, CircularProgress } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteRecipe } from '../../redux/delete-recipe/delete.recipe.actions';
import { initialRequestAllUserRecipes, } from '../../redux/user-recipes/user.recipes.actions';
import { selectDeleteRecipePending, selectDeleteRecipeSuccess } from '../../redux/delete-recipe/delete.recipe.selectors';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapStateToProps = createStructuredSelector({
  deleteRecipePending: selectDeleteRecipePending,
  deleteRecipeSuccess: selectDeleteRecipeSuccess,
  userToken: selectUserToken
})

const mapDispatchToProps = (dispatch) => ({
  initialRequestAllUserRecipes: (token) => dispatch(initialRequestAllUserRecipes(token)),
  deleteRecipe: (userToken, recipeID) => dispatch(deleteRecipe(userToken, recipeID))
});

class DeleteAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleteRecipeSuccess !== this.props.deleteRecipeSuccess
       && this.props.deleteRecipeSuccess) {
      this.handleClose();

      if (this.props.onDetailsPage) {
        this.props.history.push('/myrecipes');
        this.props.history.go();
      }

      if (this.props.onManagePage) {
        this.props.initialRequestAllUserRecipes(this.props.userToken);
      }
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    this.props.deleteRecipe(this.props.userToken, this.props.onDeleteRecipe._id);
  };

  handleCancel = () => {
    this.handleClose();
  };

  render() {
    const { deleteRecipePending } = this.props;
    return (
      <div className='delete-alert-container'>
        <IconButton type="button" aria-label="edit-recipe" onClick={this.handleClickOpen}>
          <DeleteIcon fontSize={`${this.props.onManagePage ? 'small': 'inherit'}`}  />
        </IconButton> 
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Recipe Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this recipe?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirm} color="primary" disabled={deleteRecipePending} autoFocus>
              {deleteRecipePending && <CircularProgress size={15} />}
              {!deleteRecipePending && 'Confirm'}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteAlert));