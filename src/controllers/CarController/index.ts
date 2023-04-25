import { Request, Response } from 'express';
import { AutoDataController } from '../../controllers/AutoDataController';

interface wheelDetails {
  camber: string;
  toe: string;
}

interface Wheels {
  front: wheelDetails;
  rear: wheelDetails;
}

interface Car {
  manufacturer: string;
  model: string;
  mid: string;
  wheels: Wheels;
}

const autoDataController = new AutoDataController();

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
          wheels: { front: { camber: '', toe: ''}, rear: { camber: '', toe: ''} }
        };

        if (data[0].mid) {
          const { data: wheelSettings } = await autoDataController.getWheelDataIdByMID(car.mid);

          if(wheelSettings.length == 1){

            const { data: wheelData } = await autoDataController.getWheelData(car.mid, wheelSettings[0].wheel_alignment_id);

            car.wheels = {
              front: {
                camber: wheelData.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Front camber" && i.units === "deg") || '',
                toe: wheelData.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Front toe-in" && i.units === "deg") || '',
              },
              rear: {
                camber: wheelData.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Rear camber" && i.units === "deg"),
                toe: wheelData.wheel_alignment_groups[3].technical_data_items.find((i: any) => i.description === "Rear toe-in" && i.units === "deg"),
              }
            };

            res.send(car);
          }
        }
      } else {
        res.send('No data found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  }
}
