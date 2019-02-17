import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../../components/Book";

import { withRouter } from "react-router";

class SearchBooksPage extends Component {
  state = {
    books: [],
    query: "",
    loading: false,
    userBooks: []
  };

  componentDidMount() {
    this.getUserBooks();
  }

  getUserBooks = () => {
    BooksAPI.getAll().then(userBooks => {
      this.setState({ userBooks });
    });
  };

  handleChange = query => {
    const { loading } = this.state;

    this.setState({ query }, () => {
      if (!loading) {
        this.searchBooks(this.state.query);
      } else {
        setTimeout(() => {
          this.searchBooks(this.state.query);
        }, 1000);
      }
    });
  };

  sortBooks = books => {
    const { userBooks } = this.state;
    const sortedBooks = books.map(book => {
      const bookInShelf = userBooks.find(
        bookInShelf => bookInShelf.id === book.id
      );

      return bookInShelf || book;
    });

    return sortedBooks;
  };

  searchBooks = query => {
    if (query && query.length > 0) {
      query = query.trim();

      this.setState({ loading: true }, () => {
        BooksAPI.search(query).then(books => {
          if (books && books.length > 0) books = this.sortBooks(books);
          this.setState({ books }, () => this.setState({ loading: false }));
        });
      });
    } else {
      this.setState({ books: [] });
    }
  };

  renderBooks = () => {
    const { books, query, loading } = this.state;

    if (loading) {
      return `Searching "${query}" ...`;
    } else if (query.length === 0) {
      return "Please, enter a search term.";
    } else if (books && books.length > 0) {
      return books.map(book => (
        <Book key={book.id} book={book} onBookUpdate={this.getUserBooks} />
      ));
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
