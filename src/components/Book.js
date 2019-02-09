import React, { Component } from "react";

import * as BooksAPI from "../BooksAPI";

export default class Book extends Component {
  state = {
    shelf: ""
  };

  componentDidMount() {
    this.setState({ shelf: this.props.book.shelf });
  }

  renderAuthors = book => {
    if (book.authors && book.authors.length > 0) {
      return (
        <div className="book-authors">
          {book.authors.map((author, index) => (
            <div key={index}>{author}</div>
          ))}
        </div>
      );
    }
  };

  updateBookShelf = (book, shelf) => {
    const { onBookUpdate } = this.props;
    BooksAPI.update(book, shelf).then(res => {
      if (onBookUpdate) onBookUpdate();
    });
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.state.shelf}
              onChange={e => this.updateBookShelf(book, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {this.renderAuthors(book)}
      </div>
    );
  }
}
