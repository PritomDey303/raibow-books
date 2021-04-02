import React, { useContext } from "react";
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { BookContext } from "../../../App";
import "./Books.css";
import SingleBook from "./SingleBook/SingleBook";
function Books() {
  const [bookInfo, , ,] = useContext(BookContext);
  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mt-5 w-50 mx-auto">
            <FormControl
              placeholder="Enter Product Name"
              aria-label="Enter Product Name"
              aria-describedby="basic-addon2"
              className="p-4"
            />
            <InputGroup.Append>
              <InputGroup.Text
                id="basic-addon2 "
                className="px-4 bg-primary text-light"
              >
                Search
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>

      <Row className="my-5">
        {bookInfo.length === 0 ? (
          <div className="w-25  mt-5 spinner">
            <div className="spinner-border text-primary  " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          bookInfo.map((data) => (
            <SingleBook key={data._id} bookdetails={data}></SingleBook>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Books;
