import { Car } from "../../entities/car.entity";
import { Suspension } from "../../entities/suspension.entity"
import { Manufacturer } from '../../entities/manufacturer.entity';

export const CarClass = (m: any) => {
  return {
    async createCar(data: any){
      const registration = data.registration;

      let car = await m.findOne('Car', { where: { registration } });

      if (car == null){
        const suspension = await m.save("Suspension", data.suspensionObject);

        console.log("suspension", suspension);

        //const manufacturer = await m.save("Manufacturer", data.manufacturer);

        //console.log("manufacturer", manufacturer);

        car = await m.save("Car", {
          model: data.model,
          registration: data.registration,
          suspension: suspension.id,
          branch: data.branch,
          user: data.user,
          manufacturer: data.manufacturer,
          custom: data.custom,
          mid: data.mid
        })
      };
     
      return { ...car };
    },
    async getCar(id: string){
      const cars = await m.findOne(Car, { relations: ["manufacturer", "suspension", "measurements"], where: {id} });

      if (!cars) return null;

      return cars;
    },
    async getAllCars(){
      const cars = await m.find(Car, { relations: ["manufacturer"] });

      if (!cars) return null;

      return cars;
    },
    async getCarsByManufacturer(manufacturer: string){
      const cars = await m.find(Car, { relations: ["manufacturer"], where: {manufacturer} });

      if (!cars) return null;

      return cars;
    },
    async getCarsByOrganisation(organisation: string){
      const cars = await m.find(Car, { relations: ["manufacturer"], where: {organisation} });

      if (!cars) return null;

      return cars;
    },
    async getCarsByBranch(branch_id: string){
      try {
        const cars = await m.find(Car, { relations: ["manufacturer"], where: { branch: { id: branch_id } } });

        if (!cars) return null;

        return cars;
      } catch (error) {
        console.error('Error querying cars:', error);
      }
    },

  }
}