import { Car } from "@/database/entities/car.entity";
import { Suspension } from "@/database/entities/suspension.entity"
import { Manufacturer } from '@/database/entities/manufacturer.entity';

import { CarType } from "@/types/car/car"

export const CarClass = (m: any) => {
  return {
    async createCar(data: any){
      console.log("data", data);
      const registration = data.carDetails.registration;

      let car = await m.findOne('Car', { where: { registration } });

      if (car == null){
        const suspension = await m.save("Suspension", data.carSuspension);

        console.log("suspension", suspension, data);

        const manufacturer = await m.save("Manufacturer", {name: data.carDetails.manufacturer});

        console.log("manufacturer", manufacturer);

        car = await m.save("Car", {
          model: data.carDetails.model,
          registration: data.carDetails.registration,
          suspension: suspension.id,
          branch: data.user.branch.id,
          user: data.user.id,
          manufacturer: manufacturer.name,
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
    async updateCar(id: string, carProperties: Partial<CarType>){
      const car = await m.findOne(Car, { where: { id } });

      if (!car) return null;

      const updatedCar = m.merge(Car, car, carProperties);

      await m.save(updatedCar);

      return updatedCar;
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