// Core foundation
import React from 'react';
import {connect} from 'react-redux';

//Material-UI Widgets
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width:'100%',
        position: 'fixed',
        left: 0,
        bottom: 0
    }
});

class AppFooter extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Paper elevation={3} className={this.props.classes.root}>
                <Typography gutterBottom noWrap>
                    Messages: {this.props.state.message}
                </Typography>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.footerState
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppFooter));
