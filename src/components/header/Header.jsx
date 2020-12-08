import React from 'react';
import { Link } from 'react-router-dom';
import './Header.styles.scss';

import { Dropdown } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';

import { ReactComponent as Logo} from '../../assets/logo.svg';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { resetUserRecipe } from '../../redux/user-recipes/user.recipes.actions';
import { resetUser, logoutCurrentUser } from '../../redux/user/user.actions';
import { selectUserToken } from '../../redux/user/user.selectors';


const mapDispatchToProps = dispatch => ({
  resetUser: () => dispatch(resetUser()),
  resetUserRecipe: () => dispatch(resetUserRecipe()),
  logoutCurrentUser: token => dispatch(logoutCurrentUser(token))
})

const mapStateToProps = createStructuredSelector({
  currentUserToken: selectUserToken
});

const Header = ({ logoutCurrentUser, currentUserToken }) => {
  const handleClick = event => {
    if (currentUserToken) {
      logoutCurrentUser(currentUserToken);
    };
  }

  return (
    <div className='header-container'>
      <Link className='logo-container' to="/">
			  <Logo className='logo' /><span>Secret Recipe</span>
		  </Link>
      <div className='header-options' id="header-full-screen">
        <Link className='header-option link' to='/explore'>Explore</Link>
        {
          currentUserToken ? 
          <Link className='header-option link' to='/myrecipes'>
            <span>My Recipes</span>
          </Link> 
          : null
        }
        <Link className='header-option header-signin' to='/signin'>
          <Button variant="header" type="button" onClick={() => handleClick()}>
          {
            currentUserToken ? <span>Sign Out</span> : <span>Sign In</span>
          }
          </Button>
        </Link>
      </div>
      <div className='media-header-options' id="header-small-screen">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <MenuIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/explore">Explore</Dropdown.Item>
            {
              currentUserToken ? 
              <Dropdown.Item href="/myprofile">My Profile</Dropdown.Item> : null
            }
            {
              currentUserToken ? 
              <Dropdown.Item href="/myrecipes">My recipes</Dropdown.Item> : null
            }
            <Dropdown.Item href="/signin" onClick={() => handleClick()}>
            {
              currentUserToken ? "Sign Out" : "Sign In"
            }
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);