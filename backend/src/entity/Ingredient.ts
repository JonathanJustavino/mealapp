import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Meal } from "@entity/Meal";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Meal, meal => meal.tags)
    meals: Meal[];

    // @ManyToMany(() => Measure, measure => measure.ingredients, { cascade: true })
    // @JoinTable()
    // measures: Measure[];
}