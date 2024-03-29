import { Request, Response } from 'express';
import { DatabaseAdapter } from '../../database/adapter';

const adapter = DatabaseAdapter();

export class OrganisationController {

  createOrganisation = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
      const result = await adapter.createOrganisation(name);

      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({message: 'Something went wrong', error});
    }
  }

  getDetails = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const details = await adapter.getOrganisation(id);

      res.status(200).send(details)
    } catch (error) {
      res.status(500).send({message: 'Something went wrong', error});
    }
  }

  getCars = async (req: Request, res: Response) => {
    //get all cars assigned to org
    try {
      const cars = await adapter.getCarsByOrganisation('Test');

      res.status(200).send(cars)
    } catch (error) {
      res.status(500).send({message: 'Something went wrong', error});
    }
  }

  addCarToOrganisation = async (req: Request, res: Response) => {
    //add carts to org based on numberplate
  }
}