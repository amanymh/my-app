import React from "react";

export default class SignIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  signIn = () => {
    var { email, password } = this.state;

    var list = JSON.parse(localStorage.getItem("signUp")) || [];
    console.log(list);
    const loggedIn = list.filter(
      x => x.email === email && x.password === password
    );
    console.log(loggedIn);
    if (loggedIn.length > 0) {
      console.log(loggedIn);
      this.props.toggle("todos");
    }

    this.setState({
      email: "",
      password: ""
    });
  };
  render() {
    return (
      <form className="signIn-wrapper">
        <h2 className="signIn-h2">Sign In</h2>
        <div className="inputLabel">Email :</div>
        <input
          className="inpt ml mt"
          type="text"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />
        <div className="inputLabel">Password :</div>
        <input
          className="inpt ml mt"
          type="password"
          value={this.state.value}
          onChange={this.handleChangePassword}
        />
        <div>
          <button
            className="addinp"
            id="signIn-btn"
            type="button"
            onClick={this.signIn}
          >
            sign in
          </button>
          <div className="text">
            <span onClick={() => this.props.toggle("signup")}>
              Don't Have an account ?
            </span>
          </div>
        </div>
      </form>
    );
  }
}
