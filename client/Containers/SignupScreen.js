import React, { Component } from 'react'
import SignupForm from '../Components/SignupForm'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import Nav from '../Components/Navbar'
import {validateEmail,requiredLength,Validationfunc,emptyString, mataching} from '../Validation'
class SignupScreen extends Component {

    constructor (props) {
        super(props)
        this.onhandleSubmit = this.onhandleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            username:'',
            name:'',
            email: '',
            password: '',
            confirmPassword: '',
            usernameErrorMg :{ error: false, helpText: ''},
            emailErrorMg :{ error: false, helpText: ''},
            passwordErrorMg :{ error: false, helpText: ''},
            confirmPwErrorMg :{ error: false, helpText: ''},
        };
    }
    
    onhandleSubmit () {
        const username = this.state.username
        const email = this.state.email
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword

        const isEmpty = emptyString(username)
        const usernameErrorMg = Validationfunc(isEmpty, 'Username can\'t be empty');
        if(usernameErrorMg){
            this.setState({
                usernameErrorMg
            })
        }

        const isValidEmail = validateEmail(email)
        const emailErrorMg = Validationfunc(isValidEmail, 'Invalid email')
        if(emailErrorMg){
            this.setState({
                emailErrorMg
            })
        }

        const isPwResult =  requiredLength(password)
        const passwordErrorMg = Validationfunc(isPwResult,'Password must be 8 characters long')
        if(passwordErrorMg){
            this.setState({
                passwordErrorMg
            })
        }

        const isMatchPassword = mataching(password,confirmPassword)
        const confirmPwErrorMg = Validationfunc(isMatchPassword,'Password don\'t match')
        console.log(isMatchPassword)
        if(confirmPwErrorMg){
            this.setState({
                confirmPwErrorMg
            })
        }

        console.log(this.state)
        if(email && password && name && confirmPassword && username){
            //this.props.addTodo({email,password})
            console.log(this.props.userName)
            console.log(this.state)
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
             <SignupForm 
             handleSubmit={this.onhandleSubmit}  
             handleChange ={this.handleChange}
             usernameErrorMg = {this.state.usernameErrorMg}
             emailErrorMg  = {this.state.emailErrorMg}
             passwordErrorMg = {this.state.passwordErrorMg}
             confirmPwErrorMg = {this.state.confirmPwErrorMg}
             />
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)