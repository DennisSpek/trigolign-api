import { MeasurementSetting } from "../../entities/measurement-settings.entity";
import { MeasurementToe } from '../../entities/measurement-toe.entity';
import { MeasurementCamber } from '../../entities/measurement-camber.entity';
import { Measurement } from "../../entities/measurement.entity"
import { calculateToe as calculateToeDecimalDegrees } from "../../../lib/measurements/toe/decimalDegrees"

import { calculateCamber } from "../../../lib/measurements/camber"

export const MeasurementClass = (m: any) => {

  return {
    async createMeasurement(data: any){
      let toeId: string | null = null;
      let camberId: string | null = null;

      const settingId = await m.save(MeasurementSetting, data.settings);

      if(data.toe){
        const toeResult = await calculateToeDecimalDegrees(data);

        toeId = await m.save(MeasurementToe, {result: toeResult});
      }

      if(data.camber){
        const camberResult = await calculateCamber({FL: data.camber.camber_front_left, RL: data.camber.camber_rear_left, FR: data.camber.camber_front_right, RR: data.camber.camber_rear_right});

        camberId = await m.save(MeasurementCamber, {result: camberResult});
      }

      const measurement = await m.save(Measurement, {
        car: data.car_id,
        settings: settingId,
        toe: toeId,
        camber: camberId
      })
     
      return measurement;
    },

    async getMeasurement(id: any){
     
      const measurement = await m.findOne(Measurement, { relations: ["settings", "toe", "camber", "car", "car.suspension"], where: {id}});
     
      return measurement;
    },

  }
}