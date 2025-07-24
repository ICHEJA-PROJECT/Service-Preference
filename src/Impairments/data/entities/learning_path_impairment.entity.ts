import { ImpairmentI } from "src/Impairments/domain/entitiesI/ImpairmentI";
import { LearningPathImpairmentI } from "src/Impairments/domain/entitiesI/LearningPathImpairmentI";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ImpairmentEntity } from "./impairment.entity";

@Entity('ruta_aprendizaje_discapacidades')
export class LearningPathImpairmentEntity implements LearningPathImpairmentI {
    @PrimaryColumn({name: 'id_ruta_aprendizaje', type: 'int', nullable: false})
    learningPathId: number;
    @PrimaryColumn({name: 'id_discapacidad', type: 'int', nullable: false})
    impairmentId: number;
    @ManyToOne(() => ImpairmentEntity, impairment => impairment.learningPaths)
    impairment: ImpairmentI;
}