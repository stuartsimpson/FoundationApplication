/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { withStyles } from '@material-ui/core/styles';
import {loadAvailableMenus, updateRoleMenu, addRoleMenu, deleteRoleMenu} from '../actions/moduleActions.js';

const styles = theme => ({
    root:{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 750
    }
});

class AccessControlManagerMenus extends React.Component {
    constructor() {
        super();
    }

    filterMenuList(event){
        var query = {};
        if(event.currentTarget.value){
            query.name = event.currentTarget.value;
        }
        loadAvailableMenus(this.props.dispatch, query);
    }

    roleListItem(role, index){
        return(
                <ListItem button key={role._id}>
                    <ListItemText primary={role.role}/>
                </ListItem>
        );
    }

    addMenu(event){
        addRoleMenu(this.props.dispatch, this.props.selectedRole, this.props.availableMenus[event.currentTarget.id]);
    }

    deleteMenu(event){
        deleteRoleMenu(this.props.dispatch, event.currentTarget.id, this.props.selectedRole);
    }

    roleMenuRow(roleMenu, index){
        return(
            <ListItem button key={roleMenu._id}>
              <ListItemText
                primary={roleMenu.menu.name}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete" id={roleMenu._id} onClick={this.deleteMenu.bind(this)}>
                    <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
        );
    }

    availableMenuRow(menu, index){
        return(
            <ListItem button key={menu._id}>
                <ListItemIcon>
                    <Icon>menu</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={menu.display}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        id={index}
                        onClick={this.addMenu.bind(this)}
                    >
                        <Icon>add</Icon>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container>
                <Grid item xs={8}>
                    <Typography variant="title">
                        Assinged
                    </Typography>
                    <List>
                        {this.props.roleMenus.map((resource, index) => this.roleMenuRow(resource, index))}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="title">
                        Available
                    </Typography>
                    <TextField
                       id="menuFilter"
                       name="menuFilter"
                       value={this.props.resourceFilter}
                       onChange={this.filterMenuList.bind(this)}
                       label="Display"
                       fullWidth
                   />
                   <List className={classes.root}>
                        {this.props.availableMenus.map((menu, index) => this.availableMenuRow(menu, index))}
                   </List>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(AccessControlManagerMenus);
