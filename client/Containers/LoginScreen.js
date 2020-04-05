import React, { Component } from 'react'
import LoginForm from '../Components/LoginForm'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import Nav from '../Components/Navbar'
import {validateEmail,requiredLength,Validationfunc} from '../Validation'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name:'',
      email: '',
      password: '',
      emailValidation: { error: false, helpText: ''},
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
  
    if(pwResult && emailResult){
        //this.props.addTodo({email,password})
        console.log(this.props.userName)
        console.log(item)
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
        emailValidation = {this.state.emailValidation} 
        passwordValidation ={this.state.PasswordValidation} 
        handleChange ={this.handleChange}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)