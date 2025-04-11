export class Meal {
    id: number
    legacy_id: number
    name: string
    instructions: string
    thumbnail: string
    youtube: string
    area: string
    category: string
    source: string
    tags: string[]
    ingredients?: string[]

    constructor(
        { id,
          legacy_id,
          name,
          instructions,
          thumbnail,
          youtube,
          area,
          category,
          source,
          tags
        }:
        { id: number,
          legacy_id: number,
          name: string,
          instructions: string,
          thumbnail: string,
          youtube: string,
          area: string,
          category: string,
          source: string,
          tags: string[]
        }
    ) {
        this.id = id;
        this.legacy_id = legacy_id;
        this.name = name;
        this.instructions = instructions;
        this.thumbnail = thumbnail;
        this.youtube = youtube;
        this.area = area;
        this.category = category;
        this.source = source;
        this.tags = tags;
    }
}

export function mapBackendMealToFrontend(backendMeal: any): Meal {
    const meal = new Meal({
        id: backendMeal.meal_id,
        legacy_id: backendMeal.meal_themeal_debug_id,
        name: backendMeal.meal_name,
        instructions: backendMeal.meal_instructions,
        thumbnail: `http://localhost:3000/image/${backendMeal.meal_themeal_debug_id}`,
        youtube: backendMeal.meal_youtubeLink,
        area: backendMeal.meal_area,
        category: backendMeal.meal_category,
        source: backendMeal.meal_source_uri,
        tags: backendMeal.meal_tags,
    });

    return meal;
}
