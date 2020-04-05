import React, { Component } from 'react'
import LoginScreen from './LoginScreen'
import NavBar from '../Components/Navbar'
import ForgotPwScreen from '../Containers/ForgotPwScreen'
import Home from '../Containers/HomeScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import SignupScreen from './SignupScreen'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route path='/forgot'>
          <SignupScreen />
        </Route>
        <Route path='/signUp'>
          <SignupScreen />
        </Route>
        <Route path='/forgotPw'>
          <ForgotPwScreen />
        </Route>
        <Route path='/login'>
          <LoginScreen />
        </Route> 
        <Route path='/home'>
          <Home  />
        </Route>
        <Route path='/'>
          <NavBar />
        </Route>
       
      </Switch>
    </Router>
  )
}
