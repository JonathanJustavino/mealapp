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

const port = parseInt(process.env.PORT_A!);


export const AppDataSource = new DataSource({
    type: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
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
