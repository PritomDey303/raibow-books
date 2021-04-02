import React from "react";

function SingleOrder(props) {
  const { book_name, book_quantity, book_price, order_date } = props.order;
  return (
    <tr>
      <td>{book_name}</td>
      <td>{book_quantity}</td>
      <td>${book_price}</td>
      <td>{order_date}</td>
    </tr>
  );
}

export default SingleOrder;
