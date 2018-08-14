import React, { Component } from "react";
import Header from "./header";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      works: localStorage.getItem("works")
        ? JSON.parse(localStorage.getItem("works"))
        : [{ value: "study", done: true }],

      inputValue: "",
      switch: true,
      updatedIndex: 0,
      search: ""
    };
  }
  handleChangeIput = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  updateSearch = e => {
    this.setState({
      search: e.target.value.substr(0, 20)
    });
  };

  add = () => {
    // const { inputValue, works } = this.state;
    let inputValue = this.state.inputValue;
    let works = this.state.works;
    if (!inputValue) {
      return;
    }
    if (localStorage.getItem("works") == null) {
      works.push({ value: inputValue, done: false });
      localStorage.setItem("works", JSON.stringify(works));
    } else {
      works = JSON.parse(localStorage.getItem("works"));
      works.push({ value: inputValue, done: false });
      localStorage.setItem("works", JSON.stringify(works));
    }

    this.setState({
      works: JSON.parse(localStorage.getItem("works"))
    });
    console.log(this.state);
    this.setState({ inputValue: "" });
  };

  edit = e => {
    var index = e.target.getAttribute("data-key");
    let { works, inputValue, updatedIndex } = this.state;
    let done = this.state.works[index].done;
    inputValue = works[index].value;

    this.setState({
      inputValue: inputValue,
      updatedIndex: index
    });

    console.log("edit value", inputValue);
    this.state.switch = false;
  };

  update = () => {
    let { works, inputValue, updatedIndex } = this.state;
    let done = this.state.works[updatedIndex].done;
    let editValue = { value: inputValue, done: done };
    works.splice(updatedIndex, 1, editValue);
    localStorage.setItem("works", JSON.stringify(works));
    this.setState({ works });
    this.state.switch = true;
    this.setState({ inputValue: "" });
    console.log("update", works[inputValue]);
  };

  delete = e => {
    var index = e.target.getAttribute("data-key");
    let works = this.state.works;
    var list = JSON.parse(localStorage.getItem("works"));
    list.splice(index, 1);
    this.setState({
      works: list
    });
    localStorage.setItem("works", JSON.stringify(list));
  };
  doneToggle = work => {
    console.log(work);
    const a = this.state.works.map(x => {
      if (x.value == work.value) {
        x.done = !work.done;
      }
      return x;
    });
    console.log(a);
    this.setState({
      works: a
    });
  };
  render() {
    let filterTodoes = this.state.works.filter(x => {
      return x.value.indexOf(this.props.search) !== -1;
    });
    return (
      <div className="App">
        <div className="todo-wrapper">
          <Header />
          <form className=" disply">
            <input
              className=" margin-20"
              type="text"
              placeholder="Title"
              value={this.state.inputValue}
              onChange={this.handleChangeIput}
            />
            {this.state.switch && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.add}
              >
                Add
              </button>
            )}
            {!this.state.switch && (
              <button
                type="button"
                className="btn btn-success"
                onClick={this.update}
              >
                Edit
              </button>
            )}
          </form>
          <br />
          <br />

          <ul>
            {filterTodoes.map(function(work, index) {
              console.log(work);
              return (
                <div>
                  <li id="inptli" key="index">
                    <input
                      type="checkbox"
                      checked={work.done}
                      style={{ fontSize: "x-large" }}
                    />
                    <span
                      onClick={() => this.doneToggle(work)}
                      className={work.done ? "done" : ""}
                    >
                      {work.value}
                    </span>

                    <input
                      className="removeTodo"
                      type="button"
                      value="x"
                      onClick={this.delete}
                      data-key={index}
                    />

                    <input
                      className="removeTodo"
                      type="button"
                      value="Edit"
                      onClick={this.edit}
                      data-key={index}
                    />
                  </li>
                </div>
              );
            }, this)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
