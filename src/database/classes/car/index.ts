import { Car } from "../../entities/car.entity";

export const CarClass = (m: any) => {
  return{
    async createCar(data: any){
      const registration = data.registration

      let car = await m.findOne('Car', { where: { registration } });

      if (!car){
        car = await m.save("Car", data)
      };
     
      return { ...car };
    },
    async getAllCars(){
      const cars = await m.find(Car, { relations: ["manufacturer", "organisation"] });

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

  }
}