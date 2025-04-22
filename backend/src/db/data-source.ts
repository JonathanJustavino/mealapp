import * as path from 'path';
import * as dotenv from 'dotenv';

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Meal } from '@entity/Meal';
import { Tag } from '@entity/Tag';
import { Ingredient } from '@entity/Ingredient';

const port = parseInt(process.env.BE_PORT_INT!);

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
