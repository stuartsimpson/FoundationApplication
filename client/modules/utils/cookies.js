var Cookie = {
    get: (name) => {
        var list = document.cookie.split(';');
        var cookies = {};
        for( var i=0; i<list.length; i++){
            cookies[list[i].split('=')[0].trim()] = list[i].split('=')[1];
        }
        return( cookies[name] );
    },
    set: (name, value, options) => {
        document.cookie = name+'='+value;
    },
    delete: (name) => {
        document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
};

export default Cookie;
