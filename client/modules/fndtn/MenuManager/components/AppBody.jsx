import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import MenuManagerForm from './MenuManagerForm.jsx';

class AppBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
                <Switch>
                    <Route exact path="/" render={() => (<MenuManagerForm disptach={this.props.disptach}/>)}/>
                </Switch>
                );
    }
}

export default AppBody;
