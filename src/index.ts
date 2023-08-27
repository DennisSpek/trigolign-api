import express, {Express, Request, Response} from 'express';
import { DatabaseAdapter } from "./database/adapter"

import cookieParser from 'cookie-parser'


import * as dotenv from 'dotenv' 
dotenv.config();

const routes = require('./routes');
const login = require('./routes/login');

const app:Express = express();
const port = process.env.port || 3000;

//AUTH FUNCTION IN MIDDLEWARE/AUTH
const apiKey: string = process.env.API_KEY_APPLICATION || 'default_key';
const adapter = DatabaseAdapter();

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/login', login);

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})