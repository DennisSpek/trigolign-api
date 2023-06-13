import express, {Express, Request, Response} from 'express';

const router = express.Router();

// Import routes from separate files
const autoDataRoutes = require('./autodata');
const carRoutes = require('./car');

//DONT FORGET TO REMOVE THIS ONCE DONE
//const testRoutes = require('./test');

// Define routes
//router.use('/autodata', autoDataRoutes);

// Car routes
router.use('/car', carRoutes);

// Test route
//router.use('/test', testRoutes);

module.exports = router;