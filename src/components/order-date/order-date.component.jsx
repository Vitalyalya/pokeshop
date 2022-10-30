const OrderDate = ({ dateString }) => {
  const date = dateString.slice(0, -5).split("T");

  return (
    <h2>
      Order from {date[0]}, {date[1]}
    </h2>
  );
};

export default OrderDate;
