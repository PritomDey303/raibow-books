import React from "react";

function ManageSingleBook(props) {
  const { _id, name, price, author } = props.book;
  return (
    <tr>
      <td>{name}</td>
      <td>{author}</td>
      <td>{price}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={(event) => props.handleDelete(_id, event)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ManageSingleBook;
