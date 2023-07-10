import { DataSource } from "typeorm"

import * as classes from "./classes";

/** Global Datasource  */
let _dataSource: any;

async function getManager() {
  if (!_dataSource) _dataSource = await new DataSource({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "trigolign",
    entities:["./src/database/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    logging: false,
    synchronize: true,
  });

  const manager =
    _dataSource === null || _dataSource === void 0
      ? void 0
      : _dataSource.manager;
  
  if (!manager.connection.isInitialized) {
    console.log("Initializing connection...");
    await manager.connection.initialize();
  }
  
  return manager;
}

export const DatabaseAdapter = () => {
  return {
    async getUser(email: string, pass: string){
      const m = await getManager();
      const User = classes.UserClass(m);

      const user = await User.getUser(email, pass)

      return user;
    },

    async createManufacturer(name: string) {
      const m = await getManager();
      const Manufacturer = classes.Manufacturer(m);

      const cars = await Manufacturer.createManufacturer(name)

      return cars;
    },

    async getManufacturer(name: string) {
      const m = await getManager();
      const Manufacturer = classes.Manufacturer(m);

      const cars = await Manufacturer.getManufacturer(name)

      return cars;
    },

    async getOrganisation(id: string) {
      const m = await getManager();
      const Organisation = classes.org(m);

      const details = await Organisation.getOrganisation(id)

      return details;
    },

    async createCar(data: any) {
      const m = await getManager();
      const Car = classes.CarClass(m);

      const cars = await Car.createCar(data)

      return cars;
    },

    async getCarsByOrganisation(organisation: string) {
      const m = await getManager();
      const Car = classes.CarClass(m);

      const cars = await Car.getAllCars();

      console.log("cars", cars)

      return cars;
    },
  }
}