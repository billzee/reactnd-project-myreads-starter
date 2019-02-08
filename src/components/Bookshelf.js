import React from "react";

export default function Bookshelf(props) {
  const { children, title } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {children.map(item => {
            return <li>{item}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}
