import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase.util";

const defaultFormFields = {
  email: "",
  password: "",
};

const LogInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const userName = await signInWithGooglePopup();

    localStorage.setItem("user", userName.user.displayName);
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userName = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
      localStorage.setItem("user", userName.user.displayName);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h1>Log in</h1>
      <div className="card-sign-up ">
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="example@example.com"
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="At least 6 characters"
          />
          <hr />
          <Button buttonType="form" type="submit">
            Log In
          </Button>
        </form>
        <hr></hr>
        <Button buttonType="form" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LogInForm;
