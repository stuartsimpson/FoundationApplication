/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from 'axios';
import Validation from 'Utils/Validation';
import navigate from 'Core/actions/navigationActions';

function setFieldErrorText(attribute, value){
    return({
        type: 'FNDTN_REGISTRATION_SET_FIELD_ERROR_TEXT',
        payload: {attribute: attribute, value: value}
    });
}

function setFieldValue(attribute, value){
    return({
        type: 'FNDTN_REGISTRATION_SET_FIELD_VALUE',
        payload: {attribute: attribute, value: value}
    });
}

function validateForm(dispatch, attribute, form){
    //ToDo validate first
    //ToDo validate last
    //ToDo validate username
    //ToDo validate email
    //ToDo validate password
    //ToDo validate phone
}

function registerUser(disptach, user){
    axios.post('/services/public/user/registration/register/user', user)
        .then( (res) => {
            console.log(res.data.message);

        })
        .catch( (error) => {
            console.log(error);
        });
}

function userAvailable(dispatch, username){
    var minLength = 4;
    var maxLength = 32;

    var valid = new RegExp('^[a-z](?:\w*(?:[\.\-_]\w+)?)').test(username);
    var between = (username.length>=minLength)&&(username.length<=maxLength);
    if(valid && between){
        axios.get('/services/public/user/registration/available/'+username)
            .then( (res) => {
                if(res.data.available){
                    dispatch(setFieldErrorText('username',null));
                } else {
                    dispatch(setFieldErrorText('username','Username unavailable'));
                }
            })
            .catch( (error) => {
                dispatch(setFieldErrorText('username','Unable to validate username'));
            });
    } else {
        dispatch(setFieldErrorText('username','Username format invalid.'));
    }
}

function emailUsed(dispatch, email){
    var valid = Validation.email(email);
    if(valid){
        axios.get('/services/public/user/registration/emailUsed/'+email)
            .then( (res) => {
                if(!res.data.used){
                    dispatch(setFieldErrorText('email',null));
                } else {
                    dispatch(setFieldErrorText('email','E-Mail already in use'));
                }
            })
            .catch( (error) => {
                dispatch(setFieldErrorText('email','E-Mail usage not verified'));
            });
    } else {
        dispatch(setFieldErrorText('email','E-mail format invalid.'));
    }
}

export {
    userAvailable,
    setFieldValue,
    validateForm,
    setFieldErrorText,
    emailUsed,
    registerUser
}
