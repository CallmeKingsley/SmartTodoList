import React, { Component } from 'react'
import {validateEmail,Validationfunc} from '../Validation'
import ForgotPassword from '../Components/ForgotPwForm'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import NavBar from '../Components/Navbar'
import UserRedux from '../Redux/UserRedux'
import Footer from '../Components/Footer'
import App from './App'
import {isNil} from 'ramda'
class ForgotPwScreen extends Component {

  constructor (props) {
    super(props)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: '',
      emailErrorMg :{ error: false, helpText: ''},
    };
  }

  onhandleSubmit () {
    const email = this.state.email
    
    const isValidEmail = validateEmail(email)
    const emailErrorMg = Validationfunc(isValidEmail, 'Invalid email')
    if(emailErrorMg){
      this.setState({
          emailErrorMg
      })
    }

    if(!emailErrorMg.error){
      console.log('ready forgot password')
      this.props.forgotPasswordFunc({email})
    }
    event.preventDefault();
  }

  handleChange = input => e =>{  
    this.setState({ [input]: e.target.value})
  }
  render () {
    return (
      <div>
        <NavBar />
        <ForgotPassword handleSubmit={this.onhandleSubmit} showSuccessText = {!isNil(this.props.successfullySendEmail)} handleChange ={this.handleChange} error ={this.state.emailErrorMg.error} helpText = {this.state.emailErrorMg.helpText}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  successfullySendEmail: state.user.loading.forgetPasswordEmail
})
const mapDispatchToProps = dispatch => ({
  forgotPasswordFunc: email => dispatch(UserRedux.passwordChangeRequest(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwScreen)
