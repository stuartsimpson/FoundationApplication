/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';
import store from '../store';

const defaultState = {user:{}};

var moduleReducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'FNDTN_USER_ACCOUNT_SET_USER': {
            newState.user = action.payload;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_NAME':{
            newState.user.name = action.payload;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_JOB':{
            newState.user.job = action.payload;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_USERNAME':{
            newState.user.account.username = action.payload;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_PHONE':{
            if(action.payload.index >= 0){
                newState.user.phones[action.payload.index] = action.payload.phone;
            } else {
                newState.user.phones.push(action.payload.phone);
            }
            break;
        }
        case 'FNDTN_ACCOUNT_DELETE_PHONE':{
            var phones = newState.user.phones.slice();
            phones.splice(action.payload.index, 1);
            newState.user.phones = phones;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_EMAIL_ADDRESS':{
            if(action.payload.index >= 0){
                newState.user.emails[action.payload.index] = action.payload.email;
            } else {
                newState.user.emails.push(action.payload.email);
            }
            break;
        }
        case 'FNDTN_USER_ACCOUNT_DELETE_EMAIL_ADDRESS':{
            var emails = newState.user.emails.slice();
            emails.splice(action.payload.index, 1);
            newState.user.emails = emails;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_ADDRESS':{
            if(action.payload.index >= 0){
                newState.user.addresses[action.payload.index] = action.payload.address;
            } else {
                newState.user.addresses.push(action.payload.address);
            }
            break;
        }
        case 'FNDTN_USER_ACCOUNT_DELETE_ADDRESS':{
            var addresses = newState.user.addresses.slice();
            addresses.splice(action.payload.index, 1);
            newState.user.addresses = addresses;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_DATE':{
            if(action.payload.index >= 0){
                newState.user.eventDates[action.payload.index] = action.payload.event;
            } else {
                newState.user.eventDates.push(action.payload.event);
            }
            break;
        }
        case 'FNDTN_USER_ACCOUNT_DELETE_DATE':{
            var eventDates = newState.user.eventDates.slice();
            eventDates.splice(action.payload.index, 1);
            newState.user.eventDates = eventDates;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_BIRTHDAY':{
            newState.user.birthday = action.payload;
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_PASSWORD':{
            //TODO need to create and call service for updating account password
            console.log('//TODO need to create and call service updatePassword');
            break;
        }
        case 'FNDTN_USER_ACCOUNT_SAVE_WEBSITE':{
            if(action.payload.index >= 0){
                newState.user.websites[action.payload.index] = action.payload.website;
            } else {
                newState.user.websites.push(action.payload.website);
            }
            break;
        }
        case 'FNDTN_USER_ACCOUNT_DELETE_WEBSITE':{
            var websites = newState.user.websites.slice();
            websites.splice(action.payload.index, 1);
            newState.user.websites = websites;
            break;
        }
    }
    return(newState);
};

export default moduleReducer;