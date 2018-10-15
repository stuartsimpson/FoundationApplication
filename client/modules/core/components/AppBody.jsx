// Core foundation
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

// App Components
import AuthenticationComponent from './Authentication.jsx';
import WelcomePage from './Welcome.jsx';

class AppBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
                <Switch>
                    <Route exact path="/" render={() => (<WelcomePage/>)}/>
                </Switch>
                );
    }
}

export default AppBody;
