import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BookContext } from "../../../App";
function AddBook() {
  const [bookInfo, setBookInfo, ,] = useContext(BookContext);
  const [imageUrl, setImageUrl] = useState(null);
  const { register, handleSubmit } = useForm();

  ///////onsubmit////
  const onSubmit = (data, e) => {
    const bookData = {
      name: data.name,
      author: data.author,
      price: parseInt(data.price),
      quantity: 1,
      imgUrl: imageUrl,
    };
    const newArr = [...bookInfo, bookData];

    fetch("https://rainbow-books303.herokuapp.com/addbooks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookData),
    }).then((res) => {
      setBookInfo(newArr);
      alert("Congratulation! Book added successfully.");
    });

    e.preventDefault();
    e.target.reset();
  };
  /////handleImage//////
  const handleImage = (e) => {
    const imageData = new FormData();
    imageData.set("key", "7f97b5f40e0c4ea31cd47a0f9592af70");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        response.data.data.url && setImageUrl(response.data.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container className="py-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridText">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              name="name"
              ref={register}
              type="text"
              placeholder="Enter book name"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridText">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              name="author"
              ref={register}
              type="text"
              placeholder="Enter author name"
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridNumber">
            <Form.Label>Book Price</Form.Label>
            <Form.Control
              name="price"
              ref={register}
              type="number"
              placeholder="Enter Price"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFile1">
            <Form.Label>Book Image</Form.Label>
            <Form.Control
              name="image"
              ref={register}
              type="file"
              onChange={handleImage}
              required
            />
          </Form.Group>
        </Form.Row>
        <button className="btn btn-primary ml-auto" type="submit">
          Save
        </button>
      </Form>
    </Container>
  );
}

export default AddBook;
