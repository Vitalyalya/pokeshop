import { useContext, useEffect, useState, Fragment } from "react";
import { UserContext } from "../../context/user.context";
import { getUserDocs } from "../../components/utils/firebase.util";

import { Link } from "react-router-dom";

import Orders from "../../components/orders/orders.component";
import Button from "../../components/button/button.component";

import {
  changeUserData,
  changeUserEmail,
  changeUserPassword,
} from "../../components/utils/firebase.util";

import "./profile.styles.css";

const defaultFields = {
  name: "",
  email: "",
  password: "",
  oldPass: "",
  newPass: "",
};

const ProfilePage = () => {
  const [orders, setOrders] = useState(null);
  const [isNameActive, setIsNameActive] = useState(true);
  const [isEmailActive, setIsEmailActive] = useState(true);

  const [formFields, setFormFields] = useState(defaultFields);
  const { name, email, password, oldPass, newPass } = formFields;

  const { currentUser, setTimePassed, timePassed } = useContext(UserContext);

  const nameEditHandler = () => {
    setIsNameActive(!isNameActive);
  };

  const nameEdit = () => {
    setIsNameActive(!isNameActive);
    changeUserData(name, currentUser, true);
  };

  const emailEditHandler = () => {
    setIsEmailActive(!isEmailActive);
  };

  const emailEdit = async () => {
    setIsEmailActive(!isEmailActive);
    const check = await changeUserEmail(email, currentUser, false);
    setTimePassed(check);
  };

  const enterPassHandler = () => {
    changeUserEmail(email, currentUser, password);
    setTimePassed(false);
  };

  const changePasswordHandler = async () => {
    const check = await changeUserPassword(email, oldPass, newPass);
    setFormFields({ ...formFields, oldPass: "", newPass: "" });

    if (check) {
      switch (check.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-foundauth/too-many-requests":
          alert(
            "Too many requests. Please wait before changing a password again"
          );
          break;
        default:
          alert(check);
      }
    }

    if (check.code === "") {
      alert(check.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    if (currentUser) {
      getUserDocs(currentUser).then((data) => setOrders(data));
      defaultFields.name = currentUser.displayName;
      defaultFields.email = currentUser.email;
    }
  }, [currentUser]);

  if (orders) {
    const ordersList = orders.orders.map((order) => JSON.parse(order));

    return (
      <Fragment>
        {currentUser ? (
          <Fragment>
            {currentUser.providerData[0].providerId !== "google.com" ? (
              <div className="container profile-info">
                <div className="name-email-block">
                  <span className="profile-info-block">
                    <p>Name:</p>
                    <input
                      className="input__field profile-input"
                      disabled={isNameActive}
                      value={name}
                      onChange={handleChange}
                      name="name"
                    />

                    {!isNameActive === true ? (
                      <Button onClick={nameEdit}>Save</Button>
                    ) : (
                      <Button onClick={nameEditHandler}>Edit</Button>
                    )}
                  </span>
                  <span className="profile-info-block">
                    Email:{" "}
                    <input
                      className="input__field profile-input"
                      disabled={isEmailActive}
                      value={email}
                      onChange={handleChange}
                      name="email"
                    />
                    {!isEmailActive ? (
                      <Button onClick={emailEdit}>Save</Button>
                    ) : (
                      <Button onClick={emailEditHandler}>Edit</Button>
                    )}
                  </span>
                </div>

                {timePassed ? (
                  <div className="enter-pass-again">
                    <p className="enter-pass-message">
                      Please enter your password again
                    </p>
                    <div className="enter-pass-input-button">
                      <input
                        className="input__field profile-input"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        name="password"
                      />
                      <Button onClick={enterPassHandler}>Submit</Button>
                    </div>
                  </div>
                ) : null}
                <div className="enter-pass-again">
                  <div>
                    <p className="enter-pass-message">Old password:</p>
                    <div className="enter-pass-input">
                      <input
                        className="input__field profile-input"
                        type="password"
                        value={oldPass}
                        onChange={handleChange}
                        name="oldPass"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="enter-pass-message">New password:</p>
                    <div className="enter-pass-input">
                      <input
                        className="input__field profile-input"
                        type="password"
                        value={newPass}
                        onChange={handleChange}
                        name="newPass"
                      />
                    </div>
                  </div>
                </div>
                {oldPass ? (
                  <Button onClick={changePasswordHandler}>Submit</Button>
                ) : null}
              </div>
            ) : null}
            <div className="profile-container">
              {ordersList.length ? (
                ordersList.map((order) => (
                  <Orders key={order[0].date} ordersList={order} />
                ))
              ) : (
                <h2 className="loading">No orders</h2>
              )}
            </div>
          </Fragment>
        ) : (
          <h2 className="profile-container-empty loading">
            Please <Link to="/log-in">log in</Link>{" "}
            {/* <Link to="/login">
              <Button buttonType="light">Log In</Button>
            </Link>{" "}
            or{" "} */}
            or
            <Link to="/sign-up">sign Up</Link>
            {/* <Button>Sign Up</Button> */}
          </h2>
        )}
      </Fragment>
    );
  } else if (localStorage.getItem("user") !== null) {
    return <h2 className="profile-container loading">Loading</h2>;
  } else
    return (
      <h2 className="profile-container-empty loading">
        Please{" "}
        <u>
          <Link to="/login">log in</Link>{" "}
        </u>
        or
        <u>
          <Link to="/sign-up">sign up</Link>
        </u>
      </h2>
    );
};

export default ProfilePage;
