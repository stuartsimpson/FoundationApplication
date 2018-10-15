import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Welcome from './Welcome.jsx';

class AppBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
                <Switch>
                    <Route exact path="/" render={() => (<Welcome disptach={this.props.disptach}/>)}/>
                </Switch>
                );
    }
}

export default AppBody;
