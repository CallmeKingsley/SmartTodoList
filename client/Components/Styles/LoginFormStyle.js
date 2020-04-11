import { makeStyles } from '@material-ui/core/styles'

// MatrialUi Styles
export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  emailMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  emailMessageText: {
    fontSize: 16
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
export const Style = {
  button: {
    color: 'green',
    fontSize: 100
  }
}
