import * as raw from "../../data/cleaned_data.json";
import { Meal } from "@entity/Meal";
import { Tag } from "@entity/Tag";
// import { Measure } from "@entity/Measure";
import { Ingredient } from "@entity/Ingredient";
import { DbClient } from "@db/db-client";
import { mealMappings } from "./mealMappings";


const data: any = raw;
export function parseTags(tags: string): Tag[] {
    if (tags === null) {
        return [];
    }

    const rawTags = tags.split(",");
    const parsed =  rawTags.map((raw) => {
        const tag = new Tag()
        tag.name = raw;

        return tag;
    });

    return parsed;
}

export function parseEntity(entityName: string, data: any, index: number): Ingredient[] {
    const ingredients: Ingredient[] = [];

    for (let jsonIndex = 1; jsonIndex <= 20; jsonIndex++) {
        const key = `${entityName}${jsonIndex}`;
        const value = data[key]?.[index];

        if(value && value.trim() !== "") {
            const ingredient = new Ingredient();
            ingredient.name = value;
            ingredients.push(ingredient);
        }
    }

    return ingredients;
}


export async function initializeDB(db: DbClient) {
    const mealCount = Object.keys(data.idMeal).length;
    const entries = Object.entries(mealMappings);

    const notEmpty = await db.getMealCount();
    if(notEmpty) {
        console.log("DB not empty, skipping initialization...")
        return
    }

    for (let index = 0; index < mealCount; index++) {
        const meal = new Meal();
        entries.forEach(([key, value]) => {
            if (value == "strTags") {
                meal.tags = parseTags(data[value][index]);
                return;
            }
            meal[key] = data[value][index];
        });

        //TODO: Model measure table (note that table should be split into unit and amount)
        // const measures = parseEntity("strMeasure", data, index);
        const ingredients = parseEntity("strIngredient", data, index);

        // for(let idx = 0; idx < ingredients.length; idx++) {
        //     ingredients[idx].measures = measures[idx];
        // }

        // console.log(ingredients);
        meal.ingredients = ingredients;

        console.log(meal);
        await db.saveMeal(meal);
    }
}
