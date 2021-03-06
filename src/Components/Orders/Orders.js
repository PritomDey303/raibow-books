import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { BookContext } from "../../App";
import Navigation from "../Navigation/Navigation";
import "./Orders.css";
import SingleOrder from "./SIngleOrder/SingleOrder";
function Orders() {
  const [orderData, setOrderData] = useState();
  const [, , LoggedInUser] = useContext(BookContext);
  useEffect(() => {
    fetch(
      `https://rainbow-books303.herokuapp.com/orderdata?email=${LoggedInUser.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
      });
  }, [LoggedInUser.email]);
  return (
    <>
      <Navigation></Navigation>
      <Container className="mt-5">
        <h1 className="my-4 text-primary">Your Order Details:</h1>
        <Table hover>
          <thead className="bg-primary text-light">
            <tr>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Delivery Address</th>
              <th>Contact</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orderData ? (
              orderData.map((data) => (
                <SingleOrder key={data._id} order={data}></SingleOrder>
              ))
            ) : (
              <div className="w-100 mt-5">
                <div
                  className="spinner-border text-primary "
                  style={{ marginLeft: "120%" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Orders;
