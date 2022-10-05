import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUserDocs } from "../../components/utils/firebase.util";

import CartItem from "../../components/cart-item/cart-item.component";

const ProfilePage = () => {
  //   const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);

  const { currentUser } = useContext(UserContext);

  //   let orderList = "";

  useEffect(() => {
    // console.log(currentUser);
    if (currentUser) {
      //   setLoading(false);
      getUserDocs(currentUser).then((data) => setOrders(data));
    }
  }, [currentUser]);

  //   useEffect(() => {
  //     if (orders) {
  //       console.log(orders);
  //     }
  //   }, [orders]);

  if (orders) {
    const ordersList = orders.orders.map((order) => JSON.parse(order));

    console.log(ordersList);
    ordersList.map((order) => {});
    return (
      <div className="container">
        {ordersList.map((order) =>
          order.map((oneOrder) => (
            <>
              <CartItem key={oneOrder.id} pokemon={oneOrder} />
              {/* <hr></hr> */}
            </>
          ))
        )}
      </div>
    );
  }
};

export default ProfilePage;
