import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../../components/Book";

import { withRouter } from "react-router";

class SearchBooksPage extends Component {
  state = {
    books: [],
    query: ""
  };

  handleChange = query => {
    this.setState({ query }, () => {
      if (query.length > 0) {
        query = query.trim();

        BooksAPI.search(query).then(res => {
          if (res && res.length > 0) {
            this.setState({ books: res });
          }
        });
      } else {
        this.setState({ books: [] });
      }
    });
  };

  renderBooks = () => {
    const { books, query } = this.state;

    if (books && books.length > 0) {
      return books.map(book => <Book key={book.id} book={book} />);
    } else if (query.length === 0) {
      return "Please, enter a search term";
    } else {
      return "No books available for display";
    }
  };

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.history.push("/")}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              value={query}
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBooksPage);
