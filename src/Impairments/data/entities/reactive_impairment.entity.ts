import { ImpairmentI } from "src/Impairments/domain/entitiesI/ImpairmentI";
import { ReactiveImpairmentI } from "src/Impairments/domain/entitiesI/ReactiveImpairmentI";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ImpairmentEntity } from "./impairment.entity";

@Entity('reactivo_discapacidades')
export class ReactiveImpairmentEntity implements ReactiveImpairmentI {
    @PrimaryColumn({ name: 'id_reactivo', type: 'int', nullable: false})
    reactiveId: number;
    @PrimaryColumn({ name: 'id_discapacidad', type: 'int', nullable: false})
    impairmentId: number;
    @ManyToOne(() => ImpairmentEntity, impairment => impairment.reactives)
    impairment: ImpairmentI;
}