import React, { Component } from "react";
import * as BooksAPI from "../../BooksAPI";

import Book from "../../components/Book";
import Bookshelf from "../../components/Bookshelf";
import PageTitle from "../../components/PageTitle";

const bookshelves = [
  { id: "currentlyReading", title: "Currently Reading" },
  { id: "wantToRead", title: "Want to Read" },
  { id: "read", title: "Read" }
];

export default class BooksPage extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      console.log(res);
      this.setState({ books: res });
    });
  }

  render() {
    return (
      <div className="list-books">
        <PageTitle value="MyReads" />
        <div className="list-books-content">
          {bookshelves.map(bookshelf => {
            return (
              <Bookshelf key={bookshelf.id} title={bookshelf.title}>
                {this.state.books &&
                  this.state.books
                    .filter(book => book.shelf === bookshelf.id)
                    .map(book => {
                      return <Book book={book} />;
                    })}
              </Bookshelf>
            );
          })}
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}
