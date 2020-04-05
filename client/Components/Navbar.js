import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import MaterialInport from '../materialUI'
import { useStyles } from './Styles/NavBarStyles'

const MaterialUI = MaterialInport()

const NavBar = (prop) => {
  const classes = useStyles()
  return (
    <MaterialUI.AppBar position='static' color='default' elevation={0} className={classes.appBar}>
      <MaterialUI.Toolbar className={classes.toolbar}>
        <MaterialUI.Typography variant='h6' color='inherit' noWrap className={classes.toolbarTitle}>
          <Link className={classes.toolbarTitle} to='/'>
           Company name
          </Link>
        </MaterialUI.Typography>
        {prop.restrict == false ? <RestrictedNav/> : '' }
        <NavButton path = '/login' name = 'Login' />
        <NavButton path = '/signUp' name = 'SignUp' />
      </MaterialUI.Toolbar>
    </MaterialUI.AppBar>
  )
}

const RestrictedNav = ()=>{
  return (
    <nav>
      <StringLink name = 'Feature'/>
      <StringLink name = 'Enterprise'/>
      <StringLink name = 'Support'/>
    </nav>
  )
}

const StringLink = (prop)=>{
  const classes = useStyles()
  return(
    <Link variant='button' color='textPrimary'  className={classes.link}>
     {prop.name}
   </Link>
  )
}

const NavButton = (prop)=>{
  const classes = useStyles()
  return(
    <MaterialUI.Button color='primary' variant='outlined' className={classes.link}>
        <Link className={classes.toolbarTitle} to={prop.path}>
           {prop.name}
        </Link>
    </MaterialUI.Button>
  )
}
export default NavBar
