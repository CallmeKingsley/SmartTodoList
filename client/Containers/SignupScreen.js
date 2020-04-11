import React, { Component } from 'react'
import SignupForm from '../Components/SignupForm'
import { connect } from 'react-redux'
import UserAction from '../Redux/UserRedux'
import Nav from '../Components/Navbar'
import {Text} from '../Components/CommonlyUsed'
import {isNil, prop} from 'ramda'
import {validateEmail,requiredLength,Validationfunc,emptyString, mataching} from '../Validation'
class SignupScreen extends Component {

    constructor (props) {
        super(props)
        this.onhandleSubmit = this.onhandleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            username:'',
            email: '',
            password: '',
            confirmPassword: '',
            usernameErrorMg :{ error: false, helpText: ''},
            emailErrorMg :{ error: false, helpText: ''},
            passwordErrorMg :{ error: false, helpText: ''},
            confirmPwErrorMg :{ error: false, helpText: ''},
            emailAlreadyExist :{ error: true, helpText: 'Email Already Exist'},
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
        if(confirmPwErrorMg){
            this.setState({
                confirmPwErrorMg
            })
        }
       
        if(!usernameErrorMg.error && !confirmPwErrorMg.error && !emailErrorMg.error && !passwordErrorMg.error ){
           this.props.createAccount({username,email,password}) 
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
             emailErrorMg  = { isNil(this.props.serverSignUpError) ? this.state.emailErrorMg : this.state.emailAlreadyExist}
             passwordErrorMg = { this.state.passwordErrorMg}
             confirmPwErrorMg = {this.state.confirmPwErrorMg}
             />
             {isNil(this.props.serverSignUpError) ? '' : this.props.serverSignUpError.message === 'Try again Later' ?  <Text sizeType='h5' message ={'Please try again later'} color='error'/> : '' }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    serverSignUpError: state.user.errors.signup
})
  
const mapDispatchToProps = dispatch => ({
    createAccount: user => dispatch(UserAction.createAccount(user))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)