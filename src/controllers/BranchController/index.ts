import { Request, Response } from 'express';
import { DatabaseAdapter } from '../../database/adapter';

const adapter = DatabaseAdapter();

export class BranchController {
  createBranch = async (req: Request, res: Response) => {
    const { name, userId } = req.body

    try {
      const result = await adapter.createBranch(name);
      let user;

      if(result){
        //updating user with proper branch ID
        user = await adapter.updateUser({branch: result.id}, userId);
      }

      console.log("user", user)

      res.status(200).send(user)
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
    //get all cars assigned to branch
    const { id } = req.params

    try {
      const cars = await adapter.getCarsByBranch(id);

      res.status(200).send(cars)
    } catch (error) {
      res.status(500).send({message: 'Something went wrong', error});
    }
  }

  addCarToOrganisation = async (req: Request, res: Response) => {
    //add carts to org based on numberplate
  }
}