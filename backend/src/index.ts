import { AppDataSource } from "@db/data-source"
import { Meal } from "@entity/Meal"
import { initializeDB } from "@migration/initial"


AppDataSource.initialize().then(async () => {

    const repository = AppDataSource.getRepository(Meal);
    // await initializeDB(repository);

    // const meals = await AppDataSource.manager.find(Meal)
    const meal = await repository.findOneBy({id: 1});
    console.log("Loaded meal: ", meal)


    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
