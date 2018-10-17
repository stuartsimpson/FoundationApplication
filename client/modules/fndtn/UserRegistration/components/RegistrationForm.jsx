/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
});

import {
    userAvailable,
    setFieldValue,
    setFieldErrorText,
    emailUsed,
    registerUser
} from '../actions/moduleActions';
import Validation from 'Utils/Validation';

class RegistrationForm extends React.Component {
    constructor() {
        super();
    }

    setFieldValue(event){
        this.props.dispatch(setFieldValue(event.target.name, event.target.value));
        switch(event.target.name){
            case 'username':{
                userAvailable(this.props.dispatch, event.target.value);
                break;
            }
            case 'password':{
                this.props.dispatch(setFieldErrorText(event.target.name,
                    Validation.password(event.target.value)? '' : 'Password not valid'));
                break;
            }
            case 'passwordConfirm':{
                this.props.dispatch(setFieldErrorText(event.target.name,
                    Validation.equal(event.target.value, this.props.state.form.password)? '' : 'Password does not match'));
                break;
            }
            case 'email':{
                emailUsed(this.props.dispatch, event.target.value);
                break;
            }
            case 'emailConfirm':{
                this.props.dispatch(setFieldErrorText(event.target.name,
                    Validation.email(event.target.value, this.props.state.form.email)? '' : 'E-Mail does not match'));
                break;
            }
            case 'phone':{
                this.props.dispatch(setFieldErrorText(event.target.name,
                    Validation.phone(event.target.value, this.props.state.form.email)? '' : 'Phone format invalid'));
                break;
            }
        }
    }

    register(){
        registerUser(this.props.dispatch, this.props.state.form);
    }

    setCaptchaValue(value){
        this.props.dispatch(setFieldValue('captcha',value));
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <Paper>
                        <Grid container>
                            <Grid container justify="center">
                                <Grid item xl={11}>
                                    <Typography variant='display2'>User Registration</Typography>
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="first"
                                        name="first"
                                        value={this.props.state.form.first}
                                        label="First"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="middle"
                                        name="middle"
                                        value={this.props.state.form.middle}
                                        label="Middle"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="last"
                                        name="last"
                                        value={this.props.state.form.last}
                                        label="Last"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="username"
                                        name="username"
                                        value={this.props.state.form.username}
                                        label="Username"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                        helperText={this.props.state.errorText.username}
                                        error={!this.props.state.errorText.username===''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        value={this.props.state.form.password}
                                        label="Password"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                        helperText={this.props.state.errorText.password}
                                        error={!this.props.state.errorText.password===''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        value={this.props.state.form.passwordConfirm}
                                        label="Password Confirm"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                        helperText={this.props.state.errorText.passwordConfirm}
                                        error={!this.props.state.errorText.passwordConfirm===''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        value={this.props.state.form.email}
                                        label="E-Mail"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                        helperText={this.props.state.errorText.email}
                                        error={!this.props.state.errorText.email===''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="emailConfirm"
                                        name="emailConfirm"
                                        value={this.props.state.form.emailConfirm}
                                        label="E-Mail Confirm"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                        helperText={this.props.state.errorText.emailConfirm}
                                        error={!this.props.state.errorText.emailConfirm===''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xs={11}>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        value={this.props.state.form.phone}
                                        label="Phone"
                                        fullWidth
                                        onChange={this.setFieldValue.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xl={11}>
                                    <ReCAPTCHA
                                        sitekey="6Lc96ykUAAAAAGeDP0ImqbVXuu6PEwPoR9vuV6Al"
                                        onChange={this.setCaptchaValue.bind(this)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <Grid item xl={11}>
                                    <Button
                                        id="register"
                                        variant="raised"
                                        color='primary'
                                        onClick={this.register.bind(this)}
                                    >Register</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.moduleState
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm));
