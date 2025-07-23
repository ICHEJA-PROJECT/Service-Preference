import { OccupationI } from "src/Occupation/domain/entitiesI/OccupationI";
import { StudentOccupationI } from "src/Occupation/domain/entitiesI/StudentOccupationI";
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { OccupationEntity } from "./occupation.entity";

@Entity('educando_ocupaciones')
export class StudentOccupationEntity implements StudentOccupationI {
    @PrimaryColumn({name: 'id_educando', type: 'int', nullable: false})
    studentId: number;
    @PrimaryColumn({name: 'id_ocupacion', type: 'int', nullable: false})
    occupationId: number;
    @ManyToOne(() => OccupationEntity, occupation => occupation.students)
    occupation: OccupationI;
}