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
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {loadRoles, setFormValue, editRole, saveRole, cancelEdit, deleteRole, clearForm} from '../actions/moduleActions';

const styles = theme => ({root: {}});

class RoleManagerForm extends React.Component {
    constructor() {
        super();
    }

    setFormValue(event){
        this.props.dispatch(setFormValue(event.currentTarget.id, event.currentTarget.value));
    }

    toggleFormValue(event, isInputChecked){
        this.props.dispatch(setFormValue(event.currentTarget.id, isInputChecked));
    }

    edit(event){
        var id = parseInt(event.currentTarget.id);
        var role = Object.assign({}, this.props.state.roles[id]);
        this.props.dispatch(editRole(role, id));
    }

    delete(event){
        var index = event.currentTarget.id;
        deleteRole(this.props.dispatch, this.props.state.roles[index], index);
    }

    find(event){

        var query={};
        if(this.props.state.form.name !== ''){
            query.file=this.props.state.form.name;
        }

        loadRoles(this.props.dispatch, query);
    }

    add(event){
        this.props.dispatch(clearForm());
        this.props.dispatch(editRole(this.props.state.form, -1));
    }

    cancel(event){
        this.props.dispatch(clearForm());
        this.props.dispatch(cancelEdit());
    }

    save(){
        saveRole(this.props.dispatch, this.props.state.form, this.props.state.index);
    }

    row(role, index){
        return(
            <TableRow hover key={"row"+role._id} id={"row"+role._id} color="accent">
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
                <TableCell>{role.name}</TableCell>
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
                    <Grid item xl={12}>
                        <Typography variant="display2">Role Manager</Typography>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <IconButton
                                    id={"search"}
                                    onClick={this.props.state.edit? this.save.bind(this) : this.find.bind(this)}
                                >
                                    <Icon>{this.props.state.edit ? "done" : "search"}</Icon>
                                </IconButton>
                                <IconButton
                                    id={"cancel"}
                                    onClick={this.props.state.edit ? this.cancel.bind(this) : this.add.bind(this)}
                                >
                                   <Icon>{this.props.state.edit ? "close" : "add"}</Icon>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="name"
                                    name="name"
                                    value={this.props.state.form.name}
                                    onChange={this.setFormValue.bind(this)}
                                    label="Name"
                                    fullWidth
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.state.roles.map((role, index) => this.row(role, index))}
                    </TableBody>
                </Table>
            </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }
    componentDidMount() {
        loadRoles(this.props.dispatch, {});
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
)(RoleManagerForm));
