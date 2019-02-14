import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../../components/Book";

import { withRouter } from "react-router";

class SearchBooksPage extends Component {
  state = {
    books: [],
    query: "",
    loading: false
  };

  searchBooks = async query => {
    if (query.length > 0) {
      query = query.trim();

      this.setState({ loading: true }, async () => {
        await BooksAPI.search(query).then(async books => {
          this.setState({ books, loading: false });
        });
      });
    } else {
      this.setState({ books: [] });
    }
  };

  handleChange = query => {
    this.setState({ query }, () => this.searchBooks(this.state.query));
  };

  renderBooks = () => {
    const { books, query, loading } = this.state;

    if (loading) {
      return `Searching "${query}" ...`;
    } else if (books && books.length > 0) {
      return books.map(book => <Book key={book.id} book={book} />);
    } else if (query.length === 0) {
      return "Please, enter a search term.";
    } else {
      return `No results for "${query}". Please try a different term.`;
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
