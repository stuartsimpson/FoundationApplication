/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {connect} from 'react-redux';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {withStyles} from '@material-ui/core/styles';

import {login, logout} from '../../core/actions/authenticationActions';
import {navigate} from '../../core/actions/navigationActions';

import {openMenuDrawer, closeMenuDrawer} from '../actions/menuActions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit*3,
        width:'100%'
    },
    flex: {
        flex:1
    },
    menuButton:{
        marginLeft:-12,
        marginRight:20
    }
});

class AppSideNav extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleMenuSelection(event){
        console.log(event.currentTarget.id);
        this.props.dispatch(closeMenuDrawer());
        switch(event.currentTarget.id){
            case 'login':{
                login(this.props.dispatch, this.props.state.token);
                break;
            }
            case 'logout':{
                logout(this.props.dispatch);
                break;
            }
            case 'home':{
                this.props.dispatch(navigate('/'));
                break;
            }
            default:{
                this.props.dispatch(navigate('/modules/'+event.currentTarget.id));
            }
        }
    }

    row(menuItem, index){
        switch(menuItem.type){
            case 'MenuItem':{
                return(<MenuItem id={menuItem.rsourceURL} onclick={this.handleMenuSelection.bind(this)}>{menuItem.display}</MenuItem>);
                break;
            }
            case 'MenuList':{
                return(<MenuList>{menuItem.list.map((item, index) => this.row(item, index))}</MenuList>);
                break;
            }
            case 'Divider':{
                return(<Divider/>);
                break;
            }
        }
    }

    render() {
        return (
            <div>
                <MenuList>
                    <MenuItem id="login" onClick={this.handleMenuSelection.bind(this)}>Login</MenuItem>
                    <MenuItem id="logout" onClick={this.handleMenuSelection.bind(this)}>Logout</MenuItem>
                </MenuList>
                <Divider/>
                <MenuItem id="home" onClick={this.handleMenuSelection.bind(this)}>Home</MenuItem>
                <MenuItem id="fndtnUserAccount" onClick={this.handleMenuSelection.bind(this)}>User Account</MenuItem>
                <MenuItem id="fndtnUserRegistration" onClick={this.handleMenuSelection.bind(this)}>User Registration</MenuItem>
                <Divider/>
                <MenuItem id="fndtnResourceManager" onClick={this.handleMenuSelection.bind(this)}>Resource Manager</MenuItem>
                <MenuItem id="fndtnUserAccountManager" onClick={this.handleMenuSelection.bind(this)}>User Account Manager</MenuItem>
                <MenuItem id="fndtnAccessControlManager" onClick={this.handleMenuSelection.bind(this)}>Access Control Manager</MenuItem>
            </div>
        );
    }

    componentDidMount() {
        console.log("// TODO: need to handle the AppSideNav DidMount phase.");
    }
}

const mapStateToProps = (state) => ({
    state: {
        token: state.authenticationState.token,
        drawerOpen: state.menuState.drawerOpen,
        drawerDocked: state.menuState.drawerDocked,
        menu:state.menuState.menu
    }
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppSideNav));
