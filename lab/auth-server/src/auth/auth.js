'use strict';

import auth0 from 'auth0-js';



export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'jamesdenton.auth0.com',
        clientID: 'XfHtv7noWVOvQdhzOTVCz3i4tnvhN2c9',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login() {
        this.auth0.authorize();
    }
}