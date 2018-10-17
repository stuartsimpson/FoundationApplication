/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';

//Actions
import {setFooterMessage} from 'Core/actions/footerActions';

function setRoles(roles){
    return({
        type: 'FNDTN_ROLE_MANAGER_SET_ROLES',
        payload: roles
    });
}

function setFormValue(field, value){
    return({
        type: 'FNDTN_ROLE_MANAGER_SET_FORM_VALUE',
        payload: {field:field, value: value}
    });
}

function editRole(role, index){
    return({
        type: 'FNDTN_ROLE_MANAGER_EDIT_ROLE',
        payload: {role:role, index:index}
    });
}

function clearForm(){
    return({
        type: 'FNDTN_ROLE_MANAGER_CLEAR_FORM'
    });
}

function cancelEdit(){
    return({
        type: 'FNDTN_ROLE_MANAGER_CANCEL_EDIT'
    });
}

function _saveRole(role, index){
    return({
        type: 'FNDTN_ROLE_MANAGER_SAVE_ROLE',
        payload: {role: role, index: index}
    });
}

function _deleteResource(index){
    return({
        type: 'FNDTN_ROLE_MANAGER_DELETE_ROLE',
        payload: {index: index}
    });
}

function saveRole(dispatch, role, index){
    axios.post('/services/private/fndtn/roles', role).then( (res) => {
        dispatch(_saveRole(role, index));
        dispatch(clearForm());
        dispatch(cancelEdit());
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to save role: '+error.response.data.message));
    });
}

function deleteRole(dispatch, role, index){
    var roleId = role._id;
    axios.delete('/services/private/fndtn/roles/'+roleId).then( (res) => {
        dispatch(_deleteRole(index));
        dispatch(setFooterMessage('Role deleted.'));
    }).catch( (error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to delete role: '+error.response.data.message));
    });
}

function loadRoles(dispatch, search){
    axios.post('/services/private/fndtn/roles/find', search).then ((res) => {
        dispatch(setFooterMessage('Roles loaded.'));
        dispatch(setRoles(res.data.roles));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all roles: '+error.response.data.message));
    });
};

export {loadRoles, setFormValue, editRole, saveRole, cancelEdit, deleteRole, clearForm}

