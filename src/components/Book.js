import React, { Component } from "react";

import * as BooksAPI from "../BooksAPI";
import * as BooksHelper from "../BooksHelper";

export default class Book extends Component {
  state = {
    shelf: "",
    moved: false
  };

  componentDidMount() {
    let { book } = this.props;

    if (!book.shelf) {
      BooksAPI.get(book.id).then(userBook => {
        this.setState({ shelf: userBook.shelf });
      });
    } else {
      this.setState({ shelf: book.shelf });
    }
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

    this.setState({ shelf }, () => {
      BooksAPI.update(book, shelf).then(res => {
        if (onBookUpdate) {
          onBookUpdate();
        } else {
          this.setState({ moved: true }, () => {
            setTimeout(() => {
              this.setState({ moved: false });
            }, 5000);
          });
        }
      });
    });
  };

  renderBookMoved = () => {
    const { moved, shelf } = this.state;

    if (moved) {
      return (
        <div
          style={{
            backgroundColor: "#4d2600",
            color: "#fff",
            padding: "2px",
            textAlign: "center",
            borderRadius: "3px"
          }}
        >
          {shelf !== "none" && (
            <small>
              This book has been moved to{" "}
              <strong>{BooksHelper.translateShelf[shelf]}</strong>
            </small>
          )}
          {shelf === "none" && (
            <small>
              This book has been <strong>removed</strong> from your bookshelves
            </small>
          )}
        </div>
      );
    }
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && book.imageLinks.thumbnail && (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
          )}
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
        {this.renderBookMoved()}
      </div>
    );
  }
}
