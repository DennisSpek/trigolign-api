import express, {Express, Request, Response} from 'express';
import { dataSource } from "./database/data-source"

import * as dotenv from 'dotenv' 
dotenv.config();

const routes = require('./routes');
const app:Express = express();
const port = process.env.port || 3000;

//AUTH FUNCTION IN MIDDLEWARE/AUTH
const apiKey: string = process.env.API_KEY_APPLICATION || 'default_key';

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})