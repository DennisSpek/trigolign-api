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

    try {
      if(pass && email){
        const user = await adapter.getUser(email, pass);

        if(user){
          const sessionId = await adapter.createSession(user.id, req);

          res.status(200).send({user, sessionId});
        } else {
          res.status(200).send(user);
        }
      }
    } catch(error) {
      res.status(500).send(error);
    }
  }   

  verifySession = async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    
    try {
      const user = await adapter.getUserBySessionId(sessionId);

      if(user){
        res.status(200).send(user);
      } else {
        res.status(200).send({message: "session invalid"});
      }
    } catch(error) {
      res.status(500).send(error);
    }
  }
}