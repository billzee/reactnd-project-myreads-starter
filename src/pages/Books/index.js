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

  render() {
    const { userBooks } = this.state;
    return (
      <div className="list-books">
        <PageTitle value="MyReads" />
        <div className="list-books-content">
          {bookshelves.map(bookshelf => {
            return (
              <Bookshelf key={bookshelf.id} title={bookshelf.title}>
                {userBooks
                  .filter(userBook => userBook.shelf === bookshelf.id)
                  .map(userBook => {
                    return (
                      <Book
                        onBookUpdate={this.getUserBooks}
                        key={userBook.id}
                        book={userBook}
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
