import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import MaterialInport from '../materialUI'
import { Link } from 'react-router-dom'
const MaterialUI = MaterialInport()

export const InputField = (prop) => {
  return (
    <MaterialUI.TextField
      type={prop.type ? 'text' : 'password'}
      error={prop.error}
      variant='outlined'
      margin={prop.margin}
      required
      fullWidth
      id={prop.id}
      label={prop.label}
      name={prop.name}
      autoComplete={prop.autoComplete}
      autoFocus={prop.autoFocus}
      onChange={prop.handleChange}
      helperText={prop.helpText}
    />
  )
}
InputField.defaultProps = {
  type: true
}

export const GridInputField = (prop) => {
  return (
    <MaterialUI.Grid item xs={12}>
      <InputField id={prop.id} label={prop.label} name={prop.name} autoComplete={prop.autoComplete} handleChange={prop.handleChange} type={prop.type} error={prop.error} helpText={prop.helpText} />
    </MaterialUI.Grid>
  )
}
export const TwoInputFieldGrid = (prop) => {
  return (
    <MaterialUI.Grid item xs={12} sm={6}>
      <InputField id={prop.id} label={prop.label} name={prop.name} autoComplete={prop.autoComplete} handleChange={prop.handleChange} />
    </MaterialUI.Grid>
  )
}

export const Button = (prop) => {
  return (
    <MaterialUI.Button
      type={prop.type}
      fullWidth
      variant={prop.variant}
      color={prop.color}
      className={prop.styles}
      disabled={prop.disable}
    >
      {prop.name}
    </MaterialUI.Button>
  )
}
Button.defaultProps = {
  type: 'submit',
  variant: 'contained',
  color: 'primary'
}

export const Linkto = (prop) => {
  return (
    <Link to={prop.path}>
      {prop.message}
    </Link>
  )
}

export const SignInLinks = (prop) => {
  return (
    <MaterialUI.Grid container>
      <MaterialUI.Grid item xs>
        <Linkto path={prop.firstLink} message={prop.firstMessage} />
      </MaterialUI.Grid>
      <MaterialUI.Grid item>
        <Linkto path={prop.secondLink} message={prop.secondMessage} />
      </MaterialUI.Grid>
    </MaterialUI.Grid>
  )
}

export const Text = (prop) => {
  return (
    <MaterialUI.Typography component={prop.sizeType} className={prop.inputtext} variant={prop.sizeType} color={prop.color}>
      {prop.message}
    </MaterialUI.Typography>
  )
}
Text.defaultProps = {
  sizeType: 'h5'
}

export const LockIcon = (prop) => {
  return (
    <MaterialUI.Avatar className={prop.avatarStyle}>
      <LockOutlinedIcon />
    </MaterialUI.Avatar>
  )
}
