import React from 'react'
import { Link } from 'react-router-dom'
import MaterialInport from '../materialUI'
import { useStyles } from './Styles/NavBarStyles'
import { useDispatch } from 'react-redux'
import UserAction from '../Redux/UserRedux'

const MaterialUI = MaterialInport()

const NavBar = (prop) => {
  const classes = useStyles()
  // const dispatch = useDispatch()
  // const incrementCounter = useCallback(
  //   () => dispatch(UserAction.logoutAccount),
  //   [dispatch]
  // )
  return (
    <MaterialUI.AppBar position='static' color='default' elevation={0} className={classes.appBar}>
      <MaterialUI.Toolbar className={classes.toolbar}>
        <MaterialUI.Typography variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
          <Link className={classes.toolbarTitle} to='/'>
           Company name
          </Link>
        </MaterialUI.Typography>
        {prop.restrict === false ? <MarketingNav /> : ''}
        {prop.authenticated === true ? <LogoutNav /> : prop.hideAll === true ? ' ' : <RegistrationNav />}
      </MaterialUI.Toolbar>
    </MaterialUI.AppBar>
  )
}

const MarketingNav = () => {
  return (
    <nav>
      <StringLink name='Feature' />
      <StringLink name='Enterprise' />
      <StringLink name='Support' />
    </nav>
  )
}

const RegistrationNav = () => {
  return (
    <nav>
      <NavButton path='/login' name='Login' />
      <NavButton path='/signUp' name='SignUp' />
    </nav>
  )
}

const LogoutNav = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <MaterialUI.Button color='primary' onClick={(() => { dispatch(UserAction.logoutAccount()) })} variant='outlined' className={classes.link}>
      <Link className={classes.toolbarTitle} to='/login'>
     LogOut
      </Link>
    </MaterialUI.Button>
  )
}

const StringLink = (prop) => {
  const classes = useStyles()
  return (
    <Link to='/' variant='button' color='textPrimary' className={classes.link}>
      {prop.name}
    </Link>
  )
}

const NavButton = (prop) => {
  const classes = useStyles()
  return (
    <MaterialUI.Button color='primary' variant='outlined' className={classes.link}>
      <Link className={classes.toolbarTitle} to={prop.path}>
        {prop.name}
      </Link>
    </MaterialUI.Button>
  )
}

export default NavBar
