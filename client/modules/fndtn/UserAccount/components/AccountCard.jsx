/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {savePassword, saveUsername} from '../actions/moduleActions';

class AccountCard extends React.Component {
    cancel(){
        this.clearForm();
        this.toggleExpanded();
    }

    clearForm(){
        this.setState({form:{
                username: '',
                password: '',
                confirmPassword: '',
                oldPassword:''
            }
        });
    }

    constructor(){
        super();
        this.state = {
            expanded: false,
            validForm: true,
            errorText: {
                password: null
            },
            form: {}
        };
    }

    edit(){
        var form = JSON.parse(JSON.stringify(this.props.record));
        form.password = '';
        form.confirmPassword = '';
        form.oldPassword = '';
        this.setState({
            form: form
        });
        this.toggleExpanded();
    }

    save(){
        this.props.dispatch(saveUsername(this.state.form.username));
        if(
            this.state.form.password &&
            this.state.form.oldPassword &&
            (this.state.form.password === this.state.form.confirmPassword)
        ){
            this.props.dispatch(savePassword(this.state.form.password));
        }
        this.toggleExpanded();
        this.clearForm();
    }

    setFieldValue(event){
        var newState = Object.assign(this.state.form);
        newState[event.target.name] = event.target.value;
        this.setState({form:newState});
        this.validateForm();
    }

    toggleExpanded(){
        this.setState({expanded:!this.state.expanded});
    }

    validateForm(){
        if(this.state.form.password !== this.state.form.confirmPassword){
            this.setState({errorText:{password:'Passwords Do Not Match!'}});
        } else {
            this.setState({errorText:{password:null}});
        }
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Grid container>
                                <Grid item xs={1}>
                                    <Icon className="material-icons">
                                        account_circle
                                    </Icon>
                                </Grid>
                                <Grid item xs={1}>
                                    Account
                                </Grid>
                                <Grid item xs={9}>
                                    <strong>Username: </strong>{this.props.record.username}
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                       onClick={this.state.expanded?this.cancel.bind(this):this.edit.bind(this)}
                                    >
                                       <Icon>{this.state.expanded?'close':'mode_edit'}</Icon>
                                    </IconButton>
                                </Grid>
                    </Grid>
                </CardContent>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                    <CardContent>
                        <Grid container>
                            <Grid container>
                                <Grid item xs={1}/>
                                <Grid item xs={10}>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton
                                       onClick={this.save.bind(this)}
                                    >
                                       <Icon>done</Icon>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={1}/>
                                <Grid item xs={10}>
                                    <Grid container>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="oldPassword"
                                                name="oldPassword"
                                                value={this.state.form.oldPassword}
                                                label="Old Password"
                                                fullWidth
                                                onChange={this.setFieldValue.bind(this)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="password"
                                                name="password"
                                                value={this.state.form.password}
                                                label="Password"
                                                floatingLabelFixed={false}
                                                fullWidth
                                                onChange={this.setFieldValue.bind(this)}
                                                errorText={this.state.errorText.password}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={this.state.form.confirmPassword}
                                                label="Confirm Password"
                                                fullWidth
                                                onChange={this.setFieldValue.bind(this)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default AccountCard;
