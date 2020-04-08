import React, { Component } from 'react'
import LoginForm from '../Components/LoginForm'
import { connect } from 'react-redux'
import UserRedux from '../Redux/UserRedux'
import Nav from '../Components/Navbar'
import {isNil, prop} from 'ramda'
import {validateEmail,requiredLength,Validationfunc} from '../Validation'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: '',
      password: '',
      emailValidation: { error: false, helpText: ''},
      emailDoesntExist: { error: true, helpText: 'Email Doesn\'t Exist'},
      PasswordValidation: { error: false, helpText: ''}
    };
  }

  onhandleSubmit (item) {

    const email = this.state.email
    const password = this.state.password

    const emailResult = validateEmail(email)
    const userErrorStatus = Validationfunc(emailResult,'Invalid email')
    if(userErrorStatus){
      this.setState({
        emailValidation: userErrorStatus
      })
    }
    
    const pwResult = requiredLength(password)
    const pwErrorStatus = Validationfunc(pwResult,'Invalid password')
    if(pwErrorStatus){
      this.setState({
      PasswordValidation: pwErrorStatus
      })
    }
  
    if(!pwResult.error && !emailResult.error){
        console.log('i was login')
        this.props.loginUser({email,password})
    }
    event.preventDefault();
  }

  handleChange = input => e =>{  
    this.setState({ [input]: e.target.value})
  }

  render () {
    return (
      <div>
        <Nav restrict ={true}/>
        <LoginForm handleSubmit={this.onhandleSubmit} 
        emailValidation = {isNil(this.props.serverLoginError) ? this.state.emailValidation :this.state.emailDoesntExist } 
        passwordValidation ={this.state.PasswordValidation} 
        handleChange ={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  serverLoginError: state.user.errors.authenticationError.login
})

const mapDispatchToProps = dispatch => ({
  loginUser: item => dispatch(UserRedux.loginUser(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)