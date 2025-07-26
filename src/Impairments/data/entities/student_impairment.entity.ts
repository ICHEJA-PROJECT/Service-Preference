import { ImpairmentI } from "src/Impairments/domain/entitiesI/ImpairmentI";
import { StudentImpairmentI } from "src/Impairments/domain/entitiesI/StudentImpairmentI";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ImpairmentEntity } from "./impairment.entity";

@Entity('educando_discapacidades')
export class StudentImpairmentEntity implements StudentImpairmentI {
    @PrimaryColumn({name: "id_educando", type: 'int', nullable: false})
    studentId: number;
    @PrimaryColumn({name: "id_discapacidad", type: 'int', nullable: false})
    impairmentId: number;
    @ManyToOne(() => ImpairmentEntity, impairment => impairment.students)
    @JoinColumn({ name: 'id_discapacidad' })
    impairment: ImpairmentI;
}