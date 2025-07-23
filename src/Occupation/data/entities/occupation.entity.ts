import { OccupationI } from "src/Occupation/domain/entitiesI/OccupationI";
import { StudentOccupationI } from "src/Occupation/domain/entitiesI/StudentOccupationI";
import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentOccupationEntity } from "./student_occupation.entity";
import { WordOccupationEntity } from "./word_occupation.entity";
import { ExerciseOccupationI } from "src/Occupation/domain/entitiesI/ExerciseOccupationI";
import { ExerciseOccupationEntity } from "./exercise_occupation.entity";

@Entity('ocupacion')
export class OccupationEntity implements OccupationI {
    @PrimaryGeneratedColumn('increment', {name: 'id_ocupacion', type: 'int'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 32, nullable: false})
    name: string;
    @OneToMany(() => StudentOccupationEntity, studentOccupation => studentOccupation.occupation)
    students: StudentOccupationI[];
    @OneToMany(() => WordOccupationEntity, wordOccupation => wordOccupation.occupation)
    words: WordOccupationI[];
    @OneToMany(() => ExerciseOccupationEntity, exerciseOccupation => exerciseOccupation.occupation)
    exercises: ExerciseOccupationI[];
}