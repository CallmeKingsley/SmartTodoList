import React from 'react'
import LoginScreen from './LoginScreen'
import ForgotPwScreen from '../Containers/ForgotPwScreen'
import Home from '../Containers/HomeScreen'
import { ProtectedRoute } from './ProtectedRoute'
import Marketing from '../Containers/MarketingScreen'
import ResetPassword from '../Containers/ResetPasswordScreen'
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
        <Route path='/signUp' exact strict component={SignupScreen} />
        <Route path='/forgotPw' exact strict component={ForgotPwScreen} />
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/forgotPw/:id' component={ResetPassword} />
        <ProtectedRoute path='/marketing' exact component={Marketing} />
        <ProtectedRoute exact path='/' component={Home} />
        <Route path='**' render={() => <div>404</div>} />
      </Switch>
    </Router>
  )
}
