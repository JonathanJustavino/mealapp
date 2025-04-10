import * as fs from 'fs';
import * as path from 'path';
import fastify, { FastifyInstance } from "fastify";


const rootPath = path.resolve(process.cwd());
const DB_NAME = 'themealdb_data.json';
const dbFilePath: string = path.join(rootPath, `data/${DB_NAME}`);
const mealList: Object[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
console.log(dbFilePath)


export async function mealRoutes(app: FastifyInstance) {

    app.get('/', function (request, reply) {
        reply.send({ hello: 'world' })
    });

    app.get('/meals', async function (request, reply) {
        const meals = await app.db.findAllMeals();
        console.log(meals);
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

    app.get('/mealids', function(request, reply) {
        // const ids = mealList.map((meal) => {return meal.idMeal});
        // const ids = this.db.

        // reply.send(ids);
    });

    // app.get('/random', function(request, reply) {
    //     const rndIndex = Math.floor(Math.random() * mealList.length);
    //     const rndMeal = mealList[rndIndex];

    //     reply.send(rndMeal);
    // });

    // app.get('/search', function(request, reply) {
    //     const query = request.query as {name: string};
    //     const name = query.name;

    //     const result = mealList.filter((meal) => meal.strMeal?.toLowerCase().includes(name));
    //     reply.send(result);
    // });

    // app.get('/starts-with', function(request, reply) {
    //     const query = request.query as {letter: string};
    //     const letter = query.letter;

    //     const result = mealList.filter((meal) => meal.strMeal?.toLowerCase().startsWith(letter));
    //     reply.send(result);
    // });

    // app.get('/meals/:id', function(request, reply) {
    //     const idContainer = request.params as {id: string};
    //     const mealID = idContainer.id;

    //     const ids = mealList.filter((meal) => {
    //         if (meal.idMeal) {
    //             return meal.idMeal == mealID;
    //         }
    //     });

    //     reply.send(ids);
    // });

    // app.get('/categories', function(request, reply) {
    //     let catByKey: Record <string, string> = {}
    //     for (let meal of mealList) {
    //         const category = meal.strCategory;
    //         if (category) {
    //             catByKey[category] = category;
    //         }
    //     }
    //     const categories = Object.keys(catByKey).sort();

    //     reply.send(categories);
    // });

    app.get('/ingredients', async function (request, reply) {
        const ingredients = await app.db.getIngredients();

        reply.send(ingredients);
    });

    app.get('/image/:id', function (request, reply) {
        const idContainer = request.params as { id: string };
        const mealID = idContainer.id;
        return reply.sendFile(`${mealID}.jpg`)
    });

}