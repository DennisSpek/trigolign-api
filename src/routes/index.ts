import express, {Express, Request, Response} from 'express';

const router = express.Router();

// Import routes from separate files
const autoDataRoutes = require('./autodata');

// Define routes
router.use('/autodata', autoDataRoutes);

module.exports = router;