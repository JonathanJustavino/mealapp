import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Meal } from "@entity/Meal";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Meal, meal => meal.tags)
    meals: Meal[];
}