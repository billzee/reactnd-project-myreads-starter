import React from "react";

export default function PageTitle(props) {
  const { title } = props;
  return (
    <div className="list-books-title">
      <h1>{title}</h1>
    </div>
  );
}
