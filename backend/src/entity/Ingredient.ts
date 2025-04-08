import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Meal } from "./Meal";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Meal, meal => meal.tags)
    meals: Meal[];
}