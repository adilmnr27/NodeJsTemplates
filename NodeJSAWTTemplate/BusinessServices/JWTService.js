"use strict";
const jwt = require('jsonwebtoken'); //For token management
module.exports = function () {
    var jwtService = {};

    jwtService.generateToken = function (user) {
        /*
        jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.log(err);
            }
            return (token);
        });
        //TODO need to find a solution for async methods
        */
        try {
            const token = jwt.sign({ user }, 'privateKey', { expiresIn: '1h' });
            return token;
        } catch (err) {
            console.log(err);
        }
    }

    jwtService.verifyUser = function (token, authorizationRole) {
        if (!this.authenticateUser(token)) {
            console.log("Authentication failed");
            return false;
        };

        console.log("User Authenticated");
        const authorizedData = this.authenticateUser(token);
        if (!this.checkAuthorization(authorizationRole, authorizedData.user.role)) {
            console.log("User not authorized")
            return false;
        }
        console.log("User Authorized");
        return true;
    };

    jwtService.authenticateUser = function (token) {

        /*
        //verify the jwt token generated for the user
        jwt.verify(token, 'privatekey', (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                return authorizedData;

            }
        })
        */
        try {
            const authorizedData = jwt.verify(token, 'privateKey');
            return authorizedData;
        } catch (error) {
            console.log(error.message);
            return false;
        }

    };

    jwtService.checkAuthorization = function (userRole, authorizationRole) {
        console.log(userRole);
        if (userRole !== authorizationRole) {
            return false;
        }
        else {
            return true;
        }

    };

    return jwtService;

}
