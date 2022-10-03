import { useState } from "react";

import Button from "../../components/button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../components/utils/firebase.util";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-in-container">
      <h1>Not registered?</h1>
      <div className="card-sign-up ">
        <form onSubmit={handleSubmit}>
          {/* <label className="input">Display name</label> */}
          <FormInput
            label="Display Name"
            className="input__field"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
            placeholder="Your name"
          />
          <label className="input">Email</label>
          <input
            className="input__field"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="example@example.com"
          />
          <label className="input">Password</label>
          <input
            className="input__field"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="At least 6 characters"
          />
          <label className="input">Confirm Password</label>
          <input
            className="input__field"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Repeat password"
          />
          <Button onClick={handleSubmit} type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
