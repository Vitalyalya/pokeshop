import Button from "../../components/button/button.component";
import LoginForm from "../../components/login-form/login-form";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../components/utils/firebase.util";

import { Fragment } from "react";

const Login = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  return (
    <Fragment>
      <div className="container login-card">
        <Button onClick={logGoogleUser}>signInWithGoogle</Button>
      </div>
      <LoginForm />
    </Fragment>
  );
};

export default Login;
