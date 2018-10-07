/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {loadUsers, deleteUser} from '../actions/moduleActions';
import {navigate} from '../../../core/actions/navigationActions';

class UserAccountManagerForm extends React.Component {
    constructor() {
        super();
    }

    setFormValue(event){
        this.props.dispatch(setFormValue(event.currentTarget.id, event.currentTarget.value));
    }

    edit(event){
        var index = event.currentTarget.id;
        navigate(this.props.dispatch, '/dist/fndtnUserAccount/#/'+this.props.state.users[index]._id);
    }

    delete(event){
        var index = event.currentTarget.id;
        deleteUser(this.props.dispatch, this.props.state.users[index], index);
    }

    find(event){

        var query={};
        if(this.props.state.form.username !== ''){
            query.username=this.props.state.form.username;
        }

        if(this.props.state.form.middle !== ''){
            query.middle=this.props.state.form.middle;
        }

        if(this.props.state.form.first !== ''){
            query.first=this.props.state.form.first;
        }

        if(this.props.state.form.last !== ''){
            query.last=this.props.state.form.last;
        }

        loadUsers(this.props.dispatch, query);
    }

    cancel(event){
        this.props.dispatch(clearForm());
        this.props.dispatch(cancelEdit());
    }

    row(user, index){
        return(
            <TableRow key={"row"+user._id} id={"row"+user._id}>
                <TableCell>
                    <IconButton
                        id={index}
                        onClick={this.edit.bind(this)}
                    >
                       <Icon>mode_edit</Icon>
                    </IconButton>
                    <IconButton
                        id={index}
                        onClick={this.delete.bind(this)}
                    >
                       <Icon>delete</Icon>
                    </IconButton>
                </TableCell>
                <TableCell>{user.account.username}</TableCell>
                <TableCell colSpan="3">{user.name.first + ' ' + user.name.middle + ' ' + user.name.last}</TableCell>
                <TableCell>{user.emails[0].label+': '+user.emails[0].address}</TableCell>
                <TableCell>{user.phones[0].label+': '+user.phones[0].phone}</TableCell>
            </TableRow>
        );
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={10}>
            <Paper>
                <Grid container justify="center">
                    <Grid item>
                        <Typography variant="display2">User Account Manager</Typography>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <IconButton
                                    id={"search"}
                                    onClick={this.find.bind(this)}
                                >
                                    <Icon>search</Icon>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="username"
                                    name="username"
                                    value={this.props.state.form.username}
                                    onChange={this.setFormValue.bind(this)}
                                    label="Username"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="first"
                                    name="first"
                                    value={this.props.state.form.first}
                                    onChange={this.setFormValue.bind(this)}
                                    label="First Name"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="middle"
                                    name="middle"
                                    value={this.props.state.form.middle}
                                    onChange={this.setFormValue.bind(this)}
                                    label="Middle Name"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="last"
                                    name="last"
                                    value={this.props.state.form.last}
                                    onChange={this.setFormValue.bind(this)}
                                    label="Last Name"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="email"
                                    name="email"
                                    value={this.props.state.form.email}
                                    onChange={this.setFormValue.bind(this)}
                                    label="E-Mail Address"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    value={this.props.state.form.phone}
                                    onChange={this.setFormValue.bind(this)}
                                    label="Phone Number"
                                    fullWidth
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell colSpan="3">Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.state.users.map((user, index) => this.row(user, index))}
                    </TableBody>
                </Table>
            </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }

    componentDidMount() {
        loadUsers(this.props.dispatch, {});
    }
}

const mapStateToProps = (state) => ({
    state: state.moduleState
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccountManagerForm);
