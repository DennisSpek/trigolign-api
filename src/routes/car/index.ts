import express, {Request, Response} from 'express'
import { CarController } from '../../controllers/CarController';
import { MeasurementController } from '../../controllers/MeasurementController';


const router = express.Router();
const carController = new CarController();
const measurementController = new MeasurementController();


router.get('/:vrm', carController.getDetailsByVRM);

router.get('/id/:id', carController.getCar);

router.post('/post', carController.postCar);

router.post('/measurement/post', measurementController.postMeasurement)

router.get('/technical/:mid/suspension/:alignment_id', carController.getWheelAlignmentByMID);

module.exports = router;