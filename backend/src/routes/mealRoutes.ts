import * as fs from 'fs';
import * as path from 'path';
import { FastifyInstance } from "fastify";


const rootPath = path.resolve(process.cwd());
const DB_NAME = 'themealdb_data.json';
const dbFilePath: string = path.join(rootPath, `data/${DB_NAME}`);
const mealList: Object[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
console.log(dbFilePath)


export async function mealRoutes(app: FastifyInstance) {

    app.get('/', function (_, reply) {
        reply.send({ hello: 'world' })
    });

    app.get('/meals', async function (request, reply) {
        const query = request.query as { page: number, limit: number };
        const pageParam = query.page ?? 1;
        const limitParam = query.limit ?? 1;

        const meals = await app.db.getMealPage(pageParam, limitParam);
        reply.send(meals);
    });

    app.get('/meals-legacy', async function (request, reply) {
        const query = request.query as { page: string, limit: string };
        const pageParam = query.page;
        const limitParam = query.limit;
        //TODO: first / last page edge case abfangen
        //FIXME: redesign main entitiy -> object holding meal list and total amount of meals
        //then always return page with total count
        let mealPage = mealList;
        if (pageParam && limitParam) {
            const page = parseInt(pageParam);
            const limit = parseInt(limitParam);
            const amount = Math.floor(mealList.length / limit);
            const start = page * limit;
            mealPage = mealList.slice(start, start + amount);
        }

        reply.send(mealPage);
    });

    app.get('/mealids', async function(_, reply) {
        const ids = await app.db.getMealIds();

        reply.send(ids);
    });

    app.get('/random', async function(_, reply) {
        const random = await app.db.getRandomMeal();

        reply.send(random);
    });

    app.get('/search', async function(request, reply) {
        const query = request.query as {name: string};
        const name = query.name;
        const meal = await app.db.findMealByName(name);

        reply.send(meal);
    });

    // app.get('/starts-with', function(request, reply) {
    //     const query = request.query as {letter: string};
    //     const letter = query.letter;

    //     const result = mealList.filter((meal) => meal.strMeal?.toLowerCase().startsWith(letter));
    //     reply.send(result);
    // });

    app.get('/meals/:id', async function(request, reply) {
        const idContainer = request.params as {id: number};
        const mealID = idContainer.id;
        const meal = await app.db.getMealById(mealID);

        reply.send(meal);
    });


    app.get('/categories', async function(_, reply) {
        const dbResult = await app.db.getMealCategories();
        const categories = dbResult.map((entries) => entries.category)

        reply.send(categories);
    });


    app.get('/ingredients', async function (_, reply) {
        const ingredients = await app.db.getIngredients();

        reply.send(ingredients);
    });


    app.get('/image/:id', function (request, reply) {
        const idContainer = request.params as { id: string };
        const mealID = idContainer.id;

        const t = `${mealID}.jpg`;
        console.log(t);

        return reply.sendFile(t)
    });
}