import { DataSource } from "typeorm"

import * as classes from "./classes";

/** Global Datasource  */
let _dataSource: any;

async function getManager() {
  if (!_dataSource) _dataSource = await new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities:["./src/database/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    logging: true,
    synchronize: process.env.DB_SYNC === 'true',
  });

  const manager =
    _dataSource === null || _dataSource === void 0
      ? void 0
      : _dataSource.manager;
  
  if (!manager.connection.isInitialized) {
    console.log("Initializing connection...", manager);
    await manager.connection.initialize();
  }
  
  return manager;
}

export const DatabaseAdapter = () => {
  return {
    async getUser(email: string, pass: string){
      const m = await getManager();
      const User = classes.UserClass(m);

      const user = await User.get(email, pass)

      return user;
    },

    async updateUser(body: any, id: string){
      const m = await getManager();
      const User = classes.UserClass(m);

      const user = await User.update(body, id)

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

    async createOrganisation(name: string) {
      const m = await getManager();
      const Organisation = classes.organisation(m);

      const result = await Organisation.create(name)

      return result;
    },

    async getOrganisation(id: string) {
      const m = await getManager();
      const Organisation = classes.organisation(m);

      const details = await Organisation.get(id)

      return details;
    },

     async createBranch(name: string) {
      const m = await getManager();
      const Branch = classes.branch(m);

      const result = await Branch.create(name)

      return result;
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

      return cars;
    },

    async getCarsByBranch(id: string) {
      const m = await getManager();
      const Car = classes.CarClass(m);

      const cars = await Car.getCarsByBranch(id);

      return cars;
    },
  }
}