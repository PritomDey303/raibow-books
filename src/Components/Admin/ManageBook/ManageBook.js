import React, { useContext, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { BookContext } from "../../../App";
import ManageSingleBook from "./ManageSingleBook/ManageSingleBook";

function ManageBook() {
  const [bookInfo, setBookInfo, ,] = useContext(BookContext);
  useEffect(() => {
    fetch("https://rainbow-books303.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => {
        setBookInfo(data);
      });
  }, [setBookInfo]);
  const handleDelete = (id, event) => {
    console.log(id);
    const newArr = bookInfo.filter((book) => book._id !== id);
    fetch(`https://rainbow-books303.herokuapp.com/delete/${id}`, {
      method: "Delete",
    }).then((res) => {
      if (res.ok) {
        alert("Book successfully deleted.");

        setBookInfo(newArr);
      } else {
        alert("Something is wrong.Try again.");
      }
    });
  };
  return (
    <Container>
      <Table striped hover className="mt-4">
        <thead className="bg-primary text-light">
          <tr>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookInfo.length === 0 ? (
            <div className="w-25 mx-auto mt-5">
              <div
                className="spinner-border text-primary ml-5 spinner"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            bookInfo.map((book) => (
              <ManageSingleBook
                handleDelete={handleDelete}
                key={book._id}
                book={book}
              ></ManageSingleBook>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageBook;
