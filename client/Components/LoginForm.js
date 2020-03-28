import React, { PureComponent} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
class LoginForm extends PureComponent {

  static propTypes  = {
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = input => e =>{  
    this.setState({ [input]: e.target.value})
  }

  handleSubmit(event){
    const email = this.state.email
    const password = this.state.password
    if(email && password){
      this.props.handleSubmit({email,password})
    }
    event.preventDefault();
  }

  render(){
    return(
     <Container component="main" maxWidth="xs">
       <form  noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange = {this.handleChange('email')}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange = {this.handleChange('password')}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
       </form>
     </Container>
    )
  }
}
export default LoginForm