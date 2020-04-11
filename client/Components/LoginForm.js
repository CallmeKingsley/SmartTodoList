import React from 'react'
import MaterialInport from '../materialUI'
import { InputField, Button, Text, LockIcon } from './CommonlyUsed'
import { useStyles } from './Styles/LoginFormStyle'
import { Link } from 'react-router-dom'
const MaterialUI = MaterialInport()

const LoginForm = (prop) => {
  const classes = useStyles()
  return (
    <MaterialUI.Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <LockIcon avatarStyle={classes.avatar} />
        <Text sizeType='h5' message='Sign In' />
        <form noValidate onSubmit={prop.handleSubmit}>
          <InputField
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            handleChange={prop.handleChange('email')}
            margin='normal'
            error={prop.emailValidation.error}
            helpText={prop.emailValidation.helpText}
          />
          <Link to='/forgotPw'>Forgot password? </Link>
          <InputField
            id='password'
            type={false} label='password'
            name='password' autoComplete='current-password'
            autoFocus={false} handleChange={prop.handleChange('password')}
            margin='normal'
            error={prop.passwordValidation.error}
            helpText={prop.passwordValidation.helpText}
          />
          <Button name='Login' styles={classes.submit} />
        </form>

      </div>
    </MaterialUI.Container>
  )
}

export default LoginForm
