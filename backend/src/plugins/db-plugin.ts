import fp from 'fastify-plugin';
import { Meal } from '@entity/Meal';
import { DbClient } from '@db/db-client';
import { AppDataSource } from '@db/data-source';
import { Ingredient } from '@entity/Ingredient';


export default fp(async (fastify) => {
    const mealRepo = AppDataSource.getRepository(Meal);
    const ingredientRepo = AppDataSource.getRepository(Ingredient);
    const dbClient = new DbClient(mealRepo, ingredientRepo);

    fastify.decorate('db', dbClient);
});


declare module 'fastify' {
    interface FastifyInstance {
        db: DbClient
    }
}