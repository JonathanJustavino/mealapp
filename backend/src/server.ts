import Fastify from 'fastify'
import * as path from 'path';
// import * as fs from 'fs';
import fastifyStatic from '@fastify/static';
import { CorsOptions } from './cors.option';
import cors from '@fastify/cors';
// import { DbClient } from '@db/db-client';
import { mealRoutes } from '@routes/mealRoutes';
import dbPlugin from '@plugins/db-plugin';
import { AppDataSource } from '@db/data-source';
import { Meal } from '@entity/Meal';
import { initializeDB } from '@migration/initial';


/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const app = Fastify({
    logger: true
});

const rootPath = path.resolve(process.cwd());

// const DB_NAME = 'themealdb_data.json';
// const dbFilePath: string = path.join(rootPath, `data/${DB_NAME}`);
// console.log(dbFilePath)
// const mealList: Object[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

async function startup() {
    try {
        await AppDataSource.initialize();
        app.log.info("Database connected.");

        app.register(fastifyStatic, {
            root: path.join(rootPath, 'public/assets'),
            prefix: '/public/',
            setHeaders: (res) => {
                res.setHeader("Access-Control-Allow-Origin", "*");
            },
        });

        app.register(cors, CorsOptions);
        app.register(dbPlugin);
        app.register(mealRoutes);

        await app.ready();

        await initializeDB(app.db);


        app.listen({port: 3000}, function (err, address) {
            // if(err) {
            //     app.log.error(err);
            //     process.exit(1);
            // }
        });
        app.log.info("Server running on http://localhost:3000");
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

startup();