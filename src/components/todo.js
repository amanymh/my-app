import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    done: true
  };

  doneToggle = () => {
    this.setState({
      done: !this.state.done
    });
  };
  render() {
    return (
      <span className={this.state.done ? "done" : ""} onClick={this.doneToggle}>
        {this.props.work}
      </span>
    );
  }
}
