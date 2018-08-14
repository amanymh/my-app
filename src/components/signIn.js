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
    // if (email === list[0].email && password === list[0].password) {
    //   console.log(list[0].password, "list", password, email);
    //   this.props.toggle();
    // } else {
    //   alert("You Need TO SignUp First ...");
    // }
  };
  render() {
    return (
      <form className="signIn-wrapper">
        <h2>signin</h2>
        <input
          className="form-control"
          type="text"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />
        <input
          className="form-control"
          type="password"
          value={this.state.value}
          onChange={this.handleChangePassword}
        />
        <div>
          <button
            className="btn btn-primary"
            id="signIn-btn"
            type="button"
            onClick={this.signIn}
          >
            {" "}
            sign in
          </button>
          <button
            className="btn btn-primary"
            id="signUp-btn"
            type="button"
            onClick={() => this.props.toggle("signup")}
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}