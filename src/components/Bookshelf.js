import React from "react";

export default function Bookshelf(props) {
  const { children, title } = props;

  const renderChildren = () => {
    if (children && children.length > 0) {
      return children.map((item, index) => {
        return <li key={index}>{item}</li>;
      });
    } else {
      return "No books available for display on this bookshelf";
    }
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{renderChildren()}</ol>
      </div>
    </div>
  );
}
