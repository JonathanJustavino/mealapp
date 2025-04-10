/*

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
// import { Meal } from "@entity/Meal";
import { Meal } from "./Meal";
import { Ingredient } from "./Ingredient";
import { Ingredients } from "model/ingredients";

@Entity()
export class Measure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Ingredient, ingredient => ingredient.measures, { cascade: true })
    @JoinTable()
    ingredients: Ingredient[];
}

*/