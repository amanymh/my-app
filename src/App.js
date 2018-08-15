import React, { Component } from "react";

import "./App.css";

import Todos from "./components/todos";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      works: JSON.parse(localStorage.getItem("works")),
      view: "signin",
      search: ""
    };
  }
  toggle = view => {
    this.setState({ view });
  };

  updateSearch = e => {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  };

  render() {
    const { view } = this.state;

    return (
      <div className="search-wrapper">
        <input
          className="searchInpt"
          onChange={this.updateSearch}
          placeholder="search ..."
          value={this.state.search}
        />
        <span className="header">React Todoes</span>

        {view == "todos" && <Todos search={this.state.search} />}
        {view == "signin" && <SignIn toggle={this.toggle} />}
        {view == "signup" && <SignUp toggle={this.toggle} />}
      </div>
    );
  }
}

export default App;
