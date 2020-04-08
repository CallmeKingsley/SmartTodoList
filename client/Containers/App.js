import React from 'react'
import LoginScreen from './LoginScreen'
import NavBar from '../Components/Navbar'
import ForgotPwScreen from '../Containers/ForgotPwScreen'
import Home from '../Containers/HomeScreen'
import { ProtectedRoute } from './ProtectedRoute'
import Marketing from '../Containers/MarketingScreen'
import History from '../History'
import {
  Router,
  Switch,
  Route
} from 'react-router-dom'
import SignupScreen from './SignupScreen'

export default function App () {
  return (
    <Router history={History}>
      <Switch>
        <Route path='/signUp' component={SignupScreen} />
        <Route path='/forgotPw' component={ForgotPwScreen} />
        <Route path='/login' component={LoginScreen} />
        <ProtectedRoute path='/marketing' component={Marketing} />
        <ProtectedRoute exact path='/' component={Home} />

      </Switch>
    </Router>
  )
}
