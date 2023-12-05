import { MeasurementSetting } from "../../entities/measurement-settings.entity";
import { Measurement } from "../../entities/measurement.entity"

export const MeasurementClass = (m: any) => {
  return {
    async createMeasurement(data: any){
      console.log("data", data)
      const settingId = await m.save("MeasurementSetting", data)

      const measurement = await m.save("Measurement", {
        car: data.car_id,
        settings: settingId
      })
     
      return { ...measurement };
    },

  }
}