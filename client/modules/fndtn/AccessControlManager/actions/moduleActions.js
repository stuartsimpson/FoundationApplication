/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';
import {setFooterMessage} from 'Core/actions/footerActions';

//Actions
function setActiveTab(value){
    return({
        type: 'FNDTN_ACCESS_CONTROL_MANAGER_SELECT_TAB',
        payload: value
    });
}

function setAvailableResources(resources){
    return({
        type: 'FNDTN_ACCESS_CONTROL_MANAGER_SET_AVAILABLE_RESOURCES',
        payload: resources
    });
}

function setRoles(roles){
    return({
        type: 'FNDTN_ACCESS_CONTROL_MANAGER_SET_ROLES',
        payload: roles
    });
}

function setRoleResources(roleResources){
    return({
        type: 'FNDTN_ACCESS_CONTROL_MANAGER_LOAD_ROLE_RESOURCES',
        payload: roleResources
    });
}

function setAvailableMenus(availableMenus){
    return({
        type: 'FNDTN_ACCESS_CONTROL_MANAGER_SET_AVAILABLE_MENUS',
        payload: availableMenus
    });
}

function toggleResourceRight(method, index){
    return({
        type: 'FNDTN_ACCESS_CONTROL_MANAGER_TOGGLE_RESOURCE_RIGHT',
        payload: {method:method, index:index}
    });
}

function setSelectedRoleId(roleId){
    return({
        type:'FNDTN_ACCESS_CONTROL_MANAGER_SET_SELECTED_ROLE',
        payload: {roleId:roleId}
    });
}

function saveRoleResource(dispatch, roleResource){
    axios.post('/service/fndtn/management/roleResources', roleResource)
    .then((res)=>{
        loadRoleResources(dispatch,roleResource.roleId);
    }).catch((error)=>{
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to save role resource: '+error.response.data.message));
    });
}

function loadRoles(dispatch, search){
     axios.post('/service/fndtn/management/roles/find', search).then ((res) => {
        dispatch(setFooterMessage('Roles loaded.'));
        dispatch(setRoles(res.data.roles));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all roles: '+error.response.data.message));
    });
}

function deleteRoleResource(dispatch, roleResourceId, roleId){
    axios.delete('/service/fndtn/management/roleResources/'+roleResourceId).then((res)=>{
        dispatch(setFooterMessage('Role resource '+roleResourceId+' has been removed.'));
        loadRoleResources(dispatch, roleId);
    }).catch((error) =>{
        dispatch(setFooterMessage('Unable to remove role resource '+roleResourceId+' from the current role. error: '+error.message));
    });
}

function updateRoleResource(dispatch, method, roleResource){
    var updatedRoleResource = {
        _id:roleResource._id,
        get:roleResource.get,
        put:roleResource.put,
        post:roleResource.post,
        delete:roleResource.delete,
        roleId:roleResource.roleId,
        resourceId:roleResource.resourceId
    };
    updatedRoleResource[method] = !updatedRoleResource[method];
    saveRoleResource(dispatch, updatedRoleResource);
}

function addRoleResource(dispatch, roleId, resource){
    var roleResource = {
        get:false,
        put:false,
        post:false,
        delete:false,
        resourceId:resource._id,
        roleId:roleId};
    saveRoleResource(dispatch, roleResource);
}

function loadAvailableResources(dispatch, search){
     axios.post('/service/fndtn/management/resources/find', search).then ((res) => {
        dispatch(setFooterMessage('Available Resources loaded.'));
        dispatch(setAvailableResources(res.data.resources));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all resources: '+error.response.data.message));
    });
}

function loadAvailableMenus(dispatch, search){
     axios.post('/service/fndtn/management/roles/find', search).then ((res) => {
        dispatch(setFooterMessage('Available Menus loaded.'));
        dispatch(setAvailableMenus(res.data.menus));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all menus: '+error.response.data.message));
    });
}

function loadRoleResources(dispatch, roleId){
     axios.get('/service/fndtn/management/roleResources/findByRoleId/'+roleId).then ((res) => {
        dispatch(setFooterMessage('Role Resources loaded.'));
        dispatch(setRoleResources(res.data.roleResources));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all resources for the selected role: '+error.response.data.message));
    });
}

function addRoleMenu(dispatch, role, menu){
};

function deleteRoleMenu(dispatch, menuId, role){
}

export{
    addRoleMenu,
    addRoleResource,
    deleteRoleMenu,
    deleteRoleResource,
    loadAvailableMenus,
    loadAvailableResources,
    loadRoleResources,
    loadRoles,
    setActiveTab,
    setSelectedRoleId,
    toggleResourceRight,
    updateRoleResource,
}
