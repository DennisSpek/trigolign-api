import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities:["./src/database/entities/*.ts"],
    logging: false,
    synchronize: process.env.DB_SYNC === 'true',
})