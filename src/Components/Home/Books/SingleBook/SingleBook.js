import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SingleBook.css";
function SingleBook(props) {
  const { name, author, price, imgUrl, _id } = props.bookdetails;
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="mt-4 mx-auto" style={{ width: "20rem" }}>
        <Card.Img className="card-img" variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <h5>By {author}</h5>
          <div className=" my-3 d-flex justify-content-between">
            <h3>Price:Tk.{price}</h3>

            <Link to={`/checkout/${_id}`}>
              <Button className="btn px-4" variant="primary">
                Buy
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SingleBook;
