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
import { Redirect } from 'react-router-dom';


const styles =theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {

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

    signIn = () => {

      let user = {username: this.state.username, password: this.state.password}

      console.log(user)

      fetch("https://halo-coding-challenge.herokuapp.com/login", 
        {method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(user)})
        .then(response => response.json())
        .then(response => {
          
            localStorage.setItem("access_token", response.access_token)
        })
    }


    renderRedirect = () => {

      if(localStorage.getItem("access_token")){
        return <Redirect to="/" />
      }
    }


    render(){

        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="xs">
            {this.renderRedirect()}
            <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={this.state.username}
                        onChange={this.handleFormChange}
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
                        autoComplete="current-password"
                        onChange={this.handleFormChange}
                        />
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => this.signIn()}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

SignIn.propTypes = {
    
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);