/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import UserAccountManagerForm from './UserAccountManagerForm.jsx';

class AppBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (<UserAccountManagerForm disptach={this.props.disptach}/>)}/>
            </Switch>
        );
    }
}

export default AppBody;