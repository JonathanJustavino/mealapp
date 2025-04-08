import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable } from "typeorm"
import { Tag } from "./Tag"
import { Ingredient } from "./Ingredient";


@Entity()
@Unique(["themeal_debug_id"])
export class Meal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    themeal_debug_id: number;

    @Column()
    name: string;

    @Column()
    instructions: string;

    @Column()
    thumbnail: string;

    @Column()
    youtubeLink: string;

    @Column()
    area: string;

    @Column()
    category: string;

    @Column()
    source_uri: number;

    @ManyToMany(() => Tag, tag => tag.meals, { cascade: true })
    @JoinTable()
    tags: Tag[];

    @ManyToMany(() => Ingredient, ingredient => ingredient.meals, { cascade: true })
    @JoinTable()
    ingredients: Ingredient[];
}
