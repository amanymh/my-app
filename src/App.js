import React, { Component } from "react";

import "./App.css";
import Header from "./components/header";
import Todos from "./components/todos";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      works: JSON.parse(localStorage.getItem("works")),
      view: "todos",
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
      <div>
        <button type="button" onClick={() => this.toggle("signin")}>
          toggle
        </button>
        <input
          onChange={this.updateSearch}
          placeholder="search ..."
          value={this.state.search}
        />
        {view == "todos" && <Todos search={this.state.search} />}
        {view == "signin" && <SignIn toggle={this.toggle} />}
        {view == "signup" && <SignUp toggle={this.toggle} />}
      </div>
    );
  }
}

export default App;
