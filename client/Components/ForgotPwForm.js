import React, { PureComponent } from 'react'
import MaterialInport from '../materialUI'
import { InputField, Button, SignInLinks, Text, LockIcon } from './CommonlyUsed'
import { useStyles } from './Styles/LoginFormStyle'
import { Link } from 'react-router-dom'

const MaterialUI = MaterialInport()

const ForgotPwForm = (prop) => {
  const classes = useStyles()
  
  return (
    <MaterialUI.Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <LockIcon avatarStyle={classes.avatar} />
        <Text sizeType='h1' message='Reset your password' />
        <form noValidate onSubmit={prop.handleSubmit}>
          <InputField id='email'  label='Email Address' name='email' autoComplete='email' handleChange={prop.handleChange('email')} margin='normal' error ={prop.error} helpText ={prop.helpText}/>
          <Button name='Reset' styles={classes.submit} />
        </form>
      </div>
    </MaterialUI.Container>
  )
}

export default ForgotPwForm