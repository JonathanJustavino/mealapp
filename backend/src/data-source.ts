import * as path from 'path';
import * as dotenv from 'dotenv';

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Meal } from "./entity/Meal";


const ENV_PATH = 'db/.db-env';
dotenv.config({path: path.resolve(__dirname, ENV_PATH)});

const port = parseInt(process.env.PORT_A);

export const AppDataSource = new DataSource({
    type: "mysql",
    username: process.env.USER,
    password: process.env.ROOTPWD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: port,
    synchronize: true,
    logging: false,
    entities: [Meal],
    migrations: [],
    subscribers: [],
})
