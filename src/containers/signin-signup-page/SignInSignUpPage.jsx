import React, { useState } from 'react';
import './SignInSignUpPage.styles.scss';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

function SignInSignUpPage() {
  const [value, setValue] = useState(0);
  const tab_styles = {
    minWidth: "40%",
    color:"#7b7b7b",
    outline: "none"
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='signin-signup-page-container'>
      <div className='signin-signup-form-container'>
        <Tabs
          value={value}
          TabIndicatorProps={{style: { background: "#7f94a9" }}}
          textColor="primary"
          onChange={handleChange}
          centered
        >
          <Tab style={tab_styles} label="Sign in" />
          <Tab style={tab_styles} label="Sign up" />
        </Tabs>
        {
          value === 0 ? <SignIn /> : <SignUp />
        }
      </div>
    </div>
  );
}

export default SignInSignUpPage;