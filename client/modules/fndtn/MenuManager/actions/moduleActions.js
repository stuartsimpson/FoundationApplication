/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';

//Actions
import {setFooterMessage} from 'Core/actions/footerActions';

function setMenus(menus){
    return({
        type: 'FNDTN_MENU_MANAGER_SET_MENUS',
        payload: menus
    });
}

function setFormValue(field, value){
    return({
        type: 'FNDTN_MENU_MANAGER_SET_FORM_VALUE',
        payload: {field:field, value: value}
    });
}

function editMenu(menu, index){
    return({
        type: 'FNDTN_MENU_MANAGER_EDIT_MENU',
        payload: {menu:menu, index:index}
    });
}

function clearForm(){
    return({
        type: 'FNDTN_MENU_MANAGER_CLEAR_FORM'
    });
}

function cancelEdit(){
    return({
        type: 'FNDTN_MENU_MANAGER_CANCEL_EDIT'
    });
}

function _saveMenu(menu, index){
    return({
        type: 'FNDTN_MENU_MANAGER_SAVE_MENU',
        payload: {menu: menu, index: index}
    });
}

function _deleteResource(index){
    return({
        type: 'FNDTN_MENU_MANAGER_DELETE_MENU',
        payload: {index: index}
    });
}

function saveMenu(dispatch, menu, index){
    axios.post('/service/fndtn/management/menus', menu).then( (res) => {
        dispatch(_saveMenu(menu, index));
        dispatch(clearForm());
        dispatch(cancelEdit());
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to save menu: '+error.response.data.message));
    });
}

function deleteMenu(dispatch, menu, index){
    var menuId = menu._id;
    axios.delete('/service/fndtn/management/menus/'+menuId).then( (res) => {
        dispatch(_deleteMenu(index));
        dispatch(setFooterMessage('Menu deleted.'));
    }).catch( (error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to delete menu: '+error.response.data.message));
    });
}

function loadMenus(dispatch, search){
    axios.post('/service/fndtn/management/menus/find', search).then ((res) => {
        dispatch(setFooterMessage('Menus loaded.'));
        dispatch(setMenus(res.data.menus));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all menus: '+error.response.data.message));
    });
};

export {loadMenus, setFormValue, editMenu, saveMenu, cancelEdit, deleteMenu, clearForm}
