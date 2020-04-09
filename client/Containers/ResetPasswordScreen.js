import React, { Component } from 'react'
import {requiredLength,mataching,Validationfunc} from '../Validation'
import ResetPasswordForm from '../Components/ResetPasswordForm'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import NavBar from '../Components/Navbar'
// import { useParams } from 'react-router-dom';
import UserRedux from '../Redux/UserRedux'
import Footer from '../Components/Footer'
import App from './App'

class ResetPasswordScreem extends Component {

  constructor (props) {
    super(props)
    this.onhandleSubmit = this.onhandleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      password: '',
      confrimPassword: '', 
      helpText:'',
      passwordErrorMg :{ error: false, helpText: ''},
      passwordErrorMg2 :{ error: false, helpText: ''},
    };
  }

  onhandleSubmit () {
    const password = this.state.password
    const confrimPassword = this.state.confrimPassword
   // let { id } = useParams();
    const isValidPassword = requiredLength(password)
    const isValidPassword2  = requiredLength(confrimPassword)
    
    
    const passwordErrorMg = Validationfunc(isValidPassword, 'Password must be atlease 8 characters')
    if(passwordErrorMg){
    this.setState({
      passwordErrorMg
    })}

    const matchedPassword = mataching(isValidPassword,isValidPassword2)
    const passwordErrorMg2 = Validationfunc(matchedPassword, 'Password doesn\'t match')
 
    if(passwordErrorMg2){
    this.setState({
      passwordErrorMg2
    })}
   
    console.log(matchedPassword)
    console.log(isValidPassword)
    console.log(this.props.match.params.id)

    if(matchedPassword && isValidPassword){


    }
   
    event.preventDefault();
  }

  handleChange = input => e =>{  
    this.setState({ [input]: e.target.value})
  }
  render () {
    return (
      <div>
        <NavBar hideAll ={true}/>
        <ResetPasswordForm handleSubmit={this.onhandleSubmit}  handleChange ={this.handleChange} passwordError ={this.state.passwordErrorMg} passwordError2 ={this.state.passwordErrorMg2}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.todo.firstName
})
const mapDispatchToProps = dispatch => ({
  addTodo: item => dispatch(TodoRedux.addTodo(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreem)
