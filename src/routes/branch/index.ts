import express, {Request, Response} from 'express'
import { BranchController } from '../../controllers/BranchController'

const router = express.Router();
const branchController = new BranchController();

router.post('/new', branchController.createBranch);

router.get('/:id', branchController.getDetails);

router.get('/:id/cars', branchController.getCars);

//router.put('/:id/cars/add', organisationController.addCarToOrganisation);


module.exports = router;