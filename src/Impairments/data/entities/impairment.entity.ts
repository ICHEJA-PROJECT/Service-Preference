import { ImpairmentI } from "src/Impairments/domain/entitiesI/ImpairmentI";
import { StudentImpairmentI } from "src/Impairments/domain/entitiesI/StudentImpairmentI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentImpairmentEntity } from "./student_impairment.entity";
import { ReactiveImpairmentI } from "src/Impairments/domain/entitiesI/ReactiveImpairmentI";
import { ReactiveImpairmentEntity } from "./reactive_impairment.entity";
import { ResourceImpairmentI } from "src/Impairments/domain/entitiesI/ResourceImpairmentI";
import { ResourceImpairmentEntity } from "./resource_impairment.entity";
import { LearningPathImpairmentI } from "src/Impairments/domain/entitiesI/LearningPathImpairmentI";
import { LearningPathImpairmentEntity } from "./learning_path_impairment.entity";

@Entity('discapacidad')
export class ImpairmentEntity implements ImpairmentI {
    @PrimaryGeneratedColumn('increment', {name: 'id_discapacidad'})
    id: number;
    @Column({ name: 'nombre', type: 'varchar', length: 32, nullable: false})
    name: string;
    @OneToMany(() => StudentImpairmentEntity, studentImpairment => studentImpairment.impairment)
    students: StudentImpairmentI[]; 
    @OneToMany(() => ReactiveImpairmentEntity, reactiveImpairment => reactiveImpairment.impairment)
    reactives: ReactiveImpairmentI[];
    @OneToMany(() => ResourceImpairmentEntity, resourceImpairment => resourceImpairment.impairment)
    resources: ResourceImpairmentI[];
    @OneToMany(() => LearningPathImpairmentEntity, learningPathImpairment => learningPathImpairment.impairment)
    learningPaths: LearningPathImpairmentI[];
}