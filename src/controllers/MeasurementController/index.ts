import { Request, Response } from 'express';
import { DatabaseAdapter } from '../../database/adapter';

const adapter = DatabaseAdapter();

export class MeasurementController {
  postMeasurement = async (req: Request, res: Response) => { 
    try {
      const measurement = await adapter.createMeasurement(req.body);

      res.status(200).send(measurement);
    } catch(error) {
      res.status(500).send({"error": error});
    }
  }
}