var config = require('../config');

var acl = {
    accessControlList: {},

    getResourceId: function(url){
        var list = ('root'+url).split('/');
        var acl = this.accessControlList;

        for (var i = 0; i<list.length; i++){
            if(acl[list[i]]){
                acl = acl[list[i]];
                if( i === list.length-1 ){
                    return (acl);
                }
            } else if (acl._id){
                return (acl);
            } else {
                return (config.env.security.resourceDefaults);
            }
        }

        return (config.env.security.resourceDefaults);
    },

    addResourceToACL: function (key, value) {
        var url = 'root'+key;
        if (url.substr(url.length-1) === "/"){
            url = url.substring(0,url.length-1);
        }

        var list = url.split('/');
        // define all sub objects in key if they do not exist and find the
        // lowest level object reference
        var schema = this.accessControlList;
        for (var i = 0; i < list.length; i++) {
            if (!schema[list[i]]) {
                schema[list[i]] = {};
            }
            schema = schema[list[i]];
        }

        schema["_id"] = value._id;
        schema["_static"] = value._static;
        schema["_public"] = value._public;
        schema["_protected"] = value._protected;
    }
};

module.exports = acl;
