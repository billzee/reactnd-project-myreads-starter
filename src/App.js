import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

import BooksPage from "./pages/Books";
import SearchBooksPage from "./pages/Books/Search";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/search" component={SearchBooksPage} />
          <Route exact path="/" component={BooksPage} />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
