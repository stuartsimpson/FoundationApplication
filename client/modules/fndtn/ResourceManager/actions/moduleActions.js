/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';

//Actions
import {setFooterMessage} from 'Core/actions/footerActions';

function cancelEdit(){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_CANCEL_EDIT'
    });
}

function clearForm(){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_CLEAR_FORM'
    });
}

function closeResourcePicker(){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_CLOSE_RESOURCE_PICKER'
    });
}

function _deleteResource(index){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_DELETE_RESOURCE',
        payload: {index: index}
    });
}

function deleteResource(dispatch, resource, index){
    var resourceId = resource._id;
    axios.delete('/service/fndtn/management/resources/'+resourceId).then( (res) => {
        dispatch(_deleteResource(index));
        dispatch(setFooterMessage('Resource deleted.'));
    }).catch( (error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to delete resource: '+error.response.data.message));
    });
}

function editResource(resource, index){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_EDIT_RESOURCE',
        payload: {resource:resource, index:index}
    });
}

function _loadDirecotryList(dirList, indexPath){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_LOAD_DIRECTORY_LIST',
        payload: { directoryList:dirList, indexPath:indexPath}
    });
}

function loadDirecotryList(dispatch, path, indexPath){
    axios.get('/service/fndtn/management/listServicePackages/' + path.replace(/\//g,'.')).then((res) =>{
        dispatch(_loadDirecotryList(res.data, indexPath));
    }).catch((error) => {
        dispatch(setFooterMessage('Unable to load directory listing for path:'+path+' indexPath: '+indexPath+' error:'+error.message));
    });
}

function loadResources(dispatch, search){
    axios.post('/service/fndtn/management/resources/find', search).then ((res) => {
        dispatch(setFooterMessage('Resources loaded.'));
        dispatch(setResources(res.data.resources));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all resources: '+error.response.data.message));
    });
};

function openCloseDirectory(indexPath){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_OPEN_CLOSE_DIRECTORY',
        payload: {indexPath: indexPath}
    });
}

function openResourcePicker(){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_OPEN_RESOURCE_PICKER'
    });
}

function _saveResource(resource, index){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_SAVE_RESOURCE',
        payload: {resource: resource, index: index}
    });
}

function saveResource(dispatch, resource, index){
    axios.post('/service/fndtn/management/resources', resource).then( (res) => {
        dispatch(_saveResource(resource, index));
        dispatch(clearForm());
        dispatch(cancelEdit());
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to save resource: '+error.response.data.message));
    });
}

function setDirRoot(rootDir){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_SET_DIR_ROOT',
        payload:{rootDir:rootDir}
    });
}

function setFormValue(field, value){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_SET_FORM_VALUE',
        payload: {field:field, value: value}
    });
}

function setResources(resources){
    return({
        type: 'FNDTN_RESOURCE_MANAGER_SET_RESOURCES',
        payload: resources
    });
}

export {
    cancelEdit,
    clearForm,
    closeResourcePicker,
    deleteResource,
    editResource,
    loadDirecotryList,
    loadResources,
    openCloseDirectory,
    openResourcePicker,
    saveResource,
    setFormValue,
    setDirRoot
}
