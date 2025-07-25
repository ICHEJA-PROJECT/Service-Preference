import { RegionI } from "src/Region/domain/entitiesI/RegionI";
import { RegionEntity } from "./region.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ExerciseRegionI } from "src/Region/domain/entitiesI/ExerciseRegionI";

@Entity({name: 'ejercicio_region'})
export class ExerciseRegionEntity implements ExerciseRegionI {
    @PrimaryColumn({name: 'id_ejercicio', type: 'int', nullable: false})
    exerciseId: number;
    @PrimaryColumn({name: 'id_region', type: 'int', nullable: false})
    regionId: number;
    @ManyToOne(() => RegionEntity, region => region.exercises)
    @JoinColumn({ name: 'id_region' })
    region: RegionI;
}