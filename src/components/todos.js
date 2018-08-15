import React, { Component } from "react";
import Header from "./header";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      works: localStorage.getItem("works")
        ? JSON.parse(localStorage.getItem("works"))
        : [],

      inputValue: "",
      switch: true,
      updatedIndex: 0,
      search: "",
      options: ["work", "sport", "fun"],
      selectedOption: "work"
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
    let { inputValue, works, selectedOption } = this.state;

    if (!inputValue) {
      return;
    }
    if (localStorage.getItem("works") == null) {
      works.push({ value: inputValue, done: false, category: selectedOption });
      localStorage.setItem("works", JSON.stringify(works));
    } else {
      works = JSON.parse(localStorage.getItem("works"));
      works.push({ value: inputValue, done: false, category: selectedOption });
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
    let { works, inputValue, updatedIndex, selectedOption } = this.state;
    let done = this.state.works[index].done;
    inputValue = works[index].value;
    selectedOption = works[index].category;

    this.setState({
      inputValue: inputValue,
      updatedIndex: index,
      selectedOption: selectedOption
    });

    console.log("edit value", inputValue);
    this.state.switch = false;
  };

  update = () => {
    let { works, inputValue, updatedIndex, selectedOption } = this.state;
    let done = this.state.works[updatedIndex].done;
    let editValue = { value: inputValue, done: done, category: selectedOption };
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

  handelOptions = e => {
    let s = e.target.value;
    this.setState({
      selectedOption: e.target.value
    });
    console.log("selectedOption", this.state.selectedOption);
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
      return x.category.indexOf(this.props.search) !== -1;
    });
    let optionsvalue = this.state.options.map(x => {
      return <option>{x}</option>;
    });
    return (
      <div className="App">
        <div className="todo-wrapper">
          <form className="  form-class">
            <input
              className="inpt margin-20"
              type="text"
              placeholder="Title"
              value={this.state.inputValue}
              onChange={this.handleChangeIput}
            />
            <select
              className="selestInput"
              value={this.state.selectedOption}
              onChange={e => {
                this.handelOptions(e);
              }}
            >
              {optionsvalue}
            </select>
            {this.state.switch && (
              <button type="button" className="addinp   mr" onClick={this.add}>
                Add
              </button>
            )}
            {!this.state.switch && (
              <button
                type="button"
                className=" addinp mr"
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
                  <li id="inputli" key="index">
                    <span>
                      <input
                        type="checkbox"
                        checked={work.done}
                        onClick={() => this.doneToggle(work)}
                        style={{ fontSize: "x-large" }}
                      />
                      <span
                        onClick={() => this.doneToggle(work)}
                        className={work.done ? "done" : ""}
                        id="todoText"
                      >
                        {work.value}
                        <span
                          className={
                            work.category == "work"
                              ? "blueTag"
                              : work.category == "sport"
                                ? "yellowTag"
                                : "greenTag"
                          }
                        >
                          {work.category}
                        </span>
                      </span>
                    </span>
                    <span>
                      <input
                        className="removeTodo"
                        type="button"
                        value="Edit"
                        onClick={this.edit}
                        data-key={index}
                      />
                      {work.done && (
                        <input
                          className="removeTodo"
                          type="button"
                          value="x"
                          onClick={this.delete}
                          data-key={index}
                        />
                      )}
                    </span>
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
