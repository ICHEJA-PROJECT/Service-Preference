import { RegionI } from "src/Region/domain/entitiesI/RegionI";
import { StudentRegionI } from "src/Region/domain/entitiesI/StudentRegionI";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RegionEntity } from "./region.entity";

@Entity({name: 'estudiante_regiones'})
export class StudentRegionEntity implements StudentRegionI {
    @PrimaryColumn({name: 'id_educando', type: 'int', nullable: false})
    studentId: number;
    @PrimaryColumn({name: 'id_region', type: 'int', nullable: false})
    regionId: number;
    @ManyToOne(() => RegionEntity, region => region.students)
    @JoinColumn({ name: 'id_region' })
    region: RegionI;
}