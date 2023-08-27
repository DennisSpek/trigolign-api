import express, {Express, Request, Response} from 'express';

const router = express.Router();

// Import routes from separate files
const autoDataRoutes = require('./autodata');
const carRoutes = require('./car');
const orgRoutes = require('./organisation');
const branchRoutes = require('./branch');

// Define routes
//router.use('/autodata', autoDataRoutes);

// Car routes
router.use('/car', carRoutes);

// organisation routes
router.use('/organisation', orgRoutes);

//branch routes
router.use('/branch', branchRoutes);


// Test route
//router.use('/test', testRoutes);

module.exports = router;