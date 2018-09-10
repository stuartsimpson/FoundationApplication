var fs = require('fs');
var config = require('../config');

module.exports = {
    parsePrivate: function () {
        var fileText = fs.readFileSync(config.env.path.certificates + "/" + config.env.jwt.privateCertFile, 'utf8');
        var certFile = fileText.split("\r\n");
        var cert = {};

        certFile.forEach(function (line, index) {
            if(line.includes('Public-Lines')) {
                var kvp = line.split(':');
                var numLines = parseInt(kvp[1]);
                var certText = "";
                for (var i = index += 1; i < index + numLines; i++) {
                    certText += certFile[i];
                }
                cert["public"] = certText;
            } else if(line.includes('Private-Lines')){
                var kvp = line.split(':');
                var numLines = parseInt(kvp[1]);
                var certText = "";
                for (var i = index += 1; i < index + numLines; i++) {
                    certText += certFile[i];
                }
                cert["private"] = certText;
            } else if(line.includes(':')){
                var kvp = line.split(':');
                cert[kvp[0]] = kvp[1];
            }
        });

        return(cert);
    }
};
