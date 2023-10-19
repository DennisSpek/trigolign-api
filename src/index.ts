import express, {Express, Request, Response} from 'express';

import cookieParser from 'cookie-parser'


import * as dotenv from 'dotenv' 
dotenv.config();

const https = require('https');
const http = require('http')
const path = require('path');

const fs = require('fs');


const routes = require('./routes');
const login = require('./routes/login');
const register = require('./routes/register');

const options = {
  key: process.env.ENV != 'development' && fs.readFileSync('/etc/letsencrypt/live/api.trigolign.com/privkey.pem'),
  cert: process.env.ENV != 'development' && fs.readFileSync('/etc/letsencrypt/live/api.trigolign.com/cert.pem'),
};

const app:Express = express();
const port = process.env.PORT || 3000;
const env = process.env.ENV;

//AUTH FUNCTION IN MIDDLEWARE/AUTH
const apiKey: string = process.env.API_KEY_APPLICATION || 'default_key';

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Credentials","true");
  next();
});

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/login', login);
app.use('/register', register);
app.get('/', async (req, res) => res.json(`API is running on port: ${process.env.PORT}`))

process.env.ENV == 'development' ? 
  http.createServer(app).listen(port, () => {
   console.log(`Server running at port ${port}.  ${fs.readFileSync('/etc/letsencrypt/live/api.trigolign.com/privkey.pem')}`)
  }) 
  : 
  https.createServer(options, app).listen(port, () => {
   console.log(`Server running at port ${port}. ${options}`)
  });
