import express, {Express, Request, Response} from 'express';

const router = express.Router();

// Import routes from separate files
const autoDataRoutes = require('./autodata');
const carRoutes = require('./car');

// Define routes
router.use('/autodata', autoDataRoutes);

// Car routes
router.use('/car', carRoutes);

module.exports = router;