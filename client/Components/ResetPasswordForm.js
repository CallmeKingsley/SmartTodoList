import React from 'react'
import MaterialInport from '../materialUI'
import { InputField, Button, Text, LockIcon } from './CommonlyUsed'
import { useStyles } from './Styles/LoginFormStyle'

const MaterialUI = MaterialInport()

const ResetPasswordForm = (prop) => {
  const classes = useStyles()

  return (
    <MaterialUI.Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <LockIcon avatarStyle={classes.avatar} />
        <Text sizeType='h5' message='Reset your password' />
        <form noValidate onSubmit={prop.handleSubmit}>
          <InputField id='password' label='New Password' name='password' autoComplete='password' handleChange={prop.handleChange('password')} margin='normal' error={prop.passwordError.error} helpText={prop.passwordError.helpText} />
          <InputField id='confrimPassword' label='Confirm New Password' name='confrimPassword' autoComplete='confrimPassword' handleChange={prop.handleChange('confrimPassword')} margin='normal' error={prop.passwordError2.error} helpText={prop.passwordError2.helpText} />
          <Button name='Upadate Password' styles={classes.submit} />
        </form>
      </div>
    </MaterialUI.Container>
  )
}

export default ResetPasswordForm
