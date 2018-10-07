// Core foundation
import React from 'react';
import {connect} from 'react-redux';

// Material-UI Widgets
import Paper from '@material-ui/core/Paper';

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
                <div>
                    <h1>Welcome {this.props.state.user ? this.props.state.user.name.first : 'Friend'}</h1>
                </div>
                );
    }
}

const mapStateToProps = (state) => ({
    state: {user: state.userState.user}
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome);
