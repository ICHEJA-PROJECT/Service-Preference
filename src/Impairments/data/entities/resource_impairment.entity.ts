import { ImpairmentI } from "src/Impairments/domain/entitiesI/ImpairmentI";
import { ResourceImpairmentI } from "src/Impairments/domain/entitiesI/ResourceImpairmentI";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ImpairmentEntity } from "./impairment.entity";

@Entity('recurso_discapacidades')
export class ResourceImpairmentEntity implements ResourceImpairmentI {
    @PrimaryColumn({name: 'id_recurso', type: 'int', nullable: false})
    resourceId: number;
    @PrimaryColumn({name: 'id_ discapacidad', type: 'int', nullable: false})
    impairmentId: number;
    @ManyToOne(() => ImpairmentEntity, impairment => impairment.resources)
    impairment: ImpairmentI;
}