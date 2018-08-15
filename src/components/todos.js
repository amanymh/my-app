import React, { Component } from "react";

import TodoItem from "./todo";
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
      selectedOption: "work",
      doneList: []
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
    let { works, inputValue, selectedOption } = this.state;

    inputValue = works[index].value;
    selectedOption = works[index].category;

    this.setState({
      inputValue: inputValue,
      updatedIndex: index,
      selectedOption: selectedOption
    });

    console.log("edit value", inputValue);
    this.setState({
      switch: false
    });
  };

  update = () => {
    let { works, inputValue, updatedIndex, selectedOption } = this.state;
    let done = this.state.works[updatedIndex].done;
    let editValue = { value: inputValue, done: done, category: selectedOption };
    works.splice(updatedIndex, 1, editValue);
    localStorage.setItem("works", JSON.stringify(works));
    this.setState({ works });
    this.setState({
      switch: true
    });
    this.setState({ inputValue: "" });
    console.log("update", works[inputValue]);
  };

  delete = e => {
    var index = e.target.getAttribute("data-key");

    var list = JSON.parse(localStorage.getItem("works"));
    list.splice(index, 1);
    this.setState({
      works: list
    });
    localStorage.setItem("works", JSON.stringify(list));
  };

  handelOptions = e => {
    this.setState({
      selectedOption: e.target.value
    });
    console.log("selectedOption", this.state.selectedOption);
  };
  doneToggle = work => {
    const a = this.state.works.map(x => {
      if (x.value === work.value) {
        x.done = !work.done;
      }
      return x;
    });

    this.setState({
      works: a
    });
  };
  render() {
    console.log(this.state.works);
    let filterTodoes = this.state.works.filter(x => {
      return x.category.indexOf(this.state.search) !== -1;
    });
    let optionsvalue = this.state.options.map(x => {
      return <option>{x}</option>;
    });
    return (
      <div className="App">
        <div className="searchContainer">
          <input
            className="searchInpt"
            onChange={this.updateSearch}
            placeholder="search ..."
            value={this.state.search}
          />
        </div>
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

            <button
              type="button"
              className="addinp   mr"
              onClick={this.state.switch ? this.add : this.update}
            >
              {this.state.switch ? "Add" : "Edit"}
            </button>
          </form>
          <br />
          <br />

          <ul>
            {filterTodoes.filter(t => t.done === false).map((work, index) => {
              console.log(work);
              return (
                <TodoItem
                  work={work}
                  doneToggle={this.doneToggle}
                  edit={this.edit}
                  index={index}
                  deleteTodo={this.delete}
                />
              );
            }, this)}
          </ul>
          <hr />
          <ul>
            {filterTodoes.filter(x => x.done === true).map((work, index) => {
              // console.log(x);
              return (
                <TodoItem
                  work={work}
                  doneToggle={this.doneToggle}
                  edit={this.edit}
                  index={index}
                  deleteTodo={this.delete}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
