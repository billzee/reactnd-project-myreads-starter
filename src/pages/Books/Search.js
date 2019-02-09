import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../../components/Book";

export default class SearchBooksPage extends Component {
  state = {
    books: []
  };

  handleChange = query => {
    if (query.length > 0) {
      query = query.trim();

      BooksAPI.search(query).then(res => {
        console.log(res);
        this.setState({ books: res });
      });
    } else {
      this.setState({ books: [] });
    }
  };

  render() {
    const { books } = this.state;
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
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              onChange={e => this.handleChange(e.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => {
              return (
                <Book
                  onBookUpdate={this.getAllBooks}
                  key={book.id}
                  book={book}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
