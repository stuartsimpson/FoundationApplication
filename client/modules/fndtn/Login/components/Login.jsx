import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Style from 'Utils/FormStyle';

import {authenticate, cancelLogin} from '../actions/moduleActions';

class Login extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
//        verifyAuthenticated(this.props.dispatch, this.props.state);
    }

    login(){
        authenticate(this.props.dispatch,{
            username: this.state.username,
            password: this.state.password
        });
    }

    cancel(){
        cancelLogin(this.props.dispatch);
    }

    setPassword(event){
        this.setState({password: event.target.value});
    }

    setUsername(event){
        this.setState({username: event.target.value});
    }

    render() {
        const actions = [
        ];

        return (
                <div>
                    <Dialog
                        title="Login"
                        actions={actions}
                        open={true}
                    >
                        <DialogTitle>User Login</DialogTitle>
                        <DialogContent>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="username"
                                            label="Username or E-Mail"
                                            fullWidth
                                            onChange={this.setUsername.bind(this)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="password"
                                            type="password"
                                            label="Password"
                                            fullWidth
                                            onChange={this.setPassword.bind(this)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Button
                                            id="login"
                                            variant="raised"
                                            color="primary"
                                            onClick={this.login.bind(this)}
                                        >Login</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            id="cancel"
                                            variant="raised"
                                            color="primary"
                                            onClick={this.cancel.bind(this)}
                                        >Cancel</Button>
                                    </Grid>
                                </Grid>
                        </DialogContent>
                    </Dialog>
                </div>
        );
    }
}

export default Login;
