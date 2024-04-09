import { DataSource } from "typeorm"
import * as path from 'path';
import * as classes from "./classes";

import { CarType } from '@/types/car/car';

/** Global Datasource  */
let _dataSource: any;

export async function getManager() {
  if (!_dataSource) _dataSource = await new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
      path.join(__dirname, "/entities/*{.ts,.js}")
    ],
    //migrations: ["./src/database/migrations/{.ts,.js}"],
    logging: false,
    //synchronize: process.env.DB_SYNC === 'true',
    synchronize: true,
  });

  const manager =
    _dataSource === null || _dataSource === void 0
      ? void 0
      : _dataSource.manager;
  
  if (!manager.connection.isInitialized) {
    //console.log("Initializing connection...", manager);
    await manager.connection.initialize();
  }
  
  return manager;
}

export const DatabaseAdapter = () => {
  return {
    async createSession(userId: string, req: any){
      const m = await getManager();
      const session = classes.SessionClass(m);
      
      const sessionId = await session.createSession(userId, req.headers['user-agent']);

      if(sessionId){
        return sessionId;
      }

      return null
    },

    async getSession(id: string){
      const m = await getManager();
      const session = classes.SessionClass(m);
      
      const sessionId = await session.getSession(id);

      if(sessionId){
        return sessionId;
      }

      return null
    },

    async getUser(email: string, pass: string){
      const m = await getManager();
      const User = classes.UserClass(m);

      const user = await User.get(email, pass);

      if(user){
        return user;
      }
      
      return null
    },

    async getUserBySessionId(sessionId: string){
      const m = await getManager();
      const Session = classes.SessionClass(m);

      const user = await Session.getUserBySessionId(sessionId);

      if(user){
        return user;
      }
      
      return null
    },

    async getUserById(userId: string){
      const m = await getManager();
      const User = classes.UserClass(m);

      const user = await User.getById(userId);

      if(user){
        return user;
      }
      
      return null
    },

    async registerUser(email: string, pass: string){
      const m = await getManager();
      const User = classes.UserClass(m);

      const user = await User.create(email, pass)

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

      const car = await Car.createCar(data)

      return car;
    },

    async getCar(id: string) {
      const m = await getManager();
      const Car = classes.CarClass(m);

      const car = await Car.getCar(id)

      return car;
    },
    async updateCar(id: string, carProperties: Partial<CarType>) {
      const m = await getManager();
      const Car = classes.CarClass(m);

      const car = await Car.updateCar(id, carProperties)

      return car;
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

    async createMeasurement(data: any) {
      const m = await getManager();
      const MeasurementClass = classes.MeasurementClass(m);

      const measurement = await MeasurementClass.createMeasurement(data)

      return measurement;
    },

    async getMeasurement(id: any) {
      const m = await getManager();
      const MeasurementClass = classes.MeasurementClass(m);

      const measurement = await MeasurementClass.getMeasurement(id)

      return measurement;
    },
  }
}