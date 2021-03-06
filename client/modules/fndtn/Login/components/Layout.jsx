import React from 'react';
import {Router, Link, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import AppHeader from 'Core/components/AppHeader.jsx';
import AppBody from './AppBody.jsx';
import AppFooter from 'Core/components/AppFooter.jsx';

const styles = theme => ({
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
                    <div>
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
