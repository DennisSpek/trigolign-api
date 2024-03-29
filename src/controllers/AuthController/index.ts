import { Request, Response } from 'express';
import { DatabaseAdapter } from '../../database/adapter';

const adapter = DatabaseAdapter();

export class AuthController {
  register = async (req: Request, res: Response) => {
    const { pass, email } = req.body;

    try {
      if(pass && email){
        const user = await adapter.registerUser(email, pass);

        res.status(200).send(user);
      }
    } catch(error) {

    }
  } 

  logIn = async (req: Request, res: Response) => {
    const { pass, email } = req.body;

    //dennis
    //test123

    try {
      if(pass && email){
        const user = await adapter.getUser(email, pass);

        res.status(200).send(user);
      }
    } catch(error) {
       res.status(500).send(error);
    }
  }   
}