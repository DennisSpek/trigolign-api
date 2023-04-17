import express, {Express, Request, Response} from 'express';

import * as dotenv from 'dotenv' 
dotenv.config();

const routes = require('./routes');
const app:Express = express();
const port = process.env.port || 3000;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})