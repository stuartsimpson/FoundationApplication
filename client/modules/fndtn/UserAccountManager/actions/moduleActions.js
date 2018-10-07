/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';

//Actions
import {setFooterMessage} from '../../../core/actions/footerActions';

function setUsers(users){
    return({
        type: 'FNDTN_USER_ACCOUNT_MANAGER_SET_USERS',
        payload: users
    });
}

function editUser(user, index){
    return({
        type: 'FNDTN_USER_ACCOUNT_MANAGER_EDIT_USER',
        payload: {user:user, index:index}
    });
}

function _deleteUser(index){
    return({
        type: 'FNDTN_USER_ACCOUNT_MANAGER_DELETE_USER',
        payload: {index: index}
    });
}

function deleteUser(dispatch, user, index){
    var userId = user._id;
    axios.delete('/services/private/fndtn/users/'+userId).then( (res) => {
        dispatch(_deleteUser(index));
        dispatch(setFooterMessage('User deleted.'));
    }).catch( (error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to delete User: '+error.response.data.message));
    });
}

function loadUsers(dispatch, search){
    axios.post('/services/private/fndtn/userAccountManager/find', search).then ((res) => {
        dispatch(setFooterMessage('Users loaded.'));
        dispatch(setUsers(res.data.users));
    }).catch((error) => {
        console.log(error.response.data);
        dispatch(setFooterMessage('Unable to load all users: '+error.response.data.message));
    });
};

export {loadUsers, deleteUser}

