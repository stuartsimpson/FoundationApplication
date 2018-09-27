// Core foundation
import {connect} from 'react-redux';
import {Router, Link, Route, Switch} from 'react-router-dom';

// Actions
import {login, logout} from '../actions/authenticationActions';

// Material-UI Widgets
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';

// App Components
import AppHeader from './AppHeader.jsx';
import AppBody from './AppBody.jsx';
import AppFooter from './AppFooter.jsx';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 30
    },
    layoutPaper:{
        marginTop: '70px'
    }
});

class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router history={this.props.state.history}>
                <div className={this.props.classes.root}>
                    <AppHeader/>
                    <Paper elevation={5} className={this.props.classes.layoutPaper}>
                        <AppBody dispatch={this.props.dispatch}/>
                        <AppFooter/>
                    </Paper>
                </div>
            </Router>
       );
    }
}

const mapStateToProps = (state) => ({
    state: {history: state.navigationState.history}
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout));
