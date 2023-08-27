import express, {Request, Response} from 'express'
import {OrganisationController} from '../../controllers/OrganisationController'

const router = express.Router();
const organisationController = new OrganisationController();

router.post('/new', organisationController.createOrganisation);

//router.get('/:id', organisationController.getDetails);

router.get('/:id', organisationController.getDetails);

//router.put('/:id/cars/add', organisationController.addCarToOrganisation);


module.exports = router;