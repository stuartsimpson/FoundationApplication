/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {connect} from 'react-redux';


import Paper from '@material-ui/core/Paper';
import NameCard from './NameCard.jsx';
import JobCard from './JobCard.jsx';
import AccountCard from './AccountCard.jsx';
import PhoneCard from './PhoneCard.jsx';
import EmailCard from './EmailCard.jsx';
import DateCard from './DateCard.jsx';
import BirthdayCard from './BirthdayCard.jsx';
import AddressCard from './AddressCard.jsx';
import WebsiteCard from './WebsiteCard.jsx';
import Style from 'Utils/FormStyle';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {navigate} from 'Core/actions/navigationActions';
import {loadUser} from '../actions/moduleActions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit*3,
        width:'100%'
    }
});

const setIcon = (name) => (<Icon className="material-icons">{name}</Icon>);

class UserAccountForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={10}>
            <Paper>
                <Grid container justify="center">
                    <Grid item xl={12}>
                        <Typography variant="display2">User Account</Typography>
                    </Grid>
                </Grid>
                <NameCard
                    dispatch={this.props.dispatch.bind(this)}
                    record={this.props.state.name || {}}
                />
                <JobCard
                    dispatch={this.props.dispatch.bind(this)}
                    record={this.props.state.job || {}}
                />
                <AccountCard
                    dispatch={this.props.dispatch.bind(this)}
                    record={this.props.state.account || {}}
                />
                <PhoneCard
                    dispatch={this.props.dispatch.bind(this)}
                    list={this.props.state.phones || []}
                />
                <EmailCard
                    dispatch={this.props.dispatch.bind(this)}
                    list={this.props.state.emails || []}
                />
                <BirthdayCard
                    dispatch={this.props.dispatch.bind(this)}
                    record={this.props.state.birthday||new Date()}
                />
                <DateCard
                    dispatch={this.props.dispatch.bind(this)}
                    list={this.props.state.eventDates || []}
                />
                <AddressCard
                    dispatch={this.props.dispatch.bind(this)}
                    list={this.props.state.addresses || []}
                />
                <WebsiteCard
                    dispatch={this.props.dispatch.bind(this)}
                    list={this.props.state.websites || []}
                />
            </Paper>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        );
    }

    componentDidMount() {
        loadUser(this.props.dispatch, this.props.userAccountId);
    }
}

const mapStateToProps = (state) => ({
//    state: state.userState.user,
    state: state.moduleState.user,
//    moduleState: state.moduleState,
    userAccountId: state.navigationState.history.location.pathname.substring(1) || undefined
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccountForm));
