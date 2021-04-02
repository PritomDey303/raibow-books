import React from "react";

function SingleOrder(props) {
  console.log(props.order);
  const {
    book_name,
    book_quantity,
    book_price,
    order_date,
    address,
    mobile,
  } = props.order;

  return (
    <tr>
      <td>{book_name}</td>
      <td>{book_quantity}</td>
      <td>Tk.{book_price}</td>
      <td>{address}</td>
      <td>{mobile}</td>
      <td>{order_date}</td>
    </tr>
  );
}

export default SingleOrder;
