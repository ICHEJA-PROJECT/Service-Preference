import { WordI } from "src/Words/domain/entitiesI/WordI";
import { WordMeaningI } from "src/Words/domain/entitiesI/WordMeaningI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WordMeaningEntity } from "./word_meaning.entity";
import { WordOccupationI } from "src/Occupation/domain/entitiesI/WordOccupationI";
import { WordOccupationEntity } from "src/Occupation/data/entities/word_occupation.entity";
import { WordRegionI } from "src/Region/domain/entitiesI/WordRegionI";
import { WordRegionEntity } from "src/Region/data/entities/word_region.entity";

@Entity('palabra')
export class WordEntity implements WordI {
    @PrimaryGeneratedColumn('increment', { name: 'id_palabra', type: 'int'})
    id: number;
    @Column({name: 'nombre', type: 'text', nullable: false})
    word: string;
    @OneToMany(() => WordMeaningEntity, wordMeaning => wordMeaning.word)
    meanings: WordMeaningI[];
    @OneToMany(() => WordOccupationEntity, wordOccupation => wordOccupation.word)
    occupations: WordOccupationI[];
    @OneToMany(() => WordRegionEntity, wordRegion => wordRegion.word)
    regions: WordRegionI[];
}