import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

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
          <Switch>
            <Route exact path="/" component={BooksPage} />
            <Route exact path="/search" component={SearchBooksPage} />
            <Route
              render={() => (
                <div style={{ textAlign: "center" }}>
                  <h1>404</h1> <p>The requested page was not found.</p>
                </div>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
