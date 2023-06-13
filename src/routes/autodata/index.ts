import express, {Request, Response} from 'express'
import { AutoDataController } from '../../controllers/AutoDataController'

const router = express.Router();
const autoDataController = new AutoDataController();

router.get('/car-details/:id', autoDataController.getDetailsByPlate);

module.exports = router;