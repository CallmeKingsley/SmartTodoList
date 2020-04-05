import React, { Component } from 'react'
import {validateEmail,Validationfunc} from '../Validation'
import ForgotPassword from '../Components/ForgotPwForm'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import NavBar from '../Components/Navbar'
import Footer from '../Components/Footer'
import App from './App'

class ForgotPwScreen extends Component {

  constructor (props) {
    super(props)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: '',
      error: false, 
      helpText:'',
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
    event.preventDefault();
  }

  handleChange = input => e =>{  
    this.setState({ [input]: e.target.value})
  }
  render () {
    return (
      <div>
        <NavBar />
        <ForgotPassword handleSubmit={this.onhandleSubmit}  handleChange ={this.handleChange} error ={this.state.emailErrorMg.error} helpText = {this.state.emailErrorMg.helpText}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.User.firstName
})
const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(TodoRedux.addTodo(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwScreen)
