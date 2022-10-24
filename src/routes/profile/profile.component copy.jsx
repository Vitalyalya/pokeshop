import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUserDocs } from "../../components/utils/firebase.util";

import Orders from "../../components/orders/orders.component";
import Button from "../../components/button/button.component";

import { changeUserData } from "../../components/utils/firebase.util";

import "./profile.styles.css";

const defaultFields = {
  name: "",
  email: "",
};

const ProfilePage = () => {
  const [orders, setOrders] = useState(null);
  const [isNameActive, setIsNameActive] = useState(true);
  const [isEmailActive, setIsEmailActive] = useState(true);

  const [formFields, setFormFields] = useState(defaultFields);
  const { name, email } = formFields;

  const { currentUser } = useContext(UserContext);

  const nameEditHandler = () => {
    setIsNameActive(!isNameActive);
  };
  const emailEditHandler = () => {
    setIsEmailActive(!isEmailActive);
  };

  const nameEdit = () => {
    setIsNameActive(!isNameActive);
    changeUserData(name, currentUser, true);
  };

  const emailEdit = () => {
    setIsEmailActive(!isEmailActive);
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
      <>
        {currentUser ? (
          <>
            <div className="container profile-info">
              <span className="profile-info-block">
                <p>Name:</p>
                <input
                  className="input__field profile-input"
                  disabled={isNameActive}
                  value={name}
                  onChange={handleChange}
                  name="name"
                />

                {!isNameActive ? (
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
            <div className="profile-container">
              {ordersList.length ? (
                ordersList.map((order) => (
                  <Orders key={order[0].date} ordersList={order} />
                ))
              ) : (
                <div className="cart-empty">No orders</div>
              )}
            </div>
          </>
        ) : null}
      </>
    );
  } else {
    return <div className="profile-container cart-empty">Please log in</div>;
  }
};

export default ProfilePage;
