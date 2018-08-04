import React, { Component } from 'react';
import * as type from 'yup';
import { checkValidation, runValidation } from './utils';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: {
        email: '',
        password: ''
      },
      error: {},
      touched: {},
      isValid: false
    };

    this.schema = type.object().shape({
      email: type.string()
        .email('not email bro!')
        .required('email required bro!'),
      password: type.string()
        .required('password required bro!')
        .min(6, '6 bro!')
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState(prevState => ({
      field: { ...prevState.field, [name]: value }
    }), () =>
      runValidation(this.schema, { ...this.state.field, [name]: value })
      .then(schemaErrors => {
        this.setState(prevState => ({
          error: schemaErrors,
          touched: { ...prevState.touched, [name]: true },
          isValid: checkValidation(schemaErrors)
        }));
      }));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.field);
  }

  render() {
    const { field, touched, error, isValid } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            value={field.email}
            onChange={this.handleChange}
          />
          { (touched && touched.email) && (error && error.email) && (
            <i>
              {error.email}
            </i>
          )}
          <br />
          <input
            type="password"
            name="password"
            value={field.password}
            onChange={this.handleChange}
          />
          { (touched && touched.password) && (error && error.password) && (
            <i>
              {error.password}
            </i>
          )}
          <br />
          <button type="submit" disabled={!isValid}>Login</button>
        </form>
      </div>
    );
  }
}

export default App;
