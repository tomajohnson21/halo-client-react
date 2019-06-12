import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import PersonOutlined from '@material-ui/icons/PersonOutlined';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import ExitToApp from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip'



const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    table: {
        width: '100%'
    },
    title:{
        flexGrow: 1
    },
    logout: {
        color: theme.palette.common.white
    }
});



class Home extends React.Component {
    
    state = {
        contacts: [],
        first_name: "",
        last_name: "",
        phone_number: ""
    }
    
    componentDidMount = () => {
        this.getContacts()
    }

    handleFormChange = (event) => {
        
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    checkAuth = () => {

        if(localStorage.getItem("access_token")){
            this.setState({isAuth: true})
        }
    }

    renderRedirect = () => {
        
        if(!localStorage.getItem("access_token")){
            return <Redirect to="/signin" />
        }
    }

    signOut = () => {
        localStorage.removeItem("access_token")
    }

    getContacts = () => {
    
        let access_token = localStorage.getItem("access_token")

        fetch("https://halo-coding-challenge.herokuapp.com/contacts", {
            method: "GET",
            headers: {
                "Authorization": "JWT " + access_token
            }})
              .then(response => response.json())
              .then(response => {
                  let contacts = response.data;
                  this.setState({contacts})
              })
    }

    postContact = () => {

        let new_contact = {first_name: this.state.first_name,
                           last_name: this.state.last_name,
                           phone_number: this.state.phone_number}

        let access_token = localStorage.getItem("access_token")

        fetch("https://halo-coding-challenge.herokuapp.com/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "JWT " + access_token},
         body: JSON.stringify(new_contact)})
        .then(response => response.json())
        .then(response => {
            this.getContacts()
        })
    }

    textMask = (props) => {
        const { inputRef, ...other } = props;

        return (
            <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
            />
        );
    }

    renderTable = (className) => {

        if(this.state.contacts){
            return (
                <Table className={className}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align='right'>Last Name</TableCell>
                            <TableCell align='right'>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.contacts.map(contact => (
                        <TableRow key={contact.first_name + contact.last_name}>
                            <TableCell component='th' scope='row'>{contact.first_name}</TableCell>
                            <TableCell align='right'>{contact.last_name}</TableCell>
                            <TableCell align='right'>{contact.phone_number}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )
        }
    }

    render() {

        const {classes} = this.props;

        
        return (
            <div>
                {this.renderRedirect()}
                <AppBar className={classes.nav}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Halo Coding Challenge
                        </Typography>
                        <Tooltip title="Sign Out">
                        <IconButton className={classes.logout} aria-label="Sign Out" onClick={() => this.signOut()}>
                            <ExitToApp />
                        </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PersonOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Contacts
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField    
                            variant="outlined"
                            required
                            fullWidth
                            id="first-name"
                            label="First Name"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleFormChange}
                            autoFocus
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="last-name"
                            label="Last Name"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleFormChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <Input
                            variant="outlined"
                            required
                            fullWidth
                            inputComponent={this.textMask}
                            id="phone-number"
                            label="Phone Number"
                            name="phone_number"
                            value={this.state.phone_number}
                            onChange={this.handleFormChange}
                            />
                            </Grid>
                            </Grid>
                            <Button
                            onClick={() => this.postContact()}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                                Add Contact
                            </Button>
                        </form>

                        {this.renderTable(classes.table)}
                    </div>
                </Container>
            </div>
        );
    }
}

Home.propTypes = {
    
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);