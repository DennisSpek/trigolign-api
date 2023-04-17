import express, {Request, Response} from 'express'
import {AutoDataController} from '../../controllers/AutoDataController'

const router = express.Router();
const autoDataController = new AutoDataController();

router.get('/plate/:id', autoDataController.getDetailsByPlate);

router.get('/wheel-data/:mid', autoDataController.getWheelDataIdByMID);

router.get('/wheel-data/:mid/:variant_id', autoDataController.getWheelData);

module.exports = router;