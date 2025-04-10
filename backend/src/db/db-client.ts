import { Repository, Like } from "typeorm";
import { Meal } from "@entity/Meal";
import { initializeDB } from "@migration/initial";
import { parseTags,parseEntity } from "@migration/initial";
import { mealMappings } from "@migration/mealMappings";
import { Ingredient } from "@entity/Ingredient";


export class DbClient {
    constructor(
        private mealRepo: Repository<Meal>,
        private ingredientRepo: Repository<Ingredient>
    ) {}

    async findAllMeals() {
        return this.mealRepo.find();
    }

    async getMealCount() {
        return this.mealRepo.count();
    }

    async saveMeal(meal: Meal): Promise<Meal> {
        return this.mealRepo.save(meal);
    }

    async getIngredients() {
        return this.ingredientRepo.find();
    }

    async saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return this.ingredientRepo.save(ingredient);
    }
}
