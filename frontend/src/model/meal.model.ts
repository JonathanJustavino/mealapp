export class Meal {
        idMeal?: string
        strMeal?: string
        strDrinkAlternate?: string
        strCategory?: string
        strArea?: string
        strInstructions?: string
        strMealThumb?: string
        strTags?: string
        strYoutube?: string
        strIngredient1?: string
        strIngredient2?: string
        strIngredient3?: string
        strIngredient4?: string
        strIngredient5?: string
        strIngredient6?: string
        strIngredient7?: string
        strIngredient8?: string
        strIngredient9?: string
        strIngredient10?: string
        strIngredient11?: string
        strIngredient12?: string
        strIngredient13?: string
        strIngredient14?: string
        strIngredient15?: string
        strIngredient16?: string
        strIngredient17?: string
        strIngredient18?: string
        strIngredient19?: string
        strIngredient20?: string
        strMeasure1?: string
        strMeasure2?: string
        strMeasure3?: string
        strMeasure4?: string
        strMeasure5?: string
        strMeasure6?: string
        strMeasure7?: string
        strMeasure8?: string
        strMeasure9?: string
        strMeasure10?: string
        strMeasure11?: string
        strMeasure12?: string
        strMeasure13?: string
        strMeasure14?: string
        strMeasure15?: string
        strMeasure16?: string
        strMeasure17?: string
        strMeasure18?: string
        strMeasure19?: string
        strMeasure20?: string
        strSource?: string
        strImageSource?: string
        strCreativeCommonsConfirmed?: string
        dateModified?: string

        constructor(data?: Partial<Meal>) {
                if (data) {
                        Object.assign(this, data);
                }
        }
}

export function mapBackendMealToFrontend(backendMeal: any): Meal {
    const meal = new Meal({
        idMeal: `${backendMeal.meal_themeal_debug_id}`,
        strMeal: backendMeal.meal_name,
        strInstructions: backendMeal.meal_instructions,
        strMealThumb: backendMeal.meal_thumbnail,
        strYoutube: backendMeal.meal_youtubeLink,
        strArea: backendMeal.meal_area,
        strCategory: backendMeal.meal_category,
        strSource: backendMeal.meal_source_uri,
        strTags: backendMeal.meal_tags?.map((tag: any) => tag.name).join(','),
    });

    return meal;
}
