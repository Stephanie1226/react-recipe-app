import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import UserProfilePage from './user-profile-page/UserProfilePage';
import HomePage from './home-page/HomePage';
import ExplorePage from './explore-page/ExplorePage';
import UserRecipePage from './user-recipe-page/UserRecipePage';
import UserManagePage from './user-manage-page/UserManagePage';
import SignInSignUpPage from './signin-signup-page/SignInSignUpPage';
import CreateRecipePage from './create-recipe-page/CreateRecipePage';
import UpdateRecipePage from './update-recipe-page/UpdateRecipePage';
import EditRecipePhotoPage from './edit-recipe-photo-page/EditRecipePhotoPage';
import RecipePage from './recipe-page/RecipePage';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserToken } from '../redux/user/user.selectors';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../utils/material-ui-theme';

const mapStateToProps = createStructuredSelector({
  currentUserToken: selectUserToken
});

function App({ currentUserToken }) {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <div className='sticky-header'>
          <Header />
          </div>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/explore' component={ExplorePage} />
              <Route exact path='/myprofile' component={UserProfilePage} />
              <Route exact path='/myrecipes' render={() => currentUserToken ? (<UserRecipePage />) : (<Redirect to='/signin' />)} />
              <Route exact path='/usermanage' component={UserManagePage} />
              <Route exact path='/signin' render={() => currentUserToken ? (<Redirect to='/myrecipes' />) : (<SignInSignUpPage />)} />
              <Route exact path='/createrecipe' component={CreateRecipePage} />
              <Route exact path='/updaterecipe' component={UpdateRecipePage} />
              <Route exact path='/editrecipephoto' component={EditRecipePhotoPage} />
              <Route path='/explore/:id' component={RecipePage} />
              <Route path='/myrecipes/:id' component={RecipePage} />
            </Switch>
          <Footer />
        </div>
    </MuiThemeProvider>
  );
}


export default connect(mapStateToProps)(App);