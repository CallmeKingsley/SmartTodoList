import React from 'react'
import MaterialInport from '../materialUI'
import { InputField, Button, Text, LockIcon } from './CommonlyUsed'
import { useStyles } from './Styles/LoginFormStyle'
const MaterialUI = MaterialInport()

const ForgotPwForm = (prop) => {
  const classes = useStyles()
  console.log('status of emial ' + prop.showSuccessText)
  return (
    <MaterialUI.Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <LockIcon avatarStyle={classes.avatar} />
        <Text sizeType='h5' message='Reset your password' />
        {prop.showSuccessText ? <SuccessEmailSent /> : ''}
        <form noValidate onSubmit={prop.handleSubmit}>
          <InputField id='email' label='Email Address' name='email' autoComplete='email' handleChange={prop.handleChange('email')} margin='normal' error={prop.error} helpText={prop.helpText} />
          <Button name='Reset' disable={prop.showSuccessText} styles={classes.submit} />
        </form>
      </div>
    </MaterialUI.Container>
  )
}

const SuccessEmailSent = () => {
  const classes = useStyles()

  return (
    <div className={classes.emailMessage}>
      <Text
        inputtext={classes.emailMessageText}
        message='We have sent a password reset to the email address.'
        color='secondary'
      />
      <Text
        inputtext={classes.emailMessageText}
        message=' Please check your inbox and continue.'
        color='secondary'
      />
    </div>
  )
}

export default ForgotPwForm
