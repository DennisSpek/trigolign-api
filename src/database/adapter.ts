import { DataSource } from "typeorm"


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
    async createConnection() {
      const c = await getManager();

      return c
    },

    async createManufacturer(name: string) {
      const m = await getManager();

      let manufacturer = await m.findOne('Manufacturer', { where: { name } });

      if (!manufacturer){
        manufacturer = await m.save("Manufacturer", {
          name,
        })
      };
      return { ...manufacturer };
    },

    async getManufacturer(name: string) {
      const m = await getManager();
      const manufacturer = await m.findOne('Manufacturer', { where: { name } });

      if (!manufacturer) return null;
      return { ...manufacturer };
    },
  }
}