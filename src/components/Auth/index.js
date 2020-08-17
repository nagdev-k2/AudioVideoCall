import React, {useState} from 'react';

import SignIn from './signIn';
import SignUp from './signUp';

const Authentication = (props) => {
  const [isSignIn, toggleSignIn] = useState(true);
  const {navigation} = props;
  return isSignIn ? (
    <SignIn navigation={navigation} toggleSignIn={toggleSignIn} />
  ) : (
    <SignUp navigation={navigation} toggleSignIn={toggleSignIn} />
  );
};

export default Authentication;
