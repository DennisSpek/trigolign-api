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

        adapter.createManufacturer(car.manufacturer);

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
}