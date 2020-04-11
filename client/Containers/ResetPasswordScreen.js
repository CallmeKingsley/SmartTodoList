import React, { Component } from 'react'
import {requiredLength,mataching,Validationfunc} from '../Validation'
import ResetPasswordForm from '../Components/ResetPasswordForm'
import {Text} from '../Components/CommonlyUsed'
import {isNil, prop} from 'ramda'
import { connect } from 'react-redux'
import TodoRedux from '../Redux/TodoRedux'
import NavBar from '../Components/Navbar'
import UserRedux from '../Redux/UserRedux'

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
    const isValidPassword = requiredLength(password)
    const isValidPassword2  = requiredLength(confrimPassword)
    
  
    const passwordErrorMg = Validationfunc(isValidPassword, 'Password must be atlease 8 characters')
    if(passwordErrorMg){
    this.setState({
      passwordErrorMg
    })}

    const matchedPassword = mataching(confrimPassword,password)
    const passwordErrorMg2 = Validationfunc(matchedPassword, 'Password doesn\'t match')
    if(passwordErrorMg2){
    this.setState({
      passwordErrorMg2
    })}

    if(matchedPassword && isValidPassword){
      const passwordData = {
       Password : password,
       Id: this.props.match.params.id
      }

      this.props.changePassword(passwordData)
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
        <ResetPasswordForm handleSubmit={this.onhandleSubmit}  
        handleChange ={this.handleChange} 
        passwordError ={this.state.passwordErrorMg} 
        passwordError2 ={this.state.passwordErrorMg2}/>
          {isNil(this.props.serverSignUpError) ? '' : this.props.serverSignUpError.message === 'unable to save password' ? 
          <Text sizeType='h5' message ={'Please try again later'} color='error'/> : '' }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  serverSignUpError: state.user.errors.passwordChange
})
const mapDispatchToProps = dispatch => ({
  changePassword: passwordData => dispatch(UserRedux.passwordReset(passwordData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreem)
