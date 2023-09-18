import express, {Request, Response} from 'express'
import { AuthController } from '../../controllers/AuthController';

const router = express.Router();
const authController = new AuthController();

router.post('*', authController.register);

module.exports = router;