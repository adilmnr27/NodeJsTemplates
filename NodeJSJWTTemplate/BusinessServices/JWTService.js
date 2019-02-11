"use strict";
const jwt = require('jsonwebtoken'); //For token management
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
module.exports = function () {
    var jwtService = {};

    /**
     * Generates a jwt token when the user logs in
     * @param {user json} user The user data sent which will be used as payload for generating token
     * @returns token generated if there are no errors.
     */
    jwtService.generateToken = function (user) {
        try {
            const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
            return token;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Verifies the token which user has sent.
     * @param {string} token the token sent by the user
     * @param {string} authorizationRole The role against which the authorization should be done
     * @returns false if authentication or authorization fails else returns true 
     */
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

    /**
     * Authenticates the user but does not check the authorization
     * @param {string} token the token which the user has sent which needs to be authenticated
     * @returns returns false if authentication fails and payload if authentication succeeds 
     */
    jwtService.authenticateUser = function (token) {
        try {
            const authorizedData = jwt.verify(token, secretKey);
            return authorizedData;
        } catch (error) {
            console.log(error.message);
            return false;
        }

    };

    /**
     * Checks the authorization. This method is called only after user has been authenticated
     * @param {string} userRole The role which the payload sent by the user contains
     * @param {string} authorizationRole The role which the user should have to gain authorization
     * @returns true if the role matches else false
     */
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
