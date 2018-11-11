'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import authRouter from './auth/router.js';
import auth from './auth/middleware.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());  // => req.body
app.use(express.urlencoded({extended:true})); // req.body => from a form's key value pairs
app.use(cookieParser());

app.use(authRouter);

app.get('/', auth(), (req,res) => {
  res.send('You Got In');
});

app.use(notFound);
app.use(errorHandler);

let server = false;

// app.js

var session = require('express-session');

// config express-session
var sess = {
  secret: 'CHANGE THIS SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));




// app.js

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
            process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);


passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// storing and retriving data


// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = {
  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log('Server running on', port);
      });
    }
    else {
      console.log('Server is already running');
    }
  },

  stop: () => {
    server.close( () => {
      console.log('Server is now off');
    });
  },
};


