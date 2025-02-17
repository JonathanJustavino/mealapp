import Fastify from 'fastify'
import * as path from 'path';
import * as fs from 'fs';
import { Meal } from './model/meal';
import { Ingredients } from './model/ingredients';
import fastifyStatic from '@fastify/static';
import { CorsOptions } from './cors.option';
import cors from '@fastify/cors';


/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
    logger: true
})

const rootPath = path.resolve(process.cwd());
const DB_NAME = 'themealdb_data.json';
const dbFilePath: string = path.join(rootPath, `data/${DB_NAME}`);
console.log(dbFilePath)
const mealList: Meal[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));


fastify.register(fastifyStatic, {
    root: path.join(rootPath, 'public/assets'),
    prefix: '/public/',
    setHeaders: (res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
    },
});

fastify.register(cors, CorsOptions);


fastify.get('/', function(request, reply) {
    reply.send({hello: 'world'})
});

fastify.get('/meals', function(request, reply) {
    const query = request.query as {page: string, limit: string};
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

fastify.get('/mealids', function(request, reply) {
    const ids = mealList.map((meal) => {return meal.idMeal});

    reply.send(ids);
});

fastify.get('/random', function(request, reply) {
    const rndIndex = Math.floor(Math.random() * mealList.length);
    const rndMeal = mealList[rndIndex];

    reply.send(rndMeal);
});

fastify.get('/search', function(request, reply) {
    const query = request.query as {name: string};
    const name = query.name;

    const result = mealList.filter((meal) => meal.strMeal?.toLowerCase().includes(name));
    reply.send(result);
});

fastify.get('/starts-with', function(request, reply) {
    const query = request.query as {letter: string};
    const letter = query.letter;

    const result = mealList.filter((meal) => meal.strMeal?.toLowerCase().startsWith(letter));
    reply.send(result);
});

fastify.get('/meals/:id', function(request, reply) {
    const idContainer = request.params as {id: string};
    const mealID = idContainer.id;

    const ids = mealList.filter((meal) => {
        if (meal.idMeal) {
            return meal.idMeal == mealID;
        }
    });

    reply.send(ids);
});

fastify.get('/categories', function(request, reply) {
    let catByKey: Record <string, string> = {}
    for (let meal of mealList) {
        const category = meal.strCategory;
        if (category) {
            catByKey[category] = category;
        }
    }
    const categories = Object.keys(catByKey).sort();

    reply.send(categories);
});

//TODO: filter by multiple ingredients
fastify.get('/ingredients', function(request, reply) {
    const query = request.query as {ingredient: string};
    const ingredient = query.ingredient;

    const result = mealList.filter((meal) => {
    });
});

fastify.get('/image/:id', function(request, reply) {
    const idContainer = request.params as {id: string};
    const mealID = idContainer.id;
    return reply.sendFile(`${mealID}.jpg`)
});


fastify.listen({port: 3000}, function (err, address) {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
