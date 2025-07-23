import { WordRegionI } from "src/Region/domain/entitiesI/WordRegionI";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { RegionEntity } from "./region.entity";
import { RegionI } from "src/Region/domain/entitiesI/RegionI";
import { WordI } from "src/Words/domain/entitiesI/WordI";
import { WordEntity } from "src/Words/data/entities/word.entity";

@Entity('region_palabras')
export class WordRegionEntity implements WordRegionI {
    @PrimaryColumn({name: 'id_palabra', type: 'int', nullable: false})
    wordId: number;
    @PrimaryColumn({name: 'id_region', type: 'int', nullable: false})
    regionId: number;
    @ManyToOne(() => RegionEntity, region => region.words)
    region: RegionI;
    @ManyToOne(() => WordEntity, word => word.regions)
    word: WordI;
}