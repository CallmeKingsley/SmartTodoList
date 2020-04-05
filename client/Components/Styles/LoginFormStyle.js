import { makeStyles } from '@material-ui/core/styles'

// MatrialUi Styles
export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  inputtext: {
    marginBottom: theme.spacing(2)
  }
}))

// Regular Styles
export const style = {
  button: {
    color: 'red',
    background: 'green'
  }
}
