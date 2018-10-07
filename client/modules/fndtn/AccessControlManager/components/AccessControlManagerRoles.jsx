/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import {connect} from 'react-redux';

class AccessControlManagerRoles extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        console.log("// TODO: need to handle the AccessControlManagerRoles WillMount phase.");
    }

    componentWillReciveProps() {
        console.log("// TODO: need to handle the AccessControlManagerRoles WillReciveProps phase.");
    }

// Uncomment if need to control the component update phase.
//    shouldComponentUpdate(){
//        console.log("// TODO: need to handle the AccessControlManagerRoles shouldComponentUpdate phase.");
//        return(true);
//    }

    componentWillUpdate() {
        console.log("// TODO: need to handle the AccessControlManagerRoles componentWillUpdate phase.");
    }

    render() {
        return (
                <h1>Roles</h1>
                );
    }

    componentDidUpdate() {
        console.log("// TODO: need to handle the AccessControlManagerRoles componentDidUpdate phase.");
    }

    componentDidMount() {
        console.log("// TODO: need to handle the AccessControlManagerRoles DidMount phase.");
    }

    componentWillUnmount() {
        console.log("// TODO: need to handle the AccessControlManagerRoles DidMount phase.");
    }
}

const mapStateToProps = (state) => ({
        state: state
    });

const mapDispatchToProps = (dispatch) => ({
        dispatch: dispatch
    });

export default connect(
        mapStateToProps,
        mapDispatchToProps
        )(AccessControlManagerRoles);