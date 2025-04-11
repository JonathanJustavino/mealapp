import * as path from 'path';
import Fastify from 'fastify'
import cors from '@fastify/cors';
import dbPlugin from '@plugins/db-plugin';
import fastifyStatic from '@fastify/static';
import { CorsOptions } from './cors.option';
import { mealRoutes } from '@routes/mealRoutes';
import { AppDataSource } from '@db/data-source';
import { initializeDB } from '@migration/initial';
import { colorize, ColorText } from 'util/logger';


/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const app = Fastify({
    logger: true
});

const rootPath = path.resolve(process.cwd());

async function startup() {
    try {
        await AppDataSource.initialize();
        app.log.info("Database connected.");

        app.register(fastifyStatic, {
            root: path.join(rootPath, 'public/assets'),
            prefix: '/image/',
            setHeaders: (res) => {
                res.setHeader("Access-Control-Allow-Origin", "*");
            },
        });

        app.register(cors, CorsOptions);
        app.register(dbPlugin);
        app.register(mealRoutes);

        await app.ready();

        await initializeDB(app.db);

        console.log(colorize("DB Connection established", ColorText.YELLOW));


        app.listen({port: 3000}, function (err, address) { });
        app.log.info("Server running on http://localhost:3000");
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

startup();