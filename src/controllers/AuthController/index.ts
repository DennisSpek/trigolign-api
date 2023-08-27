import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { DatabaseAdapter } from '../../database/adapter';

const adapter = DatabaseAdapter();

export class AuthController {
  register = async (req: Request, res: Response) => {
    const { pass, email } = req.body;

    //becrypt 12 salt

    try {
      if(pass && email){
        const user = await adapter.getUser(email, pass);

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

        const token = jwt.sign({user}, 'agHfINQsIQs1xQ105dLDoy16dxqW+pVRHl+jnV+thCE=');

        res.cookie('user_session', token, {path: '/', httpOnly: false, sameSite: 'none'});

        res.status(200).send(user);
      }
    } catch(error) {
       res.status(500).send(error);
    }
  }   
}