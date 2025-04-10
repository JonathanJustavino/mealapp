import { Repository, Like } from "typeorm";
import { Meal } from "@entity/Meal";
import { initializeDB } from "@migration/initial";
import { parseTags,parseEntity } from "@migration/initial";
import { mealMappings } from "@migration/mealMappings";
import { Ingredient } from "@entity/Ingredient";
import { MealColumns } from "./tables/meal.columns";


export class DbClient {
    constructor(
        private mealRepo: Repository<Meal>,
        private ingredientRepo: Repository<Ingredient>
    ) {}

    async findAllMeals() {
        return this.mealRepo.find();
    }

    async getMealPage(page: number, limit: number) {
        const totalCount = await this.getMealCount();
        const amount = Math.floor(totalCount / limit);
        const start = page * limit;
        return this.mealRepo.createQueryBuilder("meal")
            .select()
            .skip(start - 1)
            .take(amount)
            .getRawMany();
    }

    async findMealByName(name: string) {
        return this.mealRepo.findOneBy({
            name: name
        })
    }

    async getMealIds() {
        return this.mealRepo.find({
            select: [MealColumns.DEBUG_ID]
        })
    }

    async getRandomMeal() {
        const mealCount = await this.getMealCount();
        const rndIndex = Math.floor(Math.random() * mealCount);

        return this.mealRepo.findOneBy({
            id: rndIndex,
        })
    }

    async getMealById(mealID: number) {
        return this.mealRepo.findOneBy({
            id: mealID
        });
    }

    async getMealCount() {
        return this.mealRepo.count();
    }

    async getMealCategories() {
        return this.mealRepo.createQueryBuilder("meal")
            .select(`DISTINCT ${MealColumns.CATEGORY}`)
            .orderBy(MealColumns.CATEGORY, "ASC")
            .getRawMany();
    }

    async mealNameContains(sequence: string) {
        return this.mealRepo.findBy({
            // name:
        })
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
