const reqCountSpecial = 1;
const reqCountUpper = 1;
const reqCountLower = 1;
const reqCountNumber = 1;
const reqLength = 8;

var Validation = {
    email: function( email ){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test(email);
        return(valid);
    },
    phone: function( phone, format ){
        console.log('ToDo: need to complete ReduxValidation.phone');
        return(true);
    },
    equal: function( value1, value2 ){
        return(value1 === value2);
    },
    date: function( date, format ){
        console.log('ToDo: need to complete ReduxValidation.equal');
        return(true);
    },
    password: function( password ){
        var special = ((password.match(/([!"#$%&\'()*+,\-\./:;<=>?@[\]\\^_`{|}~])/g) || []).length >= reqCountSpecial);
        var upper = ((password.match(/[A-Z]/g) || []).length >= reqCountUpper);
        var lower = ((password.match(/[a-z]/g) || []).length >= reqCountLower);
        var number = ((password.match(/[0-9]/g) || []).length >= reqCountNumber);
        var length = (password.length >= reqLength);
        return(special && upper && lower && number && length);
    }
};

export default Validation;
