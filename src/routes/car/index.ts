import express, {Request, Response} from 'express'
import { CarController } from '../../controllers/CarController';

const router = express.Router();
const carController = new CarController();

router.get('/:vrm', carController.getDetailsByVRM);

router.get('/id/:id', carController.getCar);

router.post('/post', carController.postCar);

router.get('/technical/:mid/suspension/:alignment_id', carController.getWheelAlignmentByMID);

module.exports = router;