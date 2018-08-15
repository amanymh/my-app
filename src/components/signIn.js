import React from "react";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
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
    var list = JSON.parse(localStorage.getItem("signUp"));
    const loggedIn = list.filter(
      x => x.email === email && x.password === password
    );
    console.log(loggedIn);
    if (loggedIn.length > 0) {
      this.props.toggle("todos");
    }
  };
  render() {
    return (
      <form className="signIn-wrapper">
        <h2 className="signIn-h2">Sign In</h2>
        <input
          className="inpt ml"
          type="text"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />
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
              Create a New Account ..
            </span>
          </div>
        </div>
      </form>
    );
  }
}
