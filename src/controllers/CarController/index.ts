import { Request, Response } from 'express';
import { AutoDataController } from '../../controllers/AutoDataController';
import { DatabaseAdapter } from '../../database/adapter';

interface wheelDetails {
  camber: string;
  toe: string;
}

interface WheelSettings {
  front: wheelDetails;
  rear: wheelDetails;
}

interface Suspension {
  name: string;
  wheelsetting: WheelSettings
}

interface Car {
  manufacturer: string;
  model: string;
  mid: string;
  suspension: Suspension[]
}

const autoDataController = new AutoDataController();
const adapter = DatabaseAdapter();

export class CarController {

  getDetailsByVRM = async (req: Request, res: Response) => {
    const { vrm } = req.params;

    try {
      const { data } = await autoDataController.getDetailsByPlate(vrm);

      if (data && data.length > 0) {
        const car: Car = {
          manufacturer: data[0].manufacturer || '',
          model: data[0].model || '',
          mid: data[0].mid || '',
          suspension: [],
        };

       

        const manufacturer = await adapter.createManufacturer(car.manufacturer);

        const trigolignId = '74645c37-0494-4193-bf5b-da8a87cc226b'

        await adapter.createCar({model: car.model, registration: vrm, manufacturer: manufacturer.name, organisation: trigolignId, suspension:"" });

        if(car.mid){

          const {data: suspension} = await autoDataController.getWheelDataIdByMID(car.mid);

          car.suspension = suspension;

          res.send(car);
        }
      } else {
        res.status(404).send({message: 'No data found'});
      }
    } catch (error) {
      res.status(500).send({message: 'Something went wrong'});
    }
  }

  getWheelAlignmentByMID = async (req: Request, res: Response) => { 
    const { mid, alignment_id } = req.params;

    try {
      const { data } = await autoDataController.getWheelAlignmentData(mid, alignment_id);

      if (data) {
        res.send(data);
      } else {
        res.status(404).send({message: 'No data found'});
      }
    } catch (error) {
      res.status(500).send({message: 'Something went wrong'});
    }
  }
}