import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";

import Book from "../../components/Book";
import Bookshelf from "../../components/Bookshelf";
import PageTitle from "../../components/PageTitle";

import { withRouter } from "react-router";

const bookshelves = [
  { id: "currentlyReading", title: "Currently Reading" },
  { id: "wantToRead", title: "Want to Read" },
  { id: "read", title: "Read" }
];

class BooksPage extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(data => {
      this.setState({ books: data });
    });
  };

  render() {
    return (
      <div className="list-books">
        <PageTitle value="MyReads" />
        <div className="list-books-content">
          {bookshelves.map(bookshelf => {
            return (
              <Bookshelf key={bookshelf.id} title={bookshelf.title}>
                {this.state.books
                  .filter(book => book.shelf === bookshelf.id)
                  .map(book => {
                    return (
                      <Book
                        onBookUpdate={this.getAllBooks}
                        key={book.id}
                        book={book}
                      />
                    );
                  })}
              </Bookshelf>
            );
          })}
        </div>
        <div className="open-search">
          <button onClick={() => this.props.history.push("/search")}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(BooksPage);
