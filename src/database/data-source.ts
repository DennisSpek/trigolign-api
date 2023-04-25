import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "trigolign",
    entities:["./src/database/entities/*.ts"],
    logging: false,
    synchronize: true,
})