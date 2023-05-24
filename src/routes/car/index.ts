import express, {Request, Response} from 'express'
import { CarController } from '../../controllers/CarController';

const router = express.Router();
const carController = new CarController();

router.get('/:vrm', carController.getDetailsByVRM);

module.exports = router;