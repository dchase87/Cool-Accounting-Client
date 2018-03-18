import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import AuthAdapter from './adapters/AuthAdapter'

class App extends Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: {}
    }
  }

  componentWillMount = () => {
    this.checkAuth()
  }

  checkAuth = () => {
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
        .then(user => !user.error ? this.setUser(user) : this.logOut())
    } else {
      this.logOut()
    }
  }

  logIn = (loginParams) => {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
