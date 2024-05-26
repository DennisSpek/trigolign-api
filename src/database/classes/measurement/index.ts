import { MeasurementSetting } from "../../entities/measurement-settings.entity";
import { MeasurementToe } from '../../entities/measurement-toe.entity';
import { MeasurementCamber } from '../../entities/measurement-camber.entity';
import { Measurement } from "../../entities/measurement.entity"
import { calculateToe } from "../../../lib/measurements/toe"
import { calculateCamber } from "../../../lib/measurements/camber"

export const MeasurementClass = (m: any) => {

  return {
    async createMeasurement(data: any){
    
      const settingId = await m.save(MeasurementSetting, data);

      const toeResult = await calculateToe(data);
      
      const camberResult = await calculateCamber({FL: data.camber.camber_front_left, RL: data.camber.camber_rear_left, FR: data.camber.camber_front_right, RR: data.camber.camber_rear_right});

      console.log("camberResult", camberResult, toeResult)
      
      const toeId = await m.save(MeasurementToe, {result: toeResult});
      const camberId = await m.save(MeasurementCamber, {result: camberResult});

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