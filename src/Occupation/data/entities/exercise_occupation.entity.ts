import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { OccupationEntity } from "./occupation.entity";
import { ExerciseOccupationI } from "src/Occupation/domain/entitiesI/ExerciseOccupationI";
import { OccupationI } from "src/Occupation/domain/entitiesI/OccupationI";

@Entity('ejercicio_ocupacion')
export class ExerciseOccupationEntity implements ExerciseOccupationI {
    @PrimaryColumn({ name: 'id_ejercicio', type: 'int', nullable: false })
    exerciseId: number;
    @PrimaryColumn({ name: 'id_ocupacion', type: 'int', nullable: false })
    occupationId: number;
    @ManyToOne(() => OccupationEntity, occupation => occupation.exercises)
    occupation: OccupationI;
}