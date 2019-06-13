import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class SignUp extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleFormChange = (event) => {

    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  register = () => {

    let user = {username: this.state.username, password: this.state.password}

    fetch("https://halo-coding-challenge.herokuapp.com/register", 
      {method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify(user)})
      .then(response => response.json())
      .then(response => {
        
          console.log(response.message)
      })
  }

  render () {

    const {classes} = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleFormChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.register()}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
    
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);