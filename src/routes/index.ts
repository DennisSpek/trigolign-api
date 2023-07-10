import express, {Express, Request, Response} from 'express';

const router = express.Router();

// Import routes from separate files
const autoDataRoutes = require('./autodata');
const carRoutes = require('./car');
const orgRoutes = require('./organisation');

// Define routes
//router.use('/autodata', autoDataRoutes);

// Car routes
router.use('/car', carRoutes);

//
router.use('/organisation', orgRoutes);

// Test route
//router.use('/test', testRoutes);

module.exports = router;