import { MeasurementSetting } from "../../entities/measurement-settings.entity";
import { MeasurementResult } from '../../entities/measurement-result.entity';
import { Measurement } from "../../entities/measurement.entity"
import { calculateMeasurement } from "../../../lib/measurement"

export const MeasurementClass = (m: any) => {

  return {
    async createMeasurement(data: any){
      const settingId = await m.save(MeasurementSetting, data);

      const result = await calculateMeasurement(data);

      const resultId = await m.save(MeasurementResult, {result: result});

      const measurement = await m.save(Measurement, {
        car: data.car_id,
        settings: settingId,
        result: resultId
      })
     
      return measurement;
    },

    async getMeasurement(id: any){
     
      const measurement = await m.findOne(Measurement, { relations: ["settings", "result"], where: {id}});
     
      return measurement;
    },

  }
}