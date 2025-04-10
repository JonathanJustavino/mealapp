import * as path from 'path';
import * as dotenv from 'dotenv';

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Meal } from '@entity/Meal';
import { Tag } from '@entity/Tag';
import { Ingredient } from '@entity/Ingredient';


const ENV_PATH = path.resolve(__dirname, '.env');
console.log(ENV_PATH);
dotenv.config({path: path.resolve(__dirname, ENV_PATH)});


// const host = process.env.HOST;
const port = parseInt(process.env.PORT_A!);
const host = "localhost";


export const AppDataSource = new DataSource({
    type: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: host,
    port,
    synchronize: true,
    logging: false,
    entities: [
        Meal,
        Tag,
        Ingredient
    ],
    migrations: [],
    subscribers: [],
})
