const OrderDate = ({ dateString }) => {
  const date = dateString.split("T");
  // console.log(date);

  return (
    <h2>
      Order from {date[0]}, {date[1]}
    </h2>
  );
};

export default OrderDate;
