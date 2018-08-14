import React from "react";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: "",
    signUp: []
  };
  // signedUp = localStorage.getItem("signUp");

  handleChangeEmail = e => {
    console.log(this.state);
    this.setState({
      email: e.target.value
    });
  };
  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  bar = true;
  signUp = () => {
    const signedUp = this.signedUpate;
    let signUpValue = {
      email: this.state.email,
      password: this.state.password
    };
    if (localStorage.getItem("signUp") == null) {
      let list = [];
      list.push(signUpValue);
      localStorage.setItem("signUp", JSON.stringify(list));
    } else {
      let list = JSON.parse(localStorage.getItem("signUp"));
      list.push(signUpValue);
      localStorage.setItem("signUp", JSON.stringify(list));
    }
    this.setState({
      signUp: JSON.parse(localStorage.getItem("signUp"))
    });

    this.state.email = "";
    this.state.password = "";
    this.props.toggle("signin");
  };
  render() {
    return (
      <form className="signIn-wrapper">
        <h2>signup</h2>

        <input
          className="form-control"
          type="text"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />
        <input
          className="form-control"
          type="password"
          value={this.state.password}
          onChange={this.handleChangePassword}
        />
        <div>
          <button
            className="btn btn-primary"
            id="signUp-btn"
            type="button"
            onClick={() => this.props.toggle("signin")}
          >
            sign in
          </button>
          <button
            className="btn btn-primary"
            id="signUp-btn"
            type="button"
            onClick={this.signUp}
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}