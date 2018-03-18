import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css'
import AuthAdapter from './adapters/AuthAdapter'
import NavBarContainer from './containers/NavBarContainer'
import HomeContainer from './containers/HomeContainer'
import LogInForm from './components/LogInForm'


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
    console.log('logging on', loginParams)
    AuthAdapter.login(loginParams)
      .then(user => {
        if (!user.error) {
          localStorage.setItem('jwt', user.jwt)
          this.setUser(user)
        }
      })
  }

  logOut = () => {
    localStorage.removeItem('jwt')
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    })
  }

  setUser = (user) => {
    this.setState({
      auth: {
        isLoggedIn: true,
        user: user
      }
    })
  }

  render() {
    return (
      <Router>
        <div>
          <div style={{'padding-bottom': 75}}>
            <Route path='/' render={() => <NavBarContainer {...this.state} logOut={this.logOut} /> } />
            <Route path='/home' render={() => {
              return this.state.auth.isLoggedIn ? <HomeContainer {...this.state} /> : <Redirect to='/login'
            />} } />
            <Route path='/login' render={() => {
              return !this.state.auth.isLoggedIn ? <LogInForm {...this.state} onSubmit={this.logIn.bind()} /> : <Redirect to='/home'
            />} } />
           </div>
        </div>
      </Router>
    );
  }
}

export default App;
