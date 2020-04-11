import React from 'react'
import MaterialInport from '../materialUI'
import { Button, Text, LockIcon, TwoInputFieldGrid, GridInputField } from './CommonlyUsed'
import { useStyles } from './Styles/LoginFormStyle'

const MaterialUI = MaterialInport()

const SignupForm = (prop) => {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    hideDoubleName: true

  })

  return (
    <MaterialUI.Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <LockIcon avatarStyle={classes.avatar} />
        <Text sizeType='h5' message='Sign Up' inputtext={classes.inputtext} />
        <form noValidate onSubmit={prop.handleSubmit}>
          <MaterialUI.Grid container spacing={2}>
            {values.hideDoubleName ? <UserName handleChange={prop.handleChange} usernameErrorMg={prop.usernameErrorMg} /> : <DoubleName handleChange={prop.handleChange} />}
            <GridInputField
              id='email'
              error={prop.emailErrorMg.error}
              helpText={prop.emailErrorMg.helpText}
              label='Email Address'
              name='email'
              autoComplete='email'
              handleChange={prop.handleChange('email')}
            />
            <GridInputField
              id='password'
              error={prop.passwordErrorMg.error}
              helpText={prop.passwordErrorMg.helpText}
              type={false} label='password'
              name='password'
              autoComplete='current-password'
              autoFocus={false}
              handleChange={prop.handleChange('password')}
            />
            <GridInputField
              id='Confirm-password'
              error={prop.confirmPwErrorMg.error}
              helpText={prop.confirmPwErrorMg.helpText}
              type={false}
              label='Confirm password'
              name='Confirm-password'
              autoComplete='current-password'
              autoFocus={false}
              handleChange={prop.handleChange('confirmPassword')}
            />
          </MaterialUI.Grid>
          <Button name='SIGN UP' styles={classes.submit} />
        </form>
      </div>
    </MaterialUI.Container>
  )
}

const DoubleName = (prop) => {
  return (
    <div>
      <TwoInputFieldGrid id='first' label='first Name' name='first' autoComplete='first' handleChange={prop.handleChange('first')} />
      <TwoInputFieldGrid id='last' label='Last Name' name='last' autoComplete='last' handleChange={prop.handleChange('last')} />
    </div>
  )
}

const UserName = (prop) => {
  return (
    <GridInputField
      id='username'
      error={prop.usernameErrorMg.error}
      helpText={prop.usernameErrorMg.helpText}
      label='UserName'
      name='username'
      autoComplete='username'
      handleChange={prop.handleChange('username')}
    />
  )
}

export default SignupForm
