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
      view: "todos"
    };
  }
  toggle = view => {
    this.setState({ view });
  };

  render() {
    const { view } = this.state;

    return (
      <div className="search-wrapper">
        <div className="header">
          <span>React Todoes</span>
        </div>

        {view === "todos" && <Todos />}
        {view === "signin" && <SignIn toggle={this.toggle} />}
        {view === "signup" && <SignUp toggle={this.toggle} />}
      </div>
    );
  }
}

export default App;
