import React from "react";

export default function PageTitle(props) {
  const { value } = props;
  return (
    <div className="list-books-title">
      <h1>{value}</h1>
    </div>
  );
}
