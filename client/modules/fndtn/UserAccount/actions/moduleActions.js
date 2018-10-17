/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';

import {setFooterMessage} from 'Core/actions/footerActions';

const DateTimeFormat = new Intl.DateTimeFormat('en-US', {day: "numeric", month: "long", year: "numeric"});

function setUser(user){
    return{
        type: 'FNDTN_USER_ACCOUNT_SET_USER',
        payload: user
    };
}

function saveName(name){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_NAME",
        payload: name
    };
}

function saveJob(job){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_JOB",
        payload: job
    };
}

function saveUsername(username){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_USERNAME",
        payload: username
    };
}

function savePhone(phone, index){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_PHONE",
        payload: {phone: phone, index: index}
    };
}

function deletePhone(index){
    return {
        type: "FNDTN_USER_ACCOUNT_DELETE_PHONE",
        payload: {index: index}
    };
}

function saveEmailAddress(email, index){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_EMAIL_ADDRESS",
        payload: {email: email, index: index}
    };
}

function deleteEmailAddress(index){
    return {
        type: "FNDTN_USER_ACCOUNT_DELETE_EMAIL_ADDRESS",
        payload: {index: index}
    };
}

function saveAddress(address, index){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_ADDRESS",
        payload: {address: address, index: index}
    };
}

function deleteAddress(index){
    return {
        type: "FNDTN_USER_ACCOUNT_DELETE_ADDRESS",
        payload: {index: index}
    };
}

function saveDate(event, index){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_DATE",
        payload: {event: event, index: index}
    };
}

function deleteDate(index){
    return {
        type: "FNDTN_USER_ACCOUNT_DELETE_DATE",
        payload: {index: index}
    };
}

function saveBirthday(birthday){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_BIRTHDAY",
        payload: birthday
    };
}

function savePassword(password){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_PASSWORD",
        payload: password
    };
}

function saveWebsite(website, index){
    return {
        type: "FNDTN_USER_ACCOUNT_SAVE_WEBSITE",
        payload: {website: website, index: index}
    };
}

function deleteWebsite(index){
    return {
        type: "FNDTN_USER_ACCOUNT_DELETE_WEBSITE",
        payload: {index: index}
    };
}

function loadUser(dispatch, id){
    var service = '/services/private/fndtn/users';
    if(id){
        service = '/services/private/fndtn/userAccountManager/'+id;
    }
    
    axios.get(service).then ((res) => {
        dispatch(setFooterMessage('User loaded.'));
        dispatch(setUser(res.data.user));
    }).catch((error) => {
        console.log(error);
        dispatch(setFooterMessage('Unable to load user: '+error.message));
    });
}

export {
    saveName,
    saveJob,
    saveUsername,
    savePhone,
    deletePhone ,
    saveEmailAddress,
    deleteEmailAddress,
    saveAddress,
    deleteAddress,
    saveDate,
    deleteDate,
    saveBirthday,
    savePassword,
    saveWebsite,
    deleteWebsite,
    loadUser
};