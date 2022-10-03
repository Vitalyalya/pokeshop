import Button from "../../components/button/button.component";
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
    <div className="container">
      <h3>Im login page hi</h3>
      <Button onClick={logGoogleUser}>signInWithGoogle</Button>
    </div>
  );
};

export default Login;
