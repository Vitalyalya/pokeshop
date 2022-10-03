import Button from "../../components/button/button.component";
import LoginForm from "../../components/login-form/login-form";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../components/utils/firebase.util";

const Login = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div className="container login-card">
        <Button onClick={logGoogleUser}>signInWithGoogle</Button>
      </div>
      <LoginForm />
    </>
  );
};

export default Login;
