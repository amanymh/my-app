import React, { Component } from "react";

import TodoItem from "./todo";
class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      works: localStorage.getItem("works")
        ? JSON.parse(localStorage.getItem("works"))
        : [],
      todoBeforeUpdate: "",
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
  todoCounter = 0;
  add = () => {
    let { inputValue, works, selectedOption } = this.state;

    if (!inputValue) {
      return;
    }
    if (localStorage.getItem("works") == null) {
      works.push({
        id: this.todoCounter++,
        value: inputValue,
        done: false,
        category: selectedOption
      });
      console.log(works);
      localStorage.setItem("works", JSON.stringify(works));
    } else {
      works = JSON.parse(localStorage.getItem("works"));
      works.push({
        id: this.todoCounter++,
        value: inputValue,
        done: false,
        category: selectedOption
      });
      localStorage.setItem("works", JSON.stringify(works));
    }

    this.setState({
      works: JSON.parse(localStorage.getItem("works"))
    });

    this.setState({ inputValue: "" });
  };

  edit = work => {
    // this.setState({ inputValue: work.value });

    // var index = e.target.getAttribute("data-key");
    // let { works, inputValue, selectedOption } = this.state;

    // inputValue = works[index].value;
    // selectedOption = works[index].category;

    this.setState({
      todoBeforeUpdate: work,
      inputValue: work.value,
      // updatedIndex: index,
      // selectedOption: selectedOption,
      // works: a,
      switch: false
    });
  };

  update = () => {
    // console.log(work);
    const todos = [...this.state.works];
    const oldTodoValue = Object.assign({}, this.state.todoBeforeUpdate);
    const todofilteredIndex = todos.findIndex(x => {
      return x.id === oldTodoValue.id;
    });
    todos[todofilteredIndex].value = this.state.inputValue;

    this.setState({
      works: todos,
      switch: true,
      inputValue: "",
      todoBeforeUpdate: ""
    });

    localStorage.setItem("works", JSON.stringify(this.state.works));
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
    let filterTodoes = this.state.works.filter(x => {
      return x.category.indexOf(this.state.search) !== -1;
    });
    let optionsvalue = this.state.options.map(x => {
      return <option key={x.value}>{x}</option>;
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
          <h4 className="txt-left">To Do</h4>
          <ul>
            {filterTodoes.filter(t => t.done === false).map((work, index) => {
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
          <h4 className="txt-left"> Done</h4>
          <ul>
            {filterTodoes.filter(x => x.done === true).map((work, index) => {
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
