import { ExerciseRegionI } from "src/Region/domain/entitiesI/ExerciseRegionI";
import { RegionI } from "src/Region/domain/entitiesI/RegionI";
import { StudentRegionI } from "src/Region/domain/entitiesI/StudentRegionI";
import { WordRegionI } from "src/Region/domain/entitiesI/WordRegionI";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'region'})
export class RegionEntity implements RegionI {
    @PrimaryGeneratedColumn('increment', {name: 'id_region'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 32})
    name: string;
    students: StudentRegionI[];
    words: WordRegionI[];
    exercises: ExerciseRegionI[];
}