import React, { useContext } from "react";
import { Col, Container, Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Redirect, useParams } from "react-router";
import { BookContext } from "../../App";
import Navigation from "../Navigation/Navigation";

function CheckOut() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  const [bookInfo, , LoggedInUser] = useContext(BookContext);
  console.log(LoggedInUser);
  if (id === "0") {
    return <Redirect to="/home" />;
  }
  const requiredBook = bookInfo.find((book) => book._id === id);
  const { name, quantity, price } = requiredBook;

  const handlePlaceOrder = (data, e) => {
    const orderData = {
      customer_name: LoggedInUser.displayName,
      customer_email: LoggedInUser.email,
      ...data,
      book_name: name,
      book_quantity: quantity,
      book_price: price,
      order_date: new Date().toISOString().slice(0, 10),
    };
    console.log(orderData);
    fetch("https://rainbow-books303.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    }).then((res) => {
      res && alert("Congratulations! Order placed successfully.");
      return <Redirect to="/orders" />;
    });
    e.target.reset();
    e.preventDefault();
  };
  return (
    <div>
      <Navigation></Navigation>
      <Container>
        <h1 className="mt-5 text-primary">Checkout</h1>
        <form onSubmit={handleSubmit(handlePlaceOrder)}>
          <Table hover>
            <thead className="bg-primary text-light">
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>Tk.{price}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <h4>Total Price:</h4>
                </td>
                <td>
                  <h4>Tk.{price}</h4>
                </td>
              </tr>
            </tbody>
          </Table>
          <h2 className="text-primary">User Info:</h2>
          <Form.Row className="my-4">
            <Col>
              <Form.Control
                placeholder="Your Mobile Number"
                ref={register}
                name="mobile"
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Your Address"
                ref={register}
                name="address"
                required
              />
            </Col>
          </Form.Row>
          <button
            className="btn btn-primary btn-lg ml-auto d-block"
            type="submit"
          >
            Check Out
          </button>
        </form>
      </Container>
    </div>
  );
}

export default CheckOut;
