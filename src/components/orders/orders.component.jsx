import OrderItem from "../order-item/order-item.component";
import OrderDate from "../order-date/order-date.component";

import "./orders.styles.css";

const Orders = ({ ordersList }) => {
  return (
    <div className="orders-container">
      {ordersList.map((order) =>
        !order.date ? (
          <OrderItem key={order.id} pokemon={order} />
        ) : (
          <OrderDate key={order.date} dateString={order.date} />
        )
      )}
      <hr></hr>
    </div>
  );
};

export default Orders;
