var path = require('path');
var winston = require('winston');

const logger = new (winston.Logger)({
  transports: [new (winston.transports.Console)({
        level: 'debug',
        colorize: true,
        timestamp: function () {
            return (new Date()).toISOString();
        }
    })]
});

var root = path.resolve('.');
var env = {
    server: {
        favicon: './public/images/gasPump.jpg',
        loggingLevel: 'dev'
    },
    security: {
        resourceDefaults:{
            _public: false,
            _protected: false,
            _static:true
        }
    },
    logger: logger,
    path:{
        root:root,
        modules:{},
        routes:path.join(root,'routes'),
        views:path.join(root,'views'),
        public:path.join(root,'public'),
        templateCompiler:path.join(root,'modules/templateCompiler'),
        templateSource:path.join(root,'/views/templates'),
        help:path.join(root,'views/help'),
        certificates: path.join(root,'certificates')
    },
    collections:{
        resources:"fndtnResources",
        roles:"fndtnRoles",
        menus:"fndtnMenus",
        roleRoles:"fndtnRoleRoles",
        roleResources:"fndtnRoleResources",
        roleMenus:"fndtnRoleMenues",
        swaggerStorage:"swaggerStorage",
        templates:"fndtnTemplates",
        lov:"fndtnLOV",
        users:"fndtnUsers",
        accessControl: "fndtnAccessControl",
        applicationErrors: "fndtnApplicationErrors"
    },
    models:{
        resources: "Resource",
        roles: "Role",
        lov: "ListOfValue",
        users: "User",
        accessControl: "AccessControl",
        applicationErrors: "ApplicationError"
    },
    host: "127.0.0.1",
    port: "3000",
    reCaptcha:{
        siteKey:"<SiteKey>",
        secretKey: "<secretKey>",
        verifyURL: "https://www.google.com/recaptcha/api/siteverify"
    },
    mongo:{
            "host":"127.0.0.1",
            "db":"GasNGoReact",
            "port":"27017"
    },
    jwt:{
            secret:"tonkesecure",
            algorithm: 'HS512',
            expiration:1500,  //in
            privateCertFile: "private.ppk",
            publicCertFile: "public"
    },
    email:{
        smtp:{
            host:'<smtphost>',
            port:587,
            secure:false,
            auth:{
                user: '<smtp authentication user>',
                pass: '<smtp authentication password>'
            },
            tls:{
                rejectUnauthorized: false
            }
        },
        verification:{
            useEmail: true,
            from:'<fromEmailAddress>',
            host:'<VarificationServiceHostName>',
            port:3000,
            protocol:'<VarificationServiceProtocol: http or https>',
            service:'/services/public/user/registration/verify/user/'
        }
    },
    sms:{
        provider:{
            name:'Twilio',
            number:'<TwilioNumber>',
            accountId:'<TwilioAccountId>',
            authToken:'<TwilioAuthToken>'
        },
        verification:{
            useSMS: true,
            message:'Verification Code: '
        }
    },
    app:{},

    setAttribute:function setAttribute(key, value){
        var list = key.split('.');
        // define all sub objects in key if they do not exist and find the
        // lowest level object reference
        var schema = this;
        for( var i=0; i<list.length-1; i++ ){
            if(!this[list[i]]){
                this[list[i]] = {};
            }
            schema = schema[list[i]];
        }

        schema[list[list.length-1]] = value;
    }
};

module.exports.env = env;
