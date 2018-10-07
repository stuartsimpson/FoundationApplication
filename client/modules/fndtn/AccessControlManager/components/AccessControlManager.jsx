/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {connect} from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

import AccessControlManagerRoles from './AccessControlManagerRoles.jsx';
import AccessControlManagerResources from './AccessControlManagerResources.jsx';
import AccessControlManagerMenus from './AccessControlManagerMenus.jsx';

import {setActiveTab, loadRoles, setSelectedRoleId, loadRoleResources, loadAvailableResources, loadAvailableMenus} from '../actions/moduleActions';

class AccessControlManager extends React.Component {
    constructor() {
        super();
    }

    tabSelected(event, value){
        this.props.dispatch(setActiveTab(value));
    }

    roleSelected(event){
        this.props.dispatch(setSelectedRoleId(event.currentTarget.id));
        loadRoleResources(this.props.dispatch, event.currentTarget.id);
    }

    roleRow(role, index){
        var selected = role._id === this.props.state.selectedRole;
        return(
            <TableRow
                hover
                key={"row"+role._id}
                id={role._id}
                color="accent"
                onClick={this.roleSelected.bind(this)}
                selected={selected}>
                <TableCell>{role.name}</TableCell>
            </TableRow>
        );
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <Paper elevation={5}>
                        <Grid container justify="center">
                            <Grid item>
                                <Typography variant="display2">Access Control Manager</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <AppBar position="Static" color="primary">
                                    <Typography variant="title" align="center">
                                        Role
                                    </Typography>
                                </AppBar>
                                <Table>
                                    <TableBody>
                                        {this.props.state.roles.map((role, index) => this.roleRow(role, index))}
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <AppBar  position="static" color="primary">
                                            <Tabs
                                                value={this.props.state.selectedTab}
                                                onChange={this.tabSelected.bind(this)}
                                                indicatorColor="secondary"
                                                textColor="inherit"
                                                fullWidth
                                            >
                                                <Tab label="Roles"/>
                                                <Tab label="Resources"/>
                                                <Tab label="Menus"/>
                                            </Tabs>
                                        </AppBar>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                    {this.props.state.selectedTab === 0 &&
                                            <AccessControlManagerRoles
                                                roleRoles={this.props.state.roleRoles}
                                                selectedRole={this.props.state.selectedRole}
                                                availableRoles={this.props.state.availableRoles}
                                                dispatch={this.props.dispatch}
                                            />}
                                    {this.props.state.selectedTab === 1 &&
                                            <AccessControlManagerResources
                                                roleResources={this.props.state.roleResources}
                                                selectedRole={this.props.state.selectedRole}
                                                availableResources={this.props.state.availableResources}
                                                resourceFilter={this.props.state.resourceFilter}
                                                dispatch={this.props.dispatch}
                                            />}
                                    {this.props.state.selectedTab === 2 &&
                                            <AccessControlManagerMenus
                                                roleMenus={this.props.state.roleMenus}
                                                selectedRole={this.props.state.selectedRole}
                                                availableMenus={this.props.state.availableMenus}
                                                dispatch={this.props.dispatch}
                                            />}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }

    componentDidMount(){
        loadRoles(this.props.dispatch, {});
        loadAvailableResources(this.props.dispatch, {});
        loadAvailableMenus(this.props.dispatch,{});
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
)(AccessControlManager);
