import React from 'react';
import ReactDOM from 'react-dom';
import $$ from 'jquery';

var App = React.createClass({
  getInitialState: function () {
    return { username: '', password: '' };
  },

  handleUserChange: function (e) {
    this.setState({ username: e.target.value });
  },

  handlePassChange: function (e) {
    this.setState({ password: e.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    if (!username || !password) {
      return;
    }

    const newData = { username: username, password: password };
    $$.ajax({
      url: '/logindata',
      dataType: 'json',
      type: 'POST',
      data: newData,
      success: function (data) {
        this.setState({ username: 'success' });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('/logindata', status, err.toString());
      }.bind(this),
    });
    console.log('username', username);
    console.log('password', password);
    this.setState({ username: '', password: '' });
  },

  render: function () {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleUserChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePassChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
