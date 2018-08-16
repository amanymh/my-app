import React from "react";

export default class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    signUp: []
  };

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handleChangePassword = e => {
    if (e.target.value.length > 0) {
      this.setState({
        password: e.target.value
      });
    }
  };
  bar = true;
  signUp = () => {
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
    this.setState({
      email: "",
      password: ""
    });
    // this.state.email = "";
    // this.state.password = "";
    this.props.toggle("signin");
  };
  render() {
    return (
      <form onSubmit={this.signUp} className="signIn-wrapper">
        <h2 className="signIn-h2">Sign up</h2>
        <div className="inputLabel">Email :</div>
        <input
          className="inpt ml mt"
          type="email"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />
        <div className="inputLabel">Password :</div>
        <input
          className="inpt ml mt"
          type="password"
          value={this.state.password}
          onChange={this.handleChangePassword}
        />
        <div>
          <button
            className="addinp"
            id="signIn-btn"
            type="submit"
            onClick={this.signUp}
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}
